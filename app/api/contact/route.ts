import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !message) {
      return NextResponse.json({ error: 'Champs requis manquants' }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"ÉPUC Nkoabang - Contact" <${process.env.SMTP_USER}>`,
      to: 'baalaandeguefrancoislionnel@gmail.com',
      replyTo: email || undefined,
      subject: `✉️ Nouveau message de ${name} — Site ÉPUC Nkoabang`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f9f9f9; border-radius: 12px; overflow: hidden;">
          <div style="background: linear-gradient(135deg, #C9973A, #E8B84B); padding: 24px 32px;">
            <h1 style="margin: 0; color: #1C1917; font-size: 22px; font-weight: bold;">✉️ Nouveau message via le site</h1>
            <p style="margin: 4px 0 0; color: rgba(28,25,23,0.75); font-size: 14px;">ÉPUC Nkoabang — Formulaire de contact</p>
          </div>
          <div style="padding: 32px; background: #ffffff;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; color: #666; font-size: 13px; width: 120px; vertical-align: top; font-weight: bold;">Nom :</td>
                <td style="padding: 10px 0; color: #1a1a1a; font-size: 14px;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #666; font-size: 13px; vertical-align: top; font-weight: bold;">Email :</td>
                <td style="padding: 10px 0; color: #1a1a1a; font-size: 14px;">
                  ${email ? `<a href="mailto:${email}" style="color: #C9973A;">${email}</a>` : '<em style="color: #999;">Non renseigné</em>'}
                </td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #666; font-size: 13px; vertical-align: top; font-weight: bold;">Message :</td>
                <td style="padding: 10px 0;">&nbsp;</td>
              </tr>
            </table>
            <div style="background: #f5f5f5; border-left: 4px solid #C9973A; border-radius: 6px; padding: 16px 20px; margin-top: 8px; color: #333; font-size: 14px; line-height: 1.7; white-space: pre-wrap;">${message}</div>
          </div>
          <div style="padding: 16px 32px; background: #f0f0f0; text-align: center; color: #999; font-size: 12px;">
            Ce message a été envoyé via le formulaire de contact du site epuc-nkoabang.cm
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erreur envoi email:', error);
    return NextResponse.json({ error: 'Erreur lors de l\'envoi' }, { status: 500 });
  }
}
