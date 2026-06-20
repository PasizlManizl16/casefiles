"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { BackButton } from "@/components/ui/BackButton";
import { SceneOverlay } from "@/components/ui/SceneOverlay";
import { useScene } from "@/lib/scene-context";
import { useProgress } from "@/lib/progress-context";
import { useNotifications } from "@/lib/notification-context";
import { useAudio } from "@/lib/audio-context";
import { BOARD_CARDS, CASE_ID, type BoardCard } from "@/lib/case-data";

const CARD_COLORS: Record<BoardCard["type"], string> = {
  suspect: "bg-[#e8dcc8] text-[#2a1f0a] border-[#8b6914]",
  evidence: "bg-[#d4e8f0] text-[#1a2830] border-[#4a7080]",
  location: "bg-[#f0e4c8] text-[#3a2810] border-[#8b7355]",
  question: "bg-[#f5e6f0] text-[#2a1020] border-[#8b6080]",
};

const BOARD_DECORATIONS = [
  { id: "d1", type: "photo" as const, x: 8, y: 12, w: 14, h: 12, label: "Scene", rotation: -3 },
  { id: "d2", type: "document" as const, x: 72, y: 10, w: 16, h: 11, label: "Report", rotation: 2 },
  { id: "d3", type: "sticky" as const, x: 45, y: 8, w: 12, h: 8, label: "Who?", rotation: -1 },
  { id: "d4", type: "photo" as const, x: 75, y: 55, w: 13, h: 11, label: "Alley", rotation: 4, unlockAt: 1 },
  { id: "d5", type: "document" as const, x: 6, y: 75, w: 15, h: 10, label: "Autopsy", rotation: -2, unlockAt: 2 },
  { id: "d6", type: "sticky" as const, x: 55, y: 78, w: 11, h: 7, label: "22:41", rotation: 3, unlockAt: 3 },
];

function curvedString(x1: number, y1: number, x2: number, y2: number) {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2 - 4;
  return `M ${x1} ${y1} Q ${mx} ${my} ${x2} ${y2}`;
}

export function EvidenceBoardView() {
  const { backToDesk } = useScene();
  const { addConnection, validConnections, discoveredEvidence, getClueForConnection } = useProgress();
  const { notify } = useNotifications();
  const { play } = useAudio();
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
      play("evidence-connect");
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

  const visibleDecorations = BOARD_DECORATIONS.filter(
    (d) => !d.unlockAt || discoveredEvidence.length >= d.unlockAt,
  );

  return (
    <SceneOverlay variant="push-board">
      <div className="flex h-full w-full items-center justify-center p-2">
        <motion.div
          className="relative h-full w-full max-w-4xl overflow-hidden"
          style={{
            background: "#7a5c12",
            boxShadow: "inset 0 0 100px rgba(0,0,0,0.35), 8px 12px 40px rgba(0,0,0,0.6)",
          }}
        >
          {/* Frame */}
          <div className="absolute inset-0 border-[10px] border-[#4a3512]" />

          <BackButton onClick={backToDesk} />

          {/* Cork texture */}
          <div
            className="absolute inset-[10px] opacity-40"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 30%, #6b4f1d 1px, transparent 1px), radial-gradient(circle at 70% 60%, #5a4010 1px, transparent 1px)",
              backgroundSize: "6px 6px, 10px 10px",
            }}
          />

          {/* Board label — handwritten style */}
          <div className="absolute left-6 top-5 z-10">
            <p className="font-serif text-sm font-bold italic text-[#2a1f0a]/90">Active Board</p>
            <p className="font-[family-name:var(--font-geist-mono)] text-[8px] text-[#4a3512]/70">{CASE_ID}</p>
          </div>

          {/* Decorative pinned items */}
          {visibleDecorations.map((dec) => (
            <BoardDecoration key={dec.id} {...dec} />
          ))}

          {/* Connection strings — curved */}
          <svg className="absolute inset-[10px] h-[calc(100%-20px)] w-[calc(100%-20px)]" viewBox="0 0 100 100" preserveAspectRatio="none">
            {madeConnections.map(({ a, b, key }) => (
              <path
                key={key}
                d={curvedString(a.x + 8, a.y + 5, b.x + 8, b.y + 5)}
                fill="none"
                stroke="#b91c1c"
                strokeWidth="0.25"
                opacity="0.75"
                strokeLinecap="round"
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
              className="absolute bottom-5 left-1/2 z-20 min-h-[48px] -translate-x-1/2 border-2 border-[#8b0000] bg-[#3a1010]/90 px-5 py-2 font-serif text-xs font-bold italic tracking-wide text-red-100 shadow-lg"
              style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.5)" }}
            >
              Connect Evidence
            </motion.button>
          )}

          {selected.length === 1 && (
            <p className="absolute bottom-5 left-1/2 z-20 -translate-x-1/2 font-serif text-[10px] italic text-[#3a2810]/80">
              Select another item...
            </p>
          )}
        </motion.div>
      </div>
    </SceneOverlay>
  );
}

function BoardDecoration({
  type,
  x,
  y,
  w,
  h,
  label,
  rotation,
}: (typeof BOARD_DECORATIONS)[0]) {
  const shadow = "4px 6px 12px rgba(0,0,0,0.35)";

  if (type === "sticky") {
    return (
      <div
        className="absolute z-[5] flex items-center justify-center px-1"
        style={{
          left: `${x}%`,
          top: `${y}%`,
          width: `${w}%`,
          height: `${h}%`,
          transform: `rotate(${rotation}deg)`,
          background: "#fef08a",
          boxShadow: shadow,
        }}
      >
        <span className="font-[family-name:var(--font-geist-mono)] text-[7px] text-[#3a3010]">{label}</span>
        <PushPin />
      </div>
    );
  }

  if (type === "photo") {
    return (
      <div
        className="absolute z-[5] overflow-hidden"
        style={{
          left: `${x}%`,
          top: `${y}%`,
          width: `${w}%`,
          height: `${h}%`,
          transform: `rotate(${rotation}deg)`,
          boxShadow: shadow,
          background: "linear-gradient(135deg, #2a3a4a, #1a2a3a)",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
        <span className="absolute bottom-0.5 left-1 font-[family-name:var(--font-geist-mono)] text-[6px] text-white/50">{label}</span>
        <PushPin />
      </div>
    );
  }

  return (
    <div
      className="absolute z-[5] border border-[#c8b898]/60 bg-[#f0e8d8] p-1"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: `${w}%`,
        height: `${h}%`,
        transform: `rotate(${rotation}deg)`,
        boxShadow: shadow,
      }}
    >
      <div className="h-full w-full border-b border-[#d0c8b8]/50" />
      <span className="mt-0.5 block font-[family-name:var(--font-geist-mono)] text-[6px] text-[#4a4035]">{label}</span>
      <PushPin />
    </div>
  );
}

function PushPin() {
  return (
    <div
      className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full border border-[#7f1d1d]"
      style={{
        background: "radial-gradient(circle at 30% 30%, #ef4444, #991b1b)",
        boxShadow: "0 1px 3px rgba(0,0,0,0.5)",
      }}
    />
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
      className={`absolute z-10 flex min-h-[44px] min-w-[68px] flex-col items-start border px-2 py-1.5 ${CARD_COLORS[card.type]} ${
        selected ? "ring-2 ring-amber-400/80 scale-105 z-20" : ""
      } ${connected ? "opacity-95" : ""}`}
      style={{
        left: `${card.x}%`,
        top: `${card.y}%`,
        maxWidth: "22%",
        boxShadow: "4px 6px 14px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.15)",
        transform: `rotate(${card.type === "suspect" ? -1 : card.type === "evidence" ? 1 : 0}deg)`,
      }}
    >
      <PushPin />
      <span className="mt-1 text-[6px] uppercase tracking-wider opacity-50">{card.type}</span>
      <span className="text-[10px] font-bold leading-tight">{card.title}</span>
      <span className="text-[8px] opacity-60">{card.subtitle}</span>
    </motion.button>
  );
}
