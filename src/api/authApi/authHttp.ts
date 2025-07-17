import axios, { type AxiosError } from 'axios';
import type { ErrorResponse } from '@/api/authApi/types.ts';

const BASE_URL = 'http://localhost:8080/auth';

const authHttp = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

authHttp.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken'); //TODO: get token from authStore
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

authHttp.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ErrorResponse>) => {
    const serverMsg = error.response?.data?.error;
    if (serverMsg) {
      return Promise.reject(new Error(serverMsg));
    }
    if (error.response) {
      return Promise.reject(new Error(`HTTP ${error.response.status}`));
    }
    if (error.request) {
      return Promise.reject(new Error('Network error. Check connection.'));
    }
    return Promise.reject(new Error(error.message));
  },
);

export { authHttp };
