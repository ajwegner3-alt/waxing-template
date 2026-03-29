/**
 * FinalCTA — Warm closing CTA section with booking link and trust reinforcement.
 *
 * Server Component — no "use client".
 * bg="primary" = honey gold background. All text white.
 * Trust reinforcement uses reviewAverage + reviewCount from clientConfig.
 * BookingLink with white variant override via className.
 */

import React from "react";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { FadeUp } from "@/components/ui/FadeUp";
import { BookingLink } from "@/components/ui/BookingLink";
import { StarRating } from "@/components/ui/StarRating";
import { clientConfig } from "@/content/client.config";

function HeartIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
    </svg>
  );
}

export function FinalCTA() {
  return (
    <SectionWrapper bg="primary" padding="lg">
      <FadeUp>
        <div className="text-center max-w-2xl mx-auto flex flex-col items-center gap-6">
          {/* Icon */}
          <HeartIcon className="w-10 h-10 text-white/60" />

          {/* Heading */}
          <h2 className="font-heading text-3xl lg:text-4xl font-semibold text-white leading-tight">
            Ready to Experience Waxing Done Right?
          </h2>

          {/* Supporting text */}
          <p className="text-white/80 text-lg leading-relaxed">
            Whether it&apos;s your first time or you&apos;re switching studios,
            you deserve an esthetician who takes your comfort seriously. Book
            your appointment today — no experience necessary.
          </p>

          {/* CTA Button — white override so it reads clearly on honey gold bg */}
          <BookingLink
            variant="cta"
            className="!bg-white !text-brand-primary hover:!bg-brand-light !shadow-lg"
          >
            Book Your Appointment
          </BookingLink>

          {/* Trust reinforcement */}
          <div className="flex flex-col items-center gap-2 pt-2">
            <StarRating
              rating={clientConfig.reviewAverage}
              size="sm"
              showValue
              reviewCount={clientConfig.reviewCount}
              className="[&>div>svg]:text-white [&>div>svg.text-brand-gold]:text-white"
            />
            <p className="text-white/65 text-sm">
              Rated {clientConfig.reviewAverage} stars by{" "}
              {clientConfig.reviewCount}+ clients in Omaha
            </p>
          </div>

          {/* Fine print */}
          <p className="text-white/50 text-xs">
            No deposit required &middot; Free cancellation &middot; Private room every appointment
          </p>
        </div>
      </FadeUp>
    </SectionWrapper>
  );
}
