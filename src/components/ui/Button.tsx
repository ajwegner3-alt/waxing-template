"use client";
import React from "react";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonBaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: React.ReactNode;
}

interface ButtonAsButton extends ButtonBaseProps {
  href?: undefined;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  "aria-label"?: string;
}

interface ButtonAsLink extends ButtonBaseProps {
  href: string;
  target?: string;
  rel?: string;
  "aria-label"?: string;
}

type ButtonProps = ButtonAsButton | ButtonAsLink;

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-brand-primary text-white hover:bg-brand-primary-dark active:bg-brand-primary-dark",
  secondary: "bg-brand-secondary text-white hover:bg-brand-secondary-light active:bg-brand-secondary-light",
  outline: "border-2 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white",
  ghost: "text-brand-primary hover:bg-brand-primary/10",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

// rounded-xl (12px) per CONTEXT.md — 12-16px softly rounded, more structured than full pills
const baseClasses =
  "rounded-xl font-semibold transition-colors duration-200 inline-flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed";

export function Button(props: ButtonProps) {
  const { variant = "primary", size = "md", className = "", children } = props;
  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  if (props.href !== undefined) {
    const { href, target, rel, "aria-label": ariaLabel } = props as ButtonAsLink;
    return (
      <a href={href} target={target} rel={rel} aria-label={ariaLabel} className={classes}>
        {children}
      </a>
    );
  }

  const { onClick, type = "button", disabled, "aria-label": ariaLabel } = props as ButtonAsButton;
  return (
    <button type={type} onClick={onClick} disabled={disabled} aria-label={ariaLabel} className={classes}>
      {children}
    </button>
  );
}
