import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Link from "next/link";

const PLANS = [
  {
    name: "Starter",
    price: "£149",
    per: "per home / month",
    description: "For a single home getting started with outcomes recording.",
    highlight: false,
    features: [
      "Up to 12 young people",
      "Unlimited staff accounts",
      "Daily logs & incident recording",
      "Young person profiles",
      "Basic outcome reports",
      "UK data hosting",
      "Email support",
    ],
  },
  {
    name: "Professional",
    price: "£299",
    per: "per home / month",
    description: "For homes that want automated insight and full reporting capability.",
    highlight: true,
    features: [
      "Unlimited young people",
      "Unlimited staff accounts",
      "Everything in Starter",
      "Automated pattern detection",
      "Behaviour & mood dashboards",
      "One-click statutory reports",
      "Medication & school tracking",
      "Custom alert thresholds",
      "Priority support",
    ],
  },
  {
    name: "Organisation",
    price: "Custom",
    per: "contact us",
    description: "For organisations managing multiple homes with group-level oversight.",
    highlight: false,
    features: [
      "Multiple homes, one login",
      "Organisation-level dashboards",
      "Cross-home outcome benchmarking",
      "Custom report templates",
      "Dedicated onboarding",
      "SLA-backed support",
      "Contract pricing",
    ],
  },
];

const FAQS = [
  {
    q: "Is there a free trial?",
    a: "Yes — every plan starts with a 30-day free trial, no card required. We'll onboard your team and get your first home set up during the trial period.",
  },
  {
    q: "Can we add more homes later?",
    a: "Absolutely. You can add homes to your account at any time. Organisation customers get a single consolidated bill; individual home customers are billed per home.",
  },
  {
    q: "Where is our data stored?",
    a: "All data is stored in the UK. Each home's data is held in its own isolated database — staff at one home cannot access another home's records, even within the same organisation.",
  },
  {
    q: "Do you offer training?",
    a: "All plans include onboarding documentation and video guides. Professional and Organisation plans include live onboarding sessions with a KORA team member.",
  },
  {
    q: "What does 'contact us' mean for Organisation pricing?",
    a: "Organisation pricing is based on the number of homes and young people. Get in touch and we'll provide a quote within one working day.",
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
                Straightforward pricing. No surprises.
              </h1>
              <p className="text-base sm:text-lg text-sage/80 leading-relaxed">
                Per home, per month. Start with a 30-day free trial on any plan.
              </p>
            </div>
          </div>
        </section>

        {/* Plans */}
        <section className="py-16 sm:py-24 bg-ivory">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-start">
              {PLANS.map(({ name, price, per, description, highlight, features }) => (
                <div
                  key={name}
                  className={`flex flex-col rounded-2xl border p-6 sm:p-8 ${
                    highlight
                      ? "bg-forest border-forest text-ivory"
                      : "bg-white border-sage/30"
                  }`}
                >
                  <p className={`text-xs font-semibold uppercase tracking-widest mb-4 ${highlight ? "text-sage" : "text-moss"}`}>
                    {name}
                  </p>
                  <div className="mb-1">
                    <span className={`font-[family-name:var(--font-sora)] font-semibold text-4xl ${highlight ? "text-ivory" : "text-forest"}`}>
                      {price}
                    </span>
                  </div>
                  <p className={`text-xs mb-4 ${highlight ? "text-sage" : "text-charcoal/50"}`}>{per}</p>
                  <p className={`text-sm mb-6 sm:mb-8 leading-relaxed ${highlight ? "text-sage/80" : "text-charcoal/60"}`}>{description}</p>
                  <ul className="flex flex-col gap-2.5 sm:gap-3 mb-8 sm:mb-10 flex-1">
                    {features.map((f) => (
                      <li key={f} className={`flex items-start gap-2.5 text-sm ${highlight ? "text-ivory/80" : "text-charcoal/70"}`}>
                        <svg viewBox="0 0 20 20" fill="currentColor" className={`w-4 h-4 mt-0.5 flex-shrink-0 ${highlight ? "text-sage" : "text-moss"}`}>
                          <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
                        </svg>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/contact"
                    className={`inline-flex justify-center rounded-full px-6 py-3 text-sm font-semibold transition-colors ${
                      highlight
                        ? "bg-ivory text-forest hover:bg-sage"
                        : "bg-forest text-ivory hover:bg-moss"
                    }`}
                  >
                    {name === "Organisation" ? "Contact us" : "Start free trial"}
                  </Link>
                </div>
              ))}
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
