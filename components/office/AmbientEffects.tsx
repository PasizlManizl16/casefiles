"use client";

const RAIN_DROPS = Array.from({ length: 28 }, (_, i) => ({
  id: i,
  left: `${(i * 3.7 + (i % 5) * 2) % 100}%`,
  delay: `${(i * 0.17) % 2.5}s`,
  duration: `${0.8 + (i % 7) * 0.15}s`,
  height: `${12 + (i % 4) * 6}px`,
  opacity: 0.15 + (i % 5) * 0.08,
}));

export function AmbientEffects() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Window rain */}
      <div className="absolute left-[2%] top-[8%] h-[42%] w-[28%] overflow-hidden rounded-sm opacity-80">
        {RAIN_DROPS.map((drop) => (
          <span
            key={drop.id}
            className="rain-drop absolute w-px bg-gradient-to-b from-transparent via-sky-200/50 to-transparent"
            style={{
              left: drop.left,
              height: drop.height,
              opacity: drop.opacity,
              animationDelay: drop.delay,
              animationDuration: drop.duration,
            }}
          />
        ))}
      </div>

      {/* Lamp warm glow */}
      <div
        className="lamp-glow absolute left-[18%] top-[22%] h-[55%] w-[35%] rounded-full"
        style={{
          background:
            "radial-gradient(ellipse at 30% 20%, rgba(255,179,71,0.22) 0%, rgba(255,140,50,0.08) 35%, transparent 70%)",
        }}
      />

      {/* Monitor blue glow */}
      <div
        className="monitor-glow absolute left-[38%] top-[28%] h-[38%] w-[28%] rounded-lg"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(79,195,247,0.25) 0%, rgba(79,195,247,0.05) 50%, transparent 75%)",
        }}
      />

      {/* Desk reflection shimmer */}
      <div
        className="desk-shimmer absolute bottom-[18%] left-[20%] h-[8%] w-[60%] rounded-full"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255,200,120,0.15), transparent)",
        }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 45%, transparent 40%, rgba(5,10,20,0.65) 100%)",
        }}
      />
    </div>
  );
}
