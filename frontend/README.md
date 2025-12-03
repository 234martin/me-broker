# Frontend (React) Starter

Quick start:
1. cd frontend
2. npm install
3. Create a .env file (optional) with VITE_API_BASE=http://localhost:8000
4. npm run dev

Notes:
- This is a minimal Vite + React scaffold that calls the FastAPI backend endpoints included in the zip.
- It uses axios in src/services/api.js to call /products, /orders, /wallets and /payouts/request
- Extend auth, cart state, and styling as needed.


## Tailwind Added
Run: npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p


### Classified-style UI (Tailwind)
Run:

npm install
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

Add to package.json devDependencies if not present, then run `npm run dev`.
