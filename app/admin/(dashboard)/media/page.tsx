'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';

interface BlobItem {
  url: string;
  pathname: string;
  size: number;
  uploadedAt: string;
}

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function MediaLibraryPage() {
  const [blobs, setBlobs] = useState<BlobItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState('');
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
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;
    setUploading(true);
    setError('');
    try {
      await Promise.all(
        files.map(async (file) => {
          const fd = new FormData();
          fd.append('file', file);
          const res = await fetch('/api/admin/upload', { method: 'POST', body: fd });
          if (!res.ok) {
            const { error: msg } = await res.json();
            throw new Error(msg);
          }
        })
      );
      await fetchBlobs();
    } catch (err: any) {
      setError(err.message ?? 'Upload failed');
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = '';
    }
  }

  async function handleDelete(url: string) {
    if (!confirm('Delete this image? This cannot be undone.')) return;
    await fetch('/api/admin/media', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url }),
    });
    setBlobs((prev) => prev.filter((b) => b.url !== url));
  }

  function copyUrl(url: string) {
    navigator.clipboard.writeText(url);
    setCopied(url);
    setTimeout(() => setCopied(''), 2000);
  }

  const totalSize = blobs.reduce((sum, b) => sum + b.size, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Media Library</h1>
          <p className="text-sm text-gray-500 mt-1">
            {blobs.length} {blobs.length === 1 ? 'image' : 'images'} · {formatBytes(totalSize)} used
          </p>
        </div>
        <div>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleUpload}
          />
          <button
            onClick={() => fileRef.current?.click()}
            disabled={uploading}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            {uploading ? 'Uploading…' : '+ Upload Images'}
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Drop zone hint */}
      <div
        className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center cursor-pointer hover:border-blue-300 transition-colors"
        onClick={() => fileRef.current?.click()}
      >
        <p className="text-gray-400 text-sm">Click to upload · JPEG, PNG, WebP, GIF, SVG</p>
      </div>

      {loading ? (
        <p className="text-sm text-gray-500 text-center py-12">Loading…</p>
      ) : blobs.length === 0 ? (
        <p className="text-sm text-gray-400 text-center py-8">No images yet. Upload one above.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {blobs.map((blob) => (
            <div
              key={blob.url}
              className="group relative bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
            >
              {/* Thumbnail */}
              <div className="relative aspect-square bg-gray-50">
                <Image
                  src={blob.url}
                  alt={blob.pathname}
                  fill
                  className="object-cover"
                  sizes="200px"
                />
              </div>

              {/* Info bar */}
              <div className="px-2 py-2 border-t border-gray-100">
                <p className="text-xs text-gray-600 truncate font-medium">
                  {blob.pathname.replace('media/', '')}
                </p>
                <p className="text-xs text-gray-400">{formatBytes(blob.size)}</p>
              </div>

              {/* Actions overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                <button
                  onClick={() => copyUrl(blob.url)}
                  className="bg-white text-gray-800 px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-gray-100 transition-colors shadow"
                >
                  {copied === blob.url ? 'Copied!' : 'Copy URL'}
                </button>
                <button
                  onClick={() => handleDelete(blob.url)}
                  className="bg-red-500 text-white px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-red-600 transition-colors shadow"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
