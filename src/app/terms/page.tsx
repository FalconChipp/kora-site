import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms and conditions governing use of the KORA platform. Governed by the laws of England and Wales.",
  alternates: { canonical: "https://koraplatform.co.uk/terms" },
  openGraph: { url: "https://koraplatform.co.uk/terms" },
  robots: { index: true, follow: false },
};

const LAST_UPDATED = "30 July 2026";

export default function TermsPage() {
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
                Terms of Service
              </h1>
              <p className="text-sm text-sage/70">Last updated {LAST_UPDATED}</p>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <div className="prose-kora">

              <h2>1. Agreement to these terms</h2>
              <p>
                By accessing or using the KORA platform (&ldquo;the Service&rdquo;) you agree to be bound by these Terms of Service. If you are using KORA on behalf of an organisation, you represent that you have authority to bind that organisation to these terms.
              </p>
              <p>
                The Service is provided by SixByFive Ltd (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;). These terms govern all use of KORA, including the marketing site at koraplatform.co.uk, the account portal, and the KORA desktop application.
              </p>

              <h2>2. Eligibility</h2>
              <p>
                You must be at least 18 years old and have the legal capacity to enter into a contract. The Service is intended for use by organisations operating in regulated care settings in the United Kingdom. Use of the Service by organisations outside the UK is permitted but subject to your compliance with all applicable local laws.
              </p>

              <h2>3. Subscriptions and billing</h2>
              <p>
                KORA is offered on a subscription basis. Pricing is shown on our pricing page and may change with 30 days&rsquo; written notice. Subscriptions are billed in advance for the period selected (monthly or annual). Payments are processed by Stripe. We do not store your payment card details.
              </p>
              <p>
                Subscriptions auto-renew unless cancelled before the renewal date. You may cancel at any time from your billing settings. No refunds are issued for unused portions of a billing period unless required by law.
              </p>

              <h2>4. Acceptable use</h2>
              <p>You agree not to:</p>
              <ul>
                <li>Use the Service in any way that violates applicable law or regulation</li>
                <li>Share your account credentials with unauthorised individuals</li>
                <li>Attempt to gain unauthorised access to any part of the Service or its infrastructure</li>
                <li>Upload or transmit malicious code or interfere with the integrity of the Service</li>
                <li>Use the Service to store or process data in a way that breaches your data protection obligations</li>
                <li>Resell or sublicense access to the Service without our written consent</li>
              </ul>

              <h2>5. Data and confidentiality</h2>
              <p>
                Data you enter into KORA (&ldquo;Your Data&rdquo;) remains your property. You grant us a limited licence to process Your Data solely for the purpose of providing the Service. We will not access Your Data except to provide support you have requested or as required by law.
              </p>
              <p>
                Where your use of KORA involves personal data about children or young people in your care, you are the data controller and we act as your data processor. Our data processing obligations are set out in our <a href="/privacy">Privacy Policy</a> and, where applicable, a Data Processing Agreement.
              </p>

              <h2>6. Intellectual property</h2>
              <p>
                KORA, its software, design, and documentation are owned by SixByFive Ltd and protected by intellectual property law. These terms do not transfer any ownership to you. You receive a limited, non-exclusive, non-transferable licence to use the Service for the duration of your subscription.
              </p>

              <h2>7. Availability and support</h2>
              <p>
                We aim to maintain high availability but do not guarantee uninterrupted access. Planned maintenance will be communicated in advance where possible. We provide support via email during UK business hours. Response times are not guaranteed but we aim to respond to all enquiries within two business days.
              </p>

              <h2>8. Limitation of liability</h2>
              <p>
                To the maximum extent permitted by law, SixByFive Ltd shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of data, revenue, or business, arising from your use of the Service.
              </p>
              <p>
                Our total aggregate liability to you in any 12-month period shall not exceed the total fees you paid to us during that period.
              </p>
              <p>
                Nothing in these terms limits liability that cannot be limited by law, including liability for death or personal injury caused by our negligence or for fraud.
              </p>

              <h2>9. Termination</h2>
              <p>
                You may cancel your subscription at any time. We may suspend or terminate your access immediately if you breach these terms, fail to pay fees when due, or if we are required to do so by law.
              </p>
              <p>
                Upon termination, we will retain Your Data for 90 days to allow you to export it, after which it will be deleted in accordance with our data retention policy.
              </p>

              <h2>10. Changes to these terms</h2>
              <p>
                We may update these terms from time to time. We will give you at least 30 days&rsquo; notice of material changes via email. Continued use of the Service after changes take effect constitutes acceptance of the revised terms.
              </p>

              <h2>11. Governing law</h2>
              <p>
                These terms are governed by the law of England and Wales. Any disputes shall be subject to the exclusive jurisdiction of the courts of England and Wales.
              </p>

              <h2>12. Contact</h2>
              <p>
                Questions about these terms? Contact us at{" "}
                <a href="mailto:legal@koraplatform.co.uk">legal@koraplatform.co.uk</a>.
              </p>

            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
