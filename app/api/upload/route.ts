import { NextRequest, NextResponse } from 'next/server';

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
    const buffer = Buffer.from(bytes);

    // Sur Vercel, le système de fichiers est en lecture seule ("Read-Only").
    // Au lieu d'écrire sur le disque, on convertit l'image en Base64 Data URI
    // pour la stocker directement dans la base de données.
    const base64Data = buffer.toString('base64');
    const publicUrl = `data:${file.type};base64,${base64Data}`;
    return NextResponse.json({ success: true, url: publicUrl });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Erreur lors de l\'upload' }, { status: 500 });
  }
}
