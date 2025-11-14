// src/pages/Laminas.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Laminas() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/inventario"); // 🔁 redirige automáticamente
  }, [navigate]);

  return null; // No muestra nada, solo redirige
}
