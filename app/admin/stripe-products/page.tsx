"use client";

import { useEffect, useState } from "react";
import {
  ExternalLink,
  RefreshCw,
  Tag,
  CheckCircle,
  XCircle,
  Copy,
  Check,
  Plus,
  X,
  Loader2,
  Save,
  Pencil,
  ImageIcon,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import ImageUploader from "@/components/admin/ImageUploader";

interface StripePrice {
  id: string;
  unit_amount: number | null;
  currency: string;
  recurring: { interval: string; interval_count: number } | null;
}

interface StripeProduct {
  id: string;
  name: string;
  description: string | null;
  active: boolean;
  default_price: StripePrice | string | null;
  images: string[];
  created: number;
  metadata: Record<string, string>;
}

interface CreateForm {
  name: string;
  description: string;
  imageUrl: string;
  prix: string;
  currency: string;
  type: "one_time" | "recurring";
  interval: "month" | "year";
  installments: number[]; // options de paiement en plusieurs fois
}

interface EditForm {
  name: string;
  description: string;
  imageUrl: string;
  installments: number[];
}

const INSTALLMENT_OPTIONS = [2, 3, 4, 6, 10, 12];

const defaultForm: CreateForm = {
  name: "",
  description: "",
  imageUrl: "",
  prix: "",
  currency: "eur",
  type: "one_time",
  interval: "month",
  installments: [],
};

export default function StripeProductsPage() {
  const [products, setProducts] = useState<StripeProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  // Formulaire création
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<CreateForm>(defaultForm);
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);
  const [createSuccess, setCreateSuccess] = useState<string | null>(null);

  // Formulaire modification
  const [editingProduct, setEditingProduct] = useState<StripeProduct | null>(
    null,
  );
  const [editForm, setEditForm] = useState<EditForm>({
    name: "",
    description: "",
    imageUrl: "",
    installments: [],
  });
  const [saving, setSaving] = useState(false);
  const [editError, setEditError] = useState<string | null>(null);
  const [editSuccess, setEditSuccess] = useState<string | null>(null);

  const getAdminToken = () =>
    typeof window !== "undefined"
      ? (localStorage.getItem("admin_token") ?? "")
      : "";

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/stripe/products");
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erreur inconnue");
      setProducts(data.products);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erreur de chargement");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 2000);
  };

  const formatPrice = (price: StripePrice | string | null): string => {
    if (!price || typeof price === "string") return "—";
    if (!price.unit_amount) return "Gratuit";
    const amount = (price.unit_amount / 100).toFixed(2);
    const currency = price.currency.toUpperCase();
    if (price.recurring)
      return `${amount} ${currency} / ${price.recurring.interval}`;
    return `${amount} ${currency}`;
  };

  const getPriceId = (price: StripePrice | string | null): string | null => {
    if (!price) return null;
    if (typeof price === "string") return price;
    return price.id;
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);
    setCreateError(null);
    setCreateSuccess(null);
    try {
      const res = await fetch("/api/stripe/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-token": getAdminToken(),
        },
        body: JSON.stringify({
          name: form.name,
          description: form.description || undefined,
          imageUrl: form.imageUrl || undefined,
          prix: parseFloat(form.prix),
          currency: form.currency,
          type: form.type,
          interval: form.interval,
          installments:
            form.installments.length > 0 ? form.installments : undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erreur inconnue");
      setCreateSuccess(
        `✅ Produit "${data.product.name}" créé — Price ID : ${data.price.id}`,
      );
      setForm(defaultForm);
      setShowForm(false);
      await fetchProducts();
    } catch (e) {
      setCreateError(e instanceof Error ? e.message : "Erreur inconnue");
    } finally {
      setCreating(false);
    }
  };

  const openEdit = (product: StripeProduct) => {
    setEditingProduct(product);
    setEditForm({
      name: product.name,
      description: product.description ?? "",
      imageUrl: product.images[0] ?? "",
      installments: Object.keys(product.metadata ?? {})
        .filter((k) => k.startsWith("installments_"))
        .map((k) => parseInt(k.replace("installments_", "").replace("x", "")))
        .sort((a, b) => a - b),
    });
    setEditError(null);
    setEditSuccess(null);
  };

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    setSaving(true);
    setEditError(null);
    setEditSuccess(null);
    try {
      const res = await fetch("/api/stripe/products", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-admin-token": getAdminToken(),
        },
        body: JSON.stringify({
          productId: editingProduct.id,
          name: editForm.name,
          description: editForm.description,
          imageUrl: editForm.imageUrl,
          installments: editForm.installments,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erreur inconnue");
      setEditSuccess("✅ Produit mis à jour !");
      setEditingProduct(null);
      await fetchProducts();
    } catch (e) {
      setEditError(e instanceof Error ? e.message : "Erreur inconnue");
    } finally {
      setSaving(false);
    }
  };

  const inputClass =
    "w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors text-sm";
  const labelClass =
    "block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2";

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="mb-1">
              <Link
                href="/admin/offres"
                className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
              >
                ← Dashboard admin
              </Link>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
              <Tag className="w-6 h-6 text-purple-600" />
              Produits Stripe
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              {products.length} produit{products.length !== 1 ? "s" : ""}{" "}
              récupéré{products.length !== 1 ? "s" : ""}
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={fetchProducts}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-100 transition-all text-sm disabled:opacity-50"
            >
              <RefreshCw
                className={`w-4 h-4 ${loading ? "animate-spin" : ""}`}
              />
              Actualiser
            </button>
            <button
              onClick={() => {
                setShowForm((v) => !v);
                setCreateError(null);
                setCreateSuccess(null);
              }}
              className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-all text-sm"
            >
              {showForm ? (
                <X className="w-4 h-4" />
              ) : (
                <Plus className="w-4 h-4" />
              )}
              {showForm ? "Annuler" : "Nouveau produit"}
            </button>
            <a
              href="https://dashboard.stripe.com/test/products"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-100 transition-all text-sm"
            >
              <ExternalLink className="w-4 h-4" />
              Stripe
            </a>
          </div>
        </div>

        {/* Succès global */}
        {(createSuccess || editSuccess) && (
          <div className="bg-green-50 border border-green-200 text-green-700 rounded-xl px-5 py-4 mb-6 text-sm flex items-start gap-3">
            <CheckCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{createSuccess ?? editSuccess}</span>
          </div>
        )}

        {/* ── Formulaire CRÉATION ── */}
        {showForm && (
          <div className="bg-white border border-purple-200 rounded-2xl p-8 mb-8 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Plus className="w-5 h-5 text-purple-600" />
              Créer un nouveau produit Stripe
            </h2>
            {createError && (
              <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 mb-5 text-sm">
                ⚠️ {createError}
              </div>
            )}
            <form onSubmit={handleCreate} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className={labelClass}>Nom du produit *</label>
                  <input
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Social Boss Academy"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Prix (€) *</label>
                  <input
                    required
                    type="number"
                    min="0.50"
                    step="0.01"
                    value={form.prix}
                    onChange={(e) => setForm({ ...form, prix: e.target.value })}
                    placeholder="97"
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label className={labelClass}>Description</label>
                <textarea
                  rows={2}
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  placeholder="Description affichée sur Stripe..."
                  className={`${inputClass} resize-none`}
                />
              </div>

              {/* Image */}
              <div>
                <label className={labelClass}>
                  <ImageIcon className="inline w-3.5 h-3.5 mr-1 -mt-0.5" />
                  Image (optionnel)
                </label>
                <ImageUploader
                  value={form.imageUrl}
                  onChange={(url) => setForm({ ...form, imageUrl: url })}
                  adminToken={getAdminToken()}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div>
                  <label className={labelClass}>Devise</label>
                  <select
                    value={form.currency}
                    onChange={(e) =>
                      setForm({ ...form, currency: e.target.value })
                    }
                    className={`${inputClass} bg-white`}
                  >
                    <option value="eur">EUR — €</option>
                    <option value="usd">USD — $</option>
                    <option value="gbp">GBP — £</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Type de paiement</label>
                  <select
                    value={form.type}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        type: e.target.value as "one_time" | "recurring",
                      })
                    }
                    className={`${inputClass} bg-white`}
                  >
                    <option value="one_time">Paiement unique</option>
                    <option value="recurring">Abonnement</option>
                  </select>
                </div>
                {form.type === "recurring" && (
                  <div>
                    <label className={labelClass}>Fréquence</label>
                    <select
                      value={form.interval}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          interval: e.target.value as "month" | "year",
                        })
                      }
                      className={`${inputClass} bg-white`}
                    >
                      <option value="month">Mensuel</option>
                      <option value="year">Annuel</option>
                    </select>
                  </div>
                )}
              </div>

              {/* Options de paiement en plusieurs fois (one_time uniquement) */}
              {form.type === "one_time" && (
                <div>
                  <label className={labelClass}>
                    Paiement en plusieurs fois (optionnel)
                  </label>
                  <p className="text-xs text-gray-400 mb-3">
                    Cochez les options souhaitées. Un prix Stripe dédié sera
                    créé pour chaque versement.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {INSTALLMENT_OPTIONS.map((n) => {
                      const selected = form.installments.includes(n);
                      const perInstallment = form.prix
                        ? `${(parseFloat(form.prix) / n).toFixed(2)} ${form.currency.toUpperCase()}`
                        : null;
                      return (
                        <button
                          key={n}
                          type="button"
                          onClick={() =>
                            setForm({
                              ...form,
                              installments: selected
                                ? form.installments.filter((x) => x !== n)
                                : [...form.installments, n],
                            })
                          }
                          className={`flex flex-col items-center px-4 py-2.5 rounded-xl border text-sm font-medium transition-all ${
                            selected
                              ? "bg-purple-600 border-purple-600 text-white shadow-sm"
                              : "bg-white border-gray-300 text-gray-600 hover:border-purple-400 hover:text-purple-600"
                          }`}
                        >
                          <span className="font-bold">{n}×</span>
                          {perInstallment && (
                            <span
                              className={`text-xs mt-0.5 ${selected ? "text-purple-200" : "text-gray-400"}`}
                            >
                              {perInstallment}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                  {form.installments.length > 0 && (
                    <p className="text-xs text-purple-600 mt-2 font-medium">
                      ✓{" "}
                      {[...form.installments].sort((a, b) => a - b).join("×, ")}
                      × sélectionné{form.installments.length > 1 ? "s" : ""}
                    </p>
                  )}
                </div>
              )}

              <div className="flex gap-3 pt-2 border-t border-gray-200">
                <button
                  type="submit"
                  disabled={creating}
                  className="flex-1 py-3 bg-linear-to-r from-purple-600 to-purple-800 text-white font-bold rounded-xl hover:from-purple-700 hover:to-purple-900 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {creating ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  {creating ? "Création en cours..." : "Créer le produit"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setForm(defaultForm);
                    setCreateError(null);
                  }}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all flex items-center gap-2"
                >
                  <X className="w-4 h-4" />
                  Annuler
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ── Formulaire MODIFICATION (inline) ── */}
        {editingProduct && (
          <div className="bg-white border border-amber-200 rounded-2xl p-8 mb-8 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 mb-1 flex items-center gap-2">
              <Pencil className="w-5 h-5 text-amber-500" />
              Modifier — {editingProduct.name}
            </h2>
            <p className="text-xs text-gray-400 mb-6 font-mono">
              {editingProduct.id}
            </p>

            {editError && (
              <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 mb-5 text-sm">
                ⚠️ {editError}
              </div>
            )}

            <form onSubmit={handleEdit} className="space-y-5">
              <div>
                <label className={labelClass}>Nom du produit *</label>
                <input
                  required
                  value={editForm.name}
                  onChange={(e) =>
                    setEditForm({ ...editForm, name: e.target.value })
                  }
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Description</label>
                <textarea
                  rows={2}
                  value={editForm.description}
                  onChange={(e) =>
                    setEditForm({ ...editForm, description: e.target.value })
                  }
                  placeholder="Description affichée sur Stripe..."
                  className={`${inputClass} resize-none`}
                />
              </div>

              {/* Image */}
              <div>
                <label className={labelClass}>
                  <ImageIcon className="inline w-3.5 h-3.5 mr-1 -mt-0.5" />
                  Image
                </label>
                <ImageUploader
                  value={editForm.imageUrl}
                  onChange={(url) =>
                    setEditForm({ ...editForm, imageUrl: url })
                  }
                  adminToken={getAdminToken()}
                />
              </div>

              {/* Options de paiement en plusieurs fois */}
              <div>
                <label className={labelClass}>Paiement en plusieurs fois</label>
                <p className="text-xs text-gray-400 mb-3">
                  Cochez/décochez les options. Les prix Stripe seront créés ou
                  archivés en conséquence.
                </p>
                <div className="flex flex-wrap gap-3">
                  {INSTALLMENT_OPTIONS.map((n) => {
                    const selected = editForm.installments.includes(n);
                    const basePrice =
                      typeof editingProduct?.default_price === "object"
                        ? ((
                            editingProduct?.default_price as {
                              unit_amount: number | null;
                            } | null
                          )?.unit_amount ?? 0)
                        : 0;
                    const perInstallment = basePrice
                      ? `${(basePrice / 100 / n).toFixed(2)} ${
                          (typeof editingProduct?.default_price === "object"
                            ? (
                                editingProduct?.default_price as {
                                  currency: string;
                                } | null
                              )?.currency?.toUpperCase()
                            : "EUR") ?? "EUR"
                        }`
                      : null;
                    return (
                      <button
                        key={n}
                        type="button"
                        onClick={() =>
                          setEditForm({
                            ...editForm,
                            installments: selected
                              ? editForm.installments.filter((x) => x !== n)
                              : [...editForm.installments, n],
                          })
                        }
                        className={`flex flex-col items-center px-4 py-2.5 rounded-xl border text-sm font-medium transition-all ${
                          selected
                            ? "bg-amber-500 border-amber-500 text-white shadow-sm"
                            : "bg-white border-gray-300 text-gray-600 hover:border-amber-400 hover:text-amber-600"
                        }`}
                      >
                        <span className="font-bold">{n}×</span>
                        {perInstallment && (
                          <span
                            className={`text-xs mt-0.5 ${selected ? "text-amber-100" : "text-gray-400"}`}
                          >
                            {perInstallment}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
                {editForm.installments.length > 0 && (
                  <p className="text-xs text-amber-600 mt-2 font-medium">
                    ✓{" "}
                    {[...editForm.installments]
                      .sort((a, b) => a - b)
                      .join("×, ")}
                    × activé{editForm.installments.length > 1 ? "s" : ""}
                  </p>
                )}
              </div>

              <div className="flex gap-3 pt-2 border-t border-gray-200">
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 py-3 bg-linear-to-r from-amber-500 to-amber-600 text-white font-bold rounded-xl hover:from-amber-600 hover:to-amber-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {saving ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  {saving ? "Sauvegarde..." : "Enregistrer les modifications"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setEditingProduct(null);
                    setEditError(null);
                  }}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all flex items-center gap-2"
                >
                  <X className="w-4 h-4" />
                  Annuler
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Erreur chargement */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-5 py-4 mb-6 text-sm">
            ⚠️ {error}
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center py-24 text-gray-400">
            <RefreshCw className="w-6 h-6 animate-spin mr-3" />
            Chargement depuis Stripe...
          </div>
        )}

        {/* Liste vide */}
        {!loading && products.length === 0 && !error && (
          <div className="text-center py-24 text-gray-400">
            <Tag className="w-12 h-12 mx-auto mb-4 opacity-30" />
            <p>Aucun produit actif trouvé dans Stripe.</p>
          </div>
        )}

        {/* ── Liste produits ── */}
        {!loading && products.length > 0 && (
          <div className="space-y-4">
            {products.map((product) => {
              const priceId = getPriceId(product.default_price);
              const priceLabel = formatPrice(
                typeof product.default_price === "string"
                  ? null
                  : product.default_price,
              );
              const imageUrl = product.images[0] ?? null;
              const isEditing = editingProduct?.id === product.id;

              return (
                <div
                  key={product.id}
                  className={`bg-white border rounded-2xl p-5 shadow-sm transition-all ${
                    isEditing
                      ? "border-amber-300"
                      : "border-gray-200 hover:border-purple-200"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    {/* Vignette image */}
                    {imageUrl ? (
                      <div className="w-16 h-16 rounded-xl overflow-hidden border border-gray-200 shrink-0">
                        <Image
                          src={imageUrl}
                          alt={product.name}
                          width={64}
                          height={64}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-16 h-16 rounded-xl border border-dashed border-gray-200 bg-gray-50 flex items-center justify-center shrink-0">
                        <ImageIcon className="w-6 h-6 text-gray-300" />
                      </div>
                    )}

                    {/* Infos */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1">
                        {product.active ? (
                          <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
                        ) : (
                          <XCircle className="w-4 h-4 text-red-400 shrink-0" />
                        )}
                        <h2 className="font-semibold text-gray-900 truncate">
                          {product.name}
                        </h2>
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full border shrink-0 ${
                            product.active
                              ? "bg-green-50 text-green-700 border-green-200"
                              : "bg-red-50 text-red-600 border-red-200"
                          }`}
                        >
                          {product.active ? "Actif" : "Inactif"}
                        </span>
                      </div>

                      {product.description && (
                        <p className="text-sm text-gray-500 mt-0.5 mb-2 line-clamp-1">
                          {product.description}
                        </p>
                      )}

                      <div className="flex flex-wrap gap-2 mt-2">
                        {/* Product ID */}
                        <div className="flex items-center gap-1.5 bg-gray-50 border border-gray-200 rounded-lg px-2.5 py-1">
                          <span className="text-xs text-gray-400">
                            Product ID
                          </span>
                          <code className="text-xs font-mono text-gray-700">
                            {product.id}
                          </code>
                          <button
                            onClick={() => copyToClipboard(product.id)}
                            className="text-gray-400 hover:text-purple-600 transition-colors"
                            title="Copier"
                          >
                            {copied === product.id ? (
                              <Check className="w-3 h-3 text-green-500" />
                            ) : (
                              <Copy className="w-3 h-3" />
                            )}
                          </button>
                        </div>
                        {/* Price ID */}
                        {priceId && (
                          <div className="flex items-center gap-1.5 bg-purple-50 border border-purple-200 rounded-lg px-2.5 py-1">
                            <span className="text-xs text-purple-500">
                              Price ID
                            </span>
                            <code className="text-xs font-mono text-purple-700">
                              {priceId}
                            </code>
                            <button
                              onClick={() => copyToClipboard(priceId)}
                              className="text-purple-400 hover:text-purple-700 transition-colors"
                              title="Copier"
                            >
                              {copied === priceId ? (
                                <Check className="w-3 h-3 text-green-500" />
                              ) : (
                                <Copy className="w-3 h-3" />
                              )}
                            </button>
                          </div>
                        )}
                      </div>

                      {/* Badges versements */}
                      {Object.entries(product.metadata ?? {})
                        .filter(([k]) => k.startsWith("installments_"))
                        .sort(([a], [b]) => {
                          const na = parseInt(
                            a.replace("installments_", "").replace("x", ""),
                          );
                          const nb = parseInt(
                            b.replace("installments_", "").replace("x", ""),
                          );
                          return na - nb;
                        })
                        .map(([key, pid]) => {
                          const n = key
                            .replace("installments_", "")
                            .replace("x", "");
                          return (
                            <div
                              key={key}
                              className="flex items-center gap-1.5 bg-blue-50 border border-blue-200 rounded-lg px-2.5 py-1"
                            >
                              <span className="text-xs font-bold text-blue-600">
                                {n}×
                              </span>
                              <code className="text-xs font-mono text-blue-700">
                                {pid}
                              </code>
                              <button
                                onClick={() => copyToClipboard(pid)}
                                className="text-blue-400 hover:text-blue-700 transition-colors"
                                title={`Copier Price ID ${n}×`}
                              >
                                {copied === pid ? (
                                  <Check className="w-3 h-3 text-green-500" />
                                ) : (
                                  <Copy className="w-3 h-3" />
                                )}
                              </button>
                            </div>
                          );
                        })}
                    </div>
                    {/* fin flex-1 */}

                    {/* Prix + actions */}
                    <div className="text-right shrink-0 flex flex-col items-end gap-2">
                      <p className="text-lg font-bold text-gray-900">
                        {priceLabel}
                      </p>
                      <p className="text-xs text-gray-400">
                        {new Date(product.created * 1000).toLocaleDateString(
                          "fr-FR",
                        )}
                      </p>
                      <button
                        onClick={() =>
                          isEditing
                            ? setEditingProduct(null)
                            : openEdit(product)
                        }
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                          isEditing
                            ? "bg-gray-100 text-gray-600 hover:bg-gray-200"
                            : "bg-amber-50 border border-amber-200 text-amber-700 hover:bg-amber-100"
                        }`}
                      >
                        {isEditing ? (
                          <X className="w-3 h-3" />
                        ) : (
                          <Pencil className="w-3 h-3" />
                        )}
                        {isEditing ? "Fermer" : "Modifier"}
                      </button>
                    </div>
                    {/* fin flex principal */}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {!loading && products.length > 0 && (
          <p className="text-center text-xs text-gray-400 mt-8">
            Copie le{" "}
            <span className="font-mono bg-gray-100 px-1 rounded">Price ID</span>{" "}
            et colle-le dans le formulaire de création d&apos;offre.
          </p>
        )}
      </div>
    </div>
  );
}
