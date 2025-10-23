import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Header from "./components/Header";
import Home from "./pages/Home";
import PageA from "./pages/PageA";
import PageB from "./pages/PageB";
import PageC from "./pages/PageC";
import Inventario from "./pages/Inventario";
import PrivateRoute from "./components/Private";

function App() {
  return (
    <Router>
      <Routes>
        {/* Ruta pública (login) */}
        <Route path="/" element={<Login />} />

        {/* Rutas privadas */}
        <Route
          path="/*"
          element={
            <PrivateRoute>
              <>
                <Header />
                <Routes>
                  <Route path="home" element={<Home />} />
                  <Route path="a" element={<PageA />} />
                  <Route path="b" element={<PageB />} />
                  <Route path="c" element={<PageC />} />
                  <Route path="inventario" element={<Inventario />} />
                  {/* Ruta comodín privada */}
                  <Route path="*" element={<Home />} />
                </Routes>
              </>
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
