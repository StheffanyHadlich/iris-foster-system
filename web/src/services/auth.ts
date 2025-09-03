import api from "./api";

interface LoginResponse {
  access_token: string;
}

interface RegisterResponse {
  id: string;
  email: string;
  username: string;
}

export async function login(email: string, password: string): Promise<LoginResponse> {
  const res = await api.post<LoginResponse>("/auth/login", { email, password });
  return res.data;
}

export async function register(username: string, email: string, password: string): Promise<RegisterResponse> {
  const res = await api.post<RegisterResponse>("/auth/register", { username, email, password });
  return res.data;
}
