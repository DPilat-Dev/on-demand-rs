import { auth } from '@/auth';
import { notFound, redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { updateUser } from '../actions';
import { SubmitButton } from '../../components/SubmitButton';
import Link from 'next/link';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditUserPage({ params }: PageProps) {
  const { id } = await params;

  const session = await auth();
  if ((session?.user as any)?.role !== 'admin') redirect('/admin');

  const user = await prisma.adminUser.findUnique({ where: { id } });
  if (!user) notFound();

  const currentUserId = (session?.user as any)?.id as string;
  const isSelf = user.id === currentUserId;

  const save = updateUser.bind(null, id);

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <Link href="/admin/users" className="text-sm text-gray-400 hover:text-gray-600">
          ← Users
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 mt-1">Edit User</h1>
      </div>

      <form action={save} className="bg-white rounded-xl border border-gray-200 p-6 space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              defaultValue={user.name}
              required
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input
              type="email"
              name="email"
              defaultValue={user.email}
              required
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
            <select
              name="role"
              defaultValue={user.role}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="editor">Editor — content &amp; services only</option>
              <option value="admin">Admin — full access</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              name="isActive"
              defaultValue={user.isActive ? 'true' : 'false'}
              disabled={isSelf}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:text-gray-400"
            >
              <option value="true">Active</option>
              <option value="false">Inactive (cannot log in)</option>
            </select>
            {isSelf && (
              <p className="text-xs text-gray-400 mt-1">You cannot deactivate your own account.</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            New Password <span className="text-gray-400 font-normal">(leave blank to keep current)</span>
          </label>
          <input
            type="password"
            name="newPassword"
            minLength={8}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Min. 8 characters"
          />
        </div>

        <div className="flex items-center gap-4 pt-2">
          <SubmitButton>Save Changes</SubmitButton>
          <Link href="/admin/users" className="text-sm text-gray-500 hover:text-gray-700">
            Cancel
          </Link>
        </div>
      </form>

      <div className="bg-gray-50 rounded-xl border border-gray-200 px-6 py-4">
        <p className="text-xs text-gray-500">
          Account created: {new Date(user.createdAt).toLocaleString('en-US', {
            month: 'long', day: 'numeric', year: 'numeric',
          })}
        </p>
      </div>
    </div>
  );
}
