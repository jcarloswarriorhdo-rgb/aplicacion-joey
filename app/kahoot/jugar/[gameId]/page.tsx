"use client";

import { useEffect, useState, useCallback, use } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Joey } from "@/components/Joey";
import type { KahootGame } from "@/lib/kahoot-types";
import { ANSWER_COLORS, ANSWER_SHAPES, ANSWER_LABELS } from "@/lib/kahoot-types";

const BG = "linear-gradient(160deg,#46178f 0%,#7c3aed 100%)";

function burst() {
  confetti({ particleCount: 120, spread: 100, origin: { y: 0.5 },
    colors: ["#FFD700", "#FF6B6B", "#4CAF50", "#2196F3", "#9C27B0"] });
}

export default function JugarPage({ params }: { params: Promise<{ gameId: string }> }) {
  const { gameId } = use(params);
  const router = useRouter();
  const [game, setGame] = useState<KahootGame | null>(null);
  const [playerName, setPlayerName] = useState("");
  const [myAnswer, setMyAnswer] = useState<number | null>(null);
  const [timer, setTimer] = useState(0);
  const [prevStatus, setPrevStatus] = useState<string>("");
  const [prevQuestion, setPrevQuestion] = useState(-1);

  useEffect(() => {
    setPlayerName(localStorage.getItem("kahootPlayer") || "");
  }, []);

  const fetchGame = useCallback(async () => {
    const res = await fetch(`/api/kahoot/estado/${gameId}`);
    if (res.ok) setGame(await res.json());
  }, [gameId]);

  useEffect(() => {
    fetchGame();
    const interval = setInterval(fetchGame, 500);
    return () => clearInterval(interval);
  }, [fetchGame]);

  // Reset myAnswer when new question starts
  useEffect(() => {
    if (!game) return;
    if (game.status === "question" && game.currentQuestion !== prevQuestion) {
      setMyAnswer(null);
      setPrevQuestion(game.currentQuestion);
    }
    if (game.status !== prevStatus) {
      setPrevStatus(game.status);
    }
  }, [game?.status, game?.currentQuestion]);

  // Timer countdown
  useEffect(() => {
    if (!game || game.status !== "question") return;
    const q = game.questions[game.currentQuestion];
    const tick = setInterval(() => {
      const elapsed = (Date.now() - game.questionStartTime) / 1000;
      setTimer(Math.max(0, q.timeLimit - elapsed));
    }, 100);
    return () => clearInterval(tick);
  }, [game?.status, game?.currentQuestion, game?.questionStartTime]);

  async function submitAnswer(answerIdx: number) {
    if (myAnswer !== null || !playerName) return;
    setMyAnswer(answerIdx);
    await fetch("/api/kahoot/responder", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ gameId, playerName, answer: answerIdx }),
    });
  }

  if (!playerName) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6" style={{ background: BG }}>
        <p className="text-white font-black text-xl text-center">Sesión no encontrada.</p>
        <button onClick={() => router.push("/kahoot/unirse")}
          className="mt-4 text-white/60 underline font-bold bg-transparent border-none cursor-pointer">
          Volver a unirse
        </button>
      </div>
    );
  }

  if (!game) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: BG }}>
        <p className="text-white font-black text-2xl animate-pulse">Conectando...</p>
      </div>
    );
  }

  const q = game.questions[game.currentQuestion];
  const myPlayer = game.players[playerName];
  const myResult = game.lastResults?.[playerName];
  const timerPct = q ? (timer / q.timeLimit) * 100 : 0;

  /* ─── LOBBY ─── */
  if (game.status === "lobby") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center" style={{ background: BG }}>
        <motion.div animate={{ y: [0, -12, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}>
          <Joey mood="happy" size={140} />
        </motion.div>
        <h1 className="text-white font-black text-4xl mt-4">¡Listo, {playerName}!</h1>
        <p className="text-white/70 font-bold mt-2 text-xl">Esperando que el maestro inicie...</p>
        <div className="mt-6 flex gap-1 justify-center">
          {[0, 1, 2].map(i => (
            <motion.div key={i} className="w-3 h-3 rounded-full bg-white"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1, repeat: Infinity, delay: i * 0.3 }} />
          ))}
        </div>
      </div>
    );
  }

  /* ─── FINISHED ─── */
  if (game.status === "finished") {
    const sorted = Object.entries(game.players).sort((a, b) => b[1].score - a[1].score);
    const myRank = sorted.findIndex(([n]) => n === playerName) + 1;
    const medals = ["🥇", "🥈", "🥉"];
    if (myRank <= 3) burst();
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center" style={{ background: BG }}>
        <motion.div animate={{ rotate: [0, 10, -10, 10, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 0.8, delay: 0.2 }}>
          <Joey mood="excited" size={140} />
        </motion.div>
        <h1 className="text-white font-black text-4xl mt-4">¡Fin del juego!</h1>
        <div className="mt-4 bg-white/15 rounded-3xl px-8 py-5">
          <p className="text-white/70 font-bold">Tu posición</p>
          <p className="text-white font-black text-6xl">{myRank <= 3 ? medals[myRank - 1] : `#${myRank}`}</p>
          <p className="text-white font-black text-3xl mt-1">{myPlayer?.score ?? 0} pts</p>
        </div>
        <div className="mt-6 flex flex-col gap-2 w-full max-w-xs">
          {sorted.slice(0, 5).map(([name, p], i) => (
            <div key={name} className="flex items-center gap-3 bg-white/10 rounded-xl px-4 py-2">
              <span className="text-white font-black w-6">{i < 3 ? medals[i] : i + 1}</span>
              <span className={`font-black flex-1 text-left ${name === playerName ? "text-yellow-300" : "text-white"}`}>{name}</span>
              <span className="text-white/80 font-bold">{p.score}</span>
            </div>
          ))}
        </div>
        <button onClick={() => router.push("/kahoot")}
          className="mt-6 text-white/50 font-bold underline bg-transparent border-none cursor-pointer text-sm">
          Volver al inicio
        </button>
      </div>
    );
  }

  /* ─── LEADERBOARD ─── */
  if (game.status === "leaderboard") {
    const sorted = Object.entries(game.players).sort((a, b) => b[1].score - a[1].score);
    const myRank = sorted.findIndex(([n]) => n === playerName) + 1;
    const correct = myResult?.correct ?? false;
    if (correct) burst();

    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center" style={{ background: BG }}>
        <AnimatePresence mode="wait">
          <motion.div key="result" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            className="flex flex-col items-center gap-4 w-full max-w-xs">

            <Joey mood={correct ? "excited" : "sad"} size={110} />

            {myResult ? (
              <div className={`w-full rounded-3xl px-6 py-5 ${correct ? "bg-green-500" : myResult.answer === -1 ? "bg-yellow-500" : "bg-red-500"}`}>
                <p className="text-white font-black text-3xl">
                  {correct ? "¡Correcto! ✅" : myResult.answer === -1 ? "⏱ Sin tiempo" : "Incorrecto ❌"}
                </p>
                {correct && (
                  <p className="text-white/90 font-black text-xl mt-1">+{myResult.points} puntos</p>
                )}
              </div>
            ) : (
              <div className="w-full rounded-3xl px-6 py-5 bg-white/20">
                <p className="text-white font-black text-2xl">⏱ Sin respuesta</p>
              </div>
            )}

            {/* Mi posición */}
            <div className="bg-white/15 rounded-2xl px-6 py-4 w-full">
              <p className="text-white/70 font-bold text-sm">Tu posición</p>
              <p className="text-white font-black text-4xl">#{myRank}</p>
              <p className="text-white/80 font-bold">{myPlayer?.score ?? 0} puntos</p>
            </div>

            {/* Top 3 */}
            <div className="flex flex-col gap-2 w-full">
              {sorted.slice(0, 3).map(([name, p], i) => (
                <div key={name} className="flex items-center gap-3 bg-white/10 rounded-xl px-4 py-2">
                  <span className="text-lg">{["🥇", "🥈", "🥉"][i]}</span>
                  <span className={`font-black flex-1 text-left text-sm ${name === playerName ? "text-yellow-300" : "text-white"}`}>{name}</span>
                  <span className="text-white/80 font-bold text-sm">{p.score}</span>
                </div>
              ))}
            </div>

            <p className="text-white/50 font-bold text-sm animate-pulse">
              Esperando siguiente pregunta...
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    );
  }

  /* ─── QUESTION ─── */
  return (
    <div className="min-h-screen flex flex-col" style={{ background: BG }}>
      {/* Timer bar */}
      <div className="h-3 bg-white/20">
        <motion.div className="h-full rounded-r-full"
          style={{ background: timerPct > 30 ? "#26890c" : timerPct > 10 ? "#d89e00" : "#e21b3c" }}
          animate={{ width: `${timerPct}%` }} transition={{ duration: 0.1 }} />
      </div>

      <div className="flex items-center justify-between px-4 py-2">
        <span className="text-white font-black">{Math.ceil(timer)}s</span>
        <span className="text-white/60 text-sm font-bold">{game.currentQuestion + 1}/{game.questions.length}</span>
        <span className="text-white font-black text-sm">⭐ {myPlayer?.score ?? 0}</span>
      </div>

      {/* Pregunta */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 gap-4 pb-4">
        <AnimatePresence mode="wait">
          <motion.div key={game.currentQuestion}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="w-full flex flex-col items-center gap-3">

            {q.image && (
              <img src={q.image} alt="" className="max-h-32 rounded-2xl object-cover shadow-xl w-full" />
            )}
            <div className="bg-white/15 rounded-3xl px-5 py-4 w-full text-center">
              <p className="text-white font-black text-xl leading-snug">{q.text}</p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Botones de respuesta */}
        {myAnswer === null ? (
          <div className="grid grid-cols-2 gap-3 w-full">
            {q.options.map((opt, i) => (
              <motion.button key={i} whileTap={{ scale: 0.95 }}
                onClick={() => submitAnswer(i)}
                className="rounded-2xl p-4 min-h-[80px] flex flex-col items-center justify-center gap-1 cursor-pointer shadow-lg"
                style={{ background: ANSWER_COLORS[i] }}>
                <span className="text-white font-black text-2xl">{ANSWER_SHAPES[i]}</span>
                <span className="text-white font-bold text-sm text-center leading-tight">{opt}</span>
              </motion.button>
            ))}
          </div>
        ) : (
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            className="w-full rounded-3xl px-6 py-8 text-center"
            style={{ background: ANSWER_COLORS[myAnswer] }}>
            <p className="text-4xl font-black text-white">{ANSWER_SHAPES[myAnswer]} {ANSWER_LABELS[myAnswer]}</p>
            <p className="text-white/80 font-bold mt-2">¡Respuesta enviada!</p>
            <p className="text-white/60 text-sm mt-1 animate-pulse">Esperando resultado...</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
