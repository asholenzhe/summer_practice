import { create } from 'zustand';
import type { TokenData } from '@/api/authApi/types.ts';

interface AuthState {
  isLoading: boolean;
  error: string | null;
  setLoading: (loading: boolean) => void;
  setErrorState: (message: string | null) => void;
  accessToken: string | null;
  refreshToken: string | null;
  setTokens: (tokens: TokenData) => void;
}

export const AuthStore = create<AuthState>((set) => ({
  isLoading: false,
  error: null,
  accessToken: null,
  refreshToken: null,

  setLoading: (loading) => set({ isLoading: loading }),
  setErrorState: (message) => set({ error: message }),
  setTokens: ({ accessToken, refreshToken }) => set({ accessToken, refreshToken }),
}));
