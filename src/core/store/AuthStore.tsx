import { create } from 'zustand';
import type { TokenData } from '@/api/auth/types.ts';

interface AuthState {
  isLoading: boolean;
  error: string | null;
  setIsLoading: (loading: boolean) => void;
  setErrorState: (message: string | null) => void;
  accessToken: string | null;
  refreshToken: string | null;
  setTokens: (tokens: TokenData) => void;
  logout: () => void;
}

const initialAccess = localStorage.getItem('accessToken');
const initialRefresh = localStorage.getItem('refreshToken');

export const AuthStore = create<AuthState>((set) => ({
  isLoading: false,
  error: null,
  accessToken: initialAccess,
  refreshToken: initialRefresh,

  setIsLoading: (loading) => set({ isLoading: loading }),
  setErrorState: (message) => set({ error: message }),

  setTokens: ({ accessToken, refreshToken }) => {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    set({ accessToken, refreshToken });
  },

  logout: () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    set({ accessToken: null, refreshToken: null, error: null });
  },
}));
