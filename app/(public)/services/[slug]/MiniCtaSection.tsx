import { Phone } from 'lucide-react';
import Link from 'next/link';
import type { MiniCtaBlock } from '@/types/service';

const STYLE_MAP = {
  default: {
    wrapper: 'bg-blue-50 border-y border-blue-100',
    button: 'bg-blue-600 text-white hover:bg-blue-700',
    outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50',
  },
  emergency: {
    wrapper: 'bg-red-50 border-y border-red-100',
    button: 'bg-red-600 text-white hover:bg-red-700',
    outline: 'border-2 border-red-600 text-red-600 hover:bg-red-50',
  },
  subtle: {
    wrapper: 'bg-gray-50 border-y border-gray-200',
    button: 'bg-gray-800 text-white hover:bg-gray-900',
    outline: 'border-2 border-gray-800 text-gray-800 hover:bg-gray-100',
  },
} as const;

export default function MiniCtaSection({ cta }: { cta: MiniCtaBlock }) {
  const styles = STYLE_MAP[cta.style as keyof typeof STYLE_MAP] ?? STYLE_MAP.default;
  const buttonHref = cta.buttonHref || '/contact';

  return (
    <section className={`py-10 ${styles.wrapper}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 max-w-5xl mx-auto">
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{cta.title}</h3>
            {cta.description && (
              <p className="text-gray-600">{cta.description}</p>
            )}
          </div>
          <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
            {cta.phone && (
              <a
                href={`tel:${cta.phone}`}
                className={`inline-flex items-center justify-center rounded-lg px-6 py-3 font-semibold transition-colors ${styles.button}`}
              >
                <Phone className="h-4 w-4 mr-2" />
                {cta.phone}
              </a>
            )}
            <Link
              href={buttonHref}
              className={`inline-flex items-center justify-center rounded-lg px-6 py-3 font-semibold transition-colors ${styles.outline}`}
            >
              {cta.buttonText}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
