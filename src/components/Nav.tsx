"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import KoraLogo from "./KoraLogo";

const NAV_LINKS = [
  { label: "Product", href: "/product" },
  { label: "Features", href: "/features" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
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
                  active
                    ? "text-forest font-semibold"
                    : "text-charcoal/60 hover:text-forest"
                }`}
              >
                {label}
                {active && (
                  <span className="block h-0.5 mt-0.5 rounded-full bg-moss" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="http://79.99.41.10:3000"
            className="hidden lg:inline text-sm font-medium text-forest hover:text-moss transition-colors"
          >
            Sign in
          </Link>
          <Link
            href="/contact"
            className="hidden sm:inline-flex items-center rounded-full bg-forest px-4 py-2 text-sm font-semibold text-ivory hover:bg-moss transition-colors"
          >
            Request demo
          </Link>

          {/* Hamburger */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-9 h-9 gap-1.5 rounded-lg hover:bg-sage/20 transition-colors"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            <span
              className={`block w-5 h-0.5 bg-charcoal transition-all duration-300 ease-in-out origin-center ${open ? "translate-y-2 rotate-45" : ""}`}
            />
            <span
              className={`block w-5 h-0.5 bg-charcoal transition-all duration-300 ease-in-out origin-center ${open ? "opacity-0 scale-x-0" : ""}`}
            />
            <span
              className={`block w-5 h-0.5 bg-charcoal transition-all duration-300 ease-in-out origin-center ${open ? "-translate-y-2 -rotate-45" : ""}`}
            />
          </button>
        </div>
      </div>

      {/* Mobile drawer — always rendered, height-animated */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
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
                    active
                      ? "text-forest bg-sage/30 font-semibold"
                      : "text-charcoal/80 hover:text-forest hover:bg-sage/20"
                  }`}
                >
                  {label}
                </Link>
              );
            })}
          </nav>
          <div className="mt-4 pt-4 border-t border-sage/30 flex flex-col gap-3">
            <Link
              href="http://79.99.41.10:3000"
              onClick={() => setOpen(false)}
              className="px-3 py-2.5 text-base font-medium text-forest hover:bg-sage/20 rounded-lg transition-colors"
            >
              Sign in
            </Link>
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="inline-flex justify-center rounded-full bg-forest px-6 py-3 text-sm font-semibold text-ivory hover:bg-moss transition-colors"
            >
              Request demo
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
