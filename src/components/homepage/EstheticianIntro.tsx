/**
 * EstheticianIntro — Photo + text split layout for lead esthetician Maya Chen.
 *
 * Server Component — no "use client".
 * Data from staff[0] in the content layer — no hardcoded values.
 * Photo uses next/image with fallback gradient if image is missing.
 * Both columns wrapped in FadeUp.
 */

import React from "react";
import Image from "next/image";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { FadeUp } from "@/components/ui/FadeUp";
import { BookingLink } from "@/components/ui/BookingLink";
import { staff } from "@/content/staff";

const esthetician = staff[0];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function EstheticianIntro() {
  return (
    <SectionWrapper bg="white" padding="lg">
      {/* Section ornament */}
      <FadeUp>
        <div className="text-center mb-12">
          <div className="ornament-divider text-brand-primary mb-6">
            <span className="text-brand-primary/40 text-xl">&#10045;</span>
          </div>
        </div>
      </FadeUp>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left: Photo */}
        <FadeUp>
          <div className="relative aspect-[4/5] w-full max-w-md mx-auto lg:mx-0 rounded-3xl overflow-hidden shadow-warm-lg">
            {esthetician.headshot ? (
              <Image
                src={esthetician.headshot}
                alt={`${esthetician.name}, ${esthetician.title} at Honey & Bloom Wax Studio`}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            ) : (
              /* Fallback gradient if headshot isn't available yet */
              <div
                className="absolute inset-0 bg-gradient-to-br from-brand-primary/20 via-brand-light to-brand-secondary/15 flex items-end p-8"
                aria-hidden="true"
              >
                <div className="w-full text-center">
                  <div className="text-5xl mb-2">&#127804;</div>
                  <div className="text-brand-dark/40 text-sm font-medium">
                    Photo coming soon
                  </div>
                </div>
              </div>
            )}

            {/* Experience badge */}
            <div className="absolute bottom-5 right-5 bg-white/92 backdrop-blur-sm rounded-2xl px-5 py-4 shadow-warm-lg">
              <div className="font-heading text-2xl font-bold text-brand-dark leading-none">
                {esthetician.yearsExperience}+
              </div>
              <div className="text-xs text-brand-dark/55 font-medium mt-1 tracking-wide">
                Years of Experience
              </div>
            </div>
          </div>
        </FadeUp>

        {/* Right: Bio */}
        <FadeUp delay={0.15}>
          <div className="flex flex-col gap-6">
            {/* Eyebrow label */}
            <div className="text-brand-secondary font-semibold text-sm tracking-widest uppercase">
              Meet Your Esthetician
            </div>

            <div>
              <h2 className="font-heading text-3xl lg:text-4xl font-semibold text-brand-dark mb-1">
                {esthetician.name}
              </h2>
              <p className="text-brand-primary font-medium">
                {esthetician.title}
              </p>
            </div>

            {/* Bio paragraphs — show first two for a concise but personal read */}
            <div className="flex flex-col gap-5">
              {esthetician.bio.slice(0, 2).map((paragraph, i) => (
                <p
                  key={i}
                  className="text-brand-dark/65 leading-[1.8]"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Specialties */}
            {esthetician.specialties && esthetician.specialties.length > 0 && (
              <div>
                <div className="text-xs font-semibold text-brand-dark/45 uppercase tracking-widest mb-3">
                  Specialties
                </div>
                <div className="flex flex-wrap gap-2">
                  {esthetician.specialties.map((specialty) => (
                    <span
                      key={specialty}
                      className="text-sm bg-gradient-to-r from-brand-primary/10 to-brand-primary/5 text-brand-dark/70 font-medium px-4 py-1.5 rounded-full border border-brand-primary/8"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Soft booking CTA */}
            <div className="pt-2">
              <BookingLink variant="cta" className="w-full sm:w-auto">
                Book with {esthetician.name.split(" ")[0]}
              </BookingLink>
              <p className="text-xs text-brand-dark/40 mt-2">
                Accepting new clients &middot; No deposit required
              </p>
            </div>
          </div>
        </FadeUp>
      </div>
    </SectionWrapper>
  );
}
