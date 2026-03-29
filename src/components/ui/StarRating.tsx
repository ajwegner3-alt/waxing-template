// src/components/ui/StarRating.tsx
// Visual star rating display from a numeric rating value.
// Uses inline SVG stars (not emoji or text) for consistent cross-platform rendering.
// Filled stars use brand-gold token — the honey gold palette in the waxing template.

import React from "react";

type StarSize = "sm" | "md" | "lg";

interface StarRatingProps {
  rating: number;
  max?: number;
  size?: StarSize;
  showValue?: boolean;
  reviewCount?: number;
  className?: string;
}

const sizePx: Record<StarSize, number> = {
  sm: 16,
  md: 20,
  lg: 24,
};

// 5-point star SVG path
function Star({
  fill,
  px,
}: {
  fill: "full" | "half" | "empty";
  px: number;
}) {
  const id = `half-${Math.random().toString(36).slice(2, 7)}`;

  if (fill === "full") {
    return (
      <svg
        width={px}
        height={px}
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
        className="text-brand-gold"
      >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    );
  }

  if (fill === "half") {
    return (
      <svg
        width={px}
        height={px}
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={id}>
            <stop offset="50%" stopColor="currentColor" className="text-brand-gold" />
            <stop offset="50%" stopColor="currentColor" className="text-gray-300" />
          </linearGradient>
        </defs>
        <path
          d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
          fill={`url(#${id})`}
        />
      </svg>
    );
  }

  // empty
  return (
    <svg
      width={px}
      height={px}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className="text-gray-300"
    >
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

function getStarFills(
  rating: number,
  maxStars: number
): Array<"full" | "half" | "empty"> {
  return Array.from({ length: maxStars }, (_, i) => {
    const starNumber = i + 1;
    if (rating >= starNumber) return "full";
    if (rating >= starNumber - 0.5) return "half";
    return "empty";
  });
}

export function StarRating({
  rating,
  max = 5,
  size = "md",
  showValue = false,
  reviewCount,
  className = "",
}: StarRatingProps) {
  const px = sizePx[size];
  const fills = getStarFills(rating, max);
  const ariaLabel = `${rating} out of ${max} stars${reviewCount ? `, ${reviewCount} reviews` : ""}`;

  return (
    <div
      className={`inline-flex flex-wrap items-center gap-1 ${className}`}
      role="img"
      aria-label={ariaLabel}
    >
      <div className="flex items-center gap-0.5">
        {fills.map((fill, i) => (
          <Star key={i} fill={fill} px={px} />
        ))}
      </div>
      {showValue && (
        <span className="font-semibold text-brand-dark ml-1">{rating.toFixed(1)}</span>
      )}
      {reviewCount !== undefined && (
        <span className="text-gray-500 text-sm">({reviewCount.toLocaleString()} reviews)</span>
      )}
    </div>
  );
}
