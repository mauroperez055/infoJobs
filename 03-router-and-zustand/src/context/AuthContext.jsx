import { createContext, use, useState } from "react";

/**
 * "use" tambien sirve para leer contexto como useContext, 
 * ademas sirve para leer promesas
 */


/**
 * Cuando creamos un contexto necesitamos dos cosas:
 * 1- el proveedor de la información
 * 2- el consumidor de esa información
 */
export const AuthContext = createContext(); // creo el contexto

export function AuthProvider ({ children }) {
  const [isLoggedIn, setLoggedIn] = useState(false);
  
  const login = () => {
    setLoggedIn(true);
  }

  const logout = () => {
    setLoggedIn(false);
  }

  const value = {
    isLoggedIn,
    login,
    logout
  }

  {/**
  * El Contexto debe envolver la parte de la aplicación
  * que queremos que pueda utilizar estos datos
  */}
  return <AuthContext value={value}>
    {children}
  </AuthContext>
}

export function useAuth() {
  const context = use(AuthContext);

  /**
   * Este control sirve para no olvidarse de envolver App con AuthProvider
   */
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}