import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Link from "next/link";

const KORA_FEATURES = [
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
    a: "Yes — every plan starts with a 30-day free trial, no card required. We'll onboard your team and get your first home set up during the trial period.",
  },
  {
    q: "Are there any setup fees or per-user charges?",
    a: "No. £149/month is the full cost — no setup fee, no per-seat pricing, no hidden extras. All staff accounts are included.",
  },
  {
    q: "Where is our data stored?",
    a: "All data is stored in the UK. Each home's data is held in its own isolated database — staff at one home cannot access another home's records, even within the same organisation.",
  },
  {
    q: "Can we cancel anytime?",
    a: "Yes, you can cancel at any time with no penalty. Your data remains accessible for 30 days after cancellation so you can export anything you need.",
  },
  {
    q: "What does the Enterprise plan include?",
    a: "Enterprise is for larger providers who need multi-team oversight, SSO, integrations with existing systems, migration support, or contractual service levels. Get in touch and we'll put together a proposal.",
  },
];

export default function PricingPage() {
  return (
    <div className="flex flex-col min-h-full bg-ivory font-[family-name:var(--font-inter)]">
      <Nav />
      <main className="flex flex-col flex-1">

        {/* Hero */}
        <section className="bg-forest py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-widest text-sage mb-4 sm:mb-6">Pricing</p>
              <h1 className="font-[family-name:var(--font-sora)] font-semibold text-3xl sm:text-5xl text-ivory leading-tight mb-4 sm:mb-6">
                One plan. Everything included.
              </h1>
              <p className="text-base sm:text-lg text-sage/80 leading-relaxed">
                No tiers, no feature gates, no per-user charges. Just KORA, for your home.
              </p>
            </div>
          </div>
        </section>

        {/* Plans */}
        <section className="py-16 sm:py-24 bg-ivory">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-start">

              {/* KORA plan */}
              <div className="flex flex-col rounded-2xl bg-forest text-ivory p-7 sm:p-10">
                <p className="text-xs font-semibold uppercase tracking-widest text-sage mb-6">KORA</p>
                <div className="mb-1">
                  <span className="font-[family-name:var(--font-sora)] font-semibold text-5xl text-ivory">£149</span>
                  <span className="text-sage text-sm ml-2">/month</span>
                </div>
                <p className="text-sage/80 text-sm leading-relaxed mt-3 mb-8">
                  Everything your team needs to record, understand and improve care.
                </p>
                <ul className="flex flex-col gap-3 mb-10 flex-1">
                  {KORA_FEATURES.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-sm text-ivory/85">
                      <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 flex-shrink-0 text-sage">
                        <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className="inline-flex justify-center rounded-full bg-ivory px-6 py-3.5 text-sm font-semibold text-forest hover:bg-sage transition-colors"
                >
                  Start free trial
                </Link>
                <p className="text-xs text-sage/60 text-center mt-4">
                  No setup fee. No per-user charges. Cancel anytime.
                </p>
              </div>

              {/* Enterprise */}
              <div className="flex flex-col rounded-2xl bg-white border border-sage/30 p-7 sm:p-10">
                <p className="text-xs font-semibold uppercase tracking-widest text-moss mb-6">Enterprise</p>
                <div className="mb-1">
                  <span className="font-[family-name:var(--font-sora)] font-semibold text-5xl text-forest">Let&apos;s talk</span>
                </div>
                <p className="text-charcoal/60 text-sm leading-relaxed mt-3 mb-8">
                  For larger providers requiring multiple-team oversight, SSO, integrations, migration support or contractual service levels.
                </p>
                <ul className="flex flex-col gap-3 mb-10 flex-1">
                  {[
                    "Everything in KORA",
                    "Multi-home & multi-team oversight",
                    "Single sign-on (SSO)",
                    "System integrations",
                    "Data migration support",
                    "Contractual service levels",
                    "Dedicated account manager",
                  ].map((f) => (
                    <li key={f} className="flex items-center gap-3 text-sm text-charcoal/70">
                      <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 flex-shrink-0 text-moss">
                        <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className="inline-flex justify-center rounded-full bg-forest px-6 py-3.5 text-sm font-semibold text-ivory hover:bg-moss transition-colors"
                >
                  Get in touch
                </Link>
              </div>

            </div>
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

      </main>
      <Footer />
    </div>
  );
}
