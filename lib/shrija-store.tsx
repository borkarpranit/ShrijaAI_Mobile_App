import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

import { getApiErrorMessage } from "@/lib/api-client";
import { login as loginRequest, type CurrentUser } from "@/lib/auth-api";
import { sendChatMessage } from "@/lib/chat-api";
import { assistantGreeting, formattedTime, type AppTheme, type ChatMessage } from "@/lib/shrija-domain";

const STORAGE_KEY = "shrija-ai-mobile-v2";

type StoredState = {
  isSignedIn: boolean;
  theme: AppTheme;
  messages: ChatMessage[];
  token: string | null;
  user: CurrentUser | null;
  sessionId: string | null;
};

type ShrijaContextValue = StoredState & {
  ready: boolean;
  isAuthenticating: boolean;
  isSending: boolean;
  signIn: (username: string, password: string) => Promise<void>;
  signOut: () => void;
  toggleTheme: () => void;
  sendMessage: (text: string) => Promise<void>;
  clearConversation: () => void;
};

const initialState: StoredState = {
  isSignedIn: false,
  theme: "light",
  messages: [assistantGreeting],
  token: null,
  user: null,
  sessionId: null,
};

const ShrijaContext = createContext<ShrijaContextValue | null>(null);

export function ShrijaProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<StoredState>(initialState);
  const [ready, setReady] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    let active = true;
    void AsyncStorage.getItem(STORAGE_KEY)
      .then((raw) => {
        if (!raw || !active) return;
        try {
          const saved = JSON.parse(raw) as Partial<StoredState>;
          setState((current) => ({ ...current, ...saved, messages: saved.messages?.length ? saved.messages : current.messages }));
        } catch {
          void AsyncStorage.removeItem(STORAGE_KEY);
        }
      })
      .finally(() => {
        if (active) setReady(true);
      });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (ready) void AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [ready, state]);

  // Real sign-in against auth-service's POST /api/auth/login.
  const signIn = useCallback(async (username: string, password: string) => {
    setIsAuthenticating(true);
    try {
      const result = await loginRequest(username, password);
      const user: CurrentUser = {
        userId: result.userId,
        username: result.username,
        role: result.role,
        employeeId: result.employeeId,
      };
      setState((current) => ({
        ...current,
        isSignedIn: true,
        token: result.token,
        user,
        sessionId: null,
        messages: [assistantGreeting],
      }));
    } catch (error) {
      throw new Error(getApiErrorMessage(error, "Unable to sign in. Please try again."));
    } finally {
      setIsAuthenticating(false);
    }
  }, []);

  const signOut = useCallback(
    () =>
      setState((current) => ({
        ...current,
        isSignedIn: false,
        token: null,
        user: null,
        sessionId: null,
        messages: [assistantGreeting],
      })),
    [],
  );

  const toggleTheme = useCallback(() => setState((current) => ({ ...current, theme: current.theme === "light" ? "dark" : "light" })), []);
  const clearConversation = useCallback(() => setState((current) => ({ ...current, messages: [assistantGreeting], sessionId: null })), []);

  // Real chat turn against orchestrator-agent's POST /api/v1/orchestrator/chat.
  const sendMessage = useCallback(
    async (text: string) => {
      const value = text.trim();
      if (!value) return;

      const userMessage: ChatMessage = { id: `user-${Date.now()}`, role: "user", text: value, createdAt: formattedTime() };
      setState((current) => ({ ...current, messages: [...current.messages, userMessage] }));

      const token = state.token;
      if (!token) {
        const errorMessage: ChatMessage = {
          id: `assistant-${Date.now() + 1}`,
          role: "assistant",
          text: "You're signed out, so I can't reach the server. Please sign in again.",
          createdAt: formattedTime(),
        };
        setState((current) => ({ ...current, messages: [...current.messages, errorMessage] }));
        return;
      }

      setIsSending(true);
      try {
        const result = await sendChatMessage(token, value, state.sessionId);
        const response: ChatMessage = {
          id: `assistant-${Date.now() + 1}`,
          role: "assistant",
          text: result.responseText,
          createdAt: formattedTime(),
        };
        setState((current) => ({ ...current, sessionId: result.sessionId, messages: [...current.messages, response] }));
      } catch (error) {
        const response: ChatMessage = {
          id: `assistant-${Date.now() + 1}`,
          role: "assistant",
          text: getApiErrorMessage(error, "Something went wrong reaching Shrija. Please try again."),
          createdAt: formattedTime(),
        };
        setState((current) => ({ ...current, messages: [...current.messages, response] }));
      } finally {
        setIsSending(false);
      }
    },
    [state.token, state.sessionId],
  );

  const value = useMemo(
    () => ({ ...state, ready, isAuthenticating, isSending, signIn, signOut, toggleTheme, sendMessage, clearConversation }),
    [clearConversation, isAuthenticating, isSending, ready, sendMessage, signIn, signOut, state, toggleTheme],
  );
  return <ShrijaContext.Provider value={value}>{children}</ShrijaContext.Provider>;
}

export function useShrija(): ShrijaContextValue {
  const context = useContext(ShrijaContext);
  if (!context) throw new Error("useShrija must be used within ShrijaProvider");
  return context;
}
