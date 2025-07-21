import type { UserNameApi } from '@/api/authApi/types.ts';

export type UserResponse = UserNameApi & {
  email: string;
  id: string;
  role: string;
};

export type UserName = {
  firstName: string;
  lastName: string;
};
