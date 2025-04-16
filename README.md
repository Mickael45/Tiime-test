# Tiime Test

## 🛠️ Outils utilisés

**Tailwind** : Pendant mon call avec Sullivan, il a mentionné que vous utilisiez Tailwind, donc c’est ce que j’ai utilisé pour le projet.

Le reste a été fait à la main, sans bibliothèques externes.

---

## 📌 Remarque

L’API proposée par [jsonplaceholder.typicode.com](https://jsonplaceholder.typicode.com) n’est composée que de données en dur. Du coup, la création ou la mise à jour d’un utilisateur ne sont pas enregistrées.

Pour pallier ça, j’ai créé un petit serveur Express qui sert de wrapper à jsonplaceholder.typicode.com et qui **simule** une persistance des données.

Le tout est hébergé sur Vercel à l’URL suivante :  
👉 [https://tiime-test.vercel.app/](https://tiime-test.vercel.app/)

---

## ✨ Améliorations possibles

1. Pagination  
2. Filtres  
3. Tri
4. Meilleure UI/UX  
5. Tests

Pour les points 1, 2 et 3, le test se concentrait sur le Front. Connaissant les limitations de jsonplaceholder.typicode.com (qui n’offre aucune de ces trois fonctionnalités), si j’avais dû les développer, la majeure partie de la logique aurait été côté serveur. C’est pour cela que je ne les ai pas implémentés.

Pour les points 4 et 5, c'état pour ne pas passer plus de temps sur le test et surtout parce que je pense que l'UI / UX sont correctes même si ce n'est pas exceptionel.

---

## ⚙️ Mise en place

### Option 1

Accédez à l’application ici :  
👉 [https://tiime-test.vercel.app/](https://tiime-test.vercel.app/)

### Option 2

```bash
git clone https://github.com/Mickael45/Tiime-test.git
cd tiime-test
npm install
npm start
