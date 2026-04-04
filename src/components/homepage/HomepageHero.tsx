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

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}

function ShieldIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path fillRule="evenodd" d="M12.516 2.17a.75.75 0 0 0-1.032 0 11.209 11.209 0 0 1-7.877 3.08.75.75 0 0 0-.722.515A12.74 12.74 0 0 0 2.25 9.75c0 5.942 4.064 10.933 9.563 12.348a.749.749 0 0 0 .374 0c5.499-1.415 9.563-6.406 9.563-12.348 0-1.39-.223-2.73-.635-3.985a.75.75 0 0 0-.722-.516 11.209 11.209 0 0 1-7.877-3.08Z" clipRule="evenodd"/>
    </svg>
  );
}

function CalendarIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12.75 12.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM7.5 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM8.25 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM9.75 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM10.5 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM12.75 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM14.25 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM15 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM16.5 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM15 12.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM16.5 13.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"/>
      <path fillRule="evenodd" d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z" clipRule="evenodd"/>
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
            {/* Trust signals row */}
            <div className="mb-6 flex flex-wrap gap-3">
              <Badge
                variant="trust"
                icon={<GoogleIcon className="w-4 h-4" />}
                className="bg-white/15 text-white border border-white/20 backdrop-blur-sm"
              >
                {clientConfig.reviewAverage} ★ · {clientConfig.reviewCount} Google Reviews
              </Badge>
              <Badge
                variant="trust"
                icon={<ShieldIcon className="w-4 h-4 text-brand-gold" />}
                className="bg-white/15 text-white border border-white/20 backdrop-blur-sm"
              >
                Lic. {clientConfig.licenseNumber}
              </Badge>
              <Badge
                variant="trust"
                icon={<CalendarIcon className="w-4 h-4 text-brand-gold" />}
                className="bg-white/15 text-white border border-white/20 backdrop-blur-sm"
              >
                {clientConfig.yearsInBusiness}+ Years in Business
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
