"use client";
import React from "react";
import { clientConfig } from "@/content/client.config";

interface BookingLinkProps {
  variant?: "header" | "cta" | "inline";
  className?: string;
  children?: React.ReactNode;
}

function CalendarIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path
        fillRule="evenodd"
        d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

const variantClasses: Record<"header" | "cta" | "inline", string> = {
  header:
    "bg-brand-primary text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-brand-primary-dark transition-colors duration-200 min-w-[48px] min-h-[48px] inline-flex items-center justify-center gap-2",
  cta: "bg-brand-primary text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-brand-primary-dark transition-colors duration-200 shadow-md min-w-[48px] min-h-[48px] flex items-center justify-center gap-2",
  inline:
    "text-brand-primary font-semibold underline-offset-2 hover:underline hover:text-brand-primary-dark transition-colors duration-200 min-w-[48px] min-h-[48px] inline-flex items-center justify-center",
};

/**
 * BookingLink — renders a booking CTA that links to clientConfig.bookingUrl.
 *
 * Reads bookingUrl directly from clientConfig — no hardcoded URLs.
 * Three visual variants: header (compact), cta (large), inline (text link).
 * All variants meet 48x48px minimum tap target for mobile.
 */
export function BookingLink({
  variant = "header",
  className = "",
  children,
}: BookingLinkProps) {
  const href = clientConfig.bookingUrl;
  const defaultText = "Book Now";
  const showIcon = variant === "header" || variant === "cta";

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${variantClasses[variant]} ${className}`}
    >
      {showIcon && <CalendarIcon className="w-5 h-5 flex-shrink-0" />}
      <span>{children ?? defaultText}</span>
    </a>
  );
}
