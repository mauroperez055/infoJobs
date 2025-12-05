
import { useNavigate, useLocation } from "react-router-dom";

/**
 * Hook que nos permite navegar en la aplicacion 
 * como si fuera una SPA (Single Page Application)
 */

export function useRouter() {

  const navigate = useNavigate(); // hook de react-router para navegar programaticamente
  const location = useLocation(); // hook de react-router para obtener la ubicacion actual

  function navigateTo(path)  {
    navigate(path); // navega a la ruta especificada
  }

  return {
    currentPath: location.pathname,
    navigateTo
  }
}