import Link from "next/link";
import type { ServiceArea, Service } from "@/lib/types";
import { SectionWrapper, FadeUp } from "@/components/ui";

interface ServiceHighlightsProps {
  area: ServiceArea;
  services: Service[];
}

/**
 * ServiceHighlights — Shows 3 popular waxing services contextualised for the area.
 *
 * Accepts a pre-filtered services array from the page (caller selects which
 * services to highlight — 1 intimate, 1 face, 1 body for coverage variety).
 */
export function ServiceHighlights({ area, services }: ServiceHighlightsProps) {
  return (
    <SectionWrapper bg="white">
      <FadeUp>
        <h2 className="text-2xl lg:text-3xl font-bold text-brand-dark mb-8">
          Popular Waxing Services in {area.city}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="group block rounded-2xl border border-brand-light bg-brand-light/40 p-6 hover:border-brand-primary/40 hover:bg-brand-primary/5 transition-all duration-200"
            >
              <h3 className="font-bold text-brand-dark text-lg mb-2 group-hover:text-brand-primary transition-colors duration-200">
                {service.name}
              </h3>
              <p className="text-brand-dark/65 text-sm leading-relaxed mb-4">
                {service.shortDescription}
              </p>
              {service.price != null && (
                <div className="flex items-center justify-between">
                  <span className="text-brand-primary font-semibold text-sm">
                    {service.priceDisplay}
                  </span>
                  <span className="text-brand-dark/40 text-xs">{service.duration}</span>
                </div>
              )}
              <span className="inline-block mt-3 text-xs text-brand-primary font-medium group-hover:underline">
                Learn more &rarr;
              </span>
            </Link>
          ))}
        </div>
      </FadeUp>
    </SectionWrapper>
  );
}
