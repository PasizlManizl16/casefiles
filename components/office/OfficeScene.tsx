"use client";

import { AnimatePresence } from "framer-motion";
import { SceneProvider, useScene } from "@/lib/scene-context";
import { SCENES } from "@/lib/scenes";
import { DeskHub } from "./DeskHub";
import { MonitorView } from "@/components/views/MonitorView";
import { PhoneView } from "@/components/views/PhoneView";
import { FolderView } from "@/components/views/FolderView";
import { EvidenceBoardView } from "@/components/views/EvidenceBoardView";

function OfficeSceneContent() {
  const { activeScene, isDesk } = useScene();
  const showOverlay = activeScene !== SCENES.DESK;

  return (
    <div className="game-canvas fixed inset-0 h-[100dvh] w-[100dvw] overflow-hidden bg-[#0a1628]">
      <DeskHub blurred={showOverlay} />

      <AnimatePresence mode="wait">
        {activeScene === SCENES.MONITOR && <MonitorView key="monitor" />}
        {activeScene === SCENES.PHONE && <PhoneView key="phone" />}
        {activeScene === SCENES.FOLDER && <FolderView key="folder" />}
        {activeScene === SCENES.EVIDENCE_BOARD && <EvidenceBoardView key="evidence-board" />}
      </AnimatePresence>

      {!isDesk && (
        <div className="pointer-events-none absolute inset-0 z-30 bg-black/20" aria-hidden />
      )}
    </div>
  );
}

export function OfficeScene() {
  return (
    <SceneProvider>
      <OfficeSceneContent />
    </SceneProvider>
  );
}
