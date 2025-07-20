import { authHttp } from '@/api/authApi/authHttp.ts';
import type { UserResponse } from '@/api/authApi/types.ts';

export async function getUser(): Promise<UserResponse> {
  const response = await authHttp.get('/users/me');
  return response.data;
}
