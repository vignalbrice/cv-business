import Link from "next/link";

const forces = [
  "Je te fais gagner du temps",
  "Je t'aide à générer plus d'argent",
  "Je t'apporte une clarté stratégique durable",
];

const profils = [
  "Entrepreneur",
  "Créateur",
  "Marque",
  "Indépendant",
  "Homme ou femme ambitieux(se)",
];

const differences = [
  {
    negatif: "❌ une formatrice réseaux",
    positif: "🔥 Architecte de croissance digitale",
  },
  {
    negatif: "❌ une vendeuse de formation",
    positif: "🔥 Stratège IA & contenu",
  },
  {
    negatif: "❌ une coach généraliste",
    positif: "🔥 Constructrice de systèmes rentables",
  },
];

export default function PositioningSection() {
  return (
    <section className="bg-gray-50 py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Colonne gauche — Positionnement */}
          <div>
            <p className="text-purple-600 text-sm font-semibold uppercase tracking-widest mb-3">
              Mon positionnement
            </p>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-6 leading-tight">
              Je suis la coach en communication digitale qui transforme
              l&apos;IA en machine à croissance.
            </h2>

            <div className="space-y-4 mb-10">
              {forces.map((f, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-purple-600 text-lg mt-0.5">👉</span>
                  <p className="text-gray-700 font-medium">{f}</p>
                </div>
              ))}
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-2xl p-6">
              <p className="text-gray-900 font-semibold mb-4 text-sm uppercase tracking-wider">
                Que tu sois :
              </p>
              <div className="flex flex-wrap gap-2">
                {profils.map((p, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 bg-purple-100 text-purple-700 text-sm rounded-full border border-purple-200"
                  >
                    {p}
                  </span>
                ))}
              </div>
              <p className="text-gray-900 font-bold mt-5 text-lg">
                Tu es au bon endroit. ✨
              </p>
            </div>
          </div>

          {/* Colonne droite — Différence */}
          <div>
            <p className="text-purple-600 text-sm font-semibold uppercase tracking-widest mb-3">
              Ma différence stratégique
            </p>
            <h2 className="text-3xl font-black text-gray-900 mb-8 leading-tight">
              Je ne suis pas comme les autres
            </h2>

            <div className="space-y-6">
              {differences.map((d, i) => (
                <div
                  key={i}
                  className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm"
                >
                  <p className="text-gray-400 text-sm mb-2 line-through">
                    {d.negatif}
                  </p>
                  <p className="text-gray-900 font-bold">{d.positif}</p>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-linear-to-r from-purple-600 to-purple-800 text-white font-bold rounded-xl hover:from-purple-700 hover:to-purple-900 transition-all duration-200 shadow-lg hover:shadow-purple-500/30 hover:-translate-y-0.5"
              >
                🤝 Je veux être accompagné
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
