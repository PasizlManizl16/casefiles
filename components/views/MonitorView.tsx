"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BackButton } from "@/components/ui/BackButton";
import { MonitorScreen } from "@/components/ui/MonitorScreen";
import { SceneOverlay } from "@/components/ui/SceneOverlay";
import { useScene } from "@/lib/scene-context";
import { CASE_ID, MONITOR_APPS, type MonitorAppId } from "@/lib/case-data";
import {
  AppWindow,
  CaseFilesApp,
  CctvArchiveApp,
  EmailApp,
  PoliceDatabaseApp,
  TimelineApp,
} from "./monitor/MonitorApps";

const APP_ICONS: Record<MonitorAppId, React.ReactNode> = {
  "case-files": (
    <path d="M8 6h12l4 4v14H8V6zm12 0v4h4M12 14h8M12 18h6" stroke="currentColor" strokeWidth="1.5" fill="none" />
  ),
  "police-database": (
    <path d="M12 4l8 4v8l-8 4-8-4V8l8-4z" stroke="currentColor" strokeWidth="1.5" fill="none" />
  ),
  "cctv-archive": (
    <>
      <rect x="6" y="8" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <circle cx="16" cy="15" r="3" stroke="currentColor" strokeWidth="1.5" fill="none" />
    </>
  ),
  email: (
    <path d="M6 10l10 7 10-7M6 10v10h20V10" stroke="currentColor" strokeWidth="1.5" fill="none" />
  ),
  timeline: (
    <path d="M8 8v16M16 6v20M24 10v12" stroke="currentColor" strokeWidth="1.5" fill="none" />
  ),
};

function renderApp(id: MonitorAppId) {
  switch (id) {
    case "case-files":
      return <CaseFilesApp />;
    case "police-database":
      return <PoliceDatabaseApp />;
    case "cctv-archive":
      return <CctvArchiveApp />;
    case "email":
      return <EmailApp />;
    case "timeline":
      return <TimelineApp />;
  }
}

export function MonitorView() {
  const { backToDesk } = useScene();
  const [openApp, setOpenApp] = useState<MonitorAppId | null>(null);
  const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <SceneOverlay variant="zoom-monitor">
      <div className="flex h-full w-full items-center justify-center bg-black/70 p-2">
        <motion.div
          className="relative flex h-full w-full max-w-5xl flex-col overflow-hidden border-4 border-[#1a1a1a] bg-[#0a0a0a] shadow-2xl"
          initial={{ boxShadow: "0 0 40px rgba(79,195,247,0.1)" }}
          animate={{ boxShadow: "0 0 80px rgba(79,195,247,0.25)" }}
          transition={{ duration: 0.5 }}
        >
          <BackButton label="Return to Desk" onClick={backToDesk} />

          <MonitorScreen className="flex flex-1 flex-col bg-[#060e14]" glow>
            {/* System bar */}
            <div className="flex h-8 shrink-0 items-center justify-between border-b border-cyan-900/40 bg-[#0a1520] px-3">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-red-600/80" />
                <span className="h-2 w-2 rounded-full bg-amber-600/80" />
                <span className="h-2 w-2 rounded-full bg-emerald-600/80" />
                <span className="ml-2 font-mono text-[9px] tracking-widest text-cyan-600">
                  PD_WORKSTATION_v3.2
                </span>
              </div>
              <div className="flex items-center gap-4 font-mono text-[9px] text-cyan-500/80">
                <span>CASE {CASE_ID}</span>
                <span>{time}</span>
              </div>
            </div>

            {/* Desktop */}
            <div
              className="relative flex-1 p-4 sm:p-6"
              style={{
                background:
                  "linear-gradient(160deg, #060e14 0%, #0a1620 50%, #050a10 100%)",
              }}
            >
              <div className="grid grid-cols-5 gap-3 sm:gap-4">
                {MONITOR_APPS.map((app, i) => (
                  <motion.button
                    key={app.id}
                    type="button"
                    onClick={() => setOpenApp(app.id)}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 + i * 0.04 }}
                    whileTap={{ scale: 0.94 }}
                    className="flex min-h-[64px] flex-col items-center gap-1.5 rounded-sm p-2 hover:bg-cyan-950/30"
                  >
                    <div
                      className="flex h-11 w-11 items-center justify-center border border-white/5"
                      style={{ backgroundColor: `${app.color}18`, color: app.color }}
                    >
                      <svg viewBox="0 0 32 32" className="h-6 w-6">
                        {APP_ICONS[app.id]}
                      </svg>
                    </div>
                    <span className="text-center font-mono text-[8px] leading-tight text-cyan-200/70">
                      {app.name}
                    </span>
                  </motion.button>
                ))}
              </div>

              <AnimatePresence>
                {openApp && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    className="absolute inset-0 z-30 bg-black/40"
                  >
                    <AppWindow
                      title={MONITOR_APPS.find((a) => a.id === openApp)!.name}
                      onClose={() => setOpenApp(null)}
                    >
                      {renderApp(openApp)}
                    </AppWindow>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Taskbar */}
              <div className="absolute bottom-0 left-0 right-0 flex h-8 items-center border-t border-cyan-900/30 bg-black/50 px-3">
                <span className="font-mono text-[8px] text-cyan-700">
                  SYS://investigation — {openApp ? "APP RUNNING" : "IDLE"}
                </span>
              </div>
            </div>
          </MonitorScreen>
        </motion.div>
      </div>
    </SceneOverlay>
  );
}
