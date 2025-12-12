import { create } from 'zustand';

/**
 * Creamos una store en zustand que devuelve un custom hook
 * que sirve para leer la store y ejecutar las acciones.
 * El create recibe como parametro una funcion.
 * no necesitamos mas AuthProvider
 */

export const useAuthStore = create((set) => ({
  //Estado
  isLoggedIn: false,

  // Acciones
  login: () => set({ isLoggedIn: true }),
  logout: () => set({ isLoggedIn: false })
}))