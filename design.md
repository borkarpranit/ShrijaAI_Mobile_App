# Shrija AI — Focused Mobile Client Design

## Product focus

Shrija AI is now a lightweight, mobile-first assistant client. Its primary job is to give an employee a calm, fast conversational interface for HR questions. The application stays offline-first for the prototype, with a clearly defined API boundary for the user’s existing MySQL-backed backend. No database, server process, migrations, or credentials are bundled inside the React Native project.

## Screen list

| Screen | Purpose | Mobile layout |
|---|---|---|
| Splash | Brief branded handoff while local preferences load. | Full-screen mark, app name, and compact activity indicator. |
| Login | Simple local entry point until the external backend authentication endpoint is connected. | Single-column work-email form with a primary action in the lower thumb zone. |
| Shrija AI Assistant | The main ChatGPT-style conversation experience. | Slim native header, scrollable conversation, optional prompt chips, and a fixed safe-area-aware composer. |
| Profile | Employee identity, assistant settings, appearance preference, notifications entry, and sign-out. | Compact profile card followed by grouped native settings rows. |
| Notifications | Informational assistant and account updates. | Clear list with contextual icons, read state, and native back action. |

## Primary flow

The user enters through Splash, continues through Login, and lands directly in the **Shrija AI Assistant**. The chat is the default route after sign-in—not a dashboard. The top-right profile affordance opens Profile; Profile exposes Notifications and sign out. A minimal two-item bottom tab bar offers **Chat** and **Profile** only, keeping the interface centered on conversation.

## Chat interaction design

The chat follows familiar ChatGPT conventions while retaining the Shrija identity. Assistant responses align left on the base surface without heavy bubbles. User messages align right in the Shrija green accent. The composer stays above the keyboard and home indicator, with a growing multiline text field and a visible send button. Suggested prompts appear only in an empty or early conversation state. The UI uses 16 px side padding, 44 pt minimum controls, readable 15 px body copy, and a restrained green/ink palette for one-handed portrait use.

## Local data and future MySQL boundary

Only device-local UI state is retained: selected theme, temporary login state, and conversation messages. When the existing MySQL backend is connected, the app should call a small HTTPS API layer rather than access MySQL directly. The future boundary consists of `POST /auth/login`, `GET /me`, `GET /notifications`, and `POST /assistant/messages`; the backend owns all database access, identity verification, and assistant generation.

## Expo Go stability decisions

The root navigation will use only standard Expo Router, Safe Area, and local state primitives. It will remove container-specific runtime bridges, web-only safe-area providers, server initialization, and database imports from the startup path. This produces a native-safe entry route with predictable rendering in Expo Go.
