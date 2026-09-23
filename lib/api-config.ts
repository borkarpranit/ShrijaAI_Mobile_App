import { Platform } from "react-native";

/**
 * Backend connection settings.
 *
 * The HRMS backend is a set of separate Spring Boot services. The two the
 * mobile app talks to directly are:
 *   - auth-service        (default port 8081) -> login / current user
 *   - orchestrator-agent  (default port 8080) -> the Shrija AI chat endpoint
 *
 * By default this resolves to `localhost`, which works for:
 *   - iOS Simulator
 *   - Web / Expo web preview
 *
 * It does NOT work for:
 *   - Android emulator, which must use 10.0.2.2 to reach the host machine's
 *     localhost (handled automatically below).
 *   - A physical phone (Expo Go / dev build), which must use your computer's
 *     LAN IP address, e.g. 192.168.1.50 (same Wi-Fi network as the backend).
 *
 * To point the app at a different machine or a deployed backend, set these
 * in a `.env` file at the project root (see `.env.example`):
 *
 *   EXPO_PUBLIC_API_HOST=192.168.1.50
 *   EXPO_PUBLIC_AUTH_SERVICE_PORT=8081
 *   EXPO_PUBLIC_ORCHESTRATOR_PORT=8080
 *
 * or set full URLs directly if the services aren't on the same host/scheme:
 *
 *   EXPO_PUBLIC_AUTH_SERVICE_URL=https://api.example.com/auth
 *   EXPO_PUBLIC_ORCHESTRATOR_URL=https://api.example.com/orchestrator
 */

function defaultHost(): string {
  if (Platform.OS === "android") return "10.0.2.2";
  return "localhost";
}

const HOST = process.env.EXPO_PUBLIC_API_HOST?.trim() || defaultHost();
const AUTH_PORT = process.env.EXPO_PUBLIC_AUTH_SERVICE_PORT?.trim() || "8081";
const ORCHESTRATOR_PORT = process.env.EXPO_PUBLIC_ORCHESTRATOR_PORT?.trim() || "8080";

export const AUTH_SERVICE_URL =
  process.env.EXPO_PUBLIC_AUTH_SERVICE_URL?.trim() || `http://${HOST}:${AUTH_PORT}`;

export const ORCHESTRATOR_URL =
  process.env.EXPO_PUBLIC_ORCHESTRATOR_URL?.trim() || `http://${HOST}:${ORCHESTRATOR_PORT}`;
