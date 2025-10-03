import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip, Box, Typography, CircularProgress } from '@mui/material';
import { getInventoryItems } from '../services/inventoryService';

const getStatusChip = (quantity) => {
    let status, styles;
    if (quantity === 0) {
        status = 'Agotado';
        styles = { backgroundColor: '#fee2e2', color: '#991b1b', fontWeight: 'bold' };
    } else if (quantity <= 10) {
        status = 'Bajo Stock';
        styles = { backgroundColor: '#fef9c3', color: '#854d0e', fontWeight: 'bold' };
    } else {
        status = 'En Stock';
        styles = { backgroundColor: '#dcfce7', color: '#166534', fontWeight: 'bold' };
    }
  return <Chip label={status} sx={styles} size="small" />;
};

const InventoryTable = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      const data = await getInventoryItems();
      setItems(data);
      setLoading(false);
    };

    fetchItems();
  }, []);

  if (loading) {
      return (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
              <CircularProgress />
          </Box>
      );
  }

  return (
    <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: '0 4px 20px 0 rgba(0,0,0,0.05)' }}>
      <Box sx={{ padding: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Inventario</Typography>
      </Box>
      <Table aria-label="inventory table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 'bold', color: 'text.secondary', border: 'none' }}>ID</TableCell>
            <TableCell sx={{ fontWeight: 'bold', color: 'text.secondary', border: 'none' }}>Nombre</TableCell>
            <TableCell align="right" sx={{ fontWeight: 'bold', color: 'text.secondary', border: 'none' }}>Cantidad</TableCell>
            <TableCell align="center" sx={{ fontWeight: 'bold', color: 'text.secondary', border: 'none' }}>Estado</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((row) => (
            <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell sx={{ fontWeight: '500' }}>{row.id}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold' }}>{row.quantity}</TableCell>
              <TableCell align="center">{getStatusChip(row.quantity)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default InventoryTable;