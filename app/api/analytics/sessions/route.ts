import { NextRequest, NextResponse } from 'next/server';
import { getAllSessions, clearAllSessions } from '@/lib/analytics';

function isAuthorized(req: NextRequest): boolean {
  return req.cookies.get('joey-admin')?.value === 'authenticated';
}

export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }
  const sessions = await getAllSessions();
  return NextResponse.json({ sessions });
}

export async function DELETE(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }
  await clearAllSessions();
  return NextResponse.json({ ok: true });
}
