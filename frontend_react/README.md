# Career Navigator Frontend (Vite + React + MUI)

How to run locally:
- npm install
- npm start (starts Vite on http://localhost:3000, bound to 0.0.0.0 for previews)
- npm run build (build for production)
- npm run preview (serve production build at http://localhost:3000)

Environment:
- Copy .env.example to .env and set:
  - VITE_API_BASE to your backend URL.
    - Local dev: http://localhost:8000
    - In this environment: https://vscode-internal-33891-beta.beta01.cloud.kavia.ai:3001
- The app reads import.meta.env.VITE_API_BASE (fallback to REACT_APP_API_BASE, then http://localhost:8000).
- If VITE_API_BASE is not set and you are not on localhost, the app will warn in the console and still render with built-in fallbacks.

Troubleshooting blank screen:
- Ensure the development server is running: npm start
- Open the browser console:
  - If you see network errors to http://localhost:8000 while running in a hosted environment, set VITE_API_BASE in a .env file.
- Ensure routes render:
  - The app provides routes '/', '/analysis', '/roadmap', '/progress' and renders even if the backend is unavailable.
- Cytoscape:
  - The default pages provide sample graph data so the UI remains visible without API calls.

Tech:
- React 18, React Router, Material UI
- Cytoscape.js with cose-bilkent layout
- Axios API client (configurable base URL)
- Routes: '/', '/analysis', '/roadmap', '/progress'
