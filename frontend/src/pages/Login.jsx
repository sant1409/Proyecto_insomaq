import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Usuario de prueba (puedes cambiarlo o agregar más)
  const validUser = {
    email: "admin@insomaq.com",
    password: "ADSO1234",
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (email === validUser.email && password === validUser.password) {
      // Guardar estado de sesión (simulado)
      localStorage.setItem("loggedIn", "true");

      // Redirigir al home
      navigate("/home");
    } else {
      setError("Correo o contraseña incorrectos");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Izquierda: formulario */}
      <div className="flex-1 bg-white p-10 flex flex-col justify-center">
        <img
          src="https://insomaq.com/wp-content/uploads/2023/09/cropped-logo-insomaq-horizontal-1.png"
          alt="Insomaq Logo"
          className="mb-6 w-48"
        />
        <h2 className="text-2xl font-semibold mb-6 text-gray-900">
          Bienvenido a Insomaq,
          <br />
          Inicie sesión para continuar
        </h2>

        {/* Mensaje de error */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="max-w-md">
          <label className="block mb-2 font-medium" htmlFor="email">
            Correo electrónico
          </label>
          <input
            id="email"
            type="email"
            placeholder="correo@ejemplo.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 mb-6 rounded border border-gray-300 bg-blue-50 text-gray-900"
          />

          <label className="block mb-2 font-medium" htmlFor="password">
            Contraseña
          </label>
          <input
            id="password"
            type="password"
            placeholder="••••••••"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 mb-6 rounded border border-gray-300 bg-blue-50 text-gray-900"
          />

          <div className="flex justify-between items-center text-sm mb-6">
            <label className="flex items-center gap-2">
              <input type="checkbox" />
              Recuérdame
            </label>
            <button
              type="button"
              onClick={() => alert("Función para recuperar contraseña")}
              className="text-cyan-500 hover:underline focus:outline-none"
            >
              ¿Olvidaste tu contraseña?
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-cyan-500 text-white py-3 rounded hover:bg-cyan-600 transition"
          >
            Iniciar sesión
          </button>
        </form>
      </div>

      {/* Derecha: imagen y mensaje */}
      <div
        className="flex-1 bg-cyan-500 text-white flex flex-col justify-center items-center text-center p-16"
        style={{
          backgroundImage: 'url("./images/Insomaq-3-e1728386607604.webp")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundBlendMode: "multiply",
        }}
      >
        <h1 className="text-5xl font-bold mb-6">¡BIENVENIDOS A INSOMAQ!</h1>
        <p className="text-lg max-w-lg">
          Metalizando tus sueños, construyendo realidades...
        </p>
      </div>
    </div>
  );
}
