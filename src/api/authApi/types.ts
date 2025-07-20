import type { AxiosRequestConfig } from 'axios';

type BaseAuthRequest = {
  email: string;
  password: string;
};

export type LoginRequest = BaseAuthRequest;

export type RegisterRequest = BaseAuthRequest & {
  first_name: string;
  last_name: string;
};

export type TokenResponse = {
  access_token: string;
  refresh_token: string;
};

export type TokenData = {
  accessToken: string;
  refreshToken: string;
};

export type ErrorResponse = {
  error: string;
};

export interface RetryableRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

export type UserResponse = {
  email: string;
  first_name: string;
  id: string;
  last_name: string;
  role: string;
};
