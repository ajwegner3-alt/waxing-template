import { notFound } from "next/navigation";
import Image from "next/image";
import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import { allServices, getServiceBySlug } from "@/content/services";
import { testimonials } from "@/content/testimonials";
import { clientConfig } from "@/content/client.config";
import { generateServiceSchema } from "@/lib/schema";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import {
  SectionWrapper,
  FadeUp,
  BookingLink,
  PhoneLink,
  SchemaScript,
} from "@/components/ui";
import {
  PainLevelBadge,
  IngredientCallout,
  FAQAccordion,
  ServiceTestimonial,
  RelatedServices,
} from "@/components/services";

// ---------------------------------------------------------------------------
// Static generation — build all 14 service pages at compile time
// Unknown slugs return 404 (no fallback)
// ---------------------------------------------------------------------------

export function generateStaticParams() {
  return allServices.map((s) => ({ slug: s.slug }));
}

export const dynamicParams = false;

// ---------------------------------------------------------------------------
// Metadata — unique per service
// ---------------------------------------------------------------------------

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  return generatePageMetadata({
    title: service.metaTitle,
    description: service.metaDescription,
    path: `/services/${service.slug}`,
  });
}

// ---------------------------------------------------------------------------
// Page Component
// ---------------------------------------------------------------------------

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  // Testimonial lookup — first match by service name (case-insensitive)
  const matchedTestimonial =
    testimonials.find(
      (t) => t.service?.toLowerCase() === service.name.toLowerCase()
    ) ?? null;

  // Related services — resolve slugs to Service objects
  const relatedServices = service.relatedServices
    .map((s) => getServiceBySlug(s))
    .filter((s): s is NonNullable<typeof s> => Boolean(s))
    .slice(0, 3);

  return (
    <>
      <SchemaScript schema={generateServiceSchema(service, clientConfig)} />

      {/* ------------------------------------------------------------------ */}
      {/* Hero section                                                         */}
      {/* ------------------------------------------------------------------ */}
      <SectionWrapper bg="light">
        <Breadcrumbs
          items={[
            { label: "Services", href: "/services" },
            { label: service.name, href: `/services/${service.slug}` },
          ]}
          className="mb-6"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Hero image */}
          <FadeUp>
            <div className="aspect-[16/9] lg:aspect-[4/3] w-full relative overflow-hidden rounded-2xl">
              <Image
                src={service.coverImage}
                fill
                className="object-cover"
                alt={service.name}
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
          </FadeUp>

          {/* Content */}
          <FadeUp delay={0.1}>
            <div className="space-y-4">
              <h1 className="text-3xl lg:text-4xl font-bold text-brand-dark leading-tight">
                {service.heroHeadline}
              </h1>
              <p className="text-brand-dark/70 text-lg leading-relaxed">
                {service.heroSubheadline}
              </p>

              {/* Price + duration row */}
              <div className="flex flex-wrap items-center gap-4">
                <span className="text-2xl font-bold text-brand-primary">
                  {service.priceDisplay}
                </span>
                <span className="text-brand-dark/50 text-sm">
                  {service.duration}
                </span>
              </div>

              {/* Pain level + sensitive skin badges */}
              <PainLevelBadge
                painLevel={service.painLevel}
                sensitiveSkintSafe={service.sensitiveSkintSafe}
              />

              {/* Primary CTA */}
              <div className="pt-2">
                <BookingLink variant="cta">
                  Book {service.name}
                </BookingLink>
              </div>
            </div>
          </FadeUp>
        </div>
      </SectionWrapper>

      {/* ------------------------------------------------------------------ */}
      {/* What to Expect                                                       */}
      {/* ------------------------------------------------------------------ */}
      <SectionWrapper bg="white">
        <FadeUp>
          <div className="max-w-3xl">
            <h2 className="text-2xl font-bold text-brand-dark mb-4">
              What to Expect
            </h2>
            <p className="text-brand-dark/75 leading-relaxed text-base">
              {service.whatToExpect}
            </p>
          </div>
        </FadeUp>
      </SectionWrapper>

      {/* ------------------------------------------------------------------ */}
      {/* How to Prepare — always visible ordered list                         */}
      {/* ------------------------------------------------------------------ */}
      <SectionWrapper bg="light">
        <FadeUp>
          <div className="max-w-3xl">
            <h2 className="text-2xl font-bold text-brand-dark mb-6">
              How to Prepare
            </h2>
            <ol className="space-y-4">
              {service.preparation.map((step, index) => (
                <li key={index} className="flex items-start gap-4">
                  <span className="shrink-0 w-7 h-7 rounded-full bg-brand-primary/15 text-brand-primary text-sm font-bold flex items-center justify-center mt-0.5">
                    {index + 1}
                  </span>
                  <p className="text-brand-dark/75 leading-relaxed text-sm flex-1">
                    {step}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </FadeUp>
      </SectionWrapper>

      {/* ------------------------------------------------------------------ */}
      {/* Aftercare Tips — always visible ordered list                         */}
      {/* ------------------------------------------------------------------ */}
      <SectionWrapper bg="white">
        <FadeUp>
          <div className="max-w-3xl">
            <h2 className="text-2xl font-bold text-brand-dark mb-6">
              Aftercare Tips
            </h2>
            <ol className="space-y-4">
              {service.aftercare.map((tip, index) => (
                <li key={index} className="flex items-start gap-4">
                  <span className="shrink-0 w-7 h-7 rounded-full bg-brand-secondary/20 text-brand-secondary text-sm font-bold flex items-center justify-center mt-0.5">
                    {index + 1}
                  </span>
                  <p className="text-brand-dark/75 leading-relaxed text-sm flex-1">
                    {tip}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </FadeUp>
      </SectionWrapper>

      {/* ------------------------------------------------------------------ */}
      {/* Ingredient Callout — conditionally renders (component handles empty) */}
      {/* ------------------------------------------------------------------ */}
      <SectionWrapper bg="light">
        <FadeUp>
          <IngredientCallout ingredients={service.ingredients} />
        </FadeUp>
      </SectionWrapper>

      {/* ------------------------------------------------------------------ */}
      {/* Inline Testimonial — conditionally renders (component handles null)  */}
      {/* ------------------------------------------------------------------ */}
      {matchedTestimonial && (
        <SectionWrapper bg="white">
          <div className="max-w-2xl mx-auto">
            <ServiceTestimonial testimonial={matchedTestimonial} />
          </div>
        </SectionWrapper>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* FAQ Accordion — conditionally renders (component handles empty)      */}
      {/* ------------------------------------------------------------------ */}
      {service.faqs.length > 0 && (
        <SectionWrapper bg={matchedTestimonial ? "light" : "white"}>
          <FadeUp>
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold text-brand-dark mb-6">
                Frequently Asked Questions
              </h2>
              <FAQAccordion faqs={service.faqs} />
            </div>
          </FadeUp>
        </SectionWrapper>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* Related Services                                                     */}
      {/* ------------------------------------------------------------------ */}
      <RelatedServices services={relatedServices} />

      {/* ------------------------------------------------------------------ */}
      {/* Bottom CTA                                                           */}
      {/* ------------------------------------------------------------------ */}
      <SectionWrapper bg="primary">
        <FadeUp className="text-center">
          <h2 className="text-2xl lg:text-3xl font-bold text-white mb-3">
            Ready to book your {service.name}?
          </h2>
          <p className="text-white/80 mb-8 max-w-md mx-auto">
            First visit? We&rsquo;ll walk you through every step. No surprises,
            no judgment — just smooth, comfortable results.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <BookingLink
              variant="cta"
              className="!bg-white !text-brand-primary hover:!bg-brand-light"
            >
              Book {service.name}
            </BookingLink>
            <PhoneLink
              phone={clientConfig.phone}
              variant="cta"
              className="!bg-transparent !border-2 !border-white !text-white hover:!bg-white/10"
            >
              {clientConfig.phone}
            </PhoneLink>
          </div>
        </FadeUp>
      </SectionWrapper>
    </>
  );
}
