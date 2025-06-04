import React from "react";

const Panel = () => {
  return (
    <div className="flex items-center justify-center h-[calc(100vh-4rem)] bg-gradient-to-br from-blue-50 to-white">
      <div className="text-center animate-fade-in-scale">
        <h1 className="text-4xl font-bold text-blue-800 mb-2">📚 Bienvenido, Alexander</h1>
        <p className="text-gray-600 text-sm">Sistema Escolar – Aula Inteligente</p>
      </div>
    </div>
  );
};

export default Panel;
