'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface Props {
  emailPlaceholder: string;
  buttonText: string;
}

export default function HeroEmergencyForm({ emailPlaceholder, buttonText }: Props) {
  const [email, setEmail] = useState('');
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    router.push(email ? `/contact?email=${encodeURIComponent(email)}` : '/contact');
  }

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
      <h3 className="text-xl font-semibold mb-4">Get Emergency Help Now</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="email"
            placeholder={emailPlaceholder}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 rounded-lg bg-white/10 border border-white/20 px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 transition-colors whitespace-nowrap"
          >
            {buttonText}
          </button>
        </div>
        <p className="text-sm text-gray-300">
          By submitting, you agree to our terms and privacy policy.
        </p>
      </form>
    </div>
  );
}
