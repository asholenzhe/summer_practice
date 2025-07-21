import { type AxiosError, type InternalAxiosRequestConfig } from 'axios';
import type { ErrorResponse } from '@/api/shared/types.ts';
import { http } from '@/api/shared/http.ts';

const authHttp = http;

authHttp.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  return config;
});

authHttp.interceptors.response.use(
  (res) => res,
  async (err: AxiosError<ErrorResponse>) => {
    const status = err.response?.status;
    const serverMsg = err.response?.data?.error;

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
