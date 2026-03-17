'use server';

import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';
import bcrypt from 'bcryptjs';
import { revalidatePath } from 'next/cache';

export async function updateAccountInfo(formData: FormData) {
  const session = await auth();
  const userId = (session?.user as any)?.id;
  if (!userId) throw new Error('Not authenticated');

  const name = formData.get('name') as string;
  const email = formData.get('email') as string;

  if (!name || !email) throw new Error('Name and email are required');

  const conflict = await prisma.adminUser.findFirst({
    where: { email, NOT: { id: userId } },
  });
  if (conflict) throw new Error('That email is already in use by another account');

  await prisma.adminUser.update({ where: { id: userId }, data: { name, email } });
  revalidatePath('/admin/account');
}

export async function updatePassword(formData: FormData) {
  const session = await auth();
  const userId = (session?.user as any)?.id;
  if (!userId) throw new Error('Not authenticated');

  const currentPassword = formData.get('currentPassword') as string;
  const newPassword = formData.get('newPassword') as string;
  const confirmPassword = formData.get('confirmPassword') as string;

  if (!currentPassword || !newPassword || !confirmPassword) {
    throw new Error('All password fields are required');
  }
  if (newPassword !== confirmPassword) throw new Error('New passwords do not match');
  if (newPassword.length < 8) throw new Error('Password must be at least 8 characters');

  const user = await prisma.adminUser.findUnique({ where: { id: userId } });
  if (!user) throw new Error('User not found');

  const isValid = await bcrypt.compare(currentPassword, user.hashedPassword);
  if (!isValid) throw new Error('Current password is incorrect');

  const hashedPassword = await bcrypt.hash(newPassword, 12);
  await prisma.adminUser.update({ where: { id: userId }, data: { hashedPassword } });
  revalidatePath('/admin/account');
}
