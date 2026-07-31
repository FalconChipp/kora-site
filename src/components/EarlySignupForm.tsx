"use client";

import { useState } from "react";
import Link from "next/link";

export default function EarlySignupForm() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [code, setCode] = useState<string | null>(null);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const res = await fetch("/api/early-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, firstName }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Something went wrong. Please try again.");
        return;
      }
      setCode(data.code);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (code) {
    return (
      <div className="w-full max-w-lg text-center">
        <div className="w-12 h-12 rounded-full bg-moss/30 flex items-center justify-center mx-auto mb-6">
          <svg viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6 text-sage">
            <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
          </svg>
        </div>
        <h2 className="font-[family-name:var(--font-sora)] font-semibold text-2xl sm:text-3xl text-ivory mb-3">
          You&apos;re on the list.
        </h2>
        <p className="text-sage/80 text-sm sm:text-base mb-8 leading-relaxed">
          We&apos;ve sent your early access discount to <span className="text-ivory font-medium">{email}</span>. Your personal code is:
        </p>
        <div className="rounded-2xl bg-white/10 border border-white/20 px-8 py-5 mb-8 w-full">
          <p className="font-[family-name:var(--font-sora)] font-semibold text-2xl sm:text-3xl text-ivory tracking-widest">
            {code}
          </p>
          <p className="text-sage/60 text-xs mt-2">25% off your first 3 months — exclusively for early supporters · Single use · Valid at launch</p>
        </div>
        <p className="text-sage/60 text-xs">
          We&apos;ll email you when KORA is ready to launch. In the meantime,{" "}
          <Link href="/features" className="text-sage hover:text-ivory transition-colors underline underline-offset-2">
            explore what&apos;s coming
          </Link>
          .
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl">
      <div className="text-center mb-10 sm:mb-14">
        <p className="text-xs font-semibold uppercase tracking-widest text-sage mb-4 sm:mb-6">Coming soon</p>
        <h1 className="font-[family-name:var(--font-sora)] font-semibold text-3xl sm:text-5xl lg:text-6xl text-ivory leading-tight mb-4 sm:mb-6">
          The outcomes platform built for young person care.
        </h1>
        <p className="text-base sm:text-lg text-sage/70 leading-relaxed max-w-xl mx-auto">
          KORA is launching soon. Sign up now and lock in 25% off your first 3 months — exclusively for early supporters.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="rounded-2xl bg-white/5 border border-white/10 p-6 sm:p-8 flex flex-col gap-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold uppercase tracking-wide text-sage/60">
              First name <span className="font-normal normal-case text-sage/30">(optional)</span>
            </label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Jane"
              className="rounded-xl bg-white/10 border border-white/15 px-4 py-3 text-sm text-ivory placeholder-sage/40 focus:outline-none focus:ring-2 focus:ring-moss/50 transition"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold uppercase tracking-wide text-sage/60">
              Email address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="jane@organisation.com"
              className="rounded-xl bg-white/10 border border-white/15 px-4 py-3 text-sm text-ivory placeholder-sage/40 focus:outline-none focus:ring-2 focus:ring-moss/50 transition"
            />
          </div>
        </div>

        {error && <p className="text-sm text-red-400">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-full bg-ivory py-4 text-sm font-semibold text-forest hover:bg-sage transition-colors disabled:opacity-60 mt-1"
        >
          {submitting ? "Reserving your spot…" : "Get early access — 25% off your first 3 months"}
        </button>

        <p className="text-center text-xs text-sage/40">
          No spam. We&apos;ll only email you when KORA launches.
        </p>
      </form>

      <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center text-xs text-sage/50">
        <Link href="/features" className="hover:text-sage transition-colors text-center">Explore features →</Link>
        <Link href="/pricing" className="hover:text-sage transition-colors text-center">See pricing →</Link>
        <Link href="/product" className="hover:text-sage transition-colors text-center">How it works →</Link>
        <Link href="/contact" className="hover:text-sage transition-colors text-center">Get in touch →</Link>
      </div>
    </div>
  );
}
