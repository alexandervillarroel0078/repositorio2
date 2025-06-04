
import React, { useState } from 'react';
import { generarPrediccionesMultiplesMaterias } from '../services/prediccionService';

const PeriodoListPage = () => {
  const [gradoId, setGradoId] = useState('');
  const [periodoId, setPeriodoId] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  const manejarEnvio = async (e) => {
    e.preventDefault();
    setMensaje('');
    setError('');

    try {
      const respuesta = await generarPrediccionesMultiplesMaterias({
        grado_id: parseInt(gradoId),
        periodo_id: parseInt(periodoId),
      });
      setMensaje(respuesta.mensaje || '✅ Predicciones generadas correctamente.');
    } catch (err) {
      console.error(err);
      setError('❌ Error al generar predicciones. Verifica los datos.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow">
      <h2 className="text-xl font-bold text-blue-700 mb-4">Generar Predicciones Manualmente</h2>

      <form onSubmit={manejarEnvio}>
        <div className="mb-4">
          <label className="block text-gray-700">Grado ID:</label>
          <input
            type="number"
            value={gradoId}
            onChange={(e) => setGradoId(e.target.value)}
            className="w-full mt-1 px-3 py-2 border rounded"
            placeholder="Ej. 1"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Periodo ID:</label>
          <input
            type="number"
            value={periodoId}
            onChange={(e) => setPeriodoId(e.target.value)}
            className="w-full mt-1 px-3 py-2 border rounded"
            placeholder="Ej. 2"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Generar
        </button>
      </form>

      {mensaje && <p className="mt-4 text-green-600">{mensaje}</p>}
      {error && <p className="mt-4 text-red-600">{error}</p>}
    </div>
  );
};

export default PeriodoListPage;
