import { NextRequest } from 'next/server';
import { getGameByPin, saveGame } from '@/lib/redis';

export async function POST(req: NextRequest) {
  try {
    const { pin, name }: { pin: string; name: string } = await req.json();

    if (!pin || !name?.trim()) {
      return Response.json({ error: 'PIN y nombre requeridos' }, { status: 400 });
    }

    const game = await getGameByPin(pin.trim());
    if (!game) {
      return Response.json({ error: 'Juego no encontrado. Verifica el PIN.' }, { status: 404 });
    }
    if (game.status !== 'lobby') {
      return Response.json({ error: 'El juego ya comenzó' }, { status: 409 });
    }

    const playerName = name.trim();
    if (game.players[playerName]) {
      return Response.json({ error: 'Ese nombre ya está en uso' }, { status: 409 });
    }

    game.players[playerName] = { score: 0, streak: 0 };
    await saveGame(game);

    return Response.json({ gameId: game.id, playerName });
  } catch {
    return Response.json({ error: 'Error al unirse al juego' }, { status: 500 });
  }
}
