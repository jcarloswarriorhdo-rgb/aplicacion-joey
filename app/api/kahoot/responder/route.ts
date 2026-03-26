import { NextRequest } from 'next/server';
import { getGame, saveGame } from '@/lib/redis';

export async function POST(req: NextRequest) {
  try {
    const { gameId, playerName, answer }: { gameId: string; playerName: string; answer: number } = await req.json();
    const game = await getGame(gameId);
    if (!game) return Response.json({ error: 'Juego no encontrado' }, { status: 404 });
    if (game.status !== 'question') return Response.json({ error: 'No es momento de responder' }, { status: 409 });
    if (game.currentAnswers[playerName]) return Response.json({ error: 'Ya respondiste' }, { status: 409 });

    game.currentAnswers[playerName] = { answer, submittedAt: Date.now() };
    await saveGame(game);

    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: 'Error al responder' }, { status: 500 });
  }
}
