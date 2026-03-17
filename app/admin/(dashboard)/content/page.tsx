import Link from 'next/link';
import { prisma } from '@/lib/prisma';

const PAGES = [
  {
    key: 'homepage',
    label: 'Homepage',
    description: 'Hero, services overview, testimonials, emergency CTA, contact section',
    path: '/',
  },
  {
    key: 'about',
    label: 'About Us',
    description: 'Company story, mission, values, team members, commitment points',
    path: '/about',
  },
  {
    key: 'contact',
    label: 'Contact Page',
    description: 'Contact info, emergency details, location, service quick links',
    path: '/contact',
  },
  {
    key: 'footer',
    label: 'Footer',
    description: 'Company info, nav links, social media, certifications, legal text',
    path: '/',
  },
];

export default async function ContentAdminPage() {
  const rows = await prisma.pageContent.findMany();
  const savedKeys = new Set(rows.map((r) => r.pageKey));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Page Content</h1>
        <p className="text-sm text-gray-500 mt-1">Edit the content displayed on each public page.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {PAGES.map((page) => {
          const isSaved = savedKeys.has(page.key);
          const row = rows.find((r) => r.pageKey === page.key);
          return (
            <div
              key={page.key}
              className="bg-white rounded-xl border border-gray-200 p-5 flex flex-col gap-3"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="font-semibold text-gray-900">{page.label}</h2>
                  <p className="text-xs text-gray-500 mt-0.5">{page.description}</p>
                </div>
                {isSaved ? (
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full whitespace-nowrap">
                    DB
                  </span>
                ) : (
                  <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full whitespace-nowrap">
                    Static
                  </span>
                )}
              </div>
              {row && (
                <p className="text-xs text-gray-400">
                  Last saved:{' '}
                  {new Date(row.updatedAt).toLocaleString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                    hour: 'numeric',
                    minute: '2-digit',
                  })}
                </p>
              )}
              <div className="flex items-center gap-3 mt-auto pt-1">
                <Link
                  href={`/admin/content/${page.key}`}
                  className="bg-blue-600 text-white px-4 py-1.5 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors"
                >
                  Edit
                </Link>
                <Link
                  href={page.path}
                  target="_blank"
                  className="text-xs text-gray-400 hover:text-gray-600"
                >
                  Preview ↗
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
