/**
 * HygieneProtocols — Icon checklist of sanitation practices.
 *
 * Server Component — no "use client".
 * 6 items with inline SVG checkmarks. Max-w-3xl centered column.
 * Addresses hygiene anxiety — a key concern for first-time waxing clients.
 */

import React from "react";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { FadeUp } from "@/components/ui/FadeUp";

// Checkmark circle icon
function CheckIcon({ className }: { className?: string }) {
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
        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

interface ProtocolItem {
  title: string;
  detail: string;
}

const protocols: ProtocolItem[] = [
  {
    title: "Single-use applicators only",
    detail:
      "Every wax applicator is used once and discarded. Double-dipping is never practiced — period.",
  },
  {
    title: "Fresh wax for every client",
    detail:
      "Wax pots are never shared between clients. Each appointment uses a dedicated, freshly prepared wax supply.",
  },
  {
    title: "Hospital-grade surface sanitization",
    detail:
      "All surfaces and equipment are cleaned with hospital-grade disinfectant between every appointment.",
  },
  {
    title: "Disposable gloves throughout",
    detail:
      "Fresh gloves are worn for every service and changed any time cross-contamination is a risk.",
  },
  {
    title: "Fresh linens every appointment",
    detail:
      "Disposable table paper and freshly laundered linens are used for every client — no exceptions.",
  },
  {
    title: "Licensed and insured",
    detail:
      "All services are performed by a Nebraska-licensed esthetician. Fully insured, compliant with state board standards.",
  },
];

export function HygieneProtocols() {
  return (
    <SectionWrapper bg="white" padding="md">
      <div className="max-w-3xl mx-auto">
        <FadeUp>
          <div className="mb-8">
            <h2 className="font-heading text-2xl lg:text-3xl font-semibold text-brand-dark mb-3">
              Our Hygiene Standards
            </h2>
            <p className="text-brand-dark/65 leading-relaxed">
              Cleanliness isn&apos;t a selling point — it&apos;s a baseline. Here&apos;s exactly
              what we do before, during, and after every appointment to keep you safe.
            </p>
          </div>
        </FadeUp>

        {/* Protocol checklist */}
        <div className="space-y-4">
          {protocols.map((protocol, i) => (
            <FadeUp key={i} delay={i * 0.07}>
              <div className="flex items-start gap-4 p-5 rounded-xl bg-brand-light/50 border border-brand-secondary/10">
                {/* Checkmark */}
                <div className="flex-shrink-0 mt-0.5">
                  <CheckIcon className="w-5 h-5 text-brand-secondary" />
                </div>

                {/* Text */}
                <div>
                  <p className="font-semibold text-brand-dark text-sm mb-0.5">
                    {protocol.title}
                  </p>
                  <p className="text-brand-dark/60 text-sm leading-relaxed">
                    {protocol.detail}
                  </p>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
