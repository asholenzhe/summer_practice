import type { RegisterRequest } from '@/api/auth/types.ts';
import { axiosInstance } from '@/api/shared/axiosInstance.ts';

export async function register(payload: RegisterRequest): Promise<void> {
  await axiosInstance.post('/auth/register', payload);
}
