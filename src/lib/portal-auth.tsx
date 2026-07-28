"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";

const API = process.env.NEXT_PUBLIC_API_URL ?? "";

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthState | null>(null);

export function PortalAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem("kora_portal_token");
    if (!stored) { setLoading(false); return; }
    setToken(stored);
    fetch(`${API}/auth/me`, { headers: { Authorization: `Bearer ${stored}` } })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => { if (data) setUser(data); else localStorage.removeItem("kora_portal_token"); })
      .finally(() => setLoading(false));
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const res = await fetch(`${API}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message ?? "Invalid email or password");
    }
    const data = await res.json();
    localStorage.setItem("kora_portal_token", data.accessToken);
    if (data.refreshToken) localStorage.setItem("kora_portal_refresh", data.refreshToken);
    setToken(data.accessToken);
    setUser(data.user);
    router.push("/portal/dashboard");
  }, [router]);

  const logout = useCallback(() => {
    localStorage.removeItem("kora_portal_token");
    localStorage.removeItem("kora_portal_refresh");
    setToken(null);
    setUser(null);
    router.push("/portal/login");
  }, [router]);

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function usePortalAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("usePortalAuth must be used within PortalAuthProvider");
  return ctx;
}
