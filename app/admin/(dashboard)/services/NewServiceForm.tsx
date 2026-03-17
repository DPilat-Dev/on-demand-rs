'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { createService } from '../actions';

export default function NewServiceForm() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    const fd = new FormData();
    fd.append('name', name);
    startTransition(async () => {
      try {
        const slug = await createService(fd);
        setOpen(false);
        setName('');
        router.push(`/admin/services/${slug}`);
      } catch (err: any) {
        setError(err.message ?? 'Something went wrong');
      }
    });
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors"
      >
        + Add Service
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <input
        autoFocus
        type="text"
        placeholder="Service name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 w-48"
      />
      {error && <span className="text-xs text-red-600">{error}</span>}
      <button
        type="submit"
        disabled={isPending || !name.trim()}
        className="bg-blue-600 text-white px-3 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 disabled:opacity-50 transition-colors"
      >
        {isPending ? 'Creating…' : 'Create'}
      </button>
      <button
        type="button"
        onClick={() => { setOpen(false); setError(''); }}
        className="px-3 py-2 rounded-lg text-sm text-gray-500 hover:text-gray-700"
      >
        Cancel
      </button>
    </form>
  );
}
