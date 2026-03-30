const NEVER_USE = [
  "No parabens",
  "No harsh chemicals",
  "No synthetic fragrances",
  "No rosin-based wax",
];

interface IngredientCalloutProps {
  ingredients: string[];
}

function LeafOutlineIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      width="18"
      height="18"
      aria-hidden="true"
    >
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
    </svg>
  );
}

function XMarkIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      width="14"
      height="14"
      aria-hidden="true"
    >
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

/**
 * IngredientCallout — Server Component
 *
 * Callout box listing what ingredients the studio uses + what it never uses.
 * Returns null when ingredients array is empty.
 */
export function IngredientCallout({ ingredients }: IngredientCalloutProps) {
  if (ingredients.length === 0) return null;

  return (
    <section className="bg-brand-secondary/8 rounded-2xl p-6 md:p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* What We Use */}
        <div>
          <h3 className="flex items-center gap-2 text-lg font-semibold text-brand-dark mb-4">
            <span className="text-brand-secondary">
              <LeafOutlineIcon />
            </span>
            What We Use
          </h3>
          <ul className="space-y-2">
            {ingredients.map((ingredient) => (
              <li
                key={ingredient}
                className="flex items-start gap-2 text-sm text-brand-dark/80"
              >
                <span className="mt-0.5 shrink-0 w-4 h-4 rounded-full bg-brand-secondary/20 text-brand-secondary flex items-center justify-center text-[10px] font-bold">
                  ✓
                </span>
                {ingredient}
              </li>
            ))}
          </ul>
        </div>

        {/* What We Never Use */}
        <div>
          <h3 className="text-lg font-semibold text-brand-dark mb-4">
            What We Never Use
          </h3>
          <ul className="space-y-2">
            {NEVER_USE.map((item) => (
              <li
                key={item}
                className="flex items-center gap-2 text-sm text-brand-dark/50"
              >
                <span className="shrink-0 text-rose-400">
                  <XMarkIcon />
                </span>
                <span className="line-through decoration-brand-dark/30">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
