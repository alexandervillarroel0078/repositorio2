// src/components/Header.jsx
import React, { useState } from 'react';
import { FaBars, FaUserCircle } from 'react-icons/fa';

const Header = ({ toggle }) => {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <header className="bg-black text-white flex justify-between items-center px-6 py-4 fixed top-0 left-0 w-full z-30 shadow">
      {/* Botón Menú + Título */}
      <div className="flex items-center space-x-4">
      {/*  <button onClick={toggle} className="bg-gray-800 hover:bg-gray-700 px-3 py-2 rounded">
          <FaBars />
        </button>*/}
        <h1 className="text-lg font-bold">Aula Inteligente</h1>
      </div>

      {/* Ícono Usuario */}
      <div className="relative">
        <button onClick={() => setOpenMenu(!openMenu)} className="hover:text-gray-300">
          <FaUserCircle size={22} />
        </button>

        {openMenu && (
          <ul className="absolute right-0 mt-2 w-48 bg-white text-black rounded shadow-md z-50">
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Perfil</li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Configuración</li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Registro de Actividad</li>
            <li
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white cursor-pointer rounded-b"
              onClick={() => {
                localStorage.removeItem("token");
                window.location.href = "/";
              }}
            >
              Cerrar sesión
            </li>
          </ul>
        )}
      </div>
    </header>
  );
};

export default Header;
