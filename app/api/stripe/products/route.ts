import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-02-25.clover" as Stripe.LatestApiVersion,
});

function checkAdmin(req: NextRequest) {
  const token = req.headers.get("x-admin-token");
  return token === process.env.ADMIN_SECRET_TOKEN;
}

export async function GET() {
  try {
    const products = await stripe.products.list({
      limit: 100,
      active: true,
      expand: ["data.default_price"],
    });
    return NextResponse.json({ products: products.data });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Erreur inconnue";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  if (!checkAdmin(req))
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

  try {
    const body = await req.json() as {
      name: string;
      description?: string;
      imageUrl?: string;
      prix: number;
      currency?: string;
      type?: "one_time" | "recurring";
      interval?: "month" | "year";
      installments?: number[]; // ex: [2, 3, 4] pour créer des options de paiement en plusieurs fois
    };

    const {
      name, description, imageUrl,
      prix, currency = "eur",
      type = "one_time", interval = "month",
      installments = [],
    } = body;

    if (!name || !prix)
      return NextResponse.json({ error: "Le nom et le prix sont requis." }, { status: 400 });

    const product = await stripe.products.create({
      name,
      ...(description ? { description } : {}),
      ...(imageUrl ? { images: [imageUrl] } : {}),
    });

    // Prix principal (paiement unique ou abonnement)
    const priceData: Stripe.PriceCreateParams = {
      product: product.id,
      unit_amount: Math.round(prix * 100),
      currency,
      ...(type === "recurring" ? { recurring: { interval } } : {}),
    };
    const price = await stripe.prices.create(priceData);

    // Métadonnées : stockage des Price ID des options en plusieurs fois
    const metadata: Record<string, string> = {};

    // Créer un Price par option de versement (type one_time uniquement)
    if (type === "one_time" && installments.length > 0) {
      for (const n of installments) {
        if (n < 2 || n > 24) continue;
        const installmentAmount = Math.round((prix / n) * 100);
        const installmentPrice = await stripe.prices.create({
          product: product.id,
          unit_amount: installmentAmount,
          currency,
          // Paiement récurrent mensuel pour simuler les versements
          recurring: { interval: "month", interval_count: 1 },
          nickname: `${n}x paiement — ${(installmentAmount / 100).toFixed(2)} ${currency.toUpperCase()}`,
          metadata: { installment_count: String(n), total_original: String(Math.round(prix * 100)) },
        });
        metadata[`installments_${n}x`] = installmentPrice.id;
      }
    }

    // Mettre à jour le produit avec default_price + metadata des versements
    await stripe.products.update(product.id, {
      default_price: price.id,
      ...(Object.keys(metadata).length > 0 ? { metadata } : {}),
    });

    return NextResponse.json({ product: { ...product, metadata }, price }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Erreur inconnue";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  if (!checkAdmin(req))
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

  try {
    const body = await req.json() as {
      productId: string;
      name?: string;
      description?: string;
      imageUrl?: string;
      // Gérer les options de versements : passer le tableau souhaité
      // Ex: [2, 3] = créer/conserver 2x et 3x; [] = supprimer toutes les options
      installments?: number[];
    };

    const { productId, name, description, imageUrl, installments } = body;

    if (!productId)
      return NextResponse.json({ error: "productId est requis." }, { status: 400 });

    // Récupérer le produit actuel pour lire ses métadonnées et son prix
    const currentProduct = await stripe.products.retrieve(productId, {
      expand: ["default_price"],
    });

    const updateData: Stripe.ProductUpdateParams = {};
    if (name !== undefined) updateData.name = name;
    if (description !== undefined) updateData.description = description || "";
    if (imageUrl !== undefined) {
      updateData.images = imageUrl ? [imageUrl] : [];
    }

    // Gestion des versements
    if (installments !== undefined) {
      const existingMeta = { ...(currentProduct.metadata ?? {}) } as Record<string, string>;

      // Récupérer le prix unitaire total depuis le default_price
      const defaultPrice = currentProduct.default_price as Stripe.Price | null;
      const unitAmount = defaultPrice?.unit_amount ?? 0;
      const currency = defaultPrice?.currency ?? "eur";

      // Désactiver les options de versements qui ne sont plus dans la liste
      for (const key of Object.keys(existingMeta)) {
        if (!key.startsWith("installments_")) continue;
        const n = parseInt(key.replace("installments_", "").replace("x", ""));
        if (!installments.includes(n)) {
          // Archiver le Price Stripe correspondant
          const priceId = existingMeta[key];
          try { await stripe.prices.update(priceId, { active: false }); } catch { /* ignore */ }
          delete existingMeta[key];
        }
      }

      // Créer les nouvelles options manquantes
      for (const n of installments) {
        if (n < 2 || n > 24) continue;
        const existingKey = `installments_${n}x`;
        if (existingMeta[existingKey]) continue; // déjà présent

        const installmentAmount = Math.round((unitAmount / n));
        const installmentPrice = await stripe.prices.create({
          product: productId,
          unit_amount: installmentAmount,
          currency,
          recurring: { interval: "month", interval_count: 1 },
          nickname: `${n}x paiement — ${(installmentAmount / 100).toFixed(2)} ${currency.toUpperCase()}`,
          metadata: { installment_count: String(n), total_original: String(unitAmount) },
        });
        existingMeta[existingKey] = installmentPrice.id;
      }

      updateData.metadata = existingMeta;
    }

    const product = await stripe.products.update(productId, updateData);

    return NextResponse.json({ product });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Erreur inconnue";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
