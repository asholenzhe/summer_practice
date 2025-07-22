import type { UserResponse } from '@/api/user/types.ts';
import { axiosInstance } from '@/api/shared/axiosInstance.ts';

export async function getUser(): Promise<UserResponse> {
  const response = await axiosInstance.get('/users/me');
  return response.data;
}
