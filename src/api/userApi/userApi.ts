import { http } from '@/api/shared/http.ts';
import type { UserResponse } from '@/api/userApi/types.ts';

export async function getUser(): Promise<UserResponse> {
  const response = await http.get('/users/me');
  return response.data;
}
