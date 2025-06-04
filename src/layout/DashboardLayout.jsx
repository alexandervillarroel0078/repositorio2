// src/layout/DashboardLayout.jsx
import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  const [isOpen, setIsOpen] = useState(false); // por defecto oculto en móviles

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar isOpen={isOpen} toggle={() => setIsOpen(!isOpen)} />

      {/* Contenido principal */}
      <div className="flex flex-col flex-1 overflow-auto">
        {/* Header */}
        <div className="bg-black text-white h-16 flex items-center justify-between px-6 fixed top-0 left-0 right-0 z-30">
          <button onClick={() => setIsOpen(!isOpen)} className="text-white text-2xl lg:hidden">
            ☰
          </button>
          <h1 className="text-lg font-semibold">Aula Inteligente</h1>
          <i className="fas fa-user-circle text-2xl"></i>
        </div>

        {/* Contenido debajo del header */}
        <div className={`pt-16 transition-all duration-300 ml-0 lg:ml-64`}>

          <div className="p-4 w-full overflow-x-auto">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
