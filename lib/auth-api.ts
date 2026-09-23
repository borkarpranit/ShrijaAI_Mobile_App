import { authClient } from "@/lib/api-client";

/** Mirrors auth-service's entity.Role enum. */
export type UserRole = "EMPLOYEE" | "MANAGER" | "HR" | "ADMIN";

/** Mirrors auth-service's dto.LoginResponse. */
export type LoginResult = {
  userId: number;
  username: string;
  role: UserRole;
  employeeId: number | null;
  message: string;
  token: string;
};

/** Mirrors auth-service's dto.UserResponse (GET /api/auth/me). */
export type CurrentUser = {
  userId: number;
  username: string;
  role: UserRole;
  employeeId: number | null;
};

/** POST /api/auth/login — the only field the backend accepts is username + password. */
export async function login(username: string, password: string): Promise<LoginResult> {
  const response = await authClient.post<LoginResult>("/api/auth/login", {
    username,
    password,
  });
  return response.data;
}

/** GET /api/auth/me — used to refresh/validate the signed-in user's profile. */
export async function fetchCurrentUser(token: string): Promise<CurrentUser> {
  const response = await authClient.get<CurrentUser>("/api/auth/me", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}
