"use client";

import { useEffect, useState } from "react";
import { useConsent } from "./Analytics";

export default function CookieBanner() {
  const { consent, accept, decline } = useConsent();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (consent === null) setVisible(true);
    else setVisible(false);
  }, [consent]);

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 p-4 sm:p-6 flex justify-center">
      <div className="w-full max-w-2xl bg-forest text-ivory rounded-2xl px-6 py-5 shadow-2xl flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <p className="flex-1 text-sm text-ivory/80 font-[family-name:var(--font-inter)]">
          We use cookies to understand how you use our site and improve your experience.
          Read our{" "}
          <a href="/privacy" className="underline text-sage hover:text-ivory transition-colors">
            privacy policy
          </a>
          .
        </p>
        <div className="flex gap-3 shrink-0">
          <button
            onClick={decline}
            className="rounded-full border border-ivory/30 px-4 py-2 text-sm font-semibold text-ivory/70 hover:text-ivory hover:border-ivory/60 transition-colors"
          >
            Decline
          </button>
          <button
            onClick={accept}
            className="rounded-full bg-moss px-5 py-2 text-sm font-semibold text-ivory hover:bg-sage hover:text-forest transition-colors"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
