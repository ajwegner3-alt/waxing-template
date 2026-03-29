import React from "react";

interface PhoneLinkProps {
  phone: string;
  className?: string;
  children?: React.ReactNode;
  variant?: "header" | "cta" | "inline";
}

function formatPhoneHref(phone: string): string {
  return phone.replace(/\D/g, "");
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path
        fillRule="evenodd"
        d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export function PhoneLink({
  phone,
  className = "",
  children,
  variant = "inline",
}: PhoneLinkProps) {
  const href = `tel:${formatPhoneHref(phone)}`;
  const displayText = children ?? phone;
  const baseClasses = "inline-flex items-center justify-center min-w-[48px] min-h-[48px]";
  const variantClasses = {
    header:
      "gap-2 text-white no-underline font-semibold hover:text-white/80 transition-colors duration-200",
    cta: "gap-2 bg-brand-primary text-white rounded-xl px-6 py-3 font-bold hover:bg-brand-primary-dark transition-colors duration-200 shadow-md",
    inline:
      "text-brand-primary underline-offset-2 hover:underline hover:text-brand-primary-dark transition-colors duration-200",
  };

  return (
    <a href={href} className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      {variant === "header" && <PhoneIcon className="w-5 h-5 flex-shrink-0" />}
      {variant === "cta" && <PhoneIcon className="w-5 h-5 flex-shrink-0" />}
      <span>{displayText}</span>
    </a>
  );
}
