"use client";

import { motion } from "framer-motion";
import { useMotionSafe } from "@/lib/use-motion-safe";

type DeskObjectProps = {
  label: string;
  onClick: () => void;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
};

export function DeskObject({
  label,
  onClick,
  className = "",
  style,
  children,
}: DeskObjectProps) {
  const { spring } = useMotionSafe();

  return (
    <motion.button
      type="button"
      aria-label={label}
      onClick={onClick}
      whileTap={{ scale: 0.96 }}
      whileHover={{ scale: 1.02 }}
      transition={spring}
      className={`absolute min-h-[44px] min-w-[44px] cursor-pointer border-0 bg-transparent p-0 outline-none focus-visible:ring-2 focus-visible:ring-amber-300/60 ${className}`}
      style={style}
    >
      {children}
    </motion.button>
  );
}
