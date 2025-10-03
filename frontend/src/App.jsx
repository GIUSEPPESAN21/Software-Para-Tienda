import React from 'react';
import { 
    Box, 
    Toolbar, 
    Typography, 
    Grid,
} from '@mui/material';

// --- Iconos ---
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CategoryIcon from '@mui/icons-material/Category';
import WarningIcon from '@mui/icons-material/Warning';

// --- Importación de Componentes ---
import SideMenu from './components/SideMenu';
import MetricCard from './components/MetricCard';
import InventoryTable from './components/InventoryTable';

const drawerWidth = 240;

export default function App() {
  const metrics = [
      { title: 'Total de Productos', value: '350', icon: <ShoppingCartIcon />, color: '#3b82f6' },
      { title: 'Ítems con Bajo Stock', value: '10', icon: <WarningIcon />, color: '#f59e0b' },
      { title: 'Categorías', value: '12', icon: <CategoryIcon />, color: '#10b981' },
  ];
    
  return (
    <Box sx={{ display: 'flex', backgroundColor: '#f3f4f6', minHeight: '100vh' }}>
      <SideMenu />
      
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 4, color: '#111827' }}>
          Dashboard
        </Typography>

        <Grid container spacing={3} sx={{ mb: 4 }}>
            {metrics.map(metric => (
                <Grid item xs={12} sm={6} md={4} key={metric.title}>
                    <MetricCard 
                        title={metric.title}
                        value={metric.value}
                        icon={metric.icon}
                        color={metric.color}
                    />
                </Grid>
            ))}
        </Grid>
        
        <InventoryTable />
        
      </Box>
    </Box>
  );
}