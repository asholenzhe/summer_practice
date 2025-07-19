import { authHttp } from '@/api/authApi/authHttp.ts';
import type {
  LoginRequest,
  RegisterRequest,
  TokenData,
  TokenResponse,
} from '@/api/authApi/types.ts';
import { AuthStore } from '@/store/AuthStore.tsx';

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

export async function refreshAccessToken(): Promise<string> {
  const refreshToken = AuthStore.getState().refreshToken;
  if (!refreshToken) throw new Error('No refresh token');

  const { data } = await authHttp.post<TokenResponse>('/refresh', {
    refresh_token: refreshToken,
  });

  const { access_token, refresh_token } = data;
  AuthStore.getState().setTokens({
    accessToken: access_token,
    refreshToken: refresh_token,
  });
  return access_token;
}
