"use client";

import { motion, type Variants } from "framer-motion";
import { useMotionSafe } from "@/lib/use-motion-safe";

export type TransitionVariant =
  | "zoom-monitor"
  | "rise-phone"
  | "open-folder"
  | "push-board";

type SceneOverlayProps = {
  variant: TransitionVariant;
  children: React.ReactNode;
  onBackdropClick?: () => void;
};

const overlayVariants: Record<TransitionVariant, Variants> = {
  "zoom-monitor": {
    hidden: { opacity: 0, scale: 0.35 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.35 },
  },
  "rise-phone": {
    hidden: { opacity: 0, y: 48, scale: 0.85 },
    visible: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: 48, scale: 0.85 },
  },
  "open-folder": {
    hidden: { opacity: 0, y: 24, scale: 0.92 },
    visible: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: 24, scale: 0.92 },
  },
  "push-board": {
    hidden: { opacity: 0, scale: 1.12, y: -12 },
    visible: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 1.12, y: -12 },
  },
};

export function SceneOverlay({
  variant,
  children,
  onBackdropClick,
}: SceneOverlayProps) {
  const { spring, tween, reduced } = useMotionSafe();
  const transition = reduced ? tween : spring;

  return (
    <motion.div
      className="fixed inset-0 z-40 flex items-center justify-center"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={
        reduced
          ? {
              hidden: { opacity: 0 },
              visible: { opacity: 1 },
              exit: { opacity: 0 },
            }
          : overlayVariants[variant]
      }
      transition={transition}
      style={{
        paddingTop: "var(--safe-top)",
        paddingRight: "var(--safe-right)",
        paddingBottom: "var(--safe-bottom)",
        paddingLeft: "var(--safe-left)",
      }}
    >
      {onBackdropClick && (
        <button
          type="button"
          aria-label="Close overlay"
          className="absolute inset-0 bg-black/60 backdrop-blur-md"
          onClick={onBackdropClick}
        />
      )}
      <div className="relative z-10 h-full w-full">{children}</div>
    </motion.div>
  );
}
