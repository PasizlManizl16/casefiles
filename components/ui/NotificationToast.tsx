"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useNotifications, type NotificationType } from "@/lib/notification-context";

const TYPE_STYLES: Record<NotificationType, { border: string; bg: string; accent: string }> = {
  evidence: { border: "#0891b2", bg: "#042f2e", accent: "#67e8f9" },
  connection: { border: "#b91c1c", bg: "#1c0a0a", accent: "#fca5a5" },
  contradiction: { border: "#d97706", bg: "#1c1208", accent: "#fcd34d" },
  document: { border: "#059669", bg: "#022c22", accent: "#6ee7b7" },
};

const TYPE_LABEL: Record<NotificationType, string> = {
  evidence: "Clue Found",
  connection: "Linked",
  contradiction: "Dead End",
  document: "Noted",
};

export function NotificationToast() {
  const { notifications, dismiss } = useNotifications();

  return (
    <div
      className="pointer-events-none fixed right-3 top-3 z-[100] flex flex-col gap-2"
      style={{ top: "max(0.75rem, var(--safe-top))" }}
    >
      <AnimatePresence>
        {notifications.map((n) => {
          const style = TYPE_STYLES[n.type];
          return (
            <motion.div
              key={n.id}
              initial={{ opacity: 0, x: 30, rotate: 2 }}
              animate={{ opacity: 1, x: 0, rotate: -1 }}
              exit={{ opacity: 0, x: 30 }}
              className="pointer-events-auto w-56 border-l-4 px-3 py-2.5"
              style={{
                borderColor: style.border,
                background: style.bg,
                boxShadow: "4px 6px 20px rgba(0,0,0,0.5)",
              }}
            >
              <button type="button" onClick={() => dismiss(n.id)} className="w-full text-left">
                <p
                  className="font-serif text-[9px] font-bold uppercase tracking-[0.15em]"
                  style={{ color: style.accent }}
                >
                  {TYPE_LABEL[n.type]}
                </p>
                <p className="mt-0.5 font-serif text-xs font-semibold italic text-amber-50/90">
                  {n.title}
                </p>
                <p className="mt-1 font-[family-name:var(--font-geist-mono)] text-[9px] text-amber-100/50">
                  {n.message}
                </p>
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
