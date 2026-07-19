import Link from "next/link";
import KoraLogo from "./KoraLogo";

const NAV_LINKS = [
  { label: "Product", href: "/product" },
  { label: "Features", href: "/features" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 bg-ivory/90 backdrop-blur border-b border-sage/40">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 flex items-center justify-between h-16">
        <Link href="/">
          <KoraLogo className="h-8 w-auto" />
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="text-sm font-medium text-charcoal/70 hover:text-forest transition-colors"
            >
              {label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link href="#" className="hidden sm:inline text-sm font-medium text-forest hover:text-moss transition-colors">
            Sign in
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-1.5 rounded-full bg-forest px-5 py-2 text-sm font-semibold text-ivory hover:bg-moss transition-colors"
          >
            Request demo
          </Link>
        </div>
      </div>
    </header>
  );
}
