import Link from "next/link";
import KoraLogo from "./KoraLogo";

export default function Footer() {
  return (
    <footer className="bg-charcoal py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <Link href="/">
          <KoraLogo className="h-6 w-auto brightness-0 invert opacity-70" />
        </Link>
        <p className="text-xs text-white/40 text-center">
          © {new Date().getFullYear()} KORA. Care. Insight. Better Outcomes.
          <br />
          <span>A </span>
          <a
            href="https://sixbyfive.com"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-white/70 transition-colors"
          >
            SixByFive
          </a>
          <span> product.</span>
        </p>
        <div className="flex gap-6">
          {["Privacy", "Terms", "Contact"].map((link) => (
            <Link
              key={link}
              href={`/${link.toLowerCase()}`}
              className="text-xs text-white/40 hover:text-white/70 transition-colors"
            >
              {link}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
