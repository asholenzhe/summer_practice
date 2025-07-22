type AuthCredentials = {
  email: string;
  password: string;
};

export type UserNameApi = {
  first_name: string;
  last_name: string;
};

export type LoginRequest = AuthCredentials;

export type RegisterRequest = AuthCredentials & UserNameApi;

export type TokenResponse = {
  access_token: string;
  refresh_token: string;
};

export type TokenData = {
  accessToken: string;
  refreshToken: string;
};
