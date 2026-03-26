import { NextRequest } from 'next/server';
import { getGame, saveGame } from '@/lib/redis';

export async function POST(req: NextRequest) {
  try {
    const { gameId }: { gameId: string } = await req.json();
    const game = await getGame(gameId);
    if (!game) return Response.json({ error: 'Juego no encontrado' }, { status: 404 });
    if (game.status !== 'lobby') return Response.json({ error: 'El juego ya inició' }, { status: 409 });

    game.status = 'question';
    game.currentQuestion = 0;
    game.questionStartTime = Date.now();
    game.currentAnswers = {};
    game.lastResults = {};
    await saveGame(game);

    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: 'Error al iniciar' }, { status: 500 });
  }
}
