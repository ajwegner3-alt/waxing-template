import type { Service } from "@/lib/types";
import { SectionWrapper, FadeUp } from "@/components/ui";
import { ServiceCard } from "./ServiceCard";

interface RelatedServicesProps {
  services: Service[];
}

/**
 * RelatedServices — Server Component
 *
 * "You Might Also Like" section at the bottom of service detail pages.
 * Receives already-resolved Service objects (not slugs).
 * Reuses ServiceCard from Plan 01.
 * Returns null when the services array is empty.
 */
export function RelatedServices({ services }: RelatedServicesProps) {
  if (services.length === 0) return null;

  return (
    <SectionWrapper bg="light">
      <FadeUp>
        <h2 className="text-2xl md:text-3xl font-bold text-brand-dark mb-8">
          You Might Also Like
        </h2>
      </FadeUp>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <ServiceCard key={service.slug} service={service} delay={index * 0.1} />
        ))}
      </div>
    </SectionWrapper>
  );
}
