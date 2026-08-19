import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

import { assistantGreeting, formattedTime, selectAssistantReply, type AppTheme, type ChatMessage } from "@/lib/shrija-domain";

const STORAGE_KEY = "shrija-ai-mobile-v2";

type StoredState = {
  isSignedIn: boolean;
  theme: AppTheme;
  messages: ChatMessage[];
};

type ShrijaContextValue = StoredState & {
  ready: boolean;
  signIn: () => void;
  signOut: () => void;
  toggleTheme: () => void;
  sendMessage: (text: string) => void;
  clearConversation: () => void;
};

const initialState: StoredState = {
  isSignedIn: false,
  theme: "light",
  messages: [assistantGreeting],
};

const ShrijaContext = createContext<ShrijaContextValue | null>(null);

export function ShrijaProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<StoredState>(initialState);
  const [ready, setReady] = useState(false);

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

  const signIn = useCallback(() => setState((current) => ({ ...current, isSignedIn: true })), []);
  const signOut = useCallback(() => setState((current) => ({ ...current, isSignedIn: false })), []);
  const toggleTheme = useCallback(() => setState((current) => ({ ...current, theme: current.theme === "light" ? "dark" : "light" })), []);
  const clearConversation = useCallback(() => setState((current) => ({ ...current, messages: [assistantGreeting] })), []);

  const sendMessage = useCallback((text: string) => {
    const value = text.trim();
    if (!value) return;
    const userMessage: ChatMessage = { id: `user-${Date.now()}`, role: "user", text: value, createdAt: formattedTime() };
    const response: ChatMessage = {
      id: `assistant-${Date.now() + 1}`,
      role: "assistant",
      text: selectAssistantReply(value),
      createdAt: formattedTime(),
    };
    setState((current) => ({ ...current, messages: [...current.messages, userMessage, response] }));
  }, []);

  const value = useMemo(() => ({ ...state, ready, signIn, signOut, toggleTheme, sendMessage, clearConversation }), [clearConversation, ready, sendMessage, signIn, signOut, state, toggleTheme]);
  return <ShrijaContext.Provider value={value}>{children}</ShrijaContext.Provider>;
}

export function useShrija(): ShrijaContextValue {
  const context = useContext(ShrijaContext);
  if (!context) throw new Error("useShrija must be used within ShrijaProvider");
  return context;
}
