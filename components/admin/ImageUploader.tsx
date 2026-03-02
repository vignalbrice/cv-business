"use client";

import { useRef, useState, DragEvent } from "react";
import Image from "next/image";
import {
  Upload,
  X,
  Link2,
  Loader2,
  ImageIcon,
  CheckCircle,
} from "lucide-react";

interface ImageUploaderProps {
  value: string; // URL actuelle (vide ou URL)
  onChange: (url: string) => void;
  adminToken: string;
  className?: string;
}

export default function ImageUploader({
  value,
  onChange,
  adminToken,
  className = "",
}: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [mode, setMode] = useState<"upload" | "url">("upload");
  const [urlInput, setUrlInput] = useState(value);
  // URL locale pour le preview (chemin relatif /uploads/...)
  const [previewUrl, setPreviewUrl] = useState(value);
  // Indique si l'image a bien été hébergée sur Stripe
  const [stripeHosted, setStripeHosted] = useState(
    value.startsWith("https://files.stripe.com"),
  );

  const uploadFile = async (file: File) => {
    setUploading(true);
    setUploadError(null);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload", {
        method: "POST",
        headers: { "x-admin-token": adminToken },
        body: fd,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erreur d'upload");
      // Preview local (fonctionne immédiatement en dev)
      setPreviewUrl(data.url);
      setStripeHosted(!!data.stripeUrl);
      // On transmet l'URL Stripe si dispo (visible dans le dashboard Stripe)
      onChange(data.stripeUrl ?? data.url);
    } catch (e) {
      setUploadError(e instanceof Error ? e.message : "Erreur inconnue");
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) uploadFile(file);
    // Reset input pour permettre re-sélection du même fichier
    e.target.value = "";
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) uploadFile(file);
  };

  const handleUrlConfirm = () => {
    onChange(urlInput);
    setMode("upload");
  };

  const inputClass =
    "w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors text-sm";

  return (
    <div className={`space-y-3 ${className}`}>
      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 rounded-xl p-1 w-fit">
        <button
          type="button"
          onClick={() => setMode("upload")}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            mode === "upload"
              ? "bg-white text-gray-900 shadow-sm"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          <Upload className="w-3.5 h-3.5" />
          Uploader
        </button>
        <button
          type="button"
          onClick={() => {
            setMode("url");
            setUrlInput(value);
          }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            mode === "url"
              ? "bg-white text-gray-900 shadow-sm"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          <Link2 className="w-3.5 h-3.5" />
          URL externe
        </button>
      </div>

      {/* Mode Upload */}
      {mode === "upload" && (
        <div>
          {value || previewUrl ? (
            /* Preview avec remplacement */
            <div className="flex items-start gap-4">
              <div className="relative w-24 h-24 rounded-xl overflow-hidden border border-gray-200 shrink-0 bg-gray-50">
                <Image
                  src={previewUrl || value}
                  alt="Image produit"
                  fill
                  className="object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
                {uploading && (
                  <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
                    <Loader2 className="w-5 h-5 animate-spin text-purple-600" />
                  </div>
                )}
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-1.5 text-green-600 text-xs font-medium">
                  <CheckCircle className="w-3.5 h-3.5" />
                  Image associée
                </div>
                {/* Badge Stripe hébergé */}
                {stripeHosted && (
                  <div className="flex items-center gap-1 text-xs text-purple-600 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500 inline-block" />
                    Hébergée sur Stripe
                  </div>
                )}
                <p className="text-xs text-gray-400 font-mono truncate max-w-50">
                  {previewUrl || value}
                </p>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => inputRef.current?.click()}
                    disabled={uploading}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-50 border border-purple-200 text-purple-700 rounded-lg text-xs font-medium hover:bg-purple-100 transition-all disabled:opacity-50"
                  >
                    {uploading ? (
                      <Loader2 className="w-3 h-3 animate-spin" />
                    ) : (
                      <Upload className="w-3 h-3" />
                    )}
                    Remplacer
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      onChange("");
                      setPreviewUrl("");
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 border border-red-200 text-red-600 rounded-lg text-xs font-medium hover:bg-red-100 transition-all"
                  >
                    <X className="w-3 h-3" />
                    Supprimer
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Zone de drop */
            <div
              onClick={() => !uploading && inputRef.current?.click()}
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              className={`relative flex flex-col items-center justify-center gap-3 border-2 border-dashed rounded-xl p-8 cursor-pointer transition-all ${
                dragOver
                  ? "border-purple-400 bg-purple-50"
                  : uploading
                    ? "border-gray-200 bg-gray-50 cursor-wait"
                    : "border-gray-300 hover:border-purple-400 hover:bg-purple-50/50"
              }`}
            >
              {uploading ? (
                <>
                  <Loader2 className="w-8 h-8 text-purple-400 animate-spin" />
                  <p className="text-sm text-gray-500">Upload en cours...</p>
                </>
              ) : (
                <>
                  <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center">
                    <ImageIcon className="w-6 h-6 text-gray-400" />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium text-gray-700">
                      Glisse une image ici
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      ou{" "}
                      <span className="text-purple-600 underline">
                        clique pour choisir
                      </span>
                    </p>
                  </div>
                  <p className="text-xs text-gray-400">
                    JPG, PNG, WebP — max 5 Mo
                  </p>
                </>
              )}
            </div>
          )}

          {/* Input file caché */}
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      )}

      {/* Mode URL externe */}
      {mode === "url" && (
        <div className="space-y-3">
          <input
            type="url"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder="https://exemple.com/image.jpg"
            className={inputClass}
          />
          {urlInput && (
            <div className="w-24 h-24 rounded-xl overflow-hidden border border-gray-200 bg-gray-50">
              <Image
                src={urlInput}
                alt="Aperçu"
                width={96}
                height={96}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            </div>
          )}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleUrlConfirm}
              className="flex items-center gap-1.5 px-4 py-2 bg-purple-600 text-white rounded-xl text-sm font-semibold hover:bg-purple-700 transition-all"
            >
              <CheckCircle className="w-3.5 h-3.5" />
              Utiliser cette URL
            </button>
            {value && (
              <button
                type="button"
                onClick={() => {
                  setMode("upload");
                  setUrlInput(value);
                }}
                className="px-4 py-2 border border-gray-300 text-gray-600 rounded-xl text-sm hover:bg-gray-50 transition-all"
              >
                Annuler
              </button>
            )}
          </div>
        </div>
      )}

      {/* Erreur upload */}
      {uploadError && (
        <div className="flex items-start gap-2 bg-red-50 border border-red-200 text-red-700 rounded-xl px-3 py-2.5 text-xs">
          <X className="w-3.5 h-3.5 shrink-0 mt-0.5" />
          {uploadError}
        </div>
      )}
    </div>
  );
}
