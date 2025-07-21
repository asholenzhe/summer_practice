import type { UserName } from '@/api/authApi/types.ts';
import { create } from 'zustand';

export interface UserState extends UserName {
  setUser: (user: { firstName: string; lastName: string }) => void;
}

export const UserStore = create<UserState>((set) => ({
  firstName: '',
  lastName: '',
  setUser: ({ firstName, lastName }) => set({ firstName, lastName }),
}));
