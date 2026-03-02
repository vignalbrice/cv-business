import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"] });

const siteUrl = "https://coach-ia-empire.fr";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "CoachIA — Architecte de croissance digitale",
    template: "%s | CoachIA",
  },
  description:
    "Cassandra Vignal transforme l'IA en machine à croissance pour les marques et entrepreneurs ambitieux. Social Boss Academy, Prompt Boss, coaching IA personnalisé.",
  keywords: [
    "coach IA",
    "intelligence artificielle",
    "growth hacking",
    "stratégie digitale",
    "prompt boss",
    "Social Boss Academy",
    "SBA",
    "Cassandra Vignal",
    "formation IA",
    "coaching business",
    "entrepreneur",
    "revenus scalables",
    "personal branding",
    "contenu IA",
  ],
  authors: [{ name: "Cassandra Vignal", url: siteUrl }],
  creator: "Cassandra Vignal",
  publisher: "CoachIA",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: siteUrl,
    siteName: "CoachIA",
    title: "CoachIA — Architecte de croissance digitale",
    description:
      "Cassandra Vignal transforme l'IA en machine à croissance pour les marques et entrepreneurs ambitieux.",
    images: [
      {
        url: "/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "CoachIA — Architecte de croissance digitale",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CoachIA — Architecte de croissance digitale",
    description:
      "Cassandra Vignal transforme l'IA en machine à croissance pour les marques et entrepreneurs ambitieux.",
    images: ["/og-default.jpg"],
    creator: "@cassandravignal",
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className={`${inter.className} bg-white text-gray-900 antialiased`}>
        <Navbar />
        <main className="pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
