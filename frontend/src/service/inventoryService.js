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
      throw new Error(`Error HTTP: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Falló la llamada a getInventoryItems:", error);
    return []; 
  }
};

/**
 * --- NUEVA FUNCIÓN ---
 * Crea un nuevo ítem en el inventario enviando datos a la API.
 * @param {{ name: string, quantity: number }} item - El nuevo ítem a crear.
 * @returns {Promise<Object>} La promesa se resuelve con el ítem creado.
 */
export const createInventoryItem = async (item) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/inventory`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(item),
        });

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Falló la llamada a createInventoryItem:", error);
        throw error; // Relanzamos el error para que el componente lo maneje
    }
};