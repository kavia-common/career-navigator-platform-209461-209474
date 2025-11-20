import { useEffect, useState } from 'react';
import { Box, Paper, Typography } from '@mui/material';
import GraphView from '../components/GraphView';
import { api } from '../services/api';

export default function Roadmap() {
  const [elements, setElements] = useState(null);

  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        const data = await api.postRoadmap({ profileId: 'demo' });
        if (active && data?.elements) setElements(data.elements);
      } catch {
        if (active) {
          setElements({
            nodes: [
              { data: { id: 'start', label: 'Start' } },
              { data: { id: 'course1', label: 'Course 1' } },
              { data: { id: 'proj', label: 'Project' } },
              { data: { id: 'goal', label: 'Role Goal' } }
            ],
            edges: [
              { data: { id: 'e1', source: 'start', target: 'course1', label: 'learn' } },
              { data: { id: 'e2', source: 'course1', target: 'proj', label: 'apply' } },
              { data: { id: 'e3', source: 'proj', target: 'goal', label: 'achieve' } }
            ]
          });
        }
      }
    };
    load();
    return () => { active = false; };
  }, []);

  return (
    <Box sx={{ display: 'grid', gap: 2 }}>
      <Paper sx={{ p: 2 }}>
        <Typography variant="h5" gutterBottom>Roadmap</Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          A visual roadmap of steps towards your target role.
        </Typography>
      </Paper>
      <Paper sx={{ p: 1 }}>
        <GraphView elements={elements} />
      </Paper>
    </Box>
  );
}
