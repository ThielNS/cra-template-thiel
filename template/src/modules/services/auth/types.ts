export interface AuthServiceAccessProps {
  email: string;
  password: string;
}

export interface AuthServiceAccessResponse {
  accessToken: string;
  user: any;
}
