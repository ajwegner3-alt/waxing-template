// ProgressIndicator — no "use client" needed (child of BookingFlow client boundary)
// Receives currentStep as prop and renders numbered circles + connecting lines.

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps?: number;
}

const STEP_LABELS = ["Date & Time", "Services", "Confirm"];

export function ProgressIndicator({
  currentStep,
  totalSteps = 3,
}: ProgressIndicatorProps) {
  return (
    <div
      className="flex items-center mb-8"
      role="list"
      aria-label="Booking progress"
    >
      {STEP_LABELS.slice(0, totalSteps).map((label, i) => {
        const stepNum = i + 1;
        const isCompleted = stepNum < currentStep;
        const isCurrent = stepNum === currentStep;

        return (
          <div
            key={stepNum}
            className="flex items-center flex-1 last:flex-none"
            role="listitem"
          >
            {/* Circle + label */}
            <div className="flex flex-col items-center gap-1">
              <div
                className={[
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold border-2 transition-colors duration-300",
                  isCompleted
                    ? "bg-brand-primary border-brand-primary text-white"
                    : isCurrent
                      ? "bg-white border-brand-primary text-brand-primary"
                      : "bg-white border-brand-dark/20 text-brand-dark/40",
                ].join(" ")}
                aria-current={isCurrent ? "step" : undefined}
              >
                {isCompleted ? (
                  /* Checkmark SVG */
                  <svg viewBox="0 0 10 8" fill="none" className="w-3 h-3" aria-hidden="true">
                    <path
                      d="M1 4l3 3 5-6"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  stepNum
                )}
              </div>
              <span
                className={[
                  "text-xs font-medium hidden sm:block",
                  isCurrent ? "text-brand-primary" : "text-brand-dark/40",
                ].join(" ")}
              >
                {label}
              </span>
            </div>

            {/* Connector line — not rendered after the last step */}
            {stepNum < totalSteps && (
              <div
                className={[
                  "flex-1 h-0.5 mx-2 transition-colors duration-300",
                  isCompleted ? "bg-brand-primary" : "bg-brand-dark/15",
                ].join(" ")}
                aria-hidden="true"
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
