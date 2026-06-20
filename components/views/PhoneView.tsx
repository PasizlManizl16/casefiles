"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SceneOverlay } from "@/components/ui/SceneOverlay";
import { useScene } from "@/lib/scene-context";
import { CALLS, CONVERSATIONS, PHOTOS } from "@/lib/case-data";

type PhoneScreen = "lock" | "home" | "messages" | "chat" | "photos" | "photo-view" | "calls";

export function PhoneView() {
  const { backToDesk } = useScene();
  const [screen, setScreen] = useState<PhoneScreen>("lock");
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [activePhoto, setActivePhoto] = useState<string | null>(null);
  const [unlocked, setUnlocked] = useState(false);

  const handleUnlock = () => {
    setUnlocked(true);
    setTimeout(() => setScreen("home"), 600);
  };

  const handlePutDown = () => {
    setScreen("lock");
    setUnlocked(false);
    setActiveChat(null);
    setActivePhoto(null);
    backToDesk();
  };

  const chat = CONVERSATIONS.find((c) => c.id === activeChat);
  const photo = PHOTOS.find((p) => p.id === activePhoto);
  const unreadCount = CONVERSATIONS.reduce((n, c) => n + c.unread, 0);

  return (
    <SceneOverlay variant="rise-phone">
      <div className="relative flex h-full w-full items-center justify-center">
        <motion.button
          type="button"
          onClick={handlePutDown}
          whileTap={{ scale: 0.95 }}
          className="absolute bottom-6 z-50 flex min-h-[44px] items-center gap-2 rounded-full border border-white/10 bg-black/50 px-4 py-2 text-xs text-white/80 backdrop-blur-sm"
        >
          <span>↓</span> Put Down Phone
        </motion.button>

        <motion.div
          className="relative flex h-[90%] max-h-[360px] w-[44%] max-w-[220px] flex-col overflow-hidden rounded-[2rem] border-[3px] border-[#222] bg-black shadow-2xl"
          animate={unlocked ? { boxShadow: "0 0 40px rgba(79,195,247,0.15), 0 20px 60px rgba(0,0,0,0.6)" } : {}}
        >
          <div className="absolute left-1/2 top-2 z-20 h-5 w-20 -translate-x-1/2 rounded-full bg-black" />

          <AnimatePresence mode="wait">
            {screen === "lock" && (
              <motion.div
                key="lock"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex flex-1 flex-col items-center justify-center bg-gradient-to-b from-[#0a0a12] to-[#12121a]"
              >
                <p className="text-2xl font-light text-white/90">9:41</p>
                <p className="mt-1 text-[10px] text-white/40">Saturday, June 20</p>
                <motion.button
                  type="button"
                  onClick={handleUnlock}
                  whileTap={{ scale: 0.97 }}
                  className="mt-8 min-h-[44px] rounded-full border border-white/20 px-6 py-2 text-[11px] text-white/70"
                >
                  Tap to unlock
                </motion.button>
                <div className="absolute bottom-3 h-1 w-28 rounded-full bg-white/20" />
              </motion.div>
            )}

            {screen === "home" && (
              <motion.div
                key="home"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-1 flex-col bg-[#0d0d14]"
              >
                <div className="flex h-10 shrink-0 items-end justify-between px-5 pb-1 pt-7 text-[9px] text-white/60">
                  <span>9:41 PM</span>
                  <span>LTE ▮▮▮</span>
                </div>
                <div className="flex flex-1 flex-col justify-end gap-4 px-4 pb-8">
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { id: "messages" as const, label: "Messages", color: "#34c759", badge: unreadCount },
                      { id: "photos" as const, label: "Photos", color: "#ff9500", badge: 0 },
                      { id: "calls" as const, label: "Calls", color: "#007aff", badge: 0 },
                    ].map((app) => (
                      <motion.button
                        key={app.id}
                        type="button"
                        onClick={() => setScreen(app.id)}
                        whileTap={{ scale: 0.9 }}
                        className="relative flex flex-col items-center gap-1"
                      >
                        <div
                          className="flex h-12 w-12 items-center justify-center rounded-xl"
                          style={{ backgroundColor: app.color }}
                        >
                          <span className="text-white text-xs font-bold">{app.label[0]}</span>
                        </div>
                        <span className="text-[8px] text-white/70">{app.label}</span>
                        {app.badge > 0 && (
                          <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[8px] text-white">
                            {app.badge}
                          </span>
                        )}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {screen === "messages" && (
              <motion.div key="messages" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="flex flex-1 flex-col bg-[#0d0d14]">
                <PhoneHeader title="Messages" onBack={() => setScreen("home")} />
                <div className="flex-1 overflow-y-auto" style={{ WebkitOverflowScrolling: "touch" }}>
                  {CONVERSATIONS.map((conv) => (
                    <button
                      key={conv.id}
                      type="button"
                      onClick={() => { setActiveChat(conv.id); setScreen("chat"); }}
                      className="flex w-full min-h-[52px] items-center gap-3 border-b border-white/5 px-3 py-2 text-left"
                    >
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-xs text-white">
                        {conv.name[0]}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between">
                          <p className="truncate text-xs font-medium text-white">{conv.name}</p>
                          {conv.unread > 0 && (
                            <span className="ml-1 shrink-0 rounded-full bg-green-500 px-1.5 text-[8px] text-white">{conv.unread}</span>
                          )}
                        </div>
                        <p className="truncate text-[10px] text-white/50">{conv.preview}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {screen === "chat" && chat && (
              <motion.div key="chat" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="flex flex-1 flex-col bg-[#0d0d14]">
                <PhoneHeader title={chat.name} onBack={() => setScreen("messages")} />
                <div className="flex-1 space-y-2 overflow-y-auto px-3 py-2" style={{ WebkitOverflowScrolling: "touch" }}>
                  {chat.locked && (
                    <p className="text-center text-[9px] text-amber-500/80">🔒 Partial message — decryption pending</p>
                  )}
                  {chat.messages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.from === "me" ? "justify-end" : "justify-start"}`}>
                      <div
                        className={`max-w-[80%] rounded-2xl px-3 py-1.5 text-[11px] ${
                          msg.from === "me"
                            ? "rounded-br-sm bg-green-600 text-white"
                            : "rounded-bl-sm bg-white/10 text-white/90"
                        }`}
                      >
                        {msg.text}
                        <p className="mt-0.5 text-[8px] opacity-50">{msg.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {screen === "photos" && (
              <motion.div key="photos" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="flex flex-1 flex-col bg-[#0d0d14]">
                <PhoneHeader title="Photos" onBack={() => setScreen("home")} />
                <div className="grid flex-1 grid-cols-3 gap-0.5 overflow-y-auto p-0.5" style={{ WebkitOverflowScrolling: "touch" }}>
                  {PHOTOS.map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => { setActivePhoto(p.id); setScreen("photo-view"); }}
                      className="aspect-square"
                      style={{ backgroundColor: p.color }}
                    >
                      <span className="sr-only">{p.label}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {screen === "photo-view" && photo && (
              <motion.div key="photo-view" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-1 flex-col bg-black">
                <PhoneHeader title={photo.label} onBack={() => setScreen("photos")} dark />
                <div className="flex flex-1 items-center justify-center" style={{ backgroundColor: photo.color }}>
                  <p className="px-4 text-center text-xs text-white/60">Evidence photo placeholder</p>
                </div>
              </motion.div>
            )}

            {screen === "calls" && (
              <motion.div key="calls" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="flex flex-1 flex-col bg-[#0d0d14]">
                <PhoneHeader title="Calls" onBack={() => setScreen("home")} />
                <div className="flex-1 overflow-y-auto" style={{ WebkitOverflowScrolling: "touch" }}>
                  {CALLS.map((call) => (
                    <div key={call.id} className="flex min-h-[48px] items-center gap-3 border-b border-white/5 px-3 py-2">
                      <span className={`text-sm ${call.type === "missed" ? "text-red-400" : "text-green-400"}`}>
                        {call.type === "missed" ? "↙" : call.type === "outgoing" ? "↗" : "↙"}
                      </span>
                      <div className="flex-1">
                        <p className="text-xs text-white">{call.name}</p>
                        <p className="text-[9px] text-white/40 capitalize">{call.type} · {call.duration}</p>
                      </div>
                      <span className="text-[9px] text-white/40">{call.time}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </SceneOverlay>
  );
}

function PhoneHeader({ title, onBack, dark }: { title: string; onBack: () => void; dark?: boolean }) {
  return (
    <div className={`flex h-12 shrink-0 items-center gap-2 px-3 pt-6 ${dark ? "bg-black" : "bg-[#0d0d14]/95"}`}>
      <button type="button" onClick={onBack} className="min-h-[44px] min-w-[44px] text-sm text-blue-400">
        ←
      </button>
      <p className="text-sm font-semibold text-white">{title}</p>
    </div>
  );
}
