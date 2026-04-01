// EstheticianStep — no "use client" needed (child of BookingFlow client boundary)
// Renders the auto-selected Maya Chen profile card for booking step 2.

import type { Staff } from "@/lib/types";

interface EstheticianStepProps {
  esthetician: Staff;
}

export function EstheticianStep({ esthetician }: EstheticianStepProps) {
  // Initials for the headshot placeholder
  const initials = esthetician.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  return (
    <div>
      <div className="mb-6">
        <h2 className="font-heading text-2xl font-bold text-brand-dark">
          You&rsquo;ll be in great hands
        </h2>
        <p className="text-brand-dark/60 mt-1">
          Every appointment at Honey &amp; Bloom is with Maya — she handles all
          bookings personally so every client gets the same attentive care.
        </p>
      </div>

      {/* Profile card */}
      <div className="bg-white rounded-2xl border border-brand-dark/10 p-6 shadow-sm max-w-lg">
        <div className="flex items-start gap-5">
          {/* Headshot placeholder — same pattern as Phase 6 EstheticianProfile */}
          <div
            className="w-20 h-20 rounded-full bg-brand-primary/10 flex items-center justify-center flex-shrink-0"
            aria-hidden="true"
          >
            <span className="text-xl font-semibold text-brand-primary">
              {initials}
            </span>
          </div>

          {/* Info column */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h3 className="font-heading text-xl font-bold text-brand-dark">
                {esthetician.name}
              </h3>
              {/* "Selected" badge */}
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-50 border border-green-200 text-green-700 text-xs font-semibold">
                <svg viewBox="0 0 10 8" fill="none" className="w-2.5 h-2.5" aria-hidden="true">
                  <path
                    d="M1 4l3 3 5-6"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Your esthetician
              </span>
            </div>
            <p className="text-sm text-brand-dark/60 mb-3">{esthetician.title}</p>

            {/* Specialties */}
            <div className="flex flex-wrap gap-1.5 mb-3">
              {esthetician.specialties.map((specialty) => (
                <span
                  key={specialty}
                  className="px-2.5 py-1 rounded-lg bg-brand-light text-brand-dark/70 text-xs font-medium"
                >
                  {specialty}
                </span>
              ))}
            </div>

            {/* Years + certifications */}
            <p className="text-sm text-brand-dark/60 mb-2">
              <span className="font-semibold text-brand-dark">
                {esthetician.yearsExperience} years
              </span>{" "}
              of esthetics experience
            </p>

            <ul className="space-y-0.5">
              {esthetician.certifications.map((cert) => (
                <li
                  key={cert}
                  className="text-xs text-brand-dark/50 flex items-center gap-1.5"
                >
                  <span className="w-1 h-1 rounded-full bg-brand-primary/50 flex-shrink-0" aria-hidden="true" />
                  {cert}
                </li>
              ))}
            </ul>

            {/* Bio excerpt */}
            <p className="text-sm text-brand-dark/70 mt-3 leading-relaxed line-clamp-3">
              {esthetician.bio[0]}
            </p>
          </div>
        </div>

        {/* Accepting new clients badge */}
        {esthetician.acceptingNewClients && (
          <div className="mt-4 pt-4 border-t border-brand-dark/10 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 flex-shrink-0" aria-hidden="true" />
            <span className="text-xs font-medium text-green-700">
              Currently accepting new clients
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
