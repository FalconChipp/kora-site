import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const STATS = [
  { value: "93%", label: "Positive outcomes evidenced" },
  { value: "4×", label: "Faster incident pattern detection" },
  { value: "60%", label: "Reduction in manual reporting time" },
];

const FEATURES = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
      </svg>
    ),
    title: "Outcome Intelligence",
    body: "KORA automatically surfaces patterns in behaviour, mood, incidents, and school attendance — turning daily records into meaningful insight without the manual work.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
      </svg>
    ),
    title: "Young Person Profiles",
    body: "Every young person has a complete, living profile — goals, achievements, family contact, education, and wellbeing — built to evidence progress as well as concerns.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
      </svg>
    ),
    title: "Built for Compliance",
    body: "Multi-tenancy keeps each home's data entirely separate. GDPR-ready from day one, with audit logging, role-based access, and data residency controls.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
      </svg>
    ),
    title: "Automated Insights",
    body: "Does poor sleep affect behaviour? Does family contact lift mood? KORA answers these questions automatically so your team can act on evidence, not hunches.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
      </svg>
    ),
    title: "One-click Reports",
    body: "Generate structured progress reports, outcome summaries, and statutory documents in seconds — ready for reviews, inspections, and funding applications.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
      </svg>
    ),
    title: "Multi-home Organisations",
    body: "Manage a single home or a network of services from one platform. Organisation-level oversight with complete data isolation between homes.",
  },
];

const SETTINGS = [
  "Residential homes",
  "Fostering services",
  "SEMH / alternative provision schools",
  "Supported accommodation",
  "Semi-independent living",
  "Youth support settings",
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-full bg-ivory font-[family-name:var(--font-inter)]">

      <Nav />

      <main className="flex flex-col flex-1">

        {/* Hero */}
        <section className="relative bg-forest overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-moss blur-3xl" />
            <div className="absolute bottom-0 left-1/4 w-64 h-64 rounded-full bg-sage blur-3xl" />
          </div>
          <div className="relative mx-auto max-w-7xl px-6 lg:px-8 py-24 lg:py-36">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-widest text-sage mb-6">
                Care. Insight. Better Outcomes.
              </p>
              <h1
                className="font-[family-name:var(--font-sora)] font-semibold text-4xl sm:text-5xl lg:text-6xl leading-tight text-ivory mb-6"
              >
                The outcomes platform built for young person care.
              </h1>
              <p className="text-lg text-sage/80 leading-relaxed max-w-xl mb-10">
                KORA helps residential care teams understand patterns, track progress, and evidence outcomes — automatically. Not just recording information, but turning it into insight.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="#"
                  className="inline-flex items-center gap-2 rounded-full bg-ivory px-7 py-3.5 text-sm font-semibold text-forest hover:bg-sage transition-colors"
                >
                  Request a demo
                </a>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 rounded-full border border-sage/40 px-7 py-3.5 text-sm font-semibold text-ivory hover:border-sage hover:bg-white/5 transition-colors"
                >
                  See how it works →
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="bg-moss">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            {STATS.map(({ value, label }) => (
              <div key={label}>
                <p className="font-[family-name:var(--font-sora)] font-semibold text-4xl text-ivory mb-1">
                  {value}
                </p>
                <p className="text-sm text-sage">{label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Features */}
        <section className="py-24 bg-ivory">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-2xl mb-16">
              <p className="text-xs font-semibold uppercase tracking-widest text-moss mb-4">Platform</p>
              <h2 className="font-[family-name:var(--font-sora)] font-semibold text-3xl lg:text-4xl text-forest leading-snug mb-4">
                Powerful insights, made simple.
              </h2>
              <p className="text-base text-charcoal/60 leading-relaxed">
                Most systems are good at recording information. KORA is built to turn that information into understanding — automatically, in real time.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {FEATURES.map(({ icon, title, body }) => (
                <div key={title} className="flex flex-col gap-4 p-6 rounded-2xl bg-white border border-sage/30 hover:border-sage transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-forest/8 flex items-center justify-center text-forest">
                    {icon}
                  </div>
                  <h3 className="font-[family-name:var(--font-sora)] font-semibold text-lg text-forest">
                    {title}
                  </h3>
                  <p className="text-sm text-charcoal/60 leading-relaxed">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Settings section */}
        <section className="py-24 bg-forest">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-sage mb-4">Who it&apos;s for</p>
              <h2 className="font-[family-name:var(--font-sora)] font-semibold text-3xl lg:text-4xl text-ivory leading-snug mb-6">
                Built for every setting that supports young people.
              </h2>
              <p className="text-base text-sage/70 leading-relaxed">
                Whether you run a single home or a network of services, KORA adapts to your setting — with complete data isolation between homes and organisation-level oversight.
              </p>
            </div>
            <ul className="flex flex-col gap-3">
              {SETTINGS.map((setting) => (
                <li key={setting} className="flex items-center gap-3 text-sm text-ivory/80">
                  <span className="w-5 h-5 rounded-full bg-moss/40 flex items-center justify-center flex-shrink-0">
                    <svg viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3 text-sage">
                      <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
                    </svg>
                  </span>
                  {setting}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 bg-ivory text-center">
          <div className="mx-auto max-w-2xl px-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-moss mb-4">Get started</p>
            <h2 className="font-[family-name:var(--font-sora)] font-semibold text-3xl lg:text-4xl text-forest leading-snug mb-6">
              Better decisions, every time.
            </h2>
            <p className="text-base text-charcoal/60 leading-relaxed mb-10">
              Join care providers already using KORA to evidence outcomes, reduce reporting burden, and focus more time on the young people they support.
            </p>
            <a
              href="#"
              className="inline-flex items-center gap-2 rounded-full bg-forest px-8 py-4 text-sm font-semibold text-ivory hover:bg-moss transition-colors"
            >
              Request a demo
            </a>
          </div>
        </section>

      </main>

      <Footer />

    </div>
  );
}
