import axios from 'axios';

// Determine API base URL with sensible fallbacks
let baseURL =
  import.meta.env.VITE_API_BASE ||
  import.meta.env.REACT_APP_API_BASE ||
  'http://localhost:8000';

// Log chosen base URL and warn if likely misconfigured in non-local environments
try {
  const isLocalDefault = baseURL === 'http://localhost:8000';
  const isLocalHost = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
  if (isLocalDefault && !isLocalHost) {
    // In hosted environments, localhost:8000 will fail unless port-forwarded.
    // We don't hardcode a replacement, but we inform the developer/operator.
    // eslint-disable-next-line no-console
    console.warn(
      '[API] VITE_API_BASE is not set. Defaulting to http://localhost:8000 which may be unreachable from this host. ' +
      'Set VITE_API_BASE in a .env file (see .env.example).'
    );
  }
  // eslint-disable-next-line no-console
  console.info('[API] Using base URL:', baseURL);
} catch {
  // no-op
}

const client = axios.create({
  baseURL,
  timeout: 15000
});

// Interceptor for basic error handling that never crashes the React tree
client.interceptors.response.use(
  (r) => r,
  (err) => {
    const message = err?.response?.data?.detail || err.message || 'Request failed';
    return Promise.reject(new Error(message));
  }
);

// PUBLIC_INTERFACE
export const api = {
  /** GET /roles - fetch available roles */
  async getRoles() {
    const res = await client.get('/roles');
    return res.data;
  },
  /** POST /gap-analysis - run gap analysis */
  async postGapAnalysis(payload) {
    const res = await client.post('/gap-analysis', payload);
    return res.data;
  },
  /** POST /roadmap - get roadmap graph data */
  async postRoadmap(payload) {
    const res = await client.post('/roadmap', payload);
    return res.data;
  },
  /** POST /progress/update - update progress items */
  async postProgressUpdate(payload) {
    const res = await client.post('/progress/update', payload);
    return res.data;
  },
  /** POST /recommend - get recommendations */
  async postRecommend(payload) {
    const res = await client.post('/recommend', payload);
    return res.data;
  }
};

export default client;
