import { useState } from 'react';
import { Box, Grid, Paper, Typography } from '@mui/material';
import RoleSelector from '../components/RoleSelector';
import GraphView from '../components/GraphView';

export default function Home() {
  const [role, setRole] = useState(null);

  const sampleElements = {
    nodes: [
      { data: { id: 'you', label: 'You' } },
      { data: { id: 'skill-a', label: 'Python' } },
      { data: { id: 'skill-b', label: 'Data' } },
      { data: { id: 'role', label: role?.name || 'Target Role' } }
    ],
    edges: [
      { data: { id: 'e1', source: 'you', target: 'skill-a', label: 'learn' } },
      { data: { id: 'e2', source: 'skill-a', target: 'skill-b', label: 'apply' } },
      { data: { id: 'e3', source: 'skill-b', target: 'role', label: 'advance' } }
    ]
  };

  return (
    <Box sx={{ display: 'grid', gap: 2 }}>
      <Paper sx={{ p: 2 }}>
        <Typography variant="h5" gutterBottom>Welcome</Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Select a target role to explore your career path.
        </Typography>
        <RoleSelector value={role} onChange={setRole} />
      </Paper>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper sx={{ p: 1 }}>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>Pathway Overview</Typography>
            <GraphView elements={sampleElements} />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
