/**
 * EstheticianProfile — Full esthetician profile with all bio paragraphs,
 * specialties pills, and certifications badges.
 *
 * Server Component — no "use client".
 * Two-column layout on desktop: image placeholder left, content right.
 * Uses staff[0] from content layer — ALL bio paragraphs (no slice).
 */

import React from "react";
import Image from "next/image";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { FadeUp } from "@/components/ui/FadeUp";
import { Badge } from "@/components/ui/Badge";
import { staff } from "@/content/staff";

// Certification icon — small checkmark shield
function CertIcon({ className }: { className?: string }) {
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

// Star icon for years experience badge
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

export function EstheticianProfile() {
  const member = staff[0];

  return (
    <SectionWrapper bg="light" padding="lg">
      <div className="grid lg:grid-cols-2 gap-12 items-start">
        {/* Left column: image placeholder */}
        <FadeUp>
          <div className="relative w-full aspect-[3/4] max-w-sm mx-auto lg:mx-0 rounded-3xl overflow-hidden border border-brand-primary/8 shadow-warm-lg">
            <Image
              src={member.headshot}
              alt={`${member.name} — ${member.title}`}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 384px, 384px"
              priority
            />
          </div>
        </FadeUp>

        {/* Right column: profile content */}
        <FadeUp delay={0.1}>
          {/* Name and title */}
          <div className="mb-6">
            <h2 className="font-heading text-2xl lg:text-3xl font-semibold text-brand-dark mb-1">
              {member.name}
            </h2>
            <p className="text-brand-secondary font-medium text-sm uppercase tracking-wide">
              {member.title}
            </p>
          </div>

          {/* Years experience */}
          <div className="mb-6">
            <Badge
              variant="trust"
              icon={<StarIcon className="w-3.5 h-3.5" />}
            >
              {member.yearsExperience} Years of Experience
            </Badge>
          </div>

          {/* All bio paragraphs — no slice */}
          <div className="space-y-5 text-brand-dark/65 leading-[1.8] mb-8">
            {member.bio.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>

          {/* Specialties */}
          <div className="mb-6">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-brand-dark/50 mb-3">
              Specialties
            </h3>
            <div className="flex flex-wrap gap-2">
              {member.specialties.map((specialty, i) => (
                <span
                  key={i}
                  className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-gradient-to-r from-brand-primary/10 to-brand-primary/5 text-brand-primary-dark border border-brand-primary/12"
                >
                  {specialty}
                </span>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-brand-dark/50 mb-3">
              Certifications
            </h3>
            <div className="flex flex-col gap-2">
              {member.certifications.map((cert, i) => (
                <Badge
                  key={i}
                  variant="trust"
                  icon={<CertIcon className="w-3.5 h-3.5" />}
                >
                  {cert}
                </Badge>
              ))}
            </div>
          </div>
        </FadeUp>
      </div>
    </SectionWrapper>
  );
}
