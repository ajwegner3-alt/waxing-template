"use client";

import { useEffect, useRef, useState } from "react";
import type { ServiceCategory } from "@/lib/types";

interface CategoryPillsProps {
  categories: ServiceCategory[];
}

/**
 * CategoryPills — Client Component
 *
 * Sticky pill bar below the header. One pill per category.
 * Clicking a pill smooth-scrolls to the corresponding section anchor.
 *
 * IntersectionObserver tracks which section is currently in view and
 * highlights the matching pill as the user scrolls.
 *
 * Import: `motion/react` (NOT framer-motion) — locked convention.
 * Note: motion/react not needed here since pills don't animate;
 * the sticky bar itself is plain CSS.
 */
export function CategoryPills({ categories }: CategoryPillsProps) {
  const [activeSlug, setActiveSlug] = useState<string>(
    categories[0]?.slug ?? ""
  );
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Clean up any previous observer
    observerRef.current?.disconnect();

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the first entry that is intersecting — topmost visible section
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const slug = entry.target.id.replace("category-", "");
            setActiveSlug(slug);
            break;
          }
        }
      },
      {
        threshold: 0.2,
        rootMargin: "-80px 0px -60% 0px",
      }
    );

    observerRef.current = observer;

    // Observe each category section
    categories.forEach(({ slug }) => {
      const el = document.getElementById(`category-${slug}`);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [categories]);

  function scrollToCategory(slug: string) {
    const el = document.getElementById(`category-${slug}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
    setActiveSlug(slug);
  }

  return (
    <div className="sticky top-16 lg:top-20 z-30 bg-white/95 backdrop-blur-sm border-b border-brand-primary/10">
      <div
        className="overflow-x-auto scrollbar-hide flex gap-2 px-4 py-3 max-w-7xl mx-auto"
        role="navigation"
        aria-label="Service categories"
      >
        {categories.map((category) => {
          const isActive = activeSlug === category.slug;
          return (
            <button
              key={category.slug}
              onClick={() => scrollToCategory(category.slug)}
              className={`shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-colors duration-200 ${
                isActive
                  ? "bg-brand-primary text-white"
                  : "bg-brand-light text-brand-dark hover:bg-brand-primary/10"
              }`}
              aria-current={isActive ? "true" : undefined}
            >
              {category.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}
