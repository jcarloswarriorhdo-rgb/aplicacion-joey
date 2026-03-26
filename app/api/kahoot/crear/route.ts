import { NextRequest } from 'next/server';
import { saveGame } from '@/lib/redis';
import type { KahootGame, KahootQuestion } from '@/lib/kahoot-types';

function randomPin(): string {
  return String(Math.floor(100000 + Math.random() * 900000));
}

function randomId(): string {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
}

export async function POST(req: NextRequest) {
  try {
    const { questions }: { questions: KahootQuestion[] } = await req.json();

    if (!questions?.length) {
      return Response.json({ error: 'Se necesita al menos una pregunta' }, { status: 400 });
    }

    const game: KahootGame = {
      id: randomId(),
      pin: randomPin(),
      status: 'lobby',
      questions,
      currentQuestion: 0,
      questionStartTime: 0,
      players: {},
      currentAnswers: {},
      lastResults: {},
    };

    await saveGame(game);
    return Response.json({ gameId: game.id, pin: game.pin });
  } catch {
    return Response.json({ error: 'Error al crear el juego' }, { status: 500 });
  }
}
