import { NextRequest } from 'next/server';
import { put } from '@vercel/blob';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    if (!file) return Response.json({ error: 'No se recibió archivo' }, { status: 400 });

    const blob = await put(`kahoot/${Date.now()}-${file.name}`, file, { access: 'public' });
    return Response.json({ url: blob.url });
  } catch {
    return Response.json({ error: 'Error al subir imagen' }, { status: 500 });
  }
}
