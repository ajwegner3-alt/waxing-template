// No "use client" — inherits client boundary from BookingFlow parent

import type { Service, Staff } from "@/lib/types";
import { clientConfig } from "@/content/client.config";
import { BookingLink } from "@/components/ui/BookingLink";

interface ConfirmationStepProps {
  services: Service[];
  selectedSlugs: string[];
  esthetician: Staff;
  date: string;
  time: string;
}

function formatDate(dateStr: string): string {
  // Parse "YYYY-MM-DD" without timezone shift by treating as local midnight
  const [year, month, day] = dateStr.split("-").map(Number);
  const d = new Date(year, month - 1, day);
  return d.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// ---------------------------------------------------------------------------
// Inline SVG icons
// ---------------------------------------------------------------------------

function CalendarIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className="w-5 h-5 flex-shrink-0 text-brand-primary"
    >
      <path
        fillRule="evenodd"
        d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className="w-5 h-5 flex-shrink-0 text-brand-primary"
    >
      <path
        fillRule="evenodd"
        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function PersonIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className="w-5 h-5 flex-shrink-0 text-brand-primary"
    >
      <path
        fillRule="evenodd"
        d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className="w-5 h-5 flex-shrink-0 text-brand-primary mt-0.5"
    >
      <path
        fillRule="evenodd"
        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75S21.75 6.615 21.75 12 17.385 21.75 12 21.75 2.25 17.385 2.25 12Zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 0 1 .67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 1 1-.67-1.34l.04-.022ZM12 9a.75.75 0 1 0 0-1.5A.75.75 0 0 0 12 9Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function ConfirmationStep({
  services,
  selectedSlugs,
  esthetician,
  date,
  time,
}: ConfirmationStepProps) {
  const selectedServices = services.filter((s) => selectedSlugs.includes(s.slug));
  const runningTotal = selectedServices.reduce((sum, s) => sum + (s.price ?? 0), 0);
  const prepReminders = [...new Set(selectedServices.flatMap((s) => s.preparation))];
  const formattedDate = formatDate(date);

  return (
    <div className="py-6 space-y-6">
      {/* Heading */}
      <div>
        <h2 className="font-heading text-2xl font-bold text-brand-dark mb-1">
          Your appointment summary
        </h2>
        <p className="text-brand-dark/60 text-base">Here&apos;s what we have for you</p>
      </div>

      {/* Services list */}
      <div className="bg-white rounded-2xl border border-brand-dark/10 p-6">
        <h3 className="font-semibold text-brand-dark mb-4 text-sm uppercase tracking-wide">
          Services
        </h3>
        <ul className="space-y-3">
          {selectedServices.map((service) => (
            <li key={service.slug} className="flex items-center justify-between">
              <span className="text-brand-dark">{service.name}</span>
              <span className="font-medium text-brand-dark">
                {service.price !== null ? `$${service.price}` : service.priceDisplay}
              </span>
            </li>
          ))}
        </ul>
        {selectedServices.length > 1 && (
          <div className="mt-4 pt-4 border-t border-brand-dark/10 flex justify-between">
            <span className="font-semibold text-brand-dark">Total</span>
            <span className="font-bold text-brand-dark text-lg">${runningTotal}</span>
          </div>
        )}
      </div>

      {/* Appointment details */}
      <div className="bg-white rounded-2xl border border-brand-dark/10 p-6">
        <h3 className="font-semibold text-brand-dark mb-4 text-sm uppercase tracking-wide">
          Appointment details
        </h3>
        <ul className="space-y-3">
          <li className="flex items-center gap-3 text-brand-dark">
            <CalendarIcon />
            <span>{formattedDate}</span>
          </li>
          <li className="flex items-center gap-3 text-brand-dark">
            <ClockIcon />
            <span>{time}</span>
          </li>
          <li className="flex items-center gap-3 text-brand-dark">
            <PersonIcon />
            <span>
              {esthetician.name}
              <span className="text-brand-dark/50 ml-1 text-sm">— {esthetician.title}</span>
            </span>
          </li>
        </ul>
      </div>

      {/* Prep reminders */}
      {prepReminders.length > 0 && (
        <div className="bg-white rounded-2xl border border-brand-dark/10 p-6">
          <h3 className="font-semibold text-brand-dark mb-4 text-sm uppercase tracking-wide">
            How to prepare
          </h3>
          <ol className="space-y-3">
            {prepReminders.map((reminder, index) => (
              <li key={index} className="flex items-start gap-3">
                <span
                  className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-primary/15 text-brand-primary text-xs font-bold flex items-center justify-center mt-0.5"
                  aria-hidden="true"
                >
                  {index + 1}
                </span>
                <span className="text-brand-dark/80 text-sm leading-relaxed">{reminder}</span>
              </li>
            ))}
          </ol>
        </div>
      )}

      {/* Cancellation policy */}
      <div className="bg-brand-light rounded-2xl p-6 flex items-start gap-3">
        <InfoIcon />
        <div>
          <h3 className="font-semibold text-brand-dark mb-2">Cancellation policy</h3>
          <p className="text-brand-dark/70 text-sm leading-relaxed">
            We ask for at least 24 hours&apos; notice if you need to cancel or reschedule. Late
            cancellations (under 24 hours) may incur a $15 fee. Life happens — just let us know
            as early as you can!
          </p>
        </div>
      </div>

      {/* Warm handoff */}
      <div className="bg-white rounded-2xl border border-brand-dark/10 p-6 text-center">
        <h3 className="font-heading text-xl font-bold text-brand-dark mb-2">Almost done!</h3>
        <p className="text-brand-dark/60 text-sm mb-6 max-w-sm mx-auto leading-relaxed">
          Click below to confirm your appointment on our secure booking system. You&apos;ll be
          able to finalize the details there.
        </p>
        <BookingLink variant="cta" externalHref={clientConfig.bookingUrl}>
          Confirm &amp; Book
        </BookingLink>
      </div>
    </div>
  );
}
