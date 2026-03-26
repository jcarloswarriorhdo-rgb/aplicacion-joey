import { NextRequest } from 'next/server';
import { getGame } from '@/lib/redis';

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ gameId: string }> }
) {
  try {
    const { gameId } = await params;
    const game = await getGame(gameId);
    if (!game) return Response.json({ error: 'Juego no encontrado' }, { status: 404 });
    return Response.json(game, {
      headers: { 'Cache-Control': 'no-store' },
    });
  } catch {
    return Response.json({ error: 'Error al obtener estado' }, { status: 500 });
  }
}
