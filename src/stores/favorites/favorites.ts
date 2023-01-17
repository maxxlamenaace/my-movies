import create from 'zustand';
import { persist } from 'zustand/middleware';

import { Media } from '@/features/medias';

import { FavoriteItem } from './types';

type FavoritesState = {
  favorites: FavoriteItem[];
};

type FavoritesActions = {
  setFavorites: (favorites: FavoriteItem[]) => void;
  toggleFavorite: (item: FavoriteItem) => void;
  isFavorite: (mediaId: Media['id']) => boolean;
  getFavorite: (mediaId: Media['id']) => FavoriteItem | undefined;
};

const initialState: FavoritesState = {
  favorites: [],
};

export const useFavoritesStore = create(
  persist<FavoritesState & FavoritesActions>(
    (set, get) => ({
      ...initialState,
      setFavorites: (favorites: FavoriteItem[]) =>
        set(() => ({
          favorites,
        })),
      toggleFavorite: (item: FavoriteItem) =>
        set((state) => ({
          favorites: get().isFavorite(item.mediaId)
            ? [...state.favorites].filter((favorite) => favorite.mediaId !== item.mediaId)
            : [item, ...state.favorites],
        })),
      getFavorite: (mediaId: Media['id']) => {
        return get().favorites.find((favorite) => favorite.mediaId === mediaId);
      },
      isFavorite: (mediaId: Media['id']) => {
        return get().favorites.some((favorite) => favorite.mediaId === mediaId);
      },
    }),
    { name: 'favorites-storage' },
  ),
);
