import type { Metadata } from "next";
import { Sora, Inter } from "next/font/google";
import "./globals.css";
import Analytics from "@/components/Analytics";
import CookieBanner from "@/components/CookieBanner";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "KORA — Care. Insight. Better Outcomes.",
  description:
    "KORA is the outcomes and insights platform for residential care, fostering, and supported settings. Understand patterns, track progress, and evidence outcomes.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${sora.variable} ${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        {children}
        <Analytics />
        <CookieBanner />
      </body>
    </html>
  );
}
