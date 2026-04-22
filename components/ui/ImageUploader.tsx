'use client';

import { useRef, useState, useCallback } from 'react';
import { Upload, X, ImageIcon, Loader2 } from 'lucide-react';

interface ImageUploaderProps {
  value?: string;         // Current image URL
  onChange: (url: string | null) => void;
  label?: string;
  hint?: string;
}

export default function ImageUploader({ value, onChange, label = 'Photo de couverture', hint }: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const upload = useCallback(async (file: File) => {
    setError(null);
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append('file', file);
      const res = await fetch('/api/upload', { method: 'POST', body: fd });
      const data = await res.json();
      if (!res.ok || !data.url) throw new Error(data.error || 'Erreur upload');
      onChange(data.url);
    } catch (err: any) {
      setError(err.message || 'Erreur lors du téléversement');
    } finally {
      setUploading(false);
    }
  }, [onChange]);

  const handleFile = (file: File | undefined) => {
    if (!file) return;
    upload(file);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    handleFile(file);
  }, [upload]);

  const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); setDragging(true); };
  const handleDragLeave = () => setDragging(false);

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>

      {value ? (
        /* Preview */
        <div className="relative w-full rounded-xl overflow-hidden border border-gray-200 bg-gray-50" style={{ height: '180px' }}>
          <img src={value} alt="Aperçu" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="px-3 py-1.5 bg-white text-gray-800 text-xs font-semibold rounded-lg shadow hover:bg-gray-50 transition"
            >
              Changer
            </button>
            <button
              type="button"
              onClick={() => onChange(null)}
              className="p-1.5 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          {uploading && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <Loader2 className="w-8 h-8 text-white animate-spin" />
            </div>
          )}
        </div>
      ) : (
        /* Drop zone */
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => inputRef.current?.click()}
          className="relative w-full cursor-pointer rounded-xl border-2 border-dashed transition-all duration-200 flex flex-col items-center justify-center gap-3 py-10"
          style={{
            borderColor: dragging ? '#C9973A' : '#d1d5db',
            background: dragging ? 'rgba(201,151,58,0.06)' : '#fafafa',
          }}
        >
          {uploading ? (
            <>
              <Loader2 className="w-8 h-8 animate-spin" style={{ color: '#C9973A' }} />
              <p className="text-sm text-gray-500">Téléversement en cours…</p>
            </>
          ) : (
            <>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ background: 'rgba(201,151,58,0.12)' }}>
                {dragging ? (
                  <Upload className="w-6 h-6" style={{ color: '#C9973A' }} />
                ) : (
                  <ImageIcon className="w-6 h-6" style={{ color: '#C9973A' }} />
                )}
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-gray-700">
                  {dragging ? 'Déposez l\'image ici' : 'Cliquez ou glissez une image'}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">
                  {hint || 'JPG, PNG, WebP — 5 Mo max'}
                </p>
              </div>
            </>
          )}
        </div>
      )}

      {error && (
        <p className="text-xs text-red-500 flex items-center gap-1">
          <X className="w-3 h-3" /> {error}
        </p>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />
    </div>
  );
}
