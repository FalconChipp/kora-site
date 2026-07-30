import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Link from "next/link";

export const revalidate = 300;

export const metadata = {
  title: "Download KORA",
  description: "Download the latest KORA desktop app for Windows and macOS.",
};

const UPDATES_BASE = "https://api.koraplatform.co.uk/updates";

type LatestRelease = {
  version: string;
  filename: string;
  downloadUrl: string;
  releasedAt: string | null;
};

async function fetchLatest(ymlFile: string): Promise<LatestRelease | null> {
  try {
    const res = await fetch(`${UPDATES_BASE}/${ymlFile}`, { next: { revalidate: 300 } });
    if (!res.ok) return null;
    const text = await res.text();
    const version = text.match(/^version:\s*(.+)$/m)?.[1]?.trim() ?? null;
    const path = text.match(/^path:\s*(.+)$/m)?.[1]?.trim() ?? null;
    const releaseDate = text.match(/releaseDate:\s*'(.+?)'/)?.[1] ?? null;
    if (!version || !path) return null;
    return {
      version,
      filename: path,
      downloadUrl: `${UPDATES_BASE}/${encodeURIComponent(path)}`,
      releasedAt: releaseDate
        ? new Date(releaseDate).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })
        : null,
    };
  } catch {
    return null;
  }
}

const FEATURES = [
  {
    title: "Always up to date",
    body: "KORA checks for updates every time it opens and installs them in the background. Your team stays on the same version without anyone having to think about it.",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
  },
  {
    title: "Built for care settings",
    body: "Optimised for the pace of a residential home — quick navigation between young people, fast log entry, and a layout designed for shift handovers.",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-2 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
  {
    title: "Secure by default",
    body: "Sessions are encrypted end-to-end. Role-based access means staff only see the homes and young people they're assigned to.",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
];

export default async function DownloadPage() {
  const [windows, mac] = await Promise.all([
    fetchLatest("latest.yml"),
    fetchLatest("latest-mac.yml"),
  ]);

  const currentVersion = windows?.version ?? mac?.version;

  return (
    <div className="flex flex-col min-h-full bg-ivory font-[family-name:var(--font-inter)]">
      <Nav />
      <main className="flex flex-col flex-1">

        {/* Hero — download CTA front and centre */}
        <section className="bg-forest flex-1 py-20 sm:py-28">
          <div className="mx-auto max-w-2xl px-4 sm:px-6 text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-sage/50 mb-5">Desktop App</p>
            <h1 className="font-[family-name:var(--font-sora)] font-semibold text-3xl sm:text-5xl text-ivory leading-tight mb-5">
              Download KORA
            </h1>
            <p className="text-sm sm:text-base text-sage/60 leading-relaxed mb-10 max-w-sm mx-auto">
              The care platform for residential homes. Install once, stay current automatically.
            </p>

            {/* Primary: Windows */}
            {windows ? (
              <div className="flex flex-col items-center gap-3">
                <a
                  href={windows.downloadUrl}
                  className="inline-flex items-center gap-3 rounded-full bg-ivory px-7 py-4 text-sm font-semibold text-forest hover:bg-sage transition-colors"
                >
                  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M3 5.557L10.938 4.5V11.7H3V5.557zM3 18.443L10.938 19.5V12.3H3v6.143zM11.813 4.376L21 3v8.7h-9.188V4.376zM11.813 19.624L21 21v-8.7h-9.188v7.324z" />
                  </svg>
                  Download for Windows
                  <span className="text-forest/40 font-normal">v{windows.version}</span>
                </a>
                {windows.releasedAt && (
                  <p className="text-xs text-sage/40">Released {windows.releasedAt}</p>
                )}
              </div>
            ) : (
              <p className="text-sm text-sage/40">No Windows build available yet.</p>
            )}

            {/* Secondary: macOS */}
            <div className="mt-6 border-t border-white/10 pt-6">
              {mac ? (
                <a
                  href={mac.downloadUrl}
                  className="inline-flex items-center gap-2 text-sm text-sage/60 hover:text-sage transition-colors"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                  </svg>
                  Also available for macOS — v{mac.version}
                </a>
              ) : (
                <p className="text-sm text-sage/40">
                  macOS coming soon —{" "}
                  <Link href="/contact" className="underline underline-offset-2 hover:text-sage/60 transition-colors">
                    get notified
                  </Link>
                </p>
              )}
            </div>
          </div>
        </section>

        {/* Requirements + features — ivory section */}
        <section className="bg-ivory py-14 sm:py-16 border-t border-sage/20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 flex flex-col gap-12">

            {/* Requirements row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: "Windows", value: "10 or later" },
                { label: "Architecture", value: "x64" },
                { label: "Disk", value: "~200 MB" },
                { label: "Updates", value: "Automatic" },
              ].map(({ label, value }) => (
                <div key={label} className="rounded-xl border border-sage/30 bg-white px-4 py-3">
                  <p className="text-xs font-semibold uppercase tracking-wide text-charcoal/30 mb-0.5">{label}</p>
                  <p className="text-sm font-medium text-charcoal/70">{value}</p>
                </div>
              ))}
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {FEATURES.map(({ title, body, icon }) => (
                <div key={title}>
                  <div className="w-9 h-9 rounded-xl bg-moss/10 text-moss flex items-center justify-center mb-3">
                    {icon}
                  </div>
                  <h3 className="font-[family-name:var(--font-sora)] font-semibold text-sm text-forest mb-1.5">{title}</h3>
                  <p className="text-sm text-charcoal/50 leading-relaxed">{body}</p>
                </div>
              ))}
            </div>

            {/* Footer note */}
            <div className="flex items-center justify-between border-t border-sage/20 pt-6">
              {currentVersion && (
                <p className="text-xs text-charcoal/30">Current release: v{currentVersion}</p>
              )}
              <Link href="/updates" className="text-xs text-moss underline underline-offset-2 hover:text-forest transition-colors ml-auto">
                View patch notes →
              </Link>
            </div>

          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
