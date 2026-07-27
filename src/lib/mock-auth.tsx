// Mocked auth. Persists a fake session in localStorage.
// Backend-ready: swap functions with real API calls later.
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export interface MockUser {
  id: string;
  email: string;
  name: string;
  role: "artist";
}

const KEY = "cbm.session.v1";

interface AuthCtx {
  user: MockUser | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  signOut: () => void;
}

const Ctx = createContext<AuthCtx | null>(null);

function read(): MockUser | null {
  if (typeof window === "undefined") return null;
  try {
    const v = window.localStorage.getItem(KEY);
    return v ? (JSON.parse(v) as MockUser) : null;
  } catch {
    return null;
  }
}

export function MockAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<MockUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setUser(read());
    setLoading(false);
  }, []);

  const signIn = async (email: string, _password: string) => {
    await new Promise((r) => setTimeout(r, 600));
    const u: MockUser = { id: "art_001", email, name: "Kola Sunshine", role: "artist" };
    window.localStorage.setItem(KEY, JSON.stringify(u));
    setUser(u);
  };

  const signUp = async (name: string, email: string, _password: string) => {
    await new Promise((r) => setTimeout(r, 800));
    const u: MockUser = { id: "art_001", email, name, role: "artist" };
    window.localStorage.setItem(KEY, JSON.stringify(u));
    setUser(u);
  };

  const signOut = () => {
    window.localStorage.removeItem(KEY);
    setUser(null);
  };

  return (
    <Ctx.Provider value={{ user, loading, signIn, signUp, signOut }}>{children}</Ctx.Provider>
  );
}

export function useAuth() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useAuth must be used inside MockAuthProvider");
  return v;
}
