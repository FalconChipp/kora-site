import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How KORA collects, uses, and protects your data. GDPR-compliant, UK data residency, full data isolation between homes.",
  alternates: { canonical: "https://koraplatform.co.uk/privacy" },
  openGraph: { url: "https://koraplatform.co.uk/privacy" },
  robots: { index: true, follow: false },
};

const LAST_UPDATED = "30 July 2026";

export default function PrivacyPage() {
  return (
    <div className="flex flex-col min-h-full bg-ivory font-[family-name:var(--font-inter)]">
      <Nav />
      <main className="flex flex-col flex-1">

        {/* Hero */}
        <section className="bg-forest py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-widest text-sage mb-4">Legal</p>
              <h1 className="font-[family-name:var(--font-sora)] font-semibold text-3xl sm:text-5xl text-ivory leading-tight mb-4">
                Privacy Policy
              </h1>
              <p className="text-sm text-sage/70">Last updated {LAST_UPDATED}</p>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <div className="prose-kora">

              <h2>1. Who we are</h2>
              <p>
                KORA is a product of SixByFive Ltd, a company registered in England and Wales. When we say &ldquo;KORA&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo; or &ldquo;our&rdquo; in this policy, we mean SixByFive Ltd operating the KORA platform at{" "}
                <a href="https://koraplatform.co.uk">koraplatform.co.uk</a>.
              </p>
              <p>
                We take privacy seriously. KORA is used in settings that handle sensitive information about children and young people. We have designed our systems with that responsibility in mind.
              </p>

              <h2>2. What data we collect</h2>
              <h3>Account and billing data</h3>
              <p>When you create an organisation on KORA, we collect your name, email address, organisation name, and billing information (handled by Stripe — we do not store card details ourselves).</p>
              <h3>Usage data</h3>
              <p>With your consent, we collect anonymised analytics via Google Analytics 4 to understand how people navigate our marketing site (koraplatform.co.uk). This data does not identify individuals and is not used in the KORA care platform.</p>
              <h3>Care platform data</h3>
              <p>Data entered into the KORA care platform (logs, records, young person profiles) is stored securely on UK-based servers. This data is owned by the care organisation and is processed by SixByFive Ltd as a data processor under your instructions.</p>
              <h3>Cookies</h3>
              <p>Our marketing site uses a single analytics cookie (set by Google Analytics) only when you consent. No tracking cookies are set without your explicit consent. Our consent preference is stored in your browser&rsquo;s local storage.</p>

              <h2>3. How we use your data</h2>
              <ul>
                <li>To create and manage your KORA account</li>
                <li>To process payments via Stripe</li>
                <li>To send transactional emails (password resets, purchase confirmations)</li>
                <li>To improve our marketing site using aggregated, anonymised analytics (with consent)</li>
                <li>To provide support when you contact us</li>
              </ul>
              <p>We do not sell your data. We do not use care platform data for any purpose other than providing the KORA service to your organisation.</p>

              <h2>4. Who we share data with</h2>
              <p>We use a small number of trusted third-party processors:</p>
              <ul>
                <li><strong>Stripe</strong> — payment processing (UK/EU data centres)</li>
                <li><strong>Google Analytics</strong> — anonymised site usage (marketing site only, with consent)</li>
                <li><strong>Mailcow / SMTP relay</strong> — transactional email delivery</li>
              </ul>
              <p>All processors are bound by data processing agreements and comply with UK GDPR.</p>

              <h2>5. Data retention</h2>
              <p>Account data is retained for the duration of your subscription and for up to 12 months after cancellation. Care platform data is retained according to the schedule agreed with your organisation. You may request deletion at any time by contacting us.</p>

              <h2>6. Your rights</h2>
              <p>Under UK GDPR you have the right to access, correct, port, or delete your personal data; to object to processing; and to withdraw consent at any time. To exercise any of these rights, email us at{" "}
                <a href="mailto:privacy@koraplatform.co.uk">privacy@koraplatform.co.uk</a>.
              </p>
              <p>You can withdraw analytics consent at any time by clicking &ldquo;Decline&rdquo; in the cookie banner or clearing your browser&rsquo;s local storage.</p>

              <h2>7. Security</h2>
              <p>All data is transmitted over HTTPS. The care platform database is encrypted at rest. Access to production systems is restricted to authorised personnel and protected by strong authentication. We undergo regular security reviews.</p>

              <h2>8. Children&rsquo;s data</h2>
              <p>The KORA care platform may be used to record information about children and young people in residential care. This data is entered by authorised care staff and is processed under the authority of the care organisation (the data controller). We process this data solely to provide the service and never use it for any other purpose.</p>

              <h2>9. Changes to this policy</h2>
              <p>We may update this policy from time to time. If we make material changes, we will notify account holders by email. The date at the top of this page always reflects when it was last updated.</p>

              <h2>10. Contact</h2>
              <p>
                Questions about this policy? Contact us at{" "}
                <a href="mailto:privacy@koraplatform.co.uk">privacy@koraplatform.co.uk</a>{" "}
                or write to: SixByFive Ltd, England.
              </p>

            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
