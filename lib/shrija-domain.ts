import type { CurrentUser, UserRole } from "@/lib/auth-api";

export type AppTheme = "light" | "dark";
export type ChatRole = "assistant" | "user";

export type ChatMessage = { id: string; role: ChatRole; text: string; createdAt: string };
export type NotificationItem = { id: string; title: string; body: string; time: string; icon: "auto-awesome" | "campaign" | "security" | "tips-and-updates"; unread: boolean };

export const assistantGreeting: ChatMessage = { id: "welcome", role: "assistant", text: "Hello! I’m Shrija, your AI work companion. Ask me anything about policies, leave, attendance, or your workplace.", createdAt: "Now" };

export const notifications: NotificationItem[] = [
  { id: "welcome", title: "Shrija is ready", body: "Your personal AI workspace is ready whenever you need a quick answer.", time: "Today", icon: "auto-awesome", unread: true },
  { id: "privacy", title: "Your conversation is private", body: "Messages you send are processed by your organization's Shrija AI backend.", time: "Yesterday", icon: "security", unread: false },
  { id: "tip", title: "Try a detailed question", body: "Ask Shrija to explain a policy or prepare a concise workplace update.", time: "Earlier", icon: "tips-and-updates", unread: false },
];

const roleLabels: Record<UserRole, string> = {
  EMPLOYEE: "Team member",
  MANAGER: "Manager",
  HR: "HR",
  ADMIN: "Administrator",
};

export function roleLabel(role: UserRole | undefined): string {
  return role ? roleLabels[role] : "Team member";
}

/** First segment of an email/username, title-cased, for a friendly display name. */
export function displayName(user: CurrentUser | null): string {
  if (!user) return "there";
  const local = user.username.split("@")[0] ?? user.username;
  const first = local.split(/[._-]/)[0] ?? local;
  return first.charAt(0).toUpperCase() + first.slice(1);
}

/** Up to two initials derived from the username, for the Avatar bubble. */
export function initialsOf(user: CurrentUser | null): string {
  if (!user) return "??";
  const local = user.username.split("@")[0] ?? user.username;
  const parts = local.split(/[._-]/).filter(Boolean);
  const letters = parts.length >= 2 ? [parts[0][0], parts[1][0]] : [local[0], local[1] ?? local[0]];
  return letters.join("").toUpperCase();
}

export function formattedTime(): string { return new Intl.DateTimeFormat("en-IN", { hour: "numeric", minute: "2-digit" }).format(new Date()); }
