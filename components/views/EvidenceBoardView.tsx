"use client";

import { motion } from "framer-motion";
import { BackButton } from "@/components/ui/BackButton";
import { SceneOverlay } from "@/components/ui/SceneOverlay";
import { useScene } from "@/lib/scene-context";

const PINS = [
  { x: "18%", y: "22%", w: "22%", h: "18%" },
  { x: "58%", y: "18%", w: "20%", h: "16%" },
  { x: "38%", y: "42%", w: "24%", h: "20%" },
  { x: "15%", y: "62%", w: "18%", h: "15%" },
  { x: "62%", y: "58%", w: "22%", h: "17%" },
  { x: "42%", y: "72%", w: "20%", h: "14%" },
];

const STRINGS: { x1: number; y1: number; x2: number; y2: number }[] = [
  { x1: 18, y1: 25, x2: 58, y2: 22 },
  { x1: 58, y1: 22, x2: 50, y2: 48 },
  { x1: 50, y1: 48, x2: 24, y2: 68 },
  { x1: 50, y1: 48, x2: 72, y2: 64 },
  { x1: 72, y1: 64, x2: 52, y2: 76 },
];

export function EvidenceBoardView() {
  const { backToDesk } = useScene();

  return (
    <SceneOverlay variant="push-board">
      <div className="flex h-full w-full items-center justify-center p-4">
        <motion.div
          className="relative h-[90%] w-[94%] max-w-3xl overflow-hidden rounded-md border-8 border-[#4a3512] shadow-2xl"
          style={{
            background: "#8b6914",
            boxShadow: "inset 0 0 80px rgba(0,0,0,0.3), 0 20px 60px rgba(0,0,0,0.5)",
          }}
        >
          <BackButton onClick={backToDesk} />

          {/* Cork texture overlay */}
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 30%, #6b4f1d 1px, transparent 1px), radial-gradient(circle at 70% 60%, #6b4f1d 1px, transparent 1px)",
              backgroundSize: "8px 8px, 12px 12px",
            }}
          />

          {/* Title */}
          <div className="absolute left-6 top-6 z-10">
            <h2 className="font-serif text-lg font-bold tracking-wide text-[#2a1f0a]">
              Investigation Board
            </h2>
            <p className="text-xs text-[#4a3512]/80">Case #—— — Awaiting evidence</p>
          </div>

          {/* String connections */}
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
            {STRINGS.map((line, i) => (
              <motion.line
                key={`${line.x1}-${line.y1}`}
                x1={line.x1}
                y1={line.y1}
                x2={line.x2}
                y2={line.y2}
                stroke="#c0392b"
                strokeWidth="0.4"
                opacity="0.55"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.55 }}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
              />
            ))}
          </svg>

          {/* Empty photo placeholders */}
          {PINS.map((pin, i) => (
            <motion.div
              key={`${pin.x}-${pin.y}`}
              className="absolute flex items-center justify-center border-2 border-dashed border-[#6b5530] bg-[#d4c4a0]/40"
              style={{
                left: pin.x,
                top: pin.y,
                width: pin.w,
                height: pin.h,
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 + i * 0.07 }}
            >
              <span className="text-[9px] uppercase tracking-wider text-[#6b5530]/70">
                Empty
              </span>
              {/* Pin */}
              <div
                className="absolute -top-2 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full border border-[#8b0000] bg-[#c0392b] shadow-sm"
                style={{ boxShadow: "0 2px 4px rgba(0,0,0,0.3)" }}
              />
            </motion.div>
          ))}

          {/* Legend */}
          <div className="absolute bottom-4 right-4 rounded bg-[#d4c4a0]/60 px-3 py-2">
            <p className="text-[10px] text-[#4a3512]">No evidence pinned yet</p>
          </div>
        </motion.div>
      </div>
    </SceneOverlay>
  );
}
