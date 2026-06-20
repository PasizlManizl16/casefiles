"use client";

import { motion } from "framer-motion";
import { BackButton } from "@/components/ui/BackButton";
import { SceneOverlay } from "@/components/ui/SceneOverlay";
import { useScene } from "@/lib/scene-context";

const APPS = [
  {
    name: "Messages",
    subtitle: "3 unread",
    color: "#34c759",
    icon: (
      <path
        d="M6 8h20v12H8l-2 2V8z"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
    ),
  },
  {
    name: "Photos",
    subtitle: "Evidence gallery",
    color: "#ff9500",
    icon: (
      <>
        <rect x="6" y="8" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <circle cx="12" cy="14" r="2" fill="currentColor" />
        <path d="M6 20l6-6 4 4 6-8 4 6" stroke="currentColor" strokeWidth="1.5" fill="none" />
      </>
    ),
  },
  {
    name: "Calls",
    subtitle: "Recent log",
    color: "#007aff",
    icon: (
      <path
        d="M8 10c2 4 6 8 10 10l2-4 4 2c-2 6-12 8-18 2S2 8 8 6l2 4-4 2z"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
    ),
  },
  {
    name: "Notes",
    subtitle: "Field observations",
    color: "#ffcc00",
    icon: (
      <path
        d="M10 6h12v20H10V6zm0 4h12M14 14h8M14 18h6"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
    ),
  },
  {
    name: "Maps",
    subtitle: "Crime scene pins",
    color: "#5856d6",
    icon: (
      <>
        <path d="M16 6l-6 3v14l6-3 6 3V9l-6-3z" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <circle cx="16" cy="14" r="2" fill="currentColor" />
      </>
    ),
  },
  {
    name: "Settings",
    subtitle: "Device",
    color: "#8e8e93",
    icon: (
      <circle cx="16" cy="16" r="6" stroke="currentColor" strokeWidth="1.5" fill="none" />
    ),
  },
];

export function PhoneView() {
  const { backToDesk } = useScene();

  return (
    <SceneOverlay variant="rise-phone">
      <div className="relative flex h-full w-full items-center justify-center">
        <BackButton variant="close" onClick={backToDesk} />
        <motion.div
          className="relative flex h-[88%] max-h-[340px] w-[42%] max-w-[200px] flex-col overflow-hidden rounded-[2rem] border-[3px] border-[#333] bg-[#1a1a22] shadow-2xl"
          style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.5)" }}
        >
          {/* Notch */}
          <div className="absolute left-1/2 top-2 z-10 h-5 w-20 -translate-x-1/2 rounded-full bg-black" />

          {/* Status bar */}
          <div className="flex h-10 shrink-0 items-end justify-between px-6 pb-1 pt-6 text-[9px] text-white/70">
            <span>9:41 PM</span>
            <span>LTE ▮▮▮</span>
          </div>

          {/* Scrollable app list */}
          <div
            className="flex-1 overflow-y-auto overscroll-contain px-3 pb-6"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            <h2 className="mb-3 px-1 text-sm font-semibold text-white">Apps</h2>
            <div className="space-y-2">
              {APPS.map((app, i) => (
                <motion.button
                  key={app.name}
                  type="button"
                  disabled
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 0.7, x: 0 }}
                  transition={{ delay: 0.08 + i * 0.05 }}
                  className="flex w-full min-h-[52px] cursor-not-allowed items-center gap-3 rounded-xl bg-white/5 px-3 py-2.5 text-left"
                >
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-white"
                    style={{ backgroundColor: app.color }}
                  >
                    <svg viewBox="0 0 32 32" className="h-5 w-5">
                      {app.icon}
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-white">{app.name}</p>
                    <p className="text-[10px] text-white/50">{app.subtitle}</p>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Home indicator */}
          <div className="flex shrink-0 justify-center pb-2 pt-1">
            <div className="h-1 w-24 rounded-full bg-white/30" />
          </div>
        </motion.div>
      </div>
    </SceneOverlay>
  );
}
