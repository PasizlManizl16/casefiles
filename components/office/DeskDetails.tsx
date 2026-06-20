"use client";

/** Ambient desk clutter — sticky notes & stains (procedural overlays). */
export function DeskDetails() {
  return (
    <div className="pointer-events-none absolute inset-0 z-[9]" aria-hidden>
      <div
        className="absolute h-[4%] w-[5%] rounded-full opacity-30"
        style={{
          left: "46%",
          top: "52%",
          background: "radial-gradient(ellipse, #3d2817 0%, transparent 70%)",
          transform: "rotate(-12deg)",
        }}
      />
      <StickyNote
        className="left-[22%] top-[50%] -rotate-6"
        color="#fef08a"
        lines={["Call lab", "re: samples"]}
      />
      <StickyNote
        className="left-[28%] top-[54%] rotate-[5deg]"
        color="#fde68a"
        lines={["Walsh —", "22:41"]}
      />
      <StickyNote
        className="left-[78%] top-[48%] -rotate-3"
        color="#fef3c7"
        lines={["Follow up", "CCTV req"]}
      />
    </div>
  );
}

function StickyNote({
  className,
  color,
  lines,
}: {
  className: string;
  color: string;
  lines: string[];
}) {
  return (
    <div
      className={`absolute w-[4.5%] min-w-[32px] px-1 py-1 ${className}`}
      style={{
        background: color,
        boxShadow: "2px 3px 8px rgba(0,0,0,0.4), inset 0 -1px 0 rgba(0,0,0,0.08)",
      }}
    >
      {lines.map((line) => (
        <p
          key={line}
          className="font-[family-name:var(--font-geist-mono)] text-[5px] leading-tight text-[#3a3010] sm:text-[6px]"
        >
          {line}
        </p>
      ))}
    </div>
  );
}
