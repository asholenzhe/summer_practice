import axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios';
import type { ErrorResponse, RetryableRequestConfig } from './types';
import { AuthStore } from '@/store/AuthStore.tsx';
import { refreshAccessToken } from '@/api/authApi/authApi.ts';

const NO_AUTH_PATHS = ['/login', '/register', '/refresh'];

const authHttp = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

authHttp.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const url = config.url ?? '';
  if (NO_AUTH_PATHS.some((path) => url.endsWith(path))) {
    return config;
  }
  const token = AuthStore.getState().accessToken;
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

authHttp.interceptors.response.use(
  (res) => res,
  async (err: AxiosError<ErrorResponse>) => {
    const original = err.config!;
    const status = err.response?.status;
    const serverMsg = err.response?.data?.error;

    if (
      status === 401 &&
      serverMsg === 'invalid token' &&
      !(original as RetryableRequestConfig)._retry
    ) {
      (original as RetryableRequestConfig)._retry = true;
      try {
        const { access_token, refresh_token } = await refreshAccessToken(
          AuthStore.getState().refreshToken!,
        );
        AuthStore.getState().setTokens({ accessToken: access_token, refreshToken: refresh_token });
        original.headers!['Authorization'] = `Bearer ${access_token}`;
        return authHttp.request(original);
      } catch {
        AuthStore.getState().logout();
        return Promise.reject(new Error('session expired'));
      }
    }
    if (serverMsg) {
      return Promise.reject(new Error(serverMsg));
    }
    if (status) {
      return Promise.reject(new Error(`HTTP ${status}`));
    }
    if (err.request) {
      return Promise.reject(new Error('Network error'));
    }
    return Promise.reject(new Error(err.message));
  },
);

export { authHttp };
