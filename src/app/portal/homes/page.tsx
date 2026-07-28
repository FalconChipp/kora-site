"use client";

import { useEffect, useState } from "react";
import { usePortalAuth } from "@/lib/portal-auth";
import { portalApi, type Home, type Org } from "@/lib/portal-api";
import PortalShell from "../_components/portal-shell";

export default function HomesPage() {
  const { token } = usePortalAuth();
  const [homes, setHomes] = useState<Home[]>([]);
  const [org, setOrg] = useState<Org | null>(null);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const [removing, setRemoving] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;
    Promise.all([portalApi.getHomes(token), portalApi.getOrgs(token)])
      .then(([h, orgs]) => { setHomes(h); setOrg(orgs[0] ?? null); })
      .finally(() => setLoading(false));
  }, [token]);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!token || !org) return;
    setError("");
    setAdding(true);
    try {
      const home = await portalApi.createHome(token, { name, organisationId: org.id, address: address || undefined });
      setHomes((prev) => [...prev, home]);
      setName("");
      setAddress("");
      setShowForm(false);
      portalApi.syncHomes(token);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add home");
    } finally {
      setAdding(false);
    }
  }

  async function handleRemove(homeId: string) {
    if (!token) return;
    if (!confirm("Remove this home? This cannot be undone.")) return;
    setRemoving(homeId);
    try {
      await portalApi.deleteHome(token, homeId);
      setHomes((prev) => prev.filter((h) => h.id !== homeId));
      portalApi.syncHomes(token);
    } finally {
      setRemoving(null);
    }
  }

  const additionalCost = homes.length > 1 ? (homes.length - 1) * 25 : 0;

  return (
    <PortalShell>
      <div className="p-8 max-w-3xl">
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="font-[family-name:var(--font-sora)] font-semibold text-2xl text-forest mb-1">Homes</h1>
            <p className="text-sm text-charcoal/50">
              {homes.length === 0
                ? "No homes yet"
                : `${homes.length} home${homes.length !== 1 ? "s" : ""} · £${125 + additionalCost}/month`}
            </p>
          </div>
          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              disabled={!org}
              className="rounded-full bg-forest px-5 py-2.5 text-sm font-semibold text-ivory hover:bg-moss transition-colors disabled:opacity-50"
            >
              Add home
            </button>
          )}
        </div>

        {showForm && (
          <form onSubmit={handleAdd} className="rounded-xl border border-sage/40 bg-white p-6 mb-6 flex flex-col gap-4">
            <h2 className="font-[family-name:var(--font-sora)] font-semibold text-base text-forest">New home</h2>
            {homes.length >= 1 && (
              <p className="text-xs text-charcoal/50 bg-sage/10 rounded-lg px-3 py-2">
                Adding a home will add <strong>£25/month</strong> to your subscription.
              </p>
            )}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-charcoal/60 uppercase tracking-wide">Home name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Sycamore House"
                className="rounded-xl border border-sage/40 px-4 py-3 text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-moss/40 transition"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-charcoal/60 uppercase tracking-wide">Address <span className="font-normal normal-case text-charcoal/30">(optional)</span></label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="123 Example Street, City"
                className="rounded-xl border border-sage/40 px-4 py-3 text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-moss/40 transition"
              />
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}
            <div className="flex gap-3">
              <button
                type="submit"
                disabled={adding}
                className="rounded-full bg-forest px-6 py-2.5 text-sm font-semibold text-ivory hover:bg-moss transition-colors disabled:opacity-60"
              >
                {adding ? "Adding…" : "Add home"}
              </button>
              <button
                type="button"
                onClick={() => { setShowForm(false); setError(""); }}
                className="rounded-full border border-sage/40 px-6 py-2.5 text-sm font-medium text-charcoal/60 hover:border-sage transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {loading ? (
          <p className="text-sm text-charcoal/40">Loading…</p>
        ) : homes.length === 0 ? (
          <div className="rounded-xl border border-dashed border-sage/40 px-6 py-12 text-center">
            <p className="text-sm text-charcoal/40">No homes yet. Add your first home to get started.</p>
          </div>
        ) : (
          <div className="flex flex-col divide-y divide-sage/20 rounded-xl border border-sage/30 overflow-hidden">
            {homes.map((h, i) => (
              <div key={h.id} className="flex items-center justify-between px-5 py-4 bg-white">
                <div>
                  <p className="text-sm font-medium text-forest">{h.name}</p>
                  {h.address && <p className="text-xs text-charcoal/40 mt-0.5">{h.address}</p>}
                  <p className="text-xs text-charcoal/30 mt-0.5">
                    {i === 0 ? "Base · £125/mo" : "+£25/mo"}
                  </p>
                </div>
                <button
                  onClick={() => handleRemove(h.id)}
                  disabled={removing === h.id}
                  className="text-xs text-red-400 hover:text-red-600 transition-colors disabled:opacity-40"
                >
                  {removing === h.id ? "Removing…" : "Remove"}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </PortalShell>
  );
}
