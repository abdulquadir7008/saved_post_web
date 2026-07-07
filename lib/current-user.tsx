"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type DemoUser = { id: string; name: string; role: "student" | "moderator" };

// Mirrors server/src/db/seed.ts. In a real app this list would never exist on
// the client -- it only exists here because auth is intentionally stubbed for
// this exercise. See NOTES.md.
export const DEMO_USERS: DemoUser[] = [
  { id: "u_alice", name: "Alice Chen", role: "student" },
  { id: "u_bob", name: "Bob Okafor", role: "student" },
  { id: "u_cara", name: "Cara Lindqvist", role: "student" },
  { id: "u_dev", name: "Dev Patel", role: "student" },
  { id: "u_mona", name: "Mona Reyes", role: "moderator" },
];

const STORAGE_KEY = "saved-posts.current-user";

type CurrentUserContextValue = {
  user: DemoUser;
  setUserId: (id: string) => void;
};

const CurrentUserContext = createContext<CurrentUserContextValue | null>(null);

export function CurrentUserProvider({ children }: { children: ReactNode }) {
  const [userId, setUserIdState] = useState<string>(DEMO_USERS[0]!.id);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored && DEMO_USERS.some((u) => u.id === stored)) {
      setUserIdState(stored);
    }
  }, []);

  function setUserId(id: string) {
    setUserIdState(id);
    window.localStorage.setItem(STORAGE_KEY, id);
  }

  const user = useMemo(() => DEMO_USERS.find((u) => u.id === userId) ?? DEMO_USERS[0]!, [userId]);
  const value = useMemo(() => ({ user, setUserId }), [user]);

  return <CurrentUserContext.Provider value={value}>{children}</CurrentUserContext.Provider>;
}

export function useCurrentUser(): CurrentUserContextValue {
  const ctx = useContext(CurrentUserContext);
  if (!ctx) throw new Error("useCurrentUser must be used within CurrentUserProvider");
  return ctx;
}
