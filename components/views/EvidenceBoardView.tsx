"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { BackButton } from "@/components/ui/BackButton";
import { SceneOverlay } from "@/components/ui/SceneOverlay";
import { useScene } from "@/lib/scene-context";
import { useProgress } from "@/lib/progress-context";
import { useNotifications } from "@/lib/notification-context";
import { BOARD_CARDS, CASE_ID, type BoardCard } from "@/lib/case-data";

const CARD_COLORS: Record<BoardCard["type"], string> = {
  suspect: "border-red-900/60 bg-red-950/30 text-red-100",
  evidence: "border-cyan-900/60 bg-cyan-950/30 text-cyan-100",
  location: "border-amber-900/60 bg-amber-950/30 text-amber-100",
  question: "border-purple-900/60 bg-purple-950/30 text-purple-100",
};

export function EvidenceBoardView() {
  const { backToDesk } = useScene();
  const { addConnection, validConnections, getClueForConnection } = useProgress();
  const { notify } = useNotifications();
  const [selected, setSelected] = useState<string[]>([]);
  const [shaking, setShaking] = useState<string[]>([]);

  const toggleSelect = (id: string) => {
    setSelected((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= 2) return [id];
      return [...prev, id];
    });
  };

  const handleConnect = () => {
    if (selected.length !== 2) return;
    const [a, b] = selected;
    const success = addConnection(a, b);
    if (success) {
      const clue = getClueForConnection(a, b);
      notify("connection", "Connection Confirmed", clue?.clueTitle ?? "Link established");
      notify("evidence", "New Clue Discovered", clue?.clueTitle ?? "Evidence linked");
      setSelected([]);
    } else {
      setShaking([a, b]);
      notify("contradiction", "No Connection", "These items don't link together.");
      setTimeout(() => setShaking([]), 500);
      setSelected([]);
    }
  };

  const madeConnections = validConnections.map((key) => {
    const [a, b] = key.split(":");
    const cardA = BOARD_CARDS.find((c) => c.id === a)!;
    const cardB = BOARD_CARDS.find((c) => c.id === b)!;
    return { a: cardA, b: cardB, key };
  });

  return (
    <SceneOverlay variant="push-board">
      <div className="flex h-full w-full items-center justify-center p-2">
        <motion.div
          className="relative h-full w-full max-w-4xl overflow-hidden border-8 border-[#4a3512]"
          style={{
            background: "#8b6914",
            boxShadow: "inset 0 0 80px rgba(0,0,0,0.3)",
          }}
        >
          <BackButton onClick={backToDesk} />

          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 30%, #6b4f1d 1px, transparent 1px)",
              backgroundSize: "8px 8px",
            }}
          />

          <div className="absolute left-4 top-4 z-10">
            <h2 className="font-serif text-base font-bold text-[#2a1f0a]">Investigation Board</h2>
            <p className="font-mono text-[9px] text-[#4a3512]">{CASE_ID} · Tap two cards, then Connect</p>
          </div>

          {/* Connection strings */}
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            {madeConnections.map(({ a, b, key }) => (
              <line
                key={key}
                x1={a.x + 8}
                y1={a.y + 5}
                x2={b.x + 8}
                y2={b.y + 5}
                stroke="#c0392b"
                strokeWidth="0.35"
                opacity="0.7"
              />
            ))}
          </svg>

          {BOARD_CARDS.map((card) => (
            <BoardCardItem
              key={card.id}
              card={card}
              selected={selected.includes(card.id)}
              shaking={shaking.includes(card.id)}
              connected={madeConnections.some(
                ({ a, b }) => a.id === card.id || b.id === card.id,
              )}
              onTap={() => toggleSelect(card.id)}
            />
          ))}

          {selected.length === 2 && (
            <motion.button
              type="button"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={handleConnect}
              className="absolute bottom-4 left-1/2 z-20 min-h-[48px] -translate-x-1/2 border-2 border-red-900 bg-red-950/80 px-6 py-2 font-mono text-xs font-bold tracking-wider text-red-100"
            >
              CONNECT EVIDENCE
            </motion.button>
          )}

          {selected.length === 1 && (
            <p className="absolute bottom-4 left-1/2 z-20 -translate-x-1/2 font-mono text-[9px] text-[#3a2810]">
              Select second card...
            </p>
          )}
        </motion.div>
      </div>
    </SceneOverlay>
  );
}

function BoardCardItem({
  card,
  selected,
  shaking,
  connected,
  onTap,
}: {
  card: BoardCard;
  selected: boolean;
  shaking: boolean;
  connected: boolean;
  onTap: () => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={onTap}
      animate={shaking ? { x: [0, -4, 4, -4, 4, 0] } : {}}
      transition={{ duration: 0.4 }}
      className={`absolute z-10 flex min-h-[44px] min-w-[72px] flex-col items-start border-2 px-2 py-1.5 shadow-md ${CARD_COLORS[card.type]} ${
        selected ? "ring-2 ring-white/60 scale-105" : ""
      } ${connected ? "opacity-90" : ""}`}
      style={{ left: `${card.x}%`, top: `${card.y}%`, maxWidth: "22%" }}
    >
      <div className="absolute -top-1.5 left-1/2 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-red-700 border border-red-900" />
      <span className="text-[7px] uppercase tracking-wider opacity-60">{card.type}</span>
      <span className="text-[10px] font-bold leading-tight">{card.title}</span>
      <span className="text-[8px] opacity-70">{card.subtitle}</span>
    </motion.button>
  );
}
