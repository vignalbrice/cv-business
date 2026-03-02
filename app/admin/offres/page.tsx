"use client";

import { Offre } from "@/lib/offres";
import { useState, useEffect, useCallback } from "react";
import OffreForm from "@/components/admin/OffreForm";
import {
  Plus,
  Pencil,
  Trash2,
  Eye,
  EyeOff,
  AlertTriangle,
  CheckCircle,
  Lock,
} from "lucide-react";
import Link from "next/link";

export default function AdminOffresPage() {
  const [token, setToken] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("admin_token") || "";
    }
    return "";
  });
  const [inputToken, setInputToken] = useState("");
  const [authenticated, setAuthenticated] = useState(() => {
    if (typeof window !== "undefined") {
      return !!localStorage.getItem("admin_token");
    }
    return false;
  });
  const [offres, setOffres] = useState<Offre[]>([]);
  const [editingOffre, setEditingOffre] = useState<Offre | null>(null);
  const [creating, setCreating] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const showMessage = (type: "success" | "error", text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 4000);
  };

  const fetchOffres = useCallback(async (t: string) => {
    const res = await fetch("/api/offres", {
      headers: { "x-admin-token": t },
    });
    if (res.ok) {
      const data: Offre[] = await res.json();
      // Use functional update to avoid stale closure
      setOffres(() => data);
    }
  }, []);

  useEffect(() => {
    if (!token || !authenticated) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchOffres(token); // fetch external data, sets state in callback — valid pattern
  }, [token, authenticated, fetchOffres]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("/api/offres", {
      headers: { "x-admin-token": inputToken },
    });
    if (res.ok) {
      localStorage.setItem("admin_token", inputToken);
      setToken(inputToken);
      setAuthenticated(true);
      const data = await res.json();
      setOffres(data);
      showMessage("success", "Connecté avec succès !");
    } else {
      showMessage("error", "Token invalide.");
    }
    setLoading(false);
  };

  const handleUpdate = async (data: Partial<Offre>) => {
    if (!editingOffre) return;
    setLoading(true);
    const res = await fetch("/api/offres", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-admin-token": token,
      },
      body: JSON.stringify({ id: editingOffre.id, ...data }),
    });
    if (res.ok) {
      await fetchOffres(token);
      setEditingOffre(null);
      showMessage("success", "Offre mise à jour !");
    } else {
      showMessage("error", "Erreur lors de la mise à jour.");
    }
    setLoading(false);
  };

  const handleCreate = async (data: Partial<Offre>) => {
    setLoading(true);
    const res = await fetch("/api/offres", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-admin-token": token,
      },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      await fetchOffres(token);
      setCreating(false);
      showMessage("success", "Offre créée !");
    } else {
      showMessage("error", "Erreur lors de la création.");
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    setLoading(true);
    const res = await fetch("/api/offres", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-admin-token": token,
      },
      body: JSON.stringify({ id }),
    });
    if (res.ok) {
      await fetchOffres(token);
      setDeleteConfirm(null);
      showMessage("success", "Offre supprimée.");
    } else {
      showMessage("error", "Erreur lors de la suppression.");
    }
    setLoading(false);
  };

  const handleToggleActif = async (offre: Offre) => {
    setLoading(true);
    await fetch("/api/offres", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-admin-token": token,
      },
      body: JSON.stringify({ id: offre.id, actif: !offre.actif }),
    });
    await fetchOffres(token);
    setLoading(false);
  };

  const couleurDot: Record<string, string> = {
    violet: "bg-purple-500",
    bleu: "bg-blue-500",
    jaune: "bg-yellow-400",
    rose: "bg-pink-500",
    vert: "bg-green-500",
  };

  // Page de login
  if (!authenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <div className="w-14 h-14 bg-purple-100 border border-purple-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Lock className="w-7 h-7 text-purple-600" />
            </div>
            <h1 className="text-2xl font-black text-gray-900">
              Admin — CoachIA
            </h1>
            <p className="text-gray-500 text-sm mt-2">
              Accès réservé à l&apos;administrateur
            </p>
          </div>

          <form
            onSubmit={handleLogin}
            className="bg-white border border-gray-200 rounded-2xl p-8 space-y-4 shadow-sm"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Token d&apos;accès
              </label>
              <input
                type="password"
                value={inputToken}
                onChange={(e) => setInputToken(e.target.value)}
                placeholder="••••••••••••"
                required
                className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-purple-500 transition-colors text-sm"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-linear-to-r from-purple-600 to-purple-800 text-white font-bold rounded-xl hover:from-purple-700 hover:to-purple-900 transition-all"
            >
              Se connecter
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-3xl font-black text-gray-900">
              🛠️ Gestion des offres
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Modifier, créer ou désactiver tes offres
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/admin/stripe-products"
              className="flex items-center gap-2 px-4 py-3 border border-purple-200 text-purple-700 bg-purple-50 font-semibold rounded-xl hover:bg-purple-100 transition-all text-sm"
            >
              🏷️ Produits Stripe
            </Link>
            <button
              onClick={() => {
                setCreating(true);
                setEditingOffre(null);
              }}
              className="flex items-center gap-2 px-5 py-3 bg-linear-to-r from-purple-600 to-purple-800 text-white font-bold rounded-xl hover:from-purple-700 hover:to-purple-900 transition-all shadow-lg"
            >
              <Plus className="w-4 h-4" />
              Nouvelle offre
            </button>
          </div>
        </div>

        {/* Message */}
        {message && (
          <div
            className={`flex items-center gap-3 px-5 py-4 rounded-xl mb-6 text-sm font-medium ${
              message.type === "success"
                ? "bg-green-50 border border-green-200 text-green-700"
                : "bg-red-50 border border-red-200 text-red-700"
            }`}
          >
            {message.type === "success" ? (
              <CheckCircle className="w-4 h-4 shrink-0" />
            ) : (
              <AlertTriangle className="w-4 h-4 shrink-0" />
            )}
            {message.text}
          </div>
        )}

        {/* Formulaire création */}
        {creating && (
          <div className="bg-white border border-purple-200 rounded-2xl p-8 mb-8 shadow-sm">
            <h2 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-2">
              <Plus className="w-5 h-5 text-purple-600" />
              Créer une nouvelle offre
            </h2>
            <OffreForm
              onSave={handleCreate}
              onCancel={() => setCreating(false)}
              loading={loading}
            />
          </div>
        )}

        {/* Liste des offres */}
        <div className="space-y-4">
          {offres.map((offre) => (
            <div key={offre.id}>
              {editingOffre?.id === offre.id ? (
                <div className="bg-white border border-purple-200 rounded-2xl p-8 shadow-sm">
                  <h2 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-2">
                    <Pencil className="w-5 h-5 text-purple-600" />
                    Modifier — {offre.titre}
                  </h2>
                  <OffreForm
                    offre={offre}
                    onSave={handleUpdate}
                    onCancel={() => setEditingOffre(null)}
                    loading={loading}
                  />
                </div>
              ) : (
                <div
                  className={`bg-white border rounded-2xl p-6 flex items-center justify-between gap-4 transition-all shadow-sm ${
                    offre.actif
                      ? "border-gray-200"
                      : "border-gray-100 opacity-50"
                  }`}
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <div
                      className={`w-3 h-3 rounded-full shrink-0 ${
                        couleurDot[offre.couleur] || "bg-gray-500"
                      }`}
                    />
                    <div className="min-w-0">
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className="text-gray-900 font-bold">
                          {offre.titre}
                        </span>
                        <span className="text-xs text-gray-400">
                          {offre.badge}
                        </span>
                        {!offre.actif && (
                          <span className="text-xs bg-red-50 text-red-600 px-2 py-0.5 rounded-full border border-red-200">
                            Inactif
                          </span>
                        )}
                      </div>
                      <p className="text-gray-500 text-sm truncate">
                        {offre.sousTitre}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-purple-600 font-bold text-sm hidden sm:block">
                      {offre.prixAffiche}
                    </span>

                    {/* Toggle actif */}
                    <button
                      onClick={() => handleToggleActif(offre)}
                      title={offre.actif ? "Désactiver" : "Activer"}
                      className="p-2 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-all"
                    >
                      {offre.actif ? (
                        <Eye className="w-4 h-4" />
                      ) : (
                        <EyeOff className="w-4 h-4" />
                      )}
                    </button>

                    {/* Modifier */}
                    <button
                      onClick={() => {
                        setEditingOffre(offre);
                        setCreating(false);
                      }}
                      className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>

                    {/* Supprimer */}
                    {deleteConfirm === offre.id ? (
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-red-600">
                          Confirmer ?
                        </span>
                        <button
                          onClick={() => handleDelete(offre.id)}
                          className="px-3 py-1 bg-red-600 text-white text-xs rounded-lg hover:bg-red-700 transition-all"
                        >
                          Oui
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(null)}
                          className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-lg"
                        >
                          Non
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setDeleteConfirm(offre.id)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {offres.length === 0 && !creating && (
          <div className="text-center py-20 text-gray-400">
            <p className="text-4xl mb-4">📦</p>
            <p>Aucune offre pour l&apos;instant.</p>
          </div>
        )}

        {/* Logout */}
        <div className="mt-12 text-center">
          <button
            onClick={() => {
              localStorage.removeItem("admin_token");
              setAuthenticated(false);
              setToken("");
            }}
            className="text-sm text-gray-400 hover:text-gray-700 transition-colors"
          >
            Se déconnecter
          </button>
        </div>
      </div>
    </div>
  );
}
