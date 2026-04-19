import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import nodemailer from 'nodemailer';

/* Même liste que /api/verse */
const VERSES = [
  { ref: 'Jean 3:16', text: 'Car Dieu a tant aimé le monde qu\'il a donné son Fils unique, afin que quiconque croit en lui ne périsse point, mais qu\'il ait la vie éternelle.' },
  { ref: 'Psaume 23:1', text: 'L\'Éternel est mon berger : je ne manquerai de rien.' },
  { ref: 'Romains 8:28', text: 'Nous savons, du reste, que toutes choses concourent au bien de ceux qui aiment Dieu, de ceux qui sont appelés selon son dessein.' },
  { ref: 'Philippiens 4:13', text: 'Je puis tout par celui qui me fortifie.' },
  { ref: 'Josué 1:9', text: 'Aie du courage et de la fermeté ! Ne sois pas effrayé et ne t\'épouvante pas, car l\'Éternel, ton Dieu, est avec toi dans tout ce que tu feras.' },
  { ref: 'Ésaïe 40:31', text: 'Mais ceux qui se confient en l\'Éternel renouvellent leur force. Ils prennent le vol comme les aigles ; ils courent, et ne se lassent point ; ils marchent, et ne se fatiguent point.' },
  { ref: 'Matthieu 6:33', text: 'Cherchez premièrement le royaume et la justice de Dieu ; et toutes ces choses vous seront données par-dessus.' },
  { ref: 'Proverbes 3:5-6', text: 'Confie-toi en l\'Éternel de tout ton cœur, et ne t\'appuie pas sur ta sagesse ; reconnais-le dans toutes tes voies, et il aplanira tes sentiers.' },
  { ref: 'Jérémie 29:11', text: 'Car je connais les projets que j\'ai formés sur vous, dit l\'Éternel, projets de paix et non de malheur, afin de vous donner un avenir et de l\'espérance.' },
  { ref: 'Psaume 46:2', text: 'Dieu est pour nous un refuge et un appui, un secours qui ne manque jamais dans la détresse.' },
  { ref: 'Romains 10:9', text: 'Si tu confesses de ta bouche le Seigneur Jésus, et si tu crois dans ton cœur que Dieu l\'a ressuscité des morts, tu seras sauvé.' },
  { ref: 'Actes 1:8', text: 'Vous recevrez une puissance, le Saint-Esprit survenant sur vous, et vous serez mes témoins jusqu\'aux extrémités de la terre.' },
];

function getDailyVerse() {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const dayOfYear = Math.floor((now.getTime() - start.getTime()) / 86400000);
  return VERSES[dayOfYear % VERSES.length];
}

function buildEmailHtml(verse: { ref: string; text: string }, date: string): string {
  return `<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#FDFAF4;font-family:'Georgia',serif;">
  <div style="max-width:600px;margin:0 auto;padding:32px 16px;">
    <!-- Header -->
    <div style="background:linear-gradient(135deg,#070A14,#0D1425);border-radius:16px;padding:32px;text-align:center;margin-bottom:24px;">
      <div style="width:56px;height:56px;background:linear-gradient(135deg,#C9973A,#E8B84B);border-radius:14px;margin:0 auto 16px;display:flex;align-items:center;justify-content:center;">
        <span style="font-size:28px;">✝</span>
      </div>
      <p style="color:rgba(201,151,58,0.8);font-size:11px;letter-spacing:3px;text-transform:uppercase;margin:0 0 8px;">ÉPUC Nkoabang</p>
      <h1 style="color:white;font-size:22px;font-weight:bold;margin:0;">Verset du Jour</h1>
      <p style="color:rgba(255,255,255,0.5);font-size:12px;margin:8px 0 0;">${date}</p>
    </div>
    
    <!-- Verset -->
    <div style="background:white;border-radius:16px;padding:28px;margin-bottom:20px;border:1px solid #E7E0D4;text-align:center;">
      <div style="width:40px;height:3px;background:linear-gradient(90deg,#C9973A,#E8B84B);border-radius:2px;margin:0 auto 20px;"></div>
      <p style="font-size:18px;font-style:italic;color:#44403C;line-height:1.7;margin:0 0 16px;">&ldquo;${verse.text}&rdquo;</p>
      <p style="font-size:14px;font-weight:bold;color:#C9973A;margin:0;">— ${verse.ref}</p>
      <div style="width:40px;height:3px;background:linear-gradient(90deg,#C9973A,#E8B84B);border-radius:2px;margin:20px auto 0;"></div>
    </div>
    
    <!-- CTA -->
    <div style="text-align:center;margin-bottom:24px;">
      <a href="https://epuc-nkoabang.cm/fr/bibles" 
         style="display:inline-block;padding:12px 28px;background:linear-gradient(135deg,#C9973A,#E8B84B);color:#1C1917;font-weight:bold;font-size:14px;border-radius:12px;text-decoration:none;">
        Lire la Bible en ligne
      </a>
    </div>
    
    <!-- Horaires -->
    <div style="background:#F9F4EA;border-radius:12px;padding:16px;margin-bottom:20px;">
      <p style="font-size:11px;font-weight:bold;text-transform:uppercase;letter-spacing:1px;color:#78716C;margin:0 0 10px;">Cultes à ÉPUC Nkoabang</p>
      <p style="margin:3px 0;font-size:13px;color:#44403C;">📍 Nkoabang — Entrée École, avant le 10ème arrêt depuis Biteng</p>
      <p style="margin:3px 0;font-size:13px;color:#44403C;">🕒 Dimanche : 9h00 — Culte principal</p>
      <p style="margin:3px 0;font-size:13px;color:#44403C;">📞 +237 6 99 00 00 00</p>
    </div>
    
    <!-- Footer -->
    <p style="text-align:center;font-size:11px;color:#78716C;margin:0;">
      Vous recevez cet email car vous êtes abonné à la newsletter d'ÉPUC Nkoabang.<br>
      <a href="#" style="color:#C9973A;">Se désabonner</a>
    </p>
  </div>
</body>
</html>`;
}

export async function POST(request: Request) {
  try {
    /* Vérification sécurité basique (token admin) */
    const authHeader = request.headers.get('authorization');
    const adminToken = process.env.NEWSLETTER_SECRET || 'epuc-newsletter-2026';
    if (authHeader !== `Bearer ${adminToken}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const verse = getDailyVerse();
    const date = new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
    const html = buildEmailHtml(verse, date);

    /* Si pas de configuration SMTP, retourner le preview */
    if (!process.env.SMTP_HOST || !process.env.SMTP_USER) {
      const subscribers = await prisma.subscriber.findMany();
      return NextResponse.json({
        preview: true,
        message: `SMTP non configuré. ${subscribers.length} abonné(s) recevraient ce verset.`,
        verse,
        date,
        subscriberCount: subscribers.length,
        emailPreview: html,
      });
    }

    /* Envoi réel via Nodemailer */
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const subscribers = await prisma.subscriber.findMany();
    let sent = 0;
    for (const sub of subscribers) {
      try {
        await transporter.sendMail({
          from: `"ÉPUC Nkoabang" <${process.env.SMTP_USER}>`,
          to: sub.email,
          subject: `✝ Verset du Jour — ${date}`,
          html,
        });
        sent++;
      } catch (e) {
        console.error(`Erreur envoi à ${sub.email}:`, e);
      }
    }

    return NextResponse.json({
      success: true,
      sent,
      total: subscribers.length,
      verse,
    });
  } catch (error) {
    console.error('Newsletter error:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

/* GET — aperçu du verset du jour sans envoi */
export async function GET() {
  const verse = getDailyVerse();
  const date = new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  const subscribers = await prisma.subscriber.count();
  return NextResponse.json({ verse, date, subscribers });
}
