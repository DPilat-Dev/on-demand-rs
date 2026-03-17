import { notFound } from 'next/navigation';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { markAsRead, archiveSubmission, unarchiveSubmission, deleteSubmission } from '../actions';
import { redirect } from 'next/navigation';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function SubmissionDetailPage({ params }: PageProps) {
  const { id } = await params;

  const sub = await prisma.contactSubmission.findUnique({ where: { id } });
  if (!sub) notFound();

  // Auto-mark as read when viewed
  if (!sub.isRead) {
    await markAsRead(id);
  }

  const deleteAndRedirect = async () => {
    'use server';
    await deleteSubmission(id);
    redirect('/admin/inbox');
  };

  return (
    <div className="space-y-4 max-w-2xl">
      <div>
        <Link href="/admin/inbox" className="text-sm text-gray-400 hover:text-gray-600">
          ← Inbox
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 mt-1">{sub.name}</h1>
        <p className="text-sm text-gray-500 mt-0.5">
          {new Date(sub.submittedAt).toLocaleString('en-US', {
            month: 'long', day: 'numeric', year: 'numeric',
            hour: 'numeric', minute: '2-digit',
          })}
        </p>
      </div>

      {/* Details card */}
      <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100">
        <DetailRow label="Email">
          <a href={`mailto:${sub.email}`} className="text-blue-600 hover:text-blue-800">
            {sub.email}
          </a>
        </DetailRow>
        <DetailRow label="Phone">
          <a href={`tel:${sub.phone}`} className="text-blue-600 hover:text-blue-800">
            {sub.phone}
          </a>
        </DetailRow>
        <DetailRow label="Service Type">{sub.serviceType ?? '—'}</DetailRow>
        {sub.ipAddress && <DetailRow label="IP Address">{sub.ipAddress}</DetailRow>}
      </div>

      {/* Message */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-3">Message</p>
        <p className="text-sm text-gray-800 whitespace-pre-wrap leading-relaxed">{sub.message}</p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 flex-wrap">
        <a
          href={`mailto:${sub.email}?subject=Re: Your Service Request`}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors"
        >
          Reply via Email
        </a>
        <a
          href={`tel:${sub.phone}`}
          className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-200 transition-colors"
        >
          Call {sub.phone}
        </a>

        {!sub.isArchived ? (
          <form action={archiveSubmission.bind(null, id)}>
            <button type="submit" className="text-sm text-gray-500 hover:text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors">
              Archive
            </button>
          </form>
        ) : (
          <form action={unarchiveSubmission.bind(null, id)}>
            <button type="submit" className="text-sm text-gray-500 hover:text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors">
              Unarchive
            </button>
          </form>
        )}

        <form action={deleteAndRedirect}>
          <button
            type="submit"
            className="text-sm text-red-500 hover:text-red-700 px-4 py-2 rounded-lg hover:bg-red-50 transition-colors"
          >
            Delete
          </button>
        </form>
      </div>

      {sub.isArchived && (
        <p className="text-xs text-gray-400 bg-gray-50 border border-gray-100 rounded-lg px-4 py-2">
          This submission is archived.
        </p>
      )}
    </div>
  );
}

function DetailRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-baseline gap-4 px-5 py-3">
      <p className="text-xs font-medium text-gray-500 w-24 flex-shrink-0">{label}</p>
      <p className="text-sm text-gray-800">{children}</p>
    </div>
  );
}
