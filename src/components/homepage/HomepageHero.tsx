/**
 * HomepageHero — Full-viewport hero section for the waxing template homepage.
 *
 * Positioning note:
 * The root layout adds pt-16 lg:pt-20 on <main> to clear the fixed header.
 * -mt-16 lg:-mt-20 here negates that padding so the hero fills edge-to-edge
 * under the transparent header. The inner content container then restores the
 * clearance with pt-32 lg:pt-40 so text sits below the header.
 *
 * Background: CSS gradient placeholder — replace with:
 * <Image fill src="/images/hero.jpg" className="object-cover" alt="" priority />
 */

import React from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/Badge";
import { BookingLink } from "@/components/ui/BookingLink";
import { Button } from "@/components/ui/Button";
import { FadeUp } from "@/components/ui/FadeUp";
import { clientConfig } from "@/content/client.config";

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
        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export function HomepageHero() {
  return (
    <section
      className={[
        /* negate main's pt-16 lg:pt-20 so hero fills under transparent header */
        "-mt-16 lg:-mt-20",
        "relative min-h-screen flex items-center overflow-hidden",
        "bg-brand-dark",
      ].join(" ")}
    >
      <Image
        fill
        src="/images/hero.jpg"
        className="object-cover"
        alt=""
        priority
      />

      {/* Overlay to ensure text contrast over the hero photo */}
      <div className="absolute inset-0 bg-black/40" aria-hidden="true" />

      {/* Inner content — pt-32 lg:pt-40 clears the fixed header height */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 lg:pt-40 pb-16 lg:pb-24 w-full">
        <FadeUp>
          <div className="max-w-2xl">
            {/* Trust badge */}
            <div className="mb-6">
              <Badge
                variant="trust"
                icon={<StarIcon className="w-4 h-4 text-brand-gold" />}
                className="bg-white/15 text-white border border-white/20 backdrop-blur-sm"
              >
                {clientConfig.reviewAverage} stars · {clientConfig.reviewCount}+ happy clients
              </Badge>
            </div>

            {/* Comfort-first headline — addresses first-timer anxiety directly */}
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-semibold text-white leading-tight mb-4">
              Your First Wax Should Feel Good
            </h1>

            {/* Subheadline */}
            <p className="text-white/85 text-lg lg:text-xl leading-relaxed mb-8 max-w-xl">
              Honey-based wax. A patient, judgment-free esthetician. And a
              First&#8209;Timer Package designed to make your first visit the
              best one.
            </p>

            {/* CTA group */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              {/* Primary CTA */}
              <BookingLink variant="cta">Book Now</BookingLink>

              {/* Secondary CTA — smooth scroll to What to Expect */}
              <Button
                variant="outline"
                size="lg"
                href="#what-to-expect"
                className="border-white/70 text-white hover:bg-white hover:text-brand-dark"
              >
                First&#8209;Timer Guide
              </Button>
            </div>
          </div>
        </FadeUp>
      </div>

      {/* Subtle bottom fade into the next section */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-brand-dark/60 to-transparent"
        aria-hidden="true"
      />
    </section>
  );
}
