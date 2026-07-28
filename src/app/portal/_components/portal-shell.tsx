"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { usePortalAuth } from "@/lib/portal-auth";
import KoraLogo from "@/components/KoraLogo";

const NAV = [
  { label: "Dashboard", href: "/portal/dashboard" },
  { label: "Homes", href: "/portal/homes" },
  { label: "Billing", href: "/portal/billing" },
  { label: "Settings", href: "/portal/settings" },
];

export default function PortalShell({ children }: { children: React.ReactNode }) {
  const { user, loading, logout } = usePortalAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !user) router.replace("/portal/login");
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-ivory flex items-center justify-center">
        <div className="w-5 h-5 rounded-full border-2 border-forest border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-ivory flex font-[family-name:var(--font-inter)]">
      {/* Sidebar */}
      <aside className="w-56 bg-forest flex flex-col min-h-screen">
        <div className="px-5 py-5 border-b border-white/10">
          <KoraLogo className="h-7 w-auto brightness-0 invert" />
        </div>
        <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
          {NAV.map(({ label, href }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  active
                    ? "bg-white/15 text-ivory"
                    : "text-sage/80 hover:text-ivory hover:bg-white/10"
                }`}
              >
                {label}
              </Link>
            );
          })}
        </nav>
        <div className="px-3 py-4 border-t border-white/10">
          <div className="px-3 py-2 mb-1">
            <p className="text-xs font-medium text-ivory truncate">{user.firstName} {user.lastName}</p>
            <p className="text-xs text-sage/60 truncate">{user.email}</p>
          </div>
          <button
            onClick={logout}
            className="w-full text-left px-3 py-2.5 rounded-lg text-sm text-sage/70 hover:text-ivory hover:bg-white/10 transition-colors"
          >
            Sign out
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
