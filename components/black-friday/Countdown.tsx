"use client";

import { useEffect, useState } from "react";

type Remaining = { j: number; h: number; m: number; s: number; fini: boolean };

function remaining(target: number): Remaining {
  const ms = Math.max(0, target - Date.now());
  return {
    j: Math.floor(ms / 86_400_000),
    h: Math.floor(ms / 3_600_000) % 24,
    m: Math.floor(ms / 60_000) % 60,
    s: Math.floor(ms / 1000) % 60,
    fini: ms === 0,
  };
}

const pad = (n: number) => String(n).padStart(2, "0");

export default function Countdown({ dateFin }: Readonly<{ dateFin: string }>) {
  const target = new Date(dateFin).getTime();
  // null tant que le composant n'est pas monté : évite un écart d'hydratation.
  const [t, setT] = useState<Remaining | null>(null);

  useEffect(() => {
    const tick = () => setT(remaining(target));
    const first = setTimeout(tick, 0);
    const id = setInterval(tick, 1000);
    return () => {
      clearTimeout(first);
      clearInterval(id);
    };
  }, [target]);

  if (t?.fini) {
    return (
      <p className="text-amber-400 font-semibold">
        L&apos;offre Black Friday est terminée.
      </p>
    );
  }

  const blocs = [
    { label: "jours", value: t?.j },
    { label: "heures", value: t?.h },
    { label: "min", value: t?.m },
    { label: "sec", value: t?.s },
  ];

  return (
    <div
      className="flex justify-center gap-2 sm:gap-3"
      role="timer"
      aria-label="Temps restant avant la fin de l'offre"
    >
      {blocs.map((b) => (
        <div
          key={b.label}
          className="w-16 sm:w-20 py-3 bg-white/5 border border-white/10 rounded-xl text-center"
        >
          <div className="text-2xl sm:text-3xl font-black text-white tabular-nums">
            {b.value === undefined ? "--" : pad(b.value)}
          </div>
          <div className="text-[10px] sm:text-xs uppercase tracking-wider text-gray-400">
            {b.label}
          </div>
        </div>
      ))}
    </div>
  );
}
