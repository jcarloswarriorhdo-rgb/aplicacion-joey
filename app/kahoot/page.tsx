"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Joey } from "@/components/Joey";
import { KAHOOT_PRESETS } from "@/lib/kahoot-presets";

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
    <div className="min-h-screen flex flex-col"
      style={{ background: "linear-gradient(160deg,#0d0620 0%,#1a0a3d 40%,#2d1b69 100%)" }}>

      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-5 pb-2">
        <button onClick={() => router.push("/")}
          className="text-white/60 font-black text-2xl bg-transparent border-none cursor-pointer">←</button>
        <h1 className="font-black text-2xl text-white"
          style={{ textShadow: "0 0 20px rgba(168,85,247,0.8)" }}>🎮 JoeyKahoot</h1>
        <div className="w-8" />
      </div>

      <div className="flex-1 flex flex-col gap-5 px-4 py-3 pb-8">

        {/* ── Botones principales ── */}
        <div className="flex flex-col gap-3">
          <motion.button whileTap={{ scale: 0.97 }}
            onClick={() => router.push("/kahoot/crear")}
            className="w-full py-5 rounded-2xl font-black text-xl text-white cursor-pointer relative overflow-hidden"
            style={{ background: "#e21b3c", boxShadow: "0 0 24px rgba(226,27,60,0.5)" }}>
            ✏️ Crear mi propio Kahoot
          </motion.button>

          <motion.button whileTap={{ scale: 0.97 }}
            onClick={() => router.push("/kahoot/unirse")}
            className="w-full py-4 rounded-2xl font-black text-lg text-white cursor-pointer border border-blue-400/30"
            style={{ background: "rgba(19,104,206,0.6)", backdropFilter: "blur(8px)",
              boxShadow: "0 0 20px rgba(19,104,206,0.4)" }}>
            🎮 Unirse a un juego con PIN
          </motion.button>
        </div>

        {/* ── Juegos listos ── */}
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.15)" }} />
            <p className="text-white/60 font-black text-xs uppercase tracking-widest">Juegos listos para jugar</p>
            <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.15)" }} />
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
                  className="w-full rounded-2xl p-4 text-left cursor-pointer relative overflow-hidden border"
                  style={{
                    background: `${preset.color}22`,
                    borderColor: `${preset.color}55`,
                    boxShadow: loading === preset.id ? `0 0 20px ${preset.color}88` : "none",
                  }}>
                  <div className="flex items-center gap-3">
                    {/* Barra de color lateral */}
                    <div className="w-1 self-stretch rounded-full flex-shrink-0"
                      style={{ background: preset.color }} />

                    <div className="text-3xl">{preset.emoji}</div>

                    <div className="flex-1 min-w-0">
                      <p className="font-black text-white text-base leading-tight">{preset.title}</p>
                      <p className="text-sm font-bold mt-0.5" style={{ color: "rgba(200,180,255,0.6)" }}>
                        {preset.level} · {preset.questions.length} preguntas
                      </p>
                    </div>

                    <div className="flex-shrink-0">
                      {loading === preset.id ? (
                        <div className="w-6 h-6 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                      ) : (
                        <span className="font-black text-lg px-3 py-1.5 rounded-xl text-white"
                          style={{ background: preset.color }}>
                          ▶
                        </span>
                      )}
                    </div>
                  </div>
                </motion.button>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Joey pequeño abajo */}
        <div className="flex justify-center pt-2">
          <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
            <Joey mood="happy" size={70} />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
