"use client";

import { motion } from "framer-motion";
import { BackButton } from "@/components/ui/BackButton";
import { SceneOverlay } from "@/components/ui/SceneOverlay";
import { useScene } from "@/lib/scene-context";
import { useMotionSafe } from "@/lib/use-motion-safe";

const DOCUMENTS = [
  {
    title: "Witness Statements",
    lines: ["Interview #014 — Baker St.", "Subject: J. Morrison", "Status: Pending review"],
  },
  {
    title: "Police Reports",
    lines: ["Incident Report #8821", "Officer: Det. Walsh", "Filed: 22:15 hrs"],
  },
  {
    title: "Medical Reports",
    lines: ["Autopsy preliminary", "Coroner: Dr. Hayes", "Classification: Pending"],
  },
];

export function FolderView() {
  const { backToDesk } = useScene();
  const { spring } = useMotionSafe();

  return (
    <SceneOverlay variant="open-folder">
      <div className="flex h-full w-full items-center justify-center p-6" style={{ perspective: "800px" }}>
        <div className="relative w-full max-w-lg">
          <BackButton onClick={backToDesk} />

          {/* Folder back */}
          <motion.div
            className="relative mx-auto mt-8 rounded-lg px-2 pb-4 pt-6"
            style={{
              background: "linear-gradient(180deg, #c4a35a 0%, #b8935a 100%)",
              boxShadow: "0 12px 40px rgba(0,0,0,0.4)",
            }}
            initial={{ scaleY: 0.3, originY: 1 }}
            animate={{ scaleY: 1 }}
            transition={spring}
          >
            {/* Folder tab */}
            <motion.div
              className="absolute -top-4 left-6 h-6 w-24 rounded-t-md"
              style={{ background: "#c4a35a" }}
              initial={{ rotateX: -60 }}
              animate={{ rotateX: 0 }}
              transition={{ ...spring, delay: 0.05 }}
            />

            {/* Folder flap opening */}
            <motion.div
              className="absolute -top-2 left-2 right-2 h-8 origin-bottom rounded-t-md"
              style={{
                background: "linear-gradient(180deg, #d4b896, #c4a878)",
                transformOrigin: "bottom center",
              }}
              initial={{ rotateX: 0 }}
              animate={{ rotateX: -25 }}
              transition={{ ...spring, delay: 0.1 }}
            />

            {/* Papers */}
            <div className="relative space-y-3 px-2 pt-2">
              {DOCUMENTS.map((doc, i) => (
                <motion.div
                  key={doc.title}
                  className="relative overflow-hidden rounded-sm border border-[#d0c8b8] bg-[#f5f0e6] p-4 shadow-md"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ ...spring, delay: 0.15 + i * 0.08 }}
                >
                  {/* Coffee stain */}
                  <div
                    className="pointer-events-none absolute -right-4 -top-4 h-16 w-16 rounded-full opacity-20"
                    style={{
                      background:
                        "radial-gradient(circle, #6b4423 0%, transparent 70%)",
                    }}
                  />

                  <h3 className="mb-3 border-b border-[#d0c8b8] pb-2 font-serif text-sm font-bold text-[#2a2520]">
                    {doc.title}
                  </h3>
                  <div className="space-y-2">
                    {doc.lines.map((line) => (
                      <p
                        key={line}
                        className="font-mono text-[11px] leading-relaxed text-[#4a4035]"
                        style={{
                          backgroundImage:
                            "repeating-linear-gradient(transparent, transparent 17px, #e8e0d0 17px, #e8e0d0 18px)",
                        }}
                      >
                        {line}
                      </p>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </SceneOverlay>
  );
}
