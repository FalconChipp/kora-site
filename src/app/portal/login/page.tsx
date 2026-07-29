"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePortalAuth } from "@/lib/portal-auth";
import KoraLogo from "@/components/KoraLogo";

export default function PortalLoginPage() {
  const { login, user, loading } = usePortalAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && user) router.replace("/portal/dashboard");
  }, [user, loading, router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await login(email, password);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-forest flex items-center justify-center px-4 font-[family-name:var(--font-inter)]">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex justify-center">
          <KoraLogo className="h-9 w-auto brightness-0 invert" />
        </div>
        <div className="bg-white rounded-2xl p-8 shadow-sm">
          <h1 className="font-[family-name:var(--font-sora)] font-semibold text-xl text-forest mb-1">
            Sign in to your account
          </h1>
          <p className="text-sm text-charcoal/50 mb-6">Organisation management portal</p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-xs font-semibold text-charcoal/60 uppercase tracking-wide">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-xl border border-sage/40 px-4 py-3 text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-moss/40 focus:border-moss transition"
                placeholder="you@organisation.com"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="text-xs font-semibold text-charcoal/60 uppercase tracking-wide">
                  Password
                </label>
                <Link href="/portal/forgot-password" className="text-xs text-moss hover:text-forest transition-colors">
                  Forgot password?
                </Link>
              </div>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="rounded-xl border border-sage/40 px-4 py-3 text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-moss/40 focus:border-moss transition"
                placeholder="••••••••"
              />
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}

            <button
              type="submit"
              disabled={submitting}
              className="rounded-full bg-forest px-6 py-3.5 text-sm font-semibold text-ivory hover:bg-moss transition-colors disabled:opacity-60 disabled:cursor-not-allowed mt-1"
            >
              {submitting ? "Signing in…" : "Sign in"}
            </button>
          </form>
        </div>
        <p className="text-center text-xs text-sage/50 mt-6">
          Need help? <a href="mailto:hello@sixbyfive.com" className="underline hover:text-sage">Contact support</a>
        </p>
      </div>
    </div>
  );
}
