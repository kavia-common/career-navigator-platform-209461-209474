import axios from 'axios';

const baseURL =
  import.meta.env.VITE_API_BASE ||
  import.meta.env.REACT_APP_API_BASE ||
  'http://localhost:8000';

const client = axios.create({
  baseURL,
  timeout: 15000
});

// Interceptor for basic error handling
client.interceptors.response.use(
  (r) => r,
  (err) => {
    // Normalize error message
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
