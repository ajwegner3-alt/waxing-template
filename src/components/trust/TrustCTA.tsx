/**
 * TrustCTA — Closing CTA section for trust/about pages.
 *
 * Server Component — no "use client".
 * bg="primary" (honey gold). Text white. Varied copy by page.
 * Inline trust badge row: rating, licensed, single-use applicators.
 * BookingLink + PhoneLink side by side.
 */

import React from "react";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { FadeUp } from "@/components/ui/FadeUp";
import { BookingLink } from "@/components/ui/BookingLink";
import { PhoneLink } from "@/components/ui/PhoneLink";
import { clientConfig } from "@/content/client.config";

type TrustCTAPage = "about" | "faq";

interface TrustCTAProps {
  page: TrustCTAPage;
}

// Shield checkmark for trust badges
function ShieldCheckIcon({ className }: { className?: string }) {
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
        d="M12.516 2.17a.75.75 0 0 0-1.032 0 11.209 11.209 0 0 1-7.877 3.08.75.75 0 0 0-.722.515A12.74 12.74 0 0 0 2.25 9.75c0 5.942 4.064 10.933 9.563 12.348a.749.749 0 0 0 .374 0c5.499-1.415 9.563-6.406 9.563-12.348 0-1.39-.223-2.73-.635-3.985a.75.75 0 0 0-.722-.516l-.143.001c-2.996 0-5.717-1.17-7.734-3.08Zm3.094 8.016a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

// Star icon for rating badge
function StarIcon({ className }: { className?: string }) {
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
        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.006Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

const copy: Record<
  TrustCTAPage,
  { headline: string; subtitle: string }
> = {
  about: {
    headline: "Ready to Experience It for Yourself?",
    subtitle:
      "You've read the story — now come live it. Book your appointment online in seconds. No experience needed, no judgment, ever.",
  },
  faq: {
    headline: "Still Have Questions? We're Happy to Help.",
    subtitle:
      "Call us before you book if you'd like to chat first — or go ahead and reserve your spot. Either way, we've got you.",
  },
};

interface TrustBadge {
  icon: React.ReactNode;
  label: string;
}

const trustBadges: TrustBadge[] = [
  {
    icon: <StarIcon className="w-4 h-4 text-white/80" />,
    label: `${clientConfig.reviewAverage} Stars (${clientConfig.reviewCount}+ reviews)`,
  },
  {
    icon: <ShieldCheckIcon className="w-4 h-4 text-white/80" />,
    label: "Nebraska Licensed Esthetician",
  },
  {
    icon: <ShieldCheckIcon className="w-4 h-4 text-white/80" />,
    label: "Single-Use Applicators",
  },
];

export function TrustCTA({ page }: TrustCTAProps) {
  const { headline, subtitle } = copy[page];

  return (
    <SectionWrapper bg="primary" padding="lg">
      <FadeUp>
        <div className="text-center max-w-2xl mx-auto flex flex-col items-center gap-6">
          {/* Headline */}
          <h2 className="font-heading text-2xl lg:text-3xl font-semibold text-white leading-tight">
            {headline}
          </h2>

          {/* Subtitle */}
          <p className="text-white/80 text-lg leading-relaxed">{subtitle}</p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <BookingLink
              variant="cta"
              className="!bg-white !text-brand-primary hover:!bg-brand-light !shadow-lg w-full sm:w-auto"
            >
              Book Your Appointment
            </BookingLink>
            <PhoneLink
              phone={clientConfig.phone}
              variant="header"
              className="text-white hover:text-white/80 w-full sm:w-auto justify-center"
            >
              {clientConfig.phone}
            </PhoneLink>
          </div>

          {/* Inline trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-5 pt-2">
            {trustBadges.map((badge, i) => (
              <div
                key={i}
                className="flex items-center gap-2 text-white/70 text-sm bg-white/8 rounded-full px-4 py-1.5"
              >
                {badge.icon}
                <span>{badge.label}</span>
              </div>
            ))}
          </div>
        </div>
      </FadeUp>
    </SectionWrapper>
  );
}
