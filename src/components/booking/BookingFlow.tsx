"use client";

import { useReducer } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { Service, Staff } from "@/lib/types";
import { ProgressIndicator } from "./ProgressIndicator";
import { ServiceSelector } from "./ServiceSelector";
import { DateTimePicker } from "./DateTimePicker";
import { ConfirmationStep } from "./ConfirmationStep";

// ---------------------------------------------------------------------------
// State machine types
// ---------------------------------------------------------------------------

type Step = 1 | 2 | 3;

interface BookingState {
  step: Step;
  selectedServiceSlugs: string[];
  selectedDate: string | null;
  selectedTime: string | null;
}

type BookingAction =
  | { type: "NEXT_STEP" }
  | { type: "PREV_STEP" }
  | { type: "TOGGLE_SERVICE"; slug: string }
  | { type: "SELECT_DATE"; date: string }
  | { type: "SELECT_TIME"; time: string };

function bookingReducer(state: BookingState, action: BookingAction): BookingState {
  switch (action.type) {
    case "NEXT_STEP":
      return { ...state, step: Math.min(3, state.step + 1) as Step };
    case "PREV_STEP":
      return { ...state, step: Math.max(1, state.step - 1) as Step };
    case "TOGGLE_SERVICE":
      return {
        ...state,
        selectedServiceSlugs: state.selectedServiceSlugs.includes(action.slug)
          ? state.selectedServiceSlugs.filter((s) => s !== action.slug)
          : [...state.selectedServiceSlugs, action.slug],
      };
    case "SELECT_DATE":
      return { ...state, selectedDate: action.date, selectedTime: null };
    case "SELECT_TIME":
      return { ...state, selectedTime: action.time };
    default:
      return state;
  }
}

const INITIAL_STATE: BookingState = {
  step: 1,
  selectedServiceSlugs: [],
  selectedDate: null,
  selectedTime: null,
};

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

interface BookingFlowProps {
  services: Service[];
  esthetician: Staff;
}

// ---------------------------------------------------------------------------
// Component
//
// Step order:
//   1 — Date & Time  (user sees calendar immediately on drawer open)
//   2 — Services     (pick what they need)
//   3 — Confirm      (review + external handoff)
//
// EstheticianStep removed — single esthetician, no choice to make.
// ---------------------------------------------------------------------------

export function BookingFlow({ services, esthetician }: BookingFlowProps) {
  const [state, dispatch] = useReducer(bookingReducer, INITIAL_STATE);

  const canContinue =
    (state.step === 1 && state.selectedDate !== null && state.selectedTime !== null) ||
    (state.step === 2 && state.selectedServiceSlugs.length > 0) ||
    state.step === 3;

  return (
    <div className="px-5 py-6 pb-10">
      <ProgressIndicator currentStep={state.step} />

      <AnimatePresence mode="wait">
        <motion.div
          key={`step-${state.step}`}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          {state.step === 1 && (
            <DateTimePicker
              selectedDate={state.selectedDate}
              selectedTime={state.selectedTime}
              onSelectDate={(date: string) => dispatch({ type: "SELECT_DATE", date })}
              onSelectTime={(time: string) => dispatch({ type: "SELECT_TIME", time })}
            />
          )}
          {state.step === 2 && (
            <ServiceSelector
              services={services}
              selectedSlugs={state.selectedServiceSlugs}
              onToggle={(slug) => dispatch({ type: "TOGGLE_SERVICE", slug })}
            />
          )}
          {state.step === 3 && (
            <ConfirmationStep
              services={services}
              selectedSlugs={state.selectedServiceSlugs}
              esthetician={esthetician}
              date={state.selectedDate!}
              time={state.selectedTime!}
            />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Step navigation — hidden on step 3 (confirmation has its own CTA) */}
      {state.step < 3 && (
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-brand-dark/10">
          {state.step > 1 ? (
            <button
              onClick={() => dispatch({ type: "PREV_STEP" })}
              className="text-brand-dark/60 hover:text-brand-dark text-sm font-medium underline-offset-2 hover:underline transition-colors"
            >
              ← Back
            </button>
          ) : (
            <div aria-hidden="true" />
          )}
          <button
            onClick={() => dispatch({ type: "NEXT_STEP" })}
            disabled={!canContinue}
            className="bg-brand-primary text-white px-8 py-3 rounded-xl font-semibold hover:bg-brand-primary-dark disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-200"
          >
            {state.step === 2 ? "Review Booking" : "Continue"}
          </button>
        </div>
      )}
    </div>
  );
}
