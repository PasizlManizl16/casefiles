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
import { DESK_SPRITE_LAYOUT, HOTSPOT_LAYOUT } from "@/lib/office-assets";

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
    desk: DESK_SPRITE_LAYOUT.filter((s) => s.layer === "desk" || s.layer === "props"),
  };

  return (
    <motion.div
      className="relative h-full w-full overflow-hidden bg-[#0a1628]"
      animate={{ filter: blurred ? "blur(8px)" : "blur(0px)" }}
      transition={{ duration: 0.35 }}
      onPointerMove={parallax.handlePointerMove}
      onPointerLeave={parallax.handlePointerLeave}
    >
      {/* Night atmosphere over base room */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-[#0a1628]/80 via-[#122033]/40 to-[#1a1208]/70" />

      {/* Background layer */}
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
            className="inset-0 h-full w-full"
          />
        ))}
        <AmbientEffects
          rainIntensity={ambient.rainIntensity}
          monitorFlicker={ambient.monitorFlicker}
        />
        <AmbientEventLayer activeEvent={ambient.activeEvent} />
      </motion.div>

      {/* Wall layer */}
      <motion.div
        className="absolute inset-0 z-[2]"
        style={{ x: getParallax("wall").x, y: getParallax("wall").y }}
      >
        {layers.wall.map((item) => (
          <OfficeSprite
            key={item.id}
            sprite={item.sprite}
            brightness={item.brightness ?? 0.95}
            className=""
            style={{
              left: item.left,
              top: item.top,
              width: item.width,
              height: item.height ?? "auto",
              zIndex: item.zIndex,
            }}
          />
        ))}
      </motion.div>

      {/* Desk & props layer */}
      <motion.div
        className="absolute inset-0 z-[3]"
        style={{ x: getParallax("desk").x, y: getParallax("desk").y }}
      >
        {layers.desk.map((item) => (
          <OfficeSprite
            key={item.id}
            sprite={item.sprite}
            brightness={item.brightness ?? 1}
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

        {/* Monitor glow */}
        <div
          className={`absolute left-[38%] top-[34%] h-[22%] w-[16%] rounded-lg transition-opacity duration-150 ${
            ambient.monitorFlicker ? "opacity-40" : "opacity-100"
          }`}
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(79,195,247,0.35) 0%, transparent 70%)",
            zIndex: 4,
          }}
        />

        {/* Phone vibration target highlight */}
        <motion.div
          className="absolute left-[58%] top-[52%] h-[12%] w-[7%]"
          animate={
            ambient.phoneVibrating
              ? { x: [0, -1, 1, -1, 0], rotate: [0, -1, 1, 0] }
              : {}
          }
          style={{ zIndex: 8 }}
        />
      </motion.div>

      {/* Interactive hotspots */}
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
          right: "6%",
          top: HOTSPOT_LAYOUT.evidenceBoard.top,
          width: HOTSPOT_LAYOUT.evidenceBoard.width,
          height: HOTSPOT_LAYOUT.evidenceBoard.height,
        }}
      />

      {/* Vignette & depth */}
      <div
        className="pointer-events-none absolute inset-0 z-[20]"
        style={{
          background:
            "radial-gradient(ellipse at 48% 42%, transparent 30%, rgba(5,8,16,0.75) 100%)",
        }}
      />
    </motion.div>
  );
}
