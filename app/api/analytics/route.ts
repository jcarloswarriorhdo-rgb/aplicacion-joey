import { NextRequest, NextResponse } from 'next/server';
import {
  createSession,
  getSession,
  updateSession,
  parseDevice,
  parseOS,
  parseBrowser,
} from '@/lib/analytics';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as {
      event: string;
      sessionId: string;
      playerName?: string;
      category?: string;
      playTime?: number;
    };

    const { event, sessionId, playerName, category, playTime } = body;
    if (!sessionId) return NextResponse.json({ error: 'Missing sessionId' }, { status: 400 });

    const ua = req.headers.get('user-agent') || '';
    const forwarded = req.headers.get('x-forwarded-for') || '';
    const ip = forwarded.split(',')[0].trim() || 'local';

    if (event === 'start') {
      await createSession({
        id: sessionId,
        playerName: playerName || 'Anónimo',
        device: parseDevice(ua),
        os: parseOS(ua),
        browser: parseBrowser(ua),
        sessionStart: new Date().toISOString(),
        lastSeen: new Date().toISOString(),
        totalPlayTime: 0,
        categories: {},
        gamesCompleted: 0,
        ip,
      });
    } else if (event === 'game_complete') {
      const session = await getSession(sessionId);
      if (session && category) {
        const cats = { ...session.categories };
        cats[category] = (cats[category] || 0) + 1;
        await updateSession(sessionId, {
          categories: cats,
          gamesCompleted: session.gamesCompleted + 1,
          totalPlayTime: session.totalPlayTime + (playTime || 0),
          lastSeen: new Date().toISOString(),
        });
      }
    } else if (event === 'heartbeat') {
      const session = await getSession(sessionId);
      if (session) {
        await updateSession(sessionId, {
          lastSeen: new Date().toISOString(),
          totalPlayTime: session.totalPlayTime + (playTime || 0),
        });
      }
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error('Analytics error:', e);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}
