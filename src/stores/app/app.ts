import create from 'zustand';

type AppState = {
  loading: boolean;
};

type AppActions = {
  setLoading: (loading: boolean) => void;
};

const initialState: AppState = {
  loading: true,
};

export const useAppStore = create<AppState & AppActions>((set) => ({
  ...initialState,
  setLoading: (loading: boolean) =>
    set(() => ({
      loading,
    })),
}));
