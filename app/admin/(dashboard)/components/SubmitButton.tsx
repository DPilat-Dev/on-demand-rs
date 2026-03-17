'use client';

import { useFormStatus } from 'react-dom';
import { useEffect, useRef } from 'react';
import { useToast } from './ToastProvider';

interface Props {
  children?: React.ReactNode;
  className?: string;
  message?: string;
}

export function SubmitButton({
  children = 'Save Changes',
  className = 'bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors disabled:opacity-60',
  message = 'Changes saved!',
}: Props) {
  const { pending } = useFormStatus();
  const { showToast } = useToast();
  const wasPending = useRef(false);

  useEffect(() => {
    if (wasPending.current && !pending) {
      showToast(message);
    }
    wasPending.current = pending;
  }, [pending, message, showToast]);

  return (
    <button type="submit" disabled={pending} className={className}>
      {pending ? 'Saving…' : children}
    </button>
  );
}
