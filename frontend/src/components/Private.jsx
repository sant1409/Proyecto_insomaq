import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const loggedIn = localStorage.getItem("loggedIn") === "true";

  return loggedIn ? children : <Navigate to="/" replace />;
}
