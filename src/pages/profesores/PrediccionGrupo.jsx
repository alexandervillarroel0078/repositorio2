import React, { useEffect, useState } from 'react';
import {
  listarPrediccionesPorMateria,
  listarMateriasDelProfesor
} from '../../services/prediccionService';
import { obtenerPeriodosActivos } from '../../services/profesorService';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const PrediccionGrupo = ({ profesorId }) => {
  const [materias, setMaterias] = useState([]);
  const [periodos, setPeriodos] = useState([]);
  const [materiaId, setMateriaId] = useState('');
  const [periodoId, setPeriodoId] = useState('');
  const [predicciones, setPredicciones] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const m = await listarMateriasDelProfesor(profesorId);
        const p = await obtenerPeriodosActivos();
        setMaterias(m);
        setPeriodos(p);
      } catch (err) {
        setError('❌ Error al cargar materias o periodos');
      }
    };
    cargarDatos();
  }, [profesorId]);

  const cargarPredicciones = async () => {
    setError('');
    try {
      const data = await listarPrediccionesPorMateria(materiaId, periodoId);
      setPredicciones(data);
    } catch (err) {
      setError('❌ Error al cargar predicciones');
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">📊 Predicción de Rendimiento por Grupo</h2>

      <div className="flex gap-4 mb-4 flex-wrap">
        <select
          value={materiaId}
          onChange={(e) => setMateriaId(e.target.value)}
          className="border p-2 rounded w-full md:w-1/3"
        >
          <option value="">Selecciona una materia</option>
          {materias.map((m) => (
            <option key={m.id} value={m.id}>{m.nombre}</option>
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
          onClick={cargarPredicciones}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          disabled={!materiaId || !periodoId}
        >
          Cargar Predicciones
        </button>
      </div>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      {predicciones.length === 0 ? (
        <p className="text-gray-600">No hay predicciones para mostrar.</p>
      ) : (
        <table className="min-w-full border table-auto shadow">
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
            {predicciones.map((p, i) => (
              <tr key={i} className="text-center border-t">
                <td className="px-4 py-2 border">{p.alumno}</td>
                <td className="px-4 py-2 border">{p.nota}</td>
                <td className="px-4 py-2 border">{p.asistencia}</td>
                <td className="px-4 py-2 border">{p.participacion}</td>
                <td className="px-4 py-2 border">{p.prediccion}</td>
                <td className={`px-4 py-2 border font-bold ${p.clasificacion === 'Alto'
                    ? 'text-green-600'
                    : p.clasificacion === 'Medio'
                      ? 'text-yellow-600'
                      : 'text-red-600'
                  }`}>
                  {p.clasificacion}
                </td>
              </tr>
            ))}

          </tbody>

        </table>

      )}
      <div className="mt-6">
        <h3 className="text-md font-semibold mb-2">📈 Comparación Real vs Predicción</h3>
        <div style={{ overflowX: 'auto' }}>
          <div style={{ width: Math.max(600, predicciones.length * 80) }}>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={predicciones.map((p) => ({
                  nombre: p.alumno,
                  real: p.nota ?? 0,
                  predicho: p.prediccion ?? 0
                }))}
                margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="nombre" angle={-45} textAnchor="end" interval={0} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="real" name="Nota Real" fill="#8884d8" />
                <Bar dataKey="predicho" name="Predicción" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

    </div>

  );
};

export default PrediccionGrupo;
