import Link from "next/link";
import type { Metadata } from "next";
import {
  CheckCircle,
  Clock,
  Palette,
  Smartphone,
  Search,
  Mail,
  Rocket,
  MessageSquare,
  PenTool,
  Globe,
} from "lucide-react";
import Countdown from "@/components/black-friday/Countdown";
import ReservationForm from "@/components/black-friday/ReservationForm";
import { BLACK_FRIDAY, economie, remisePourcent } from "@/lib/black-friday";

const pageUrl = "https://coach-ia-empire.fr/black-friday";

export const metadata: Metadata = {
  title: "Black Friday — Ton site vitrine clé en main en 48h",
  description: `Offre Black Friday : ton site vitrine professionnel livré clé en main en 48h pour ${BLACK_FRIDAY.prixPromo} € au lieu de ${BLACK_FRIDAY.prixNormal} €. Réservé aux ${BLACK_FRIDAY.placesTotal} premières personnes.`,
  keywords: [
    "black friday site internet",
    "site vitrine",
    "création site vitrine",
    "site clé en main",
    "site internet 48h",
    "site web entrepreneur",
    "création site pas cher",
  ],
  alternates: { canonical: pageUrl },
  openGraph: {
    title: `Black Friday — Site vitrine clé en main en 48h à ${BLACK_FRIDAY.prixPromo} €`,
    description: `${BLACK_FRIDAY.prixPromo} € au lieu de ${BLACK_FRIDAY.prixNormal} €. Uniquement pour les ${BLACK_FRIDAY.placesTotal} premières personnes.`,
    url: pageUrl,
    images: [
      {
        url: "/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Black Friday — Site vitrine clé en main en 48h",
      },
    ],
  },
};

const inclus = [
  {
    icon: Palette,
    titre: "Design sur-mesure",
    texte: "Un site à ton image : tes couleurs, ton logo, ton ton.",
  },
  {
    icon: Smartphone,
    titre: "100 % responsive",
    texte: "Parfait sur mobile, tablette et ordinateur.",
  },
  {
    icon: Mail,
    titre: "Formulaire de contact",
    texte: "Tes prospects te contactent directement depuis le site.",
  },
  {
    icon: Search,
    titre: "SEO de base",
    texte: "Titres, descriptions et structure optimisés pour Google.",
  },
  {
    icon: Globe,
    titre: "Mise en ligne incluse",
    texte: "Je m'occupe de tout, jusqu'à la publication du site.",
  },
  {
    icon: Clock,
    titre: "Livré en 48h",
    texte: "Ton site en ligne en 2 jours après réception de tes contenus.",
  },
];

const etapes = [
  {
    icon: MessageSquare,
    moment: "Jour 0",
    titre: "Brief express",
    texte:
      "Un appel de 30 min pour cerner ton activité, ta cible et le style que tu veux. Tu m'envoies tes textes, photos et logo.",
  },
  {
    icon: PenTool,
    moment: "Sous 24h",
    titre: "Création & première version",
    texte:
      "Je conçois ton site et je te présente une première version à valider.",
  },
  {
    icon: Rocket,
    moment: "Sous 48h",
    titre: "Ajustements & mise en ligne",
    texte:
      "On intègre tes retours et ton site est en ligne, prêt à accueillir tes clients.",
  },
];

const pourQui = [
  "Tu lances ton activité et tu as besoin d'être visible vite",
  "Ton site actuel est daté ou ne te ressemble plus",
  "Tu n'as ni le temps ni l'envie de te former à la technique",
  "Tu veux un site pro sans exploser ton budget",
];

const faq = [
  {
    q: "Qu'est-ce qu'un site vitrine ?",
    r: "C'est un site qui présente ton activité, tes services et tes coordonnées pour que tes prospects te trouvent et te contactent. Il ne comprend pas de boutique en ligne.",
  },
  {
    q: "Le délai de 48h commence quand ?",
    r: "Dès que j'ai reçu l'ensemble de tes contenus (textes, photos, logo) après notre appel de brief.",
  },
  {
    q: "Comment se passe la réservation ?",
    r: "Tu remplis le formulaire ci-dessous, sans paiement. Je te recontacte rapidement pour confirmer ta place et caler le brief. Les places sont attribuées dans l'ordre des demandes.",
  },
  {
    q: "Que se passe-t-il quand les 5 places sont prises ?",
    r: `L'offre se termine. Le site vitrine repasse à son tarif normal de ${BLACK_FRIDAY.prixNormal} €.`,
  },
];

const ctaClass =
  "inline-block px-10 py-4 bg-linear-to-r from-yellow-400 to-amber-500 text-black font-black rounded-xl hover:from-yellow-500 hover:to-amber-600 transition-all duration-200 shadow-lg hover:shadow-yellow-400/30 hover:-translate-y-0.5 text-lg";

export default function BlackFridayPage() {
  const { prixPromo, prixNormal, placesTotal, placesRestantes, dateFin } =
    BLACK_FRIDAY;
  const complet = placesRestantes <= 0;
  const pluriel = placesRestantes > 1 ? "s" : "";

  let bandeau = `Plus que ${placesRestantes} place${pluriel} sur ${placesTotal}`;
  if (complet) bandeau = "Offre complète";
  else if (placesRestantes === placesTotal)
    bandeau = `Réservé aux ${placesTotal} premières personnes`;

  const noteReservation = complet
    ? "Les places Black Friday sont toutes parties."
    : `⚠️ ${placesRestantes} place${pluriel} restante${pluriel}, attribuée${pluriel} dans l'ordre des demandes.`;

  return (
    <div className="min-h-screen bg-white">
      {/* Bandeau */}
      <div className="bg-amber-400 text-black text-center text-sm font-bold py-2 px-4">
        🖤 BLACK FRIDAY · -{remisePourcent}% · {bandeau}
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gray-950 text-white py-20 sm:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(124,58,237,0.35),transparent)]" />
        <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-150 h-75 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/15 rounded-full text-amber-300 text-sm font-semibold mb-8">
            <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
            Offre Black Friday · {placesTotal} places seulement
          </div>

          <h1 className="text-4xl sm:text-6xl font-black leading-tight mb-6">
            Ton site vitrine{" "}
            <span className="bg-linear-to-r from-yellow-300 to-amber-500 bg-clip-text text-transparent">
              clé en main
            </span>
            <br />
            en ligne en 48h
          </h1>

          <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">
            Un site professionnel, à ton image, qui présente ton activité et
            transforme tes visiteurs en clients. Tu m&apos;envoies tes contenus,
            je m&apos;occupe de tout.
          </p>

          {/* Prix */}
          <div className="flex items-center justify-center gap-4 mb-3">
            <span className="text-2xl sm:text-3xl text-gray-500 line-through font-bold">
              {prixNormal} €
            </span>
            <span className="text-6xl sm:text-7xl font-black text-white">
              {prixPromo} €
            </span>
          </div>
          <p className="text-amber-300 font-semibold mb-10">
            Tu économises {economie} € — uniquement pour les {placesTotal}{" "}
            premières personnes
          </p>

          <Link href="#reserver" className={ctaClass}>
            {complet ? "Voir les détails" : "🔥 Je réserve ma place"}
          </Link>

          {/* Jauge places */}
          <div className="max-w-sm mx-auto mt-10">
            <div className="flex justify-between text-xs text-gray-400 mb-2">
              <span>Places réservées</span>
              <span className="font-semibold text-white">
                {placesTotal - placesRestantes} / {placesTotal}
              </span>
            </div>
            <div className="flex gap-1.5">
              {Array.from({ length: placesTotal }, (_, i) => (
                <div
                  key={i}
                  className={`h-2 flex-1 rounded-full ${
                    i < placesTotal - placesRestantes
                      ? "bg-amber-400"
                      : "bg-white/10"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="mt-12">
            <p className="text-xs uppercase tracking-widest text-gray-400 mb-4">
              Fin de l&apos;offre dans
            </p>
            <Countdown dateFin={dateFin} />
          </div>
        </div>
      </section>

      {/* Ce qui est inclus */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-purple-600 text-sm font-semibold uppercase tracking-widest mb-3">
              Tout compris
            </p>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900">
              Ce que tu obtiens pour {prixPromo} €
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {inclus.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.titre}
                  className="p-6 bg-gray-50 border border-gray-200 rounded-2xl hover:border-purple-300 hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
                >
                  <div className="w-11 h-11 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-purple-600" />
                  </div>
                  <h3 className="font-black text-gray-900 mb-1.5">
                    {item.titre}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {item.texte}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Comment ça marche */}
      <section className="py-20 bg-purple-50/60 border-y border-purple-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-purple-600 text-sm font-semibold uppercase tracking-widest mb-3">
              Comment ça marche
            </p>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900">
              De l&apos;idée au site en ligne en 48h
            </h2>
          </div>
          <ol className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {etapes.map((etape, i) => {
              const Icon = etape.icon;
              return (
                <li
                  key={etape.titre}
                  className="relative bg-white border border-purple-100 rounded-2xl p-6 shadow-sm"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-9 h-9 rounded-full bg-linear-to-br from-purple-600 to-purple-800 text-white font-black flex items-center justify-center text-sm">
                      {i + 1}
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-600">
                      {etape.moment}
                    </span>
                  </div>
                  <Icon className="w-6 h-6 text-purple-600 mb-3" />
                  <h3 className="font-black text-gray-900 mb-2">
                    {etape.titre}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {etape.texte}
                  </p>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* Pour qui */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 text-center mb-12">
            Cette offre est faite pour toi si…
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {pourQui.map((p) => (
              <div
                key={p}
                className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-xl"
              >
                <CheckCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <span className="text-gray-800 font-medium">{p}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Réservation */}
      <section
        id="reserver"
        className="relative py-20 bg-gray-950 scroll-mt-16 overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_100%,rgba(245,158,11,0.15),transparent)]" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
          {/* Récap offre */}
          <div className="lg:col-span-2 text-white">
            <p className="text-amber-300 text-sm font-semibold uppercase tracking-widest mb-3">
              Réservation
            </p>
            <h2 className="text-3xl sm:text-4xl font-black mb-6">
              Réserve ta place avant qu&apos;il ne soit trop tard
            </h2>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6">
              <p className="text-sm text-gray-400 mb-1">
                Site vitrine clé en main · 48h
              </p>
              <div className="flex items-baseline gap-3 mb-4">
                <span className="text-5xl font-black">{prixPromo} €</span>
                <span className="text-xl text-gray-500 line-through">
                  {prixNormal} €
                </span>
              </div>
              <ul className="space-y-2 text-sm text-gray-300">
                {inclus.map((item) => (
                  <li key={item.titre} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-amber-400 shrink-0" />
                    {item.titre}
                  </li>
                ))}
              </ul>
            </div>
            <p className="text-sm text-gray-400">{noteReservation}</p>
          </div>

          {/* Formulaire */}
          <div className="lg:col-span-3">
            {complet ? (
              <div className="bg-white rounded-2xl p-10 text-center shadow-xl">
                <div className="text-5xl mb-4">🖤</div>
                <h3 className="text-2xl font-black text-gray-900 mb-3">
                  Offre complète
                </h3>
                <p className="text-gray-500 mb-6">
                  Les {placesTotal} places Black Friday ont trouvé preneur. Tu
                  veux quand même ton site vitrine ? Écris-moi.
                </p>
                <Link
                  href="/contact"
                  className="inline-block px-8 py-3 bg-linear-to-r from-purple-600 to-purple-800 text-white font-bold rounded-xl hover:from-purple-700 hover:to-purple-900 transition-all"
                >
                  Me contacter
                </Link>
              </div>
            ) : (
              <ReservationForm />
            )}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black text-gray-900 text-center mb-10">
            Questions fréquentes
          </h2>
          <div className="space-y-3">
            {faq.map((item) => (
              <details
                key={item.q}
                className="group bg-gray-50 border border-gray-200 rounded-xl p-5 open:border-purple-300"
              >
                <summary className="flex justify-between items-center cursor-pointer list-none font-bold text-gray-900">
                  {item.q}
                  <span className="text-purple-600 text-xl transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-gray-600 text-sm leading-relaxed">
                  {item.r}
                </p>
              </details>
            ))}
          </div>

          {!complet && (
            <div className="text-center mt-12">
              <Link href="#reserver" className={ctaClass}>
                🔥 Je réserve ma place à {prixPromo} €
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
