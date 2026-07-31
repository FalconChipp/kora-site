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

const SITE_URL = "https://koraplatform.co.uk";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "KORA — Care. Insight. Better Outcomes.",
    template: "%s — KORA",
  },
  description:
    "KORA is the outcomes and insights platform for residential children's care. Track progress, spot patterns, and evidence outcomes — automatically.",
  keywords: [
    "residential children's care software",
    "care home management system",
    "outcomes platform",
    "LAC review reports",
    "Ofsted inspection tool",
    "safeguarding software",
    "young person care records",
    "children's home software UK",
  ],
  authors: [{ name: "SixByFive", url: "https://sixbyfive.com" }],
  creator: "SixByFive",
  publisher: "SixByFive",
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: "KORA",
    title: "KORA — Care. Insight. Better Outcomes.",
    description:
      "The outcomes and insights platform for residential children's care. Built for homes, managers, and the young people in their care.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "KORA — Care. Insight. Better Outcomes.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "KORA — Care. Insight. Better Outcomes.",
    description:
      "The outcomes and insights platform for residential children's care.",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "KORA",
  url: SITE_URL,
  logo: `${SITE_URL}/icon.svg`,
  description:
    "KORA is the outcomes and insights platform for residential children's care, fostering, and supported settings.",
  email: "hello@koraplatform.co.uk",
  address: {
    "@type": "PostalAddress",
    addressCountry: "GB",
  },
  founder: {
    "@type": "Organization",
    name: "SixByFive",
    url: "https://sixbyfive.com",
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "KORA",
  url: SITE_URL,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${sora.variable} ${inter.variable} h-full antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        {children}
        <Analytics />
        <CookieBanner />
      </body>
    </html>
  );
}
