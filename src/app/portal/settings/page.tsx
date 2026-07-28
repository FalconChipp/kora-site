"use client";

import { useEffect, useState } from "react";
import { usePortalAuth } from "@/lib/portal-auth";
import { portalApi, type Org, type Member } from "@/lib/portal-api";
import PortalShell from "../_components/portal-shell";

const API = process.env.NEXT_PUBLIC_API_URL!;

export default function SettingsPage() {
  const { token } = usePortalAuth();
  const [org, setOrg] = useState<Org | null>(null);
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [orgName, setOrgName] = useState("");
  const [savingName, setSavingName] = useState(false);
  const [nameSaved, setNameSaved] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("HOME_MANAGER");
  const [inviting, setInviting] = useState(false);
  const [inviteError, setInviteError] = useState("");
  const [removing, setRemoving] = useState<string | null>(null);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [changingPassword, setChangingPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [passwordSaved, setPasswordSaved] = useState(false);

  useEffect(() => {
    if (!token) return;
    portalApi.getOrgs(token).then((orgs) => {
      const o = orgs[0];
      setOrg(o ?? null);
      setOrgName(o?.name ?? "");
      if (o) return portalApi.getMembers(token, o.id).then(setMembers);
    }).finally(() => setLoading(false));
  }, [token]);

  async function saveName(e: React.FormEvent) {
    e.preventDefault();
    if (!token || !org) return;
    setSavingName(true);
    try {
      await portalApi.renameOrg(token, org.id, orgName);
      setOrg((prev) => prev ? { ...prev, name: orgName } : prev);
      setNameSaved(true);
      setTimeout(() => setNameSaved(false), 2000);
    } finally {
      setSavingName(false);
    }
  }

  async function handleInvite(e: React.FormEvent) {
    e.preventDefault();
    if (!token || !org) return;
    setInviteError("");
    setInviting(true);
    try {
      const member = await portalApi.addMember(token, org.id, { email: inviteEmail, role: inviteRole });
      setMembers((prev) => [...prev, member as Member]);
      setInviteEmail("");
    } catch (err) {
      setInviteError(err instanceof Error ? err.message : "Failed to invite member");
    } finally {
      setInviting(false);
    }
  }

  async function handleChangePassword(e: React.FormEvent) {
    e.preventDefault();
    setPasswordError("");
    if (newPassword !== confirmPassword) {
      setPasswordError("New passwords do not match");
      return;
    }
    if (newPassword.length < 8) {
      setPasswordError("New password must be at least 8 characters");
      return;
    }
    setChangingPassword(true);
    try {
      const res = await fetch(`${API}/auth/change-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        setPasswordError(body.message ?? "Failed to change password");
        return;
      }
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setPasswordSaved(true);
      setTimeout(() => setPasswordSaved(false), 3000);
    } finally {
      setChangingPassword(false);
    }
  }

  async function handleRemove(userId: string) {
    if (!token || !org) return;
    if (!confirm("Remove this member?")) return;
    setRemoving(userId);
    try {
      await portalApi.removeMember(token, org.id, userId);
      setMembers((prev) => prev.filter((m) => m.id !== userId));
    } finally {
      setRemoving(null);
    }
  }

  return (
    <PortalShell>
      <div className="p-8 max-w-2xl">
        <h1 className="font-[family-name:var(--font-sora)] font-semibold text-2xl text-forest mb-1">Settings</h1>
        <p className="text-sm text-charcoal/50 mb-10">Organisation name and team members</p>

        {loading ? (
          <p className="text-sm text-charcoal/40">Loading…</p>
        ) : (
          <div className="flex flex-col gap-8">

            {/* Org name */}
            <section className="rounded-xl border border-sage/30 bg-white p-6">
              <h2 className="font-[family-name:var(--font-sora)] font-semibold text-base text-forest mb-4">
                Organisation name
              </h2>
              <form onSubmit={saveName} className="flex gap-3">
                <input
                  type="text"
                  required
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                  className="flex-1 rounded-xl border border-sage/40 px-4 py-3 text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-moss/40 transition"
                />
                <button
                  type="submit"
                  disabled={savingName || orgName === org?.name}
                  className="rounded-full bg-forest px-5 py-2.5 text-sm font-semibold text-ivory hover:bg-moss transition-colors disabled:opacity-50"
                >
                  {nameSaved ? "Saved ✓" : savingName ? "Saving…" : "Save"}
                </button>
              </form>
            </section>

            {/* Members */}
            <section className="rounded-xl border border-sage/30 bg-white p-6">
              <h2 className="font-[family-name:var(--font-sora)] font-semibold text-base text-forest mb-4">
                Team members
              </h2>

              {members.length > 0 && (
                <div className="flex flex-col divide-y divide-sage/20 mb-6 rounded-xl border border-sage/20 overflow-hidden">
                  {members.map((m) => (
                    <div key={m.id} className="flex items-center justify-between px-4 py-3">
                      <div>
                        <p className="text-sm font-medium text-forest">{m.firstName} {m.lastName}</p>
                        <p className="text-xs text-charcoal/40">{m.email} · {m.role}</p>
                      </div>
                      <button
                        onClick={() => handleRemove(m.id)}
                        disabled={removing === m.id}
                        className="text-xs text-red-400 hover:text-red-600 transition-colors disabled:opacity-40"
                      >
                        {removing === m.id ? "Removing…" : "Remove"}
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <h3 className="text-xs font-semibold text-charcoal/50 uppercase tracking-wide mb-3">Invite member</h3>
              <form onSubmit={handleInvite} className="flex flex-col gap-3">
                <input
                  type="email"
                  required
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  placeholder="email@organisation.com"
                  className="rounded-xl border border-sage/40 px-4 py-3 text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-moss/40 transition"
                />
                <select
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value)}
                  className="rounded-xl border border-sage/40 px-4 py-3 text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-moss/40 transition"
                >
                  <option value="HOME_MANAGER">Home Manager</option>
                  <option value="SENIOR_STAFF">Senior Staff</option>
                  <option value="STAFF">Staff</option>
                </select>
                {inviteError && <p className="text-sm text-red-600">{inviteError}</p>}
                <button
                  type="submit"
                  disabled={inviting}
                  className="self-start rounded-full bg-forest px-5 py-2.5 text-sm font-semibold text-ivory hover:bg-moss transition-colors disabled:opacity-60"
                >
                  {inviting ? "Inviting…" : "Send invite"}
                </button>
              </form>
            </section>

            {/* Change password */}
            <section className="rounded-xl border border-sage/30 bg-white p-6">
              <h2 className="font-[family-name:var(--font-sora)] font-semibold text-base text-forest mb-4">
                Change password
              </h2>
              <form onSubmit={handleChangePassword} className="flex flex-col gap-3">
                <input
                  type="password"
                  required
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Current password"
                  className="rounded-xl border border-sage/40 px-4 py-3 text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-moss/40 transition"
                />
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="New password"
                  className="rounded-xl border border-sage/40 px-4 py-3 text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-moss/40 transition"
                />
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                  className="rounded-xl border border-sage/40 px-4 py-3 text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-moss/40 transition"
                />
                {passwordError && <p className="text-sm text-red-600">{passwordError}</p>}
                {passwordSaved && <p className="text-sm text-moss font-medium">Password updated ✓</p>}
                <button
                  type="submit"
                  disabled={changingPassword}
                  className="self-start rounded-full bg-forest px-5 py-2.5 text-sm font-semibold text-ivory hover:bg-moss transition-colors disabled:opacity-60"
                >
                  {changingPassword ? "Updating…" : "Update password"}
                </button>
              </form>
            </section>

          </div>
        )}
      </div>
    </PortalShell>
  );
}
