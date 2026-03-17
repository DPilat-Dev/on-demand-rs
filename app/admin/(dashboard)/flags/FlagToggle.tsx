'use client';

import { useTransition, useOptimistic } from 'react';
import { updateFeatureFlag } from '../actions';

export default function FlagToggle({
  flagKey,
  isEnabled,
}: {
  flagKey: string;
  isEnabled: boolean;
}) {
  const [isPending, startTransition] = useTransition();
  const [optimisticEnabled, setOptimisticEnabled] = useOptimistic(isEnabled);

  function toggle() {
    const next = !optimisticEnabled;
    startTransition(async () => {
      setOptimisticEnabled(next);
      await updateFeatureFlag(flagKey, next);
    });
  }

  return (
    <button
      onClick={toggle}
      disabled={isPending}
      aria-label={optimisticEnabled ? 'Disable' : 'Enable'}
      className={`relative inline-flex h-6 w-11 flex-shrink-0 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-60 ${
        optimisticEnabled ? 'bg-blue-600' : 'bg-gray-200'
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200 ${
          optimisticEnabled ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );
}
