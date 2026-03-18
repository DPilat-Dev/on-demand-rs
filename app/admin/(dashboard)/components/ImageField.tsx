'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { upload } from '@vercel/blob/client';

interface BlobItem {
  url: string;
  pathname: string;
  size: number;
  uploadedAt: string;
}

export function ImageField({
  label,
  name,
  defaultValue = '',
  hint,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  hint?: string;
}) {
  const [value, setValue] = useState(defaultValue);
  const [open, setOpen] = useState(false);

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div className="flex gap-2">
        <input
          type="hidden"
          name={name}
          value={value}
        />
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="https://... or /content/..."
          className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="px-3 py-2 rounded-lg border border-gray-300 text-sm text-gray-600 hover:bg-gray-50 transition-colors whitespace-nowrap"
        >
          Browse
        </button>
      </div>
      {value && (
        <div className="mt-2 relative w-32 h-20 rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
          <Image
            src={value}
            alt="Preview"
            fill
            className="object-cover"
            unoptimized={value.startsWith('http') && !value.includes(process.env.NEXT_PUBLIC_SITE_URL ?? 'localhost')}
            onError={() => {}}
          />
        </div>
      )}
      {hint && <p className="text-xs text-gray-400 mt-1">{hint}</p>}

      {open && (
        <MediaPickerModal
          onSelect={(url) => { setValue(url); setOpen(false); }}
          onClose={() => setOpen(false)}
        />
      )}
    </div>
  );
}

// ─── Media Picker Modal ───────────────────────────────────────────────────────

const VIDEO_EXTS = /\.(mp4|webm|mov)$/i;
const isVideoBlob = (pathname: string) => VIDEO_EXTS.test(pathname);

export function MediaPickerModal({
  onSelect,
  onClose,
}: {
  onSelect: (url: string) => void;
  onClose: () => void;
}) {
  const [blobs, setBlobs] = useState<BlobItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  const fetchBlobs = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/media');
      const data = await res.json();
      setBlobs(data.blobs ?? []);
    } catch {
      setError('Failed to load media library');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchBlobs(); }, [fetchBlobs]);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError('');
    try {
      const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '-').toLowerCase();
      await upload(`content/${safeName}`, file, {
        access: 'public',
        handleUploadUrl: '/api/admin/upload',
      });
      await fetchBlobs();
    } catch (err: any) {
      setError(err.message ?? 'Upload failed');
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = '';
    }
  }

  async function handleDelete(url: string) {
    if (!confirm('Delete this image?')) return;
    await fetch('/api/admin/media', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url }),
    });
    setBlobs((prev) => prev.filter((b) => b.url !== url));
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Media Library</h2>
          <div className="flex items-center gap-3">
            <input
              ref={fileRef}
              type="file"
              accept="image/*,video/mp4,video/webm,video/quicktime"
              className="hidden"
              onChange={handleUpload}
            />
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              disabled={uploading}
              className="bg-blue-600 text-white px-4 py-1.5 rounded-lg text-sm font-semibold hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              {uploading ? 'Uploading…' : '+ Upload'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-xl leading-none"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6">
          {error && (
            <p className="text-sm text-red-600 mb-4">{error}</p>
          )}
          {loading ? (
            <p className="text-sm text-gray-500 text-center py-12">Loading…</p>
          ) : blobs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-400 text-sm mb-3">No images uploaded yet.</p>
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="text-blue-600 text-sm hover:underline"
              >
                Upload your first image
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
              {blobs.map((blob) => (
                <div
                  key={blob.url}
                  className="group relative rounded-lg overflow-hidden border border-gray-200 cursor-pointer hover:border-blue-400 transition-colors aspect-square bg-gray-50"
                  onClick={() => onSelect(blob.url)}
                >
                  {isVideoBlob(blob.pathname) ? (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900 gap-1">
                      <span className="text-3xl">🎬</span>
                      <p className="text-white text-xs px-2 truncate w-full text-center">
                        {blob.pathname.split('/').pop()}
                      </p>
                    </div>
                  ) : (
                    <Image
                      src={blob.url}
                      alt={blob.pathname}
                      fill
                      className="object-cover"
                      sizes="150px"
                    />
                  )}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); handleDelete(blob.url); }}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs items-center justify-center hidden group-hover:flex"
                  >
                    ✕
                  </button>
                  <div className="absolute bottom-0 left-0 right-0 bg-black/60 px-2 py-1 hidden group-hover:block">
                    <p className="text-white text-xs truncate">
                      {blob.pathname.replace('media/', '')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
