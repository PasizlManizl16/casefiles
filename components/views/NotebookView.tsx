"use client";

import { motion } from "framer-motion";
import { BackButton } from "@/components/ui/BackButton";
import { SceneOverlay } from "@/components/ui/SceneOverlay";
import { useScene } from "@/lib/scene-context";
import { useAudio } from "@/lib/audio-context";
import { NOTEBOOK_ENTRIES } from "@/lib/notebook-data";
import { useEffect } from "react";

export function NotebookView() {
  const { backToDesk } = useScene();
  const { play } = useAudio();

  useEffect(() => {
    play("paper");
  }, [play]);

  return (
    <SceneOverlay variant="open-folder">
      <div className="flex h-full w-full items-center justify-center p-4">
        <motion.div
          className="relative h-[88%] w-full max-w-md"
          initial={{ rotateY: -8, opacity: 0 }}
          animate={{ rotateY: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 24 }}
          style={{ perspective: "900px" }}
        >
          <BackButton label="Close Notebook" onClick={backToDesk} />

          <div
            className="relative mt-8 h-full overflow-hidden rounded-sm shadow-2xl"
            style={{
              background: "linear-gradient(180deg, #2a2520 0%, #1a1510 100%)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.6), inset 0 0 0 1px rgba(255,200,120,0.05)",
            }}
          >
            {/* Spine */}
            <div className="absolute bottom-0 left-0 top-0 w-6 bg-[#1a1510] shadow-[inset_-2px_0_8px_rgba(0,0,0,0.5)]" />

            <div
              className="ml-6 h-full overflow-y-auto px-5 py-6"
              style={{ WebkitOverflowScrolling: "touch" }}
            >
              <p className="mb-1 font-[family-name:var(--font-geist-mono)] text-[9px] uppercase tracking-[0.25em] text-amber-700/60">
                Field Journal
              </p>
              <h2 className="mb-6 font-serif text-lg italic text-amber-100/90">
                Investigator Notes
              </h2>

              <div className="space-y-6">
                {NOTEBOOK_ENTRIES.map((entry, i) => (
                  <motion.div
                    key={entry.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.08 + i * 0.07 }}
                    className="border-b border-amber-900/20 pb-4"
                  >
                    <p className="mb-2 font-[family-name:var(--font-geist-mono)] text-[9px] text-amber-700/50">
                      {entry.date}
                    </p>
                    <p
                      className="font-serif text-sm leading-relaxed text-amber-100/80"
                      style={{
                        fontFamily: "Georgia, 'Times New Roman', serif",
                        fontStyle: "italic",
                      }}
                    >
                      {entry.text}
                    </p>
                  </motion.div>
                ))}
              </div>

              <p className="mt-8 text-center font-serif text-[10px] italic text-amber-800/40">
                — more pages blank —
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </SceneOverlay>
  );
}
