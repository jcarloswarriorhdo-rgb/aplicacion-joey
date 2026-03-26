import { NextRequest } from 'next/server';
import { getGame, saveGame } from '@/lib/redis';
import { calcPoints } from '@/lib/kahoot-types';

export async function POST(req: NextRequest) {
  try {
    const { gameId }: { gameId: string } = await req.json();
    const game = await getGame(gameId);
    if (!game) return Response.json({ error: 'Juego no encontrado' }, { status: 404 });

    if (game.status === 'question') {
      // Revelar: calcular puntajes
      const q = game.questions[game.currentQuestion];
      const results: typeof game.lastResults = {};

      for (const [name, player] of Object.entries(game.players)) {
        const submitted = game.currentAnswers[name];
        if (!submitted) {
          // No respondió
          results[name] = { answer: -1, correct: false, points: 0 };
          player.streak = 0;
        } else {
          const correct = submitted.answer === q.correct;
          if (correct) {
            const elapsed = submitted.submittedAt - game.questionStartTime;
            const basePoints = calcPoints(elapsed, q.timeLimit);
            player.streak += 1;
            const streakBonus = Math.min(player.streak - 1, 5) * 100;
            const points = basePoints + streakBonus;
            player.score += points;
            results[name] = { answer: submitted.answer, correct: true, points };
          } else {
            player.streak = 0;
            results[name] = { answer: submitted.answer, correct: false, points: 0 };
          }
        }
      }

      game.lastResults = results;
      game.currentAnswers = {};
      game.status = 'leaderboard';
      await saveGame(game);
      return Response.json({ ok: true, phase: 'leaderboard' });
    }

    if (game.status === 'leaderboard') {
      const nextIdx = game.currentQuestion + 1;
      if (nextIdx >= game.questions.length) {
        game.status = 'finished';
      } else {
        game.currentQuestion = nextIdx;
        game.questionStartTime = Date.now();
        game.currentAnswers = {};
        game.lastResults = {};
        game.status = 'question';
      }
      await saveGame(game);
      return Response.json({ ok: true, phase: game.status });
    }

    return Response.json({ error: 'Estado no válido' }, { status: 409 });
  } catch {
    return Response.json({ error: 'Error al avanzar' }, { status: 500 });
  }
}
