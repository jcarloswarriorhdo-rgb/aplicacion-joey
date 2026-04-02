"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Joey } from "@/components/Joey";

export default function UnirsePage() {
  const router = useRouter();
  const [pin, setPin] = useState("");
  const [name, setName] = useState("");
  const [step, setStep] = useState<"pin" | "name">("pin");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const nameRef = useRef<HTMLInputElement>(null);

  async function handleJoin() {
    if (!pin.trim() || !name.trim()) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/kahoot/unirse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pin: pin.trim(), name: name.trim() }),
      });
      const data = await res.json();
      if (data.gameId) {
        localStorage.setItem("kahootPlayer", name.trim());
        router.push(`/kahoot/jugar/${data.gameId}`);
      } else {
        setError(data.error || "Error al unirse");
      }
    } catch {
      setError("Error de conexión");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6"
      style={{ background: "linear-gradient(135deg,#0a0e27 0%,#0d1b3e 55%,#0a2a3d 100%)" }}>
      <div className="w-full max-w-sm flex flex-col items-center gap-6">

        <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}>
          <Joey mood="happy" size={120} />
        </motion.div>

        <h1 className="text-white font-black text-3xl text-center">¡Únete al juego!</h1>

        {step === "pin" ? (
          <motion.div key="pin" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="w-full flex flex-col gap-4">
            <input
              value={pin}
              onChange={e => setPin(e.target.value.replace(/\D/g, "").slice(0, 6))}
              onKeyDown={e => e.key === "Enter" && pin.length === 6 && setStep("name")}
              placeholder="PIN del juego"
              inputMode="numeric"
              maxLength={6}
              autoFocus
              className="w-full text-center font-black text-4xl tracking-[0.2em] rounded-2xl px-4 py-5 outline-none shadow-xl"
              style={{ color: "#0d1b3e", letterSpacing: "0.25em" }}
            />
            <motion.button whileTap={{ scale: 0.97 }}
              onClick={() => { setError(""); setStep("name"); setTimeout(() => nameRef.current?.focus(), 100); }}
              disabled={pin.length !== 6}
              className="w-full py-5 rounded-2xl font-black text-xl text-white cursor-pointer"
              style={{ background: pin.length === 6 ? "#ff4d6d" : "rgba(255,255,255,0.2)" }}>
              Continuar →
            </motion.button>
          </motion.div>
        ) : (
          <motion.div key="name" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="w-full flex flex-col gap-4">
            <div className="bg-white/15 rounded-2xl px-4 py-3 text-center">
              <p className="text-white/60 text-sm font-bold">PIN</p>
              <p className="text-white font-black text-3xl tracking-widest">{pin}</p>
            </div>
            <input
              ref={nameRef}
              value={name}
              onChange={e => setName(e.target.value)}
              onKeyDown={e => e.key === "Enter" && name.trim() && handleJoin()}
              placeholder="Tu nombre o apodo"
              maxLength={20}
              className="w-full text-center font-black text-2xl rounded-2xl px-4 py-5 outline-none shadow-xl"
              style={{ color: "#0d1b3e" }}
            />
            {error && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="text-red-300 font-bold text-center text-sm">
                ⚠️ {error}
              </motion.p>
            )}
            <motion.button whileTap={{ scale: 0.97 }}
              onClick={handleJoin}
              disabled={!name.trim() || loading}
              className="w-full py-5 rounded-2xl font-black text-xl text-white cursor-pointer"
              style={{ background: name.trim() && !loading ? "#06d6a0" : "rgba(255,255,255,0.2)" }}>
              {loading ? "Uniéndose..." : "🎮 ¡Entrar!"}
            </motion.button>
            <button onClick={() => { setStep("pin"); setError(""); }}
              className="text-white/50 text-sm font-bold underline bg-transparent border-none cursor-pointer text-center">
              ← Cambiar PIN
            </button>
          </motion.div>
        )}

        <button onClick={() => router.back()}
          className="text-white/40 text-sm font-bold underline bg-transparent border-none cursor-pointer">
          ← Volver
        </button>
      </div>
    </div>
  );
}
