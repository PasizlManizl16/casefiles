"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { AmbientEffects } from "./AmbientEffects";
import { AmbientEventLayer } from "./AmbientEventLayer";
import { DeskDetails } from "./DeskDetails";
import { DeskObject } from "./DeskObject";
import { useScene } from "@/lib/scene-context";
import { useAudio } from "@/lib/audio-context";
import { useDeskParallax } from "@/lib/use-desk-parallax";
import { useAmbientEvents } from "@/lib/use-ambient-events";
import { SCENES } from "@/lib/scenes";

type DeskHubProps = {
  blurred?: boolean;
  isActive?: boolean;
};

export function DeskHub({ blurred = false, isActive = true }: DeskHubProps) {
  const { goToScene } = useScene();
  const { play } = useAudio();
  const parallax = useDeskParallax(isActive && !blurred);
  const ambient = useAmbientEvents(isActive && !blurred);

  useEffect(() => {
    if (ambient.phoneVibrating) play("phone-vibrate");
  }, [ambient.phoneVibrating, play]);

  return (
    <motion.div
      className="relative h-full w-full overflow-hidden"
      animate={{ filter: blurred ? "blur(8px)" : "blur(0px)" }}
      transition={{ duration: 0.35 }}
      onPointerMove={parallax.handlePointerMove}
      onPointerLeave={parallax.handlePointerLeave}
    >
      {/* Background layer — slowest parallax */}
      <motion.div
        className="absolute inset-0"
        style={{ x: parallax.background.x, y: parallax.background.y }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, #0d1a2d 0%, #122033 35%, #1a2a3f 60%, #0f1825 100%)",
          }}
        />
        <AmbientEffects
          rainIntensity={ambient.rainIntensity}
          monitorFlicker={ambient.monitorFlicker}
        />
        <AmbientEventLayer activeEvent={ambient.activeEvent} />
      </motion.div>

      {/* Wall layer — board, window */}
      <motion.div
        className="absolute inset-0"
        style={{ x: parallax.wall.x, y: parallax.wall.y }}
      >
        {/* Window */}
        <svg
          className="absolute left-[2%] top-[8%] h-[42%] w-[28%]"
          viewBox="0 0 200 140"
          aria-hidden
          style={{ filter: "drop-shadow(4px 8px 16px rgba(0,0,0,0.4))" }}
        >
          <rect x="4" y="4" width="192" height="132" rx="2" fill="#1a2535" stroke="#2a3a50" strokeWidth="3" />
          <line x1="100" y1="4" x2="100" y2="136" stroke="#2a3a50" strokeWidth="2" />
          <line x1="4" y1="70" x2="196" y2="70" stroke="#2a3a50" strokeWidth="2" />
          <rect x="8" y="8" width="88" height="58" fill="#0a1520" opacity="0.9" />
          <rect x="104" y="8" width="88" height="58" fill="#0a1520" opacity="0.85" />
          <rect x="8" y="74" width="88" height="58" fill="#0a1520" opacity="0.88" />
          <rect x="104" y="74" width="88" height="58" fill="#0a1520" opacity="0.82" />
        </svg>

        {/* Evidence board on wall — decorative */}
        <svg
          className="absolute right-[6%] top-[10%] h-[48%] w-[22%]"
          viewBox="0 0 160 180"
          aria-hidden
          style={{ filter: "drop-shadow(6px 10px 20px rgba(0,0,0,0.5))" }}
        >
          <rect x="8" y="8" width="144" height="164" rx="3" fill="#5a4010" />
          <rect x="14" y="14" width="132" height="152" fill="#8b6914" />
          <rect x="28" y="32" width="38" height="28" rx="1" fill="#d4c4a0" opacity="0.7" transform="rotate(-2 47 46)" />
          <rect x="95" y="42" width="36" height="26" rx="1" fill="#e8dcc0" opacity="0.65" transform="rotate(3 113 55)" />
          <rect x="55" y="85" width="48" height="32" rx="1" fill="#c8b890" opacity="0.6" />
          <circle cx="40" cy="45" r="3" fill="#c0392b" />
          <circle cx="120" cy="55" r="3" fill="#c0392b" />
          <circle cx="80" cy="100" r="3" fill="#c0392b" />
          <path d="M40 45 L120 55 L80 100" fill="none" stroke="#c0392b" strokeWidth="0.8" opacity="0.5" />
        </svg>

        {/* Lamp */}
        <svg
          className="absolute left-[14%] top-[18%] h-[38%] w-[14%] lamp-glow"
          viewBox="0 0 80 120"
          aria-hidden
          style={{ filter: "drop-shadow(0 8px 24px rgba(255,140,50,0.15))" }}
        >
          <path d="M40 118 L40 60" stroke="#3a3a3a" strokeWidth="3" />
          <ellipse cx="40" cy="118" rx="18" ry="4" fill="#2a2a2a" />
          <path d="M15 58 Q40 20 65 58 Z" fill="#2a2520" stroke="#1a1510" strokeWidth="1" />
          <path d="M18 58 Q40 28 62 58 Z" fill="#ffb347" opacity="0.3" />
        </svg>
      </motion.div>

      {/* Desk layer — fastest parallax */}
      <motion.div
        className="absolute inset-0"
        style={{ x: parallax.desk.x, y: parallax.desk.y }}
      >
        {/* Desk surface shadow */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[38%]"
          style={{
            background:
              "linear-gradient(180deg, #4a3528 0%, #3d2b1f 15%, #5c4033 50%, #3d2b1f 100%)",
            boxShadow: "inset 0 12px 30px rgba(0,0,0,0.5), 0 -4px 20px rgba(0,0,0,0.3)",
          }}
        />
        <div
          className="absolute bottom-[38%] left-0 right-0 h-1.5"
          style={{
            background: "linear-gradient(90deg, transparent, #6b5040 30%, #7a6050 50%, #6b5040 70%, transparent)",
            boxShadow: "0 2px 8px rgba(0,0,0,0.4)",
          }}
        />

        <DeskDetails />

        {/* Monitor */}
        <motion.svg
          className="absolute left-[36%] top-[26%] h-[36%] w-[26%] monitor-glow"
          viewBox="0 0 200 150"
          aria-hidden
          animate={ambient.monitorFlicker ? { opacity: [1, 0.7, 1] } : { opacity: 1 }}
          style={{ filter: "drop-shadow(0 0 20px rgba(79,195,247,0.2)) drop-shadow(4px 8px 16px rgba(0,0,0,0.5))" }}
        >
          <rect x="20" y="10" width="160" height="105" rx="4" fill="#1a1a1a" stroke="#333" strokeWidth="2" />
          <rect x="26" y="16" width="148" height="93" rx="2" fill="#0a1628" />
          <rect x="36" y="28" width="14" height="14" rx="2" fill="#4fc3f7" opacity="0.6" />
          <rect x="56" y="28" width="14" height="14" rx="2" fill="#81c784" opacity="0.5" />
          <rect x="76" y="28" width="14" height="14" rx="2" fill="#ffb74d" opacity="0.5" />
          <rect x="26" y="16" width="148" height="93" rx="2" fill="url(#deskMonitorGlow)" opacity="0.4" />
          <rect x="85" y="115" width="30" height="8" rx="1" fill="#2a2a2a" />
          <rect x="70" y="123" width="60" height="6" rx="2" fill="#1a1a1a" />
          <defs>
            <linearGradient id="deskMonitorGlow" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4fc3f7" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#4fc3f7" stopOpacity="0" />
            </linearGradient>
          </defs>
        </motion.svg>

        {/* Phone */}
        <motion.svg
          className="absolute left-[58%] top-[52%] h-[18%] w-[8%]"
          viewBox="0 0 60 100"
          aria-hidden
          animate={
            ambient.phoneVibrating
              ? { x: [0, -1, 1, -1, 1, 0], rotate: [0, -0.5, 0.5, 0] }
              : { x: 0, rotate: 0 }
          }
          transition={{ duration: 0.3, repeat: ambient.phoneVibrating ? 3 : 0 }}
          style={{ filter: "drop-shadow(3px 6px 12px rgba(0,0,0,0.55))" }}
        >
          <rect x="8" y="4" width="44" height="92" rx="8" fill="#1a1a22" stroke="#333" strokeWidth="2" />
          <rect x="12" y="14" width="36" height="72" rx="2" fill="#0d1117" />
          <rect x="22" y="8" width="16" height="4" rx="2" fill="#222" />
          <circle cx="30" cy="90" r="4" fill="#222" stroke="#444" strokeWidth="1" />
        </motion.svg>

        {/* Folder */}
        <svg
          className="absolute left-[66%] top-[48%] h-[16%] w-[12%]"
          viewBox="0 0 100 70"
          aria-hidden
          style={{ filter: "drop-shadow(4px 8px 14px rgba(0,0,0,0.45))" }}
        >
          <path d="M8 18 L8 62 Q8 66 12 66 L88 66 Q92 66 92 62 L92 22 Q92 18 88 18 L45 18 L38 12 L12 12 Q8 12 8 16 Z" fill="#c4a35a" stroke="#8b7355" strokeWidth="1" />
          <path d="M8 22 L92 22 L92 62 Q92 66 88 66 L12 66 Q8 66 8 62 Z" fill="#d4b896" />
        </svg>

        {/* Coffee mug */}
        <svg
          className="absolute left-[48%] top-[58%] h-[10%] w-[5%]"
          viewBox="0 0 40 50"
          aria-hidden
          style={{ filter: "drop-shadow(2px 4px 8px rgba(0,0,0,0.5))" }}
        >
          <rect x="8" y="12" width="22" height="30" rx="2" fill="#2a3a4a" stroke="#1a2a3a" strokeWidth="1" />
          <path d="M30 18 Q38 18 38 28 Q38 38 30 38" fill="none" stroke="#2a3a4a" strokeWidth="2" />
          <ellipse cx="19" cy="12" rx="11" ry="3" fill="#1a2a3a" />
        </svg>

        {/* Interactive notebook object — open journal on desk */}
        <DeskObject
          label="Investigator Notebook"
          onClick={() => goToScene(SCENES.NOTEBOOK)}
          className="bottom-[24%] left-[32%] h-[14%] w-[10%]"
        />

        <DeskObject
          label="Computer Monitor"
          onClick={() => goToScene(SCENES.MONITOR)}
          className="left-[36%] top-[26%] h-[36%] w-[26%]"
        />
        <DeskObject
          label="Smartphone"
          onClick={() => goToScene(SCENES.PHONE)}
          className="left-[58%] top-[52%] h-[18%] w-[8%]"
        />
        <DeskObject
          label="Investigation Folder"
          onClick={() => goToScene(SCENES.FOLDER)}
          className="left-[66%] top-[48%] h-[16%] w-[12%]"
        />
        <DeskObject
          label="Evidence Board"
          onClick={() => goToScene(SCENES.EVIDENCE_BOARD)}
          className="right-[6%] top-[10%] h-[48%] w-[22%]"
        />
      </motion.div>
    </motion.div>
  );
}
