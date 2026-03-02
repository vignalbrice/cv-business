"use client";

import { Offre } from "@/lib/offres";
import { useState, useEffect } from "react";
import { Loader2, Save, X, RefreshCw, Tag, Lock, Unlock } from "lucide-react";

interface StripePrice {
  id: string;
  unit_amount: number | null;
  currency: string;
  recurring: { interval: string } | null;
}

interface StripeProduct {
  id: string;
  name: string;
  default_price: StripePrice | string | null;
  active: boolean;
}

interface OffreFormProps {
  offre?: Offre;
  onSave: (data: Partial<Offre>) => void;
  onCancel: () => void;
  loading?: boolean;
}

const defaultOffre: Partial<Offre> = {
  titre: "",
  sousTitre: "",
  description: "",
  benefices: [],
  prix: 0,
  prixAffiche: "",
  badge: "",
  couleur: "violet",
  stripePriceId: "",
  actif: true,
  ordre: 99,
  slug: "",
};

function toSlug(str: string): string {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // supprime les accents
    .replace(/[^a-z0-9\s-]/g, "") // garde lettres, chiffres, espaces, tirets
    .trim()
    .replace(/\s+/g, "-") // espaces → tirets
    .replace(/-+/g, "-"); // tirets multiples → un seul
}

export default function OffreForm({
  offre,
  onSave,
  onCancel,
  loading = false,
}: OffreFormProps) {
  const [formData, setFormData] = useState<Partial<Offre>>(
    offre || defaultOffre,
  );
  const [beneficesText, setBeneficesText] = useState(
    (offre?.benefices || []).join("\n"),
  );
  // En création : slug auto-généré depuis le titre
  // En édition : slug verrouillé par défaut (déverrouillable manuellement)
  const [slugLocked, setSlugLocked] = useState(!!offre);
  const [stripeProducts, setStripeProducts] = useState<StripeProduct[]>([]);
  const [stripeLoading, setStripeLoading] = useState(false);
  const [stripeLoaded, setStripeLoaded] = useState(false);

  const loadStripeProducts = async () => {
    setStripeLoading(true);
    try {
      const res = await fetch("/api/stripe/products");
      const data = await res.json();
      if (res.ok) setStripeProducts(data.products);
    } catch {
      // silencieux
    } finally {
      setStripeLoading(false);
      setStripeLoaded(true);
    }
  };

  useEffect(() => {
    loadStripeProducts();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => {
      const updated = {
        ...prev,
        [name]:
          type === "checkbox"
            ? (e.target as HTMLInputElement).checked
            : name === "prix" || name === "ordre"
              ? Number(value)
              : value,
      };
      // Auto-génère le slug depuis le titre si non verrouillé
      if (name === "titre" && !slugLocked) {
        updated.slug = toSlug(value);
      }
      return updated;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const benefices = beneficesText
      .split("\n")
      .map((b) => b.trim())
      .filter(Boolean);
    onSave({ ...formData, benefices });
  };

  const inputClass =
    "w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors text-sm";
  const labelClass =
    "block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className={labelClass}>Titre *</label>
          <input
            name="titre"
            required
            value={formData.titre || ""}
            onChange={handleChange}
            placeholder="Social Boss Academy"
            className={inputClass}
          />
        </div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className={labelClass}>Slug *</label>
            <button
              type="button"
              onClick={() => setSlugLocked((l) => !l)}
              className={`flex items-center gap-1 text-xs font-medium transition-colors ${
                slugLocked
                  ? "text-gray-400 hover:text-amber-600"
                  : "text-amber-600 hover:text-gray-400"
              }`}
              title={
                slugLocked
                  ? "Modifier le slug manuellement"
                  : "Verrouiller le slug"
              }
            >
              {slugLocked ? (
                <>
                  <Lock className="w-3 h-3" /> Verrouillé
                </>
              ) : (
                <>
                  <Unlock className="w-3 h-3" /> Modifiable
                </>
              )}
            </button>
          </div>
          <div className="relative">
            <input
              name="slug"
              required
              value={formData.slug || ""}
              onChange={handleChange}
              readOnly={slugLocked}
              placeholder="social-boss-academy"
              className={`${inputClass} font-mono pr-10 ${
                slugLocked ? "bg-gray-50 text-gray-400 cursor-not-allowed" : ""
              }`}
            />
            {!slugLocked && (
              <button
                type="button"
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    slug: toSlug(prev.titre || ""),
                  }))
                }
                title="Regénérer depuis le titre"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-purple-600 transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
          {!slugLocked && (
            <p className="text-xs text-gray-400 mt-1">
              Généré automatiquement depuis le titre — modifiable manuellement.
            </p>
          )}
        </div>
      </div>

      <div>
        <label className={labelClass}>Sous-titre</label>
        <input
          name="sousTitre"
          value={formData.sousTitre || ""}
          onChange={handleChange}
          placeholder="Maîtrise les réseaux sociaux..."
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass}>Description</label>
        <textarea
          name="description"
          rows={3}
          value={formData.description || ""}
          onChange={handleChange}
          placeholder="La formation complète pour..."
          className={`${inputClass} resize-none`}
        />
      </div>

      <div>
        <label className={labelClass}>Bénéfices (1 par ligne)</label>
        <textarea
          rows={5}
          value={beneficesText}
          onChange={(e) => setBeneficesText(e.target.value)}
          placeholder={"Maîtriser les réseaux\nStructurer ton image"}
          className={`${inputClass} resize-none font-mono`}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div>
          <label className={labelClass}>Prix (€) *</label>
          <input
            name="prix"
            type="text"
            required
            value={formData.prix}
            onChange={handleChange}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Prix affiché</label>
          <input
            name="prixAffiche"
            value={formData.prixAffiche || ""}
            onChange={handleChange}
            placeholder="297€"
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Ordre d&apos;affichage</label>
          <input
            name="ordre"
            type="number"
            min={1}
            value={formData.ordre || 1}
            onChange={handleChange}
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className={labelClass}>Badge</label>
          <input
            name="badge"
            value={formData.badge || ""}
            onChange={handleChange}
            placeholder="🔥 Best-seller"
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Couleur</label>
          <select
            name="couleur"
            value={formData.couleur || "violet"}
            onChange={handleChange}
            className={`${inputClass} bg-white`}
          >
            <option value="violet">Violet</option>
            <option value="bleu">Bleu</option>
            <option value="jaune">Jaune</option>
            <option value="rose">Rose</option>
            <option value="vert">Vert</option>
          </select>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <label className={labelClass}>Stripe Price ID</label>
          <button
            type="button"
            onClick={loadStripeProducts}
            disabled={stripeLoading}
            className="flex items-center gap-1.5 text-xs text-purple-600 hover:text-purple-800 transition-colors disabled:opacity-50"
          >
            <RefreshCw
              className={`w-3 h-3 ${stripeLoading ? "animate-spin" : ""}`}
            />
            {stripeLoading ? "Chargement..." : "Actualiser Stripe"}
          </button>
        </div>

        {/* Selector produits Stripe */}
        {stripeLoaded && stripeProducts.length > 0 && (
          <div className="mb-3">
            <div className="flex items-center gap-2 mb-1.5">
              <Tag className="w-3.5 h-3.5 text-purple-500" />
              <span className="text-xs text-gray-500">
                Choisir depuis Stripe ({stripeProducts.length} produit
                {stripeProducts.length > 1 ? "s" : ""})
              </span>
            </div>
            <select
              onChange={(e) => {
                const val = e.target.value;
                if (!val) return;
                setFormData((prev) => ({ ...prev, stripePriceId: val }));
              }}
              defaultValue=""
              className={`${inputClass} bg-white`}
            >
              <option value="">— Sélectionner un produit Stripe —</option>
              {stripeProducts.map((p) => {
                const price =
                  typeof p.default_price === "object" && p.default_price
                    ? p.default_price
                    : null;
                const priceId =
                  price?.id ??
                  (typeof p.default_price === "string"
                    ? p.default_price
                    : null);
                const priceLabel = price?.unit_amount
                  ? ` — ${(price.unit_amount / 100).toFixed(2)} ${price.currency.toUpperCase()}`
                  : "";
                return (
                  <option key={p.id} value={priceId ?? ""} disabled={!priceId}>
                    {p.name}
                    {priceLabel}
                    {!priceId ? " (pas de prix)" : ""}
                  </option>
                );
              })}
            </select>
          </div>
        )}

        {stripeLoaded && stripeProducts.length === 0 && (
          <p className="text-xs text-amber-600 mb-2">
            Aucun produit actif trouvé dans Stripe.
          </p>
        )}

        {/* Saisie manuelle */}
        <input
          name="stripePriceId"
          value={formData.stripePriceId || ""}
          onChange={handleChange}
          placeholder="price_xxxxxxxxxxxxxxxx"
          className={inputClass}
        />
        <p className="text-xs text-gray-400 mt-1">
          Sélectionne un produit ci-dessus ou saisis manuellement le Price ID
          Stripe.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          id="actif"
          name="actif"
          checked={formData.actif ?? true}
          onChange={handleChange}
          className="w-4 h-4 accent-purple-500"
        />
        <label htmlFor="actif" className="text-sm text-gray-700">
          Offre active (visible sur le site)
        </label>
      </div>

      <div className="flex gap-3 pt-4 border-t border-gray-200">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 py-3 bg-linear-to-r from-purple-600 to-purple-800 text-white font-bold rounded-xl hover:from-purple-700 hover:to-purple-900 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          Sauvegarder
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all flex items-center gap-2"
        >
          <X className="w-4 h-4" />
          Annuler
        </button>
      </div>
    </form>
  );
}
