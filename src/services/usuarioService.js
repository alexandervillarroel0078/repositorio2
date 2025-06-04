
import api from './api';

// 1. Listar usuarios
export const listarUsuarios = async () => {
  try {
    const response = await api.get('/api/usuarios');
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Error al listar usuarios' };
  }
};

// 2. Crear alumno
export const crearAlumno = async (datos) => {
  try {
    const response = await api.post('/api/crear-alumnoss', datos);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Error al crear alumno' };
  }
};

// 3. Inscribir alumno
export const inscribirAlumno = async (alumno_id) => {
  try {
    const response = await api.post('/api/inscripciones', { alumno_id });
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Error al inscribir alumno' };
  }
};

// 4. Cambiar contraseña (requiere token en el header)
export const cambiarPassword = async (nueva_contraseña, token) => {
  try {
    const response = await api.put(
      '/api/cambiar-password',
      { nueva_contraseña },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Error al cambiar la contraseña' };
  }
};
