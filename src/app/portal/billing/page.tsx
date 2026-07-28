"use client";

import { useEffect, useState } from "react";
import { usePortalAuth } from "@/lib/portal-auth";
import { portalApi, type Org, type Home } from "@/lib/portal-api";
import PortalShell from "../_components/portal-shell";

export default function BillingPage() {
  const { token } = usePortalAuth();
  const [org, setOrg] = useState<Org | null>(null);
  const [homes, setHomes] = useState<Home[]>([]);
  const [loading, setLoading] = useState(true);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [portalLoading, setPortalLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) return;
    Promise.all([portalApi.getOrgs(token), portalApi.getHomes(token)])
      .then(([orgs, h]) => { setOrg(orgs[0] ?? null); setHomes(h); })
      .finally(() => setLoading(false));
  }, [token]);

  async function startCheckout() {
    setCheckoutLoading(true);
    setError("");
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orgId: org?.id, token }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to start checkout");
      setCheckoutLoading(false);
    }
  }

  async function openBillingPortal() {
    setPortalLoading(true);
    setError("");
    try {
      const res = await fetch("/api/stripe/portal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orgId: org?.id, token }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to open billing portal");
      setPortalLoading(false);
    }
  }

  const isActive = org?.subscriptionStatus === "active";
  const monthlyTotal = homes.length === 0 ? 125 : 125 + (homes.length - 1) * 25;

  return (
    <PortalShell>
      <div className="p-8 max-w-2xl">
        <h1 className="font-[family-name:var(--font-sora)] font-semibold text-2xl text-forest mb-1">Billing</h1>
        <p className="text-sm text-charcoal/50 mb-10">Manage your subscription and payment details</p>

        {loading ? (
          <p className="text-sm text-charcoal/40">Loading…</p>
        ) : (
          <div className="flex flex-col gap-6">

            {/* Status card */}
            <div className="rounded-xl border border-sage/30 bg-white p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-[family-name:var(--font-sora)] font-semibold text-base text-forest">Current plan</h2>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                  isActive ? "bg-moss/10 text-moss" : "bg-charcoal/8 text-charcoal/40"
                }`}>
                  {org?.subscriptionStatus ?? "No subscription"}
                </span>
              </div>
              <div className="flex items-end gap-1 mb-1">
                <span className="font-[family-name:var(--font-sora)] font-semibold text-4xl text-forest">£{monthlyTotal}</span>
                <span className="text-charcoal/40 text-sm pb-1">/month</span>
              </div>
              <p className="text-xs text-charcoal/40">
                {homes.length} home{homes.length !== 1 ? "s" : ""} · £125 base + £{(homes.length - 1) * 25} additional
              </p>
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}

            {!isActive ? (
              <div className="rounded-xl border border-sage/30 bg-white p-6">
                <h2 className="font-[family-name:var(--font-sora)] font-semibold text-base text-forest mb-2">
                  Start your subscription
                </h2>
                <p className="text-sm text-charcoal/50 mb-5">
                  Your 7-day free trial gives you full access. Add your payment details to continue after the trial ends.
                </p>
                <button
                  onClick={startCheckout}
                  disabled={checkoutLoading}
                  className="rounded-full bg-forest px-6 py-3 text-sm font-semibold text-ivory hover:bg-moss transition-colors disabled:opacity-60"
                >
                  {checkoutLoading ? "Redirecting…" : "Set up billing →"}
                </button>
              </div>
            ) : (
              <div className="rounded-xl border border-sage/30 bg-white p-6">
                <h2 className="font-[family-name:var(--font-sora)] font-semibold text-base text-forest mb-2">
                  Manage billing
                </h2>
                <p className="text-sm text-charcoal/50 mb-5">
                  Update your payment method, download invoices, or cancel your subscription.
                </p>
                <button
                  onClick={openBillingPortal}
                  disabled={portalLoading}
                  className="rounded-full bg-forest px-6 py-3 text-sm font-semibold text-ivory hover:bg-moss transition-colors disabled:opacity-60"
                >
                  {portalLoading ? "Redirecting…" : "Open billing portal →"}
                </button>
              </div>
            )}

            <div className="rounded-xl bg-forest/5 border border-sage/20 px-5 py-4">
              <p className="text-xs text-charcoal/50 leading-relaxed">
                Payments are processed securely by Stripe. KORA does not store your card details.
                Cancellations take effect at the end of the current billing period.
              </p>
            </div>
          </div>
        )}
      </div>
    </PortalShell>
  );
}
