"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { AmbientEffects } from "./AmbientEffects";
import { AmbientEventLayer } from "./AmbientEventLayer";
import { DeskDetails } from "./DeskDetails";
import { DeskObject } from "./DeskObject";
import { OfficeSprite } from "./OfficeSprite";
import { useScene } from "@/lib/scene-context";
import { useAudio } from "@/lib/audio-context";
import { useDeskParallax } from "@/lib/use-desk-parallax";
import { useAmbientEvents } from "@/lib/use-ambient-events";
import { SCENES } from "@/lib/scenes";
import {
  DESK_SPRITE_LAYOUT,
  HOTSPOT_LAYOUT,
  SCENE_LIGHTING,
} from "@/lib/office-assets";

type DeskHubProps = {
  blurred?: boolean;
  isActive?: boolean;
};

const LAYER_PARALLAX = {
  background: "background",
  wall: "wall",
  desk: "desk",
  props: "desk",
} as const;

function EvidenceBoardWallOverlay() {
  return (
    <div
      className="pointer-events-none absolute z-[5]"
      style={{
        right: "4%",
        top: "5%",
        width: "26%",
        height: "42%",
      }}
      aria-hidden
    >
      <div
        className="absolute inset-0 rounded-sm opacity-30 mix-blend-multiply"
        style={{
          background: `
            repeating-linear-gradient(
              90deg,
              #6b5344 0px,
              #7a6352 2px,
              #5c4638 4px
            ),
            repeating-linear-gradient(
              0deg,
              transparent 0px,
              rgba(0,0,0,0.04) 1px,
              transparent 2px
            )
          `,
        }}
      />
      {[
        { left: "18%", top: "22%" },
        { left: "62%", top: "18%" },
        { left: "44%", top: "48%" },
        { left: "78%", top: "55%" },
      ].map((pin, i) => (
        <div
          key={i}
          className="absolute h-[5%] w-[5%] min-h-[6px] min-w-[6px] rounded-full"
          style={{
            left: pin.left,
            top: pin.top,
            background: "radial-gradient(circle at 35% 35%, #e57373, #8b1a1a)",
            boxShadow: "0 2px 4px rgba(0,0,0,0.5)",
          }}
        />
      ))}
      <svg
        className="absolute inset-0 h-full w-full opacity-35"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <line x1="20" y1="24" x2="44" y2="50" stroke="#8b0000" strokeWidth="0.4" />
        <line x1="62" y1="20" x2="44" y2="50" stroke="#8b0000" strokeWidth="0.4" />
        <line x1="78" y1="56" x2="44" y2="50" stroke="#8b0000" strokeWidth="0.3" />
      </svg>
    </div>
  );
}

export function DeskHub({ blurred = false, isActive = true }: DeskHubProps) {
  const { goToScene } = useScene();
  const { play } = useAudio();
  const parallax = useDeskParallax(isActive && !blurred);
  const ambient = useAmbientEvents(isActive && !blurred);

  useEffect(() => {
    if (ambient.phoneVibrating) play("phone-vibrate");
  }, [ambient.phoneVibrating, play]);

  const getParallax = (layer: keyof typeof LAYER_PARALLAX) => {
    const key = LAYER_PARALLAX[layer];
    return parallax[key];
  };

  const layers = {
    background: DESK_SPRITE_LAYOUT.filter((s) => s.layer === "background"),
    wall: DESK_SPRITE_LAYOUT.filter((s) => s.layer === "wall"),
    desk: DESK_SPRITE_LAYOUT.filter(
      (s) => s.layer === "desk" || s.layer === "props",
    ),
  };

  const { monitorGlow, lampGlow, phoneVibrate } = SCENE_LIGHTING;

  return (
    <motion.div
      className="relative h-full w-full overflow-hidden bg-[#060a12]"
      animate={{ filter: blurred ? "blur(8px)" : "blur(0px)" }}
      transition={{ duration: 0.35 }}
      onPointerMove={parallax.handlePointerMove}
      onPointerLeave={parallax.handlePointerLeave}
    >
      <div className="absolute inset-0 z-[1] bg-gradient-to-br from-[#0a1628]/90 via-[#0d1a2d]/50 to-[#1a1208]/80" />

      <motion.div
        className="absolute inset-0 z-0"
        style={{ x: getParallax("background").x, y: getParallax("background").y }}
      >
        {layers.background.map((item) => (
          <OfficeSprite
            key={item.id}
            sprite={item.sprite}
            priority
            brightness={item.brightness ?? 1}
            depthBlur={item.depthBlur}
            className="inset-0 h-full w-full"
          />
        ))}
        <AmbientEffects
          rainIntensity={ambient.rainIntensity}
          monitorFlicker={ambient.monitorFlicker}
        />
        <AmbientEventLayer activeEvent={ambient.activeEvent} />
      </motion.div>

      <motion.div
        className="absolute inset-0 z-[2]"
        style={{ x: getParallax("wall").x, y: getParallax("wall").y }}
      >
        {layers.wall.map((item) => (
          <OfficeSprite
            key={item.id}
            sprite={item.sprite}
            brightness={item.brightness ?? 0.95}
            shadow={item.shadow}
            style={{
              left: item.left,
              top: item.top,
              width: item.width,
              height: item.height ?? "auto",
              zIndex: item.zIndex,
            }}
          />
        ))}
        <EvidenceBoardWallOverlay />
        <div
          className="pointer-events-none absolute z-[3] opacity-70"
          style={{ left: "-2%", top: "4%", width: "34%", height: "38%" }}
        >
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, rgba(30,60,120,0.35) 0%, transparent 55%)",
            }}
          />
        </div>
      </motion.div>

      <motion.div
        className="absolute inset-0 z-[3]"
        style={{ x: getParallax("desk").x, y: getParallax("desk").y }}
      >
        {layers.desk.map((item) => (
          <OfficeSprite
            key={item.id}
            sprite={item.sprite}
            brightness={item.brightness ?? 1}
            shadow={item.shadow}
            style={{
              left: item.left,
              top: item.top,
              width: item.width,
              height: item.height ?? "auto",
              zIndex: item.zIndex,
            }}
          />
        ))}

        <DeskDetails />

        <div
          className="pointer-events-none absolute rounded-full"
          style={{
            left: lampGlow.left,
            top: lampGlow.top,
            width: lampGlow.width,
            height: lampGlow.height,
            zIndex: 4,
            background:
              "radial-gradient(ellipse at 55% 45%, rgba(255,183,77,0.42) 0%, rgba(255,140,40,0.12) 45%, transparent 72%)",
          }}
        />

        <div
          className={`pointer-events-none absolute rounded-lg transition-opacity duration-150 ${
            ambient.monitorFlicker ? "opacity-35" : "opacity-100"
          }`}
          style={{
            left: monitorGlow.left,
            top: monitorGlow.top,
            width: monitorGlow.width,
            height: monitorGlow.height,
            zIndex: 5,
            background:
              "radial-gradient(ellipse at center, rgba(79,195,247,0.45) 0%, rgba(41,121,255,0.15) 40%, transparent 72%)",
          }}
        />

        <motion.div
          className="absolute"
          animate={
            ambient.phoneVibrating
              ? { x: [0, -1, 1, -1, 0], rotate: [0, -1, 1, 0] }
              : {}
          }
          style={{
            left: phoneVibrate.left,
            top: phoneVibrate.top,
            width: phoneVibrate.width,
            height: phoneVibrate.height,
            zIndex: 9,
          }}
        />
      </motion.div>

      <DeskObject
        label="Computer Monitor"
        onClick={() => goToScene(SCENES.MONITOR)}
        className="z-30"
        style={HOTSPOT_LAYOUT.monitor}
      />
      <DeskObject
        label="Smartphone"
        onClick={() => goToScene(SCENES.PHONE)}
        className="z-30"
        style={HOTSPOT_LAYOUT.phone}
      />
      <DeskObject
        label="Investigation Folder"
        onClick={() => goToScene(SCENES.FOLDER)}
        className="z-30"
        style={HOTSPOT_LAYOUT.folder}
      />
      <DeskObject
        label="Investigator Notebook"
        onClick={() => goToScene(SCENES.NOTEBOOK)}
        className="z-30"
        style={HOTSPOT_LAYOUT.notebook}
      />
      <DeskObject
        label="Evidence Board"
        onClick={() => goToScene(SCENES.EVIDENCE_BOARD)}
        className="z-30"
        style={{
          right: HOTSPOT_LAYOUT.evidenceBoard.right,
          top: HOTSPOT_LAYOUT.evidenceBoard.top,
          width: HOTSPOT_LAYOUT.evidenceBoard.width,
          height: HOTSPOT_LAYOUT.evidenceBoard.height,
        }}
      />

      <div
        className="pointer-events-none absolute inset-0 z-[20]"
        style={{
          background:
            "radial-gradient(ellipse at 46% 40%, transparent 28%, rgba(4,6,12,0.82) 100%)",
        }}
      />
    </motion.div>
  );
}
