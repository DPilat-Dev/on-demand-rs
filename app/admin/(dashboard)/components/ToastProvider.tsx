'use client';

import { createContext, useContext, useState, useCallback } from 'react';

interface ToastContextValue {
  showToast: (message?: string) => void;
}

const ToastContext = createContext<ToastContextValue>({ showToast: () => {} });

export function useToast() {
  return useContext(ToastContext);
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toast, setToast] = useState<{ message: string; id: number } | null>(null);

  const showToast = useCallback((message = 'Changes saved!') => {
    const id = Date.now();
    setToast({ message, id });
    setTimeout(() => setToast((t) => (t?.id === id ? null : t)), 3000);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && (
        <div
          key={toast.id}
          className="fixed bottom-6 right-6 z-50 animate-toast-in"
        >
          <div className="bg-gray-900 text-white px-5 py-3 rounded-xl shadow-xl flex items-center gap-3">
            <span className="text-green-400 text-base">✓</span>
            <span className="text-sm font-medium">{toast.message}</span>
          </div>
        </div>
      )}
    </ToastContext.Provider>
  );
}
