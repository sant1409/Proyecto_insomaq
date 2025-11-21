import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ArcElement
);

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Datos para gráfico de barras
  const barData = {
    labels: ["Máquina 1", "Máquina 2", "Máquina 3", "Máquina 4"],
    datasets: [
      {
        label: "Cortes",
        data: [13, 18, 13, 10],
        backgroundColor: "#0b9fbf",
      },
    ],
  };

  // Opciones para gráfico de barras
  const barOptions = {
    responsive: true,
    plugins: { legend: { display: false } },
  };

  // Datos para gráfico circular
  const pieData = {
    labels: ["Usado 65%", "Desperdicio 35%"],
    datasets: [
      {
        data: [65, 35],
        backgroundColor: ["#0b9fbf", "#1f3b63"],
      },
    ],
  };

  // Opciones para gráfico circular
  const pieOptions = {
    responsive: true,
  };

  return (
    <div className="max-w-full p-5 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-3xl font-bold">Gestión de Inventario de Láminas</h1>
        <div className="text-2xl">🔔 👤</div>
      </div>

      {/* Cards resumen */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-5">
        <button
          onClick={() => navigate("/laminas")}
          className="bg-white p-5 rounded-xl shadow text-center hover:bg-cyan-50 hover:scale-105 transition transform"
        >
          <div className="text-4xl mb-2">📚</div>
          <p className="text-2xl font-bold">300</p>
          <span className="text-lg font-medium">Láminas</span>
        </button>

        <button
          onClick={() => navigate("/cortes")}
          className="bg-white p-5 rounded-xl shadow text-center hover:bg-cyan-50 hover:scale-105 transition transform"
        >
          <div className="text-4xl mb-2">✂️</div>
          <p className="text-2xl font-bold">58</p>
          <span className="text-lg font-medium">Cortes</span>
        </button>

        <button
          onClick={() => navigate("/retazos")}
          className="bg-white p-5 rounded-xl shadow text-center hover:bg-cyan-50 hover:scale-105 transition transform"
        >
          <div className="text-4xl mb-2">⛏️</div>
          <p className="text-2xl font-bold">120</p>
          <span className="text-lg font-medium">Retazos</span>
        </button>

        <button
          onClick={() => navigate("/alertas")}
          className="bg-white p-5 rounded-xl shadow text-center hover:bg-red-50 hover:scale-105 transition transform"
        >
          <div className="text-4xl mb-2">⚠️</div>
          <p className="text-2xl font-bold">12</p>
          <span className="text-lg font-medium text-red-600">Alertas</span>
        </button>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
        <div className="bg-white p-5 rounded-xl shadow md:col-span-2">
          <h2 className="text-xl font-semibold mb-3">Cortes por máquina</h2>
          <Bar data={barData} options={barOptions} />
        </div>
        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-3">% de aprovechamiento</h2>
          <Pie data={pieData} options={pieOptions} />
        </div>
      </div>

      {/* Tablas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-3">Últimas actividades</h2>
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="p-2">Fecha</th>
                <th className="p-2">Acción</th>
                <th className="p-2">Usuario</th>
                <th className="p-2">Máquina</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100">
                <td className="p-2">15/09/2025</td>
                <td className="p-2">Corte realizado (L001)</td>
                <td className="p-2">Juan</td>
                <td className="p-2">CNC-01</td>
              </tr>
              <tr>
                <td className="p-2">15/09/2025</td>
                <td className="p-2">Nueva lámina registrada</td>
                <td className="p-2">María</td>
                <td className="p-2">-</td>
              </tr>
            </tbody>
          </table>
        </div>  

        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-3">Alertas</h2>
          <ul className="list-disc pl-5 text-sm">
            <li>Lámina de acero 2mm: stock bajo (2 unidades).</li>
            <li>Lamina de aluminio 3mm: stock bajo (1 unidad).</li>
            <li className="text-red-600 font-bold">
              Lamina de acero inoxidable 2mm: sin stock (0 unidades).
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
