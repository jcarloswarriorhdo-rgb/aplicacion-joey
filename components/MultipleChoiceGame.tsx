"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Joey } from "./Joey";
import { playCorrect, playWrong, playVictory } from "@/lib/sounds";
import type { GameQuestion } from "@/lib/types";

interface Props {
  title: string; emoji: string;
  bgFrom: string; bgTo: string;
  questions: GameQuestion[];
  backHref: string;
}

type State = "playing" | "correct" | "wrong" | "complete";
type Mood  = "happy" | "excited" | "sad";

const CORRECT_MSGS = ["¡Excelente! 🎉", "¡Muy bien! ⭐", "¡Correcto! 🌟", "¡Genial! 🦘", "¡Increíble! 🔥"];
const WRONG_MSGS   = ["¡Casi! 💪 Tú puedes", "¡No te rindas! 🦘", "¡Inténtalo de nuevo! 💫"];

const FLOATING = ["🎉","🎊","⭐","🏆","🌟","🎈","✨","🦘","🎶","💛"];

function burst() {
  const opts = { spread: 120, startVelocity: 45, ticks: 120,
    colors: ["#FFD700","#FF6B6B","#4CAF50","#2196F3","#9C27B0","#FF8C00"] };
  confetti({ ...opts, particleCount: 160, origin: { x:0.5, y:0.45 } });
  setTimeout(() => confetti({ ...opts, particleCount: 90, angle: 60,  origin: { x:0, y:0.6 } }), 300);
  setTimeout(() => confetti({ ...opts, particleCount: 90, angle: 120, origin: { x:1, y:0.6 } }), 500);
  setTimeout(() => confetti({ ...opts, particleCount: 120, origin: { x:0.5, y:0.3 } }), 900);
}

function shuffleOptions<T>(arr: T[], seed: number): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = (seed * (i + 7) * 2654435761) % (i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function formatCategory(pathname: string): string {
  const LABELS: Record<string, string> = {
    kinder: "Kinder", primaria: "Primaria", secundaria: "Secundaria",
    numeros: "Números", letras: "Letras", colores: "Colores",
    palabras: "Palabras", ingles: "Inglés", matematicas: "Matemáticas",
    geografia: "Geografía", espanol: "Español", algebra: "Álgebra",
    historia: "Historia", ciencias: "Ciencias",
  };
  return pathname
    .split("/")
    .filter(Boolean)
    .map(p => (!isNaN(Number(p)) ? `${p}°` : (LABELS[p] ?? p)))
    .join(" › ");
}

export function MultipleChoiceGame({ title, emoji, bgFrom, bgTo, questions, backHref }: Props) {
  const [idx, setIdx]       = useState(0);
  const [score, setScore]   = useState(0);
  const [state, setState]   = useState<State>("playing");
  const [picked, setPicked] = useState<number | null>(null);
  const [mood, setMood]     = useState<Mood>("happy");
  const [msgIdx, setMsgIdx] = useState(0);
  const [playerName, setPlayerName] = useState("");
  const sessionIdRef = useRef("");
  const startTimeRef = useRef(Date.now());

  // Mezcla las opciones de cada pregunta una sola vez (seed distinto por pregunta)
  const shuffledQuestions = useMemo(() =>
    questions.map((q, i) => ({ ...q, options: shuffleOptions(q.options, i + 1) })),
  [questions]);

  useEffect(() => {
    setPlayerName(localStorage.getItem("joeyPlayerName") || "Campeón");
    sessionIdRef.current = sessionStorage.getItem("joeySessionId") || "";
    startTimeRef.current = Date.now();
  }, []);

  useEffect(() => {
    if (state === "complete") {
      playVictory();
      burst();
      // Registrar juego completado
      const sessionId = sessionIdRef.current;
      if (sessionId) {
        const playTime = Math.round((Date.now() - startTimeRef.current) / 1000);
        const category = formatCategory(window.location.pathname);
        fetch("/api/analytics", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ event: "game_complete", sessionId, category, playTime }),
          keepalive: true,
        }).catch(() => {});
        // Reiniciar timer para próximo juego
        startTimeRef.current = Date.now();
      }
    }
  }, [state]);

  const q        = shuffledQuestions[idx];
  const progress = (idx / shuffledQuestions.length) * 100;
  const pct      = Math.round((score / shuffledQuestions.length) * 100);

  function handleAnswer(i: number) {
    if (state !== "playing") return;
    setPicked(i);
    if (q.options[i].correct) {
      setScore(s => s + 1);
      setState("correct");
      setMood("excited");
      setMsgIdx(Math.floor(Math.random() * CORRECT_MSGS.length));
      playCorrect();
    } else {
      setState("wrong");
      setMood("sad");
      setMsgIdx(Math.floor(Math.random() * WRONG_MSGS.length));
      playWrong();
    }
    setTimeout(() => {
      if (idx + 1 >= shuffledQuestions.length) {
        setState("complete");
      } else {
        setIdx(n => n + 1);
        setState("playing");
        setPicked(null);
        setMood("happy");
      }
    }, 1600);
  }

  function restart() {
    setIdx(0); setScore(0); setState("playing"); setPicked(null); setMood("happy");
  }

  /* ─── CELEBRATION SCREEN ──────────────────────────────────────────── */
  if (state === "complete") {
    const stars = pct >= 80 ? 3 : pct >= 60 ? 2 : 1;
    return (
      <div style={{ background: `linear-gradient(135deg,${bgFrom},${bgTo})` }}
        className="min-h-screen flex flex-col items-center justify-center p-6 text-center overflow-hidden relative">

        {/* Floating emojis background */}
        {FLOATING.map((em, i) => (
          <motion.span key={i}
            initial={{ opacity:0, y:"100vh", x: `${(i * 10) - 5}vw` }}
            animate={{ opacity:[0,1,1,0], y:"-120vh" }}
            transition={{ duration: 2.5 + i*0.3, delay: i*0.15, repeat:Infinity, repeatDelay: 1 }}
            className="absolute text-3xl pointer-events-none select-none"
            style={{ left: `${(i * 9.5) % 95}%`, bottom: 0 }}>
            {em}
          </motion.span>
        ))}

        <div className="relative z-10 flex flex-col items-center gap-4">
          {/* Joey excited */}
          <motion.div
            animate={{ y:[0,-22,0,-15,0,-8,0], rotate:[0,5,-5,5,-5,0] }}
            transition={{ duration:1.2, repeat:Infinity, ease:"easeInOut" }}>
            <Joey mood="excited" size={150}/>
          </motion.div>

          {/* Congratulation text */}
          <motion.div initial={{ scale:0, opacity:0 }} animate={{ scale:1, opacity:1 }}
            transition={{ type:"spring", delay:0.2 }}>
            <h2 className="text-5xl font-black text-white drop-shadow-lg leading-tight">
              ¡Felicidades,<br/>{playerName}! 🎉
            </h2>
          </motion.div>

          {/* Stars */}
          <motion.div className="flex gap-2 text-5xl"
            initial={{ scale:0 }} animate={{ scale:1 }} transition={{ delay:0.5, type:"spring" }}>
            {[...Array(3)].map((_, i) => (
              <motion.span key={i}
                initial={{ scale:0, rotate:-180 }} animate={{ scale:1, rotate:0 }}
                transition={{ delay: 0.6 + i*0.15, type:"spring" }}>
                {i < stars ? "⭐" : "☆"}
              </motion.span>
            ))}
          </motion.div>

          {/* Score card */}
          <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
            transition={{ delay:0.7 }}
            className="bg-white/20 backdrop-blur rounded-3xl px-10 py-5 border-2 border-white/30">
            <p className="text-4xl font-black text-white">{score} / {questions.length}</p>
            <p className="text-white/80 font-bold mt-1">
              {pct >= 80 ? "🏆 ¡Puntuación perfecta!" : pct >= 60 ? "🌟 ¡Muy buen trabajo!" : "💪 ¡Sigue practicando!"}
            </p>
          </motion.div>

          {/* Trophy emoji big */}
          <motion.div className="text-7xl"
            animate={{ scale:[1,1.2,1], rotate:[0,10,-10,0] }}
            transition={{ duration:1.5, repeat:Infinity }}>
            {pct >= 80 ? "🏆" : pct >= 60 ? "🥈" : "🎖️"}
          </motion.div>

          {/* Buttons */}
          <motion.div className="flex gap-3 flex-wrap justify-center mt-2"
            initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.9 }}>
            <button onClick={restart}
              className="px-8 py-4 bg-white rounded-2xl font-black text-xl shadow-xl cursor-pointer"
              style={{ color: bgFrom }}>
              🔄 Repetir
            </button>
            <a href={backHref}
              className="px-8 py-4 bg-white/20 text-white border-2 border-white/40 rounded-2xl font-black text-xl">
              🏠 Menú
            </a>
          </motion.div>
        </div>
      </div>
    );
  }

  /* ─── GAME SCREEN ─────────────────────────────────────────────────── */
  return (
    <div style={{ background: `linear-gradient(135deg,${bgFrom},${bgTo})` }}
      className="min-h-screen flex flex-col select-none">

      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-4 pb-2">
        <a href={backHref} className="text-white/80 text-3xl font-black">←</a>
        <h1 className="text-lg font-black text-white drop-shadow">{emoji} {title}</h1>
        <span className="text-white font-black text-lg">⭐ {score}</span>
      </div>

      {/* Progress */}
      <div className="h-3 bg-white/20 mx-4 rounded-full overflow-hidden mb-1">
        <motion.div className="h-full bg-white rounded-full"
          animate={{ width:`${progress}%` }} transition={{ duration:0.4 }}/>
      </div>
      <p className="text-center text-white/60 text-xs font-bold mb-2">{idx+1} / {questions.length}</p>

      {/* Main */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 gap-4 pb-6">

        {/* Question */}
        <AnimatePresence mode="wait">
          <motion.div key={idx}
            initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }}
            exit={{ opacity:0, y:-24 }} transition={{ duration:0.3 }}
            className="text-center w-full max-w-sm">
            <p className="text-white font-bold text-lg mb-3">{q.instruction}</p>
            <div className="bg-white/20 backdrop-blur rounded-3xl px-6 py-5 border-2 border-white/30">
              <p className="text-5xl leading-snug break-words max-w-xs mx-auto">{q.display}</p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Joey */}
        <motion.div
          animate={
            mood==="excited" ? { y:[0,-20,0,-14,0], scale:[1,1.05,1] } :
            mood==="sad"     ? { x:[-7,7,-7,7,0] } :
                               { y:[0,-6,0] }
          }
          transition={{ duration: mood==="happy" ? 1.6:0.45, repeat: mood==="happy" ? Infinity:0 }}>
          <Joey mood={mood} size={88}/>
        </motion.div>

        {/* Feedback */}
        <AnimatePresence>
          {state==="correct" && (
            <motion.p key="c" initial={{ scale:0 }} animate={{ scale:1 }} exit={{ scale:0 }}
              className="text-2xl font-black text-yellow-200 drop-shadow-lg">
              {CORRECT_MSGS[msgIdx]}
            </motion.p>
          )}
          {state==="wrong" && (
            <motion.p key="w" initial={{ scale:0 }} animate={{ scale:1 }} exit={{ scale:0 }}
              className="text-xl font-black text-white/90">
              {WRONG_MSGS[msgIdx]}
            </motion.p>
          )}
        </AnimatePresence>

        {/* Options 2×2 */}
        <div className="grid grid-cols-2 gap-3 w-full max-w-sm">
          {q.options.map((opt, i) => {
            let bg = opt.color ?? "white";
            let col = opt.color ? "white" : "#1f2937";
            if (picked !== null) {
              if (opt.correct)                  { bg = "#22c55e"; col = "white"; }
              else if (i===picked && !opt.correct) { bg = "#ef4444"; col = "white"; }
              else { bg = opt.color ? opt.color : "rgba(255,255,255,0.45)"; }
            }
            return (
              <button key={i} onClick={() => handleAnswer(i)} disabled={picked!==null}
                className="btn-option rounded-2xl p-4 font-black text-base shadow-lg min-h-[64px] flex items-center justify-center text-center"
                style={{ background:bg, color:col,
                  opacity: picked!==null && !opt.correct && i!==picked ? 0.55 : 1 }}>
                {opt.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
