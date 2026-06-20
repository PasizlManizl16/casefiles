"use client";

import Image from "next/image";
import { OFFICE_SPRITES, type OfficeSpriteKey } from "@/lib/office-assets";

type OfficeSpriteProps = {
  sprite: OfficeSpriteKey;
  alt?: string;
  className?: string;
  style?: React.CSSProperties;
  brightness?: number;
  priority?: boolean;
  shadow?: boolean;
  depthBlur?: number;
};

export function OfficeSprite({
  sprite,
  alt = "",
  className = "",
  style,
  brightness = 1,
  priority = false,
  shadow = false,
  depthBlur = 0,
}: OfficeSpriteProps) {
  const src = OFFICE_SPRITES[sprite];
  const filterParts = [
    depthBlur > 0 ? `blur(${depthBlur}px)` : null,
    `brightness(${brightness})`,
    "saturate(0.88)",
    "contrast(1.08)",
    shadow || sprite !== "background"
      ? "drop-shadow(0 10px 18px rgba(0,0,0,0.55))"
      : null,
  ]
    .filter(Boolean)
    .join(" ");

  if (sprite === "background") {
    return (
      <div
        className={`absolute inset-0 overflow-hidden ${className}`}
        style={style}
        aria-hidden={!alt}
      >
        <Image
          src={src}
          alt={alt || "Detective office interior at night"}
          fill
          priority={priority}
          sizes="100vw"
          className="object-cover object-center scale-[1.08]"
          style={{ filter: filterParts }}
        />
      </div>
    );
  }

  return (
    <div
      className={`absolute ${className}`}
      style={{ ...style, zIndex: style?.zIndex }}
      aria-hidden={!alt}
    >
      {shadow && (
        <div
          className="pointer-events-none absolute left-1/2 top-[88%] h-[18%] w-[78%] -translate-x-1/2 rounded-[50%]"
          style={{
            background: "radial-gradient(ellipse, rgba(0,0,0,0.55) 0%, transparent 72%)",
            filter: "blur(4px)",
            zIndex: -1,
          }}
        />
      )}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className="relative h-auto w-full max-w-none"
        style={{ filter: filterParts }}
        draggable={false}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
      />
    </div>
  );
}
