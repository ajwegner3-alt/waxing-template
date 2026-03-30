import type { Service, ServiceCategory } from "@/lib/types";
import { SectionWrapper, FadeUp } from "@/components/ui";
import { ServiceCard } from "./ServiceCard";

interface CategorySectionProps {
  category: ServiceCategory;
  services: Service[];
  /** Alternate bg — pass "white" for even indexes, "light" for odd */
  bg?: "white" | "light";
}

/**
 * CategorySection — Server Component
 *
 * A full-width section for one service category.
 * Anchor ID `category-{slug}` is used by CategoryPills scroll targeting.
 * scroll-mt clears the fixed header + sticky pills bar.
 */
export function CategorySection({
  category,
  services,
  bg = "white",
}: CategorySectionProps) {
  return (
    <SectionWrapper
      id={`category-${category.slug}`}
      bg={bg}
      className="scroll-mt-[4.5rem] lg:scroll-mt-24"
    >
      {/* Section heading */}
      <FadeUp className="mb-8 lg:mb-10">
        <div className="max-w-2xl">
          <h2 className="text-2xl lg:text-3xl font-bold text-brand-dark mb-2">
            {category.name}
          </h2>
          <p className="text-brand-dark/60 text-sm font-medium uppercase tracking-widest mb-3">
            {category.tagline}
          </p>
          <p className="text-brand-dark/70 leading-relaxed">
            {category.description}
          </p>
        </div>
      </FadeUp>

      {/* Service card grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, i) => (
          <ServiceCard
            key={service.slug}
            service={service}
            delay={i * 0.07}
          />
        ))}
      </div>
    </SectionWrapper>
  );
}
