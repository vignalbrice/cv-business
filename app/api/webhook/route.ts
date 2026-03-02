import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Signature manquante" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Signature invalide";
    return NextResponse.json({ error: msg }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      console.log("✅ Paiement réussi:", session.id, "Offre:", session.metadata?.offreSlug);
      // TODO: envoyer email de confirmation, créer accès, etc.
      break;
    }
    case "payment_intent.payment_failed": {
      console.log("❌ Paiement échoué:", event.data.object);
      break;
    }
    default:
      console.log(`Événement non géré: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
