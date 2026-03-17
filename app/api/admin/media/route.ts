import { list, del } from '@vercel/blob';
import { NextResponse } from 'next/server';
import { auth } from '@/auth';

export async function GET() {
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { blobs } = await list();
  return NextResponse.json({ blobs });
}

export async function DELETE(req: Request) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { url } = await req.json();
  if (!url) return NextResponse.json({ error: 'No url provided' }, { status: 400 });

  await del(url);
  return NextResponse.json({ deleted: true });
}
