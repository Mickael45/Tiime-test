// server.js (Express version)
const express = require("express");
const fs = require("fs").promises;
const path = require("path");
const cors = require("cors");

const usersFilePath = path.join(__dirname, "users.json");
const PORT = process.env.PORT || 3000;
const JSONPLACEHOLDER_API = "https://jsonplaceholder.typicode.com";

const app = express();

// Middleware to enable CORS
app.use(cors());

// Middleware to parse JSON request bodies
app.use(express.json());

// --- Data Persistence Helpers ---

// In-memory cache of users to avoid reading the file on every request
let usersCache = [];

// Function to read users from the JSON file
async function readUsers() {
  try {
    // Check if file exists, create if not
    try {
      await fs.access(usersFilePath);
    } catch (error) {
      if (error.code === "ENOENT") {
        console.log("users.json not found, creating empty file.");
        await fs.writeFile(usersFilePath, "[]", "utf8");
      } else {
        throw error; // Re-throw other access errors
      }
    }
    const data = await fs.readFile(usersFilePath, "utf8");
    usersCache = JSON.parse(data);
    // Ensure it's always an array
    if (!Array.isArray(usersCache)) {
      console.warn(
        "users.json did not contain a valid array. Resetting to []."
      );
      usersCache = [];
      await writeUsers(); // Write back the empty array
    }
    return usersCache;
  } catch (err) {
    console.error("Error reading users file:", err);
    // If reading fails critically, maybe default to an empty array in memory
    usersCache = [];
    return usersCache;
    // Or throw an error to stop the server if preferred
    // throw new Error("Could not read user data file.");
  }
}

// Function to write users back to the JSON file
async function writeUsers() {
  try {
    await fs.writeFile(
      usersFilePath,
      JSON.stringify(usersCache, null, 2),
      "utf8"
    ); // Pretty print JSON
  } catch (err) {
    console.error("Error writing users file:", err);
    throw new Error("Could not write user data file."); // Propagate error
  }
}

// --- Route Handlers ---

// Route: GET /users
app.get("/users", (req, res) => {
  console.log(`Received request: GET /users`);
  res.status(200).json(usersCache); // Send cached users
});

// Route: GET /user/:id
app.get("/users/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  console.log(`Received request: GET /user/${id}`);
  const user = usersCache.find((u) => u.id === id);
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ message: `User with ID ${id} not found locally` });
  }
});

// Route: POST /user
app.post("/users", async (req, res) => {
  console.log(`Received request: POST /user`);
  const newUser = req.body;

  // Basic validation
  if (!newUser || typeof newUser !== "object" || Array.isArray(newUser)) {
    return res
      .status(400)
      .json({ message: "Invalid user data format in request body." });
  }
  // Check if required fields are present (optional, add as needed)
  // if (!newUser.name || !newUser.email) {
  //     return res.status(400).json({ message: 'Missing required fields (e.g., name, email).' });
  // }

  // Generate a new unique ID
  const maxId = usersCache.reduce((max, u) => (u.id > max ? u.id : max), 0);
  newUser.id = maxId + 1;

  // Add to cache and write to file
  usersCache.push(newUser);
  try {
    await writeUsers();
    res.status(201).json(newUser); // 201 Created
  } catch (error) {
    console.error("Error writing user:", error);
    res.status(500).json({ message: "Failed to save new user." });
  }
});

// Route: PUT /user/:id
app.put("/users/:id", async (req, res) => {
  const id = parseInt(req.params.id, 10);
  console.log(`Received request: PUT /user/${id}`);
  const userIndex = usersCache.findIndex((u) => u.id === id);

  if (userIndex === -1) {
    return res
      .status(404)
      .json({ message: `User with ID ${id} not found locally for update` });
  }

  const updatedData = req.body;

  // Basic validation
  if (
    !updatedData ||
    typeof updatedData !== "object" ||
    Array.isArray(updatedData)
  ) {
    return res
      .status(400)
      .json({ message: "Invalid user data format in request body." });
  }

  // Merge updated data - ensure ID remains the same
  usersCache[userIndex] = { ...usersCache[userIndex], ...updatedData, id: id };

  // Write changes to file
  try {
    await writeUsers();
    res.status(200).json(usersCache[userIndex]);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Failed to update user." });
  }
});

// Route: GET /user/:id/posts
app.get("/users/:id/posts", async (req, res) => {
  const id = parseInt(req.params.id, 10);
  console.log(`Received request: GET /user/${id}/posts`);
  const url = `${JSONPLACEHOLDER_API}/users/${id}/posts`;

  console.log(`Workspaceing posts from: ${url}`);
  try {
    // Use native fetch (available in Node 18+)
    const response = await fetch(url);

    if (response.ok) {
      // Status code 200-299
      const posts = await response.json();
      res.status(200).json(posts);
    } else if (response.status === 404) {
      console.log(
        `User ${id} not found on JSONPlaceholder. Checking local storage...`
      );
      // JSONPlaceholder returned 404, check if user exists locally
      const localUserExists = usersCache.some((u) => u.id === id);
      if (localUserExists) {
        console.log(`User ${id} found locally. Returning empty posts array.`);
        // User exists locally, but no posts on placeholder - return empty array
        res.status(200).json([]);
      } else {
        console.log(`User ${id} not found locally either.`);
        // User not found locally either, return 404
        res.status(404).json({
          message: `User with ID ${id} not found locally or on JSONPlaceholder`,
        });
      }
    } else {
      // Other error from JSONPlaceholder
      console.error(
        `JSONPlaceholder request failed: ${response.status} ${response.statusText}`
      );
      res
        .status(response.status)
        .json({ message: `Failed to fetch posts: ${response.statusText}` });
    }
  } catch (fetchError) {
    console.error("Error fetching posts:", fetchError);
    // Check local existence even on fetch network errors
    const localUserExists = usersCache.some((u) => u.id === id);
    if (localUserExists) {
      console.log(
        `Workspace failed, but User ${id} found locally. Returning empty posts array.`
      );
      // Return empty array if user exists locally but fetch failed
      res.status(200).json([]);
    } else {
      console.log(`Workspace failed and User ${id} not found locally either.`);
      res
        .status(500)
        .json({ message: "Failed to fetch posts and user not found locally" });
    }
  }
});

// Route: Not Found
app.use((req, res) => {
  console.log(`Received request: ${req.method} ${req.path} - Route not found`);
  res.status(404).json({ message: "Route not found" });
});

// --- Start Server ---

// Load initial data before starting the server
readUsers()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
      console.log(`User data will be persisted in: ${usersFilePath}`);
    });
  })
  .catch((err) => {
    console.error("Failed to initialize server:", err);
    process.exit(1); // Exit if we can't load initial data
  });

// Optional: Handle graceful shutdown to ensure data is written
process.on("SIGINT", async () => {
  console.log("\nCaught interrupt signal, writing data before exit...");
  try {
    await writeUsers(); // Ensure latest cache is written
    console.log("Data saved successfully.");
    process.exit(0);
  } catch (err) {
    console.error("Failed to save data on exit:", err);
    process.exit(1);
  }
});

module.exports = app;
