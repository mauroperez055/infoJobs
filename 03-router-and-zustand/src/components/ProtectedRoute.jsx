import { useAuthStore } from "../store/authStore";
import { Navigate } from "react-router";

/**
 * Componente que sirve para proteger una ruta.
 * Solo tienen acceso los usuarios que han iniciado sesión.
 */

export function ProtectedRoute ({ children, redirecTo='/login' }) {
  const { isLoggedIn } = useAuthStore();

  if (!isLoggedIn) {
    return <Navigate to={redirecTo} replace />
  }

  return children;
}