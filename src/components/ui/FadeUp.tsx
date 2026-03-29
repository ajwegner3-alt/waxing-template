"use client";
import { motion } from "motion/react";
import React from "react";

interface FadeUpProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

/**
 * FadeUp — wraps children in a motion.div that fades in from 20px below on scroll.
 *
 * Uses viewport={{ once: true }} — elements animate once on first appearance.
 * Repeated animations feel cheap on spa/wellness sites.
 *
 * Import: `import { motion } from "motion/react"` — NOT "framer-motion"
 * The package was renamed; the waxing template uses the motion package (v12+).
 * See RESEARCH.md pitfall #4.
 *
 * Easing: [0.22, 1, 0.36, 1] — a gentle ease-out-expo that feels unhurried
 * and spa-like. Matches the generous, unhurried spacing aesthetic in CONTEXT.md.
 */
export function FadeUp({ children, delay = 0, className = "" }: FadeUpProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-48px" }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
