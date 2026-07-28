import Link from "next/link";
import KoraLogo from "@/components/KoraLogo";

export default function StartSuccessPage() {
  return (
    <div className="min-h-screen bg-forest flex flex-col items-center justify-center px-4 font-[family-name:var(--font-inter)] text-center">
      <Link href="/" className="mb-10">
        <KoraLogo className="h-8 w-auto brightness-0 invert" />
      </Link>
      <div className="w-full max-w-md bg-white rounded-2xl p-8 shadow-sm">
        <div className="w-12 h-12 rounded-full bg-moss/15 flex items-center justify-center mx-auto mb-5">
          <svg viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6 text-moss">
            <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
          </svg>
        </div>
        <h1 className="font-[family-name:var(--font-sora)] font-semibold text-xl text-forest mb-2">
          You&apos;re all set
        </h1>
        <p className="text-sm text-charcoal/55 leading-relaxed mb-6">
          Your account is being created. You&apos;ll receive an email shortly with your login details. Your 7-day free trial starts now.
        </p>
        <Link
          href="/portal/login"
          className="inline-flex rounded-full bg-forest px-6 py-3.5 text-sm font-semibold text-ivory hover:bg-moss transition-colors"
        >
          Go to your portal →
        </Link>
      </div>
    </div>
  );
}
