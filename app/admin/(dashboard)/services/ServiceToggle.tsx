'use client';

import { useTransition, useOptimistic } from 'react';
import { toggleServiceEnabled } from '../actions';

export default function ServiceToggle({
  id,
  slug,
  isEnabled,
}: {
  id: string;
  slug: string;
  isEnabled: boolean;
}) {
  const [isPending, startTransition] = useTransition();
  const [optimistic, setOptimistic] = useOptimistic(isEnabled);

  function toggle() {
    const next = !optimistic;
    startTransition(async () => {
      setOptimistic(next);
      await toggleServiceEnabled(id, slug, next);
    });
  }

  return (
    <button
      onClick={toggle}
      disabled={isPending}
      aria-label={optimistic ? 'Hide service' : 'Show service'}
      className={`relative inline-flex h-6 w-11 flex-shrink-0 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-60 ${
        optimistic ? 'bg-blue-600' : 'bg-gray-200'
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200 ${
          optimistic ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );
}
