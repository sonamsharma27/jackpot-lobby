import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useFavoriteStore = create(
  persist(
    (set, get) => ({
      favouriteGames: [],
      addFavorite: (game) => {
        const exists = get().favouriteGames.find((g) => g.slug === game.slug);
        if (!exists) {
          set((state) => ({
            favouriteGames: [...state.favouriteGames, game],
          }));
        }
      },
      removeFavorite: (slug) => {
        set((state) => ({
          favouriteGames: state.favouriteGames.filter((g) => g.slug !== slug),
        }));
      },
      isFavorite: (slug) => {
        return get().favouriteGames.some((g) => g.slug === slug);
      },
    }),
    {
      name: "favourite-games", // localStorage key
    }
  )
);
