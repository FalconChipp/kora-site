import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Link from "next/link";

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Staff record daily",
    body: "Care workers log daily notes, incidents, moods, sleep, and activities in KORA — the same information they record now, but in one place.",
  },
  {
    step: "02",
    title: "KORA finds patterns",
    body: "The platform automatically correlates records across time: does behaviour worsen after poor sleep? Does mood improve after family contact? KORA surfaces these connections.",
  },
  {
    step: "03",
    title: "Teams act on evidence",
    body: "Managers and keyworkers see clear insight dashboards. Reviews and reports are generated in one click, evidencing outcomes for inspections and funding bodies.",
  },
];

const DIFFERENTIATORS = [
  {
    title: "Not just a recording tool",
    body: "Most platforms stop at data entry. KORA turns what's recorded into structured insight — automatically, without anyone needing to build a spreadsheet.",
  },
  {
    title: "Built for the sector",
    body: "KORA is designed around how residential care actually works: keyworkers, shift handovers, young person plans, and statutory reporting — not adapted from a generic CRM.",
  },
  {
    title: "Privacy by design",
    body: "Every home's data lives in its own isolated database. Nobody inside KORA can accidentally see another home's records.",
  },
  {
    title: "Windows-native app",
    body: "Staff work offline-capable from a desktop application — no browser required. Data syncs securely to the cloud when connected.",
  },
];

export default function ProductPage() {
  return (
    <div className="flex flex-col min-h-full bg-ivory font-[family-name:var(--font-inter)]">
      <Nav />
      <main className="flex flex-col flex-1">

        {/* Hero */}
        <section className="bg-forest py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-widest text-sage mb-6">The Product</p>
              <h1 className="font-[family-name:var(--font-sora)] font-semibold text-4xl sm:text-5xl lg:text-6xl text-ivory leading-tight mb-6">
                Recording is just the beginning.
              </h1>
              <p className="text-lg text-sage/80 leading-relaxed max-w-xl mb-10">
                KORA is the platform that turns the information your team already records into meaningful insight about the young people in your care.
              </p>
              <Link
                href="/contact"
                className="inline-flex rounded-full bg-ivory px-7 py-3.5 text-sm font-semibold text-forest hover:bg-sage transition-colors"
              >
                Request a demo
              </Link>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="py-24 bg-ivory">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-2xl mb-16">
              <p className="text-xs font-semibold uppercase tracking-widest text-moss mb-4">How it works</p>
              <h2 className="font-[family-name:var(--font-sora)] font-semibold text-3xl lg:text-4xl text-forest leading-snug">
                Simple for staff. Powerful for managers.
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {HOW_IT_WORKS.map(({ step, title, body }) => (
                <div key={step} className="flex flex-col gap-4">
                  <span className="font-[family-name:var(--font-sora)] font-semibold text-5xl text-sage leading-none">
                    {step}
                  </span>
                  <h3 className="font-[family-name:var(--font-sora)] font-semibold text-xl text-forest">{title}</h3>
                  <p className="text-sm text-charcoal/60 leading-relaxed">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Differentiators */}
        <section className="py-24 bg-forest">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-2xl mb-16">
              <p className="text-xs font-semibold uppercase tracking-widest text-sage mb-4">Why KORA</p>
              <h2 className="font-[family-name:var(--font-sora)] font-semibold text-3xl lg:text-4xl text-ivory leading-snug">
                Different by design.
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {DIFFERENTIATORS.map(({ title, body }) => (
                <div key={title} className="p-8 rounded-2xl bg-white/5 border border-white/10">
                  <h3 className="font-[family-name:var(--font-sora)] font-semibold text-lg text-ivory mb-3">{title}</h3>
                  <p className="text-sm text-sage/70 leading-relaxed">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 bg-ivory text-center">
          <div className="mx-auto max-w-2xl px-6">
            <h2 className="font-[family-name:var(--font-sora)] font-semibold text-3xl text-forest mb-6">
              See KORA in action.
            </h2>
            <p className="text-base text-charcoal/60 mb-10">
              Book a demo and we&apos;ll walk you through the platform with your specific setting in mind.
            </p>
            <Link
              href="/contact"
              className="inline-flex rounded-full bg-forest px-8 py-4 text-sm font-semibold text-ivory hover:bg-moss transition-colors"
            >
              Book a demo
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
