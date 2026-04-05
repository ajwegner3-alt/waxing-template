import type { FAQ } from "@/lib/types";

interface FAQAccordionProps {
  faqs: FAQ[];
}

/**
 * FAQAccordion — Server Component
 *
 * Accessible accordion using native <details>/<summary> HTML elements.
 * No "use client" needed — browser handles expand/collapse natively.
 * Chevron rotates on open state via group-open:rotate-180 Tailwind class.
 *
 * Returns null when faqs array is empty.
 */
export function FAQAccordion({ faqs }: FAQAccordionProps) {
  if (faqs.length === 0) return null;

  return (
    <div className="space-y-3">
      {faqs.map((faq, index) => (
        <details
          key={index}
          className="group border border-brand-primary/10 rounded-2xl overflow-hidden shadow-warm"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between px-6 py-5 text-brand-dark hover:bg-brand-light/40 transition-colors duration-200 [&::-webkit-details-marker]:hidden">
            <span className="font-medium text-base leading-snug pr-4">
              {faq.question}
            </span>
            {/* Chevron — rotates to 180deg when details is open */}
            <span className="shrink-0 text-brand-primary/60 group-open:rotate-180 transition-transform duration-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                width="18"
                height="18"
                aria-hidden="true"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </span>
          </summary>
          <div className="px-6 pb-5 pt-1 text-brand-dark/65 text-sm leading-[1.7] border-t border-brand-primary/8">
            {faq.answer}
          </div>
        </details>
      ))}
    </div>
  );
}
