"use client";

import { Offre } from "@/lib/offres";
import { CheckCircle, Loader2, CreditCard } from "lucide-react";
import { useState, useEffect } from "react";

interface InstallmentOption {
  n: number;
  priceId: string;
  amountPerMonth: number; // centimes
  currency: string;
}

const couleurMap: Record<string, string> = {
  violet:
    "bg-white border-purple-200 hover:border-purple-400 hover:shadow-purple-100",
  bleu: "bg-white border-blue-200 hover:border-blue-400 hover:shadow-blue-100",
  jaune:
    "bg-white border-amber-200 hover:border-amber-400 hover:shadow-amber-100",
  rose: "bg-white border-pink-200 hover:border-pink-400 hover:shadow-pink-100",
  vert: "bg-white border-green-200 hover:border-green-400 hover:shadow-green-100",
};

const accentMap: Record<string, string> = {
  violet: "text-purple-700",
  bleu: "text-blue-700",
  jaune: "text-amber-700",
  rose: "text-pink-700",
  vert: "text-green-700",
};

const badgeBgMap: Record<string, string> = {
  violet: "bg-purple-100 text-purple-700 border-purple-200",
  bleu: "bg-blue-100 text-blue-700 border-blue-200",
  jaune: "bg-amber-100 text-amber-700 border-amber-200",
  rose: "bg-pink-100 text-pink-700 border-pink-200",
  vert: "bg-green-100 text-green-700 border-green-200",
};

interface OffreCardProps {
  offre: Offre;
  showDetails?: boolean;
}

export default function OffreCard({
  offre,
  showDetails = false,
}: OffreCardProps) {
  const [loading, setLoading] = useState(false);
  const [showDesc, setShowDesc] = useState(showDetails);

  // Paiement en plusieurs fois
  const [installmentOptions, setInstallmentOptions] = useState<
    InstallmentOption[]
  >([]);
  const [totalAmount, setTotalAmount] = useState<number>(offre.prix * 100);
  const [selectedInstallment, setSelectedInstallment] = useState<number>(1); // 1 = paiement unique

  const gradient = couleurMap[offre.couleur] || couleurMap.violet;
  const accent = accentMap[offre.couleur] || accentMap.violet;
  const badgeBg = badgeBgMap[offre.couleur] || badgeBgMap.violet;

  // Charger les options de versements au montage
  useEffect(() => {
    fetch(`/api/checkout?offreId=${offre.id}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.installmentOptions?.length > 0) {
          setInstallmentOptions(data.installmentOptions);
          setTotalAmount(data.totalAmount ?? offre.prix * 100);
        }
      })
      .catch(() => {
        /* silencieux */
      });
  }, [offre.id, offre.prix]);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          offreId: offre.id,
          ...(selectedInstallment > 1
            ? { installments: selectedInstallment }
            : {}),
        }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error || "Erreur lors de la création du paiement.");
      }
    } catch {
      alert("Une erreur est survenue.");
    } finally {
      setLoading(false);
    }
  };

  const formatAmount = (centimes: number, currency: string) =>
    `${(centimes / 100).toFixed(2).replace(".", ",")} ${currency}`;

  return (
    <div
      id={offre.slug}
      className={`${gradient} border rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col`}
    >
      {/* Badge */}
      <span
        className={`inline-block self-start px-3 py-1 text-xs font-semibold rounded-full border ${badgeBg} mb-6`}
      >
        {offre.badge}
      </span>

      {/* Titre */}
      <h3 className={`text-2xl font-black text-gray-900 mb-2`}>
        {offre.titre}
      </h3>
      <p className={`text-sm font-medium mb-4 ${accent}`}>{offre.sousTitre}</p>

      {/* Prix */}
      <div className="mb-2">
        <span className="text-3xl font-black text-gray-900">
          {offre.prixAffiche}
        </span>
      </div>

      {/* Sélecteur de paiement en plusieurs fois */}
      {installmentOptions.length > 0 && (
        <div className="mb-6">
          <p className="text-xs text-gray-500 mb-2 flex items-center gap-1.5">
            <CreditCard className="w-3.5 h-3.5" />
            Mode de paiement
          </p>
          <div className="flex flex-wrap gap-2">
            {/* Option paiement unique */}
            <button
              type="button"
              onClick={() => setSelectedInstallment(1)}
              className={`flex flex-col items-center px-3 py-2 rounded-xl border text-xs font-semibold transition-all ${
                selectedInstallment === 1
                  ? offre.couleur === "jaune"
                    ? "bg-amber-500 border-amber-500 text-white shadow-sm"
                    : "bg-purple-600 border-purple-600 text-white shadow-sm"
                  : "bg-white border-gray-300 text-gray-600 hover:border-gray-400"
              }`}
            >
              <span>1× paiement</span>
              <span
                className={`text-xs font-normal mt-0.5 ${selectedInstallment === 1 ? "text-white/80" : "text-gray-400"}`}
              >
                {formatAmount(totalAmount, "EUR")}
              </span>
            </button>

            {/* Options versements */}
            {installmentOptions.map((opt) => (
              <button
                key={opt.n}
                type="button"
                onClick={() => setSelectedInstallment(opt.n)}
                className={`flex flex-col items-center px-3 py-2 rounded-xl border text-xs font-semibold transition-all ${
                  selectedInstallment === opt.n
                    ? offre.couleur === "jaune"
                      ? "bg-amber-500 border-amber-500 text-white shadow-sm"
                      : "bg-purple-600 border-purple-600 text-white shadow-sm"
                    : "bg-white border-gray-300 text-gray-600 hover:border-gray-400"
                }`}
              >
                <span>{opt.n}× paiement</span>
                <span
                  className={`text-xs font-normal mt-0.5 ${selectedInstallment === opt.n ? "text-white/80" : "text-gray-400"}`}
                >
                  {formatAmount(opt.amountPerMonth, opt.currency)}/mois
                </span>
              </button>
            ))}
          </div>
          {selectedInstallment > 1 && (
            <p className="text-xs text-gray-400 mt-2">
              Soit {selectedInstallment} versements de{" "}
              <strong className="text-gray-700">
                {formatAmount(
                  installmentOptions.find((o) => o.n === selectedInstallment)
                    ?.amountPerMonth ?? 0,
                  "EUR",
                )}
              </strong>{" "}
              — total {formatAmount(totalAmount, "EUR")}
            </p>
          )}
        </div>
      )}

      {/* Description courte */}
      <p className="text-gray-500 text-sm mb-6 leading-relaxed">
        {offre.description}
      </p>

      {/* Bénéfices */}
      {showDesc && (
        <ul className="space-y-3 mb-6">
          {offre.benefices.map((b, i) => (
            <li key={i} className="flex items-start gap-3">
              <CheckCircle className={`w-4 h-4 mt-0.5 shrink-0 ${accent}`} />
              <span className="text-gray-700 text-sm">{b}</span>
            </li>
          ))}
        </ul>
      )}

      {/* Spacer */}
      <div className="flex-1" />

      {/* CTAs */}
      <div className="flex flex-col gap-3 mt-6">
        <button
          onClick={handleCheckout}
          disabled={loading}
          className={`w-full py-3.5 rounded-xl font-bold text-sm transition-all duration-200 hover:-translate-y-0.5 flex items-center justify-center gap-2
            ${
              offre.couleur === "jaune"
                ? "bg-linear-to-r from-yellow-400 to-amber-500 text-black hover:from-yellow-500 hover:to-amber-600 shadow-lg hover:shadow-yellow-400/30"
                : "bg-linear-to-r from-purple-600 to-purple-800 text-white hover:from-purple-700 hover:to-purple-900 shadow-lg hover:shadow-purple-500/30"
            }`}
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : selectedInstallment > 1 ? (
            `🔘 Payer en ${selectedInstallment}×`
          ) : (
            "🔘 Réserver"
          )}
        </button>
        <button
          onClick={() => setShowDesc(!showDesc)}
          className="w-full py-3 rounded-xl font-semibold text-sm border border-gray-300 text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all"
        >
          {showDesc ? "Masquer les détails" : "🔘 Voir les détails"}
        </button>
      </div>
    </div>
  );
}
