import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import { allServices } from "@/content/services";
import { staff } from "@/content/staff";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { FadeUp } from "@/components/ui/FadeUp";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { BookingFlow } from "@/components/booking";

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

      <BookingFlow services={allServices} esthetician={staff[0]} />
    </>
  );
}
