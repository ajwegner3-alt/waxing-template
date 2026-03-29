/**
 * Homepage — thin composer for all 8 sections.
 *
 * Server Component — no "use client".
 * Imports all sections from the barrel export and renders them in locked order.
 * No layout logic lives here — purely a section composer.
 */

import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import {
  HomepageHero,
  TrustBar,
  WhatToExpect,
  FirstTimerSpotlight,
  ServicesPreview,
  TestimonialsGrid,
  EstheticianIntro,
  FinalCTA,
} from "@/components/homepage";

export const metadata: Metadata = generatePageMetadata({
  title: "Waxing Studio in Omaha | Honey & Bloom Wax Studio",
  description:
    "Comfortable, judgment-free waxing in Omaha using honey-based hard wax. Specializing in first-timers. Brazilian, brows, body, and more. Book online today.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <HomepageHero />
      <TrustBar />
      <WhatToExpect />
      <FirstTimerSpotlight />
      <ServicesPreview />
      <TestimonialsGrid />
      <EstheticianIntro />
      <FinalCTA />
    </>
  );
}
