export type AppTheme = "light" | "dark";
export type ChatRole = "assistant" | "user";

export type ChatMessage = { id: string; role: ChatRole; text: string; createdAt: string };
export type NotificationItem = { id: string; title: string; body: string; time: string; icon: "auto-awesome" | "campaign" | "security" | "tips-and-updates"; unread: boolean };

export const demoCredentials = { email: "priya.sharma@adk.com", password: "Shrija@123" } as const;

export function isDemoLogin(email: string, password: string): boolean {
  return email.trim().toLowerCase() === demoCredentials.email && password === demoCredentials.password;
}

export const employee = { name: "Priya Sharma", initials: "PS", email: demoCredentials.email, role: "Team member" };
export const assistantGreeting: ChatMessage = { id: "welcome", role: "assistant", text: "Hello Priya. I’m Shrija, your AI work companion. Ask me anything about policies, leave, attendance, or your workplace.", createdAt: "Now" };
export const notifications: NotificationItem[] = [
  { id: "welcome", title: "Shrija is ready", body: "Your personal AI workspace is ready whenever you need a quick answer.", time: "Today", icon: "auto-awesome", unread: true },
  { id: "privacy", title: "Your data stays protected", body: "The static prototype stores only your temporary conversation on this device.", time: "Yesterday", icon: "security", unread: false },
  { id: "tip", title: "Try a detailed question", body: "Ask Shrija to explain a policy or prepare a concise workplace update.", time: "Earlier", icon: "tips-and-updates", unread: false },
];

const replies = {
  leave: "I can help with leave questions. When your external backend is connected, I’ll retrieve your current balance, leave policy, and request history securely.",
  attendance: "I can help you understand attendance expectations and records. Connect your existing backend API when you are ready to show live attendance data here.",
  policy: "I can explain workplace policies in a clear, practical way. Ask a more specific question and I’ll keep the answer concise.",
  default: "I’m ready to help. You can ask about workplace policies, leave, attendance, or how to prepare a professional update.",
} as const;

export function selectAssistantReply(question: string): string {
  const query = question.trim().toLowerCase();
  if (query.includes("leave") || query.includes("holiday") || query.includes("time off")) return replies.leave;
  if (query.includes("attendance") || query.includes("check in") || query.includes("check-in")) return replies.attendance;
  if (query.includes("policy") || query.includes("rule") || query.includes("work from home")) return replies.policy;
  return replies.default;
}

export function formattedTime(): string { return new Intl.DateTimeFormat("en-IN", { hour: "numeric", minute: "2-digit" }).format(new Date()); }
