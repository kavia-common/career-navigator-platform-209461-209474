import { useEffect, useState } from 'react';
import { Alert, Box, Link, Paper, Stack, Typography } from '@mui/material';
import client from '../services/api';

// PUBLIC_INTERFACE
export default function HealthCheck() {
  /**
   * Health-check and diagnostics page that:
   * - shows detected API base URL
   * - pings backend GET /
   */
  const [info, setInfo] = useState({ baseURL: '', ok: null, payload: null, error: null });

  useEffect(() => {
    const run = async () => {
      // Read from axios client defaults
      const baseURL = client?.defaults?.baseURL || '(unknown)';
      try {
        const res = await client.get('/');
        setInfo({ baseURL, ok: true, payload: res.data, error: null });
      } catch (e) {
        setInfo({ baseURL, ok: false, payload: null, error: e?.message || String(e) });
      }
    };
    run();
  }, []);

  return (
    <Box sx={{ maxWidth: 800 }}>
      <Paper sx={{ p: 2 }}>
        <Stack spacing={2}>
          <Typography variant="h5">Health Check</Typography>
          <Typography variant="body2">
            Detected API base URL: <strong>{info.baseURL}</strong>
          </Typography>
          {info.ok === true && (
            <Alert severity="success">
              Backend reachable. Payload: <code>{JSON.stringify(info.payload)}</code>
            </Alert>
          )}
          {info.ok === false && (
            <Alert severity="error">
              Backend not reachable. Error: {info.error}
            </Alert>
          )}
          <Typography variant="body2">
            To configure, set <code>VITE_API_BASE</code> in a <code>.env</code> file at the frontend root and rebuild. For Docker Compose, the service sets it to
            <code> http://backend:8000</code>. See{' '}
            <Link href="README.md" target="_blank" rel="noopener">README</Link>.
          </Typography>
        </Stack>
      </Paper>
    </Box>
  );
}
