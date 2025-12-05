export interface LoginResponse {
  success: boolean;
  response: {
    Id: string;
    username: string;
    email: string;
    role: string;
    phone: number;
    token: string;
    refreshtoken: string;
  }
}

export interface AuthUserData {
  username: string;
  email: string;
  token: string;
  refreshtoken: string;
}

export interface AuthResponse {
  success: boolean;
  userdata: AuthUserData;
}
