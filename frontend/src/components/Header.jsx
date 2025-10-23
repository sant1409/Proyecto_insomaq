import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("loggedIn"); // Limpia el estado de login
    navigate("/"); // Redirige al login
  };

  return (
    <header className="bg-black text-white p-4">
      <div className="flex items-center w-full">
        {/* Logo */}
        <span className="font-bold text-xl mr-6">Insomaq</span>

        {/* Botón hamburguesa (solo móvil) */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col space-y-1 ml-auto"
          aria-label="Toggle menu"
        >
          <span className="w-6 h-0.5 bg-white"></span>
          <span className="w-6 h-0.5 bg-white"></span>
          <span className="w-6 h-0.5 bg-white"></span>
        </button>

        {/* Menú */}
        <nav
          className={`${
            menuOpen ? "block" : "hidden"
          } absolute top-full left-0 w-full bg-black md:static md:flex md:flex-row md:items-center md:space-x-6 md:w-auto text-sm`}
        >
          <Link
            to="/home"
            className="block px-4 py-2 md:px-0 hover:text-cyan-500"
            onClick={() => setMenuOpen(false)} // cierra menú al click
          >
            Inicio
          </Link>
          <Link
            to="/a"
            className="block px-4 py-2 md:px-0 hover:text-cyan-500"
            onClick={() => setMenuOpen(false)}
          >
            Página A
          </Link>
          <Link
            to="/b"
            className="block px-4 py-2 md:px-0 hover:text-cyan-500"
            onClick={() => setMenuOpen(false)}
          >
            Página B
          </Link>
          <Link
            to="/c"
            className="block px-4 py-2 md:px-0 hover:text-cyan-500"
            onClick={() => setMenuOpen(false)}
          >
            Página C
          </Link>

          <Link
            to="/inventario"
            className="block px-4 py-2 md:px-0 hover:text-cyan-500"
            onClick={() => setMenuOpen(false)}
          >
            Inventario
          </Link>
        </nav>

        {/* Botón cerrar sesión en desktop */}
        <div className="hidden md:flex items-center space-x-4 ml-auto">
          <span className="font-semibold">Usuario</span>
          <button
            onClick={handleLogout}
            className="bg-red-600 px-3 py-1 rounded-md text-sm hover:bg-red-700 transition"
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    </header>
  );
}
