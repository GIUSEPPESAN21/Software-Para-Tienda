import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Box, CircularProgress } from '@mui/material';

// El componente recibe 3 props:
// open: un booleano para saber si el popup debe mostrarse o no.
// onClose: una función para cerrar el popup.
// onAddItem: una función para ejecutar después de que un ítem se añade exitosamente.
const AddItemForm = ({ open, onClose, onAddItem }) => {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    // Validar que los campos no estén vacíos
    if (!name || !quantity) {
      setError('Ambos campos son obligatorios.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Llamamos a la función que nos pasaron como prop
      await onAddItem({ name, quantity: parseInt(quantity, 10) });
      handleClose(); // Cierra y resetea el formulario si todo va bien
    } catch (err) {
      setError('No se pudo añadir el producto. Inténtalo de nuevo.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setName('');
    setQuantity('');
    setError('');
    onClose(); // Llama a la función del padre para cerrar
  };

  return (
    <Dialog open={open} onClose={handleClose} PaperProps={{ sx: { borderRadius: 3 } }}>
      <DialogTitle sx={{ fontWeight: 'bold' }}>Añadir Nuevo Producto</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Nombre del Producto"
          type="text"
          fullWidth
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          margin="dense"
          id="quantity"
          label="Cantidad"
          type="number"
          fullWidth
          variant="outlined"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </DialogContent>
      <DialogActions sx={{ padding: '16px 24px' }}>
        <Button onClick={handleClose} sx={{ color: 'text.secondary' }}>Cancelar</Button>
        <Button onClick={handleSubmit} variant="contained" disabled={loading}>
          {loading ? <CircularProgress size={24} /> : 'Añadir Producto'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddItemForm;