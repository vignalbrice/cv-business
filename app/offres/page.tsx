import type { Metadata } from "next";
import { getOffres } from "@/lib/offres";
import OffreCard from "@/components/offres/OffreCard";

export const metadata: Metadata = {
  title: "Offres — Formations & Accompagnements IA",
  description:
    "Social Boss Academy, SBA 1:1 et Prompt Boss™️ : choisis ton niveau d'accélération. Des formations et coachings IA conçus pour générer des résultats mesurables.",
  keywords: [
    "Social Boss Academy",
    "SBA 1:1",
    "Prompt Boss",
    "formation IA",
    "coaching business",
    "accompagnement stratégique",
    "offre coaching",
    "croissance digitale",
    "entrepreneur",
    "personal branding IA",
  ],
  alternates: {
    canonical: "https://coach-ia-empire.fr/offres",
  },
  openGraph: {
    title: "Offres — Formations & Accompagnements IA | CoachIA",
    description:
      "Social Boss Academy, SBA 1:1 et Prompt Boss™️ : 3 niveaux d'accélération pour transformer ton business avec l'IA.",
    url: "https://coach-ia-empire.fr/offres",
    images: [
      {
        url: "/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Offres CoachIA — Formations & Accompagnements",
      },
    ],
  },
};

export default function OffresPage() {
  const offres = getOffres();

  return (
    <div className="min-h-screen bg-white py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-purple-600 text-sm font-semibold uppercase tracking-widest mb-3">
            Mes offres
          </p>
          <h1 className="text-4xl sm:text-5xl font-black text-gray-900 mb-6">
            Choisis ton niveau d&apos;accélération
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg leading-relaxed">
            Chaque offre est conçue pour un besoin précis. Sélectionne celle qui
            correspond à ta situation et à tes ambitions.
          </p>
        </div>

        {/* Grid offres */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {offres.map((offre) => (
            <OffreCard key={offre.id} offre={offre} />
          ))}
        </div>

        {/* CTA bas de page */}
        <div className="text-center mt-16 p-10 bg-gray-50 border border-gray-200 rounded-2xl">
          <h2 className="text-2xl font-black text-gray-900 mb-3">
            Tu ne sais pas laquelle choisir ?
          </h2>
          <p className="text-gray-500 mb-6">
            Prends rendez-vous pour un échange de 15 min et je t&apos;oriente.
          </p>
          <a
            href="/contact"
            className="inline-block px-8 py-4 bg-linear-to-r from-purple-600 to-purple-800 text-white font-bold rounded-xl hover:from-purple-700 hover:to-purple-900 transition-all duration-200 shadow-lg hover:shadow-purple-500/30"
          >
            🤝 Me contacter
          </a>
        </div>
      </div>
    </div>
  );
}
