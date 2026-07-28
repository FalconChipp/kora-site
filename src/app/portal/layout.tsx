import { PortalAuthProvider } from "@/lib/portal-auth";

export const metadata = { title: "KORA Portal" };

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return <PortalAuthProvider>{children}</PortalAuthProvider>;
}
