"use client";

import { motion } from "framer-motion";
import { useMotionSafe } from "@/lib/use-motion-safe";

type BackButtonProps = {
  label?: string;
  onClick: () => void;
  variant?: "default" | "close";
};

export function BackButton({
  label = "Back To Desk",
  onClick,
  variant = "default",
}: BackButtonProps) {
  const { spring } = useMotionSafe();

  if (variant === "close") {
    return (
      <motion.button
        type="button"
        aria-label="Close"
        onClick={onClick}
        whileTap={{ scale: 0.92 }}
        transition={spring}
        className="absolute right-4 top-4 z-50 flex h-11 w-11 min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-white/15 bg-black/40 text-lg text-white backdrop-blur-sm"
      >
        ×
      </motion.button>
    );
  }

  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileTap={{ scale: 0.97 }}
      transition={spring}
      className="absolute left-4 top-4 z-50 flex min-h-[44px] items-center gap-2 rounded-md border border-amber-900/40 bg-black/50 px-4 py-2 text-sm font-medium tracking-wide text-amber-100 backdrop-blur-sm"
      style={{
        top: "max(1rem, var(--safe-top))",
        left: "max(1rem, var(--safe-left))",
      }}
    >
      <span aria-hidden>←</span>
      {label}
    </motion.button>
  );
}
