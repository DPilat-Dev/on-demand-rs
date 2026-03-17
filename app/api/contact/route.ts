import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, serviceType, message } = body;

    if (!name || !email || !phone || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const ipAddress =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? undefined;

    // Persist to database
    const submission = await prisma.contactSubmission.create({
      data: { name, email, phone, serviceType: serviceType || null, message, ipAddress },
    });

    // Send notification email (non-blocking — failure does not affect the response)
    const settings = await prisma.siteSettings.findUnique({ where: { id: 'global' } }).catch(() => null);
    const notificationEmail = settings?.notificationEmail ?? null;

    if (notificationEmail) {
      const template = await prisma.emailTemplate
        .findUnique({ where: { key: 'contact_notification' } })
        .catch(() => null);

      const subject = (template?.subject ?? 'New Service Request — {{name}}')
        .replace('{{name}}', name);

      const html = (template?.body ?? '')
        .replace(/\{\{name\}\}/g, name)
        .replace(/\{\{email\}\}/g, email)
        .replace(/\{\{phone\}\}/g, phone)
        .replace(/\{\{serviceType\}\}/g, serviceType || 'Not specified')
        .replace(/\{\{message\}\}/g, message)
        .replace(/\{\{submittedAt\}\}/g, new Date().toLocaleString());

      sendEmail({ to: notificationEmail, subject, html }).catch((err) =>
        console.error('[Email] Notification send failed:', err)
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Service request submitted successfully',
        data: { id: submission.id, submittedAt: submission.submittedAt },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ message: 'Contact API is running' }, { status: 200 });
}