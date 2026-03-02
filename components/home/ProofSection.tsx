import { CheckCircle } from "lucide-react";

const preuves = [
  { icon: "✔", label: "+100 personnes accompagnées" },
  { icon: "✔", label: "Formatrice certifiée" },
  { icon: "✔", label: "Stratégie terrain & résultats concrets" },
];

export default function ProofSection() {
  return (
    <section className="bg-gray-50 border-y border-gray-200 py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16">
          {preuves.map((p, i) => (
            <div key={i} className="flex items-center gap-3 text-gray-800">
              <CheckCircle className="w-5 h-5 text-purple-600 shrink-0" />
              <span className="font-semibold text-sm sm:text-base">
                {p.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
