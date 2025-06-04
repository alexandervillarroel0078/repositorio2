import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { inscribirAlumno } from '../services/usuarioService';

const AlumnoInscripcionPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [mensaje, setMensaje] = useState('');
    const [error, setError] = useState('');
    const [resultado, setResultado] = useState(null);
    const [inscribiendo, setInscribiendo] = useState(false);

    const handleInscripcion = async () => {
        setInscribiendo(true);
        setMensaje('');
        setError('');
        try {
            const data = await inscribirAlumno(parseInt(id));
            setResultado(data);
            setMensaje(data.mensaje);
        } catch (err) {
            setError(err.error || 'Error al inscribir');
        } finally {
            setInscribiendo(false);
        }
    };

    return (
        <div className="p-4 max-w-xl mx-auto">
            <h2 className="text-xl font-bold mb-4">Inscripción de Alumno</h2>

            {mensaje && (
                <div className="bg-green-100 text-green-700 p-3 rounded mb-4">
                    ✅ {mensaje}
                    <ul className="mt-2 text-sm">
                        <li><strong>Correo:</strong> {resultado?.correo_institucional}</li>
                        <li><strong>Contraseña:</strong> {resultado?.contraseña_asignada}</li>
                    </ul>
                </div>
            )}

            {error && (
                <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
                    ❌ {error}
                </div>
            )}

            {!mensaje && (
                <button
                    onClick={handleInscripcion}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 mb-4"
                    disabled={inscribiendo}
                >
                    {inscribiendo ? 'Inscribiendo...' : 'Inscribir Alumno'}
                </button>
            )}

            <br />

            <button
                onClick={() => navigate('/panel/alumnos')}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
                Volver al listado
            </button>
        </div>
    );
};

export default AlumnoInscripcionPage;
