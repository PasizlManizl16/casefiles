"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useNotifications, type NotificationType } from "@/lib/notification-context";

const TYPE_STYLES: Record<NotificationType, string> = {
  evidence: "border-cyan-500/40 bg-cyan-950/90 text-cyan-100",
  connection: "border-red-500/40 bg-red-950/90 text-red-100",
  contradiction: "border-amber-500/40 bg-amber-950/90 text-amber-100",
  document: "border-emerald-500/40 bg-emerald-950/90 text-emerald-100",
};

const TYPE_LABEL: Record<NotificationType, string> = {
  evidence: "NEW CLUE",
  connection: "CONNECTION",
  contradiction: "CONTRADICTION",
  document: "DOCUMENT",
};

export function NotificationToast() {
  const { notifications, dismiss } = useNotifications();

  return (
    <div className="pointer-events-none fixed right-4 top-4 z-[100] flex flex-col gap-2" style={{ top: "max(1rem, var(--safe-top))" }}>
      <AnimatePresence>
        {notifications.map((n) => (
          <motion.div
            key={n.id}
            initial={{ opacity: 0, x: 40, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 40, scale: 0.95 }}
            className={`pointer-events-auto w-64 border-l-4 px-4 py-3 shadow-2xl backdrop-blur-sm ${TYPE_STYLES[n.type]}`}
          >
            <button
              type="button"
              onClick={() => dismiss(n.id)}
              className="w-full text-left"
            >
              <p className="text-[9px] font-bold tracking-[0.2em] opacity-70">
                {TYPE_LABEL[n.type]}
              </p>
              <p className="mt-0.5 text-xs font-semibold">{n.title}</p>
              <p className="mt-1 text-[10px] opacity-80">{n.message}</p>
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
