import { create } from 'zustand';
import type { UserName } from '@/api/userApi/types.ts';

export interface UserState extends UserName {
  setUser: (user: { firstName: string; lastName: string }) => void;
}

export const UserStore = create<UserState>((set) => ({
  firstName: '',
  lastName: '',
  setUser: ({ firstName, lastName }) => set({ firstName, lastName }),
}));
