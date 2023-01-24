import create from 'zustand';
import { persist } from 'zustand/middleware';

type AuthState = {
  username?: string;
};

type AuthActions = {
  authenticate: (username: string) => void;
  isAuthenticated: () => boolean;
  logout: () => void;
};

export const useAuthStore = create(
  persist<AuthState & AuthActions>(
    (set, get) => ({
      authenticate: (username: string) =>
        set(() => ({
          username,
        })),
      isAuthenticated: () => {
        return get().username !== undefined;
      },
      logout: () =>
        set(() => ({
          username: undefined,
        })),
    }),
    { name: 'auth-storage' },
  ),
);
