import React, { useState, useCallback } from 'react';
import { Box, Toolbar, Typography, Grid, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

// --- Iconos (sin cambios) ---
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CategoryIcon from '@mui/icons-material/Category';
import WarningIcon from '@mui/icons-material/Warning';

// --- Importación de Componentes (añadimos el nuevo formulario) ---
import SideMenu from './components/SideMenu';
import MetricCard from './components/MetricCard';
import InventoryTable from './components/InventoryTable';
import AddItemForm from './components/AddItemForm'; // <-- NUEVA IMPORTACIÓN
import { createInventoryItem } from './service/inventoryService'; // <-- NUEVA IMPORTACIÓN

const drawerWidth = 240;

export default function App() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  // --- NUEVO ESTADO ---
  // Este estado 'key' es un truco para forzar a la tabla a recargarse.
  // Cada vez que cambiemos su valor, el componente InventoryTable se volverá a renderizar.
  const [inventoryKey, setInventoryKey] = useState(0);

  const metrics = [
      { title: 'Total de Productos', value: '350', icon: <ShoppingCartIcon />, color: '#3b82f6' },
      { title: 'Ítems con Bajo Stock', value: '10', icon: <WarningIcon />, color: '#f59e0b' },
      { title: 'Categorías', value: '12', icon: <CategoryIcon />, color: '#10b981' },
  ];
  
  // --- NUEVA FUNCIÓN ---
  // Esta función se la pasaremos al formulario.
  const handleAddItem = async (item) => {
    await createInventoryItem(item);
    // Cambiamos el valor de la key para forzar la recarga de la tabla
    setInventoryKey(prevKey => prevKey + 1); 
  };
    
  return (
    <Box sx={{ display: 'flex', backgroundColor: '#f3f4f6', minHeight: '100vh' }}>
      <SideMenu />
      
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#111827' }}>
              Dashboard
            </Typography>
            {/* --- NUEVO BOTÓN --- */}
            <Button 
                variant="contained" 
                startIcon={<AddIcon />}
                onClick={() => setIsFormOpen(true)}
                sx={{ borderRadius: 2 }}
            >
              Añadir Producto
            </Button>
        </Box>

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
        
        {/* Pasamos la 'key' a la tabla para que se actualice */}
        <InventoryTable key={inventoryKey} />
        
        {/* --- NUEVO FORMULARIO (inicialmente oculto) --- */}
        <AddItemForm 
            open={isFormOpen}
            onClose={() => setIsFormOpen(false)}
            onAddItem={handleAddItem}
        />
      </Box>
    </Box>
  );
}