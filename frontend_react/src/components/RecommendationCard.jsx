import { useEffect, useState } from 'react';
import { Card, CardContent, Typography, List, ListItem, ListItemText, CircularProgress } from '@mui/material';
import { api } from '../services/api';

// PUBLIC_INTERFACE
export default function RecommendationCard({ role, profile }) {
  /** Shows recommendations for selected role from recommendation service via backend. */
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    let active = true;
    const run = async () => {
      if (!role) return;
      setLoading(true);
      try {
        const res = await api.postRecommend({ roleId: role.id, profile });
        if (active) setItems(res?.items ?? []);
      } catch {
        if (active)
          setItems([
            { id: 'r1', title: 'Course: Cloud Practitioner' },
            { id: 'r2', title: 'Workshop: Kubernetes Fundamentals' }
          ]);
      } finally {
        if (active) setLoading(false);
      }
    };
    run();
    return () => { active = false; };
  }, [role, profile]);

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h6" gutterBottom>Recommendations</Typography>
        {loading ? (
          <CircularProgress />
        ) : (
          <List>
            {items.map((i) => (
              <ListItem key={i.id} disableGutters>
                <ListItemText primary={i.title} />
              </ListItem>
            ))}
          </List>
        )}
      </CardContent>
    </Card>
  );
}
