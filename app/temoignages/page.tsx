import Link from "next/link";
import type { Metadata } from "next";
import { Star } from "lucide-react";

export const metadata: Metadata = {
  title: "Témoignages — +100 Personnes Accompagnées",
  description:
    "Découvre les résultats concrets : +100 entrepreneurs accompagnés, des abonnés qualifiés, du chiffre d'affaires en hausse. Des transformations réelles grâce à la Social Boss Academy et Prompt Boss.",
  keywords: [
    "témoignages coaching IA",
    "avis Social Boss Academy",
    "résultats coaching",
    "avis Prompt Boss",
    "success stories",
    "témoignages clients",
    "preuves résultats",
    "coaching entrepreneur",
    "formation IA résultats",
  ],
  alternates: {
    canonical: "https://coach-ia-empire.fr/temoignages",
  },
  openGraph: {
    title: "Témoignages — +100 Personnes Accompagnées | CoachIA",
    description:
      "+100 entrepreneurs accompagnés avec des résultats concrets et mesurables. Découvre leurs transformations grâce à la Social Boss Academy et Prompt Boss.",
    url: "https://coach-ia-empire.fr/temoignages",
    images: [
      {
        url: "/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Témoignages CoachIA — Résultats clients",
      },
    ],
  },
};

const temoignages = [
  {
    nom: "Sarah M.",
    role: "Entrepreneureuse — Paris",
    texte:
      "Grâce à la SBA, j'ai enfin structuré mon personal branding et doublé mon engagement en 2 mois. La méthode est claire, efficace et directement applicable.",
    offre: "Social Boss Academy",
    stars: 5,
  },
  {
    nom: "Karim D.",
    role: "Créateur de contenu",
    texte:
      "Le pack Prompt Boss m'a transformé. Je produis maintenant en 1h ce qui me prenait une journée entière. L'IA n'est plus un mystère pour moi.",
    offre: "Prompt Boss",
    stars: 5,
  },
  {
    nom: "Rudy C.",
    role: "Coach bien-être",
    texte:
      "L'accompagnement SBA 1:1 a été un game changer. On a construit ensemble une offre claire, un tunnel de vente et une stratégie de contenu solide. J'ai eu énormément de retours en moins d'une semaine",
    offre: "SBA 1:1",
    stars: 5,
  },
  {
    nom: "Julie R.",
    role: "Thérapeute indépendante",
    texte:
      "Je suis passée de 0 à 500 abonnés qualifiés en 6 semaines. La clarté stratégique apportée est incomparable. Enfin un accompagnement qui donne de vrais résultats.",
    offre: "Social Boss Academy",
    stars: 5,
  },
  {
    nom: "Thomas B.",
    role: "Consultant marketing",
    texte:
      "Prompt Boss m'a donné une longueur d'avance sur mes concurrents. Les prompts sont redoutablement efficaces et la méthode est applicable immédiatement.",
    offre: "Prompt Boss",
    stars: 5,
  },
  {
    nom: "Naïma S.",
    role: "E-commerçante",
    texte:
      "Enfin une coach qui parle vrai, qui donne des outils concrets et qui pousse à l'action. Mon CA a augmenté de 40% en 3 mois.",
    offre: "SBA 1:1",
    stars: 5,
  },
];

export default function TemoignagesPage() {
  return (
    <div className="min-h-screen bg-white py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-purple-600 text-sm font-semibold uppercase tracking-widest mb-3">
            Ils témoignent
          </p>
          <h1 className="text-4xl sm:text-5xl font-black text-gray-900 mb-6">
            +100 personnes accompagnées
          </h1>
          <p className="text-gray-500 max-w-xl mx-auto text-lg">
            Des résultats concrets, mesurables et vérifiables.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-16">
          {[
            { num: "+100", label: "Personnes accompagnées" },
            { num: "98%", label: "Taux de satisfaction" },
            { num: "3", label: "Offres signature" },
            { num: "4.9★", label: "Note moyenne" },
          ].map((s, i) => (
            <div
              key={i}
              className="text-center p-6 bg-gray-50 border border-gray-200 rounded-2xl"
            >
              <p className="text-3xl font-black text-purple-600 mb-1">
                {s.num}
              </p>
              <p className="text-gray-500 text-sm">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Témoignages grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {temoignages.map((t, i) => (
            <div
              key={i}
              className="bg-white border border-gray-200 rounded-2xl p-7 hover:border-purple-300 hover:shadow-md transition-all duration-300"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.stars }).map((_, j) => (
                  <Star
                    key={j}
                    className="w-4 h-4 text-yellow-400 fill-yellow-400"
                  />
                ))}
              </div>

              {/* Texte */}
              <p className="text-gray-600 text-sm leading-relaxed mb-6 italic">
                &quot;{t.texte}&quot;
              </p>

              {/* Auteur */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-900 font-semibold text-sm">{t.nom}</p>
                  <p className="text-gray-400 text-xs">{t.role}</p>
                </div>
                <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs rounded-full border border-purple-200">
                  {t.offre}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <p className="text-gray-500 mb-6 text-lg">
            Prêt(e) à écrire ton propre témoignage ?
          </p>
          <Link
            href="/offres"
            className="inline-block px-10 py-4 bg-linear-to-r from-purple-600 to-purple-800 text-white font-bold rounded-xl hover:from-purple-700 hover:to-purple-900 transition-all duration-200 shadow-lg hover:shadow-purple-500/30"
          >
            🔥 Découvrir les offres
          </Link>
        </div>
      </div>
    </div>
  );
}
