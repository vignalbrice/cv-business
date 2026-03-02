"use client";

import { useState } from "react";
import { Phone, Mail, Send, Loader2 } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    telephone: "",
    projet: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    // Simulation envoi (à remplacer par une vraie API email)
    await new Promise((r) => setTimeout(r, 1500));
    setStatus("success");
  };

  return (
    <div className="min-h-screen bg-white py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-purple-600 text-sm font-semibold uppercase tracking-widest mb-3">
            Contact
          </p>
          <h1 className="text-4xl sm:text-5xl font-black text-gray-900 mb-6">
            🤝 Je veux être accompagné
          </h1>
          <p className="text-gray-500 max-w-xl mx-auto text-lg leading-relaxed">
            Chaque demande est étudiée avec attention. Les accompagnements se
            font sur sélection afin de garantir un cadre stratégique et des
            résultats concrets.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Infos contact */}
          <div className="space-y-6">
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                  <Phone className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider">
                    Téléphone
                  </p>
                  <a
                    href="tel:+33759505759"
                    className="text-gray-900 font-semibold hover:text-purple-600 transition-colors"
                  >
                    07 59 50 57 59
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                  <Mail className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider">
                    Email
                  </p>
                  <a
                    href="mailto:cvbusiness.ia@gmail.com"
                    className="text-gray-900 font-semibold"
                  >
                    cvbusiness.ia@gmail.com
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-2xl p-6">
              <h3 className="text-gray-900 font-bold mb-3">
                📋 Comment ça marche
              </h3>
              <ol className="space-y-2 text-sm text-gray-500">
                <li className="flex gap-2">
                  <span className="text-purple-600 font-bold shrink-0">1.</span>
                  Tu remplis le formulaire
                </li>
                <li className="flex gap-2">
                  <span className="text-purple-600 font-bold shrink-0">2.</span>
                  J&apos;analyse ta demande sous 48h
                </li>
                <li className="flex gap-2">
                  <span className="text-purple-600 font-bold shrink-0">3.</span>
                  Si c&apos;est un match, on planifie un appel
                </li>
                <li className="flex gap-2">
                  <span className="text-purple-600 font-bold shrink-0">4.</span>
                  On construit ensemble ta stratégie
                </li>
              </ol>
            </div>
          </div>

          {/* Formulaire */}
          <div className="lg:col-span-2">
            {status === "success" ? (
              <div className="bg-green-50 border border-green-200 rounded-2xl p-12 text-center">
                <div className="text-5xl mb-4">✅</div>
                <h2 className="text-2xl font-black text-gray-900 mb-3">
                  Message envoyé !
                </h2>
                <p className="text-gray-500">
                  Je reviendrai vers toi dans les 48h. Prépare-toi — on va
                  construire quelque chose de grand ensemble.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-gray-50 border border-gray-200 rounded-2xl p-8 space-y-6"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nom complet *
                    </label>
                    <input
                      type="text"
                      name="nom"
                      required
                      value={formData.nom}
                      onChange={handleChange}
                      placeholder="Ton prénom et nom"
                      className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="ton@email.com"
                      className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    name="telephone"
                    value={formData.telephone}
                    onChange={handleChange}
                    placeholder="06 00 00 00 00"
                    className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ton projet / besoin *
                  </label>
                  <select
                    name="projet"
                    required
                    value={formData.projet}
                    onChange={handleChange}
                    className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-purple-500 transition-colors text-sm"
                  >
                    <option value="">Sélectionne une option</option>
                    <option value="sba">Social Boss Academy</option>
                    <option value="sba-1to1">
                      SBA 1:1 — Accompagnement sur mesure
                    </option>
                    <option value="prompt-boss">Prompt Boss</option>
                    <option value="empire">Empire financier</option>
                    <option value="autre">Autre</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Décris ta situation et tes objectifs *
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Parle-moi de toi, de ton business actuel, de tes blocages et de ce que tu veux accomplir..."
                    className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors text-sm resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full py-4 bg-linear-to-r from-purple-600 to-purple-800 text-white font-bold rounded-xl hover:from-purple-700 hover:to-purple-900 transition-all duration-200 shadow-lg hover:shadow-purple-500/30 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Envoyer ma demande
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
