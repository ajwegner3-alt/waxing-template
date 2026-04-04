"use client";

import { useEffect } from "react";
import { useBookingDrawer } from "@/components/booking/BookingDrawerContext";
import { BookingLink } from "@/components/ui/BookingLink";
import { SectionWrapper } from "@/components/ui/SectionWrapper";

/**
 * BookPageClient — auto-opens the booking drawer when /book is visited directly.
 *
 * Renders a centered fallback "Book Now" button as static content so the page
 * is not blank if the drawer fails to open (no-JS, context error, etc.).
 */
export function BookPageClient() {
  const { openDrawer } = useBookingDrawer();

  // Auto-open drawer on mount so /book links feel instant
  useEffect(() => {
    openDrawer();
    // Only run on initial mount — drawer.openDrawer reference is stable
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SectionWrapper bg="white" padding="lg">
      <div className="flex flex-col items-center justify-center gap-6 py-12 text-center">
        <p className="text-brand-dark/60 text-base max-w-sm leading-relaxed">
          Your booking window should open automatically. If it didn&apos;t, tap the button below.
        </p>
        <BookingLink variant="cta" />
      </div>
    </SectionWrapper>
  );
}
