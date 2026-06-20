"use client";

export function DeskDetails() {
  return (
    <div className="pointer-events-none absolute inset-0 z-[8]" aria-hidden>
      {/* Coffee stains on desk */}
      <div
        className="absolute bottom-[22%] left-[42%] h-[5%] w-[6%] rounded-full opacity-30"
        style={{
          background: "radial-gradient(ellipse, #3d2817 0%, transparent 70%)",
          transform: "rotate(-15deg)",
        }}
      />
      <div
        className="absolute bottom-[20%] left-[52%] h-[4%] w-[5%] rounded-full opacity-20"
        style={{
          background: "radial-gradient(ellipse, #4a3020 0%, transparent 70%)",
          transform: "rotate(20deg)",
        }}
      />

      {/* Sticky notes */}
      <StickyNote
        className="bottom-[28%] left-[24%] rotate-[-6deg]"
        color="#fef08a"
        lines={["Call lab", "re: samples"]}
      />
      <StickyNote
        className="bottom-[32%] left-[30%] rotate-[4deg]"
        color="#fde68a"
        lines={["Walsh —", "22:41"]}
      />
      <StickyNote
        className="bottom-[26%] left-[78%] rotate-[-3deg]"
        color="#fef3c7"
        lines={["Follow up", "CCTV req"]}
      />

      {/* Open investigation notebook (visual) */}
      <svg
        className="absolute bottom-[24%] left-[32%] h-[14%] w-[10%] drop-shadow-lg"
        viewBox="0 0 80 60"
        style={{ filter: "drop-shadow(2px 4px 6px rgba(0,0,0,0.5))" }}
      >
        <rect x="4" y="8" width="72" height="48" rx="1" fill="#f5f0e6" stroke="#c8b898" strokeWidth="0.5" />
        <line x1="12" y1="20" x2="68" y2="20" stroke="#b8a888" strokeWidth="0.4" opacity="0.6" />
        <line x1="12" y1="28" x2="60" y2="28" stroke="#b8a888" strokeWidth="0.4" opacity="0.5" />
        <line x1="12" y1="36" x2="55" y2="36" stroke="#b8a888" strokeWidth="0.4" opacity="0.4" />
        <path d="M4 8 L4 56" stroke="#8b7355" strokeWidth="1" />
        <text x="14" y="18" fill="#6b5530" fontSize="4" fontFamily="serif" fontStyle="italic">
          timeline??
        </text>
      </svg>

      {/* Pen */}
      <svg
        className="absolute bottom-[23%] left-[44%] h-[3%] w-[6%] rotate-[35deg]"
        viewBox="0 0 60 12"
        style={{ filter: "drop-shadow(1px 2px 3px rgba(0,0,0,0.6))" }}
      >
        <rect x="8" y="3" width="44" height="6" rx="1" fill="#1a1a2a" />
        <polygon points="52,3 60,6 52,9" fill="#888" />
        <rect x="4" y="4" width="6" height="4" rx="1" fill="#c0392b" />
      </svg>

      {/* Stack of previous case folders */}
      <svg
        className="absolute bottom-[22%] right-[18%] h-[12%] w-[9%]"
        viewBox="0 0 70 50"
        style={{ filter: "drop-shadow(3px 5px 8px rgba(0,0,0,0.45))" }}
      >
        <path d="M6 14 L6 44 Q6 47 9 47 L58 47 Q61 47 61 44 L61 18 Q61 15 58 15 L32 15 L26 10 L9 10 Q6 10 6 13 Z" fill="#a08050" opacity="0.9" transform="translate(4,4)" />
        <path d="M4 12 L4 42 Q4 45 7 45 L56 45 Q59 45 59 42 L59 16 Q59 13 56 13 L30 13 L24 8 L7 8 Q4 8 4 11 Z" fill="#b8935a" opacity="0.95" transform="translate(2,2)" />
        <path d="M2 10 L2 40 Q2 43 5 43 L54 43 Q57 43 57 40 L57 14 Q57 11 54 11 L28 11 L22 6 L5 6 Q2 6 2 9 Z" fill="#c4a35a" />
        <text x="10" y="28" fill="#5a4020" fontSize="5" fontFamily="monospace">CF-2025</text>
        <text x="10" y="35" fill="#5a4020" fontSize="4" fontFamily="monospace" opacity="0.7">ARCHIVED</text>
      </svg>

      {/* Closed notebook stack */}
      <svg
        className="absolute bottom-[24%] left-[20%] h-[8%] w-[6%] rotate-[-8deg]"
        viewBox="0 0 40 50"
        style={{ filter: "drop-shadow(2px 3px 5px rgba(0,0,0,0.5))" }}
      >
        <rect x="4" y="6" width="32" height="40" rx="1" fill="#2a2520" stroke="#1a1510" strokeWidth="0.5" />
        <rect x="6" y="8" width="2" height="36" fill="#8b7355" />
        <line x1="10" y1="14" x2="30" y2="14" stroke="#4a4035" strokeWidth="0.5" opacity="0.5" />
        <line x1="10" y1="20" x2="28" y2="20" stroke="#4a4035" strokeWidth="0.5" opacity="0.4" />
      </svg>
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
      className={`absolute w-[5%] min-w-[36px] px-1 py-1 shadow-md ${className}`}
      style={{
        background: color,
        boxShadow: "2px 3px 6px rgba(0,0,0,0.35), inset 0 -1px 0 rgba(0,0,0,0.08)",
      }}
    >
      {lines.map((line) => (
        <p key={line} className="font-[family-name:var(--font-geist-mono)] text-[6px] leading-tight text-[#3a3010]">
          {line}
        </p>
      ))}
    </div>
  );
}
