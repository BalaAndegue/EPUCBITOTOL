import { NextRequest, NextResponse } from 'next/server';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_URL =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

const SYSTEM_PROMPT = `You are a Bible study assistant for ÉPUC Nkoabang, a Pentecostal church in Cameroon.
Your role:
- Answer ONLY questions about the Bible, scripture, Christian theology, faith, prayer, and spiritual growth.
- If the question is off-topic, politely redirect: "I can only help with Bible-related questions."
- Keep answers clear and concise (3–5 sentences unless more is truly needed).
- When quoting scripture, include the book, chapter and verse (e.g. John 3:16).
- Detect the language of the user's message and always respond in that same language (French or English).
- Be warm, pastoral and encouraging — you represent the ÉPUC Nkoabang community.`;

export async function POST(req: NextRequest) {
  if (!GEMINI_API_KEY) {
    return NextResponse.json(
      { error: 'GEMINI_API_KEY is not configured on the server.' },
      { status: 503 }
    );
  }

  const { message, history } = await req.json() as {
    message: string;
    history?: { role: 'user' | 'model'; text: string }[];
  };

  if (!message?.trim()) {
    return NextResponse.json({ error: 'Message is required.' }, { status: 400 });
  }

  // Build the conversation contents for Gemini
  const contents = [
    // System turn (Gemini 1.5 Flash accepts system via first "user" turn)
    { role: 'user', parts: [{ text: SYSTEM_PROMPT }] },
    { role: 'model', parts: [{ text: 'Understood. I am ready to help with Bible questions.' }] },
    // Previous turns
    ...(history ?? []).map(h => ({
      role: h.role,
      parts: [{ text: h.text }],
    })),
    // Current user message
    { role: 'user', parts: [{ text: message }] },
  ];

  const res = await fetch(`${GEMINI_URL}?key=${GEMINI_API_KEY}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents,
      generationConfig: { maxOutputTokens: 512, temperature: 0.7 },
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error('Gemini API error:', err);
    return NextResponse.json({ error: 'AI service error. Please try again.' }, { status: 502 });
  }

  const data = await res.json();
  const reply = data.candidates?.[0]?.content?.parts?.[0]?.text ?? '';

  return NextResponse.json({ reply });
}
