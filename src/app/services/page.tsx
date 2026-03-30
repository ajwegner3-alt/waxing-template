import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import { serviceCategories, getServicesByCategory } from "@/content/services";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { SectionWrapper, FadeUp, BookingLink } from "@/components/ui";
import { CategoryPills, CategorySection } from "@/components/services";

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = generatePageMetadata({
  title: "Waxing Services & Pricing in Omaha | Honey & Bloom Wax Studio",
  description:
    "Browse our full menu of face, body, and intimate waxing services with transparent pricing. Gentle honey-based formula, first-timer friendly. Book your appointment today.",
  path: "/services",
});

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function ServicesPage() {
  return (
    <>
      {/* Hero section */}
      <SectionWrapper bg="light">
        <Breadcrumbs items={[{ label: "Services", href: "/services" }]} className="mb-6" />
        <FadeUp>
          <div className="max-w-2xl">
            <h1 className="text-3xl lg:text-4xl font-bold text-brand-dark mb-4">
              Our Waxing Services
            </h1>
            <p className="text-brand-dark/70 text-lg leading-relaxed">
              Transparent pricing, gentle honey-based formula, and a judgment-free
              environment — whether it's your first wax or your fifteenth. Browse
              by category and tap any service to see exactly what to expect.
            </p>
          </div>
        </FadeUp>
      </SectionWrapper>

      {/* Sticky category pills */}
      <CategoryPills categories={serviceCategories} />

      {/* Category sections — alternate white / light bg */}
      {serviceCategories.map((category, index) => (
        <CategorySection
          key={category.slug}
          category={category}
          services={getServicesByCategory(category.slug)}
          bg={index % 2 === 0 ? "white" : "light"}
        />
      ))}

      {/* Bottom CTA */}
      <SectionWrapper bg="primary">
        <FadeUp className="text-center">
          <h2 className="text-2xl lg:text-3xl font-bold text-white mb-3">
            Ready to feel smooth?
          </h2>
          <p className="text-white/80 mb-8 max-w-md mx-auto">
            Book your appointment online in seconds. First visit? We'll walk you
            through everything.
          </p>
          <BookingLink variant="cta" className="!bg-white !text-brand-primary hover:!bg-brand-light mx-auto">
            Book Your Appointment
          </BookingLink>
        </FadeUp>
      </SectionWrapper>
    </>
  );
}
