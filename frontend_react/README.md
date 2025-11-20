# Career Navigator Frontend (Vite + React + MUI)

How to run locally:
- npm install
- npm start (starts Vite on http://localhost:3000, bound to 0.0.0.0 for previews)
- npm run build (build for production)
- npm run preview (serve production build at http://localhost:3000)

Environment:
- Create a .env file and set:
  - VITE_API_BASE=http://localhost:8000
- The app reads import.meta.env.VITE_API_BASE (fallback to REACT_APP_API_BASE, then http://localhost:8000).

Tech:
- React 18, React Router, Material UI
- Cytoscape.js with cose-bilkent layout
- Axios API client (configurable base URL)
- Routes: '/', '/analysis', '/roadmap', '/progress'
