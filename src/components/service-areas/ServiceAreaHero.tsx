import Image from "next/image";
import type { ServiceArea } from "@/lib/types";
import { clientConfig } from "@/content/client.config";
import { BookingLink, PhoneLink } from "@/components/ui";

interface ServiceAreaHeroProps {
  area: ServiceArea;
}

/**
 * ServiceAreaHero — Full-width hero for neighborhood service area pages.
 *
 * Uses the negative-margin pattern (same as HomepageHero) to achieve
 * edge-to-edge fill behind the fixed header:
 *   -mt-16 lg:-mt-20   pulls section up to cover layout padding-top
 *   pt-32 lg:pt-40     restores inner content below header height
 *
 * Neighborhood photo loaded from /images/neighborhood/{area.slug}.jpg
 * with a dark overlay for text contrast.
 */
export function ServiceAreaHero({ area }: ServiceAreaHeroProps) {
  return (
    <section className="relative -mt-16 lg:-mt-20 overflow-hidden bg-brand-primary">
      {/* Neighborhood background image */}
      <Image
        src={`/images/neighborhood/${area.slug}.jpg`}
        alt={`${area.city} neighborhood`}
        fill
        className="object-cover"
        sizes="100vw"
        priority
      />
      {/* Dark overlay for text contrast */}
      <div className="absolute inset-0 bg-brand-dark/60" aria-hidden="true" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 lg:pt-40 pb-16">
        <div className="max-w-3xl">
          <h1 className="text-3xl lg:text-5xl font-bold text-white leading-tight mb-4">
            {area.heroHeadline}
          </h1>
          <p className="text-white/85 text-lg lg:text-xl leading-relaxed mb-8">
            {area.heroSubheadline}
          </p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <BookingLink
              variant="cta"
              className="!bg-white !text-brand-primary hover:!bg-brand-light"
            >
              Book in {area.city}
            </BookingLink>
            <PhoneLink
              phone={clientConfig.phone}
              variant="cta"
              className="!bg-transparent !border-2 !border-white !text-white hover:!bg-white/10"
            >
              {clientConfig.phone}
            </PhoneLink>
          </div>
        </div>
      </div>
    </section>
  );
}
