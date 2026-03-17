import { prisma } from '@/lib/prisma';
import { EmailSettingsForm } from './EmailSettingsForm';

const DEFAULT_TEMPLATES = [
  {
    key: 'contact_notification',
    subject: 'New Service Request — {{name}}',
    body: `<h2>New Service Request</h2>
<p><strong>Name:</strong> {{name}}</p>
<p><strong>Email:</strong> {{email}}</p>
<p><strong>Phone:</strong> {{phone}}</p>
<p><strong>Service Type:</strong> {{serviceType}}</p>
<p><strong>Message:</strong></p>
<p>{{message}}</p>
<p><em>Submitted: {{submittedAt}}</em></p>`,
    isActive: true,
  },
  {
    key: 'contact_confirmation',
    subject: 'We received your request, {{name}}!',
    body: `<p>Hi {{name}},</p>
<p>Thank you for reaching out to OnDemand Restaurant Service. We have received your service request and will be in touch shortly.</p>
<p>If you need immediate assistance, please call us at <strong>405-242-6028</strong>. We are available 24/7 for emergency repairs.</p>
<p>Best regards,<br>OnDemand Restaurant Service</p>`,
    isActive: true,
  },
];

export default async function EmailSettingsPage() {
  const [settings, dbTemplates] = await Promise.all([
    prisma.siteSettings.findUnique({ where: { id: 'global' } }),
    prisma.emailTemplate.findMany(),
  ]);

  const templateMap = Object.fromEntries(dbTemplates.map((t) => [t.key, t]));

  // Merge DB templates with defaults so the UI always shows both
  const templates = DEFAULT_TEMPLATES.map((def) => {
    const db = templateMap[def.key];
    return db ? { key: db.key, subject: db.subject, body: db.body, isActive: db.isActive } : def;
  });

  const emailConfig = (settings?.emailConfig ?? {}) as Record<string, string>;

  const settingsProps = {
    emailProvider: settings?.emailProvider ?? null,
    fromEmail: settings?.fromEmail ?? null,
    notificationEmail: settings?.notificationEmail ?? null,
    hasResendKey: !!(emailConfig.apiKey),
    hasSmtpPassword: !!(emailConfig.password),
    smtpHost: emailConfig.host ?? null,
    smtpPort: emailConfig.port ?? null,
    smtpUser: emailConfig.user ?? null,
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Email Settings</h1>
        <p className="text-sm text-gray-500 mt-1">
          Configure how contact form notifications and confirmations are sent.
        </p>
      </div>
      <EmailSettingsForm settings={settingsProps} templates={templates} />
    </div>
  );
}
