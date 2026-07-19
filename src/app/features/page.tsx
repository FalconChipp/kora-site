import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Link from "next/link";

const FEATURE_GROUPS = [
  {
    category: "Young people",
    items: [
      { title: "Living profiles", body: "A single, continuously updated profile per young person covering goals, achievements, education, health, family contact, and wellbeing." },
      { title: "Goal tracking", body: "Set short and long-term goals, log progress against them, and automatically surface evidence of achievement over time." },
      { title: "Timeline view", body: "See every record for a young person in chronological order — incidents, moods, notes, school reports, and contact logs in one scrollable timeline." },
      { title: "Family contact log", body: "Record contact frequency, type, and quality. Track how contact patterns correlate with mood and behaviour automatically." },
    ],
  },
  {
    category: "Daily recording",
    items: [
      { title: "Daily logs", body: "Quick shift-based notes with structured fields for mood, behaviour, sleep, appetite, and activity — fast enough that staff will actually use them." },
      { title: "Incident recording", body: "Structured incident forms with severity grading, body maps, immediate actions, and follow-up tracking. Timestamped and auditable." },
      { title: "Medication tracking", body: "Log administered medications, PRN usage, and refusals. Flag missed doses and generate weekly summaries." },
      { title: "School attendance", body: "Record attendance, engagement, and school communication. Correlate school patterns with home behaviour data." },
    ],
  },
  {
    category: "Insight & analysis",
    items: [
      { title: "Automated pattern detection", body: "KORA identifies correlations between sleep, mood, behaviour, incidents, and contact — surfacing patterns without anyone having to build a report." },
      { title: "Behaviour dashboards", body: "Visual dashboards showing trends over days, weeks, and months. Drill into any data point to see the underlying records." },
      { title: "Comparative analysis", body: "Compare a young person's data across time periods: before and after a placement change, before and after a therapeutic intervention." },
      { title: "Alert thresholds", body: "Set custom thresholds — e.g. three incidents in seven days — and receive automatic alerts so nothing slips through during busy periods." },
    ],
  },
  {
    category: "Reporting",
    items: [
      { title: "One-click reports", body: "Generate LAC review reports, statutory summaries, and progress updates in seconds. Structured output ready to share with social workers and IROs." },
      { title: "Inspection-ready exports", body: "Export outcome evidence in formats suitable for Ofsted and CQC inspections — goal progress, incident trends, and keyworker notes in one document." },
      { title: "Funding body reports", body: "Produce placement authority reports with outcome evidence, placement stability data, and cost-effectiveness summaries." },
      { title: "Audit trail", body: "Every record is timestamped, attributed to its author, and immutable. Full audit log available for any young person at any time." },
    ],
  },
  {
    category: "Access & compliance",
    items: [
      { title: "Role-based access", body: "Platform admin, org admin, home manager, keyworker, and read-only roles. Each level sees only what they need." },
      { title: "Multi-home isolation", body: "Each home's data lives in its own isolated database. Staff at one home cannot access another home's records, even within the same organisation." },
      { title: "GDPR compliance", body: "Data residency in the UK, subject access request tooling, data retention policies, and right-to-erasure support built in." },
      { title: "Offline-capable", body: "The Windows desktop app works offline and syncs when reconnected — no dependency on a stable internet connection for daily recording." },
    ],
  },
];

export default function FeaturesPage() {
  return (
    <div className="flex flex-col min-h-full bg-ivory font-[family-name:var(--font-inter)]">
      <Nav />
      <main className="flex flex-col flex-1">

        {/* Hero */}
        <section className="bg-forest py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-sage mb-6">Features</p>
            <h1 className="font-[family-name:var(--font-sora)] font-semibold text-4xl sm:text-5xl text-ivory leading-tight mb-6">
              Everything your team needs, nothing they don&apos;t.
            </h1>
            <p className="text-lg text-sage/80 leading-relaxed max-w-xl">
              KORA is built around the real workflows of residential care — from quick shift logs to full statutory reports.
            </p>
          </div>
        </section>

        {/* Feature groups */}
        <section className="py-24 bg-ivory">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 flex flex-col gap-20">
            {FEATURE_GROUPS.map(({ category, items }) => (
              <div key={category}>
                <h2 className="font-[family-name:var(--font-sora)] font-semibold text-2xl text-forest mb-8 pb-4 border-b border-sage/40">
                  {category}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {items.map(({ title, body }) => (
                    <div key={title} className="flex flex-col gap-3 p-6 rounded-2xl bg-white border border-sage/30">
                      <h3 className="font-[family-name:var(--font-sora)] font-semibold text-base text-forest">{title}</h3>
                      <p className="text-sm text-charcoal/60 leading-relaxed">{body}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 bg-forest text-center">
          <div className="mx-auto max-w-2xl px-6">
            <h2 className="font-[family-name:var(--font-sora)] font-semibold text-3xl text-ivory mb-6">
              Want to see these features in your setting?
            </h2>
            <Link
              href="/contact"
              className="inline-flex rounded-full bg-ivory px-8 py-4 text-sm font-semibold text-forest hover:bg-sage transition-colors"
            >
              Request a demo
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
