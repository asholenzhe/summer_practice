import type { LoginRequest, TokenData, TokenResponse } from '@/api/auth/types.ts';
import { axiosInstance } from '@/api/shared/axiosInstance.ts';

export async function login(payload: LoginRequest): Promise<TokenData> {
  const { data } = await axiosInstance.post<TokenResponse>('/auth/login', payload);
  return {
    accessToken: data.access_token,
    refreshToken: data.refresh_token,
  };
}
