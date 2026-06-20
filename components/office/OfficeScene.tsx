"use client";

import { AnimatePresence } from "framer-motion";
import { SceneProvider, useScene } from "@/lib/scene-context";
import { ProgressProvider } from "@/lib/progress-context";
import { NotificationProvider } from "@/lib/notification-context";
import { AudioProvider } from "@/lib/audio-context";
import { SCENES } from "@/lib/scenes";
import { DeskHub } from "./DeskHub";
import { MonitorView } from "@/components/views/MonitorView";
import { PhoneView } from "@/components/views/PhoneView";
import { FolderView } from "@/components/views/FolderView";
import { EvidenceBoardView } from "@/components/views/EvidenceBoardView";
import { NotebookView } from "@/components/views/NotebookView";
import { NotificationToast } from "@/components/ui/NotificationToast";

function OfficeSceneContent() {
  const { activeScene, isDesk } = useScene();
  const showOverlay = activeScene !== SCENES.DESK;

  const overlayDim =
    activeScene === SCENES.MONITOR
      ? "bg-black/55"
      : activeScene === SCENES.EVIDENCE_BOARD
        ? "bg-black/75"
        : activeScene === SCENES.NOTEBOOK
          ? "bg-black/40"
          : "bg-black/35";

  return (
    <div className="game-canvas fixed inset-0 h-[100dvh] w-[100dvw] overflow-hidden bg-[#0a1628]">
      <DeskHub blurred={showOverlay} isActive={isDesk} />

      <AnimatePresence mode="wait">
        {activeScene === SCENES.MONITOR && <MonitorView key="monitor" />}
        {activeScene === SCENES.PHONE && <PhoneView key="phone" />}
        {activeScene === SCENES.FOLDER && <FolderView key="folder" />}
        {activeScene === SCENES.EVIDENCE_BOARD && <EvidenceBoardView key="evidence-board" />}
        {activeScene === SCENES.NOTEBOOK && <NotebookView key="notebook" />}
      </AnimatePresence>

      {!isDesk && (
        <div className={`pointer-events-none absolute inset-0 z-30 transition-colors duration-500 ${overlayDim}`} aria-hidden />
      )}

      <NotificationToast />
    </div>
  );
}

export function OfficeScene() {
  return (
    <SceneProvider>
      <ProgressProvider>
        <NotificationProvider>
          <AudioProvider>
            <OfficeSceneContent />
          </AudioProvider>
        </NotificationProvider>
      </ProgressProvider>
    </SceneProvider>
  );
}
