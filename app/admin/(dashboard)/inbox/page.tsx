import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { archiveSubmission, deleteSubmission } from './actions';

type Filter = 'all' | 'unread' | 'archived';

type SubmissionRow = Awaited<ReturnType<typeof prisma.contactSubmission.findMany>>[number];

interface PageProps {
  searchParams: Promise<{ filter?: string; page?: string }>;
}

const PAGE_SIZE = 20;

export default async function InboxPage({ searchParams }: PageProps) {
  const { filter: rawFilter = 'all', page: rawPage = '1' } = await searchParams;
  const filter = (rawFilter as Filter) === 'unread' ? 'unread' : rawFilter === 'archived' ? 'archived' : 'all';
  const page = Math.max(1, parseInt(rawPage) || 1);

  const where =
    filter === 'unread'
      ? { isRead: false, isArchived: false }
      : filter === 'archived'
      ? { isArchived: true }
      : { isArchived: false };

  const [submissions, total, unreadCount] = await Promise.all([
    prisma.contactSubmission.findMany({
      where,
      orderBy: { submittedAt: 'desc' },
      take: PAGE_SIZE,
      skip: (page - 1) * PAGE_SIZE,
    }),
    prisma.contactSubmission.count({ where }),
    prisma.contactSubmission.count({ where: { isRead: false, isArchived: false } }),
  ]);

  const totalPages = Math.ceil(total / PAGE_SIZE);

  const tabs: { key: Filter; label: string; count?: number }[] = [
    { key: 'all', label: 'All' },
    { key: 'unread', label: 'Unread', count: unreadCount },
    { key: 'archived', label: 'Archived' },
  ];

  return (
    <div className="space-y-4 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Inbox</h1>
        <p className="text-sm text-gray-500 mt-1">Contact form submissions</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-gray-200">
        {tabs.map((tab) => (
          <Link
            key={tab.key}
            href={`/admin/inbox?filter=${tab.key}`}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              filter === tab.key
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab.label}
            {tab.count != null && tab.count > 0 && (
              <span className="ml-1.5 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                {tab.count}
              </span>
            )}
          </Link>
        ))}
      </div>

      {/* List */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {submissions.length === 0 ? (
          <p className="px-6 py-12 text-sm text-gray-400 text-center">No submissions here.</p>
        ) : (
          <div className="divide-y divide-gray-100">
            {submissions.map((sub: SubmissionRow) => (
              <div key={sub.id} className="flex items-start gap-4 px-5 py-4 hover:bg-gray-50 transition-colors">
                {/* Unread dot */}
                <div className="mt-1.5 flex-shrink-0 w-2">
                  {!sub.isRead && (
                    <span className="block w-2 h-2 rounded-full bg-blue-500" />
                  )}
                </div>

                {/* Main content */}
                <Link href={`/admin/inbox/${sub.id}`} className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className={`text-sm truncate ${sub.isRead ? 'text-gray-700' : 'text-gray-900 font-semibold'}`}>
                      {sub.name}
                    </p>
                    <p className="text-xs text-gray-400 flex-shrink-0">
                      {new Date(sub.submittedAt).toLocaleDateString('en-US', {
                        month: 'short', day: 'numeric',
                      })}
                    </p>
                  </div>
                  <p className="text-xs text-gray-500 truncate mt-0.5">
                    {sub.email} · {sub.serviceType ?? 'General Inquiry'}
                  </p>
                  <p className="text-xs text-gray-400 truncate mt-0.5">{sub.message}</p>
                </Link>

                {/* Actions */}
                <div className="flex gap-2 flex-shrink-0">
                  {!sub.isArchived ? (
                    <form action={archiveSubmission.bind(null, sub.id)}>
                      <button type="submit" className="text-xs text-gray-400 hover:text-gray-600 px-2 py-1 rounded hover:bg-gray-100">
                        Archive
                      </button>
                    </form>
                  ) : (
                    <span className="text-xs text-gray-300 px-2 py-1">Archived</span>
                  )}
                  <form action={deleteSubmission.bind(null, sub.id)}>
                    <button type="submit" className="text-xs text-red-400 hover:text-red-600 px-2 py-1 rounded hover:bg-red-50">
                      Delete
                    </button>
                  </form>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between text-sm text-gray-500">
          <p>{total} submissions · Page {page} of {totalPages}</p>
          <div className="flex gap-2">
            {page > 1 && (
              <Link
                href={`/admin/inbox?filter=${filter}&page=${page - 1}`}
                className="px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50"
              >
                ← Prev
              </Link>
            )}
            {page < totalPages && (
              <Link
                href={`/admin/inbox?filter=${filter}&page=${page + 1}`}
                className="px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50"
              >
                Next →
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
