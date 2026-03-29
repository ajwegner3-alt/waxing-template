import React from "react";

type SectionAs = "section" | "div" | "aside";
// "blush" added for waxing template — softer 60% blush variant for alternating sections
type SectionBg = "white" | "light" | "dark" | "primary" | "blush";
type SectionPadding = "sm" | "md" | "lg";

interface SectionWrapperProps {
  as?: SectionAs;
  bg?: SectionBg;
  padding?: SectionPadding;
  className?: string;
  innerClassName?: string;
  children: React.ReactNode;
  id?: string;
}

const bgClasses: Record<SectionBg, string> = {
  white: "bg-white",
  light: "bg-brand-light",               // full blush cream (#FAF3EF)
  dark: "bg-brand-dark text-white",      // charcoal dark sections (#333333)
  primary: "bg-brand-primary text-white", // honey gold sections (#D4A574)
  blush: "bg-brand-light/60",            // softer 60% blush for alternating sections
};

const paddingClasses: Record<SectionPadding, string> = {
  sm: "py-8",
  md: "py-12 lg:py-16",
  lg: "py-16 lg:py-24",
};

export function SectionWrapper({
  as: Tag = "section",
  bg = "white",
  padding = "md",
  className = "",
  innerClassName = "",
  children,
  id,
}: SectionWrapperProps) {
  return (
    <Tag
      id={id}
      className={`${bgClasses[bg]} ${paddingClasses[padding]} ${className}`}
    >
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${innerClassName}`}>
        {children}
      </div>
    </Tag>
  );
}
