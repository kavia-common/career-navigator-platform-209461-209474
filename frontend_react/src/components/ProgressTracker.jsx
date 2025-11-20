import { useEffect, useState } from 'react';
import { Box, Card, CardContent, Checkbox, LinearProgress, List, ListItem, ListItemText, Typography } from '@mui/material';
import { api } from '../services/api';

// PUBLIC_INTERFACE
export default function ProgressTracker({ profile }) {
  /** Displays learning tasks and progress; persists updates to backend if available. */
  const [items, setItems] = useState([
    { id: 't1', title: 'Complete Cloud Basics', done: false },
    { id: 't2', title: 'Kubernetes 101', done: false },
    { id: 't3', title: 'Deploy a Demo App', done: false }
  ]);

  const progress = Math.round((items.filter(i => i.done).length / items.length) * 100);

  useEffect(() => {
    // Could load from backend later
  }, []);

  const toggle = async (id) => {
    const next = items.map(i => i.id === id ? { ...i, done: !i.done } : i);
    setItems(next);
    try {
      await api.postProgressUpdate({ profile, items: next });
    } catch {
      // no-op fallback
    }
  };

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h6" gutterBottom>Progress</Typography>
        <LinearProgress variant="determinate" value={progress} sx={{ mb: 2 }} />
        <Typography variant="body2" sx={{ mb: 1 }}>{progress}% completed</Typography>
        <List>
          {items.map((i) => (
            <ListItem key={i.id} disableGutters secondaryAction={
              <Checkbox edge="end" checked={i.done} onChange={() => toggle(i.id)} />
            }>
              <ListItemText primary={i.title} />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
}
