import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const REASONS = [
  "Request a product demo",
  "Start a free trial",
  "Ask about pricing or Organisation plans",
  "Ask a technical question",
  "Give feedback",
];

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-full bg-ivory font-[family-name:var(--font-inter)]">
      <Nav />
      <main className="flex flex-col flex-1">

        {/* Hero */}
        <section className="bg-forest py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-widest text-sage mb-4 sm:mb-6">Contact</p>
              <h1 className="font-[family-name:var(--font-sora)] font-semibold text-3xl sm:text-5xl text-ivory leading-tight mb-4 sm:mb-6">
                Let&apos;s talk.
              </h1>
              <p className="text-base sm:text-lg text-sage/80 leading-relaxed">
                Whether you want a demo, have a question, or just want to understand if KORA is right for your setting — get in touch and we&apos;ll come back to you within one working day.
              </p>
            </div>
          </div>
        </section>

        {/* Form + info */}
        <section className="py-16 sm:py-24 bg-ivory">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">

            {/* Form */}
            <div>
              <form className="flex flex-col gap-5 sm:gap-6" action="mailto:hello@sixbyfive.com" method="GET">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="first" className="text-xs font-semibold text-charcoal/70 uppercase tracking-wide">
                      First name
                    </label>
                    <input
                      id="first"
                      name="first"
                      type="text"
                      required
                      className="rounded-xl border border-sage/50 bg-white px-4 py-3 text-sm text-charcoal placeholder:text-charcoal/30 focus:outline-none focus:ring-2 focus:ring-moss/40 focus:border-moss transition"
                      placeholder="Jane"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="last" className="text-xs font-semibold text-charcoal/70 uppercase tracking-wide">
                      Last name
                    </label>
                    <input
                      id="last"
                      name="last"
                      type="text"
                      required
                      className="rounded-xl border border-sage/50 bg-white px-4 py-3 text-sm text-charcoal placeholder:text-charcoal/30 focus:outline-none focus:ring-2 focus:ring-moss/40 focus:border-moss transition"
                      placeholder="Smith"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className="text-xs font-semibold text-charcoal/70 uppercase tracking-wide">
                    Email address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="rounded-xl border border-sage/50 bg-white px-4 py-3 text-sm text-charcoal placeholder:text-charcoal/30 focus:outline-none focus:ring-2 focus:ring-moss/40 focus:border-moss transition"
                    placeholder="jane@yourorganisation.com"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="org" className="text-xs font-semibold text-charcoal/70 uppercase tracking-wide">
                    Organisation name
                  </label>
                  <input
                    id="org"
                    name="org"
                    type="text"
                    className="rounded-xl border border-sage/50 bg-white px-4 py-3 text-sm text-charcoal placeholder:text-charcoal/30 focus:outline-none focus:ring-2 focus:ring-moss/40 focus:border-moss transition"
                    placeholder="Optional"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="reason" className="text-xs font-semibold text-charcoal/70 uppercase tracking-wide">
                    How can we help?
                  </label>
                  <select
                    id="reason"
                    name="reason"
                    className="rounded-xl border border-sage/50 bg-white px-4 py-3 text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-moss/40 focus:border-moss transition"
                  >
                    <option value="">Select a reason…</option>
                    {REASONS.map((r) => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="message" className="text-xs font-semibold text-charcoal/70 uppercase tracking-wide">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    className="rounded-xl border border-sage/50 bg-white px-4 py-3 text-sm text-charcoal placeholder:text-charcoal/30 focus:outline-none focus:ring-2 focus:ring-moss/40 focus:border-moss transition resize-none"
                    placeholder="Tell us about your setting, what you're looking for, or any questions you have…"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full sm:w-auto sm:self-start inline-flex justify-center rounded-full bg-forest px-8 py-4 text-sm font-semibold text-ivory hover:bg-moss transition-colors"
                >
                  Send message
                </button>
              </form>
            </div>

            {/* Info */}
            <div className="flex flex-col gap-8 sm:gap-10 lg:pt-2">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-moss mb-2 sm:mb-3">Response time</p>
                <p className="text-sm text-charcoal/60 leading-relaxed">
                  We respond to all enquiries within one working day. For urgent matters, email us directly at{" "}
                  <a href="mailto:hello@sixbyfive.com" className="text-moss underline underline-offset-2 hover:text-forest transition-colors">
                    hello@sixbyfive.com
                  </a>
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-moss mb-2 sm:mb-3">What to expect from a demo</p>
                <ul className="flex flex-col gap-2 sm:gap-2.5 text-sm text-charcoal/60">
                  {[
                    "A 30-minute call, no obligation",
                    "We walk through the platform with your setting in mind",
                    "You can bring your whole team — no limit on attendees",
                    "We'll answer any questions about compliance, data, and onboarding",
                    "No hard sell — if it's not the right fit, we'll say so",
                  ].map((point) => (
                    <li key={point} className="flex items-start gap-2.5">
                      <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 mt-0.5 flex-shrink-0 text-moss">
                        <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
                      </svg>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-5 sm:p-6 rounded-2xl bg-forest/5 border border-sage/30">
                <p className="font-[family-name:var(--font-sora)] font-semibold text-base text-forest mb-2">
                  Made by SixByFive
                </p>
                <p className="text-sm text-charcoal/60 leading-relaxed">
                  KORA is a{" "}
                  <a
                    href="https://sixbyfive.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-moss underline underline-offset-2 hover:text-forest transition-colors"
                  >
                    SixByFive
                  </a>{" "}
                  product. We&apos;re a small team that takes quality seriously — you&apos;ll speak to someone who actually knows the product.
                </p>
              </div>
            </div>

          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
