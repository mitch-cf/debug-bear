import type { Metadata, Viewport } from "next";
import { Atkinson_Hyperlegible, Nunito_Sans } from "next/font/google";
import "./globals.css";

const atkinsonHyperlegible = Atkinson_Hyperlegible({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  adjustFontFallback: true,
});

const nunitoSans = Nunito_Sans({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
  adjustFontFallback: true,
});

const siteTitle =
  "DebugBear — Page speed monitoring that tells you exactly what to fix";
const siteDescription =
  "Track Core Web Vitals, real user experience, and synthetic test scores in one place. Get alerted before users notice.";

export const metadata: Metadata = {
  title: {
    default: siteTitle,
    template: "%s · DebugBear",
  },
  description: siteDescription,
  applicationName: "DebugBear",
  keywords: [
    "Core Web Vitals",
    "page speed monitoring",
    "synthetic monitoring",
    "real user monitoring",
    "RUM",
    "web performance",
    "LCP",
    "CLS",
    "INP",
  ],
  openGraph: {
    type: "website",
    siteName: "DebugBear",
    title: siteTitle,
    description: siteDescription,
  },
  twitter: {
    card: "summary",
    title: siteTitle,
    description: siteDescription,
  },
};

export const viewport: Viewport = {
  themeColor: "#021645",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${atkinsonHyperlegible.variable} ${nunitoSans.variable} h-full antialiased`}
    >
      <head>
        <link rel="preconnect" href="https://i.pravatar.cc" crossOrigin="" />
      </head>
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
