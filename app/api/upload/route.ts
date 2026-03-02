import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-02-25.clover" as Stripe.LatestApiVersion,
});

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const MAX_SIZE_BYTES = 5 * 1024 * 1024; // 5 Mo

function checkAdmin(req: NextRequest) {
  const token = req.headers.get("x-admin-token");
  return token === process.env.ADMIN_SECRET_TOKEN;
}

export async function POST(req: NextRequest) {
  if (!checkAdmin(req)) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "Aucun fichier reçu." }, { status: 400 });
    }

    // Validation type MIME
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: "Type de fichier non autorisé. Acceptés : JPG, PNG, WebP, GIF." },
        { status: 400 },
      );
    }

    // Validation taille (512 KB max pour business_logo Stripe)
    const STRIPE_MAX = 512 * 1024;
    if (file.size > MAX_SIZE_BYTES) {
      return NextResponse.json(
        { error: "Fichier trop volumineux. Taille maximale : 5 Mo." },
        { status: 400 },
      );
    }

    // Générer un nom de fichier unique
    const ext = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
    const timestamp = Date.now();
    const safeName = file.name
      .replace(/\.[^.]+$/, "")
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "-")
      .replace(/-+/g, "-")
      .slice(0, 40);
    const filename = `${safeName}-${timestamp}.${ext}`;

    // Sauvegarder localement pour le preview immédiat
    const uploadDir = path.join(process.cwd(), "public", "uploads", "products");
    await mkdir(uploadDir, { recursive: true });
    const buffer = Buffer.from(await file.arrayBuffer());
    await writeFile(path.join(uploadDir, filename), buffer);

    // URL locale pour l'affichage dans l'admin
    const localUrl = `/uploads/products/${filename}`;

    // ── Upload vers Stripe Files ──
    // purpose "business_logo" : PNG/JPEG/GIF, max 512KB, URL publique via file_link
    let stripeUrl: string | null = null;
    try {
      const stripeFile = await stripe.files.create({
        purpose: "business_logo",
        file: {
          data: buffer,
          name: filename,
          type: file.type as "image/jpeg" | "image/png" | "image/gif",
        },
      } as Parameters<typeof stripe.files.create>[0]);

      // Créer un file_link pour obtenir une URL publique permanente
      const fileLink = await stripe.fileLinks.create({
        file: stripeFile.id,
      });

      stripeUrl = fileLink.url ?? null;
    } catch (stripeErr) {
      // Si l'image dépasse 512KB, on avertit mais on ne bloque pas
      const msg = stripeErr instanceof Error ? stripeErr.message : "";
      if (file.size > STRIPE_MAX) {
        console.warn(`Upload Stripe ignoré (${file.size} octets > 512KB) : ${msg}`);
      } else {
        console.error("Stripe file upload error:", msg);
      }
    }

    return NextResponse.json({
      url: localUrl,
      stripeUrl,          // URL publique Stripe (injectable dans product.images[])
      filename,
      stripeUploaded: !!stripeUrl,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Erreur inconnue";
    console.error("Upload error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
