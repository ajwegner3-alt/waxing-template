import type { Service, ServiceCategory } from "@/lib/types";
import { faceServices, FACE_SLUGS } from "./face";
import { bodyServices, BODY_SLUGS } from "./body";
import { intimateServices, INTIMATE_SLUGS } from "./intimate";
import { packageServices, PACKAGE_SLUGS } from "./packages";
import { serviceCategories } from "./categories";

// ---------------------------------------------------------------------------
// All Services — merged from category arrays
// ---------------------------------------------------------------------------

export const allServices: Service[] = [
  ...faceServices,
  ...bodyServices,
  ...intimateServices,
  ...packageServices,
];

// ---------------------------------------------------------------------------
// Accessor Functions — downstream pages import these
// ---------------------------------------------------------------------------

export function getServiceBySlug(slug: string): Service | undefined {
  return allServices.find((s) => s.slug === slug);
}

export function getServicesByCategory(categorySlug: string): Service[] {
  return allServices.filter((s) => s.categorySlug === categorySlug);
}

export function getCategoryBySlug(
  slug: string,
): ServiceCategory | undefined {
  return serviceCategories.find((c) => c.slug === slug);
}

// ---------------------------------------------------------------------------
// Re-exports — for pages that need direct access
// ---------------------------------------------------------------------------

export {
  faceServices,
  bodyServices,
  intimateServices,
  packageServices,
  serviceCategories,
  FACE_SLUGS,
  BODY_SLUGS,
  INTIMATE_SLUGS,
  PACKAGE_SLUGS,
};
