import Link from "next/link";
import { Zap, Instagram, Linkedin, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 text-gray-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="my-4">
          <Link
            href="/admin/offres"
            className="text-gray-900 font-semibold mb-4 text-sm uppercase tracking-wider underline hover:text-purple-600 transition-colors"
          >
            Espace Administrateur
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-linear-to-br from-purple-500 to-purple-700 rounded-lg flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-gray-900 text-lg">
                <span className="text-purple-600">CV</span>Business
              </span>
            </Link>
            <p className="text-sm leading-relaxed max-w-xs">
              Architecte de croissance digitale. Je transforme l&apos;IA en
              machine à croissance pour les marques et entrepreneurs ambitieux.
            </p>
            <div className="flex items-center gap-4 mt-6">
              <a href="#" className="hover:text-purple-600 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-purple-600 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-purple-600 transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-gray-900 font-semibold mb-4 text-sm uppercase tracking-wider">
              Navigation
            </h3>
            <ul className="space-y-2 text-sm">
              {[
                { href: "/a-propos", label: "À propos" },
                { href: "/offres", label: "Offres" },
                { href: "/prompt-boss", label: "Prompt Boss" },
                { href: "/empire-financier", label: "Empire financier" },
                { href: "/temoignages", label: "Témoignages" },
                { href: "/contact", label: "Contact" },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="hover:text-purple-600 transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-gray-900 font-semibold mb-4 text-sm uppercase tracking-wider">
              Contact
            </h3>
            <ul className="space-y-3 text-sm">
              <li>📞 07 59 50 57 59</li>
              <li>
                <Link
                  href="/contact"
                  className="text-purple-600 hover:text-purple-700 transition-colors"
                >
                  Formulaire de contact →
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
          <p>© {new Date().getFullYear()} CVBusiness. Tous droits réservés.</p>
          <div className="flex gap-6">
            <Link
              href="/mentions-legales"
              className="hover:text-gray-900 transition-colors"
            >
              Mentions légales
            </Link>
            <Link
              href="/confidentialite"
              className="hover:text-white transition-colors"
            >
              Confidentialité
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
