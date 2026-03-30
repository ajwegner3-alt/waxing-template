import type { PainLevel } from "@/lib/types";

interface PainLevelBadgeProps {
  painLevel: PainLevel;
  sensitiveSkintSafe: boolean;
}

// --- Pain level config ---
const painConfig: Record<
  PainLevel,
  { label: string; bgClass: string; textClass: string; icon: "leaf" | "flame" }
> = {
  1: { label: "Very Gentle", bgClass: "bg-brand-secondary/15", textClass: "text-brand-secondary", icon: "leaf" },
  2: { label: "Gentle",      bgClass: "bg-brand-secondary/15", textClass: "text-brand-secondary", icon: "leaf" },
  3: { label: "Moderate",    bgClass: "bg-amber-100",          textClass: "text-amber-700",        icon: "flame" },
  4: { label: "Intense",     bgClass: "bg-rose-100",           textClass: "text-rose-600",         icon: "flame" },
  5: { label: "Very Intense",bgClass: "bg-rose-100",           textClass: "text-rose-600",         icon: "flame" },
};

function LeafIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      width="14"
      height="14"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-2.625 6c-.54 0-.828.419-.936.634a1.96 1.96 0 0 0-.189.866c0 .298.059.605.189.866.108.215.395.634.936.634.54 0 .828-.419.936-.634.13-.26.189-.568.189-.866 0-.298-.059-.605-.189-.866-.108-.215-.395-.634-.936-.634Zm4.314.634c.108-.215.395-.634.936-.634.54 0 .828.419.936.634.13.26.189.568.189.866 0 .298-.059.605-.189.866-.108.215-.395.634-.936.634-.54 0-.828-.419-.936-.634a1.96 1.96 0 0 1-.189-.866c0-.298.059-.605.189-.866Zm2.023 6.828a.75.75 0 1 0-1.06-1.06 3.75 3.75 0 0 1-5.304 0 .75.75 0 0 0-1.06 1.06 5.25 5.25 0 0 0 7.424 0Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function FlameIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      width="14"
      height="14"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M12.963 2.286a.75.75 0 0 0-1.071-.136 9.742 9.742 0 0 0-3.539 6.176 7.547 7.547 0 0 1-1.705-1.715.75.75 0 0 0-1.152-.082A9 9 0 1 0 15.68 4.534a7.46 7.46 0 0 1-2.717-2.248ZM15.75 14.25a3.75 3.75 0 1 1-7.313-1.172c.628.465 1.35.81 2.133 1a5.99 5.99 0 0 1 1.925-3.545 3.75 3.75 0 0 1 3.255 3.717Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function ShieldCheckIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      width="14"
      height="14"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M12.516 2.17a.75.75 0 0 0-1.032 0 11.209 11.209 0 0 1-7.877 3.08.75.75 0 0 0-.722.515A12.74 12.74 0 0 0 2.25 9.75c0 5.942 4.064 10.933 9.563 12.348a.749.749 0 0 0 .374 0c5.499-1.415 9.563-6.406 9.563-12.348 0-1.39-.223-2.73-.635-3.985a.75.75 0 0 0-.722-.516l-.143.001c-2.996 0-5.717-1.17-7.734-3.08Zm3.094 8.016a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

/**
 * PainLevelBadge — Server Component
 *
 * Displays a horizontal row of pills:
 * - Pain level pill: green (1–2), amber (3), rose (4–5)
 * - Sensitive Skin Safe pill: shown only when sensitiveSkintSafe is true
 */
export function PainLevelBadge({ painLevel, sensitiveSkintSafe }: PainLevelBadgeProps) {
  const config = painConfig[painLevel];

  return (
    <div className="flex flex-wrap items-center gap-2">
      {/* Pain level pill */}
      <span
        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${config.bgClass} ${config.textClass}`}
      >
        {config.icon === "leaf" ? <LeafIcon /> : <FlameIcon />}
        {config.label}
      </span>

      {/* Sensitive skin pill — conditional */}
      {sensitiveSkintSafe && (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium bg-brand-secondary/15 text-brand-secondary">
          <ShieldCheckIcon />
          Sensitive Skin Safe
        </span>
      )}
    </div>
  );
}
