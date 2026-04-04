/**
 * /book page — SEO landing page that auto-opens the booking drawer.
 *
 * The drawer is the primary booking flow. This page exists so that:
 * - Direct links to /book work and open the drawer automatically
 * - Search engines can index the page with booking-focused metadata
 * - Users who arrive without JS see a fallback "Book Now" button
 *
 * The auto-open behavior is handled by BookPageClient (client component).
 */

import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { FadeUp } from "@/components/ui/FadeUp";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { BookPageClient } from "./BookPageClient";

export const metadata: Metadata = generatePageMetadata({
  title: "Book Your Appointment | Honey & Bloom Wax Studio Omaha",
  description:
    "Book a waxing appointment with Maya Chen at Honey & Bloom. Choose your services, date, and time in 2 minutes. Transparent pricing, gentle honey-based wax.",
  path: "/book",
});

export default function BookPage() {
  return (
    <>
      <SectionWrapper bg="light" padding="sm">
        <Breadcrumbs items={[{ label: "Book", href: "/book" }]} className="mb-4" />
        <FadeUp>
          <div className="max-w-xl">
            <h1 className="font-heading text-3xl lg:text-4xl font-bold text-brand-dark mb-3">
              Let&apos;s book your appointment
            </h1>
            <p className="text-brand-dark/70 text-lg leading-relaxed">
              Takes about 2 minutes. Pick your services, choose a time, and we&apos;ll take it
              from there.
            </p>
          </div>
        </FadeUp>
      </SectionWrapper>

      {/* Auto-opens booking drawer on mount; renders "Book Now" fallback */}
      <BookPageClient />
    </>
  );
}
