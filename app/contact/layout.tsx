import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact — Prends rendez-vous avec Cassandra Vignal",
  description:
    "Tu veux être accompagné(e) ? Contacte Cassandra Vignal pour un échange stratégique de 15 min. Accompagnements sur sélection pour garantir des résultats concrets.",
  keywords: [
    "contact coach IA",
    "prendre rendez-vous coaching",
    "accompagnement stratégique",
    "Cassandra Vignal contact",
    "coaching sur sélection",
    "échange stratégique",
    "coach digital",
  ],
  alternates: {
    canonical: "https://coach-ia-empire.fr/contact",
  },
  openGraph: {
    title: "Contact — Prends rendez-vous avec Cassandra Vignal | CoachIA",
    description:
      "Chaque demande est étudiée avec attention. Les accompagnements se font sur sélection afin de garantir un cadre stratégique et des résultats concrets.",
    url: "https://coach-ia-empire.fr/contact",
    images: [
      {
        url: "/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Contact CoachIA — Cassandra Vignal",
      },
    ],
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
