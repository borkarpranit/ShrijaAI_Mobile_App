import { describe, expect, it } from "vitest";

import { displayName, initialsOf, roleLabel } from "../lib/shrija-domain";
import type { CurrentUser } from "../lib/auth-api";

const user: CurrentUser = {
  userId: 1,
  username: "priya.sharma@adk.com",
  role: "EMPLOYEE",
  employeeId: 42,
};

describe("Shrija user display helpers", () => {
  it("derives a friendly first name from the signed-in user's username", () => {
    expect(displayName(user)).toBe("Priya");
    expect(displayName(null)).toBe("there");
  });

  it("derives avatar initials from the signed-in user's username", () => {
    expect(initialsOf(user)).toBe("PS");
    expect(initialsOf(null)).toBe("??");
  });

  it("maps backend roles to friendly labels", () => {
    expect(roleLabel("ADMIN")).toBe("Administrator");
    expect(roleLabel("EMPLOYEE")).toBe("Team member");
    expect(roleLabel(undefined)).toBe("Team member");
  });
});
