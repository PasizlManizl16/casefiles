"use client";

import { useReducedMotion } from "framer-motion";

export function useMotionSafe() {
  const reduced = useReducedMotion();

  return {
    reduced: Boolean(reduced),
    spring: reduced
      ? { duration: 0.2 }
      : { type: "spring" as const, stiffness: 260, damping: 28 },
    tween: reduced
      ? { duration: 0.2 }
      : { duration: 0.35, ease: [0.4, 0, 0.2, 1] as const },
  };
}
