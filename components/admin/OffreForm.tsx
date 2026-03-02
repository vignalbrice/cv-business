"use client";

import { Offre } from "@/lib/offres";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Save, X, RefreshCw, Tag, Lock, Unlock } from "lucide-react";

const offreSchema = z.object({
  titre: z.string().min(1, "Le titre est requis"),
  slug: z
    .string()
    .min(1, "Le slug est requis")
    .regex(
      /^[a-z0-9-]+$/,
      "Slug invalide : lettres minuscules, chiffres et tirets uniquement",
    ),
  sousTitre: z.string().optional(),
  description: z.string().optional(),
  beneficesText: z.string().optional(),
  prix: z.string().min(1, "Le prix est requis"),
  prixAffiche: z.string().optional(),
  ordre: z.string().optional(),
  badge: z.string().optional(),
  couleur: z.enum(["violet", "bleu", "jaune", "rose", "vert"]),
  stripePriceId: z.string().optional(),
  actif: z.boolean(),
});

type OffreFormData = z.infer<typeof offreSchema>;

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

function toSlug(str: string): string {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export default function OffreForm({
  offre,
  onSave,
  onCancel,
  loading = false,
}: OffreFormProps) {
  const [slugLocked, setSlugLocked] = useState(!!offre);
  const [stripeProducts, setStripeProducts] = useState<StripeProduct[]>([]);
  const [stripeLoading, setStripeLoading] = useState(false);
  const [stripeLoaded, setStripeLoaded] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<OffreFormData>({
    resolver: zodResolver(offreSchema),
    defaultValues: {
      titre: offre?.titre ?? "",
      slug: offre?.slug ?? "",
      sousTitre: offre?.sousTitre ?? "",
      description: offre?.description ?? "",
      beneficesText: (offre?.benefices ?? []).join("\n"),
      prix: String(offre?.prix ?? 0),
      prixAffiche: offre?.prixAffiche ?? "",
      ordre: String(offre?.ordre ?? 99),
      badge: offre?.badge ?? "",
      couleur: (offre?.couleur as OffreFormData["couleur"]) ?? "violet",
      stripePriceId: offre?.stripePriceId ?? "",
      actif: offre?.actif ?? true,
    },
  });

  const titreValue = watch("titre");

  // Auto-génère le slug depuis le titre si non verrouillé
  useEffect(() => {
    if (!slugLocked && titreValue) {
      setValue("slug", toSlug(titreValue), { shouldValidate: true });
    }
  }, [titreValue, slugLocked, setValue]);

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

  const onSubmit = (data: OffreFormData) => {
    const benefices = (data.beneficesText ?? "")
      .split("\n")
      .map((b) => b.trim())
      .filter(Boolean);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { beneficesText, ...rest } = data;
    onSave({
      ...rest,
      prix: Number(data.prix),
      ordre: Number(data.ordre ?? 99),
      benefices,
    });
  };

  const inputClass =
    "w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors text-sm";
  const inputErrorClass =
    "w-full bg-red-50 border border-red-400 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-red-500 transition-colors text-sm";
  const labelClass =
    "block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Titre */}
        <div>
          <label className={labelClass}>Titre *</label>
          <input
            {...register("titre")}
            placeholder="Social Boss Academy"
            className={errors.titre ? inputErrorClass : inputClass}
          />
          {errors.titre && (
            <p className="mt-1 text-xs text-red-600">{errors.titre.message}</p>
          )}
        </div>

        {/* Slug */}
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
              {...register("slug")}
              readOnly={slugLocked}
              placeholder="social-boss-academy"
              className={`${errors.slug ? inputErrorClass : inputClass} font-mono pr-10 ${
                slugLocked ? "bg-gray-50 text-gray-400 cursor-not-allowed" : ""
              }`}
            />
            {!slugLocked && (
              <button
                type="button"
                onClick={() =>
                  setValue("slug", toSlug(watch("titre") || ""), {
                    shouldValidate: true,
                  })
                }
                title="Regénérer depuis le titre"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-purple-600 transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
          {errors.slug && (
            <p className="mt-1 text-xs text-red-600">{errors.slug.message}</p>
          )}
          {!slugLocked && !errors.slug && (
            <p className="text-xs text-gray-400 mt-1">
              Généré automatiquement depuis le titre — modifiable manuellement.
            </p>
          )}
        </div>
      </div>

      {/* Sous-titre */}
      <div>
        <label className={labelClass}>Sous-titre</label>
        <input
          {...register("sousTitre")}
          placeholder="Maîtrise les réseaux sociaux..."
          className={inputClass}
        />
      </div>

      {/* Description */}
      <div>
        <label className={labelClass}>Description</label>
        <textarea
          {...register("description")}
          rows={3}
          placeholder="La formation complète pour..."
          className={`${inputClass} resize-none`}
        />
      </div>

      {/* Bénéfices */}
      <div>
        <label className={labelClass}>Bénéfices (1 par ligne)</label>
        <textarea
          {...register("beneficesText")}
          rows={5}
          placeholder={"Maîtriser les réseaux\nStructurer ton image"}
          className={`${inputClass} resize-none font-mono`}
        />
      </div>

      {/* Prix */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div>
          <label className={labelClass}>Prix (€) *</label>
          <input
            {...register("prix")}
            type="number"
            min={0}
            step={0.01}
            className={errors.prix ? inputErrorClass : inputClass}
          />
          {errors.prix && (
            <p className="mt-1 text-xs text-red-600">{errors.prix.message}</p>
          )}
        </div>
        <div>
          <label className={labelClass}>Prix affiché</label>
          <input
            {...register("prixAffiche")}
            placeholder="297€"
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Ordre d&apos;affichage</label>
          <input
            {...register("ordre")}
            type="number"
            min={1}
            className={inputClass}
          />
        </div>
      </div>

      {/* Badge & Couleur */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className={labelClass}>Badge</label>
          <input
            {...register("badge")}
            placeholder="🔥 Best-seller"
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Couleur</label>
          <select {...register("couleur")} className={`${inputClass} bg-white`}>
            <option value="violet">Violet</option>
            <option value="bleu">Bleu</option>
            <option value="jaune">Jaune</option>
            <option value="rose">Rose</option>
            <option value="vert">Vert</option>
          </select>
        </div>
      </div>

      {/* Stripe Price ID */}
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
                if (e.target.value) setValue("stripePriceId", e.target.value);
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

        <input
          {...register("stripePriceId")}
          placeholder="price_xxxxxxxxxxxxxxxx"
          className={inputClass}
        />
        <p className="text-xs text-gray-400 mt-1">
          Sélectionne un produit ci-dessus ou saisis manuellement le Price ID
          Stripe.
        </p>
      </div>

      {/* Actif */}
      <div className="flex items-center gap-3">
        <input
          {...register("actif")}
          type="checkbox"
          id="actif"
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
