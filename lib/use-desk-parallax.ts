"use client";

import { useCallback, useRef, useState } from "react";

type ParallaxLayer = { x: number; y: number };

export function useDeskParallax(enabled: boolean) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const frameRef = useRef<number | null>(null);
  const targetRef = useRef({ x: 0, y: 0 });

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!enabled) return;
      const nx = (e.clientX / window.innerWidth - 0.5) * 2;
      const ny = (e.clientY / window.innerHeight - 0.5) * 2;
      targetRef.current = { x: nx, y: ny };

      if (frameRef.current === null) {
        frameRef.current = requestAnimationFrame(() => {
          setOffset({ ...targetRef.current });
          frameRef.current = null;
        });
      }
    },
    [enabled],
  );

  const handlePointerLeave = useCallback(() => {
    targetRef.current = { x: 0, y: 0 };
    setOffset({ x: 0, y: 0 });
  }, []);

  const layer = (depth: number): ParallaxLayer => ({
    x: offset.x * depth,
    y: offset.y * depth,
  });

  return {
    handlePointerMove,
    handlePointerLeave,
    background: layer(3),
    wall: layer(5),
    board: layer(4),
    desk: layer(10),
  };
}
