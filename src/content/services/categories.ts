import type { ServiceCategory } from "@/lib/types";
import { faceServices } from "./face";
import { bodyServices } from "./body";
import { intimateServices } from "./intimate";
import { packageServices } from "./packages";

// ---------------------------------------------------------------------------
// Service Categories — serviceSlugs derived from actual service arrays
// ---------------------------------------------------------------------------

export const serviceCategories: ServiceCategory[] = [
  {
    slug: "face",
    name: "Face Waxing",
    tagline: "Precision shaping for brows, lips, and beyond",
    description:
      "Our face waxing services use a gentle honey-based hard wax designed specifically for delicate facial skin. Whether you want perfectly arched brows or a smooth, hair-free complexion, we take our time to get every detail right.",
    coverImage: "/images/categories/face.jpg",
    iconName: "sparkles",
    serviceSlugs: faceServices.map((s) => s.slug),
  },
  {
    slug: "body",
    name: "Body Waxing",
    tagline: "Smooth skin from shoulders to toes",
    description:
      "From underarms to full legs, our body waxing services leave your skin silky smooth for weeks. Our honey-based formula is gentle enough for sensitive areas and effective enough for coarser hair — so you get clean results without the irritation.",
    coverImage: "/images/categories/body.jpg",
    iconName: "leaf",
    serviceSlugs: bodyServices.map((s) => s.slug),
  },
  {
    slug: "intimate",
    name: "Intimate Waxing",
    tagline: "Comfortable, private, and always judgment-free",
    description:
      "Our intimate waxing services are designed with your comfort as the top priority. We talk you through every step, use hard wax that grips hair without pulling skin, and keep the experience as quick and painless as possible — especially if it's your first time.",
    coverImage: "/images/categories/intimate.jpg",
    iconName: "shield",
    serviceSlugs: intimateServices.map((s) => s.slug),
  },
  {
    slug: "packages",
    name: "Packages",
    tagline: "Bundle and save on your favorite services",
    description:
      "Our waxing packages combine popular services at a discounted rate. Whether you're a first-timer looking for a gentle introduction or a regular who wants the full experience, there's a package that fits.",
    coverImage: "/images/categories/packages.jpg",
    iconName: "gift",
    serviceSlugs: packageServices.map((s) => s.slug),
  },
];
