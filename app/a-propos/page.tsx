import Link from "next/link";
import type { Metadata } from "next";
import { Clock, TrendingUp, Lightbulb, Crown } from "lucide-react";
import Image from "next/image";

export const metadata: Metadata = {
  title: "À propos — Cassandra Vignal, Stratège IA & Contenu",
  description:
    "Maman de 4 filles, entrepreneuse et femme de foi. Cassandra Vignal aide les marques et entrepreneurs ambitieux à transformer l'IA en levier de croissance durable.",
  keywords: [
    "Cassandra Vignal",
    "coach IA",
    "stratège digitale",
    "entrepreneur femme",
    "croissance digitale",
    "personal branding",
    "architecte de croissance",
    "coach contenu IA",
  ],
  alternates: {
    canonical: "https://coach-ia-empire.fr/a-propos",
  },
  openGraph: {
    title: "À propos — Cassandra Vignal, Stratège IA & Contenu",
    description:
      "Maman, entrepreneuse, femme de foi, stratège digitale. Cassandra Vignal transforme l'IA en levier de croissance pour les marques et entrepreneurs ambitieux.",
    url: "https://coach-ia-empire.fr/a-propos",
    images: [
      {
        url: "/profile.jpeg",
        width: 800,
        height: 800,
        alt: "Cassandra Vignal — Stratège IA & Contenu",
      },
    ],
  },
};

const forces = [
  {
    icon: Clock,
    titre: "Je te fais gagner du temps",
    desc: "Des systèmes clairs, des outils bien configurés. Fini le temps perdu à improviser.",
  },
  {
    icon: TrendingUp,
    titre: "Je t'aide à générer plus",
    desc: "Des stratégies concrètes pensées pour produire des résultats mesurables.",
  },
  {
    icon: Lightbulb,
    titre: "Je t'apporte de la clarté",
    desc: "Une vision stratégique durable, pas des conseils génériques.",
  },
  {
    icon: Crown,
    titre: "J'adapte tout à ton profil",
    desc: "Je dresse ton portrait, comprends ton fonctionnement, structure ton message.",
  },
];

export default function AProposPage() {
  return (
    <div className="min-h-screen bg-white py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── HERO ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-28">
          <div>
            <p className="text-purple-600 text-sm font-semibold uppercase tracking-widest mb-4">
              À propos
            </p>
            <h1 className="text-4xl sm:text-5xl font-black text-gray-900 mb-6 leading-tight">
              Cassandra Vignal
            </h1>
            <div className="flex flex-wrap gap-2 mb-8">
              {[
                "🤍 Maman de quatre filles",
                "✊ Entrepreneuse",
                "🙏 Femme de foi",
                "🧠 Stratège digitale",
              ].map((tag, i) => (
                <span
                  key={i}
                  className="px-4 py-2 bg-purple-50 border border-purple-200 text-purple-700 text-sm rounded-full font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
            <p className="text-gray-800 text-lg font-semibold leading-relaxed mb-4">
              Mais avant tout, je suis une femme qui a décidé de ne plus subir.
            </p>
            <p className="text-gray-500 leading-relaxed">
              Il y a eu une période où j&apos;ai compris une chose essentielle :
              personne ne viendrait structurer ma vie à ma place. Alors
              j&apos;ai appris, je me suis formée, je me suis disciplinée,
              j&apos;ai observé, testé, optimisé.
            </p>
          </div>

          {/* Photo */}
          <div className="relative">
            <div className="aspect-square bg-linear-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-3xl overflow-hidden relative">
              <Image
                src="/profile.jpeg"
                alt="Photo de Cassandra Vignal"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 bg-yellow-400 text-black font-black px-5 py-3 rounded-2xl text-sm shadow-xl">
              +100 personnes accompagnées
            </div>
          </div>
        </div>

        {/* ── CITATION CENTRALE ── */}
        <div className="mb-28 text-center px-4">
          <p className="text-xl sm:text-2xl font-black text-gray-900 leading-snug max-w-3xl mx-auto">
            &ldquo;Le digital n&apos;est pas une question de chance. C&apos;est
            une question de{" "}
            <span className="bg-linear-to-r from-purple-600 to-amber-500 bg-clip-text text-transparent">
              clarté, de stratégie et de système.
            </span>
            &rdquo;
          </p>
        </div>

        {/* ── MA FORCE ── */}
        <div className="mb-28">
          <div className="text-center mb-12">
            <p className="text-purple-600 text-sm font-semibold uppercase tracking-widest mb-3">
              Aujourd&apos;hui
            </p>
            <h2 className="text-3xl font-black text-gray-900 mb-4">
              Ce que je fais pour toi
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Je suis ta coach en communication digitale qui transforme
              l&apos;IA en machine à croissance pour les marques et les
              entrepreneurs ambitieux.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {forces.map((f, i) => {
              const Icon = f.icon;
              return (
                <div
                  key={i}
                  className="p-6 bg-white border border-gray-200 rounded-2xl hover:border-purple-300 hover:shadow-md transition-all duration-300 text-center group"
                >
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-200 transition-colors">
                    <Icon className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="text-gray-900 font-bold mb-2 text-sm">
                    {f.titre}
                  </h3>
                  <p className="text-gray-500 text-xs leading-relaxed">
                    {f.desc}
                  </p>
                </div>
              );
            })}
          </div>
          <p className="text-center text-gray-500 text-sm mt-8 italic">
            Parce qu&apos;un business qui fonctionne ne repose pas sur la
            motivation — il repose sur une structure.
          </p>
        </div>

        {/* ── CE QUI ME DIFFÉRENCIE ── */}
        <div className="mb-28 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <p className="text-purple-600 text-sm font-semibold uppercase tracking-widest mb-3">
              Mon approche
            </p>
            <h2 className="text-3xl font-black text-gray-900 mb-6">
              Ce qui me différencie
            </h2>
            <p className="text-gray-500 leading-relaxed mb-6">
              Je ne te donne pas des conseils génériques.
            </p>
            <div className="space-y-3">
              {[
                "Je dresse ton portrait",
                "Je comprends ton fonctionnement",
                "J'analyse ta situation réelle",
                "Je structure ton message",
                "Je définis ton positionnement",
                "Je mets en place des solutions concrètes",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-xs font-black shrink-0">
                    ✓
                  </span>
                  <p className="text-gray-700 font-medium text-sm">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-3xl p-8">
            <h3 className="text-gray-900 font-black mb-6">Je combine</h3>
            <div className="flex flex-wrap gap-3">
              {[
                "🗣️ Communication digitale",
                "📖 Storytelling stratégique",
                "🤖 IA & prompts intelligents",
                "🧠 Organisation mentale",
                "🏋️ Discipline",
                "🔭 Vision long terme",
              ].map((item, i) => (
                <span
                  key={i}
                  className="px-4 py-2 bg-white border border-purple-200 text-gray-700 text-sm rounded-full font-medium shadow-sm"
                >
                  {item}
                </span>
              ))}
            </div>
            <p className="text-gray-500 text-sm mt-6 italic">
              Et j&apos;adapte tout à ton profil.
            </p>
          </div>
        </div>

        {/* ── MA VISION ── */}
        <div className="mb-28 p-10 bg-linear-to-br from-purple-600 to-purple-800 rounded-3xl text-white text-center">
          <p className="text-purple-200 text-sm font-semibold uppercase tracking-widest mb-4">
            Ma vision
          </p>
          <h2 className="text-2xl sm:text-3xl font-black mb-6 leading-snug">
            L&apos;IA comme accélérateur.
            <br />
            La stratégie comme fondation.
          </h2>
          <p className="text-purple-100 leading-relaxed max-w-2xl mx-auto text-sm">
            Je crois profondément que nous vivons dans une ère où l&apos;IA peut
            devenir un accélérateur incroyable — mais seulement si elle est
            utilisée avec stratégie. Mon rôle n&apos;est pas de te noyer dans la
            technologie, mon rôle est de transformer l&apos;IA en levier de
            croissance intelligent et rentable pour ton activité.
          </p>
        </div>

        {/* ── MISSION EMPIRE FINANCIER ── */}
        <div className="mb-28 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="bg-yellow-50 border border-yellow-200 rounded-3xl p-8">
            <div className="text-4xl mb-4">👑</div>
            <h3 className="text-gray-900 font-black text-xl mb-4">
              La liberté de choisir
            </h3>
            <div className="space-y-2">
              {[
                "La liberté de choisir",
                "La liberté d'organiser son temps",
                "La liberté de construire un héritage",
              ].map((item, i) => (
                <p
                  key={i}
                  className="text-gray-600 text-sm flex items-center gap-2"
                >
                  <span className="text-amber-500 font-bold">→</span> {item}
                </p>
              ))}
            </div>
          </div>
          <div>
            <p className="text-purple-600 text-sm font-semibold uppercase tracking-widest mb-3">
              Une mission en parallèle
            </p>
            <h2 className="text-3xl font-black text-gray-900 mb-4">
              L&apos;empire financier au féminin
            </h2>
            <p className="text-gray-500 leading-relaxed">
              J&apos;aide aussi les femmes qui souhaitent construire leur empire
              financier grâce aux produits digitaux. Parce que je sais ce que
              représente la liberté — et je veux qu&apos;elles y accèdent elles
              aussi.
            </p>
          </div>
        </div>

        {/* ── MON APPROCHE ── */}
        <div className="mb-28 text-center">
          <p className="text-purple-600 text-sm font-semibold uppercase tracking-widest mb-4">
            En résumé
          </p>
          <h2 className="text-3xl font-black text-gray-900 mb-10">
            Mon approche
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
            {[
              {
                mot: "Clarté",
                desc: "Je travaille dans le concret, pas dans le flou.",
              },
              {
                mot: "Structure",
                desc: "Chaque action a une place dans un système cohérent.",
              },
              {
                mot: "Action",
                desc: "On ne reste pas dans la théorie. On passe au terrain.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="p-6 bg-white border border-gray-200 rounded-2xl hover:border-purple-300 hover:shadow-sm transition-all"
              >
                <p className="text-2xl font-black text-purple-600 mb-2">
                  {item.mot}
                </p>
                <p className="text-gray-500 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── CTA FINAL ── */}
        <div className="text-center bg-gray-50 border border-gray-200 rounded-3xl py-16 px-8">
          <p className="text-gray-500 text-sm mb-4 uppercase tracking-widest font-semibold">
            Si tu veux avancer avec stratégie…
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">
            Tu es au bon endroit.
            <br />
            <span className="bg-linear-to-r from-purple-600 to-amber-500 bg-clip-text text-transparent">
              Bienvenue. 👑
            </span>
          </h2>
          <p className="text-gray-500 mb-8 max-w-md mx-auto text-sm leading-relaxed">
            Si tu veux structurer ton business, arrêter de fonctionner à
            l&apos;approximation et avancer avec une vraie stratégie…
          </p>
          <Link
            href="/contact"
            className="inline-block px-10 py-4 bg-linear-to-r from-purple-600 to-purple-800 text-white font-bold rounded-xl hover:from-purple-700 hover:to-purple-900 transition-all duration-200 shadow-lg hover:shadow-purple-500/30"
          >
            🤝 Travaillons ensemble
          </Link>
        </div>
      </div>
    </div>
  );
}
