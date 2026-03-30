/**
 * AboutReviews — Google reviews section with aggregate rating and 3 cards.
 *
 * Server Component — no "use client".
 * Shows aggregate rating row, Google link, and 3 testimonial cards
 * from the first 3 items in the testimonials content layer.
 * Card style matches TestimonialsGrid on the homepage.
 */

import React from "react";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { FadeUp } from "@/components/ui/FadeUp";
import { StarRating } from "@/components/ui/StarRating";
import { testimonials } from "@/content/testimonials";
import { clientConfig } from "@/content/client.config";

// Google "G" icon
function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}

// External link icon
function ExternalLinkIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

const featured = testimonials.slice(0, 3);

export function AboutReviews() {
  return (
    <SectionWrapper bg="light" padding="lg">
      {/* Section header */}
      <FadeUp>
        <div className="mb-10">
          <h2 className="font-heading text-2xl lg:text-3xl font-semibold text-brand-dark mb-6">
            What Our Clients Say
          </h2>

          {/* Aggregate rating row */}
          <div className="flex flex-wrap items-center gap-4">
            <StarRating
              rating={clientConfig.reviewAverage}
              size="md"
              showValue
              reviewCount={clientConfig.reviewCount}
            />

            {/* Google link */}
            <a
              href={clientConfig.googleBusinessUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-brand-primary hover:text-brand-primary-dark transition-colors duration-200 border border-brand-primary/20 rounded-lg px-3 py-1.5 bg-white"
            >
              <GoogleIcon className="w-4 h-4 flex-shrink-0" />
              <span>View on Google</span>
              <ExternalLinkIcon className="w-3.5 h-3.5 flex-shrink-0" />
            </a>
          </div>
        </div>
      </FadeUp>

      {/* Review card grid — matches TestimonialsGrid card style */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {featured.map((testimonial, i) => (
          <FadeUp key={i} delay={i * 0.1}>
            <figure className="flex flex-col bg-white rounded-2xl border border-brand-primary/10 p-6 gap-4 h-full shadow-sm">
              {/* Star rating */}
              <StarRating rating={testimonial.rating} size="sm" />

              {/* Quote */}
              <blockquote className="flex-1">
                <p className="text-brand-dark/75 text-sm leading-relaxed italic">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
              </blockquote>

              {/* Author */}
              <figcaption className="border-t border-brand-primary/10 pt-4">
                <div className="font-semibold text-brand-dark text-sm">
                  {testimonial.author}
                </div>
                <div className="text-brand-dark/50 text-xs mt-0.5">
                  {testimonial.service}
                </div>
              </figcaption>
            </figure>
          </FadeUp>
        ))}
      </div>
    </SectionWrapper>
  );
}
