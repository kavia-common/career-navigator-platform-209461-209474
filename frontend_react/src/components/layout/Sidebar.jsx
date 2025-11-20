import { Drawer, List, ListItemButton, ListItemIcon, ListItemText, Toolbar } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AssessmentIcon from '@mui/icons-material/Assessment';
import MapIcon from '@mui/icons-material/Map';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Link, useLocation } from 'react-router-dom';

const drawerWidth = 220;

// PUBLIC_INTERFACE
export default function Sidebar() {
  /** Permanent sidebar for primary navigation. */
  const location = useLocation();

  const items = [
    { to: '/', icon: <HomeIcon />, label: 'Home' },
    { to: '/analysis', icon: <AssessmentIcon />, label: 'Analysis' },
    { to: '/roadmap', icon: <MapIcon />, label: 'Roadmap' },
    { to: '/progress', icon: <CheckCircleIcon />, label: 'Progress' }
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' }
      }}
    >
      <Toolbar />
      <List>
        {items.map((item) => (
          <ListItemButton
            key={item.to}
            component={Link}
            to={item.to}
            selected={location.pathname === item.to || (item.to !== '/' && location.pathname.startsWith(item.to))}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
}
