// Configuration de l'offre Black Friday — Site vitrine clé en main en 48h.
// Mets à jour PLACES_RESTANTES à la main à chaque réservation confirmée :
// à 0, le formulaire est remplacé par un message « offre complète ».

export const BLACK_FRIDAY = {
  prixPromo: 550,
  prixNormal: 750,
  placesTotal: 5,
  placesRestantes: 5,
  // Fin de l'offre (heure de Paris) — affichée dans le compte à rebours.
  dateFin: "2026-11-30T23:59:59+01:00",
} as const;

export const economie = BLACK_FRIDAY.prixNormal - BLACK_FRIDAY.prixPromo;
export const remisePourcent = Math.round(
  (economie / BLACK_FRIDAY.prixNormal) * 100,
);
