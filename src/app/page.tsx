import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import EarlySignupForm from "@/components/EarlySignupForm";

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

export default function Home() {
  return (
    <div className="flex flex-col min-h-full bg-forest font-[family-name:var(--font-inter)]">
      <Nav />
      <main className="flex flex-col flex-1 items-center justify-center px-4 sm:px-6 py-16 sm:py-24">
        <EarlySignupForm />
      </main>
      <Footer />
    </div>
  );
}
