import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;

export const filtrarHistorial = async (filters) => {
  try {
    const params = new URLSearchParams(filters).toString();
    const response = await axios.get(`${BASE_URL}/api/historial/filtrar?${params}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener el historial:", error);
    throw error;
  }
};

export const listarHistorial = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/historial/filtrar`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener el historial:", error);
    throw error;
  }
};
