import { useNavigate, useLocation } from 'react-router'
import { useAuthStore } from '../store/authStore';

export const HeaderUserButton = () => {
  const navigate = useNavigate(); // para ir a la ruta deseada
  const location = useLocation(); // para saber en que ruta estoy actualmente

  const { isLoggedIn, logout } = useAuthStore();

  const isLoginPage = location.pathname === '/login';

  const handleLogin = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  }

  // Usuario logueado -> botón Cerrar Sesión
  if (isLoggedIn) {
    return (
      <button onClick={handleLogout} className="button-apply-job">Cerrar sesión</button>
    )
  }

  // Usuario No logueado -> botón Iniciar Sesión
  return (
    <button disabled={isLoginPage} onClick={handleLogin} className="button-apply-job">Iniciar sesión</button>
  )
  
};
