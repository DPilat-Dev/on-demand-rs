import Link from 'next/link';
import { getUnreadCount } from '@/lib/content';
import { signOut } from '@/auth';

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: '▪' },
  { href: '/admin/content', label: 'Page Content', icon: '▪' },
  { href: '/admin/services', label: 'Services', icon: '▪' },
  { href: '/admin/media', label: 'Media Library', icon: '▪' },
  { href: '/admin/flags', label: 'Feature Flags', icon: '▪' },
  { href: '/admin/settings/email', label: 'Email Settings', icon: '▪' },
  { href: '/admin/settings/google-reviews', label: 'Google Reviews', icon: '▪' },
];

export default async function Sidebar() {
  const unreadCount = await getUnreadCount();

  return (
    <aside className="w-64 min-h-screen bg-gray-900 text-gray-100 flex flex-col">
      {/* Brand */}
      <div className="px-6 py-5 border-b border-gray-700">
        <p className="text-xs text-gray-400 uppercase tracking-wider">OnDemand RS</p>
        <p className="text-lg font-bold">Admin</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
          >
            <span className="text-gray-500">{item.icon}</span>
            {item.label}
          </Link>
        ))}

        {/* Inbox with unread badge */}
        <Link
          href="/admin/inbox"
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
        >
          <span className="text-gray-500">▪</span>
          <span className="flex-1">Inbox</span>
          {unreadCount > 0 && (
            <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
              {unreadCount > 99 ? '99+' : unreadCount}
            </span>
          )}
        </Link>
      </nav>

      {/* Sign out */}
      <div className="px-3 py-4 border-t border-gray-700">
        <form
          action={async () => {
            'use server';
            await signOut({ redirectTo: '/admin/login' });
          }}
        >
          <button
            type="submit"
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-400 hover:bg-gray-800 hover:text-white transition-colors text-left"
          >
            <span>↩</span>
            Sign Out
          </button>
        </form>
      </div>
    </aside>
  );
}
