import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { cookies } from 'next/headers';
import { verifySession } from '@/app/actions/auth';

// Allowed MIME types
const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
const MAX_SIZE_MB = 5;

export async function POST(req: NextRequest) {
  try {
    // Auth check
    const token = cookies().get('epuc_session')?.value;
    const isValid = await verifySession(token);
    if (!isValid) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'Aucun fichier fourni' }, { status: 400 });
    }

    // Validate type
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json({ error: 'Format non supporté. Utilisez JPG, PNG, WebP ou GIF.' }, { status: 400 });
    }

    // Validate size
    const sizeMB = file.size / (1024 * 1024);
    if (sizeMB > MAX_SIZE_MB) {
      return NextResponse.json({ error: `Fichier trop lourd (max ${MAX_SIZE_MB} Mo)` }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = new Uint8Array(bytes);

    // Generate unique filename
    const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg';
    const uniqueName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const uploadDir = join(process.cwd(), 'public', 'uploads');

    // Ensure directory exists
    await mkdir(uploadDir, { recursive: true });

    const filePath = join(uploadDir, uniqueName);
    await writeFile(filePath, buffer);

    const publicUrl = `/uploads/${uniqueName}`;
    return NextResponse.json({ success: true, url: publicUrl });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Erreur lors de l\'upload' }, { status: 500 });
  }
}
