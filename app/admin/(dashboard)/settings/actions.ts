'use server';

import { prisma } from '@/lib/prisma';
import { encrypt } from '@/lib/crypto';
import { sendEmail } from '@/lib/email';
import { revalidatePath } from 'next/cache';

// ─── Email Settings ───────────────────────────────────────────────────────────

export async function saveEmailSettings(formData: FormData) {
  const provider = formData.get('provider') as string;
  const fromEmail = formData.get('fromEmail') as string;
  const notificationEmail = formData.get('notificationEmail') as string;

  // Load existing config so we can preserve encrypted keys if the field was left blank
  const existing = await prisma.siteSettings.findUnique({ where: { id: 'global' } });
  const existingConfig = (existing?.emailConfig ?? {}) as Record<string, string>;

  let emailConfig: Record<string, string> = {};

  if (provider === 'resend') {
    const apiKey = formData.get('resendApiKey') as string;
    emailConfig = {
      apiKey: apiKey ? encrypt(apiKey) : (existingConfig.apiKey ?? ''),
    };
  } else if (provider === 'smtp') {
    const password = formData.get('smtpPassword') as string;
    emailConfig = {
      host: formData.get('smtpHost') as string,
      port: formData.get('smtpPort') as string,
      user: formData.get('smtpUser') as string,
      password: password ? encrypt(password) : (existingConfig.password ?? ''),
    };
  }

  await prisma.siteSettings.upsert({
    where: { id: 'global' },
    update: { emailProvider: provider, emailConfig, fromEmail, notificationEmail },
    create: { id: 'global', emailProvider: provider, emailConfig, fromEmail, notificationEmail },
  });

  revalidatePath('/admin/settings/email');
}

export async function sendTestEmail(): Promise<{ success: boolean; error?: string }> {
  const settings = await prisma.siteSettings.findUnique({ where: { id: 'global' } });
  if (!settings?.notificationEmail) {
    return { success: false, error: 'No notification email configured' };
  }

  return sendEmail({
    to: settings.notificationEmail,
    subject: 'Test Email — OnDemand RS Admin',
    html: '<p>Your email settings are working correctly. This test was sent from the OnDemand RS admin dashboard.</p>',
  });
}

export async function saveEmailTemplate(key: string, formData: FormData) {
  const subject = formData.get('subject') as string;
  const body = formData.get('body') as string;
  const isActive = formData.get('isActive') === 'on';

  await prisma.emailTemplate.upsert({
    where: { key },
    update: { subject, body, isActive },
    create: { key, subject, body, isActive },
  });

  revalidatePath('/admin/settings/email');
}

// ─── Google Reviews ───────────────────────────────────────────────────────────

export async function saveGoogleReviewsSettings(formData: FormData) {
  const googlePlacesId = (formData.get('googlePlacesId') as string).trim();
  const googleReviewsEnabled = formData.get('googleReviewsEnabled') === 'on';
  const googleReviewsMinRating = parseInt(formData.get('googleReviewsMinRating') as string) || 4;
  const googleReviewsMaxCount = parseInt(formData.get('googleReviewsMaxCount') as string) || 10;
  const googleReviewsCacheTtlHours = parseInt(formData.get('googleReviewsCacheTtlHours') as string) || 24;

  await prisma.siteSettings.upsert({
    where: { id: 'global' },
    update: { googlePlacesId, googleReviewsEnabled, googleReviewsMinRating, googleReviewsMaxCount, googleReviewsCacheTtlHours },
    create: { id: 'global', googlePlacesId, googleReviewsEnabled, googleReviewsMinRating, googleReviewsMaxCount, googleReviewsCacheTtlHours },
  });

  // Keep feature flag in sync
  await prisma.featureFlag.upsert({
    where: { key: 'googleReviews.enabled' },
    update: { isEnabled: googleReviewsEnabled },
    create: { key: 'googleReviews.enabled', label: 'Google Reviews Integration', description: 'Show Google reviews on the homepage', isEnabled: googleReviewsEnabled },
  });

  revalidatePath('/admin/settings/google-reviews');
  revalidatePath('/');
}

export async function refreshGoogleReviews() {
  const settings = await prisma.siteSettings.findUnique({ where: { id: 'global' } });
  if (!settings?.googlePlacesId) throw new Error('No Google Place ID configured');

  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  if (!apiKey) throw new Error('GOOGLE_PLACES_API_KEY environment variable is not set');

  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${settings.googlePlacesId}&fields=reviews,rating,user_ratings_total&key=${apiKey}`;
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) throw new Error(`Google Places API error: ${res.status}`);

  const data = await res.json();
  if (data.status !== 'OK') throw new Error(`Google Places API: ${data.status} — ${data.error_message ?? ''}`);

  await prisma.siteSettings.update({
    where: { id: 'global' },
    data: { cachedReviews: data.result, cachedReviewsAt: new Date() },
  });

  revalidatePath('/admin/settings/google-reviews');
  revalidatePath('/');
}
