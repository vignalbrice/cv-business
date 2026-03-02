import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Paiement réussi — Bienvenue dans l'aventure !",
  description:
    "Ton paiement a bien été reçu. Tu vas recevoir un email avec tous les détails d'accès à ta formation ou ton accompagnement.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function MerciPage() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="max-w-xl mx-auto px-4 text-center">
        <div className="text-6xl mb-6">🎉</div>
        <h1 className="text-4xl font-black text-gray-900 mb-4">
          Paiement réussi !
        </h1>
        <p className="text-gray-500 text-lg mb-8 leading-relaxed">
          Félicitations pour ton investissement. Tu vas recevoir un email avec
          tous les détails d&apos;accès. Prépare-toi — on construit quelque
          chose de grand !
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="px-8 py-4 bg-linear-to-r from-purple-600 to-purple-800 text-white font-bold rounded-xl hover:from-purple-700 hover:to-purple-900 transition-all"
          >
            Retour à l&apos;accueil
          </Link>
          <Link
            href="/offres"
            className="px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all"
          >
            Voir d&apos;autres offres
          </Link>
        </div>
      </div>
    </div>
  );
}
