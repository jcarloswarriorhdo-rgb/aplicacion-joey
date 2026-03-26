"use client";

import { useEffect, useState, useCallback, use } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import type { KahootGame } from "@/lib/kahoot-types";
import { ANSWER_COLORS, ANSWER_SHAPES } from "@/lib/kahoot-types";

const BG = "linear-gradient(160deg,#46178f 0%,#7c3aed 100%)";

export default function HostPage({ params }: { params: Promise<{ gameId: string }> }) {
  const { gameId } = use(params);
  const router = useRouter();
  const [game, setGame] = useState<KahootGame | null>(null);
  const [timer, setTimer] = useState(0);
  const [advancing, setAdvancing] = useState(false);

  const fetchGame = useCallback(async () => {
    const res = await fetch(`/api/kahoot/estado/${gameId}`);
    if (res.ok) setGame(await res.json());
  }, [gameId]);

  useEffect(() => {
    fetchGame();
    const interval = setInterval(fetchGame, 500);
    return () => clearInterval(interval);
  }, [fetchGame]);

  // Timer countdown
  useEffect(() => {
    if (!game || game.status !== "question") return;
    const q = game.questions[game.currentQuestion];
    const tick = setInterval(() => {
      const elapsed = (Date.now() - game.questionStartTime) / 1000;
      const remaining = Math.max(0, q.timeLimit - elapsed);
      setTimer(remaining);
      if (remaining === 0) clearInterval(tick);
    }, 100);
    return () => clearInterval(tick);
  }, [game?.status, game?.currentQuestion, game?.questionStartTime]);

  async function siguiente() {
    if (advancing) return;
    setAdvancing(true);
    await fetch("/api/kahoot/siguiente", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ gameId }),
    });
    await fetchGame();
    setAdvancing(false);
  }

  async function iniciar() {
    await fetch("/api/kahoot/iniciar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ gameId }),
    });
    await fetchGame();
  }

  if (!game) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: BG }}>
        <p className="text-white font-black text-2xl animate-pulse">Cargando...</p>
      </div>
    );
  }

  const playerList = Object.entries(game.players).sort((a, b) => b[1].score - a[1].score);
  const q = game.questions[game.currentQuestion];
  const answeredCount = Object.keys(game.currentAnswers).length;
  const totalPlayers = playerList.length;
  const timerPct = q ? (timer / q.timeLimit) * 100 : 0;

  /* ─── LOBBY ─── */
  if (game.status === "lobby") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center" style={{ background: BG }}>
        <div className="w-full max-w-md flex flex-col gap-6">
          <h1 className="text-white font-black text-2xl">¡Sala de espera!</h1>

          {/* PIN grande */}
          <div className="bg-white rounded-3xl px-8 py-6 shadow-2xl">
            <p className="text-gray-500 font-bold text-sm uppercase tracking-widest mb-1">PIN del juego</p>
            <p className="font-black text-6xl tracking-[0.15em]" style={{ color: "#46178f" }}>{game.pin}</p>
            <p className="text-gray-400 text-sm mt-2 font-bold">Entra en esta app → Unirse a un juego</p>
          </div>

          {/* Lista de jugadores */}
          <div className="bg-white/10 rounded-2xl p-4 min-h-[80px]">
            {playerList.length === 0 ? (
              <p className="text-white/50 font-bold text-center py-4">Esperando jugadores...</p>
            ) : (
              <div className="flex flex-wrap gap-2 justify-center">
                <AnimatePresence>
                  {playerList.map(([name]) => (
                    <motion.span key={name}
                      initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                      className="bg-white text-purple-800 font-black px-4 py-2 rounded-full text-sm shadow">
                      {name}
                    </motion.span>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>

          <p className="text-white/60 font-bold">{totalPlayers} jugador{totalPlayers !== 1 ? "es" : ""} conectado{totalPlayers !== 1 ? "s" : ""}</p>

          <motion.button whileTap={{ scale: 0.97 }}
            onClick={iniciar}
            disabled={totalPlayers === 0}
            className="w-full py-5 rounded-2xl font-black text-xl text-white shadow-2xl cursor-pointer"
            style={{ background: totalPlayers > 0 ? "#e21b3c" : "rgba(255,255,255,0.2)" }}>
            {totalPlayers > 0 ? "🚀 ¡Iniciar Kahoot!" : "Esperando jugadores..."}
          </motion.button>

          <button onClick={() => router.push("/kahoot")}
            className="text-white/40 text-sm font-bold underline bg-transparent border-none cursor-pointer">
            Cancelar juego
          </button>
        </div>
      </div>
    );
  }

  /* ─── FINISHED ─── */
  if (game.status === "finished") {
    const podium = playerList.slice(0, 3);
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center" style={{ background: BG }}>
        <div className="w-full max-w-md flex flex-col gap-6">
          <div className="text-7xl animate-bounce">🏆</div>
          <h1 className="text-white font-black text-4xl">¡Fin del juego!</h1>
          <div className="flex flex-col gap-3">
            {podium.map(([name, player], i) => (
              <motion.div key={name} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.15 }}
                className="flex items-center gap-4 bg-white/15 rounded-2xl px-5 py-4">
                <span className="text-3xl">{["🥇", "🥈", "🥉"][i]}</span>
                <span className="text-white font-black text-xl flex-1 text-left">{name}</span>
                <span className="text-white/80 font-black text-lg">{player.score} pts</span>
              </motion.div>
            ))}
          </div>
          <button onClick={() => router.push("/kahoot")}
            className="w-full py-4 rounded-2xl font-black text-lg text-white cursor-pointer"
            style={{ background: "#e21b3c" }}>
            🏠 Volver al inicio
          </button>
        </div>
      </div>
    );
  }

  /* ─── QUESTION ─── */
  if (game.status === "question") {
    return (
      <div className="min-h-screen flex flex-col" style={{ background: BG }}>
        {/* Timer bar */}
        <div className="h-3 bg-white/20">
          <motion.div className="h-full rounded-r-full"
            style={{ background: timerPct > 30 ? "#26890c" : timerPct > 10 ? "#d89e00" : "#e21b3c" }}
            animate={{ width: `${timerPct}%` }} transition={{ duration: 0.1 }} />
        </div>

        <div className="flex items-center justify-between px-5 py-3">
          <span className="text-white font-black text-lg">{Math.ceil(timer)}s</span>
          <span className="text-white/70 font-bold">Pregunta {game.currentQuestion + 1} / {game.questions.length}</span>
          <span className="text-white font-black">{answeredCount}/{totalPlayers} ✓</span>
        </div>

        {/* Pregunta */}
        <div className="flex-1 flex flex-col items-center justify-center px-4 gap-4">
          {q.image && (
            <img src={q.image} alt="" className="max-h-36 rounded-2xl object-cover shadow-xl" />
          )}
          <div className="bg-white/15 rounded-3xl px-6 py-5 w-full max-w-lg text-center">
            <p className="text-white font-black text-2xl leading-snug">{q.text}</p>
          </div>

          {/* Opciones (solo visual para host) */}
          <div className="grid grid-cols-2 gap-3 w-full max-w-lg">
            {q.options.map((opt, i) => (
              <div key={i} className="rounded-2xl p-4 flex items-center gap-3"
                style={{ background: ANSWER_COLORS[i] }}>
                <span className="text-white font-black text-xl">{ANSWER_SHAPES[i]}</span>
                <span className="text-white font-bold text-base">{opt}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4">
          <motion.button whileTap={{ scale: 0.97 }}
            onClick={siguiente}
            disabled={advancing}
            className="w-full py-4 rounded-2xl font-black text-lg text-white cursor-pointer"
            style={{ background: "#e21b3c" }}>
            {advancing ? "..." : "Revelar respuesta →"}
          </motion.button>
        </div>
      </div>
    );
  }

  /* ─── LEADERBOARD ─── */
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-5" style={{ background: BG }}>
      <div className="w-full max-w-md flex flex-col gap-4">
        <h2 className="text-white font-black text-3xl text-center">
          {game.currentQuestion + 1 < game.questions.length ? "📊 Puntajes" : "🏆 Resultados finales"}
        </h2>

        {/* Respuesta correcta */}
        <div className="rounded-2xl p-4 flex items-center gap-3 mb-1"
          style={{ background: ANSWER_COLORS[q.correct] }}>
          <span className="text-white font-black text-2xl">{ANSWER_SHAPES[q.correct]}</span>
          <div>
            <p className="text-white/70 text-xs font-bold">Respuesta correcta</p>
            <p className="text-white font-black text-lg">{q.options[q.correct]}</p>
          </div>
        </div>

        {/* Top jugadores */}
        <div className="flex flex-col gap-2">
          {playerList.slice(0, 8).map(([name, player], i) => {
            const result = game.lastResults[name];
            return (
              <motion.div key={name} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-3 bg-white/10 rounded-xl px-4 py-3">
                <span className="text-white font-black w-6">{i + 1}</span>
                <span className="text-white font-black flex-1">{name}</span>
                {result && (
                  <span className="text-lg">{result.correct ? "✅" : result.answer === -1 ? "⏱" : "❌"}</span>
                )}
                {result?.correct && (
                  <span className="text-yellow-300 font-black text-sm">+{result.points}</span>
                )}
                <span className="text-white font-black">{player.score}</span>
              </motion.div>
            );
          })}
        </div>

        <motion.button whileTap={{ scale: 0.97 }}
          onClick={siguiente}
          disabled={advancing}
          className="w-full py-5 rounded-2xl font-black text-xl text-white cursor-pointer mt-2"
          style={{ background: "#e21b3c" }}>
          {advancing ? "..." : game.currentQuestion + 1 < game.questions.length
            ? `Siguiente pregunta (${game.currentQuestion + 2}/${game.questions.length}) →`
            : "🏆 Ver resultados finales"}
        </motion.button>
      </div>
    </div>
  );
}
