import create from 'zustand';
import { persist } from 'zustand/middleware';

type AppState = {
  loading: boolean;
};

type AppActions = {
  setLoading: (loading: boolean) => void;
};

export const useAppStore = create(
  persist<AppState & AppActions>(
    (set) => ({
      loading: false,
      setLoading: (loading: boolean) =>
        set(() => ({
          loading,
        })),
    }),
    { name: 'auth-storage' },
  ),
);
