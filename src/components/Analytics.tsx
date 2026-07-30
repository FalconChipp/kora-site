"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

const GA_ID = "G-CCTECVNVSL";

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}

export function useConsent() {
  const [consent, setConsent] = useState<boolean | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("kora_cookie_consent");
    if (stored !== null) setConsent(stored === "true");
  }, []);

  function accept() {
    localStorage.setItem("kora_cookie_consent", "true");
    setConsent(true);
    window.gtag?.("consent", "update", {
      analytics_storage: "granted",
      ad_storage: "denied",
    });
  }

  function decline() {
    localStorage.setItem("kora_cookie_consent", "false");
    setConsent(false);
    window.gtag?.("consent", "update", {
      analytics_storage: "denied",
      ad_storage: "denied",
    });
  }

  return { consent, accept, decline };
}

export default function Analytics() {
  const { consent } = useConsent();

  if (consent === false) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('consent', 'default', {
            analytics_storage: '${consent === true ? "granted" : "denied"}',
            ad_storage: 'denied',
          });
          gtag('js', new Date());
          gtag('config', '${GA_ID}', { page_path: window.location.pathname });
        `}
      </Script>
    </>
  );
}
