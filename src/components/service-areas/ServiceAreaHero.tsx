import type { ServiceArea } from "@/lib/types";
import { clientConfig } from "@/content/client.config";
import { SectionWrapper, BookingLink, PhoneLink } from "@/components/ui";

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
 */
export function ServiceAreaHero({ area }: ServiceAreaHeroProps) {
  return (
    <SectionWrapper
      bg="primary"
      className="-mt-16 lg:-mt-20"
      innerClassName="pt-32 lg:pt-40 pb-8"
    >
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
    </SectionWrapper>
  );
}
