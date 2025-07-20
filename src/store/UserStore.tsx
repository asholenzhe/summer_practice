import { create } from 'zustand';

interface UserStore {
  email: string;
  first_name: string;
  last_name: string;
  setNames: (first_name: string, last_name: string) => void;
}

export const UserStore = create<UserStore>((set) => ({
  email: '',
  first_name: '',
  last_name: '',

  setNames: (first_name, last_name) => {
    set({ first_name, last_name });
  },
}));
