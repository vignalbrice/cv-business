import Link from "next/link";

const ctaButtons = [
  {
    label: "🔥 Masterclass SBA",
    href: "/offres#sba",
    variant: "primary",
  },
  {
    label: "🔥 Masterclass PROMPT BOSS",
    href: "/prompt-boss",
    variant: "primary",
  },
  {
    label: "🔥 SBA 1:1 — Accompagnement sur mesure",
    href: "/offres#sba-1to1",
    variant: "primary",
  },
  {
    label: "👑 Je construis mon empire financier",
    href: "/empire-financier",
    variant: "gold",
  },
  {
    label: "🤝 Je veux être accompagné",
    href: "/contact",
    variant: "outline",
  },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-linear-to-b from-purple-50 to-white">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(120,40,200,0.08),transparent)]" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03]" />

      {/* Glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-200/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-100/60 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-24">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 border border-purple-200 rounded-full text-purple-700 text-sm font-medium mb-8">
          <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
          Architecte de croissance digitale · Stratège IA & Contenu
        </div>

        {/* Titre principal */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 leading-tight mb-6">
          Je transforme l&apos;IA en{" "}
          <span className="bg-linear-to-r from-purple-600 via-purple-500 to-amber-500 bg-clip-text text-transparent">
            machine à croissance
          </span>{" "}
          pour les marques et entrepreneurs ambitieux.
        </h1>

        {/* Sous-titre */}
        <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mb-12 leading-relaxed">
          Je te fais gagner du temps, de l&apos;argent et de la clarté grâce à
          l&apos;IA, la stratégie et un positionnement puissant.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center items-center">
          {ctaButtons.map((btn) => (
            <Link
              key={btn.href}
              href={btn.href}
              className={`
                px-6 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 hover:-translate-y-0.5
                ${
                  btn.variant === "primary"
                    ? "bg-linear-to-r from-purple-600 to-purple-800 text-white shadow-lg hover:shadow-purple-500/30 hover:from-purple-700 hover:to-purple-900"
                    : btn.variant === "gold"
                      ? "bg-linear-to-r from-yellow-400 to-amber-500 text-black shadow-lg hover:shadow-yellow-400/30 hover:from-yellow-500 hover:to-amber-600"
                      : "border-2 border-purple-600 text-purple-700 hover:bg-purple-50 hover:border-purple-700"
                }
              `}
            >
              {btn.label}
            </Link>
          ))}
        </div>

        {/* Scroll indicator */}
        <div className="mt-16 flex flex-col items-center gap-2 text-gray-400 text-xs">
          <span>Découvrir</span>
          <div className="w-px h-8 bg-linear-to-b from-gray-400 to-transparent" />
        </div>
      </div>
    </section>
  );
}
