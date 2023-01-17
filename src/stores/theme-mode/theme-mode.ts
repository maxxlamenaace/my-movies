import create from 'zustand';
import { persist } from 'zustand/middleware';

import { ThemeModes } from '@/theme/colors';

type ThemeState = {
  mode: ThemeModes;
};

type ThemeActions = {
  switchMode: () => void;
  isDark: () => boolean;
};

const initialState: ThemeState = {
  mode: 'dark',
};

export const useThemeModeStore = create(
  persist<ThemeState & ThemeActions>(
    (set, get) => ({
      ...initialState,
      switchMode: () =>
        set((state) => ({
          mode: state.mode === 'dark' ? 'light' : 'dark',
        })),
      isDark: () => {
        return get().mode === 'dark';
      },
    }),
    { name: 'theme-storage' },
  ),
);
