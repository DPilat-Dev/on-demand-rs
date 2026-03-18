'use client';

import { useState } from 'react';
import { MediaPickerModal } from './ImageField';

interface Props {
  name: string;
  defaultValue?: string[];
  hint?: string;
}

export function VideoListField({ name, defaultValue = [], hint }: Props) {
  const [videos, setVideos] = useState<string[]>(defaultValue);
  const [inputValue, setInputValue] = useState('');
  const [open, setOpen] = useState(false);

  function add(url: string) {
    const trimmed = url.trim();
    if (trimmed && !videos.includes(trimmed)) {
      setVideos((prev) => [...prev, trimmed]);
    }
  }

  function remove(url: string) {
    setVideos((prev) => prev.filter((v) => v !== url));
  }

  return (
    <div className="space-y-2">
      <input type="hidden" name={name} value={JSON.stringify(videos)} />

      {/* Current list */}
      {videos.length > 0 && (
        <div className="space-y-2">
          {videos.map((url, i) => (
            <div key={i} className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2">
              <span className="text-base flex-shrink-0">🎬</span>
              <span className="flex-1 text-sm text-gray-700 truncate font-mono">{url}</span>
              <button
                type="button"
                onClick={() => remove(url)}
                className="text-xs text-red-500 hover:text-red-700 flex-shrink-0"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}

      {videos.length === 0 && (
        <p className="text-sm text-gray-400 italic">No videos added yet.</p>
      )}

      {/* Add row */}
      <div className="flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); add(inputValue); setInputValue(''); } }}
          placeholder="Paste video URL…"
          className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="button"
          onClick={() => { add(inputValue); setInputValue(''); }}
          className="px-3 py-2 rounded-lg border border-gray-300 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
        >
          Add
        </button>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="px-3 py-2 rounded-lg border border-gray-300 text-sm text-gray-600 hover:bg-gray-50 transition-colors whitespace-nowrap"
        >
          Browse
        </button>
      </div>

      {hint && <p className="text-xs text-gray-400">{hint}</p>}

      {open && (
        <MediaPickerModal
          onSelect={(url) => { add(url); setOpen(false); }}
          onClose={() => setOpen(false)}
        />
      )}
    </div>
  );
}
