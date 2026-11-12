"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Lock } from "lucide-react";
import { BLACK_FRIDAY } from "@/lib/black-friday";

const reservationSchema = z.object({
  nom: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Adresse email invalide"),
  telephone: z
    .string()
    .regex(/^(\+33|0)[1-9](\s?\d{2}){4}$/, "Numéro de téléphone invalide"),
  activite: z.string().min(2, "Indique ton activité"),
  message: z
    .string()
    .min(20, "Décris ton besoin en quelques mots (20 caractères minimum)"),
});

type ReservationData = z.infer<typeof reservationSchema>;

const inputClass =
  "w-full bg-white border rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none transition-colors text-sm";
const inputValid = "border-gray-300 focus:border-purple-500";
const inputError = "border-red-400 focus:border-red-500 bg-red-50";

function FieldError({ message }: Readonly<{ message?: string }>) {
  if (!message) return null;
  return <p className="mt-1.5 text-xs text-red-600">{message}</p>;
}

export default function ReservationForm() {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ReservationData>({
    resolver: zodResolver(reservationSchema),
  });

  const onSubmit = async (data: ReservationData) => {
    setStatus("loading");
    setErrorMessage(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nom: data.nom,
          email: data.email,
          telephone: data.telephone,
          projet: "site-vitrine-bf",
          message: `Activité : ${data.activite}\n\n${data.message}`,
        }),
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

  if (status === "success") {
    return (
      <div className="bg-green-50 border border-green-200 rounded-2xl p-10 text-center">
        <div className="text-5xl mb-4">🎉</div>
        <h3 className="text-2xl font-black text-gray-900 mb-3">
          Demande de réservation envoyée !
        </h3>
        <p className="text-gray-600">
          Je te recontacte très vite pour confirmer ta place et lancer ton site.
          Un email de confirmation vient de t&apos;être envoyé.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 space-y-5 shadow-xl"
      noValidate
    >
      {status === "error" && errorMessage && (
        <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-700 flex items-start gap-2">
          <span className="shrink-0">⚠️</span>
          <span>{errorMessage}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="bf-nom" className="block text-sm font-medium text-gray-700 mb-2">
            Nom complet *
          </label>
          <input
            id="bf-nom"
            {...register("nom")}
            type="text"
            autoComplete="name"
            placeholder="Ton prénom et nom"
            className={`${inputClass} ${errors.nom ? inputError : inputValid}`}
          />
          <FieldError message={errors.nom?.message} />
        </div>
        <div>
          <label htmlFor="bf-email" className="block text-sm font-medium text-gray-700 mb-2">
            Email *
          </label>
          <input
            id="bf-email"
            {...register("email")}
            type="email"
            autoComplete="email"
            placeholder="ton@email.com"
            className={`${inputClass} ${errors.email ? inputError : inputValid}`}
          />
          <FieldError message={errors.email?.message} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="bf-tel" className="block text-sm font-medium text-gray-700 mb-2">
            Téléphone *
          </label>
          <input
            id="bf-tel"
            {...register("telephone")}
            type="tel"
            autoComplete="tel"
            placeholder="06 00 00 00 00"
            className={`${inputClass} ${errors.telephone ? inputError : inputValid}`}
          />
          <FieldError message={errors.telephone?.message} />
        </div>
        <div>
          <label htmlFor="bf-activite" className="block text-sm font-medium text-gray-700 mb-2">
            Ton activité *
          </label>
          <input
            id="bf-activite"
            {...register("activite")}
            type="text"
            placeholder="Ex : coach sportif, boulangerie, avocate…"
            className={`${inputClass} ${errors.activite ? inputError : inputValid}`}
          />
          <FieldError message={errors.activite?.message} />
        </div>
      </div>

      <div>
        <label htmlFor="bf-message" className="block text-sm font-medium text-gray-700 mb-2">
          Ton projet de site *
        </label>
        <textarea
          id="bf-message"
          {...register("message")}
          rows={4}
          placeholder="Ce que tu veux mettre en avant, tes couleurs, un site que tu aimes, tes délais…"
          className={`${inputClass} resize-none ${errors.message ? inputError : inputValid}`}
        />
        <FieldError message={errors.message?.message} />
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full py-4 bg-linear-to-r from-yellow-400 to-amber-500 text-black font-black rounded-xl hover:from-yellow-500 hover:to-amber-600 transition-all duration-200 shadow-lg hover:shadow-yellow-400/30 flex items-center justify-center gap-2 disabled:opacity-50 text-lg"
      >
        {status === "loading" ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Envoi en cours...
          </>
        ) : (
          <>🔥 Je réserve ma place à {BLACK_FRIDAY.prixPromo} €</>
        )}
      </button>

      <p className="flex items-center justify-center gap-1.5 text-xs text-gray-400">
        <Lock className="w-3.5 h-3.5" />
        Aucun paiement maintenant — je te recontacte pour valider ta place.
      </p>
    </form>
  );
}
