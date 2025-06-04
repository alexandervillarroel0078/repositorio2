import React, { useEffect, useState } from 'react';
import { listarAlumnos, verAlumno, eliminarAlumno } from '../services/alumnoService';

import { useNavigate } from 'react-router-dom';

import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

const AlumnoListPage = () => {
  const [alumnos, setAlumnos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const navigate = useNavigate();

  const handleVer = (id) => {
    navigate(`/panel/alumnos/${id}/tabs`);
  };
  const handleEditar = async (id) => {
    const alumno = await verAlumno(id);
    console.log("✏️ Editar alumno:", alumno);
  };

  const handleEliminar = async (id) => {
    const confirmar = window.confirm("¿Deseas eliminar este alumno?");
    if (!confirmar) return;

    await eliminarAlumno(id);
    setAlumnos(prev => prev.filter(a => a.id !== id));
    console.log("🗑️ Alumno eliminado:", id);
  };

  useEffect(() => {
    const cargarAlumnos = async () => {
      try {
        const data = await listarAlumnos();
        setAlumnos(data);
      } catch (error) {
        console.error("Error al cargar alumnos:", error);
      } finally {
        setCargando(false);
      }
    };

    cargarAlumnos();
  }, []);

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">Listado de Alumnos</h2>

      <div className="mb-4 text-right">
        <button
          onClick={() => navigate('/panel/alumnos/crear')}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 text-sm"
        >
          ➕ Nuevo Alumno
        </button>
      </div>

      {cargando ? (
        <p className="text-gray-500">Cargando alumnos...</p>
      ) : alumnos.length === 0 ? (
        <p className="text-gray-500">No hay alumnos registrados.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 bg-white shadow text-xs sm:text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border-b">#</th>
                <th className="px-4 py-2 border-b">Nombre</th>
                <th className="px-4 py-2 border-b">apellido</th>
                <th className="px-4 py-2 border-b">carnet</th>
                <th className="px-4 py-2 border-b text-center">Acciones</th>

              </tr>
            </thead>
            <tbody>
              {alumnos.map((alumno, index) => (
                <tr key={alumno.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border-b">{alumno.id}</td>
                  <td className="px-4 py-2 border-b">{alumno.nombre}</td>
                  <td className="px-4 py-2 border-b">{alumno.apellido}</td>
                  <td className="px-4 py-2 border-b">{alumno.Ci}</td>
                  <td className="px-4 py-2 border-b text-center">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => handleVer(alumno.id)}
                        className="p-1 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-600"
                        title="Ver"
                      >
                        <FaEye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => navigate(`/panel/alumnos/${alumno.id}/contrasena`)}
                        className="p-1 rounded-full bg-yellow-100 hover:bg-yellow-200 text-yellow-600"
                        title="Cambiar contraseña"
                      >
                        <FaEdit className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => navigate(`/panel/alumnos/${alumno.id}/inscribir`)}
                        className="p-1 rounded-full bg-green-100 hover:bg-green-200 text-green-600"
                        title="Inscribir"
                      >
                        📝
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AlumnoListPage;
