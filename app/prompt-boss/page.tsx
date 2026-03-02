import Link from "next/link";
import type { Metadata } from "next";
import { CheckCircle, Zap, BookOpen, Crown, Rocket, Star } from "lucide-react";

export const metadata: Metadata = {
  title: "Prompt Boss™️ — Maîtrise l'IA avec Stratégie",
  description:
    "Packs de prompts stratégiques, Masterclass intensive et coaching IA personnalisé. Produis 10x plus vite, automatise et construis des systèmes IA rentables.",
  keywords: [
    "Prompt Boss",
    "prompts IA",
    "ChatGPT prompts",
    "pack prompts business",
    "masterclass IA",
    "formation prompts",
    "automatisation IA",
    "intelligence artificielle stratégie",
    "contenu IA",
    "coach IA",
    "prompts stratégiques",
    "productivité IA",
  ],
  alternates: {
    canonical: "https://coach-ia-empire.fr/prompt-boss",
  },
  openGraph: {
    title: "Prompt Boss™️ — Maîtrise l'IA avec Stratégie | CoachIA",
    description:
      "Packs de prompts, Masterclass intensive et coaching IA personnalisé. Produis du contenu 10x plus vite et automatise ton business avec l'IA.",
    url: "https://coach-ia-empire.fr/prompt-boss",
    images: [
      {
        url: "/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Prompt Boss™️ — Maîtrise l'IA avec Stratégie",
      },
    ],
  },
};

const benefices = [
  "Structurer ta pensée avec l'IA",
  "Produire du contenu 10x plus vite",
  "Automatiser intelligemment tes tâches",
  "Utiliser l'IA avec une vraie stratégie",
  "Accéder aux meilleurs prompts stratégiques",
  "Construire des systèmes IA rentables",
];

const packs = [
  {
    icon: BookOpen,
    id: "pack-prompts-debutants",
    badge: "🔥 Idéal pour démarrer",
    titre: "Pack Prompts Débutants",
    description:
      "Les prompts essentiels pour créer du contenu rapidement et gagner du temps au quotidien.",
    prix: "29€",
    prixAlt: "/ 49€",
    couleur: "text-yellow-500",
    border: "border-yellow-200 hover:border-yellow-400",
    badgeBg: "bg-yellow-50 text-yellow-700 border-yellow-200",
    cta: "bg-linear-to-r from-yellow-400 to-amber-500 text-black hover:from-yellow-500 hover:to-amber-600",
  },
  {
    icon: Zap,
    id: "pack-prompts-business",
    badge: "🔥 Business",
    titre: "Pack Prompts Business",
    description:
      "Création de marque, storytelling, stratégie, vente, tunnel — tout ce qu'il faut pour structurer ton business avec l'IA.",
    prix: "97€",
    prixAlt: "/ 149€",
    couleur: "text-purple-600",
    border: "border-purple-200 hover:border-purple-400",
    badgeBg: "bg-purple-50 text-purple-700 border-purple-200",
    cta: "bg-linear-to-r from-purple-600 to-purple-800 text-white hover:from-purple-700 hover:to-purple-900",
  },
  {
    icon: Star,
    id: "pack-prompts-premium",
    badge: "⚡ Premium",
    titre: "Pack Prompts Premium",
    description:
      "Machine complète : contenu + vente + automatisation. Tous les prompts pour une croissance IA durable.",
    prix: "297€",
    prixAlt: null,
    couleur: "text-green-600",
    border: "border-green-200 hover:border-green-400",
    badgeBg: "bg-green-50 text-green-700 border-green-200",
    cta: "bg-linear-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700",
  },
  {
    icon: Crown,
    id: "masterclass-prompt-boss",
    badge: "👑 Masterclass",
    titre: "Masterclass Prompt Boss™️",
    description:
      "La masterclass intensive : méthode complète, cas pratiques et stratégies avancées pour maîtriser l'IA à un niveau professionnel.",
    prix: "397€",
    prixAlt: "à 697€",
    couleur: "text-pink-600",
    border: "border-pink-200 hover:border-pink-400",
    badgeBg: "bg-pink-50 text-pink-700 border-pink-200",
    cta: "bg-linear-to-r from-pink-500 to-rose-600 text-white hover:from-pink-600 hover:to-rose-700",
  },
  {
    icon: Rocket,
    id: "coaching-prompts-personnalises",
    badge: "🏆 VIP",
    titre: "Coaching + Prompts Personnalisés",
    description:
      "L'expérience la plus haut de gamme : coaching individuel + prompts créés sur-mesure pour ton activité, ton positionnement et tes objectifs.",
    prix: "997€",
    prixAlt: "à 2500€",
    couleur: "text-blue-600",
    border: "border-blue-200 hover:border-blue-400",
    badgeBg: "bg-blue-50 text-blue-700 border-blue-200",
    cta: "bg-linear-to-r from-blue-600 to-indigo-700 text-white hover:from-blue-700 hover:to-indigo-800",
  },
];

export default function PromptBossPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative py-24 overflow-hidden bg-linear-to-b from-amber-50 to-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(234,179,8,0.08),transparent)]" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 border border-amber-200 rounded-full text-amber-700 text-sm font-medium mb-8">
            🤖 IA & Productivité Intelligente
          </div>
          <h1 className="text-4xl sm:text-6xl font-black text-gray-900 mb-6 leading-tight">
            Deviens un{" "}
            <span className="bg-linear-to-r from-yellow-500 to-amber-500 bg-clip-text text-transparent">
              Prompt Boss
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            Arrête de subir l&apos;IA, commence à la maîtriser avec stratégie
            pour produire plus, mieux et plus vite.
          </p>
          <Link
            href="/offres#prompt-boss"
            className="inline-block px-10 py-4 bg-linear-to-r from-yellow-400 to-amber-500 text-black font-black rounded-xl hover:from-yellow-500 hover:to-amber-600 transition-all duration-200 shadow-lg hover:shadow-yellow-400/30 hover:-translate-y-0.5 text-lg"
          >
            🔥 Accéder à Prompt Boss
          </Link>
        </div>
      </section>

      {/* Bénéfices */}
      <section className="py-16 border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black text-gray-900 text-center mb-12">
            Ce que tu vas apprendre
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {benefices.map((b, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-4 bg-amber-50 border border-amber-200 rounded-xl"
              >
                <CheckCircle className="w-5 h-5 text-amber-600 shrink-0" />
                <span className="text-gray-800 font-medium">{b}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packs */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-amber-600 text-sm font-semibold uppercase tracking-widest mb-3">
              Choisis ton niveau
            </p>
            <h2 className="text-3xl font-black text-gray-900">
              Les offres Prompt Boss™️
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
            {packs.map((pack, i) => {
              const Icon = pack.icon;
              return (
                <div
                  key={i}
                  className={`bg-white border-2 rounded-2xl p-8 hover:-translate-y-1 transition-all duration-300 hover:shadow-lg flex flex-col ${pack.border}`}
                >
                  {/* Badge */}
                  <span
                    className={`self-start text-xs font-bold px-3 py-1 rounded-full border mb-5 ${pack.badgeBg}`}
                  >
                    {pack.badge}
                  </span>

                  <Icon className={`w-8 h-8 ${pack.couleur} mb-4`} />

                  <h3 className="text-lg font-black text-gray-900 mb-2">
                    {pack.titre}
                  </h3>
                  <p className="text-gray-500 text-sm mb-6 leading-relaxed flex-1">
                    {pack.description}
                  </p>

                  {/* Prix */}
                  <div className="flex items-baseline gap-1.5 mb-6">
                    <span className={`text-3xl font-black ${pack.couleur}`}>
                      {pack.prix}
                    </span>
                    {pack.prixAlt && (
                      <span className="text-gray-400 text-sm font-medium">
                        {pack.prixAlt}
                      </span>
                    )}
                  </div>

                  <Link
                    href={`/offres#${pack.id}`}
                    className={`block w-full py-3 text-center rounded-xl font-bold text-sm transition-all ${pack.cta}`}
                  >
                    Accéder →
                  </Link>
                </div>
              );
            })}
          </div>

          {/* Note bas de page */}
          <p className="text-center text-gray-400 text-sm mt-10">
            Un doute sur le pack qui te correspond ?{" "}
            <Link
              href="/contact"
              className="text-amber-600 underline hover:text-amber-700 font-medium"
            >
              Contacte-moi
            </Link>
            , je t&apos;oriente.
          </p>
        </div>
      </section>
    </div>
  );
}
