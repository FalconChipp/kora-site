import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "KORA costs £125/month for your first home, then £25/month per additional home. No per-user charges, no setup fees, 7-day free trial included.",
  alternates: { canonical: "https://koraplatform.co.uk/pricing" },
  openGraph: { url: "https://koraplatform.co.uk/pricing" },
};

const FEATURES = [
  "Unlimited staff accounts",
  "Young-person profiles",
  "Daily records and handovers",
  "Incidents and safeguarding",
  "Goals, achievements and key work",
  "Trends and insights",
  "Reports and exports",
  "Role-based permissions",
  "Secure cloud backups",
  "Updates and support included",
];

const FAQS = [
  {
    q: "Is there a free trial?",
    a: "Yes — every new home starts with a 7-day free trial, no card required. We'll onboard your team and get everything set up during the trial period.",
  },
  {
    q: "Are there any setup fees or per-user charges?",
    a: "No. £125/month for your first home, then £25/month for each additional home. No setup fee, no per-seat pricing, no hidden extras.",
  },
  {
    q: "How does pricing work for multiple homes?",
    a: "Your first home is £125/month. Every home you add after that is £25/month. A provider with three homes pays £175/month in total.",
  },
  {
    q: "Where is our data stored?",
    a: "All data is stored in the UK. Each home's data is held in its own isolated database — staff at one home cannot access another home's records, even within the same organisation.",
  },
  {
    q: "Can we cancel anytime?",
    a: "Yes, you can cancel at any time with no penalty. Your data remains accessible for 30 days after cancellation so you can export anything you need.",
  },
];

const SCALE_EXAMPLES = [
  { homes: 1, label: "1 home", price: 125 },
  { homes: 2, label: "2 homes", price: 150 },
  { homes: 3, label: "3 homes", price: 175 },
  { homes: 5, label: "5 homes", price: 225 },
];

function Check({ muted }: { muted?: boolean }) {
  return (
    <span className="inline-flex justify-center">
      <svg viewBox="0 0 20 20" fill="currentColor" className={`w-5 h-5 ${muted ? "text-charcoal/25" : "text-moss"}`}>
        <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
      </svg>
    </span>
  );
}

function Cross() {
  return (
    <span className="inline-flex justify-center">
      <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-charcoal/20">
        <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
      </svg>
    </span>
  );
}

function Partial() {
  return (
    <span className="inline-flex justify-center">
      <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-charcoal/30">
        <path fillRule="evenodd" d="M4 10a.75.75 0 0 1 .75-.75h10.5a.75.75 0 0 1 0 1.5H4.75A.75.75 0 0 1 4 10Z" clipRule="evenodd" />
      </svg>
    </span>
  );
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

export default function PricingPage() {
  return (
    <div className="flex flex-col min-h-full bg-ivory font-[family-name:var(--font-inter)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Nav />
      <main className="flex flex-col flex-1">

        {/* Hero */}
        <section className="bg-forest py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-sage mb-4 sm:mb-6">Pricing</p>
            <h1 className="font-[family-name:var(--font-sora)] font-semibold text-3xl sm:text-5xl text-ivory leading-tight mb-4 sm:mb-6">
              Simple pricing. No surprises.
            </h1>
            <p className="text-base sm:text-lg text-sage/80 leading-relaxed max-w-xl mx-auto">
              One price per home. No per-user charges, no feature gates, no hidden fees.
            </p>
          </div>
        </section>

        {/* Plan */}
        <section className="bg-forest py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

              {/* Left: price + scale */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-sage mb-6">KORA</p>
                <div className="flex items-end gap-2 mb-3">
                  <span className="font-[family-name:var(--font-sora)] font-semibold text-8xl text-ivory leading-none">£125</span>
                  <span className="text-sage text-base pb-3">/month</span>
                </div>
                <p className="text-sage/80 text-sm mb-10">
                  First home · then <span className="text-ivory font-medium">+£25/month</span> per additional home
                </p>

                {/* Scale table */}
                <div className="rounded-xl bg-white/10 divide-y divide-white/10 mb-10">
                  {SCALE_EXAMPLES.map(({ label, price }) => (
                    <div key={label} className="flex items-center justify-between px-5 py-3.5">
                      <span className="text-sm text-sage/80">{label}</span>
                      <span className="font-[family-name:var(--font-sora)] font-semibold text-ivory">£{price}/mo</span>
                    </div>
                  ))}
                </div>

                <Link
                  href="/start"
                  className="inline-flex rounded-full bg-ivory px-8 py-4 text-sm font-semibold text-forest hover:bg-sage transition-colors"
                >
                  Get started
                </Link>
                <p className="text-xs text-sage/50 mt-4">
                  7-day free trial · Cancel anytime
                </p>
              </div>

              {/* Right: features */}
              <div className="lg:pt-14">
                <p className="text-xs font-semibold uppercase tracking-widest text-sage mb-6">Everything included</p>
                <ul className="flex flex-col gap-4">
                  {FEATURES.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-sm text-ivory/85">
                      <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 flex-shrink-0 text-sage">
                        <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>
        </section>

        {/* Comparison */}
        <section className="py-16 sm:py-24 bg-ivory">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mb-10 sm:mb-14">
              <p className="text-xs font-semibold uppercase tracking-widest text-moss mb-3">How KORA compares</p>
              <h2 className="font-[family-name:var(--font-sora)] font-semibold text-2xl sm:text-3xl text-forest leading-snug">
                Purpose-built for residential children&apos;s care. Not adapted from something else.
              </h2>
            </div>

            <div className="overflow-x-auto -mx-4 sm:mx-0">
              <table className="w-full min-w-[640px] border-collapse text-sm">
                <thead>
                  <tr>
                    <th className="text-left py-3 px-4 sm:px-6 text-xs font-semibold uppercase tracking-widest text-charcoal/40 w-2/5" />
                    <th className="py-3 px-4 sm:px-6 text-center">
                      <span className="inline-flex items-center gap-1.5 font-[family-name:var(--font-sora)] font-semibold text-forest text-base">
                        <span className="w-2 h-2 rounded-full bg-moss inline-block" />
                        KORA
                      </span>
                    </th>
                    <th className="py-3 px-4 sm:px-6 text-center font-semibold text-charcoal/50 text-sm">Clearcare</th>
                    <th className="py-3 px-4 sm:px-6 text-center font-semibold text-charcoal/50 text-sm">Lief</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-sage/20">
                  {[
                    {
                      label: "Starting price",
                      kora: "£125/month",
                      clearcare: "Per-carer pricing",
                      lief: "Contact for pricing",
                      koraNote: true,
                    },
                    {
                      label: "Per-user charges",
                      kora: "None",
                      clearcare: "Yes",
                      lief: "Yes",
                      koraGood: true,
                    },
                    {
                      label: "Setup fee",
                      kora: "None",
                      clearcare: "Yes",
                      lief: "Yes",
                      koraGood: true,
                    },
                    {
                      label: "Built for residential children's care",
                      kora: true,
                      clearcare: false,
                      lief: "partial",
                    },
                    {
                      label: "Young person outcome tracking",
                      kora: true,
                      clearcare: false,
                      lief: "partial",
                    },
                    {
                      label: "Automated insights & pattern detection",
                      kora: true,
                      clearcare: false,
                      lief: false,
                    },
                    {
                      label: "Statutory reporting (LAC, Ofsted)",
                      kora: true,
                      clearcare: false,
                      lief: "partial",
                    },
                    {
                      label: "Data isolation per home",
                      kora: true,
                      clearcare: false,
                      lief: "partial",
                    },
                    {
                      label: "UK data residency",
                      kora: true,
                      clearcare: false,
                      lief: "partial",
                    },
                    {
                      label: "Offline capable",
                      kora: true,
                      clearcare: false,
                      lief: false,
                    },
                    {
                      label: "Free trial",
                      kora: "7 days",
                      clearcare: "—",
                      lief: "—",
                      koraNote: true,
                    },
                  ].map(({ label, kora, clearcare, lief, koraGood, koraNote }) => (
                    <tr key={label} className="hover:bg-sage/5 transition-colors">
                      <td className="py-3.5 px-4 sm:px-6 text-charcoal/70">{label}</td>
                      <td className="py-3.5 px-4 sm:px-6 text-center">
                        {kora === true ? (
                          <Check />
                        ) : kora === false ? (
                          <Cross />
                        ) : (
                          <span className={`font-medium text-sm ${koraGood ? "text-moss" : koraNote ? "text-forest font-semibold" : "text-charcoal/70"}`}>
                            {kora}
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 sm:px-6 text-center">
                        {clearcare === true ? <Check muted /> : clearcare === false ? <Cross /> : (
                          <span className="text-charcoal/40 text-sm">{clearcare}</span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 sm:px-6 text-center">
                        {lief === true ? <Check muted /> : lief === false ? <Cross /> : lief === "partial" ? <Partial /> : (
                          <span className="text-charcoal/40 text-sm">{lief}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-xs text-charcoal/30 mt-6">
              Based on publicly available information. Verify details with each provider before purchasing.
            </p>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-16 sm:py-24 bg-ivory border-t border-sage/30">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-[family-name:var(--font-sora)] font-semibold text-xl sm:text-2xl text-forest mb-8 sm:mb-12">
              Frequently asked questions
            </h2>
            <div className="flex flex-col divide-y divide-sage/30">
              {FAQS.map(({ q, a }) => (
                <div key={q} className="py-5 sm:py-6">
                  <h3 className="font-[family-name:var(--font-sora)] font-semibold text-sm sm:text-base text-forest mb-2">{q}</h3>
                  <p className="text-sm text-charcoal/60 leading-relaxed">{a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 sm:py-20 bg-forest">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-[family-name:var(--font-sora)] font-semibold text-2xl sm:text-3xl text-ivory mb-4">
              Any questions about pricing?
            </h2>
            <p className="text-sage/80 text-base mb-8">
              Get in touch and we&apos;ll talk you through it — no hard sell, no obligation.
            </p>
            <Link
              href="/contact"
              className="inline-flex rounded-full bg-ivory px-8 py-4 text-sm font-semibold text-forest hover:bg-sage transition-colors"
            >
              Talk to us
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
