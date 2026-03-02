import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { getOffreById } from "@/lib/offres";

/**
 * GET /api/checkout?offreId=xxx
 * Retourne les options de versements disponibles pour une offre
 */
export async function GET(req: NextRequest) {
  const offreId = req.nextUrl.searchParams.get("offreId");
  if (!offreId) return NextResponse.json({ installmentOptions: [] });

  const offre = getOffreById(offreId);
  if (!offre || !offre.stripePriceId || offre.stripePriceId.includes("placeholder")) {
    return NextResponse.json({ installmentOptions: [] });
  }

  try {
    const price = await stripe.prices.retrieve(offre.stripePriceId, {
      expand: ["product"],
    });

    const product = price.product as { metadata?: Record<string, string> } | null;
    const metadata = product?.metadata ?? {};

    // Extraire les options de versements depuis les metadata
    const installmentOptions = Object.entries(metadata)
      .filter(([k]) => k.startsWith("installments_"))
      .map(([k, priceId]) => {
        const n = parseInt(k.replace("installments_", "").replace("x", ""));
        const unitAmount = price.unit_amount ?? 0;
        return {
          n,
          priceId,
          amountPerMonth: unitAmount / n,            // en centimes
          currency: price.currency.toUpperCase(),
        };
      })
      .sort((a, b) => a.n - b.n);

    return NextResponse.json({ installmentOptions, totalAmount: price.unit_amount ?? (offre.prix * 100) });
  } catch {
    return NextResponse.json({ installmentOptions: [] });
  }
}


export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as { offreId: string; installments?: number };
    const { offreId, installments } = body;

    if (!offreId) {
      return NextResponse.json({ error: "offreId requis" }, { status: 400 });
    }

    const offre = getOffreById(offreId);
    if (!offre) {
      return NextResponse.json({ error: "Offre introuvable" }, { status: 404 });
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    // ── Cas 1 : paiement en plusieurs fois ──────────────────────────────────
    if (installments && installments > 1 && offre.stripePriceId) {
      // Récupérer les metadata du produit Stripe pour trouver le Price ID de versement
      const price = await stripe.prices.retrieve(offre.stripePriceId, {
        expand: ["product"],
      });

      const product = price.product as { id: string; metadata?: Record<string, string> } | null;
      const installmentPriceId = product?.metadata?.[`installments_${installments}x`];

      if (!installmentPriceId) {
        return NextResponse.json(
          { error: `Option de paiement en ${installments}× non disponible pour cette offre.` },
          { status: 400 },
        );
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [{ price: installmentPriceId, quantity: 1 }],
        mode: "subscription",
        success_url: `${baseUrl}/merci?offre=${offre.slug}&mode=${installments}x`,
        cancel_url: `${baseUrl}/offres`,
        metadata: {
          offreId: offre.id,
          offreSlug: offre.slug,
          installments: String(installments),
        },
        subscription_data: {
          metadata: {
            offreId: offre.id,
            installments: String(installments),
          },
        },
      });

      return NextResponse.json({ url: session.url });
    }

    // ── Cas 2 : paiement unique classique ───────────────────────────────────
    // Utiliser le stripePriceId de l'offre si disponible, sinon price_data inline
    let lineItems: Stripe.Checkout.SessionCreateParams["line_items"];

    if (offre.stripePriceId && !offre.stripePriceId.includes("placeholder")) {
      lineItems = [{ price: offre.stripePriceId, quantity: 1 }];
    } else {
      lineItems = [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: offre.titre,
              description: offre.sousTitre,
            },
            unit_amount: offre.prix * 100,
          },
          quantity: 1,
        },
      ];
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${baseUrl}/merci?offre=${offre.slug}`,
      cancel_url: `${baseUrl}/offres`,
      metadata: {
        offreId: offre.id,
        offreSlug: offre.slug,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Erreur inconnue";
    console.error("Stripe checkout error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
