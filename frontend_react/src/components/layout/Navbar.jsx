import { AppBar, Toolbar, Typography, IconButton, Box } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import InsightsIcon from '@mui/icons-material/Insights';

// PUBLIC_INTERFACE
export default function Navbar({ onToggleMode, mode }) {
  /** Top navigation bar with brand and theme toggle. */
  return (
    <AppBar position="fixed" color="primary" enableColorOnDark>
      <Toolbar>
        <InsightsIcon sx={{ mr: 1 }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Career Navigator
        </Typography>
        <Box aria-label="theme switch">
          <IconButton color="inherit" onClick={onToggleMode} title={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`}>
            <Brightness4Icon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
