const API = process.env.NEXT_PUBLIC_API_URL ?? "";

export async function apiFetch<T>(path: string, token: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...(options?.headers ?? {}),
    },
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message ?? `Request failed: ${res.status}`);
  }
  if (res.status === 204) return undefined as T;
  return res.json();
}

export const portalApi = {
  getOrgs: (token: string) => apiFetch<Org[]>("/organisations/my", token),
  renameOrg: (token: string, orgId: string, name: string) =>
    apiFetch("/organisations/" + orgId, token, { method: "PATCH", body: JSON.stringify({ name }) }),
  getMembers: (token: string, orgId: string) =>
    apiFetch<Member[]>("/organisations/" + orgId + "/members", token),
  addMember: (token: string, orgId: string, data: { email: string; role: string }) =>
    apiFetch("/organisations/" + orgId + "/members", token, { method: "POST", body: JSON.stringify(data) }),
  removeMember: (token: string, orgId: string, userId: string) =>
    apiFetch("/organisations/" + orgId + "/members/" + userId, token, { method: "DELETE" }),
  getHomes: (token: string) => apiFetch<Home[]>("/homes/my", token),
  createHome: (token: string, data: { name: string; organisationId: string; address?: string }) =>
    apiFetch<Home>("/homes", token, { method: "POST", body: JSON.stringify(data) }),
  deleteHome: (token: string, homeId: string) =>
    apiFetch("/homes/" + homeId, token, { method: "DELETE" }),
  syncHomes: (token: string) =>
    fetch("/api/stripe/sync-homes", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    }).then(() => {}),
};

export interface Org {
  id: string;
  name: string;
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
  subscriptionStatus?: string;
}

export interface Member {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}

export interface Home {
  id: string;
  name: string;
  address?: string;
}
