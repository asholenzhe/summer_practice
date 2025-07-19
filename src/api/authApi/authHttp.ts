import axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios';
import type { ErrorResponse, RetryableRequestConfig } from '@/api/authApi/types.ts';
import { AuthStore } from '@/store/AuthStore.tsx';
import { refreshAccessToken } from '@/api/authApi/authApi.ts';

const BASE_URL = 'http://localhost:8080/auth';

const authHttp = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

authHttp.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  if (
    config.url?.endsWith('/login') ||
    config.url?.endsWith('/register') ||
    config.url?.endsWith('/refresh')
  ) {
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
        const newToken = await refreshAccessToken();
        original.headers!['Authorization'] = `Bearer ${newToken}`;
        return authHttp.request(original);
      } catch {
        AuthStore.getState().logout();
        window.location.href = '/login';
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
