"use client";
import React from "react";
import { useBookingDrawer } from "@/components/booking/BookingDrawerContext";

interface BookingLinkProps {
  variant?: "header" | "cta" | "inline";
  className?: string;
  children?: React.ReactNode;
  /**
   * When set, renders as an <a> tag linking to this external URL
   * (e.g. the final "Confirm & Book" handoff in ConfirmationStep).
   * When omitted, renders as a <button> that opens the booking drawer.
   */
  externalHref?: string;
}

const variantClasses: Record<"header" | "cta" | "inline", string> = {
  header:
    "bg-brand-primary text-brand-dark px-5 py-2.5 rounded-full font-semibold hover:bg-brand-primary-dark transition-all duration-200 min-w-[48px] min-h-[48px] inline-flex items-center justify-center shadow-warm hover:shadow-warm-lg",
  cta: "bg-brand-primary text-brand-dark px-8 py-4 rounded-full font-bold text-lg hover:bg-brand-primary-dark transition-all duration-200 shadow-warm-lg hover:shadow-warm-hover min-w-[48px] min-h-[48px] flex items-center justify-center",
  inline:
    "text-brand-primary font-semibold underline-offset-2 hover:underline hover:text-brand-primary-dark transition-colors duration-200 min-w-[48px] min-h-[48px] inline-flex items-center justify-center",
};

/**
 * BookingLink — renders a booking CTA.
 *
 * Default (no externalHref): <button> that opens the booking drawer via context.
 * With externalHref: <a> that navigates to the external booking URL (used only
 * in ConfirmationStep's final handoff button).
 *
 * Three visual variants: header (compact), cta (large), inline (text link).
 * All variants meet 48x48px minimum tap target for mobile.
 */
export function BookingLink({
  variant = "header",
  className = "",
  children,
  externalHref,
}: BookingLinkProps) {
  const { openDrawer } = useBookingDrawer();
  const defaultText = "Book Now";
  const classes = `${variantClasses[variant]} ${className}`;
  const content = <span>{children ?? defaultText}</span>;

  if (externalHref) {
    return (
      <a
        href={externalHref}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
      >
        {content}
      </a>
    );
  }

  return (
    <button type="button" onClick={openDrawer} className={classes}>
      {content}
    </button>
  );
}
