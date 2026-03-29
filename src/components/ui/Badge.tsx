import React from "react";

type BadgeVariant = "trust" | "urgency" | "info";

interface BadgeProps {
  variant?: BadgeVariant;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  trust: "bg-brand-secondary/10 text-brand-secondary",
  urgency: "bg-brand-urgency text-amber-800",
  info: "bg-gray-100 text-gray-700",
};

export function Badge({
  variant = "info",
  icon,
  children,
  className = "",
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${variantClasses[variant]} ${className}`}
    >
      {icon && (
        <span className="flex-shrink-0" aria-hidden="true">
          {icon}
        </span>
      )}
      {children}
    </span>
  );
}
