
import { Car } from "@/types/cars";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CarStore {
  favorites: Car[];
  addToFavorites: (car: Car) => void;
  removeFromFavorites: (id: string) => void;
  isFavorite: (id: string) => boolean;
  clearFavorites: () => void;
};

export const useCarStore = create<CarStore>()(
  persist(
    (set, get) => ({
      favorites: [],

      addToFavorites: (car) => {
        const { favorites } = get();

        if (!favorites.some((fav) => fav.id === car.id)) {
          set({ favorites: [...favorites, car] });
        }
      },

      removeFromFavorites: (id) => {
        set({
          favorites: get().favorites.filter((car) => car.id !== id),
        });
      },

      isFavorite: (id) => {
        return get().favorites.some((car) => car.id === id);
      },

      clearFavorites: () => set({ favorites: [] }),
    }),
    {
      name: "favorite-cars",
      partialize: (state) => ({ favorites: state.favorites }),
    }
  )
);