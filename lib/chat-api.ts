import { orchestratorClient } from "@/lib/api-client";

/** Mirrors orchestrator-agent's dto.OrchestratorChatResponse. */
export type OrchestratorChatResult = {
  sessionId: string;
  responseText: string;
};

/**
 * POST /api/v1/orchestrator/chat — the single entry point for the Shrija AI
 * assistant. userId/role/employeeId are never sent from the client; the
 * orchestrator derives them from the verified JWT, so only sessionId +
 * message are needed here. Passing the previous response's sessionId keeps
 * the conversation continuous; pass undefined/null to start a new session.
 */
export async function sendChatMessage(
  token: string,
  message: string,
  sessionId?: string | null,
): Promise<OrchestratorChatResult> {
  const response = await orchestratorClient.post<OrchestratorChatResult>(
    "/api/v1/orchestrator/chat",
    { sessionId: sessionId ?? null, message },
    { headers: { Authorization: `Bearer ${token}` } },
  );
  return response.data;
}
