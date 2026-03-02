import type { Metadata } from "next";
import HeroSection from "@/components/home/HeroSection";
import ProofSection from "@/components/home/ProofSection";
import CardsSection from "@/components/home/CardsSection";
import PositioningSection from "@/components/home/PositioningSection";

export const metadata: Metadata = {
  title: "CoachIA — Architecte de croissance digitale avec l'IA",
  description:
    "Cassandra Vignal, stratège IA & contenu. Accélère ta croissance digitale avec la Social Boss Academy, Prompt Boss et des coachings IA personnalisés.",
  keywords: [
    "coach IA",
    "croissance digitale",
    "stratégie IA",
    "Social Boss Academy",
    "Prompt Boss",
    "Cassandra Vignal",
    "formation intelligence artificielle",
    "coach entrepreneur",
  ],
  alternates: {
    canonical: "https://coach-ia-empire.fr",
  },
  openGraph: {
    title: "CoachIA — Architecte de croissance digitale avec l'IA",
    description:
      "Accélère ta croissance digitale avec l'IA. Social Boss Academy, Prompt Boss et coaching personnalisé par Cassandra Vignal.",
    url: "https://coach-ia-empire.fr",
    images: [
      {
        url: "/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "CoachIA — Architecte de croissance digitale",
      },
    ],
  },
};

export default function Home() {
  return (
    <>
      <HeroSection />
      <ProofSection />
      <CardsSection />
      <PositioningSection />
    </>
  );
}
