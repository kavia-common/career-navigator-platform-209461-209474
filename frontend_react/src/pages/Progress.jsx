import { Box, Paper, Typography } from '@mui/material';
import ProgressTracker from '../components/ProgressTracker';

export default function Progress() {
  const profile = { id: 'demo-user' };
  return (
    <Box sx={{ display: 'grid', gap: 2 }}>
      <Paper sx={{ p: 2 }}>
        <Typography variant="h5" gutterBottom>Progress</Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Track your learning tasks and achievements over time.
        </Typography>
      </Paper>
      <ProgressTracker profile={profile} />
    </Box>
  );
}
