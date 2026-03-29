"use client";
import React, { createContext, useContext, useState } from "react";

interface NavContextValue {
  isMobileNavOpen: boolean;
  setIsMobileNavOpen: (open: boolean) => void;
}

const NavContext = createContext<NavContextValue | null>(null);

export function NavProvider({ children }: { children: React.ReactNode }) {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  return (
    <NavContext.Provider value={{ isMobileNavOpen, setIsMobileNavOpen }}>
      {children}
    </NavContext.Provider>
  );
}

export function useNav(): NavContextValue {
  const ctx = useContext(NavContext);
  if (!ctx) throw new Error("useNav must be used inside NavProvider");
  return ctx;
}
