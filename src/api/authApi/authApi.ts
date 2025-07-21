import { authHttp } from './authHttp';
import type { LoginRequest, RegisterRequest, TokenData, TokenResponse } from './types';

export async function register(payload: RegisterRequest): Promise<void> {
  await authHttp.post('/auth/register', payload);
}

export async function login(payload: LoginRequest): Promise<TokenData> {
  const { data } = await authHttp.post<TokenResponse>('/auth/login', payload);
  return {
    accessToken: data.access_token,
    refreshToken: data.refresh_token,
  };
}
export async function refreshAccessToken(refreshToken: string): Promise<TokenResponse> {
  const { data } = await authHttp.post<TokenResponse>('/auth/refresh', {
    refresh_token: refreshToken,
  });
  return data;
}
