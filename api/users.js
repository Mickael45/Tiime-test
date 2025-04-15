// api/users.js
import https from "https";
import fs from "fs";

const USERS_FILE = "./db.json";

// Basic fetch wrapper for JSONPlaceholder
function fetchFromPlaceholder(path, method = "GET", data = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: "jsonplaceholder.typicode.com",
      path,
      method,
      headers: {
        "Content-Type": "application/json",
      },
    };

    const req = https.request(options, (res) => {
      let body = "";
      res.on("data", (chunk) => (body += chunk));
      res.on("end", () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          try {
            const parsed = JSON.parse(body);
            resolve(parsed);
          } catch (err) {
            resolve(null); // fallback to local if JSON is broken
          }
        } else {
          resolve(null); // means not found or bad response
        }
      });
    });

    req.on("error", reject);
    if (data) req.write(JSON.stringify(data));
    req.end();
  });
}

// File operations
function readUsers() {
  if (!fs.existsSync(USERS_FILE)) fs.writeFileSync(USERS_FILE, "[]");
  return JSON.parse(fs.readFileSync(USERS_FILE));
}

function writeUsers(users) {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

function syncUser(user) {
  const users = readUsers();
  const exists = users.find((u) => u.id === user.id);
  if (!exists) {
    users.push(user);
    writeUsers(users);
  }
}

function updateUser(updatedUser) {
  let users = readUsers();
  users = users.map((user) =>
    user.id === updatedUser.id ? updatedUser : user
  );
  writeUsers(users);
}

// CORS & response helper
function sendJSON(res, statusCode, data) {
  res.setHeader("Access-Control-Allow-Origin", "*"); // Allow all origins
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  res.status(statusCode).json(data);
}

// Vercel Serverless Function Handler
export default async function handler(req, res) {
  const { method, query, body } = req;

  // Handle GET /users
  if (method === "GET" && query.userId === undefined) {
    try {
      const remoteUsers = await fetchFromPlaceholder("/users");
      remoteUsers.forEach(syncUser);
      const localUsers = readUsers();
      return sendJSON(res, 200, localUsers);
    } catch (err) {
      return sendJSON(res, 500, { error: "Failed to fetch users" });
    }
  }

  // POST /users
  if (method === "POST" && query.userId === undefined) {
    try {
      const newUser = JSON.parse(body);
      const localUsers = readUsers();
      const createdUser = { id: localUsers.length, ...newUser };

      syncUser(createdUser);
      return sendJSON(res, 201, createdUser);
    } catch (err) {
      return sendJSON(res, 500, { error: "Failed to create user" });
    }
  }

  // PUT /users/:id
  if (method === "PUT" && query.userId) {
    try {
      const userId = query.userId;
      const updatedData = JSON.parse(body);
      const updatedUser = await fetchFromPlaceholder(
        `/users/${userId}`,
        "PUT",
        updatedData
      );

      if (updatedUser && updatedUser.id) {
        updateUser(updatedUser);
        return sendJSON(res, 200, updatedUser);
      } else {
        throw new Error("User not found remotely");
      }
    } catch (err) {
      // fallback: try local update
      let users = readUsers();
      const index = users.findIndex((u) => u.id == query.userId);

      if (index !== -1) {
        users[index] = { ...users[index], ...JSON.parse(body) };
        writeUsers(users);
        return sendJSON(res, 200, users[index]);
      } else {
        return sendJSON(res, 404, { error: "User not found" });
      }
    }
  }

  // GET /users/:id
  if (method === "GET" && query.userId) {
    const userId = query.userId;
    try {
      const remoteUser = await fetchFromPlaceholder(`/users/${userId}`);
      if (remoteUser && remoteUser.id) {
        syncUser(remoteUser); // Save to local if not already there
        return sendJSON(res, 200, remoteUser);
      } else {
        throw new Error("User not found remotely");
      }
    } catch (err) {
      // fallback to local
      const localUsers = readUsers();
      const localUser = localUsers.find((u) => u.id == userId);
      if (localUser) {
        return sendJSON(res, 200, localUser);
      } else {
        return sendJSON(res, 404, { error: "User not found" });
      }
    }
  }

  // GET /users/:id/posts
  if (method === "GET" && query.userId && query.posts) {
    const userId = query.userId;
    try {
      const posts = await fetchFromPlaceholder(`/users/${userId}/posts`);
      return sendJSON(res, 200, posts);
    } catch (err) {
      return sendJSON(res, 500, { error: "Failed to fetch posts" });
    }
  }

  // 404 fallback
  return sendJSON(res, 404, { error: "Route not found" });
}
