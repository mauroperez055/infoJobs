import { create } from 'zustand';

export const useFavoriteStore = create((set, get) => ({
  // Estado
  favorites: [],

  // Acciones
  addFavorite: (id) => {
    set((state) => ({
      favorites: state.favorites.includes(id)
        ? state.favorites
        : [...state.favorites, id]
    }))
  },

  removeFavorite: (id) => {
    set((state) => ({
      favorites: state.favorites.filter((favId) => favId !== id)
    }))
  },

  isFavorite: (id) => {
    return get().favorites.includes(id);
  },

  toggleFavorite: (id) => {
    const { isFavorite, addFavorite, removeFavorite } = get(); // obtengo las acciones y estado actuales
    const isFav = isFavorite(id);
    isFav ? removeFavorite(id) : addFavorite(id);
  },

  // Estado derivado
  countFavorites: () => get().favorites.length
}))