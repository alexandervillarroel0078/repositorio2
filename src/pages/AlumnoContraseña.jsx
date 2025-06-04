import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { cambiarPassword } from '../services/usuarioService';

const AlumnoContraseña = () => {
  const navigate = useNavigate();
  const [nuevaContrasena, setNuevaContrasena] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje('');
    setError('');

    const token = localStorage.getItem('token'); // Asegúrate que el token esté guardado

    if (!token) {
      setError('No hay sesión activa.');
      return;
    }

    try {
      const data = await cambiarPassword(nuevaContrasena, token);
      setMensaje(data.mensaje);
      setNuevaContrasena('');
    } catch (err) {
      setError(err.error || 'Error al cambiar la contraseña');
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Cambiar Contraseña</h2>

      {mensaje && (
        <div className="bg-green-100 text-green-700 p-3 rounded mb-4">
          ✅ {mensaje}
        </div>
      )}

      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
          ❌ {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="password"
          placeholder="Nueva contraseña"
          value={nuevaContrasena}
          onChange={(e) => setNuevaContrasena(e.target.value)}
          className="border px-3 py-2 rounded"
        />
        <button
          type="submit"
          className="bg-yellow-600 text-white py-2 px-4 rounded hover:bg-yellow-700"
        >
          Cambiar Contraseña
        </button>
      </form>

      <button
        onClick={() => navigate('/panel/alumnos')}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Volver al listado
      </button>
    </div>
  );
};

export default AlumnoContraseña;
