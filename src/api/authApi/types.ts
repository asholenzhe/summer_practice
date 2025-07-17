export interface RegisterRequest {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
}

export type ErrorResponse = {
  error: string;
};
