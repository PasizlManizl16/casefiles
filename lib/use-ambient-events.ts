"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type AmbientEventType =
  | "phone-vibrate"
  | "lightning"
  | "thunder"
  | "monitor-flicker"
  | "rain-heavy"
  | "rain-light";

export type AmbientEvent = {
  id: number;
  type: AmbientEventType;
};

const EVENT_WEIGHTS: AmbientEventType[] = [
  "rain-light",
  "rain-heavy",
  "monitor-flicker",
  "phone-vibrate",
  "lightning",
  "thunder",
  "rain-light",
  "monitor-flicker",
];

export function useAmbientEvents(enabled: boolean) {
  const [activeEvent, setActiveEvent] = useState<AmbientEvent | null>(null);
  const [rainIntensity, setRainIntensity] = useState(1);
  const [phoneVibrating, setPhoneVibrating] = useState(false);
  const [monitorFlicker, setMonitorFlicker] = useState(false);
  const idRef = useRef(0);

  const triggerEvent = useCallback((type: AmbientEventType) => {
    const id = ++idRef.current;
    setActiveEvent({ id, type });

    switch (type) {
      case "phone-vibrate":
        setPhoneVibrating(true);
        setTimeout(() => setPhoneVibrating(false), 1200);
        break;
      case "lightning":
        setTimeout(() => setActiveEvent(null), 300);
        break;
      case "thunder":
        setTimeout(() => setActiveEvent(null), 800);
        break;
      case "monitor-flicker":
        setMonitorFlicker(true);
        setTimeout(() => setMonitorFlicker(false), 400);
        break;
      case "rain-heavy":
        setRainIntensity(1.6);
        setTimeout(() => setRainIntensity(1), 6000);
        break;
      case "rain-light":
        setRainIntensity(0.6);
        setTimeout(() => setRainIntensity(1), 5000);
        break;
      default:
        setTimeout(() => setActiveEvent(null), 500);
    }
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const schedule = () => {
      const delay = 12000 + Math.random() * 22000;
      return setTimeout(() => {
        const type = EVENT_WEIGHTS[Math.floor(Math.random() * EVENT_WEIGHTS.length)];
        triggerEvent(type);
        timerRef.current = schedule();
      }, delay);
    };

    const timerRef = { current: schedule() };
    return () => clearTimeout(timerRef.current);
  }, [enabled, triggerEvent]);

  return {
    activeEvent,
    rainIntensity,
    phoneVibrating,
    monitorFlicker,
    triggerEvent,
  };
}
