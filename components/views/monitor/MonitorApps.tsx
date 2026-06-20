"use client";

import { CASE_ID, CASE_TITLE, CCTV_CAMERAS, EMAILS, SUSPECTS, TIMELINE_EVENTS } from "@/lib/case-data";

type AppWindowProps = {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
};

export function AppWindow({ title, onClose, children }: AppWindowProps) {
  return (
    <div className="absolute inset-3 z-30 flex flex-col border border-cyan-900/50 bg-[#0a1218]/95 shadow-2xl">
      <div className="flex h-7 shrink-0 items-center justify-between border-b border-cyan-900/40 bg-[#0d1820] px-2">
        <span className="font-mono text-[10px] uppercase tracking-wider text-cyan-400/80">
          {title}
        </span>
        <button
          type="button"
          onClick={onClose}
          className="min-h-[28px] min-w-[28px] px-2 font-mono text-xs text-cyan-600 hover:text-cyan-300"
        >
          ✕
        </button>
      </div>
      <div className="flex-1 overflow-y-auto overscroll-contain p-3" style={{ WebkitOverflowScrolling: "touch" }}>
        {children}
      </div>
    </div>
  );
}

export function CaseFilesApp() {
  return (
    <div className="space-y-3 font-mono text-[11px] text-cyan-100/90">
      <div className="border border-cyan-900/40 bg-cyan-950/30 p-3">
        <p className="text-[9px] text-cyan-500">ACTIVE CASE</p>
        <p className="mt-1 text-sm font-bold text-cyan-300">{CASE_ID}</p>
        <p className="text-xs text-cyan-200/80">{CASE_TITLE}</p>
      </div>
      <div className="space-y-2">
        <p className="text-[9px] text-cyan-600">SUMMARY</p>
        <p className="leading-relaxed text-cyan-100/70">
          Night shift investigation. Forced entry at warehouse district. Multiple witnesses pending re-interview. Forensic analysis in progress.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className="border border-cyan-900/30 p-2">
          <p className="text-[9px] text-cyan-600">STATUS</p>
          <p className="text-cyan-300">OPEN</p>
        </div>
        <div className="border border-cyan-900/30 p-2">
          <p className="text-[9px] text-cyan-600">PRIORITY</p>
          <p className="text-amber-400">HIGH</p>
        </div>
      </div>
    </div>
  );
}

export function PoliceDatabaseApp() {
  return (
    <div className="space-y-2">
      {SUSPECTS.map((s) => (
        <div key={s.id} className="border border-emerald-900/40 bg-emerald-950/20 p-2">
          <div className="flex items-start justify-between gap-2">
            <p className="font-mono text-xs font-bold text-emerald-300">{s.name}</p>
            <span className="shrink-0 border border-emerald-700/50 px-1.5 py-0.5 font-mono text-[8px] text-emerald-500">
              {s.status}
            </span>
          </div>
          <p className="mt-1 font-mono text-[10px] text-emerald-100/60">{s.notes}</p>
        </div>
      ))}
    </div>
  );
}

export function CctvArchiveApp() {
  return (
    <div className="grid grid-cols-2 gap-2">
      {CCTV_CAMERAS.map((cam) => (
        <div
          key={cam.id}
          className={`relative aspect-video border ${cam.locked ? "border-amber-900/40 bg-black/60" : "border-amber-700/40 bg-amber-950/20"}`}
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            {cam.locked ? (
              <>
                <span className="text-lg opacity-40">🔒</span>
                <span className="mt-1 font-mono text-[8px] text-amber-600">ACCESS DENIED</span>
              </>
            ) : (
              <span className="font-mono text-[8px] text-amber-400">▶ LIVE</span>
            )}
          </div>
          <p className="absolute bottom-0 left-0 right-0 bg-black/70 px-1 py-0.5 font-mono text-[7px] text-amber-200/80">
            {cam.label}
          </p>
        </div>
      ))}
    </div>
  );
}

export function EmailApp() {
  return (
    <div className="divide-y divide-purple-900/30">
      {EMAILS.map((email) => (
        <div
          key={email.id}
          className={`px-2 py-2 ${email.unread ? "bg-purple-950/30" : "opacity-70"}`}
        >
          <div className="flex items-center gap-2">
            {email.unread && <span className="h-1.5 w-1.5 rounded-full bg-purple-400" />}
            <p className="font-mono text-[10px] font-bold text-purple-200">{email.from}</p>
          </div>
          <p className="mt-0.5 font-mono text-[10px] text-purple-300/90">{email.subject}</p>
          <p className="font-mono text-[9px] text-purple-400/60">{email.preview}</p>
        </div>
      ))}
    </div>
  );
}

export function TimelineApp() {
  return (
    <div className="relative pl-4">
      <div className="absolute bottom-0 left-1.5 top-0 w-px bg-red-900/50" />
      {TIMELINE_EVENTS.map((ev, i) => (
        <div key={i} className="relative mb-4">
          <div className="absolute -left-2.5 top-1 h-2 w-2 rounded-full border border-red-600 bg-red-950" />
          <p className="font-mono text-[9px] text-red-500">{ev.time}</p>
          <p className="font-mono text-[10px] text-red-100/80">{ev.event}</p>
        </div>
      ))}
    </div>
  );
}
