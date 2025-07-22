import type { AxiosRequestConfig } from 'axios';

export type ErrorResponse = {
  error: string;
};

export interface RetryableRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}
