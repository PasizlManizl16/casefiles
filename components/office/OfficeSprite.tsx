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
};

export function OfficeSprite({
  sprite,
  alt = "",
  className = "",
  style,
  brightness = 1,
  priority = false,
}: OfficeSpriteProps) {
  const src = OFFICE_SPRITES[sprite];

  if (sprite === "background") {
    return (
      <div
        className={`absolute inset-0 overflow-hidden ${className}`}
        style={style}
        aria-hidden={!alt}
      >
        <Image
          src={src}
          alt={alt || "Detective office interior"}
          fill
          priority={priority}
          sizes="100vw"
          className="object-cover object-[72%_42%] scale-[1.35]"
          style={{
            filter: `brightness(${brightness}) saturate(0.75) contrast(1.05)`,
          }}
        />
      </div>
    );
  }

  return (
    <div
      className={`absolute ${className}`}
      style={{
        ...style,
        filter: `brightness(${brightness}) drop-shadow(2px 4px 8px rgba(0,0,0,0.5))`,
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className="h-auto w-full max-w-none"
        style={{ imageRendering: "pixelated" }}
        draggable={false}
        loading={priority ? "eager" : "lazy"}
      />
    </div>
  );
}
