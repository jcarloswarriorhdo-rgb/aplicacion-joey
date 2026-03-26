import { Redis } from '@upstash/redis';
import type { KahootGame } from './kahoot-types';

export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

const GAME_TTL = 60 * 60 * 4; // 4 horas

export async function getGame(gameId: string): Promise<KahootGame | null> {
  return redis.get<KahootGame>(`game:${gameId}`);
}

export async function saveGame(game: KahootGame): Promise<void> {
  await Promise.all([
    redis.set(`game:${game.id}`, game, { ex: GAME_TTL }),
    redis.set(`pin:${game.pin}`, game.id, { ex: GAME_TTL }),
  ]);
}

export async function getGameByPin(pin: string): Promise<KahootGame | null> {
  const gameId = await redis.get<string>(`pin:${pin}`);
  if (!gameId) return null;
  return getGame(gameId);
}
