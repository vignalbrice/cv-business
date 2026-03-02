"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Phone, Mail, Send, Loader2 } from "lucide-react";

const contactSchema = z.object({
  nom: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Adresse email invalide"),
  telephone: z
    .string()
    .regex(/^(\+33|0)[1-9](\s?\d{2}){4}$/, "Numéro de téléphone invalide")
    .or(z.literal(""))
    .optional(),
  projet: z.enum(["sba", "sba-1to1", "prompt-boss", "empire", "autre"], {
    message: "Sélectionne une option",
  }),
  message: z
    .string()
    .min(20, "Le message doit contenir au moins 20 caractères"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const inputClass =
  "w-full bg-white border rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none transition-colors text-sm";
const inputValid = "border-gray-300 focus:border-purple-500";
const inputError = "border-red-400 focus:border-red-500 bg-red-50";

export default function ContactPage() {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onSubmit = async (data: ContactFormData) => {
    setStatus("loading");
    setErrorMessage(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const json = await res.json();
        throw new Error(json.error ?? "Erreur inconnue");
      }
      setStatus("success");
    } catch (e) {
      setErrorMessage(
        e instanceof Error ? e.message : "Une erreur est survenue. Réessaie.",
      );
      setStatus("error");
    }
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
                onSubmit={handleSubmit(onSubmit)}
                className="bg-gray-50 border border-gray-200 rounded-2xl p-8 space-y-6"
              >
                {status === "error" && errorMessage && (
                  <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-700 flex items-start gap-2">
                    <span className="shrink-0">⚠️</span>
                    <span>{errorMessage}</span>
                  </div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Nom */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nom complet *
                    </label>
                    <input
                      {...register("nom")}
                      type="text"
                      placeholder="Ton prénom et nom"
                      className={`${inputClass} ${errors.nom ? inputError : inputValid}`}
                    />
                    {errors.nom && (
                      <p className="mt-1.5 text-xs text-red-600">
                        {errors.nom.message}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      {...register("email")}
                      type="email"
                      placeholder="ton@email.com"
                      className={`${inputClass} ${errors.email ? inputError : inputValid}`}
                    />
                    {errors.email && (
                      <p className="mt-1.5 text-xs text-red-600">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Téléphone */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Téléphone{" "}
                    <span className="text-gray-400 font-normal">
                      (optionnel)
                    </span>
                  </label>
                  <input
                    {...register("telephone")}
                    type="tel"
                    placeholder="06 00 00 00 00"
                    className={`${inputClass} ${errors.telephone ? inputError : inputValid}`}
                  />
                  {errors.telephone && (
                    <p className="mt-1.5 text-xs text-red-600">
                      {errors.telephone.message}
                    </p>
                  )}
                </div>

                {/* Projet */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ton projet / besoin *
                  </label>
                  <select
                    {...register("projet")}
                    className={`${inputClass} bg-white ${errors.projet ? inputError : inputValid}`}
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
                  {errors.projet && (
                    <p className="mt-1.5 text-xs text-red-600">
                      {errors.projet.message}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Décris ta situation et tes objectifs *
                  </label>
                  <textarea
                    {...register("message")}
                    rows={5}
                    placeholder="Parle-moi de toi, de ton business actuel, de tes blocages et de ce que tu veux accomplir..."
                    className={`${inputClass} resize-none ${errors.message ? inputError : inputValid}`}
                  />
                  {errors.message && (
                    <p className="mt-1.5 text-xs text-red-600">
                      {errors.message.message}
                    </p>
                  )}
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
