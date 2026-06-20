"use client";

import { useEffect } from "react";

export function LandscapeLock() {
  useEffect(() => {
    const lock = async () => {
      try {
        const orientation = screen.orientation as ScreenOrientation & {
          lock?: (type: string) => Promise<void>;
        };
        if (orientation?.lock) {
          await orientation.lock("landscape");
        }
      } catch {
        // iOS and some browsers block orientation lock
      }
    };

    void lock();
  }, []);

  return (
    <div className="portrait-blocker fixed inset-0 z-[9999] hidden flex-col items-center justify-center bg-[#0a1628] px-8 text-center">
      <div className="mb-6 text-5xl">↻</div>
      <h1 className="mb-2 text-xl font-semibold tracking-wide text-amber-200">
        CASEFILES
      </h1>
      <p className="max-w-xs text-sm text-slate-400">
        Rotate your phone to continue the investigation.
      </p>
    </div>
  );
}
