import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Link from "next/link";

const FEATURE_GROUPS = [
  {
    category: "Young people",
    tagline: "A complete picture of every young person, always up to date.",
    dark: false,
    items: [
      { title: "Living profiles", body: "A single, continuously updated profile per young person covering goals, achievements, education, health, family contact, and wellbeing." },
      { title: "Goal tracking", body: "Set short and long-term goals, log progress against them, and automatically surface evidence of achievement over time." },
      { title: "Timeline view", body: "See every record for a young person in chronological order — incidents, moods, notes, school reports, and contact logs in one scrollable view." },
      { title: "Family contact log", body: "Record contact frequency, type, and quality. Track how contact patterns correlate with mood and behaviour automatically." },
    ],
  },
  {
    category: "Daily recording",
    tagline: "Fast enough that your staff will actually use it. Structured enough that nothing gets missed.",
    dark: true,
    items: [
      { title: "Daily logs", body: "Shift-based notes with structured fields for mood, behaviour, sleep, appetite, and activity — completed in under two minutes." },
      { title: "Incident recording", body: "Structured incident forms with severity grading, body maps, immediate actions, and follow-up tracking. Timestamped and auditable." },
      { title: "Medication tracking", body: "Log administered medications, PRN usage, and refusals. Flag missed doses and generate weekly summaries." },
      { title: "School attendance", body: "Record attendance, engagement, and school communication. Correlate school patterns with home behaviour data automatically." },
    ],
  },
  {
    category: "Insight & analysis",
    tagline: "KORA turns your daily records into patterns and trends — without anyone having to build a report.",
    dark: false,
    items: [
      { title: "Automated pattern detection", body: "KORA identifies correlations between sleep, mood, behaviour, incidents, and contact — surfacing patterns no-one would have time to find manually." },
      { title: "Behaviour dashboards", body: "Visual dashboards showing trends over days, weeks, and months. Drill into any data point to see the underlying records." },
      { title: "Comparative analysis", body: "Compare a young person's data across time periods — before and after a placement change, or before and after a therapeutic intervention." },
      { title: "Alert thresholds", body: "Set custom thresholds — e.g. three incidents in seven days — and receive automatic alerts so nothing slips through during busy periods." },
    ],
  },
  {
    category: "Reporting",
    tagline: "Statutory documents and outcome evidence in seconds, not hours.",
    dark: true,
    items: [
      { title: "One-click reports", body: "Generate LAC review reports, statutory summaries, and progress updates in seconds. Structured output ready to share with social workers and IROs." },
      { title: "Inspection-ready exports", body: "Export outcome evidence in formats suitable for Ofsted and CQC inspections — goal progress, incident trends, and keyworker notes in one document." },
      { title: "Funding body reports", body: "Produce placement authority reports with outcome evidence, placement stability data, and cost-effectiveness summaries." },
      { title: "Audit trail", body: "Every record is timestamped, attributed to its author, and immutable. Full audit log available for any young person at any time." },
    ],
  },
  {
    category: "Access & compliance",
    tagline: "GDPR-ready from day one, with the controls that regulated services require.",
    dark: false,
    items: [
      { title: "Role-based access", body: "Platform admin, org admin, home manager, keyworker, and read-only roles. Each level sees only what they need." },
      { title: "Multi-home isolation", body: "Each home's data lives in its own isolated database. Staff at one home cannot access another home's records, even within the same organisation." },
      { title: "GDPR compliance", body: "Data residency in the UK, subject access request tooling, data retention policies, and right-to-erasure support built in." },
      { title: "Offline-capable", body: "The desktop app works offline and syncs when reconnected — no dependency on a stable internet connection for daily recording." },
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

export default function FeaturesPage() {
  return (
    <div className="flex flex-col min-h-full bg-ivory font-[family-name:var(--font-inter)]">
      <Nav />
      <main className="flex flex-col flex-1">

        {/* Hero */}
        <section className="bg-forest py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-widest text-sage mb-4 sm:mb-6">Features</p>
              <h1 className="font-[family-name:var(--font-sora)] font-semibold text-3xl sm:text-5xl text-ivory leading-tight mb-4 sm:mb-6">
                Everything your team needs, nothing they don&apos;t.
              </h1>
              <p className="text-base sm:text-lg text-sage/80 leading-relaxed max-w-xl">
                KORA is built around the real workflows of residential care — from quick shift logs to full statutory reports.
              </p>
            </div>
          </div>
        </section>

        {/* Feature groups */}
        {FEATURE_GROUPS.map(({ category, tagline, dark, items }) => (
          <section
            key={category}
            className={`py-16 sm:py-24 ${dark ? "bg-forest" : "bg-ivory"}`}
          >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16">

                {/* Left: category label + tagline */}
                <div className="lg:col-span-1">
                  <p className={`text-xs font-semibold uppercase tracking-widest mb-3 ${dark ? "text-sage" : "text-moss"}`}>
                    {category}
                  </p>
                  <h2 className={`font-[family-name:var(--font-sora)] font-semibold text-xl sm:text-2xl leading-snug ${dark ? "text-ivory" : "text-forest"}`}>
                    {tagline}
                  </h2>
                </div>

                {/* Right: feature items */}
                <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-8">
                  {items.map(({ title, body }) => (
                    <div key={title} className="flex flex-col gap-2">
                      <div className="flex items-start gap-2.5">
                        <CheckIcon dark={dark} />
                        <h3 className={`font-[family-name:var(--font-sora)] font-semibold text-sm ${dark ? "text-ivory" : "text-forest"}`}>
                          {title}
                        </h3>
                      </div>
                      <p className={`text-sm leading-relaxed pl-6 ${dark ? "text-sage/70" : "text-charcoal/60"}`}>
                        {body}
                      </p>
                    </div>
                  ))}
                </div>

              </div>
            </div>
          </section>
        ))}

        {/* CTA */}
        <section className="py-16 sm:py-20 bg-moss text-center">
          <div className="mx-auto max-w-2xl px-4 sm:px-6">
            <h2 className="font-[family-name:var(--font-sora)] font-semibold text-2xl sm:text-3xl text-ivory mb-4">
              Want to see these features in your setting?
            </h2>
            <p className="text-sage text-sm mb-8">
              Try KORA free for 7 days — no card required, no commitment.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/contact"
                className="inline-flex rounded-full bg-ivory px-8 py-4 text-sm font-semibold text-forest hover:bg-sage transition-colors"
              >
                Start free trial
              </Link>
              <Link
                href="/contact"
                className="inline-flex rounded-full border border-ivory/40 px-8 py-4 text-sm font-semibold text-ivory hover:border-ivory/80 transition-colors"
              >
                Request a demo
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
