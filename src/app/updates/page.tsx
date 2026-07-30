import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Updates — KORA",
  description: "Release notes and platform updates for KORA.",
};

type Release = {
  version: string;
  date: string;
  tag: "desktop" | "platform" | "both";
  summary: string;
  added?: string[];
  changed?: string[];
  fixed?: string[];
};

const RELEASES: Release[] = [
  {
    version: "0.2.1",
    date: "July 2026",
    tag: "desktop",
    summary: "Auto-update infrastructure and installer improvements.",
    added: [
      "Auto-updater: the desktop app now checks for new versions on launch and prompts to install them without requiring a manual download.",
      "Windows NSIS installer with optional installation directory and desktop shortcut.",
    ],
    changed: [
      "API endpoint switched to api.koraplatform.co.uk (HTTPS) across the app.",
    ],
  },
  {
    version: "0.2.0",
    date: "July 2026",
    tag: "both",
    summary: "Password reset flow, account portal, and platform stability improvements.",
    added: [
      "Forgot password and reset password flow — request a reset link by email from the login screen.",
      "Account portal on koraplatform.co.uk — manage your organisation, homes, and team members.",
      "Cookie consent banner on the marketing site with GDPR-compliant analytics opt-in.",
      "Privacy policy and terms of service pages.",
    ],
    changed: [
      "Improved email delivery reliability — all transactional emails are now DKIM-signed and pass SPF checks.",
      "Platform admin tooling for managing organisations and subscriptions.",
    ],
    fixed: [
      "Home access guard now correctly restricts staff to homes they are assigned to.",
      "Tenant provisioning edge cases resolved during organisation creation.",
    ],
  },
  {
    version: "0.1.0",
    date: "June 2026",
    tag: "both",
    summary: "Initial private release of KORA.",
    added: [
      "Core care platform: daily logs, young person profiles, home management.",
      "Multi-tenant architecture — each organisation gets an isolated data environment.",
      "Role-based access control: platform admin, organisation admin, and care staff roles.",
      "Stripe billing integration with subscription management.",
      "Early access sign-up on koraplatform.co.uk.",
    ],
  },
];

const TAG_LABELS: Record<Release["tag"], string> = {
  desktop: "Desktop",
  platform: "Platform",
  both: "Desktop + Platform",
};

const TAG_STYLES: Record<Release["tag"], string> = {
  desktop: "bg-moss/10 text-moss",
  platform: "bg-forest/10 text-forest",
  both: "bg-sage/40 text-forest",
};

export default function UpdatesPage() {
  return (
    <div className="flex flex-col min-h-full bg-ivory font-[family-name:var(--font-inter)]">
      <Nav />
      <main className="flex flex-col flex-1">

        {/* Hero */}
        <section className="bg-forest py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-widest text-sage mb-4">Changelog</p>
              <h1 className="font-[family-name:var(--font-sora)] font-semibold text-3xl sm:text-5xl text-ivory leading-tight mb-4">
                Platform updates
              </h1>
              <p className="text-base text-sage/70 leading-relaxed">
                What&rsquo;s new in KORA — improvements, fixes, and new features across the desktop app and platform.
              </p>
            </div>
          </div>
        </section>

        {/* Releases */}
        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-12">
              {RELEASES.map((release) => (
                <div key={release.version} className="relative pl-6 border-l-2 border-sage/40">
                  {/* Dot */}
                  <span className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-moss" />

                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <h2 className="font-[family-name:var(--font-sora)] font-semibold text-xl text-forest">
                      v{release.version}
                    </h2>
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${TAG_STYLES[release.tag]}`}>
                      {TAG_LABELS[release.tag]}
                    </span>
                    <span className="text-xs text-charcoal/40">{release.date}</span>
                  </div>

                  <p className="text-sm text-charcoal/60 mb-5 leading-relaxed">{release.summary}</p>

                  <div className="flex flex-col gap-4">
                    {release.added && (
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-moss mb-2">Added</p>
                        <ul className="flex flex-col gap-1.5">
                          {release.added.map((item) => (
                            <li key={item} className="flex gap-2 text-sm text-charcoal/60 leading-relaxed">
                              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-moss/50 shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {release.changed && (
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-charcoal/40 mb-2">Changed</p>
                        <ul className="flex flex-col gap-1.5">
                          {release.changed.map((item) => (
                            <li key={item} className="flex gap-2 text-sm text-charcoal/60 leading-relaxed">
                              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-charcoal/20 shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {release.fixed && (
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-forest/60 mb-2">Fixed</p>
                        <ul className="flex flex-col gap-1.5">
                          {release.fixed.map((item) => (
                            <li key={item} className="flex gap-2 text-sm text-charcoal/60 leading-relaxed">
                              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-forest/30 shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
