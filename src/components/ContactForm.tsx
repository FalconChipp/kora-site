"use client";

import { useState } from "react";

const REASONS = [
  "Request a product demo",
  "Start a free trial",
  "Ask about pricing or Organisation plans",
  "Ask a technical question",
  "Give feedback",
];

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    const fd = new FormData(e.currentTarget);
    const payload = {
      first: fd.get("first"),
      last: fd.get("last"),
      email: fd.get("email"),
      org: fd.get("org"),
      reason: fd.get("reason"),
      message: fd.get("message"),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Something went wrong");
      }

      setStatus("sent");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-2xl bg-forest/5 border border-sage/30 p-8 sm:p-10 flex flex-col gap-4">
        <div className="w-10 h-10 rounded-full bg-moss/20 flex items-center justify-center">
          <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-moss">
            <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
          </svg>
        </div>
        <h2 className="font-[family-name:var(--font-sora)] font-semibold text-lg text-forest">
          Message sent
        </h2>
        <p className="text-sm text-charcoal/60 leading-relaxed">
          Thanks for getting in touch. We&apos;ll come back to you within one working day.
        </p>
      </div>
    );
  }

  return (
    <form className="flex flex-col gap-5 sm:gap-6" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="first" className="text-xs font-semibold text-charcoal/70 uppercase tracking-wide">
            First name
          </label>
          <input
            id="first" name="first" type="text" required
            className="rounded-xl border border-sage/50 bg-white px-4 py-3 text-sm text-charcoal placeholder:text-charcoal/30 focus:outline-none focus:ring-2 focus:ring-moss/40 focus:border-moss transition"
            placeholder="Jane"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="last" className="text-xs font-semibold text-charcoal/70 uppercase tracking-wide">
            Last name
          </label>
          <input
            id="last" name="last" type="text" required
            className="rounded-xl border border-sage/50 bg-white px-4 py-3 text-sm text-charcoal placeholder:text-charcoal/30 focus:outline-none focus:ring-2 focus:ring-moss/40 focus:border-moss transition"
            placeholder="Smith"
          />
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className="text-xs font-semibold text-charcoal/70 uppercase tracking-wide">
          Email address
        </label>
        <input
          id="email" name="email" type="email" required
          className="rounded-xl border border-sage/50 bg-white px-4 py-3 text-sm text-charcoal placeholder:text-charcoal/30 focus:outline-none focus:ring-2 focus:ring-moss/40 focus:border-moss transition"
          placeholder="jane@yourorganisation.com"
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="org" className="text-xs font-semibold text-charcoal/70 uppercase tracking-wide">
          Organisation name
        </label>
        <input
          id="org" name="org" type="text"
          className="rounded-xl border border-sage/50 bg-white px-4 py-3 text-sm text-charcoal placeholder:text-charcoal/30 focus:outline-none focus:ring-2 focus:ring-moss/40 focus:border-moss transition"
          placeholder="Optional"
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="reason" className="text-xs font-semibold text-charcoal/70 uppercase tracking-wide">
          How can we help?
        </label>
        <select
          id="reason" name="reason"
          className="rounded-xl border border-sage/50 bg-white px-4 py-3 text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-moss/40 focus:border-moss transition"
        >
          <option value="">Select a reason…</option>
          {REASONS.map((r) => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="message" className="text-xs font-semibold text-charcoal/70 uppercase tracking-wide">
          Message
        </label>
        <textarea
          id="message" name="message" rows={5}
          className="rounded-xl border border-sage/50 bg-white px-4 py-3 text-sm text-charcoal placeholder:text-charcoal/30 focus:outline-none focus:ring-2 focus:ring-moss/40 focus:border-moss transition resize-none"
          placeholder="Tell us about your setting, what you're looking for, or any questions you have…"
        />
      </div>

      {status === "error" && (
        <p className="text-sm text-red-600">
          {errorMsg || "Something went wrong. Please try again or email us directly."}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full sm:w-auto sm:self-start inline-flex justify-center rounded-full bg-forest px-8 py-4 text-sm font-semibold text-ivory hover:bg-moss transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "sending" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
