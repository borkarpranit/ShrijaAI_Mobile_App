import { describe, expect, it } from "vitest";

import { demoCredentials, isDemoLogin, selectAssistantReply } from "../lib/shrija-domain";

describe("Shrija static app helpers", () => {
  it("accepts only the documented hard-coded demo credentials", () => {
    expect(isDemoLogin(demoCredentials.email, demoCredentials.password)).toBe(true);
    expect(isDemoLogin(demoCredentials.email, "wrong-password")).toBe(false);
  });

  it("returns relevant offline guidance for common workplace topics", () => {
    expect(selectAssistantReply("How many leave days do I have?")).toContain("leave");
    expect(selectAssistantReply("Show my attendance")).toContain("attendance");
    expect(selectAssistantReply("Explain the work from home policy")).toContain("polic");
  });
});

