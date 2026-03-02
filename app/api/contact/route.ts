import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

const resend = new Resend(process.env.RESEND_API_KEY);

const DESTINATAIRE = process.env.CONTACT_EMAIL ?? "cvbusiness.ia@gmail.com";
const FROM = process.env.CONTACT_FROM ?? "CoachIA <contact@coach-ia-empire.fr>";

const contactSchema = z.object({
  nom: z.string().min(2),
  email: z.string().email(),
  telephone: z.string().optional(),
  projet: z.enum(["sba", "sba-1to1", "prompt-boss", "empire", "autre"]),
  message: z.string().min(20),
});

const PROJET_LABELS: Record<string, string> = {
  sba: "Social Boss Academy",
  "sba-1to1": "SBA 1:1 — Accompagnement sur mesure",
  "prompt-boss": "Prompt Boss",
  empire: "Empire financier",
  autre: "Autre",
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Données invalides", details: result.error.flatten() },
        { status: 400 },
      );
    }

    const { nom, email, telephone, projet, message } = result.data;
    const projetLabel = PROJET_LABELS[projet] ?? projet;

    // Email de notification à l'admin
    await resend.emails.send({
      from: FROM,
      to: DESTINATAIRE,
      replyTo: email,
      subject: `📩 Nouvelle demande de contact — ${projetLabel}`,
      html: `
        <!DOCTYPE html>
        <html lang="fr">
        <head><meta charset="UTF-8" /></head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #f9fafb; margin: 0; padding: 24px;">
          <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; border: 1px solid #e5e7eb; overflow: hidden;">
            
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #7c3aed, #5b21b6); padding: 32px 40px;">
              <p style="color: #c4b5fd; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; margin: 0 0 8px;">CoachIA Empire</p>
              <h1 style="color: #ffffff; font-size: 22px; font-weight: 800; margin: 0;">
                📩 Nouvelle demande de contact
              </h1>
            </div>

            <!-- Body -->
            <div style="padding: 32px 40px;">
              
              <!-- Projet badge -->
              <div style="background: #f3e8ff; border: 1px solid #d8b4fe; border-radius: 10px; padding: 12px 16px; margin-bottom: 28px; display: inline-block;">
                <span style="color: #6d28d9; font-weight: 700; font-size: 14px;">🎯 ${projetLabel}</span>
              </div>

              <!-- Infos contact -->
              <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; width: 130px;">
                    <span style="font-size: 12px; text-transform: uppercase; color: #9ca3af; letter-spacing: 0.05em;">Nom</span>
                  </td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6;">
                    <span style="font-size: 15px; color: #111827; font-weight: 600;">${nom}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6;">
                    <span style="font-size: 12px; text-transform: uppercase; color: #9ca3af; letter-spacing: 0.05em;">Email</span>
                  </td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6;">
                    <a href="mailto:${email}" style="font-size: 15px; color: #7c3aed; text-decoration: none; font-weight: 600;">${email}</a>
                  </td>
                </tr>
                ${telephone
          ? `<tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6;">
                    <span style="font-size: 12px; text-transform: uppercase; color: #9ca3af; letter-spacing: 0.05em;">Téléphone</span>
                  </td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6;">
                    <a href="tel:${telephone}" style="font-size: 15px; color: #111827; font-weight: 600;">${telephone}</a>
                  </td>
                </tr>`
          : ""
        }
              </table>

              <!-- Message -->
              <div style="background: #f9fafb; border-left: 3px solid #7c3aed; border-radius: 0 8px 8px 0; padding: 16px 20px; margin-bottom: 28px;">
                <p style="font-size: 12px; text-transform: uppercase; color: #9ca3af; letter-spacing: 0.05em; margin: 0 0 10px;">Message</p>
                <p style="font-size: 15px; color: #374151; line-height: 1.7; margin: 0; white-space: pre-wrap;">${message}</p>
              </div>

              <!-- CTA répondre -->
              <a href="mailto:${email}?subject=Re: Votre demande — ${projetLabel}" style="display: inline-block; background: linear-gradient(135deg, #7c3aed, #5b21b6); color: #ffffff; font-weight: 700; font-size: 14px; padding: 12px 24px; border-radius: 10px; text-decoration: none;">
                ↩ Répondre à ${nom}
              </a>
            </div>

            <!-- Footer -->
            <div style="background: #f9fafb; border-top: 1px solid #e5e7eb; padding: 16px 40px; text-align: center;">
              <p style="font-size: 12px; color: #9ca3af; margin: 0;">
                CoachIA Empire — coach-ia-empire.fr
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    // Email de confirmation au visiteur
    await resend.emails.send({
      from: FROM,
      to: email,
      subject: "✅ Demande bien reçue — CoachIA Empire",
      html: `
        <!DOCTYPE html>
        <html lang="fr">
        <head><meta charset="UTF-8" /></head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #f9fafb; margin: 0; padding: 24px;">
          <div style="max-width: 560px; margin: 0 auto; background: #ffffff; border-radius: 16px; border: 1px solid #e5e7eb; overflow: hidden;">
            
            <div style="background: linear-gradient(135deg, #7c3aed, #5b21b6); padding: 32px 40px; text-align: center;">
              <h1 style="color: #ffffff; font-size: 24px; font-weight: 800; margin: 0;">
                ✅ Demande bien reçue !
              </h1>
            </div>

            <div style="padding: 32px 40px;">
              <p style="font-size: 16px; color: #374151; line-height: 1.6; margin: 0 0 16px;">
                Bonjour <strong>${nom}</strong>,
              </p>
              <p style="font-size: 15px; color: #6b7280; line-height: 1.7; margin: 0 0 16px;">
                J'ai bien reçu ta demande concernant <strong style="color: #7c3aed;">${projetLabel}</strong>. 
                Je l'analyse personnellement et je reviendrai vers toi <strong>sous 48h</strong>.
              </p>
              <p style="font-size: 15px; color: #6b7280; line-height: 1.7; margin: 0 0 28px;">
                En attendant, tu peux me contacter directement au <a href="tel:+33759505759" style="color: #7c3aed; font-weight: 600;">07 59 50 57 59</a>.
              </p>

              <div style="background: #f3e8ff; border-radius: 12px; padding: 20px 24px; margin-bottom: 28px;">
                <p style="font-size: 14px; color: #5b21b6; font-weight: 700; margin: 0 0 8px;">📌 Récapitulatif</p>
                <p style="font-size: 13px; color: #6d28d9; margin: 4px 0;">Projet : ${projetLabel}</p>
                <p style="font-size: 13px; color: #6d28d9; margin: 4px 0;">Email : ${email}</p>
                ${telephone ? `<p style="font-size: 13px; color: #6d28d9; margin: 4px 0;">Téléphone : ${telephone}</p>` : ""}
              </div>

              <p style="font-size: 14px; color: #9ca3af; margin: 0;">
                À très vite,<br />
                <strong style="color: #374151;">CoachIA Empire</strong>
              </p>
            </div>

            <div style="background: #f9fafb; border-top: 1px solid #e5e7eb; padding: 16px 40px; text-align: center;">
              <p style="font-size: 12px; color: #9ca3af; margin: 0;">
                coach-ia-empire.fr
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[Contact API]", error);
    return NextResponse.json(
      { error: "Erreur lors de l'envoi. Réessaie dans un instant." },
      { status: 500 },
    );
  }
}
