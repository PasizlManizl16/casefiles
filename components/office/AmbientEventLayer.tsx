"use client";

import { motion, AnimatePresence } from "framer-motion";
import type { AmbientEvent } from "@/lib/use-ambient-events";

type AmbientEventLayerProps = {
  activeEvent: AmbientEvent | null;
};

export function AmbientEventLayer({ activeEvent }: AmbientEventLayerProps) {
  const isLightning = activeEvent?.type === "lightning";
  const isThunder = activeEvent?.type === "thunder";

  return (
    <>
      <AnimatePresence>
        {isLightning && (
          <motion.div
            key="lightning"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.35, 0.15, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="pointer-events-none absolute inset-0 z-[15] bg-sky-100"
          />
        )}
      </AnimatePresence>

      {isThunder && (
        <div className="pointer-events-none absolute inset-0 z-[14] animate-[subtle-shake_0.6s_ease-out]" aria-hidden />
      )}
    </>
  );
}
