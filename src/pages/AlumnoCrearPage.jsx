import React, { useState } from 'react';
import { crearAlumno } from '../services/usuarioService';
import { useNavigate } from 'react-router-dom';

const AlumnoCrearPage = () => {
  const [formData, setFormData] = useState({ nombre: '', apellido: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await crearAlumno(formData);
      navigate('/panel/alumnos');
    } catch (err) {
      setError(err.error || 'Error al crear alumno');
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Registrar nuevo alumno</h2>
      {error && <p className="text-red-600 mb-2">{error}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={formData.nombre}
          onChange={handleChange}
          className="border px-3 py-2 rounded"
        />
        <input
          type="text"
          name="apellido"
          placeholder="Apellido"
          value={formData.apellido}
          onChange={handleChange}
          className="border px-3 py-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Guardar
        </button>
      </form>
    </div>
  );
};

export default AlumnoCrearPage;
