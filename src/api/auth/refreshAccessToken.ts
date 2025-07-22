import type { TokenResponse } from '@/api/auth/types.ts';
import { axiosInstance } from '@/api/shared/axiosInstance.ts';

export async function refreshAccessToken(refreshToken: string): Promise<TokenResponse> {
  const { data } = await axiosInstance.post<TokenResponse>('/auth/refresh', {
    refresh_token: refreshToken,
  });
  return data;
}
