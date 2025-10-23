import React from "react";

export default function Inventario() {
  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      {/* Header */}
      <header className="bg-[#2a3f54] text-white p-4 text-center">
        <h1 className="text-2xl font-semibold">Inventario</h1>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto p-6">
        {/* Sección Láminas */}
        <section className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-[#2a3f54] text-xl font-semibold mb-4">Láminas</h2>
          <button
            className="bg-teal-500 hover:bg-teal-600 text-white font-semibold px-5 py-2 rounded mb-4"
            type="button"
          >
            Registrar nueva lámina
          </button>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200 text-gray-800">
                <th className="p-3 text-left border-b border-gray-300">Nombre</th>
                <th className="p-3 text-left border-b border-gray-300">Tipo</th>
                <th className="p-3 text-left border-b border-gray-300">Dimensiones</th>
                <th className="p-3 text-left border-b border-gray-300">Ubicación</th>
                <th className="p-3 text-left border-b border-gray-300">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-200">
                <td className="p-3">Lámina A</td>
                <td className="p-3">Acero</td>
                <td className="p-3">200x100</td>
                <td className="p-3">Estante 1</td>
                <td className="p-3 space-x-2">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded">
                    Editar
                  </button>
                  <button className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded">
                    Eliminar
                  </button>
                </td>
              </tr>
              {/* Más filas aquí */}
            </tbody>
          </table>
        </section>

        {/* Sección Retazos */}
        <section className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-[#2a3f54] text-xl font-semibold mb-4">Retazos</h2>
          <button
            className="bg-teal-500 hover:bg-teal-600 text-white font-semibold px-5 py-2 rounded mb-4"
            type="button"
          >
            Reutilizar en nuevos cortes
          </button>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200 text-gray-800">
                <th className="p-3 text-left border-b border-gray-300">Tipo</th>
                <th className="p-3 text-left border-b border-gray-300">Tamaño</th>
                <th className="p-3 text-left border-b border-gray-300">Ubicación</th>
                <th className="p-3 text-left border-b border-gray-300">Acción</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-200">
                <td className="p-3">Aluminio</td>
                <td className="p-3">50x30</td>
                <td className="p-3">Retazos - Cajón 3</td>
                <td className="p-3">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded">
                    Reutilizar
                  </button>
                </td>
              </tr>
              {/* Más filas aquí */}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}
