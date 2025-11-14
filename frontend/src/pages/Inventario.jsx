import React, { useEffect, useState } from "react";

export default function Inventario() {
  const [laminas, setLaminas] = useState([]);
  const [tipos, setTipos] = useState([]);
  const [form, setForm] = useState({ largo: "", ancho: "", tipo_lamina: "" });

  const [editId, setEditId] = useState(null);

  const API_URL = "http://localhost:4000/laminas";

  useEffect(() => {
    fetchLaminas();
    fetchTipos();
  }, []);

  const fetchLaminas = async () => {
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("Error al obtener láminas");
      const data = await res.json();
      setLaminas(data);
    } catch (err) {
      console.error("Error al obtener las láminas:", err);
    }
  };

  const fetchTipos = async () => {
    try {
      const res = await fetch("http://localhost:4000/tipo-laminas");
      if (!res.ok) throw new Error("Error al obtener tipos");
      const data = await res.json();
      setTipos(data);
    } catch (err) {
      console.error("Error al obtener tipos:", err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.largo || !form.ancho || !form.tipo_lamina) {
      alert("Todos los campos son obligatorios");
      return;
    }

    try {
      // 1️⃣ Buscar si el tipo ya existe
      let tipoExistente = tipos.find(
        (t) => t.tipo_lamina.toLowerCase() === form.tipo_lamina.toLowerCase()
      );

      let id_tipo;
      if (tipoExistente) {
        id_tipo = tipoExistente.id;
      } else {
        // 2️⃣ Si no existe, crearlo
        const resTipo = await fetch("http://localhost:4000/tipo-laminas", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ tipo_lamina: form.tipo_lamina }),
        });

        const dataTipo = await resTipo.json();
        if (!resTipo.ok) throw new Error(dataTipo.error || "Error al crear tipo");

        id_tipo = dataTipo.id;
        await fetchTipos(); // refrescamos lista
      }

      // 3️⃣ Guardar la lámina con el id_tipo obtenido
      const laminaData = { largo: form.largo, ancho: form.ancho, id_tipo };

      const options = {
        method: editId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(laminaData),
      };

      const url = editId ? `${API_URL}/${editId}` : API_URL;
      const res = await fetch(url, options);
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Error al guardar la lámina");

      alert(data.message || "Operación exitosa");
      setForm({ largo: "", ancho: "", tipo_lamina: "" });
      setEditId(null);
      fetchLaminas();
    } catch (err) {
      console.error("Error al guardar la lámina:", err);
      alert(err.message);
    }
  };

  const handleEdit = (lamina) => {
    setForm({
      largo: lamina.largo,
      ancho: lamina.ancho,
      tipo_lamina: lamina.tipo,
    });
    setEditId(lamina.id);
  };

  const handleDelete = async (id) => {  
    if (window.confirm("¿Seguro que deseas eliminar esta lámina?")) {
      try {
        const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        const data = await res.json();

        if (!res.ok) throw new Error(data.error || "Error al eliminar");
        alert(data.message || "Lámina eliminada");
        fetchLaminas();
      } catch (err) {
        console.error("Error al eliminar la lámina:", err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 flex flex-col">
      <header className="bg-[#2a3f54] text-white py-5 shadow-lg">
        <h1 className="text-3xl font-semibold text-center">
          Inventario de Láminas
        </h1>
      </header>

      <main className="flex-1 w-full mx-auto px-7 py-8 flex flex-col gap-10">
        {/* Formulario */}
        <section className="bg-white p-8 rounded-2xl shadow-lg w-full">
          <h2 className="text-[#2a3f54] text-2xl font-semibold mb-6 border-b pb-2">
            {editId ? "Editar Lámina" : "Registrar Nueva Lámina"}
          </h2>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {/* Campo Largo */}
            <div className="relative">
              <input
                type="number"
                name="largo"
                value={form.largo}
                onChange={handleChange}
                placeholder="Largo"
                className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-teal-500 pr-12"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
                m
              </span>
            </div>

            {/* Campo Ancho */}
            <div className="relative">
              <input
                type="number"
                name="ancho"
                value={form.ancho}
                onChange={handleChange}
                placeholder="Ancho"
                className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-teal-500 pr-12"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
                m
              </span>
            </div>

            {/* Campo Tipo */}
            <div className="relative">
              <input
                list="tipos-lista"
                name="tipo_lamina"
                value={form.tipo_lamina || ""}
                onChange={(e) =>
                  setForm({ ...form, tipo_lamina: e.target.value })
                }
                placeholder="Selecciona o escribe un tipo de lámina"
                className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <datalist id="tipos-lista">
                {tipos.map((tipo) => (
                  <option key={tipo.id} value={tipo.tipo_lamina} />
                ))}
              </datalist>
            </div>

            <button
              type="submit"
              className="md:col-span-3 bg-teal-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition-all"
            >
              {editId ? "Actualizar Lámina" : "Agregar Lámina"}
            </button>
          </form>
        </section>

        {/* Tabla */}
        <section className="bg-white p-8 rounded-2xl shadow-lg overflow-x-auto">
          <h2 className="text-[#2a3f54] text-2xl font-semibold mb-6 border-b pb-2">
            Lista de Láminas
          </h2>

          <table className="min-w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-gray-200 text-gray-800 uppercase text-left">
              <tr>
                <th className="p-3 border-b border-gray-300">ID</th>
                <th className="p-3 border-b border-gray-300">Largo</th>
                <th className="p-3 border-b border-gray-300">Ancho</th>
                <th className="p-3 border-b border-gray-300">Tipo</th>
                <th className="p-3 border-b border-gray-300">Acciones</th>
              </tr>
            </thead>

            <tbody>
              {laminas.length > 0 ? (
                laminas.map((lamina) => (
                  <tr key={lamina.id} className="hover:bg-gray-50 transition">
                    <td className="p-3">{lamina.id}</td>

                    {/* Largo con 'mts' por defecto */}
                    <td className="p-3">
                      {lamina.largo !== undefined && lamina.largo !== ""
                        ? `${lamina.largo} m`
                        : "0 mts"}
                    </td>

                    {/* Ancho con 'mts' por defecto */}
                    <td className="p-3">
                      {lamina.ancho !== undefined && lamina.ancho !== ""
                        ? `${lamina.ancho} m`
                        : "0 mts"}
                    </td>

                    <td className="p-3">{lamina.tipo}</td>

                    <td className="p-3 flex gap-2">
                      <button
                        onClick={() => handleEdit(lamina)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(lamina.id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center text-gray-500 py-6 italic"
                  >
                    No hay láminas registradas
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}