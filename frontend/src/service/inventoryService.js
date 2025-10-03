// La URL base de tu API de FastAPI.
const API_BASE_URL = 'http://localhost:8000';

/**
 * Obtiene todos los ítems del inventario desde la API.
 * @returns {Promise<Array>} Una promesa que se resuelve con un array de ítems del inventario.
 */
export const getInventoryItems = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/inventory`);
    
    if (!response.ok) {
      throw new Error(`Error al obtener el inventario: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Falló la llamada a getInventoryItems:", error);
    return []; // Devuelve un array vacío en caso de error.
  }
};