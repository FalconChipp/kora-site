import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "Learn how KORA turns the information your team already records into meaningful insight — automatically identifying patterns in mood, behaviour, sleep, and incidents.",
  alternates: { canonical: "https://koraplatform.co.uk/product" },
  openGraph: {
    url: "https://koraplatform.co.uk/product",
    description:
      "KORA turns daily care records into real-time insight. Daily logs, incident recording, automated pattern detection, and one-click statutory reporting.",
  },
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "KORA",
  applicationCategory: "BusinessApplication",
  applicationSubCategory: "Care Management Software",
  operatingSystem: "Windows, macOS",
  offers: {
    "@type": "Offer",
    price: "125",
    priceCurrency: "GBP",
    description: "Per home per month. First home £125, additional homes £25/month each.",
  },
  description:
    "Outcomes and insights platform for residential children's care. Staff record daily logs, incidents, and observations; KORA automatically surfaces patterns and generates statutory reports.",
  featureList: [
    "Young person living profiles",
    "Daily shift logs",
    "Incident recording with body maps",
    "Medication tracking",
    "Automated pattern detection",
    "LAC review report generation",
    "Ofsted-ready exports",
    "Role-based access controls",
    "Per-home data isolation",
    "UK data residency",
  ],
  provider: {
    "@type": "Organization",
    name: "SixByFive",
    url: "https://sixbyfive.com",
  },
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How KORA works",
  description:
    "How KORA turns daily care records into patterns, insight, and statutory reports.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Staff record daily",
      text: "Care workers log shift notes, incidents, moods, sleep, medication, and activities in KORA. The same information they record today — but structured, timestamped, and attributed.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "KORA finds patterns",
      text: "The platform automatically correlates records across time — identifying connections between sleep and behaviour, family contact and mood, school attendance and incidents — without anyone building a spreadsheet.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Teams act on evidence",
      text: "Managers and keyworkers see clear dashboards. LAC reviews, statutory summaries, and Ofsted-ready reports are generated in one click — with outcome evidence ready for inspections and funding bodies.",
    },
  ],
};

const PRODUCT_FAQS = [
  {
    q: "Does KORA work without an internet connection?",
    a: "Yes. The KORA desktop app works offline and syncs automatically when reconnected. Daily recording never depends on a stable internet connection — important for homes where connectivity can be unreliable.",
  },
  {
    q: "How long does it take staff to complete a daily log?",
    a: "Under two minutes. Daily logs have structured fields for mood, behaviour, sleep, appetite, and activity — guided so nothing gets missed, fast enough that staff will actually use them.",
  },
  {
    q: "Can KORA generate reports for Ofsted inspections?",
    a: "Yes. KORA produces inspection-ready exports with outcome evidence, incident trends, goal progress, and keyworker notes. Reports that previously took hours are generated in one click.",
  },
  {
    q: "Does KORA detect patterns automatically, or does someone have to build them?",
    a: "Automatically. KORA identifies correlations between sleep, mood, behaviour, incidents, and family contact without anyone building a spreadsheet. Managers receive alerts when thresholds are crossed.",
  },
  {
    q: "How is data kept separate between homes in the same organisation?",
    a: "Each home has its own isolated database. Staff assigned to one home cannot view records from another — even within the same organisation. This is enforced at the database level, not just through access controls.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: PRODUCT_FAQS.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

const PROBLEMS = [
  {
    title: "Recording that goes nowhere",
    body: "Staff complete shift logs, incident forms, and daily notes — but the information sits in a folder. Nobody has time to analyse it, so patterns get missed until it's too late.",
  },
  {
    title: "Reports take hours",
    body: "LAC reviews, Ofsted visits, and funding applications all need evidence of progress. Pulling that evidence together manually takes hours every time.",
  },
  {
    title: "Compliance is constant pressure",
    body: "GDPR, data isolation between homes, audit trails, access controls — meeting these requirements while still running a home is a significant administrative burden.",
  },
];

const STEPS = [
  {
    step: "01",
    title: "Staff record daily",
    body: "Care workers log shift notes, incidents, moods, sleep, medication, and activities in KORA. The same information they record today — but structured, timestamped, and attributed.",
  },
  {
    step: "02",
    title: "KORA finds patterns",
    body: "The platform automatically correlates records across time. Does behaviour worsen after poor sleep? Does mood improve after family contact? KORA surfaces these connections without anyone building a spreadsheet.",
  },
  {
    step: "03",
    title: "Teams act on evidence",
    body: "Managers and keyworkers see clear dashboards. Reviews and reports are generated in one click — with outcome evidence ready for inspections, reviews, and funding bodies.",
  },
];

const MODULES = [
  {
    label: "Young people",
    title: "A complete picture of every young person",
    body: "Each young person has a living profile: goals, achievements, family contact, education, health, and wellbeing — updated continuously as staff record. The timeline view puts every record in order, so nothing gets missed between shifts.",
    dark: false,
    items: ["Living profiles", "Goal tracking & evidence", "Timeline view", "Family contact log"],
  },
  {
    label: "Daily recording",
    title: "Fast enough that staff will actually use it",
    body: "Shift-based logs with structured fields for mood, behaviour, sleep, appetite, and activity — completed in under two minutes. Incidents have severity grading, body maps, and follow-up tracking. Medication logs flag missed doses automatically.",
    dark: true,
    items: ["Daily logs", "Incident recording", "Medication tracking", "School attendance"],
  },
  {
    label: "Insight",
    title: "Patterns your team didn't have time to find",
    body: "KORA identifies correlations between sleep, mood, behaviour, incidents, and contact — automatically. Custom alert thresholds mean managers are notified before problems escalate. Dashboards show trends over days, weeks, and months.",
    dark: false,
    items: ["Automated pattern detection", "Behaviour dashboards", "Alert thresholds", "Comparative analysis"],
  },
  {
    label: "Reporting",
    title: "Statutory documents in seconds, not hours",
    body: "Generate LAC review reports, outcome summaries, and statutory documents in one click. Structured output ready for social workers, IROs, and Ofsted — with full audit trail included as standard.",
    dark: true,
    items: ["LAC review reports", "Ofsted-ready exports", "Funding body reports", "Full audit trail"],
  },
];

const ROLES = [
  {
    role: "Care workers",
    tagline: "Less admin. More care.",
    points: [
      "Complete shift logs in under two minutes",
      "Guided incident forms — nothing gets forgotten",
      "Medication prompts and refusal logging",
      "Offline-capable desktop app",
    ],
  },
  {
    role: "Home managers",
    tagline: "Oversight without the overhead.",
    points: [
      "Dashboard showing patterns and alerts across all young people",
      "Instant access to any record, any time",
      "One-click reports for reviews and inspections",
      "Staff rota and handover management",
    ],
  },
  {
    role: "Org leaders",
    tagline: "Multi-home clarity.",
    points: [
      "Organisation-wide dashboard with per-home breakdowns",
      "Complete data isolation between homes",
      "Manage team access and permissions centrally",
      "Billing and subscription management in one place",
    ],
  },
];

function CheckIcon({ dark }: { dark: boolean }) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className={`w-4 h-4 flex-shrink-0 mt-0.5 ${dark ? "text-sage" : "text-moss"}`}>
      <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
    </svg>
  );
}

export default function ProductPage() {
  return (
    <div className="flex flex-col min-h-full bg-ivory font-[family-name:var(--font-inter)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Nav />
      <main className="flex flex-col flex-1">

        {/* Hero */}
        <section className="bg-forest py-16 sm:py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-widest text-sage mb-4 sm:mb-6">The Product</p>
              <h1 className="font-[family-name:var(--font-sora)] font-semibold text-3xl sm:text-5xl lg:text-6xl text-ivory leading-tight mb-4 sm:mb-6">
                Recording is just the beginning.
              </h1>
              <p className="text-base sm:text-lg text-sage/80 leading-relaxed max-w-xl mb-8 sm:mb-10">
                KORA turns the information your team already records into meaningful insight about the young people in your care — automatically, in real time.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/start?plan=trial"
                  className="inline-flex rounded-full bg-ivory px-7 py-3.5 text-sm font-semibold text-forest hover:bg-sage transition-colors"
                >
                  Start free trial
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex rounded-full border border-sage/40 px-7 py-3.5 text-sm font-semibold text-ivory hover:border-sage/80 transition-colors"
                >
                  Request a demo
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* The problem */}
        <section className="py-16 sm:py-24 bg-ivory">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mb-10 sm:mb-16">
              <p className="text-xs font-semibold uppercase tracking-widest text-moss mb-3 sm:mb-4">The problem</p>
              <h2 className="font-[family-name:var(--font-sora)] font-semibold text-2xl sm:text-3xl lg:text-4xl text-forest leading-snug">
                Care teams record more than ever. Most of it goes nowhere.
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-10">
              {PROBLEMS.map(({ title, body }) => (
                <div key={title} className="flex flex-col gap-3 border-t-2 border-moss/30 pt-6">
                  <h3 className="font-[family-name:var(--font-sora)] font-semibold text-base sm:text-lg text-forest">{title}</h3>
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
          </div>
        </section>

        {/* Modules */}
        {MODULES.map(({ label, title, body, dark, items }) => (
          <section key={label} className={`py-16 sm:py-24 ${dark ? "bg-forest" : "bg-ivory"}`}>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
                <div>
                  <p className={`text-xs font-semibold uppercase tracking-widest mb-3 ${dark ? "text-sage" : "text-moss"}`}>
                    {label}
                  </p>
                  <h2 className={`font-[family-name:var(--font-sora)] font-semibold text-2xl sm:text-3xl leading-snug mb-4 ${dark ? "text-ivory" : "text-forest"}`}>
                    {title}
                  </h2>
                  <p className={`text-sm leading-relaxed ${dark ? "text-sage/70" : "text-charcoal/60"}`}>
                    {body}
                  </p>
                </div>
                <ul className="flex flex-col gap-4">
                  {items.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckIcon dark={dark} />
                      <span className={`text-sm font-medium ${dark ? "text-ivory/85" : "text-forest"}`}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        ))}

        {/* Roles */}
        <section className="py-16 sm:py-24 bg-ivory">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mb-10 sm:mb-16">
              <p className="text-xs font-semibold uppercase tracking-widest text-moss mb-3 sm:mb-4">Who it&apos;s for</p>
              <h2 className="font-[family-name:var(--font-sora)] font-semibold text-2xl sm:text-3xl lg:text-4xl text-forest leading-snug">
                Built for every role in your team.
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
              {ROLES.map(({ role, tagline, points }) => (
                <div key={role} className="rounded-2xl border border-sage/30 bg-white p-6 sm:p-8 flex flex-col gap-5">
                  <div>
                    <h3 className="font-[family-name:var(--font-sora)] font-semibold text-base text-forest mb-1">{role}</h3>
                    <p className="text-xs text-moss font-semibold uppercase tracking-wide">{tagline}</p>
                  </div>
                  <ul className="flex flex-col gap-3">
                    {points.map((p) => (
                      <li key={p} className="flex items-start gap-2.5 text-sm text-charcoal/70 leading-snug">
                        <CheckIcon dark={false} />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Security */}
        <section className="py-16 sm:py-24 bg-forest">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-sage mb-3 sm:mb-4">Security & compliance</p>
              <h2 className="font-[family-name:var(--font-sora)] font-semibold text-2xl sm:text-3xl lg:text-4xl text-ivory leading-snug mb-4 sm:mb-6">
                GDPR-ready from day one.
              </h2>
              <p className="text-sm sm:text-base text-sage/70 leading-relaxed">
                KORA is built for regulated services. Each home&apos;s data lives in its own isolated database — staff at one home cannot see another home&apos;s records, even within the same organisation. All data is stored in the UK.
              </p>
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                "UK data residency",
                "Per-home database isolation",
                "Role-based access controls",
                "Full audit trail on every record",
                "Subject access request tooling",
                "Data retention policy support",
                "Right-to-erasure support",
                "Automatic cloud backups",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-ivory/80">
                  <CheckIcon dark={true} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 sm:py-24 bg-ivory">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 sm:mb-14">
              <p className="text-xs font-semibold uppercase tracking-widest text-moss mb-3 sm:mb-4">Common questions</p>
              <h2 className="font-[family-name:var(--font-sora)] font-semibold text-2xl sm:text-3xl text-forest leading-snug">
                Questions about how KORA works
              </h2>
            </div>
            <div className="flex flex-col divide-y divide-sage/20">
              {PRODUCT_FAQS.map(({ q, a }) => (
                <div key={q} className="py-6 sm:py-8">
                  <h3 className="font-[family-name:var(--font-sora)] font-semibold text-base sm:text-lg text-forest mb-3">{q}</h3>
                  <p className="text-sm sm:text-base text-charcoal/60 leading-relaxed">{a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
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
                className="inline-flex rounded-full bg-forest px-8 py-4 text-sm font-semibold text-ivory hover:bg-moss transition-colors"
              >
                Start free trial
              </Link>
              <Link
                href="/contact"
                className="inline-flex rounded-full border border-forest/30 px-8 py-4 text-sm font-semibold text-forest hover:border-moss transition-colors"
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
