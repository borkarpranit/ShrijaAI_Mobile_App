import axios, { AxiosError } from "axios";

import { AXIOS_TIMEOUT_MS } from "@/constants/const";
import { AUTH_SERVICE_URL, ORCHESTRATOR_URL } from "@/lib/api-config";

/** Talks to auth-service: POST /api/auth/login, GET /api/auth/me. */
export const authClient = axios.create({
  baseURL: AUTH_SERVICE_URL,
  timeout: AXIOS_TIMEOUT_MS,
  headers: { "Content-Type": "application/json" },
});

/** Talks to orchestrator-agent: POST /api/v1/orchestrator/chat (requires Bearer token). */
export const orchestratorClient = axios.create({
  baseURL: ORCHESTRATOR_URL,
  timeout: AXIOS_TIMEOUT_MS,
  headers: { "Content-Type": "application/json" },
});

/**
 * The two backend services report errors with slightly different shapes:
 *   - auth-service's ApiExceptionHandler returns      { "message": "..." }
 *   - orchestrator-agent's JwtAuthenticationFilter returns { "error": "..." }
 * This normalizes both (plus network/timeout failures) into a single string
 * safe to show in an Alert.
 */
export function getApiErrorMessage(error: unknown, fallback: string): string {
  if (axios.isAxiosError(error)) {
    const err = error as AxiosError<{ message?: string; error?: string }>;
    const data = err.response?.data;
    if (data?.message) return data.message;
    if (data?.error) return data.error;
    if (err.code === "ECONNABORTED") return "The request timed out. Please try again.";
    if (!err.response) return "Couldn't reach the server. Check your network connection.";
  }
  return fallback;
}
