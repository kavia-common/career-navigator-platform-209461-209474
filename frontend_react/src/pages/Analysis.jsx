import { useState } from 'react';
import { Box, Paper, Typography } from '@mui/material';
import RoleSelector from '../components/RoleSelector';
import GapAnalysisView from '../components/GapAnalysisView';

export default function Analysis() {
  const [role, setRole] = useState(null);
  const profile = { id: 'demo-user' };

  return (
    <Box sx={{ display: 'grid', gap: 2 }}>
      <Paper sx={{ p: 2 }}>
        <Typography variant="h5" gutterBottom>Gap Analysis</Typography>
        <RoleSelector value={role} onChange={setRole} />
      </Paper>
      <GapAnalysisView profile={profile} role={role} />
    </Box>
  );
}
