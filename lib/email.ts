import { prisma } from './prisma';
import { decrypt } from './crypto';

interface SendEmailOptions {
  to: string;
  subject: string;
  html?: string;
  text?: string;
}

async function getEmailConfig() {
  try {
    const settings = await prisma.siteSettings.findUnique({ where: { id: 'global' } });
    if (!settings?.emailProvider || !settings?.emailConfig) return null;

    const config = settings.emailConfig as Record<string, string>;
    return {
      provider: settings.emailProvider,
      fromEmail: settings.fromEmail ?? 'noreply@ondemandrs.com',
      config: {
        ...config,
        apiKey: config.apiKey ? decrypt(config.apiKey) : undefined,
        password: config.password ? decrypt(config.password) : undefined,
      },
    };
  } catch {
    return null;
  }
}

export async function sendEmail(options: SendEmailOptions): Promise<{ success: boolean; error?: string }> {
  const emailConfig = await getEmailConfig();

  if (!emailConfig) {
    console.log('[Email] No email provider configured — skipping send:', options.subject);
    return { success: false, error: 'No email provider configured' };
  }

  if (emailConfig.provider === 'resend') {
    return sendViaResend(options, emailConfig);
  }

  if (emailConfig.provider === 'smtp') {
    return sendViaSMTP(options, emailConfig);
  }

  return { success: false, error: `Unknown provider: ${emailConfig.provider}` };
}

async function sendViaResend(
  options: SendEmailOptions,
  emailConfig: Awaited<ReturnType<typeof getEmailConfig>> & object
): Promise<{ success: boolean; error?: string }> {
  const cfg = emailConfig as { config: { apiKey?: string }; fromEmail: string };

  if (!cfg.config.apiKey) {
    return { success: false, error: 'Resend API key not configured' };
  }

  const { Resend } = await import('resend').catch(() => {
    throw new Error('resend package not installed. Run: npm install resend');
  });

  const resend = new Resend(cfg.config.apiKey);
  const result = await resend.emails.send({
    from: cfg.fromEmail,
    to: options.to,
    subject: options.subject,
    html: options.html ?? options.text ?? '',
    text: options.text,
  } as Parameters<typeof resend.emails.send>[0]);

  if (result.error) {
    return { success: false, error: result.error.message };
  }
  return { success: true };
}

async function sendViaSMTP(
  options: SendEmailOptions,
  emailConfig: Awaited<ReturnType<typeof getEmailConfig>> & object
): Promise<{ success: boolean; error?: string }> {
  const cfg = emailConfig as {
    config: { host?: string; port?: string; user?: string; password?: string };
    fromEmail: string;
  };

  const nodemailer = await import('nodemailer').catch(() => {
    throw new Error('nodemailer package not installed. Run: npm install nodemailer');
  });

  const transporter = nodemailer.default.createTransport({
    host: cfg.config.host,
    port: parseInt(cfg.config.port ?? '587'),
    auth: { user: cfg.config.user, pass: cfg.config.password },
  });

  await transporter.sendMail({
    from: cfg.fromEmail,
    to: options.to,
    subject: options.subject,
    html: options.html,
    text: options.text,
  });

  return { success: true };
}
