import Link from "next/link";
import KoraLogo from "./KoraLogo";

const NAV_LINKS = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  // { label: "Updates", href: "/updates" },
  // { label: "Download", href: "/download" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="bg-charcoal">
      {/* Main row — three equal columns so centre nav is truly centred */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] items-center gap-6">

        {/* Left: logo */}
        <Link href="/" className="flex justify-center sm:justify-start">
          <KoraLogo className="h-6 w-auto brightness-0 invert opacity-60" />
        </Link>

        {/* Centre: nav links */}
        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2" aria-label="Footer navigation">
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="text-xs text-white/40 hover:text-white/70 transition-colors"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Right: SixByFive credit */}
        <div className="hidden sm:flex justify-end">
          <a
            href="https://sixbyfive.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-white/30 hover:text-white/60 transition-colors"
          >
            A SixByFive product
          </a>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/[0.07]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-center">
          <p className="text-xs text-white/25">
            © {new Date().getFullYear()} KORA. Care. Insight. Better Outcomes.
          </p>
        </div>
      </div>
    </footer>
  );
}
