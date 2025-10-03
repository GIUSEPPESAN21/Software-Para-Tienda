import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, Divider, Typography, Box } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import InventoryIcon from '@mui/icons-material/Inventory';
import SettingsIcon from '@mui/icons-material/Settings';

const drawerWidth = 240;

const SideMenu = () => {
  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon /> },
    { text: 'Inventario', icon: <InventoryIcon /> },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { 
            width: drawerWidth, 
            boxSizing: 'border-box', 
            backgroundColor: '#111827',
            color: '#e5e7eb'
        },
      }}
    >
      <Toolbar>
        <Typography variant="h6" noWrap component="div" sx={{ color: 'white' }}>
          Hi-Drive
        </Typography>
      </Toolbar>
      <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.12)' }}/>
      <List>
        {menuItems.map((item) => (
          <ListItem button key={item.text} sx={{ 
            '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.08)' },
            '& .MuiListItemIcon-root': { color: '#9ca3af' }
          }}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
      <Box sx={{ flexGrow: 1 }} />
      <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.12)' }}/>
      <List>
        <ListItem button sx={{ 
            '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.08)' },
            '& .MuiListItemIcon-root': { color: '#9ca3af' }
        }}>
          <ListItemIcon><SettingsIcon /></ListItemIcon>
          <ListItemText primary="Configuración" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default SideMenu;