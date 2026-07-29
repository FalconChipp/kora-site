"use client";

import { useState } from "react";
import Link from "next/link";
import KoraLogo from "@/components/KoraLogo";

const API = process.env.NEXT_PUBLIC_API_URL ?? "";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch(`${API}/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        setError(body.message ?? "Something went wrong");
        return;
      }
      setSent(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-forest flex items-center justify-center px-4 font-[family-name:var(--font-inter)]">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex justify-center">
          <KoraLogo className="h-9 w-auto brightness-0 invert" />
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-sm">
          {sent ? (
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-moss/10 flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-moss" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h1 className="font-[family-name:var(--font-sora)] font-semibold text-xl text-forest mb-2">Check your email</h1>
              <p className="text-sm text-charcoal/50">
                If an account exists for <span className="font-medium text-charcoal">{email}</span>, you'll receive a reset link shortly.
              </p>
            </div>
          ) : (
            <>
              <h1 className="font-[family-name:var(--font-sora)] font-semibold text-xl text-forest mb-1">Reset your password</h1>
              <p className="text-sm text-charcoal/50 mb-6">Enter your email and we'll send you a reset link.</p>

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
                    placeholder="you@organisation.com"
                    className="rounded-xl border border-sage/40 px-4 py-3 text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-moss/40 focus:border-moss transition"
                  />
                </div>
                {error && <p className="text-sm text-red-600">{error}</p>}
                <button
                  type="submit"
                  disabled={loading}
                  className="rounded-full bg-forest px-6 py-3.5 text-sm font-semibold text-ivory hover:bg-moss transition-colors disabled:opacity-60 mt-1"
                >
                  {loading ? "Sending…" : "Send reset link"}
                </button>
              </form>
            </>
          )}
        </div>

        <p className="text-center text-xs text-sage/50 mt-6">
          <Link href="/portal/login" className="underline hover:text-sage">Back to sign in</Link>
        </p>
      </div>
    </div>
  );
}
