"use client";

import { createContext, useContext, useEffect, useMemo, type ReactNode } from "react";
import { audioManager, type SfxId } from "./audio-manager";

type AudioContextValue = {
  play: (id: SfxId) => void;
  register: typeof audioManager.register;
};

const AudioContext = createContext<AudioContextValue | null>(null);

export function AudioProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    audioManager.preloadAll();
  }, []);

  const value = useMemo(
    () => ({
      play: (id: SfxId) => audioManager.play(id),
      register: audioManager.register.bind(audioManager),
    }),
    [],
  );

  return <AudioContext.Provider value={value}>{children}</AudioContext.Provider>;
}

export function useAudio() {
  const ctx = useContext(AudioContext);
  if (!ctx) throw new Error("useAudio must be used within AudioProvider");
  return ctx;
}
