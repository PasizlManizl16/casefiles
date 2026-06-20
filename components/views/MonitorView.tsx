"use client";

import { motion } from "framer-motion";
import { BackButton } from "@/components/ui/BackButton";
import { SceneOverlay } from "@/components/ui/SceneOverlay";
import { useScene } from "@/lib/scene-context";

const DESKTOP_ICONS = [
  {
    name: "Case Files",
    color: "#4fc3f7",
    icon: (
      <path
        d="M8 6h12l4 4v14H8V6zm12 0v4h4M12 14h8M12 18h6"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
    ),
  },
  {
    name: "Police Database",
    color: "#81c784",
    icon: (
      <path
        d="M12 4l8 4v8l-8 4-8-4V8l8-4zM12 8v8M8 10v4M16 10v4"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
    ),
  },
  {
    name: "CCTV Archive",
    color: "#ffb74d",
    icon: (
      <>
        <rect x="6" y="8" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <circle cx="16" cy="15" r="4" stroke="currentColor" strokeWidth="1.5" fill="none" />
      </>
    ),
  },
  {
    name: "Email",
    color: "#ce93d8",
    icon: (
      <path
        d="M6 10l10 7 10-7M6 10v10h20V10"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
    ),
  },
];

export function MonitorView() {
  const { backToDesk } = useScene();

  return (
    <SceneOverlay variant="zoom-monitor">
      <div className="flex h-full w-full items-center justify-center p-4">
        <motion.div
          className="relative flex h-[92%] w-[94%] max-w-4xl flex-col overflow-hidden rounded-lg border-4 border-[#2a2a2a] bg-[#1a1a1a] shadow-2xl"
          style={{ boxShadow: "0 0 60px rgba(79,195,247,0.15)" }}
        >
          <BackButton onClick={backToDesk} />

          {/* Screen bezel */}
          <div className="flex flex-1 flex-col bg-[#0a1628]">
            {/* Title bar */}
            <div className="flex h-8 items-center gap-2 border-b border-white/5 bg-[#0d1a2d] px-3">
              <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
              <span className="ml-2 text-[10px] text-slate-500">INVESTIGATION_WORKSTATION</span>
            </div>

            {/* Desktop */}
            <div
              className="relative flex-1 p-6"
              style={{
                background:
                  "linear-gradient(160deg, #0a1628 0%, #122033 40%, #0d1520 100%)",
              }}
            >
              <div className="grid grid-cols-4 gap-4 sm:grid-cols-4 md:gap-6">
                {DESKTOP_ICONS.map((item, i) => (
                  <motion.button
                    key={item.name}
                    type="button"
                    disabled
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 0.65, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.06 }}
                    className="flex min-h-[72px] cursor-not-allowed flex-col items-center gap-2 rounded-lg p-2"
                  >
                    <div
                      className="flex h-12 w-12 items-center justify-center rounded-lg text-white"
                      style={{ backgroundColor: `${item.color}33`, color: item.color }}
                    >
                      <svg viewBox="0 0 32 32" className="h-7 w-7">
                        {item.icon}
                      </svg>
                    </div>
                    <span className="text-center text-[10px] leading-tight text-slate-300">
                      {item.name}
                    </span>
                  </motion.button>
                ))}
              </div>

              {/* Taskbar */}
              <div className="absolute bottom-0 left-0 right-0 flex h-10 items-center border-t border-white/5 bg-black/40 px-4">
                <span className="text-[10px] text-slate-500">
                  {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  {" — "}
                  System idle
                </span>
              </div>
            </div>
          </div>

          {/* Monitor stand */}
          <div className="flex flex-col items-center bg-[#1a1a1a] py-1">
            <div className="h-3 w-16 rounded-sm bg-[#2a2a2a]" />
            <div className="h-2 w-28 rounded-full bg-[#222]" />
          </div>
        </motion.div>
      </div>
    </SceneOverlay>
  );
}
