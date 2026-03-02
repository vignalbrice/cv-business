import Link from "next/link";
import type { Metadata } from "next";
import { CheckCircle, Crown } from "lucide-react";

export const metadata: Metadata = {
  title: "Empire Financier — Construis ta Liberté Financière",
  description:
    "Programme conçu pour les femmes ambitieuses qui veulent créer des revenus scalables, sortir de l'échange temps/argent et bâtir leur empire financier avec les produits digitaux.",
  keywords: [
    "empire financier",
    "liberté financière",
    "revenus scalables",
    "produits digitaux",
    "revenus passifs",
    "programme femme entrepreneur",
    "indépendance financière",
    "business en ligne",
    "femme business",
    "coach financier femme",
    "créer des revenus",
  ],
  alternates: {
    canonical: "https://coach-ia-empire.fr/empire-financier",
  },
  openGraph: {
    title: "Empire Financier — Construis ta Liberté Financière | CoachIA",
    description:
      "Tu es ambitieuse, tu veux créer, scaler et te libérer. Ce programme est fait pour les femmes qui veulent régner sur leur vie financière.",
    url: "https://coach-ia-empire.fr/empire-financier",
    images: [
      {
        url: "/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Empire Financier — Programme de liberté financière",
      },
    ],
  },
};

const etapes = [
  {
    num: "01",
    titre: "IDENTITÉ",
    desc: "Qui tu es, comment tu fonctionnes, ton environnement, ta vision.",
  },
  {
    num: "02",
    titre: "DIAGNOSTIC",
    desc: "Où tu en es, ce qui te bloque, ce qui te manque, ce qui doit être optimisé.",
  },
  {
    num: "03",
    titre: "CIBLE",
    desc: "Dressage du portrait de ton client idéal. À qui tu dois parler pour attirer les bonnes personnes.",
  },
  {
    num: "04",
    titre: "STRATÉGIE",
    desc: "Solutions concrètes, positionnement clair et système rentable.",
  },
];

const pour = [
  "Créer un complément de revenu durable",
  "Sortir de l'endettement",
  "Construire ta liberté financière",
  "Pouvoir te faire plaisir à toi et a tes proches",
  "Sortir de l'échange temps contre argent",
  "Structurer ta vision long terme",
];

export default function EmpireFinancierPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative py-24 overflow-hidden bg-linear-to-b from-amber-50 to-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(234,179,8,0.08),transparent)]" />
        <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-yellow-400 via-amber-500 to-yellow-400" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 border border-amber-200 rounded-full text-amber-700 text-sm font-medium mb-8">
            <Crown className="w-4 h-4" />
            Pour les femmes qui veulent régner sur leur vie financière
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-gray-900 mb-6 leading-tight">
            Je construis mon{" "}
            <span className="bg-linear-to-r from-yellow-500 via-amber-500 to-yellow-400 bg-clip-text text-transparent">
              empire financier
            </span>
          </h1>

          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-4 leading-relaxed">
            Tu es ambitieuse, tu veux créer, scaler et te libérer.
            <br /> ❌ Pas juste &quot;gagner ta vie&quot;
            <br /> ✅ Construire ton empire.
          </p>
          <p className="text-lg text-amber-600 max-w-xl mx-auto mb-10 italic font-medium">
            Ce programme est fait pour toi.
          </p>

          <Link
            href="https://stan.store/affiliates/3844684b-44f4-4079-b7a2-352e326a35a0"
            className="inline-block px-10 py-5 bg-linear-to-r from-yellow-400 to-amber-500 text-black font-black rounded-xl hover:from-yellow-500 hover:to-amber-600 transition-all duration-200 shadow-lg hover:shadow-yellow-400/40 hover:-translate-y-1 text-lg"
          >
            Je passe à l&apos;action dès maintenant
          </Link>
        </div>
      </section>

      {/* Pour qui */}
      <section className="py-16 border-t border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-black text-gray-900 mb-8">
                Ce programme est fait pour toi si tu veux :
              </h2>
              <ul className="space-y-4">
                {pour.map((p, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-amber-500 shrink-0" />
                    <span className="text-gray-700 font-medium">{p}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-10 text-center">
              <Crown className="w-16 h-16 text-amber-500 mx-auto mb-6" />
              <h3 className="text-2xl font-black text-gray-900 mb-4">
                Tu parles directement à moi ?
              </h3>
              <p className="text-gray-500 mb-8 leading-relaxed">
                Chaque accompagnement est sélectionné pour garantir des
                résultats concrets. Pas de place pour la médiocrité ici.
              </p>
              <Link
                href="/contact"
                className="inline-block px-8 py-4 bg-linear-to-r from-yellow-400 to-amber-500 text-black font-bold rounded-xl hover:from-yellow-500 hover:to-amber-600 transition-all duration-200 w-full text-center"
              >
                Je veux être accompagnée
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Les 4 étapes */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black text-gray-900 text-center mb-12">
            La méthode en 4 étapes
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {etapes.map((e, i) => (
              <div
                key={i}
                className="bg-white border border-gray-200 rounded-2xl p-8 hover:border-amber-300 hover:shadow-md transition-all duration-300"
              >
                <span className="text-5xl font-black text-amber-300 block mb-4">
                  {e.num}
                </span>
                <h3 className="text-xl font-black text-gray-900 mb-3">
                  {e.titre}
                </h3>
                <p className="text-gray-500 leading-relaxed">{e.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="py-20 border-t border-gray-200">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-black text-gray-900 mb-4">
            Prête à construire ton empire ?
          </h2>
          <p className="text-gray-500 mb-8 text-lg">
            Les places sont limitées. Les accompagnements se font sur sélection.
          </p>
          <Link
            href="https://stan.store/affiliates/3844684b-44f4-4079-b7a2-352e326a35a0"
            className="inline-block px-12 py-5 bg-linear-to-r from-yellow-400 to-amber-500 text-black font-black rounded-xl hover:from-yellow-500 hover:to-amber-600 transition-all duration-200 shadow-xl hover:shadow-yellow-400/40 hover:-translate-y-1 text-xl"
          >
            Je construis mon empire financier
          </Link>
        </div>
      </section>
    </div>
  );
}
