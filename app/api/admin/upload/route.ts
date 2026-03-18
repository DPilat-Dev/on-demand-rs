import { handleUpload, type HandleUploadBody } from '@vercel/blob/client';
import { NextResponse } from 'next/server';
import { auth } from '@/auth';

const ALLOWED_TYPES = [
  'image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml',
  'video/mp4', 'video/webm', 'video/quicktime',
];

export async function POST(req: Request) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = (await req.json()) as HandleUploadBody;

  try {
    const json = await handleUpload({
      body,
      request: req,
      onBeforeGenerateToken: async (pathname) => {
        const ext = pathname.split('.').pop()?.toLowerCase() ?? '';
        const mimeGuess: Record<string, string> = {
          jpg: 'image/jpeg', jpeg: 'image/jpeg', png: 'image/png',
          webp: 'image/webp', gif: 'image/gif', svg: 'image/svg+xml',
          mp4: 'video/mp4', webm: 'video/webm', mov: 'video/quicktime',
        };
        const mime = mimeGuess[ext] ?? '';
        if (!ALLOWED_TYPES.includes(mime)) {
          throw new Error('File type not allowed');
        }
        return { allowedContentTypes: ALLOWED_TYPES, addRandomSuffix: true };
      },
      onUploadCompleted: async () => {
        // no-op — revalidation happens client-side after upload
      },
    });
    return NextResponse.json(json);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
