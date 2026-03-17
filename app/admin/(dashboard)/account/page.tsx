import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { updateAccountInfo, updatePassword } from './actions';
import { SubmitButton } from '../components/SubmitButton';

export default async function AccountPage() {
  const session = await auth();
  const userId = (session?.user as any)?.id;

  const user = userId
    ? await prisma.adminUser.findUnique({ where: { id: userId } })
    : null;

  const role = (session?.user as any)?.role ?? 'editor';

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Account Settings</h1>
        <p className="text-sm text-gray-500 mt-1">Manage your personal account details and password.</p>
      </div>

      {/* Profile info */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="font-semibold text-gray-900 mb-4">Profile Information</h2>
        <form action={updateAccountInfo} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                defaultValue={user?.name ?? ''}
                required
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                name="email"
                defaultValue={user?.email ?? ''}
                required
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
            <p className="text-sm text-gray-500 capitalize bg-gray-50 border border-gray-200 rounded-lg px-3 py-2">
              {role === 'admin' ? 'Admin — full access' : 'Editor — content & services'}
            </p>
          </div>
          <SubmitButton message="Profile updated!">Update Profile</SubmitButton>
        </form>
      </div>

      {/* Change password */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="font-semibold text-gray-900 mb-4">Change Password</h2>
        <form action={updatePassword} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
            <input
              type="password"
              name="currentPassword"
              required
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
              <input
                type="password"
                name="newPassword"
                required
                minLength={8}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Min. 8 characters"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
              <input
                type="password"
                name="confirmPassword"
                required
                minLength={8}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <SubmitButton message="Password updated!">Update Password</SubmitButton>
        </form>
      </div>

      {user && (
        <p className="text-xs text-gray-400 px-1">
          Account created {new Date(user.createdAt).toLocaleString('en-US', {
            month: 'long', day: 'numeric', year: 'numeric',
          })}
        </p>
      )}
    </div>
  );
}
