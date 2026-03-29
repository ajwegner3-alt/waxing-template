/**
 * Root Layout — Honey & Bloom Wax Studio Template
 *
 * Loads Fraunces (heading) and Plus Jakarta Sans (body) via next/font/google.
 * The variable names passed here MUST match the --font-* tokens in globals.css:
 *   --font-fraunces          → used by --font-heading in @theme
 *   --font-plus-jakarta-sans → used by --font-body in @theme
 *
 * Fraunces is loaded as a variable font (no explicit weight array) to access
 * the full wght axis range (100-900) and the SOFT/WONK axes.
 * See RESEARCH.md pitfall #3 for why this matters.
 */

import type { Metadata } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { clientConfig } from "@/content/client.config";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  // No weight array — load as variable font for full axis access
  // Axes: wght (100-900), SOFT (0-100), WONK (0-1), opsz (9-144)
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: `${clientConfig.name} \u2014 ${clientConfig.tagline}`,
  description: `Professional waxing services in ${clientConfig.primaryCity}. Honey-based wax, first-timer friendly, ${clientConfig.reviewCount}+ five-star reviews. Book online today.`,
  metadataBase: new URL(clientConfig.siteUrl),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${plusJakartaSans.variable}`}>
      <body className="antialiased noise-texture">
        <main>{children}</main>
      </body>
    </html>
  );
}
