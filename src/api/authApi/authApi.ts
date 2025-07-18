import { authHttp } from '@/api/authApi/authHttp.ts';
import type { RegisterRequest } from '@/api/authApi/types.ts';

export async function register(payload: RegisterRequest): Promise<void> {
  await authHttp.post('/register', payload);
}
