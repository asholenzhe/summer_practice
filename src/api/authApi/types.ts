interface BaseAuthRequest {
  email: string;
  password: string;
}

export interface LoginRequest extends BaseAuthRequest {}

export interface RegisterRequest extends BaseAuthRequest {
  first_name: string;
  last_name: string;
}

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
