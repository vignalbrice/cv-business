import { NextRequest, NextResponse } from "next/server";
import { getAllOffres, updateOffre, createOffre, deleteOffre } from "@/lib/offres";

// Clé admin simple (en production, utiliser NextAuth ou similaire)
function isAdmin(req: NextRequest) {
  const token = req.headers.get("x-admin-token");
  return token === process.env.ADMIN_SECRET_TOKEN;
}

export async function GET() {
  const offres = getAllOffres();
  return NextResponse.json(offres);
}

export async function POST(req: NextRequest) {
  if (!isAdmin(req)) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }
  try {
    const data = await req.json();
    const offre = createOffre(data);
    return NextResponse.json(offre, { status: 201 });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Erreur";
    return NextResponse.json({ error: msg }, { status: 400 });
  }
}

export async function PUT(req: NextRequest) {
  if (!isAdmin(req)) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }
  try {
    const { id, ...data } = await req.json();
    const offre = updateOffre(id, data);
    return NextResponse.json(offre);
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Erreur";
    return NextResponse.json({ error: msg }, { status: 400 });
  }
}

export async function DELETE(req: NextRequest) {
  if (!isAdmin(req)) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }
  try {
    const { id } = await req.json();
    deleteOffre(id);
    return NextResponse.json({ success: true });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Erreur";
    return NextResponse.json({ error: msg }, { status: 400 });
  }
}
