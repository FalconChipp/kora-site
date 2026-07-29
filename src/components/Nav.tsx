"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import KoraLogo from "./KoraLogo";

const NAV_LINKS = [
  { label: "Product", href: "/product" },
  { label: "Features", href: "/features" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const API = process.env.NEXT_PUBLIC_API_URL ?? "";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [signInOpen, setSignInOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  function openSignIn() {
    setError("");
    setEmail("");
    setPassword("");
    setOpen(false);
    setSignInOpen(true);
  }

  async function handleSignIn(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const res = await fetch(`${API}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message ?? "Invalid email or password");
      }
      const data = await res.json();
      localStorage.setItem("kora_portal_token", data.accessToken);
      if (data.refreshToken) localStorage.setItem("kora_portal_refresh", data.refreshToken);
      setSignInOpen(false);
      router.push("/portal/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <header className="sticky top-0 z-50 bg-ivory/95 backdrop-blur border-b border-sage/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <Link href="/" onClick={() => setOpen(false)}>
            <KoraLogo className="h-7 sm:h-8 w-auto" />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {NAV_LINKS.map(({ label, href }) => {
              const active = pathname === href;
              return (
                <Link
                  key={label}
                  href={href}
                  className={`text-sm font-medium transition-colors ${
                    active ? "text-forest font-semibold" : "text-charcoal/60 hover:text-forest"
                  }`}
                >
                  {label}
                  {active && <span className="block h-0.5 mt-0.5 rounded-full bg-moss" />}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={openSignIn}
              className="hidden lg:inline text-sm font-medium text-forest hover:text-moss transition-colors"
            >
              Sign in
            </button>
            <Link
              href="/start"
              className="hidden sm:inline-flex items-center rounded-full bg-forest px-4 py-2 text-sm font-semibold text-ivory hover:bg-moss transition-colors"
            >
              Get started
            </Link>

            {/* Hamburger */}
            <button
              className="md:hidden flex flex-col justify-center items-center w-9 h-9 gap-1.5 rounded-lg hover:bg-sage/20 transition-colors"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              <span className={`block w-5 h-0.5 bg-charcoal transition-all duration-300 ease-in-out origin-center ${open ? "translate-y-2 rotate-45" : ""}`} />
              <span className={`block w-5 h-0.5 bg-charcoal transition-all duration-300 ease-in-out origin-center ${open ? "opacity-0 scale-x-0" : ""}`} />
              <span className={`block w-5 h-0.5 bg-charcoal transition-all duration-300 ease-in-out origin-center ${open ? "-translate-y-2 -rotate-45" : ""}`} />
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
          <div className="bg-ivory border-t border-sage/30 px-4 py-4 flex flex-col">
            <nav className="flex flex-col gap-1">
              {NAV_LINKS.map(({ label, href }) => {
                const active = pathname === href;
                return (
                  <Link
                    key={label}
                    href={href}
                    onClick={() => setOpen(false)}
                    className={`px-3 py-2.5 text-base font-medium rounded-lg transition-colors ${
                      active ? "text-forest bg-sage/30 font-semibold" : "text-charcoal/80 hover:text-forest hover:bg-sage/20"
                    }`}
                  >
                    {label}
                  </Link>
                );
              })}
            </nav>
            <div className="mt-4 pt-4 border-t border-sage/30 flex flex-col gap-3">
              <button
                onClick={openSignIn}
                className="px-3 py-2.5 text-base font-medium text-forest hover:bg-sage/20 rounded-lg transition-colors text-left"
              >
                Sign in
              </button>
              <Link
                href="/start"
                onClick={() => setOpen(false)}
                className="inline-flex justify-center rounded-full bg-forest px-6 py-3 text-sm font-semibold text-ivory hover:bg-moss transition-colors"
              >
                Get started
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Sign in modal */}
      {signInOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center px-4"
          onClick={(e) => { if (e.target === e.currentTarget) setSignInOpen(false); }}
        >
          <div className="absolute inset-0 bg-charcoal/40 backdrop-blur-sm" aria-hidden />
          <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-sm p-8 font-[family-name:var(--font-inter)]">
            <button
              onClick={() => setSignInOpen(false)}
              className="absolute top-4 right-4 text-charcoal/30 hover:text-charcoal/60 transition-colors"
              aria-label="Close"
            >
              <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
              </svg>
            </button>

            <h2 className="font-[family-name:var(--font-sora)] font-semibold text-xl text-forest mb-1">Sign in</h2>
            <p className="text-sm text-charcoal/50 mb-6">Access your organisation portal</p>

            <form onSubmit={handleSignIn} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="modal-email" className="text-xs font-semibold text-charcoal/60 uppercase tracking-wide">
                  Email
                </label>
                <input
                  id="modal-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@organisation.com"
                  className="rounded-xl border border-sage/40 px-4 py-3 text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-moss/40 focus:border-moss transition"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="modal-password" className="text-xs font-semibold text-charcoal/60 uppercase tracking-wide">
                  Password
                </label>
                <input
                  id="modal-password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="rounded-xl border border-sage/40 px-4 py-3 text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-moss/40 focus:border-moss transition"
                />
              </div>

              {error && <p className="text-sm text-red-600">{error}</p>}

              <button
                type="submit"
                disabled={submitting}
                className="rounded-full bg-forest px-6 py-3.5 text-sm font-semibold text-ivory hover:bg-moss transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitting ? "Signing in…" : "Sign in"}
              </button>
            </form>

            <p className="text-xs text-charcoal/40 text-center mt-5">
              Need access? <Link href="/contact" onClick={() => setSignInOpen(false)} className="text-moss underline underline-offset-2">Contact us</Link>
            </p>
          </div>
        </div>
      )}
    </>
  );
}
