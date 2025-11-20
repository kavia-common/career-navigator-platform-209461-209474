import { useEffect, useState } from 'react';
import { Box, Card, CardContent, Chip, CircularProgress, Typography } from '@mui/material';
import { api } from '../services/api';
import RecommendationCard from './RecommendationCard';

// PUBLIC_INTERFACE
export default function GapAnalysisView({ profile, role }) {
  /** Fetches and displays skill gaps and recommendation snippets for selected role. */
  const [loading, setLoading] = useState(false);
  const [gaps, setGaps] = useState([]);

  useEffect(() => {
    let active = true;
    const run = async () => {
      if (!role) return;
      setLoading(true);
      try {
        const res = await api.postGapAnalysis({ profile, roleId: role.id });
        if (active) setGaps(res?.gaps ?? []);
      } catch {
        if (active)
          setGaps([
            { skill: 'Distributed Systems', current: 2, target: 4 },
            { skill: 'Cloud Infrastructure', current: 1, target: 3 }
          ]);
      } finally {
        if (active) setLoading(false);
      }
    };
    run();
    return () => { active = false; };
  }, [profile, role]);

  if (!role) {
    return <Typography variant="body1">Select a role to analyze gaps.</Typography>;
  }

  if (loading) return <CircularProgress />;

  return (
    <Box sx={{ display: 'grid', gap: 2 }}>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h6" gutterBottom>Skill Gaps</Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {gaps.map((g) => (
              <Chip
                key={g.skill}
                color="secondary"
                label={`${g.skill}: ${g.current} → ${g.target}`}
                variant="outlined"
              />
            ))}
          </Box>
        </CardContent>
      </Card>
      <RecommendationCard role={role} profile={profile} />
    </Box>
  );
}
