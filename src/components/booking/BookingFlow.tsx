"use client";

import { useReducer } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { Service, Staff } from "@/lib/types";
import { ProgressIndicator } from "./ProgressIndicator";
import { ServiceSelector } from "./ServiceSelector";
import { EstheticianStep } from "./EstheticianStep";
import { DateTimePicker } from "./DateTimePicker";

// ---------------------------------------------------------------------------
// State machine types
// ---------------------------------------------------------------------------

type Step = 1 | 2 | 3 | 4;

interface BookingState {
  step: Step;
  selectedServiceSlugs: string[];
  selectedEstheticianSlug: string;
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
      return { ...state, step: Math.min(4, state.step + 1) as Step };
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
  selectedEstheticianSlug: "maya-chen",
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
// ---------------------------------------------------------------------------

export function BookingFlow({ services, esthetician }: BookingFlowProps) {
  const [state, dispatch] = useReducer(bookingReducer, INITIAL_STATE);

  const canContinue =
    (state.step === 1 && state.selectedServiceSlugs.length > 0) ||
    state.step === 2 ||
    (state.step === 3 && state.selectedDate !== null && state.selectedTime !== null) ||
    state.step === 4;

  return (
    <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-32">
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
            <ServiceSelector
              services={services}
              selectedSlugs={state.selectedServiceSlugs}
              onToggle={(slug) => dispatch({ type: "TOGGLE_SERVICE", slug })}
            />
          )}
          {state.step === 2 && (
            <EstheticianStep esthetician={esthetician} />
          )}
          {state.step === 3 && (
            <DateTimePicker
              selectedDate={state.selectedDate}
              selectedTime={state.selectedTime}
              onSelectDate={(date: string) => dispatch({ type: "SELECT_DATE", date })}
              onSelectTime={(time: string) => dispatch({ type: "SELECT_TIME", time })}
            />
          )}
          {state.step === 4 && (
            <div className="py-8 text-center">
              <p className="text-brand-dark/60 text-lg">
                Confirmation step coming in Plan 02.
              </p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Step navigation — hidden on step 4 */}
      {state.step < 4 && (
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
            {state.step === 3 ? "Review Booking" : "Continue"}
          </button>
        </div>
      )}
    </section>
  );
}
