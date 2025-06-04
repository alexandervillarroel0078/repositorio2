
// src/pages/profesores/PrediccionesDashboard.jsx
import React, { useEffect, useState } from 'react';
import { listarGradosDelProfesor, generarPrediccionesMultiplesMaterias } from '../../services/prediccionService';
import {obtenerPeriodosActivos} from '../../services/profesorService';
import {listarPeriodos} from '../../services/periodoService';

const PrediccionesDashboard = ({ profesorId }) => {
  const [grados, setGrados] = useState([]);
  const [periodos, setPeriodos] = useState([]);
  const [gradoId, setGradoId] = useState('');
  const [periodoId, setPeriodoId] = useState('');
  const [resumen, setResumen] = useState({});
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const gradosData = await listarGradosDelProfesor(profesorId);
        setGrados(gradosData);
        const periodosData = await obtenerPeriodosActivos();
        setPeriodos(periodosData);
      } catch (err) {
        console.error('❌ Error cargando grados o periodos:', err);
        setError('No se pudo cargar la información.');
      }
    };
    cargarDatos();
  }, [profesorId]);

  const handleGenerar = async () => {
    setMensaje('');
    setError('');
    try {
      const datos = {
        // profesor_id: parseInt(profesorId),
        grado_id: parseInt(gradoId),
        periodo_id: parseInt(periodoId),
      };
      const response = await generarPrediccionesMultiplesMaterias(datos);
      setResumen(response.resumen || {});
      setMensaje(response.mensaje);
    } catch (err) {
      console.error(err);
      setError('Error al generar predicciones.');
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">📊 Generador de Predicciones por Materia</h2>

      {/* Selectores */}
      <div className="flex flex-wrap gap-4 mb-4">
        <select
          value={gradoId}
          onChange={(e) => setGradoId(e.target.value)}
          className="border p-2 rounded w-full md:w-1/3"
        >
          <option value="">Selecciona un grado</option>
          {grados.map((g) => (
            <option key={g.id} value={g.id}>{g.nombre}</option>
          ))}
        </select>

        <select
          value={periodoId}
          onChange={(e) => setPeriodoId(e.target.value)}
          className="border p-2 rounded w-full md:w-1/3"
        >
          <option value="">Selecciona un periodo</option>
          {periodos.map((p) => (
            <option key={p.id} value={p.id}>{p.nombre}</option>
          ))}
        </select>

        <button
          onClick={handleGenerar}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          disabled={!gradoId || !periodoId}
        >
          Generar predicciones
        </button>
      </div>

      {/* Mensajes */}
      {mensaje && <p className="text-green-600 mb-4">{mensaje}</p>}
      {error && <p className="text-red-600 mb-4">{error}</p>}

      {/* Resultados agrupados por materia */}
      {Object.keys(resumen).length === 0 ? (
        <p className="text-gray-500">No hay resultados aún.</p>
      ) : (
        Object.entries(resumen).map(([materia, alumnos]) => (
          <div key={materia} className="mb-8">
            <h3 className="text-lg font-semibold text-indigo-600 mb-2">{materia}</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto border border-gray-300 shadow">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 border">Alumno</th>
                    <th className="px-4 py-2 border">Nota</th>
                    <th className="px-4 py-2 border">Asistencia</th>
                    <th className="px-4 py-2 border">Participación</th>
                    <th className="px-4 py-2 border">Rendimiento</th>
                    <th className="px-4 py-2 border">Clasificación</th>
                  </tr>
                </thead>
                <tbody>
                  {alumnos.map((a, i) => (
                    <tr key={i} className="text-center border-t">
                      <td className="px-4 py-2 border">{a.alumno}</td>
                      <td className="px-4 py-2 border">{a.nota}</td>
                      <td className="px-4 py-2 border">{a.asistencia}</td>
                      <td className="px-4 py-2 border">{a.participacion}</td>
                      <td className="px-4 py-2 border">{a.prediccion}</td>
                      <td className={`px-4 py-2 border font-bold ${
                        a.clasificacion === 'Alto'
                          ? 'text-green-600'
                          : a.clasificacion === 'Medio'
                          ? 'text-yellow-600'
                          : 'text-red-600'
                      }`}>
                        {a.clasificacion}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default PrediccionesDashboard;
