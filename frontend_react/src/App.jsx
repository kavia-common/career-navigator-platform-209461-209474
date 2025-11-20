import { useMemo, useState } from 'react';
import { Outlet } from 'react-router-dom';
import {
  Box,
  CssBaseline,
  ThemeProvider,
  createTheme
} from '@mui/material';
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';

const palette = {
  primary: { main: '#3b82f6' },
  secondary: { main: '#64748b' },
  success: { main: '#06b6d4' }
};

// PUBLIC_INTERFACE
export default function App() {
  /** Root application layout with top Navbar and collapsible Sidebar. */
  const [mode, setMode] = useState('light');
  const theme = useMemo(
    () =>
      createTheme({
        palette: { mode, ...palette },
        shape: { borderRadius: 10 }
      }),
    [mode]
  );

  const toggleMode = () => setMode((m) => (m === 'light' ? 'dark' : 'light'));

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default', color: 'text.primary' }}>
        <Navbar onToggleMode={toggleMode} mode={mode} />
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 2, mt: 8 }}>
          <Outlet />
        </Box>
      </Box>
    </ThemeProvider>
  );
}
