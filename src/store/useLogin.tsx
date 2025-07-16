import { create } from 'zustand';

interface ILogin {
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  error: string | null;
}

export const useLogin = create<ILogin>((set) => ({
  loading: false,
  error: null,
  login: async (email, password) => {
    set({ loading: true });
    try {
      await new Promise((resolve, reject) =>
        setTimeout(() => {
          if (email.trim() !== '' && password.trim() !== '') resolve(null);
          else {
            reject(new Error('Email or password required'));
          }
        }, 1000),
      );
    } catch (e: any) {
      set({ error: e.message });
      throw e;
    } finally {
      set({ loading: false });
    }
  },
}));
