import fs from "fs";
import path from "path";

export interface Offre {
  id: string;
  slug: string;
  titre: string;
  sousTitre: string;
  description: string;
  benefices: string[];
  prix: number;
  prixAffiche: string;
  badge: string;
  couleur: "violet" | "bleu" | "jaune" | "rose" | "vert";
  stripePriceId: string;
  actif: boolean;
  ordre: number;
}

const offresPath = path.join(process.cwd(), "data", "offres.json");

export function getOffres(): Offre[] {
  const raw = fs.readFileSync(offresPath, "utf-8");
  const offres: Offre[] = JSON.parse(raw);
  return offres.filter((o) => o.actif).sort((a, b) => a.ordre - b.ordre);
}

export function getAllOffres(): Offre[] {
  const raw = fs.readFileSync(offresPath, "utf-8");
  return JSON.parse(raw) as Offre[];
}

export function getOffreById(id: string): Offre | undefined {
  return getAllOffres().find((o) => o.id === id);
}

export function saveOffres(offres: Offre[]): void {
  fs.writeFileSync(offresPath, JSON.stringify(offres, null, 2), "utf-8");
}

export function updateOffre(id: string, data: Partial<Offre>): Offre {
  const offres = getAllOffres();
  const idx = offres.findIndex((o) => o.id === id);
  if (idx === -1) throw new Error(`Offre ${id} introuvable`);
  offres[idx] = { ...offres[idx], ...data };
  saveOffres(offres);
  return offres[idx];
}

export function createOffre(data: Omit<Offre, "id">): Offre {
  const offres = getAllOffres();
  const newOffre: Offre = {
    ...data,
    id: Date.now().toString(),
  };
  offres.push(newOffre);
  saveOffres(offres);
  return newOffre;
}

export function deleteOffre(id: string): void {
  const offres = getAllOffres().filter((o) => o.id !== id);
  saveOffres(offres);
}
