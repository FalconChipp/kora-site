"use client";

import { useEffect, useState } from "react";
import { usePortalAuth } from "@/lib/portal-auth";
import { portalApi, type Org, type Home } from "@/lib/portal-api";
import PortalShell from "../_components/portal-shell";

export default function DashboardPage() {
  const { token } = usePortalAuth();
  const [org, setOrg] = useState<Org | null>(null);
  const [homes, setHomes] = useState<Home[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;
    Promise.all([portalApi.getOrgs(token), portalApi.getHomes(token)])
      .then(([orgs, h]) => { setOrg(orgs[0] ?? null); setHomes(h); })
      .finally(() => setLoading(false));
  }, [token]);

  const monthlyTotal = homes.length === 0 ? 0 : 125 + (homes.length - 1) * 25;

  return (
    <PortalShell>
      <div className="p-8 max-w-4xl">
        <h1 className="font-[family-name:var(--font-sora)] font-semibold text-2xl text-forest mb-1">
          {loading ? "Loading…" : org?.name ?? "Your organisation"}
        </h1>
        <p className="text-sm text-charcoal/50 mb-10">Organisation overview</p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          <StatCard label="Active homes" value={loading ? "—" : String(homes.length)} />
          <StatCard label="Monthly cost" value={loading ? "—" : homes.length === 0 ? "No subscription" : `£${monthlyTotal}/mo`} />
          <StatCard
            label="Subscription"
            value={loading ? "—" : org?.subscriptionStatus ?? "—"}
            highlight={org?.subscriptionStatus === "active"}
          />
        </div>

        <section>
          <h2 className="font-[family-name:var(--font-sora)] font-semibold text-base text-forest mb-4">Your homes</h2>
          {loading ? (
            <p className="text-sm text-charcoal/40">Loading…</p>
          ) : homes.length === 0 ? (
            <p className="text-sm text-charcoal/40">No homes yet. <a href="/portal/homes" className="text-moss underline">Add your first home →</a></p>
          ) : (
            <div className="flex flex-col divide-y divide-sage/20 rounded-xl border border-sage/30 overflow-hidden">
              {homes.map((h) => (
                <div key={h.id} className="flex items-center justify-between px-5 py-4 bg-white">
                  <div>
                    <p className="text-sm font-medium text-forest">{h.name}</p>
                    {h.address && <p className="text-xs text-charcoal/40 mt-0.5">{h.address}</p>}
                  </div>
                  <span className="text-xs font-medium text-moss bg-moss/10 px-2.5 py-1 rounded-full">Active</span>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </PortalShell>
  );
}

function StatCard({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="rounded-xl border border-sage/30 bg-white px-5 py-5">
      <p className="text-xs font-semibold uppercase tracking-widest text-charcoal/40 mb-2">{label}</p>
      <p className={`font-[family-name:var(--font-sora)] font-semibold text-2xl ${highlight ? "text-moss" : "text-forest"}`}>
        {value}
      </p>
    </div>
  );
}
