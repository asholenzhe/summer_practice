import { authHttp } from '@/api/authApi/authHttp.ts';
import type {
  LoginRequest,
  RegisterRequest,
  TokenData,
  TokenResponse,
} from '@/api/authApi/types.ts';

export async function register(payload: RegisterRequest): Promise<void> {
  await authHttp.post('/register', payload);
}

export async function login(payload: LoginRequest): Promise<TokenData> {
  const response = await authHttp.post<TokenResponse>('/login', payload);
  const { access_token, refresh_token } = response.data;
  return {
    accessToken: access_token,
    refreshToken: refresh_token,
  };
}
