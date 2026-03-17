'use server';

import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';
import bcrypt from 'bcryptjs';
import { revalidatePath } from 'next/cache';

async function requireAdmin() {
  const session = await auth();
  if ((session?.user as any)?.role !== 'admin') {
    throw new Error('Unauthorized: admin role required');
  }
  return session!.user!;
}

export async function createUser(formData: FormData) {
  await requireAdmin();

  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const role = formData.get('role') as string;

  if (!name || !email || !password) throw new Error('Name, email and password are required');
  if (!['admin', 'editor'].includes(role)) throw new Error('Invalid role');

  const existing = await prisma.adminUser.findUnique({ where: { email } });
  if (existing) throw new Error('A user with that email already exists');

  const hashedPassword = await bcrypt.hash(password, 12);

  await prisma.adminUser.create({
    data: { name, email, hashedPassword, role },
  });

  revalidatePath('/admin/users');
}

export async function updateUser(id: string, formData: FormData) {
  const currentUser = await requireAdmin();

  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const role = formData.get('role') as string;
  const isActive = formData.get('isActive') === 'true';
  const newPassword = formData.get('newPassword') as string;

  if (!name || !email) throw new Error('Name and email are required');
  if (!['admin', 'editor'].includes(role)) throw new Error('Invalid role');

  // Prevent the last admin from being demoted or deactivated
  if (role !== 'admin' || !isActive) {
    const adminCount = await prisma.adminUser.count({ where: { role: 'admin', isActive: true } });
    const target = await prisma.adminUser.findUnique({ where: { id } });
    if (target?.role === 'admin' && (role !== 'admin' || !isActive) && adminCount <= 1) {
      throw new Error('Cannot demote or deactivate the last admin account');
    }
  }

  const data: any = { name, email, role, isActive };

  if (newPassword && newPassword.length > 0) {
    if (newPassword.length < 8) throw new Error('New password must be at least 8 characters');
    data.hashedPassword = await bcrypt.hash(newPassword, 12);
  }

  await prisma.adminUser.update({ where: { id }, data });

  revalidatePath('/admin/users');
}

export async function deleteUser(id: string) {
  const currentUser = await requireAdmin();

  if ((currentUser as any).id === id) throw new Error('You cannot delete your own account');

  const adminCount = await prisma.adminUser.count({ where: { role: 'admin', isActive: true } });
  const target = await prisma.adminUser.findUnique({ where: { id } });
  if (target?.role === 'admin' && adminCount <= 1) {
    throw new Error('Cannot delete the last admin account');
  }

  await prisma.adminUser.delete({ where: { id } });
  revalidatePath('/admin/users');
}
