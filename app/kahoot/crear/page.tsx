"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import type { KahootQuestion } from "@/lib/kahoot-types";

const TIME_OPTIONS = [10, 20, 30, 60];
const EMPTY_QUESTION = (): KahootQuestion => ({
  text: "", image: "", timeLimit: 20,
  options: ["", "", "", ""], correct: 0,
});

export default function CrearKahoot() {
  const router = useRouter();
  const [questions, setQuestions] = useState<KahootQuestion[]>([EMPTY_QUESTION()]);
  const [activeIdx, setActiveIdx] = useState(0);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const q = questions[activeIdx];

  function updateQ(patch: Partial<KahootQuestion>) {
    setQuestions(prev => prev.map((item, i) => i === activeIdx ? { ...item, ...patch } : item));
  }

  function updateOption(optIdx: number, value: string) {
    const options = [...q.options] as [string, string, string, string];
    options[optIdx] = value;
    updateQ({ options });
  }

  function addQuestion() {
    setQuestions(prev => [...prev, EMPTY_QUESTION()]);
    setActiveIdx(questions.length);
  }

  function removeQuestion(idx: number) {
    if (questions.length === 1) return;
    const next = questions.filter((_, i) => i !== idx);
    setQuestions(next);
    setActiveIdx(Math.min(idx, next.length - 1));
  }

  async function uploadImage(file: File) {
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/kahoot/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (data.url) updateQ({ image: data.url });
    } catch { /* ignore */ }
    finally { setUploading(false); }
  }

  async function handleCreate() {
    const valid = questions.every(q =>
      q.text.trim() && q.options.every(o => o.trim())
    );
    if (!valid) { alert("Completa todas las preguntas y opciones"); return; }

    setLoading(true);
    try {
      const res = await fetch("/api/kahoot/crear", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ questions }),
      });
      const data = await res.json();
      if (data.gameId) router.push(`/kahoot/host/${data.gameId}`);
      else alert(data.error || "Error al crear");
    } catch { alert("Error de conexión"); }
    finally { setLoading(false); }
  }

  const COLORS = ["#e21b3c", "#1368ce", "#d89e00", "#26890c"];
  const SHAPES = ["▲", "◆", "●", "■"];

  return (
    <div className="min-h-screen flex flex-col"
      style={{ background: "linear-gradient(160deg,#46178f 0%,#7c3aed 100%)" }}>

      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-5 pb-3">
        <button onClick={() => router.back()}
          className="text-white/70 font-black text-2xl bg-transparent border-none cursor-pointer">←</button>
        <h1 className="text-white font-black text-xl">✏️ Crear Kahoot</h1>
        <span className="text-white/50 text-sm font-bold">{questions.length} preg.</span>
      </div>

      {/* Tabs de preguntas */}
      <div className="flex gap-2 px-4 overflow-x-auto pb-2">
        {questions.map((_, i) => (
          <button key={i} onClick={() => setActiveIdx(i)}
            className="flex-shrink-0 w-9 h-9 rounded-full font-black text-sm cursor-pointer transition-all"
            style={{
              background: i === activeIdx ? "white" : "rgba(255,255,255,0.2)",
              color: i === activeIdx ? "#46178f" : "white",
            }}>
            {i + 1}
          </button>
        ))}
        <button onClick={addQuestion}
          className="flex-shrink-0 w-9 h-9 rounded-full font-black text-lg cursor-pointer"
          style={{ background: "rgba(255,255,255,0.15)", color: "white" }}>
          +
        </button>
      </div>

      {/* Editor de pregunta */}
      <AnimatePresence mode="wait">
        <motion.div key={activeIdx}
          initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
          className="flex-1 flex flex-col gap-4 px-4 py-3 pb-6">

          {/* Texto de la pregunta */}
          <div className="bg-white/10 rounded-2xl p-4">
            <p className="text-white/70 font-bold text-xs mb-2 uppercase tracking-wide">Pregunta {activeIdx + 1}</p>
            <textarea
              value={q.text}
              onChange={e => updateQ({ text: e.target.value })}
              placeholder="Escribe tu pregunta aquí..."
              rows={2}
              className="w-full bg-transparent text-white font-bold text-lg placeholder-white/40 outline-none resize-none"
            />
          </div>

          {/* Imagen */}
          <div className="bg-white/10 rounded-2xl p-4">
            <p className="text-white/70 font-bold text-xs mb-2 uppercase tracking-wide">Imagen (opcional)</p>
            <div className="flex gap-2 items-center">
              <input
                value={q.image || ""}
                onChange={e => updateQ({ image: e.target.value })}
                placeholder="Pega URL de imagen..."
                className="flex-1 bg-white/20 rounded-xl px-3 py-2 text-white text-sm placeholder-white/40 outline-none"
              />
              <button onClick={() => fileRef.current?.click()}
                disabled={uploading}
                className="px-3 py-2 rounded-xl font-bold text-sm cursor-pointer text-white"
                style={{ background: "rgba(255,255,255,0.2)" }}>
                {uploading ? "⏳" : "📁"}
              </button>
              <input ref={fileRef} type="file" accept="image/*" className="hidden"
                onChange={e => e.target.files?.[0] && uploadImage(e.target.files[0])} />
            </div>
            {q.image && (
              <img src={q.image} alt="preview" className="mt-3 rounded-xl h-28 object-cover w-full" />
            )}
          </div>

          {/* Tiempo */}
          <div className="bg-white/10 rounded-2xl p-4">
            <p className="text-white/70 font-bold text-xs mb-2 uppercase tracking-wide">⏱ Tiempo</p>
            <div className="flex gap-2">
              {TIME_OPTIONS.map(t => (
                <button key={t} onClick={() => updateQ({ timeLimit: t })}
                  className="flex-1 py-2 rounded-xl font-black text-sm cursor-pointer transition-all"
                  style={{
                    background: q.timeLimit === t ? "white" : "rgba(255,255,255,0.2)",
                    color: q.timeLimit === t ? "#46178f" : "white",
                  }}>
                  {t}s
                </button>
              ))}
            </div>
          </div>

          {/* Opciones */}
          <div className="grid grid-cols-2 gap-3">
            {q.options.map((opt, i) => (
              <div key={i} className="rounded-2xl p-3 relative"
                style={{ background: COLORS[i] }}>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-white font-black text-lg">{SHAPES[i]}</span>
                  <button onClick={() => updateQ({ correct: i as 0 | 1 | 2 | 3 })}
                    className="ml-auto text-xs font-black px-2 py-0.5 rounded-full cursor-pointer"
                    style={{
                      background: q.correct === i ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.25)",
                      color: q.correct === i ? COLORS[i] : "white",
                    }}>
                    {q.correct === i ? "✓ Correcta" : "Correcta"}
                  </button>
                </div>
                <input
                  value={opt}
                  onChange={e => updateOption(i, e.target.value)}
                  placeholder={`Opción ${i + 1}...`}
                  className="w-full bg-transparent text-white font-bold text-base placeholder-white/60 outline-none"
                />
              </div>
            ))}
          </div>

          {/* Botón eliminar pregunta */}
          {questions.length > 1 && (
            <button onClick={() => removeQuestion(activeIdx)}
              className="text-white/40 font-bold text-sm underline bg-transparent border-none cursor-pointer text-center">
              🗑 Eliminar esta pregunta
            </button>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Footer */}
      <div className="sticky bottom-0 p-4 pt-2"
        style={{ background: "linear-gradient(to top, #46178f, transparent)" }}>
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={handleCreate}
          disabled={loading}
          className="w-full py-5 rounded-2xl font-black text-xl text-white shadow-2xl cursor-pointer"
          style={{ background: loading ? "rgba(255,255,255,0.3)" : "#e21b3c" }}>
          {loading ? "Creando juego..." : `🚀 ¡Crear juego! (${questions.length} preguntas)`}
        </motion.button>
      </div>
    </div>
  );
}
