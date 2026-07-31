import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "KORA is built by SixByFive — a small team working in close partnership with residential care practitioners to give children's homes better tools for better outcomes.",
  alternates: { canonical: "https://koraplatform.co.uk/about" },
  openGraph: { url: "https://koraplatform.co.uk/about" },
};

const VALUES = [
  {
    title: "Young people first",
    body: "Every feature decision starts with the same question: does this help a young person get better outcomes? If it only helps administrators, it doesn't make the cut.",
  },
  {
    title: "Earned trust",
    body: "The people who work in residential care trusted us with some of the most sensitive information that exists. We take that seriously in every architecture and policy decision we make.",
  },
  {
    title: "Honest design",
    body: "We don't inflate what KORA can do. We don't promise AI magic. We build things that work reliably, describe them accurately, and deliver what we say they will.",
  },
  {
    title: "Built with the sector",
    body: "KORA is built in close partnership with residential care practitioners — not designed in isolation and handed over. Real workflows from real homes shape every release.",
  },
];

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-full bg-ivory font-[family-name:var(--font-inter)]">
      <Nav />
      <main className="flex flex-col flex-1">

        {/* Hero */}
        <section className="bg-forest py-16 sm:py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-widest text-sage mb-4 sm:mb-6">About</p>
              <h1 className="font-[family-name:var(--font-sora)] font-semibold text-3xl sm:text-5xl text-ivory leading-tight mb-4 sm:mb-6">
                We built KORA because the sector deserved better tools.
              </h1>
              <p className="text-base sm:text-lg text-sage/80 leading-relaxed">
                Residential care teams were recording everything — and getting almost nothing back from it. KORA exists to change that.
              </p>
            </div>
          </div>
        </section>

        {/* Story */}
        <section className="py-16 sm:py-24 bg-ivory">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-moss mb-3 sm:mb-4">Our story</p>
              <h2 className="font-[family-name:var(--font-sora)] font-semibold text-2xl sm:text-3xl text-forest mb-5 sm:mb-6 leading-snug">
                Started by people who care about care.
              </h2>
              <div className="flex flex-col gap-4 text-sm text-charcoal/60 leading-relaxed">
                <p>
                  KORA was created by{" "}
                  <a
                    href="https://sixbyfive.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-moss underline underline-offset-2 hover:text-forest transition-colors"
                  >
                    SixByFive
                  </a>
                  , a software studio with a focus on purpose-driven products. After working with residential care providers, the pattern was unmistakable: teams were spending hours on recording and reporting, and getting almost no analytical value from it.
                </p>
                <p>
                  The data to understand each young person&apos;s patterns, triggers, and progress was all there — locked in daily log entries, incident forms, and handover notes. The problem was that nobody had time to connect it.
                </p>
                <p>
                  KORA was built to connect it automatically. Not to replace the judgement of the people who know these young people — but to give them information that makes their judgement sharper.
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-5 sm:gap-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-moss mb-1 sm:mb-2">Our mission</p>
              <blockquote className="border-l-4 border-moss pl-5 sm:pl-6">
                <p className="font-[family-name:var(--font-sora)] font-semibold text-xl sm:text-2xl text-forest leading-snug">
                  &ldquo;Better information in the hands of people who care means better outcomes for young people.&rdquo;
                </p>
              </blockquote>
              <p className="text-sm text-charcoal/60 leading-relaxed">
                We measure success not in licences sold, but in whether the teams using KORA are spending more time with the young people they support and less time on administrative burden.
              </p>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 sm:py-24 bg-forest">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mb-10 sm:mb-16">
              <p className="text-xs font-semibold uppercase tracking-widest text-sage mb-3 sm:mb-4">What we believe</p>
              <h2 className="font-[family-name:var(--font-sora)] font-semibold text-2xl sm:text-3xl text-ivory leading-snug">
                Principles that shape everything we build.
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
              {VALUES.map(({ title, body }) => (
                <div key={title} className="p-6 sm:p-8 rounded-2xl bg-white/5 border border-white/10">
                  <h3 className="font-[family-name:var(--font-sora)] font-semibold text-base sm:text-lg text-ivory mb-3">{title}</h3>
                  <p className="text-sm text-sage/70 leading-relaxed">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SixByFive */}
        <section className="py-16 sm:py-24 bg-ivory">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-moss mb-3 sm:mb-4">Made by</p>
            <h2 className="font-[family-name:var(--font-sora)] font-semibold text-2xl sm:text-3xl text-forest mb-4 sm:mb-6">
              A SixByFive product
            </h2>
            <p className="text-sm sm:text-base text-charcoal/60 leading-relaxed mb-6 sm:mb-8">
              SixByFive is a software studio that builds purposeful digital products. KORA is our flagship platform in the social care sector. If you&apos;d like to know more about the studio behind KORA, visit us at sixbyfive.com.
            </p>
            <a
              href="https://sixbyfive.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex rounded-full border border-forest px-7 py-3 text-sm font-semibold text-forest hover:bg-forest hover:text-ivory transition-colors"
            >
              Visit SixByFive →
            </a>
          </div>
        </section>

        {/* CTA */}
        <section className="py-14 sm:py-16 bg-moss text-center">
          <div className="mx-auto max-w-2xl px-4 sm:px-6">
            <h2 className="font-[family-name:var(--font-sora)] font-semibold text-xl sm:text-2xl text-ivory mb-5 sm:mb-6">
              Want to see what KORA can do for your home?
            </h2>
            <Link
              href="/contact"
              className="inline-flex rounded-full bg-ivory px-8 py-4 text-sm font-semibold text-forest hover:bg-sage transition-colors"
            >
              Get in touch
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
