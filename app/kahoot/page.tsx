"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Joey } from "@/components/Joey";
import { KAHOOT_PRESETS } from "@/lib/kahoot-presets";
import { KAHOOT_BG } from "@/lib/kahoot-types";

export default function KahootLanding() {
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);

  async function startPreset(presetId: string) {
    const preset = KAHOOT_PRESETS.find(p => p.id === presetId);
    if (!preset) return;
    setLoading(presetId);
    try {
      const res = await fetch("/api/kahoot/crear", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ questions: preset.questions }),
      });
      const data = await res.json();
      if (data.gameId) router.push(`/kahoot/host/${data.gameId}`);
      else alert(data.error || "Error al crear");
    } catch { alert("Error de conexión"); }
    finally { setLoading(null); }
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: KAHOOT_BG }}>

      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-5 pb-2">
        <button onClick={() => router.push("/")}
          className="font-black text-2xl bg-transparent border-none cursor-pointer"
          style={{ color: "#0d1b3e" }}>←</button>
        <h1 className="font-black text-2xl" style={{ color: "#0d1b3e" }}>🎮 JoeyKahoot</h1>
        <div className="w-8" />
      </div>

      <div className="flex-1 flex flex-col gap-5 px-4 py-3 pb-8">

        {/* ── Botones principales ── */}
        <div className="flex flex-col gap-3">
          <motion.button whileTap={{ scale: 0.97 }}
            onClick={() => router.push("/kahoot/crear")}
            className="w-full py-5 rounded-2xl font-black text-xl text-white cursor-pointer shadow-lg"
            style={{ background: "#ff4d6d", boxShadow: "0 4px 20px rgba(255,77,109,0.4)" }}>
            ✏️ Crear mi propio Kahoot
          </motion.button>

          <motion.button whileTap={{ scale: 0.97 }}
            onClick={() => router.push("/kahoot/unirse")}
            className="w-full py-4 rounded-2xl font-black text-lg cursor-pointer shadow-lg"
            style={{ background: "#00c2d4", color: "white", boxShadow: "0 4px 20px rgba(0,194,212,0.4)" }}>
            🎮 Unirse a un juego con PIN
          </motion.button>
        </div>

        {/* ── Juegos listos ── */}
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className="flex-1 h-px bg-gray-200" />
            <p className="font-black text-xs uppercase tracking-widest text-gray-400">Juegos listos para jugar</p>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          <div className="flex flex-col gap-3">
            <AnimatePresence>
              {KAHOOT_PRESETS.map((preset, i) => (
                <motion.button key={preset.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => startPreset(preset.id)}
                  disabled={loading !== null}
                  className="w-full rounded-2xl p-4 text-left cursor-pointer bg-white shadow-md border"
                  style={{ borderColor: `${preset.color}44`,
                    boxShadow: loading === preset.id ? `0 0 20px ${preset.color}55` : "0 2px 12px rgba(0,0,0,0.08)" }}>
                  <div className="flex items-center gap-3">
                    <div className="w-1 self-stretch rounded-full flex-shrink-0" style={{ background: preset.color }} />
                    <div className="text-3xl">{preset.emoji}</div>
                    <div className="flex-1 min-w-0">
                      <p className="font-black text-base leading-tight" style={{ color: "#0d1b3e" }}>{preset.title}</p>
                      <p className="text-sm font-bold mt-0.5 text-gray-400">
                        {preset.level} · {preset.questions.length} preguntas
                      </p>
                    </div>
                    <div className="flex-shrink-0">
                      {loading === preset.id ? (
                        <div className="w-6 h-6 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
                      ) : (
                        <span className="font-black text-lg px-3 py-1.5 rounded-xl text-white"
                          style={{ background: preset.color }}>▶</span>
                      )}
                    </div>
                  </div>
                </motion.button>
              ))}
            </AnimatePresence>
          </div>
        </div>

        <div className="flex justify-center pt-2">
          <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
            <Joey mood="happy" size={70} />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
