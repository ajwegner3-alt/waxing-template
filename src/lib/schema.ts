/**
 * Schema.ts — Schema.org structured data generators
 *
 * All generators accept clientConfig and return a plain object suitable
 * for JSON.stringify() in SchemaScript. No React imports needed here.
 *
 * Waxing studios use BeautyBusiness (not MedicalBusiness) — they are
 * personal care businesses, not medical practices.
 */

import type { WaxingClientConfig, Service, FAQ, BlogPost, ServiceArea } from "@/lib/types";

/**
 * Generates a LocalBusiness/BeautyBusiness JSON-LD schema for the homepage.
 * Inject via <SchemaScript schema={generateWaxingBusinessSchema(clientConfig)} />
 * in layout.tsx or the homepage.
 */
export function generateWaxingBusinessSchema(
  config: WaxingClientConfig
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "BeautyBusiness"],
    name: config.name,
    description: `Professional waxing studio in ${config.primaryCity}. ${config.waxingSpecialties.join(", ")}.`,
    url: config.siteUrl,
    telephone: config.phone,
    email: config.email,
    image: `${config.siteUrl}${config.logo}`,
    priceRange: config.priceRange,
    foundingDate: String(config.foundingYear),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: config.reviewAverage,
      reviewCount: config.reviewCount,
      bestRating: 5,
      worstRating: 1,
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: config.address.street,
      addressLocality: config.address.city,
      addressRegion: config.address.state,
      postalCode: config.address.zip,
      addressCountry: "US",
    },
    openingHoursSpecification: buildOpeningHours(config.hours),
    sameAs: [
      config.instagramUrl,
      config.facebookUrl,
      config.tiktokUrl,
    ].filter(Boolean),
  };
}

type HoursConfig = WaxingClientConfig["hours"];

function buildOpeningHours(hours: HoursConfig) {
  const dayMap: Array<{ key: keyof HoursConfig; schemaDay: string }> = [
    { key: "monday", schemaDay: "Monday" },
    { key: "tuesday", schemaDay: "Tuesday" },
    { key: "wednesday", schemaDay: "Wednesday" },
    { key: "thursday", schemaDay: "Thursday" },
    { key: "friday", schemaDay: "Friday" },
    { key: "saturday", schemaDay: "Saturday" },
    { key: "sunday", schemaDay: "Sunday" },
  ];

  return dayMap
    .filter(({ key }) => hours[key] !== "Closed")
    .map(({ key, schemaDay }) => {
      const [open, close] = hours[key].split("–").map((t: string) => t.trim());
      return {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: `https://schema.org/${schemaDay}`,
        opens: convertTo24Hour(open),
        closes: convertTo24Hour(close),
      };
    });
}

/**
 * Generates a Service JSON-LD schema for individual service detail pages.
 * Inject via <SchemaScript schema={generateServiceSchema(service, clientConfig)} />
 */
export function generateServiceSchema(
  service: Service,
  config: WaxingClientConfig
): Record<string, unknown> {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.shortDescription,
    url: `${config.siteUrl}/services/${service.slug}`,
    provider: {
      "@type": ["LocalBusiness", "BeautyBusiness"],
      name: config.name,
      url: config.siteUrl,
    },
  };

  if (service.price != null) {
    schema.offers = {
      "@type": "Offer",
      price: service.price,
      priceCurrency: "USD",
    };
  }

  return schema;
}

/**
 * Generates a FAQPage JSON-LD schema for the /faq page.
 * Inject via <SchemaScript schema={generateFAQPageSchema(faqs)} />
 */
export function generateFAQPageSchema(
  faqs: FAQ[]
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

/**
 * Generates a BlogPosting JSON-LD schema for individual blog post pages.
 * Inject via <SchemaScript schema={generateBlogPostSchema(post, clientConfig)} />
 *
 * TODO: Plan 02 replaces with full implementation (author, datePublished, etc.)
 */
export function generateBlogPostSchema(
  post: BlogPost,
  config: WaxingClientConfig
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    url: `${config.siteUrl}/blog/${post.slug}`,
    author: {
      "@type": "Person",
      name: post.author,
    },
    publisher: {
      "@type": ["LocalBusiness", "BeautyBusiness"],
      name: config.name,
      url: config.siteUrl,
    },
    datePublished: post.date,
    image: post.image.startsWith("http") ? post.image : `${config.siteUrl}${post.image}`,
  };
}

/**
 * Generates a LocalBusiness/BeautyBusiness JSON-LD schema for service area pages.
 * Inject via <SchemaScript schema={generateServiceAreaSchema(area, clientConfig)} />
 *
 * TODO: Plan 02 replaces with full implementation (areaServed, address, etc.)
 */
export function generateServiceAreaSchema(
  area: ServiceArea,
  config: WaxingClientConfig
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "BeautyBusiness"],
    name: config.name,
    url: `${config.siteUrl}/service-areas/${area.slug}`,
    areaServed: {
      "@type": "City",
      name: area.city,
      addressRegion: area.state,
    },
  };
}

function convertTo24Hour(time: string): string {
  // Converts "10:00 AM" → "10:00", "7:00 PM" → "19:00"
  const [timePart, period] = time.split(" ");
  const [hours, minutes] = timePart.split(":").map(Number);
  const h =
    period === "PM" && hours !== 12
      ? hours + 12
      : period === "AM" && hours === 12
      ? 0
      : hours;
  return `${String(h).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
}
