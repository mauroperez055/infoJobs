import { useState, useEffect } from "react";

/**
 * Hook que nos permite navegar en la aplicacion 
 * como si fuera una SPA (Single Page Application)
 */

export function useRouter() {
  /* uso window.location.pathname para saber en que ruta estamos, es decir la ruta actual */
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    }

    window.addEventListener('popstate', handleLocationChange);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
    }
  }, [])

  function navigateTo(path)  {
    window.history.pushState({}, '', path); // actualizo el historial de la barra de direcciones
    window.dispatchEvent(new PopStateEvent('popstate'));
    // popstate nos indica que esta cambiando la url
  }

  return {
    currentPath,
    navigateTo
  }
}