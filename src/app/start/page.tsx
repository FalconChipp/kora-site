"use client";

import { useState } from "react";
import Link from "next/link";
import KoraLogo from "@/components/KoraLogo";

export default function StartPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [orgName, setOrgName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, email, orgName }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Something went wrong");
      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-forest flex flex-col items-center justify-center px-4 font-[family-name:var(--font-inter)]">
      <Link href="/" className="mb-10">
        <KoraLogo className="h-8 w-auto brightness-0 invert" />
      </Link>

      <div className="w-full max-w-md bg-white rounded-2xl p-8 shadow-sm">
        <div className="mb-6">
          <h1 className="font-[family-name:var(--font-sora)] font-semibold text-xl text-forest mb-1">
            Start your free trial
          </h1>
          <p className="text-sm text-charcoal/50">
            7 days free · No card charged until trial ends · Cancel anytime
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="firstName" className="text-xs font-semibold text-charcoal/60 uppercase tracking-wide">
                First name
              </label>
              <input
                id="firstName"
                type="text"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Jane"
                className="rounded-xl border border-sage/40 px-4 py-3 text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-moss/40 focus:border-moss transition"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="lastName" className="text-xs font-semibold text-charcoal/60 uppercase tracking-wide">
                Last name
              </label>
              <input
                id="lastName"
                type="text"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Smith"
                className="rounded-xl border border-sage/40 px-4 py-3 text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-moss/40 focus:border-moss transition"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-xs font-semibold text-charcoal/60 uppercase tracking-wide">
              Work email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="jane@yourorganisation.com"
              className="rounded-xl border border-sage/40 px-4 py-3 text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-moss/40 focus:border-moss transition"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="orgName" className="text-xs font-semibold text-charcoal/60 uppercase tracking-wide">
              Organisation name
            </label>
            <input
              id="orgName"
              type="text"
              required
              value={orgName}
              onChange={(e) => setOrgName(e.target.value)}
              placeholder="e.g. Sycamore Care Ltd"
              className="rounded-xl border border-sage/40 px-4 py-3 text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-moss/40 focus:border-moss transition"
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="rounded-full bg-forest px-6 py-3.5 text-sm font-semibold text-ivory hover:bg-moss transition-colors disabled:opacity-60 disabled:cursor-not-allowed mt-1"
          >
            {submitting ? "Redirecting to payment…" : "Continue to payment →"}
          </button>
        </form>

        <p className="text-xs text-charcoal/35 text-center mt-5 leading-relaxed">
          By continuing you agree to our terms. Your card won&apos;t be charged during the 7-day trial.
          Already have an account?{" "}
          <Link href="/" className="text-moss underline underline-offset-2">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
