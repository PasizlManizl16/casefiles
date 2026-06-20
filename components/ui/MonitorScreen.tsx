"use client";

type MonitorScreenProps = {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
};

export function MonitorScreen({ children, className = "", glow = true }: MonitorScreenProps) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {glow && (
        <div
          className="pointer-events-none absolute inset-0 z-10"
          style={{
            background:
              "radial-gradient(ellipse at 50% 30%, rgba(79,195,247,0.08) 0%, transparent 60%)",
          }}
        />
      )}
      <div
        className="pointer-events-none absolute inset-0 z-20 opacity-[0.04]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.4) 2px, rgba(0,0,0,0.4) 4px)",
        }}
      />
      <div className="monitor-flicker pointer-events-none absolute inset-0 z-20 bg-cyan-400/0" />
      {children}
    </div>
  );
}
