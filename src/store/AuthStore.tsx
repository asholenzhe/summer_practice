import { create } from 'zustand';

interface AuthState {
  isLoading: boolean;
  error: string | null;
  setLoading: (loading: boolean) => void;
  setErrorState: (message: string | null) => void;
}

export const AuthStore = create<AuthState>((set) => ({
  isLoading: false,
  error: null,

  setLoading: (loading) => set({ isLoading: loading }),
  setErrorState: (message) => set({ error: message }),
}));
