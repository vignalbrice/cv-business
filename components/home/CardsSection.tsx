import Link from "next/link";

const cartes = [
  {
    emoji: "🟣",
    titre: "BOOK",
    couleur:
      "bg-purple-50 border-purple-200 hover:border-purple-400 hover:shadow-purple-100",
    accent: "text-purple-700",
    description:
      "Produits digitaux, ebooks, frameworks stratégiques pour structurer ton business.",
    href: "/offres",
  },
  {
    emoji: "🔵",
    titre: "CONTENU",
    couleur:
      "bg-blue-50 border-blue-200 hover:border-blue-400 hover:shadow-blue-100",
    accent: "text-blue-700",
    description:
      "Création de contenu stratégique, storytelling, positionnement et visibilité.",
    href: "/offres#sba",
  },
  {
    emoji: "🟡",
    titre: "IA PROMPT BOSS",
    couleur:
      "bg-amber-50 border-amber-200 hover:border-amber-400 hover:shadow-amber-100",
    accent: "text-amber-700",
    description:
      "Systèmes IA, prompts stratégiques, productivité intelligente et automatisation.",
    href: "/prompt-boss",
  },
];

export default function CardsSection() {
  return (
    <section className="bg-white py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-purple-600 text-sm font-semibold uppercase tracking-widest mb-3">
            Mon univers
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900">
            Trois piliers pour ta croissance
          </h2>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {cartes.map((c, i) => (
            <Link
              href={c.href}
              key={i}
              className={`group ${c.couleur} border rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl`}
            >
              <div className="text-3xl mb-4">{c.emoji}</div>
              <h3 className={`text-lg font-black mb-3 ${c.accent}`}>
                {c.titre}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {c.description}
              </p>
              <div
                className={`mt-6 text-xs font-semibold ${c.accent} flex items-center gap-1 group-hover:gap-2 transition-all`}
              >
                En savoir plus →
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
