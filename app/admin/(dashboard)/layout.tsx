import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import Sidebar from './components/Sidebar';
import { ToastProvider } from './components/ToastProvider';

export const metadata = { title: 'Admin — OnDemand RS' };

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  if (!session) {
    redirect('/admin/login');
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Signed in as <span className="font-medium text-gray-900">{session.user?.email}</span>
          </p>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            View Site ↗
          </a>
        </header>
        <main className="flex-1 p-6">
          <ToastProvider>{children}</ToastProvider>
        </main>
      </div>
    </div>
  );
}
