"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BackButton } from "@/components/ui/BackButton";
import { SceneOverlay } from "@/components/ui/SceneOverlay";
import { useScene } from "@/lib/scene-context";
import { useProgress } from "@/lib/progress-context";
import { useNotifications } from "@/lib/notification-context";
import { useMotionSafe } from "@/lib/use-motion-safe";
import {
  DOCUMENTS,
  DOCUMENT_CATEGORIES,
  type CaseDocument,
  type DocumentCategory,
} from "@/lib/case-data";

type FolderScreen = "categories" | "list" | "document";

export function FolderView() {
  const { backToDesk } = useScene();
  const { spring } = useMotionSafe();
  const { markDocumentImportant, isDocumentImportant } = useProgress();
  const { notify } = useNotifications();
  const [screen, setScreen] = useState<FolderScreen>("categories");
  const [category, setCategory] = useState<DocumentCategory | null>(null);
  const [activeDoc, setActiveDoc] = useState<CaseDocument | null>(null);

  const docsInCategory = category
    ? DOCUMENTS.filter((d) => d.category === category)
    : [];

  const handleMarkImportant = (doc: CaseDocument) => {
    if (isDocumentImportant(doc.id)) return;
    markDocumentImportant(doc.id);
    notify("document", "Document Marked", doc.title);
  };

  return (
    <SceneOverlay variant="open-folder">
      <div className="flex h-full w-full items-center justify-center p-4" style={{ perspective: "800px" }}>
        <div className="relative h-[92%] w-full max-w-lg">
          <BackButton onClick={backToDesk} />

          <motion.div
            className="relative mx-auto mt-6 flex h-full flex-col overflow-hidden rounded-lg px-2 pb-3 pt-5"
            style={{
              background: "linear-gradient(180deg, #c4a35a 0%, #b8935a 100%)",
              boxShadow: "0 12px 40px rgba(0,0,0,0.5)",
            }}
            initial={{ scaleY: 0.3, originY: 1 }}
            animate={{ scaleY: 1 }}
            transition={spring}
          >
            <motion.div
              className="absolute -top-3 left-6 h-5 w-24 rounded-t-md"
              style={{ background: "#c4a35a" }}
            />

            <AnimatePresence mode="wait">
              {screen === "categories" && (
                <motion.div
                  key="cats"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex-1 space-y-2 overflow-y-auto px-2 pt-1"
                  style={{ WebkitOverflowScrolling: "touch" }}
                >
                  <p className="mb-2 font-serif text-sm font-bold text-[#2a2010]">Case Documents</p>
                  {DOCUMENT_CATEGORIES.map((cat, i) => (
                    <motion.button
                      key={cat.id}
                      type="button"
                      onClick={() => { setCategory(cat.id); setScreen("list"); }}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex w-full min-h-[48px] items-center justify-between rounded-sm border border-[#a08050]/40 bg-[#f0e8d8]/90 px-3 py-2 text-left shadow-sm"
                    >
                      <span className="font-serif text-xs font-semibold text-[#2a2010]">{cat.label}</span>
                      <span className="text-[10px] text-[#6b5530]">
                        {DOCUMENTS.filter((d) => d.category === cat.id).length} files
                      </span>
                    </motion.button>
                  ))}
                </motion.div>
              )}

              {screen === "list" && category && (
                <motion.div
                  key="list"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-1 flex-col overflow-hidden px-2 pt-1"
                >
                  <button
                    type="button"
                    onClick={() => setScreen("categories")}
                    className="mb-2 min-h-[44px] text-left text-xs text-[#3a2810] underline"
                  >
                    ← Back to categories
                  </button>
                  <div className="flex-1 space-y-2 overflow-y-auto" style={{ WebkitOverflowScrolling: "touch" }}>
                    {docsInCategory.map((doc) => (
                      <button
                        key={doc.id}
                        type="button"
                        onClick={() => { setActiveDoc(doc); setScreen("document"); }}
                        className="relative w-full rounded-sm border border-[#d0c8b8] bg-[#f5f0e6] p-3 text-left shadow-md"
                      >
                        {isDocumentImportant(doc.id) && (
                          <span className="absolute right-2 top-2 text-[9px] font-bold text-red-700">★ IMPORTANT</span>
                        )}
                        <p className="font-serif text-xs font-bold text-[#2a2520]">{doc.title}</p>
                        <p className="mt-1 font-mono text-[9px] text-[#6b5530]">{doc.date} · {doc.caseNumber}</p>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {screen === "document" && activeDoc && (
                <motion.div
                  key="doc"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-1 flex-col overflow-hidden px-1"
                >
                  <button
                    type="button"
                    onClick={() => setScreen("list")}
                    className="mb-1 min-h-[44px] text-left text-xs text-[#3a2810] underline"
                  >
                    ← Back to list
                  </button>
                  <DocumentPaper
                    doc={activeDoc}
                    important={isDocumentImportant(activeDoc.id)}
                    onMarkImportant={() => handleMarkImportant(activeDoc)}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </SceneOverlay>
  );
}

function DocumentPaper({
  doc,
  important,
  onMarkImportant,
}: {
  doc: CaseDocument;
  important: boolean;
  onMarkImportant: () => void;
}) {
  return (
    <div className="relative flex-1 overflow-y-auto rounded-sm border border-[#d0c8b8] bg-[#f5f0e6] p-4 shadow-inner" style={{ WebkitOverflowScrolling: "touch" }}>
      {doc.stamp && (
        <div className="pointer-events-none absolute right-4 top-4 rotate-[-12deg] border-2 border-red-800/50 px-2 py-1 font-mono text-[10px] font-bold text-red-800/60">
          {doc.stamp}
        </div>
      )}
      <p className="font-mono text-[9px] text-[#6b5530]">CASE {doc.caseNumber}</p>
      <h3 className="mt-1 border-b border-[#d0c8b8] pb-2 font-serif text-sm font-bold text-[#2a2520]">
        {doc.title}
      </h3>
      <p className="mt-2 font-mono text-[9px] text-[#8b7355]">Date: {doc.date}</p>
      <div className="mt-4 space-y-3">
        {doc.body.map((line, i) => (
          <p
            key={i}
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
      <div className="mt-8 border-t border-dashed border-[#c0b8a8] pt-4">
        <p className="font-serif text-[10px] italic text-[#8b7355]">Authorized signature:</p>
        <div className="mt-2 h-8 border-b border-[#a09080]" />
      </div>
      <button
        type="button"
        onClick={onMarkImportant}
        disabled={important}
        className={`mt-4 min-h-[44px] w-full border px-3 py-2 font-mono text-[10px] ${
          important
            ? "border-red-800/30 text-red-800/50"
            : "border-red-800/50 text-red-800 hover:bg-red-50"
        }`}
      >
        {important ? "★ Marked Important" : "Mark as Important"}
      </button>
    </div>
  );
}
