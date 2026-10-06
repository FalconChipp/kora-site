import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "KORA — Care. Insight. Better Outcomes.",
  description:
    "KORA is the outcomes and insights platform for residential children's care. Track progress, spot patterns, and evidence outcomes — automatically.",
  alternates: { canonical: "https://koraplatform.co.uk" },
  openGraph: {
    url: "https://koraplatform.co.uk",
    title: "KORA — Care. Insight. Better Outcomes.",
    description:
      "The outcomes and insights platform for residential children's care. Built for homes, managers, and the young people in their care.",
  },
};

const OUTCOMES = [
  {
    stat: "<2 min",
    label: "Daily log",
    body: "Structured shift logs for mood, sleep, behaviour, and activity — fast enough that staff will actually complete them.",
  },
  {
    stat: "1 click",
    label: "LAC reviews",
    body: "Statutory reports, Ofsted-ready exports, and funding evidence generated from the records your team already keeps.",
  },
  {
    stat: "Real-time",
    label: "Pattern detection",
    body: "KORA automatically surfaces correlations between sleep, mood, incidents, and family contact — no spreadsheets.",
  },
];

const STEPS = [
  {
    step: "01",
    title: "Staff record daily",
    body: "Care workers log shifts, incidents, moods, medication, and activities — the same information they capture today, now structured and attributed.",
  },
  {
    step: "02",
    title: "KORA finds patterns",
    body: "The platform correlates records across time, surfacing the connections nobody had time to look for.",
  },
  {
    step: "03",
    title: "Teams act on evidence",
    body: "Clear dashboards, one-click reviews, and inspection-ready reports — with outcome evidence baked in.",
  },
];

const MODULES = [
  {
    label: "Young people",
    title: "A living profile for every young person.",
    body: "Goals, achievements, family contact, education, health, and wellbeing — updated continuously as staff record.",
  },
  {
    label: "Daily recording",
    title: "Logs, incidents, and medication in one place.",
    body: "Guided incident forms with body maps and follow-up tracking. Medication prompts flag missed doses automatically.",
  },
  {
    label: "Insight",
    title: "Patterns your team didn't have time to find.",
    body: "Automated behaviour dashboards, alert thresholds, and trend views over days, weeks, and months.",
  },
  {
    label: "Reporting",
    title: "Statutory documents in seconds.",
    body: "LAC reviews, Ofsted exports, and funding reports generated in one click, with full audit trail.",
  },
];

const ROLES = [
  { role: "Care workers", tagline: "Less admin. More care." },
  { role: "Home managers", tagline: "Oversight without the overhead." },
  { role: "Org leaders", tagline: "Multi-home clarity." },
];

const TRUST = [
  "UK data residency",
  "Per-home database isolation",
  "Role-based access controls",
  "Full audit trail",
  "Subject access tooling",
  "Right-to-erasure support",
];

function CheckIcon({ dark }: { dark: boolean }) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className={`w-4 h-4 flex-shrink-0 mt-0.5 ${dark ? "text-sage" : "text-moss"}`}>
      <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
    </svg>
  );
}

export default function Home() {
  return (
    <div className="flex flex-col min-h-full bg-ivory font-[family-name:var(--font-inter)]">
      <Nav />
      <main className="flex flex-col flex-1">

        {/* Hero */}
        <section className="bg-forest py-20 sm:py-28 lg:py-36">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-widest text-sage mb-4 sm:mb-6">
                For residential children&apos;s care
              </p>
              <h1 className="font-[family-name:var(--font-sora)] font-semibold text-4xl sm:text-5xl lg:text-6xl text-ivory leading-tight mb-5 sm:mb-7">
                Care. Insight.<br />Better outcomes.
              </h1>
              <p className="text-base sm:text-lg text-sage/80 leading-relaxed max-w-xl mb-8 sm:mb-10">
                KORA turns the information your team already records into real-time insight about every young person in your care — and the statutory evidence to prove it.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/start?plan=trial"
                  className="inline-flex justify-center rounded-full bg-ivory px-7 py-3.5 text-sm font-semibold text-forest hover:bg-sage transition-colors"
                >
                  Start free trial
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex justify-center rounded-full border border-sage/40 px-7 py-3.5 text-sm font-semibold text-ivory hover:border-sage/80 transition-colors"
                >
                  Request a demo
                </Link>
              </div>
              <p className="text-xs text-sage/50 mt-5">
                7-day free trial · No card required · UK data residency
              </p>
            </div>
          </div>
        </section>

        {/* Outcomes strip */}
        <section className="py-16 sm:py-24 bg-ivory">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mb-10 sm:mb-16">
              <p className="text-xs font-semibold uppercase tracking-widest text-moss mb-3 sm:mb-4">Why KORA</p>
              <h2 className="font-[family-name:var(--font-sora)] font-semibold text-2xl sm:text-3xl lg:text-4xl text-forest leading-snug">
                Record once. Evidence everything.
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-10">
              {OUTCOMES.map(({ stat, label, body }) => (
                <div key={label} className="flex flex-col gap-3 border-t-2 border-moss/30 pt-6">
                  <span className="font-[family-name:var(--font-sora)] font-semibold text-3xl sm:text-4xl text-forest leading-none">
                    {stat}
                  </span>
                  <p className="text-xs font-semibold uppercase tracking-wide text-moss">{label}</p>
                  <p className="text-sm text-charcoal/60 leading-relaxed">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="py-16 sm:py-24 bg-forest">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mb-10 sm:mb-16">
              <p className="text-xs font-semibold uppercase tracking-widest text-sage mb-3 sm:mb-4">How it works</p>
              <h2 className="font-[family-name:var(--font-sora)] font-semibold text-2xl sm:text-3xl lg:text-4xl text-ivory leading-snug">
                Simple for staff. Powerful for managers.
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-12">
              {STEPS.map(({ step, title, body }) => (
                <div key={step} className="flex flex-col gap-4">
                  <span className="font-[family-name:var(--font-sora)] font-semibold text-6xl text-sage/40 leading-none">
                    {step}
                  </span>
                  <h3 className="font-[family-name:var(--font-sora)] font-semibold text-lg sm:text-xl text-ivory">{title}</h3>
                  <p className="text-sm text-sage/70 leading-relaxed">{body}</p>
                </div>
              ))}
            </div>
            <div className="mt-10 sm:mt-14">
              <Link href="/product" className="text-sm font-semibold text-sage hover:text-ivory transition-colors underline underline-offset-4">
                See the full product →
              </Link>
            </div>
          </div>
        </section>

        {/* Modules grid */}
        <section className="py-16 sm:py-24 bg-ivory">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mb-10 sm:mb-16">
              <p className="text-xs font-semibold uppercase tracking-widest text-moss mb-3 sm:mb-4">What&apos;s inside</p>
              <h2 className="font-[family-name:var(--font-sora)] font-semibold text-2xl sm:text-3xl lg:text-4xl text-forest leading-snug">
                Everything a children&apos;s home needs to run — and prove it.
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
              {MODULES.map(({ label, title, body }) => (
                <div key={label} className="rounded-2xl border border-sage/30 bg-white p-6 sm:p-8 flex flex-col gap-3">
                  <p className="text-xs font-semibold uppercase tracking-wide text-moss">{label}</p>
                  <h3 className="font-[family-name:var(--font-sora)] font-semibold text-lg sm:text-xl text-forest leading-snug">{title}</h3>
                  <p className="text-sm text-charcoal/60 leading-relaxed">{body}</p>
                </div>
              ))}
            </div>
            <div className="mt-10 sm:mt-14">
              <Link href="/features" className="text-sm font-semibold text-moss hover:text-forest transition-colors underline underline-offset-4">
                Explore every feature →
              </Link>
            </div>
          </div>
        </section>

        {/* Roles */}
        <section className="py-16 sm:py-24 bg-forest">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mb-10 sm:mb-14">
              <p className="text-xs font-semibold uppercase tracking-widest text-sage mb-3 sm:mb-4">Who it&apos;s for</p>
              <h2 className="font-[family-name:var(--font-sora)] font-semibold text-2xl sm:text-3xl lg:text-4xl text-ivory leading-snug">
                Built for every role in your team.
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
              {ROLES.map(({ role, tagline }) => (
                <div key={role} className="rounded-2xl border border-sage/20 bg-ivory/5 p-6 sm:p-8 flex flex-col gap-2">
                  <h3 className="font-[family-name:var(--font-sora)] font-semibold text-base text-ivory">{role}</h3>
                  <p className="text-sm text-sage/70">{tagline}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Trust */}
        <section className="py-16 sm:py-24 bg-ivory">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-moss mb-3 sm:mb-4">Security &amp; compliance</p>
              <h2 className="font-[family-name:var(--font-sora)] font-semibold text-2xl sm:text-3xl lg:text-4xl text-forest leading-snug mb-4 sm:mb-6">
                GDPR-ready from day one.
              </h2>
              <p className="text-sm sm:text-base text-charcoal/60 leading-relaxed">
                Each home&apos;s data lives in its own isolated database — staff at one home cannot see another home&apos;s records, even within the same organisation. All data is stored in the UK.
              </p>
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {TRUST.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-forest">
                  <CheckIcon dark={false} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Pricing teaser */}
        <section className="py-16 sm:py-24 bg-forest">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-sage mb-3 sm:mb-4">Simple pricing</p>
            <h2 className="font-[family-name:var(--font-sora)] font-semibold text-2xl sm:text-3xl lg:text-4xl text-ivory leading-snug mb-4 sm:mb-6">
              £125/month for your first home.
            </h2>
            <p className="text-base sm:text-lg text-sage/70 leading-relaxed max-w-xl mx-auto mb-8">
              Then £25/month for each additional home. No per-seat charges. No setup fees. Cancel anytime.
            </p>
            <Link
              href="/pricing"
              className="inline-flex rounded-full border border-sage/40 px-7 py-3.5 text-sm font-semibold text-ivory hover:border-sage/80 transition-colors"
            >
              See pricing →
            </Link>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 sm:py-24 bg-ivory text-center">
          <div className="mx-auto max-w-2xl px-4 sm:px-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-moss mb-3 sm:mb-4">Get started</p>
            <h2 className="font-[family-name:var(--font-sora)] font-semibold text-2xl sm:text-3xl lg:text-4xl text-forest leading-snug mb-4 sm:mb-6">
              See KORA in your setting.
            </h2>
            <p className="text-sm sm:text-base text-charcoal/60 leading-relaxed mb-8 sm:mb-10">
              Start a free 7-day trial, or book a demo and we&apos;ll walk you through the platform with your specific setting in mind.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/start?plan=trial"
                className="inline-flex justify-center rounded-full bg-forest px-8 py-4 text-sm font-semibold text-ivory hover:bg-moss transition-colors"
              >
                Start free trial
              </Link>
              <Link
                href="/contact"
                className="inline-flex justify-center rounded-full border border-forest/30 px-8 py-4 text-sm font-semibold text-forest hover:border-moss transition-colors"
              >
                Book a demo
              </Link>
            </div>
            <p className="text-xs text-charcoal/30 mt-4">7-day free trial · No card required · Cancel anytime</p>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
