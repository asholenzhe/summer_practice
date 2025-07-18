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
