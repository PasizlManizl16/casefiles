"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { SCENES, type SceneId } from "./scenes";

type SceneContextValue = {
  activeScene: SceneId;
  isDesk: boolean;
  goToScene: (scene: SceneId) => void;
  backToDesk: () => void;
};

const SceneContext = createContext<SceneContextValue | null>(null);

export function SceneProvider({ children }: { children: ReactNode }) {
  const [activeScene, setActiveScene] = useState<SceneId>(SCENES.DESK);

  const goToScene = useCallback((scene: SceneId) => {
    setActiveScene(scene);
  }, []);

  const backToDesk = useCallback(() => {
    setActiveScene(SCENES.DESK);
  }, []);

  const value = useMemo(
    () => ({
      activeScene,
      isDesk: activeScene === SCENES.DESK,
      goToScene,
      backToDesk,
    }),
    [activeScene, goToScene, backToDesk],
  );

  return <SceneContext.Provider value={value}>{children}</SceneContext.Provider>;
}

export function useScene() {
  const context = useContext(SceneContext);
  if (!context) {
    throw new Error("useScene must be used within SceneProvider");
  }
  return context;
}
