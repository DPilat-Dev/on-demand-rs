import { prisma } from '@/lib/prisma';
import Link from 'next/link';

async function getStats() {
  try {
    const [totalSubmissions, unreadSubmissions, totalServices, enabledServices] = await Promise.all([
      prisma.contactSubmission.count(),
      prisma.contactSubmission.count({ where: { isRead: false, isArchived: false } }),
      prisma.servicePage.count(),
      prisma.servicePage.count({ where: { isEnabled: true } }),
    ]);

    const recentSubmissions = await prisma.contactSubmission.findMany({
      orderBy: { submittedAt: 'desc' },
      take: 5,
      where: { isArchived: false },
    });

    return { totalSubmissions, unreadSubmissions, totalServices, enabledServices, recentSubmissions };
  } catch {
    return {
      totalSubmissions: 0,
      unreadSubmissions: 0,
      totalServices: 0,
      enabledServices: 0,
      recentSubmissions: [],
    };
  }
}

export default async function AdminDashboard() {
  const stats = await getStats();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">Overview of your site</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Total Submissions"
          value={stats.totalSubmissions}
          href="/admin/inbox"
        />
        <StatCard
          label="Unread"
          value={stats.unreadSubmissions}
          href="/admin/inbox"
          highlight={stats.unreadSubmissions > 0}
        />
        <StatCard
          label="Service Pages"
          value={`${stats.enabledServices} / ${stats.totalServices}`}
          href="/admin/services"
        />
        <StatCard
          label="Quick Links"
          value="—"
          href="/admin/flags"
          subLabel="Feature Flags"
        />
      </div>

      {/* Recent submissions */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="font-semibold text-gray-900">Recent Submissions</h2>
          <Link href="/admin/inbox" className="text-sm text-blue-600 hover:text-blue-800">
            View all
          </Link>
        </div>

        {stats.recentSubmissions.length === 0 ? (
          <p className="px-6 py-8 text-sm text-gray-500 text-center">No submissions yet.</p>
        ) : (
          <div className="divide-y divide-gray-100">
            {stats.recentSubmissions.map((sub) => (
              <Link
                key={sub.id}
                href={`/admin/inbox/${sub.id}`}
                className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50 transition-colors"
              >
                {!sub.isRead && (
                  <span className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{sub.name}</p>
                  <p className="text-xs text-gray-500 truncate">{sub.email}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-xs text-gray-400">
                    {sub.serviceType ?? 'General'}
                  </p>
                  <p className="text-xs text-gray-400">
                    {new Date(sub.submittedAt).toLocaleDateString()}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Quick nav */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { href: '/admin/content/homepage', label: 'Edit Homepage', desc: 'Update hero, services, testimonials' },
          { href: '/admin/services', label: 'Manage Services', desc: 'Add, edit, or disable service pages' },
          { href: '/admin/settings/email', label: 'Email Settings', desc: 'Configure notification emails' },
          { href: '/admin/settings/google-reviews', label: 'Google Reviews', desc: 'Connect your Google Business' },
          { href: '/admin/flags', label: 'Feature Flags', desc: 'Show/hide page sections' },
          { href: '/admin/inbox', label: 'View Inbox', desc: 'All contact form submissions' },
        ].map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="bg-white rounded-xl border border-gray-200 px-5 py-4 hover:border-blue-300 hover:shadow-sm transition-all"
          >
            <p className="font-semibold text-gray-900 text-sm">{item.label}</p>
            <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  href,
  highlight = false,
  subLabel,
}: {
  label: string;
  value: string | number;
  href: string;
  highlight?: boolean;
  subLabel?: string;
}) {
  return (
    <Link
      href={href}
      className={`bg-white rounded-xl border px-5 py-4 hover:shadow-sm transition-shadow ${
        highlight ? 'border-red-200' : 'border-gray-200'
      }`}
    >
      <p className="text-xs text-gray-500 uppercase tracking-wide">{label}</p>
      <p className={`text-3xl font-bold mt-1 ${highlight ? 'text-red-600' : 'text-gray-900'}`}>
        {value}
      </p>
      {subLabel && <p className="text-xs text-gray-400 mt-1">{subLabel}</p>}
    </Link>
  );
}
