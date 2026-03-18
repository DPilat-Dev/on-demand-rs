import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { createUser, deleteUser } from './actions';
import { Field } from '../components/FormField';
import { SubmitButton } from '../components/SubmitButton';
import Link from 'next/link';

type UserRow = Awaited<ReturnType<typeof prisma.adminUser.findMany>>[number];

export default async function UsersPage() {
  const session = await auth();
  if ((session?.user as any)?.role !== 'admin') redirect('/admin');

  const users = await prisma.adminUser.findMany({ orderBy: { createdAt: 'asc' } });
  const currentUserId = (session?.user as any)?.id as string;

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
        <p className="text-sm text-gray-500 mt-1">Manage who has access to the admin dashboard.</p>
      </div>

      {/* User list */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="font-semibold text-gray-900">Admin Users ({users.length})</h2>
        </div>
        <div className="divide-y divide-gray-100">
          {users.map((user: UserRow) => (
            <div key={user.id} className="flex items-center gap-4 px-6 py-4">
              <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-semibold text-sm flex-shrink-0">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">
                  {user.name}
                  {user.id === currentUserId && (
                    <span className="ml-2 text-xs text-gray-400">(you)</span>
                  )}
                </p>
                <p className="text-xs text-gray-500 truncate">{user.email}</p>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                  user.role === 'admin'
                    ? 'bg-purple-100 text-purple-700'
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {user.role}
                </span>
                {!user.isActive && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-red-100 text-red-600 font-medium">
                    inactive
                  </span>
                )}
                <Link
                  href={`/admin/users/${user.id}`}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Edit
                </Link>
                {user.id !== currentUserId && (
                  <DeleteButton id={user.id} name={user.name} />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add user form */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="font-semibold text-gray-900 mb-4">Add New User</h2>
        <form action={createUser} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Full Name" name="name" defaultValue="" required />
            <Field label="Email Address" name="email" defaultValue="" required />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                name="password"
                required
                minLength={8}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Min. 8 characters"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
              <select
                name="role"
                defaultValue="editor"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="editor">Editor — can edit content &amp; services</option>
                <option value="admin">Admin — full access including user management</option>
              </select>
            </div>
          </div>
          <SubmitButton message="User created!">Create User</SubmitButton>
        </form>
      </div>
    </div>
  );
}

function DeleteButton({ id, name }: { id: string; name: string }) {
  const action = deleteUser.bind(null, id);
  return (
    <form
      action={action}
      onSubmit={undefined}
    >
      <button
        type="submit"
        className="text-sm text-red-500 hover:text-red-700"
        onClick={undefined}
      >
        Delete
      </button>
    </form>
  );
}
