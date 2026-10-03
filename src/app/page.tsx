import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "KORA — See the progress behind the daily records",
  description:
    "Bring daily records, goals and insights together for residential children's care. Start a 7-day free trial, then £125/month for your first home, or subscribe now.",
  alternates: { canonical: "https://koraplatform.co.uk" },
  openGraph: {
    url: "https://koraplatform.co.uk",
    title: "KORA — See the progress behind the daily records",
    description:
      "Help your residential care team see each young person's progress. 7-day free trial, then £125/month for your first home.",
  },
};

export default function Home() {
  return (
    <div className="flex flex-col min-h-full bg-forest font-[family-name:var(--font-inter)]">
      <Nav />
      <main className="flex-1">
        {/* Changed: replace the launch waitlist with the confirmed trial and paid routes. */}
        <section className="mx-auto max-w-5xl px-4 sm:px-6 py-16 sm:py-24 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-sage mb-6">
            Built for residential children&apos;s care
          </p>
          <h1 className="font-[family-name:var(--font-sora)] font-semibold text-3xl sm:text-5xl lg:text-6xl text-ivory leading-tight mb-6">
            See the progress behind the daily records.
          </h1>
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-sage/80 leading-relaxed">
            Bring daily records, goals, achievements and insights together so your team can see how each young person is progressing — and what needs attention.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4">
            <Link href="/start" className="inline-flex justify-center rounded-full bg-ivory px-8 py-4 text-sm font-semibold text-forest hover:bg-sage transition-colors">
              Start your 7-day free trial
            </Link>
            <Link href="/start?plan=now" className="inline-flex justify-center rounded-full border border-sage/50 px-8 py-4 text-sm font-semibold text-ivory hover:bg-white/10 transition-colors">
              Subscribe now — £125/month
            </Link>
          </div>
          {/* Added: disclose renewal and payment details before visitors enter checkout. */}
          <p className="mt-5 text-sm text-sage/80">
            Trial: 7 days free, then £125/month for your first home. Payment details required.
            Cancel before the trial ends to avoid being charged.
          </p>
          <p className="mt-3 text-sm text-sage/80">
            Unlimited staff · No setup fee · Additional homes £25/month each
          </p>
          <p className="mt-7 text-sm text-sage">
            Want to see KORA with your team first?{" "}
            <Link href="/contact" className="underline underline-offset-4 hover:text-ivory">Request a product demo</Link>
          </p>
        </section>

        {/* Added: explain the everyday outcome before asking a care team to switch tools. */}
        <section className="bg-ivory px-4 sm:px-6 py-14 sm:py-20">
          <div className="mx-auto max-w-6xl">
            <h2 className="font-[family-name:var(--font-sora)] font-semibold text-2xl sm:text-3xl text-forest mb-9 text-center">
              From daily observations to a clearer picture.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: "Bring the day together", text: "Keep young-person profiles, daily records and handovers together so your team can find the context behind each update." },
                { title: "Keep progress visible", text: "Record goals, achievements and key work alongside incidents, so positive steps stay part of the picture." },
                { title: "Review changes over time", text: "Use trends, insights and reports to support team discussions about what is changing and where more support may help." },
              ].map(({ title, text }) => (
                <article key={title} className="rounded-2xl border border-sage/30 bg-white p-6">
                  <h3 className="font-semibold text-lg text-forest mb-3">{title}</h3>
                  <p className="text-sm text-charcoal/70 leading-relaxed">{text}</p>
                </article>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-moss">
              <Link href="/product" className="underline underline-offset-4">See how KORA works</Link>
              <Link href="/features" className="underline underline-offset-4">Explore features</Link>
              <Link href="/pricing" className="underline underline-offset-4">Compare home sizes and pricing</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
