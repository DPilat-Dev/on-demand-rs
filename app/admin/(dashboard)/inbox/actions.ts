'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function markAsRead(id: string) {
  await prisma.contactSubmission.update({ where: { id }, data: { isRead: true } });
  revalidatePath('/admin/inbox');
  revalidatePath(`/admin/inbox/${id}`);
}

export async function archiveSubmission(id: string) {
  await prisma.contactSubmission.update({ where: { id }, data: { isArchived: true, isRead: true } });
  revalidatePath('/admin/inbox');
  revalidatePath(`/admin/inbox/${id}`);
}

export async function unarchiveSubmission(id: string) {
  await prisma.contactSubmission.update({ where: { id }, data: { isArchived: false } });
  revalidatePath('/admin/inbox');
  revalidatePath(`/admin/inbox/${id}`);
}

export async function deleteSubmission(id: string) {
  await prisma.contactSubmission.delete({ where: { id } });
  revalidatePath('/admin/inbox');
}
