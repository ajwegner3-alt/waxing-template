"use client";

import React, { createContext, useContext, useState } from "react";

// ---------------------------------------------------------------------------
// Context types
// ---------------------------------------------------------------------------

interface BookingDrawerContextValue {
  isOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
}

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

const BookingDrawerContext = createContext<BookingDrawerContextValue | null>(null);

// ---------------------------------------------------------------------------
// Provider
// ---------------------------------------------------------------------------

export function BookingDrawerProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openDrawer = () => setIsOpen(true);
  const closeDrawer = () => setIsOpen(false);

  return (
    <BookingDrawerContext.Provider value={{ isOpen, openDrawer, closeDrawer }}>
      {children}
    </BookingDrawerContext.Provider>
  );
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

export function useBookingDrawer(): BookingDrawerContextValue {
  const ctx = useContext(BookingDrawerContext);
  if (!ctx) {
    throw new Error("useBookingDrawer must be used inside BookingDrawerProvider");
  }
  return ctx;
}
