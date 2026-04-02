import { redis } from './redis';

export interface PlayerSession {
  id: string;
  playerName: string;
  device: string;
  os: string;
  browser: string;
  sessionStart: string;   // ISO timestamp
  lastSeen: string;        // ISO timestamp
  totalPlayTime: number;   // segundos
  categories: Record<string, number>; // categoria -> veces jugadas
  gamesCompleted: number;
  ip: string;
}

const KEY = (id: string) => `joey:session:${id}`;
const ALL_KEY = 'joey:sessions:all';
const TTL = 60 * 60 * 24 * 30; // 30 días

// ── Device / OS / Browser detection ──────────────────────────────────────────

export function parseDevice(ua: string): string {
  if (/ipad|tablet/i.test(ua)) return 'Tablet';
  if (/mobile|android|iphone|ipod/i.test(ua)) return 'Móvil';
  return 'Desktop';
}

export function parseOS(ua: string): string {
  if (/iphone|ipad|ipod/i.test(ua)) return 'iOS';
  if (/android/i.test(ua)) return 'Android';
  if (/windows nt/i.test(ua)) return 'Windows';
  if (/mac os x/i.test(ua)) return 'Mac';
  if (/linux/i.test(ua)) return 'Linux';
  return 'Otro';
}

export function parseBrowser(ua: string): string {
  if (/edg\//i.test(ua)) return 'Edge';
  if (/chrome/i.test(ua)) return 'Chrome';
  if (/firefox/i.test(ua)) return 'Firefox';
  if (/safari/i.test(ua)) return 'Safari';
  return 'Otro';
}

// ── Helpers ───────────────────────────────────────────────────────────────────

export function topCategory(categories: Record<string, number>): string {
  const entries = Object.entries(categories);
  if (!entries.length) return '—';
  return entries.sort((a, b) => b[1] - a[1])[0][0];
}

export function formatDuration(seconds: number): string {
  if (seconds < 60) return `${seconds}s`;
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  if (m < 60) return s > 0 ? `${m}m ${s}s` : `${m}m`;
  const h = Math.floor(m / 60);
  const rm = m % 60;
  return rm > 0 ? `${h}h ${rm}m` : `${h}h`;
}

// ── Redis operations ─────────────────────────────────────────────────────────

export async function createSession(session: PlayerSession): Promise<void> {
  const ts = new Date(session.sessionStart).getTime();
  await Promise.all([
    redis.set(KEY(session.id), session, { ex: TTL }),
    redis.zadd(ALL_KEY, { score: ts, member: session.id }),
  ]);
  await redis.expire(ALL_KEY, TTL);
}

export async function getSession(id: string): Promise<PlayerSession | null> {
  return redis.get<PlayerSession>(KEY(id));
}

export async function updateSession(
  id: string,
  updates: Partial<PlayerSession>,
): Promise<void> {
  const session = await getSession(id);
  if (!session) return;
  await redis.set(KEY(id), { ...session, ...updates }, { ex: TTL });
}

export async function getAllSessions(): Promise<PlayerSession[]> {
  const ids = (await redis.zrange(ALL_KEY, 0, 499, { rev: true })) as string[];
  if (!ids || !ids.length) return [];
  const sessions = await Promise.all(ids.map(id => getSession(id)));
  return sessions.filter(Boolean) as PlayerSession[];
}

export async function clearAllSessions(): Promise<void> {
  const ids = (await redis.zrange(ALL_KEY, 0, -1)) as string[];
  const pipeline = redis.pipeline();
  ids.forEach(id => pipeline.del(KEY(id)));
  pipeline.del(ALL_KEY);
  await pipeline.exec();
}
