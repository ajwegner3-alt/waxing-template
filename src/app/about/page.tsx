import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import {
  AboutHero,
  BrandStory,
  EstheticianProfile,
  PhilosophyValues,
  HygieneProtocols,
  AboutReviews,
  TrustCTA,
} from "@/components/trust";

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = generatePageMetadata({
  title: "About Honey & Bloom Wax Studio | Omaha Esthetician",
  description:
    "Meet Maya Chen, licensed esthetician and founder of Honey & Bloom. Learn our story, philosophy, and hygiene standards. First-timer friendly waxing in Omaha.",
  path: "/about",
});

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <BrandStory />
      <EstheticianProfile />
      <PhilosophyValues />
      <HygieneProtocols />
      <AboutReviews />
      <TrustCTA page="about" />
    </>
  );
}
