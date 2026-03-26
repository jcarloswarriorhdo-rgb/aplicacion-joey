"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Joey } from "@/components/Joey";

const AGES = [4,5,6,7,8,9,10,11,12,13,14,15];

function routeForAge(age: number) {
  if (age <= 6) return "/kinder";
  if (age <= 12) return `/primaria/${age - 6}`;
  return `/secundaria/${age - 12}`;
}

function labelForAge(age: number) {
  if (age <= 6) return "Kinder 🌟";
  if (age <= 12) return `Primaria ${age - 6}° 📚`;
  return `Secundaria ${age - 12}° 🎓`;
}

const SECTION_COLORS: Record<string, string> = {
  kinder: "#7C3AED", primaria: "#059669", secundaria: "#2563EB",
};

type Step = "menu" | "name" | "age";

// Decoraciones gaming
const DIAMONDS = [
  { left:"8%",  top:"18%", color:"#ff2d78", size:14, rot:45 },
  { left:"88%", top:"12%", color:"#00d4ff", size:10, rot:30 },
  { left:"15%", top:"72%", color:"#ffd700", size:12, rot:20 },
  { left:"80%", top:"65%", color:"#ff2d78", size:16, rot:50 },
  { left:"50%", top:"8%",  color:"#00d4ff", size:8,  rot:40 },
  { left:"35%", top:"85%", color:"#a855f7", size:11, rot:25 },
  { left:"70%", top:"38%", color:"#ffd700", size:9,  rot:60 },
  { left:"5%",  top:"48%", color:"#00d4ff", size:13, rot:35 },
];

const STARS = [
  { left:"25%", top:"15%" }, { left:"75%", top:"22%" },
  { left:"60%", top:"78%" }, { left:"18%", top:"60%" },
  { left:"88%", top:"50%" }, { left:"42%", top:"5%"  },
];

const CONTROLLERS = [
  { style:{ top:"-10px",  left:"-10px",  fontSize:"110px", transform:"rotate(-25deg)" }, glow:"#ff2d78" },
  { style:{ top:"-5px",   right:"-5px",  fontSize:"90px",  transform:"rotate(20deg)"  }, glow:"#00d4ff" },
  { style:{ bottom:"-5px",left:"-5px",   fontSize:"100px", transform:"rotate(15deg)"  }, glow:"#ff2d78" },
  { style:{ bottom:"-8px",right:"-8px",  fontSize:"120px", transform:"rotate(-20deg)" }, glow:"#ffd700" },
  { style:{ top:"38%",    left:"-15px",  fontSize:"80px",  transform:"rotate(-10deg)" }, glow:"#a855f7" },
  { style:{ top:"35%",    right:"-15px", fontSize:"75px",  transform:"rotate(10deg)"  }, glow:"#00d4ff" },
];

export default function HomePage() {
  const router    = useRouter();
  const [step, setStep]         = useState<Step>("menu");
  const [name, setName]         = useState("");
  const [selected, setSelected] = useState<number | null>(null);
  const [going, setGoing]       = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const sectionKey = selected
    ? selected <= 6 ? "kinder" : selected <= 12 ? "primaria" : "secundaria"
    : null;
  const accent = sectionKey ? SECTION_COLORS[sectionKey] : "#FF6B00";

  function submitName() {
    const n = name.trim();
    if (!n) { inputRef.current?.focus(); return; }
    localStorage.setItem("joeyPlayerName", n);
    setStep("age");
  }

  function handleGo() {
    if (selected === null || going) return;
    setGoing(true);
    setTimeout(() => router.push(routeForAge(selected)), 480);
  }

  const joeyMood = going ? "excited" : step === "age" && selected ? "excited" : "happy";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 overflow-hidden relative"
      style={{ background: "linear-gradient(135deg,#0d0620 0%,#1a0a3d 30%,#2d1b69 60%,#0d1a4d 100%)" }}>

      {/* ── Controles gaming en bordes ── */}
      {CONTROLLERS.map((c, i) => (
        <div key={i} className="absolute pointer-events-none select-none"
          style={{ ...c.style, filter:`drop-shadow(0 0 18px ${c.glow}) drop-shadow(0 0 40px ${c.glow}55)`,
            opacity: 0.85, zIndex: 0 }}>
          🎮
        </div>
      ))}

      {/* ── Diamantes flotantes ── */}
      {DIAMONDS.map((d, i) => (
        <motion.div key={i}
          className="absolute pointer-events-none"
          style={{ left: d.left, top: d.top, zIndex: 0 }}
          animate={{ y: [0, -8, 0], rotate: [d.rot, d.rot + 15, d.rot] }}
          transition={{ duration: 2.5 + i * 0.4, repeat: Infinity, ease: "easeInOut" }}>
          <div style={{
            width: d.size, height: d.size,
            background: d.color,
            transform: "rotate(45deg)",
            boxShadow: `0 0 12px ${d.color}, 0 0 24px ${d.color}88`,
          }}/>
        </motion.div>
      ))}

      {/* ── Estrellas ── */}
      {STARS.map((s, i) => (
        <motion.div key={i}
          className="absolute pointer-events-none text-white font-black"
          style={{ left: s.left, top: s.top, fontSize: 18, zIndex: 0 }}
          animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
          transition={{ duration: 1.8 + i * 0.3, repeat: Infinity, ease: "easeInOut" }}>
          ✦
        </motion.div>
      ))}

      {/* ── Resplandor central ── */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0,
        background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(120,50,200,0.18) 0%, transparent 70%)" }}/>

      {/* ── Contenido ── */}
      <div className="relative z-10 flex flex-col items-center gap-6 w-full max-w-sm">

        <motion.div animate={{ y: [0,-14,0] }} transition={{ duration:1.5, repeat:Infinity, ease:"easeInOut" }}>
          <Joey mood={joeyMood} size={step === "menu" ? 170 : 140}/>
        </motion.div>

        <AnimatePresence mode="wait">

          {/* ─── MENÚ ─── */}
          {step === "menu" && (
            <motion.div key="menu"
              initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-20 }}
              className="flex flex-col items-center gap-5 w-full">

              <div className="text-center">
                <h1 className="text-5xl font-black text-white drop-shadow-lg"
                  style={{ textShadow:"0 0 30px rgba(168,85,247,0.8), 0 2px 4px rgba(0,0,0,0.8)" }}>
                  ¡Hola! Soy Joey 🦘
                </h1>
                <p className="text-lg font-bold mt-1" style={{ color:"rgba(200,180,255,0.85)" }}>
                  ¿Qué quieres hacer hoy?
                </p>
              </div>

              {/* Tarjeta — Aprender */}
              <motion.button
                whileTap={{ scale:0.97 }} whileHover={{ scale:1.02 }}
                onClick={() => { setStep("name"); setTimeout(() => inputRef.current?.focus(), 100); }}
                className="w-full rounded-3xl p-5 text-left cursor-pointer relative overflow-hidden"
                style={{ background:"rgba(255,255,255,0.95)", boxShadow:"0 8px 32px rgba(255,130,50,0.4)" }}>
                <div className="flex items-center gap-4">
                  <div className="text-5xl">📚</div>
                  <div>
                    <p className="font-black text-2xl" style={{ color:"#FF6B00" }}>Aprender con Joey</p>
                    <p className="text-gray-500 font-bold text-sm mt-0.5">Kinder · Primaria · Secundaria</p>
                  </div>
                  <span className="ml-auto text-2xl text-gray-300">→</span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-1 rounded-b-3xl"
                  style={{ background:"linear-gradient(90deg,#FF8C42,#FFD670,#FF6B6B)" }}/>
              </motion.button>

              {/* Tarjeta — Kahoot */}
              <motion.button
                whileTap={{ scale:0.97 }} whileHover={{ scale:1.02 }}
                onClick={() => router.push("/kahoot")}
                className="w-full rounded-3xl p-5 text-left cursor-pointer relative overflow-hidden border border-purple-500/30"
                style={{ background:"rgba(70,23,143,0.7)", backdropFilter:"blur(8px)",
                  boxShadow:"0 8px 32px rgba(168,85,247,0.5), inset 0 1px 0 rgba(255,255,255,0.1)" }}>
                <div className="flex items-center gap-4">
                  <div className="text-5xl">🎮</div>
                  <div>
                    <p className="font-black text-2xl text-white"
                      style={{ textShadow:"0 0 20px rgba(255,45,120,0.8)" }}>JoeyKahoot</p>
                    <p className="font-bold text-sm mt-0.5" style={{ color:"rgba(200,180,255,0.7)" }}>
                      Preguntas · En equipo · En vivo
                    </p>
                  </div>
                  <span className="ml-auto text-2xl" style={{ color:"rgba(255,255,255,0.3)" }}>→</span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-1 rounded-b-3xl"
                  style={{ background:"linear-gradient(90deg,#e21b3c,#a855f7,#1368ce)" }}/>
              </motion.button>
            </motion.div>
          )}

          {/* ─── NOMBRE ─── */}
          {step === "name" && (
            <motion.div key="name"
              initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-20 }}
              className="flex flex-col items-center gap-4 w-full">
              <div className="text-center">
                <h1 className="text-4xl font-black text-white drop-shadow-lg">¡Hola! Soy Joey 🦘</h1>
                <p className="text-xl font-bold mt-1" style={{ color:"rgba(200,180,255,0.9)" }}>¿Cómo te llamas?</p>
              </div>
              <input
                ref={inputRef}
                value={name}
                onChange={e => setName(e.target.value)}
                onKeyDown={e => e.key === "Enter" && submitName()}
                placeholder="Escribe tu nombre..."
                className="w-full text-center text-2xl font-black rounded-2xl px-4 py-4 shadow-xl outline-none border-4"
                style={{ borderColor:"#a855f7", color:"#374151" }}
                autoFocus
              />
              <button onClick={submitName}
                className="w-full py-4 rounded-3xl font-black text-2xl shadow-2xl transition-all cursor-pointer"
                style={{ background: name.trim() ? "#a855f7" : "rgba(255,255,255,0.15)",
                         color: name.trim() ? "white" : "rgba(255,255,255,0.4)",
                         cursor: name.trim() ? "pointer" : "not-allowed",
                         boxShadow: name.trim() ? "0 0 24px rgba(168,85,247,0.6)" : "none" }}>
                ¡Ese es mi nombre! →
              </button>
              <button onClick={() => setStep("menu")}
                className="text-sm font-bold underline cursor-pointer bg-transparent border-none"
                style={{ color:"rgba(200,180,255,0.6)" }}>
                ← Volver al menú
              </button>
            </motion.div>
          )}

          {/* ─── EDAD ─── */}
          {step === "age" && (
            <motion.div key="age"
              initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-20 }}
              className="flex flex-col items-center gap-4 w-full">
              <div className="text-center">
                <h1 className="text-4xl font-black text-white drop-shadow-lg">¡Hola, {name}! 👋</h1>
                <p className="text-xl font-bold mt-1" style={{ color:"rgba(200,180,255,0.9)" }}>¿Cuántos años tienes?</p>
              </div>
              <div className="grid grid-cols-4 gap-2 w-full">
                {AGES.map(age => (
                  <button key={age} onClick={() => setSelected(age)}
                    className="rounded-2xl py-3 font-black text-lg transition-all duration-150 shadow-md cursor-pointer"
                    style={{
                      background: selected===age ? accent : "rgba(255,255,255,0.12)",
                      color: selected===age ? "white" : "rgba(255,255,255,0.85)",
                      transform: selected===age ? "scale(1.1)" : "scale(1)",
                      boxShadow: selected===age ? `0 6px 20px ${accent}88` : undefined,
                      border: selected===age ? "none" : "1px solid rgba(255,255,255,0.15)",
                    }}>
                    {age}
                  </button>
                ))}
              </div>
              {selected && (
                <motion.p initial={{ opacity:0, scale:.8 }} animate={{ opacity:1, scale:1 }}
                  className="text-white font-black text-xl drop-shadow">
                  📚 {labelForAge(selected)}
                </motion.p>
              )}
              <motion.button onClick={handleGo} disabled={!selected || going} whileTap={{ scale:.95 }}
                className="w-full py-5 rounded-3xl font-black text-2xl shadow-2xl transition-all cursor-pointer"
                style={{
                  background: selected ? accent : "rgba(255,255,255,0.15)",
                  color: selected ? "white" : "rgba(255,255,255,0.4)",
                  cursor: selected ? "pointer" : "not-allowed",
                  boxShadow: selected ? `0 0 24px ${accent}88` : "none",
                }}>
                {going ? "¡Vamos! 🦘" : "¡A aprender! →"}
              </motion.button>
              <button onClick={() => setStep("name")}
                className="text-sm font-bold underline cursor-pointer bg-transparent border-none"
                style={{ color:"rgba(200,180,255,0.6)" }}>
                ← Cambiar nombre
              </button>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
