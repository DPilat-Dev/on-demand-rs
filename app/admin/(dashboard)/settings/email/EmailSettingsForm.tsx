'use client';

import { useState, useTransition } from 'react';
import { saveEmailSettings, sendTestEmail, saveEmailTemplate } from '../actions';
import { SubmitButton } from '../../components/SubmitButton';

interface Props {
  settings: {
    emailProvider: string | null;
    fromEmail: string | null;
    notificationEmail: string | null;
    hasResendKey: boolean;
    hasSmtpPassword: boolean;
    smtpHost: string | null;
    smtpPort: string | null;
    smtpUser: string | null;
  };
  templates: Array<{
    key: string;
    subject: string;
    body: string;
    isActive: boolean;
  }>;
}

export function EmailSettingsForm({ settings, templates }: Props) {
  const [provider, setProvider] = useState(settings.emailProvider ?? 'resend');
  const [testStatus, setTestStatus] = useState<'idle' | 'sending' | 'ok' | 'error'>('idle');
  const [testError, setTestError] = useState('');
  const [isPending, startTransition] = useTransition();

  function handleTest() {
    setTestStatus('sending');
    setTestError('');
    startTransition(async () => {
      try {
        await sendTestEmail();
        setTestStatus('ok');
      } catch (e: any) {
        setTestStatus('error');
        setTestError(e.message ?? 'Unknown error');
      }
    });
  }

  return (
    <div className="space-y-6">
      {/* Provider Config */}
      <form action={saveEmailSettings} className="bg-white rounded-xl border border-gray-200 p-6 space-y-5">
        <h2 className="font-semibold text-gray-900">Email Provider</h2>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Provider</label>
          <select
            name="provider"
            value={provider}
            onChange={(e) => setProvider(e.target.value)}
            className="w-full max-w-xs rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="resend">Resend</option>
            <option value="smtp">SMTP</option>
          </select>
        </div>

        {provider === 'resend' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Resend API Key
              {settings.hasResendKey && (
                <span className="ml-2 text-xs text-green-600 font-normal">✓ configured</span>
              )}
            </label>
            <input
              type="password"
              name="resendApiKey"
              placeholder={settings.hasResendKey ? 'Leave blank to keep existing key' : 're_...'}
              className="w-full max-w-md rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-xs text-gray-400 mt-1">
              Get your key at <span className="font-mono">resend.com/api-keys</span>
            </p>
          </div>
        )}

        {provider === 'smtp' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">SMTP Host</label>
                <input
                  type="text"
                  name="smtpHost"
                  defaultValue={settings.smtpHost ?? ''}
                  placeholder="smtp.example.com"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Port</label>
                <input
                  type="number"
                  name="smtpPort"
                  defaultValue={settings.smtpPort ?? '587'}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                <input
                  type="text"
                  name="smtpUser"
                  defaultValue={settings.smtpUser ?? ''}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                  {settings.hasSmtpPassword && (
                    <span className="ml-2 text-xs text-green-600 font-normal">✓ configured</span>
                  )}
                </label>
                <input
                  type="password"
                  name="smtpPassword"
                  placeholder={settings.hasSmtpPassword ? 'Leave blank to keep existing' : ''}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">From Email</label>
            <input
              type="email"
              name="fromEmail"
              defaultValue={settings.fromEmail ?? ''}
              placeholder="noreply@ondemandrs.com"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-xs text-gray-400 mt-1">Sender address for outbound emails</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Notification Email</label>
            <input
              type="email"
              name="notificationEmail"
              defaultValue={settings.notificationEmail ?? ''}
              placeholder="you@example.com"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-xs text-gray-400 mt-1">Where contact form alerts are sent</p>
          </div>
        </div>

        <div className="flex items-center gap-4 pt-2">
          <SubmitButton message="Email settings saved!">Save Settings</SubmitButton>
          <button
            type="button"
            onClick={handleTest}
            disabled={testStatus === 'sending'}
            className="bg-gray-100 text-gray-700 px-5 py-2 rounded-lg text-sm font-semibold hover:bg-gray-200 transition-colors disabled:opacity-50"
          >
            {testStatus === 'sending' ? 'Sending…' : 'Send Test Email'}
          </button>
          {testStatus === 'ok' && <span className="text-sm text-green-600">✓ Test email sent</span>}
          {testStatus === 'error' && <span className="text-sm text-red-600">✗ {testError}</span>}
        </div>
      </form>

      {/* Email Templates */}
      <div className="space-y-4">
        <h2 className="font-semibold text-gray-900">Email Templates</h2>
        <p className="text-sm text-gray-500">
          Use <code className="bg-gray-100 px-1 rounded text-xs">{'{{'} name {'}}'}</code>,{' '}
          <code className="bg-gray-100 px-1 rounded text-xs">{'{{'} email {'}}'}</code>,{' '}
          <code className="bg-gray-100 px-1 rounded text-xs">{'{{'} phone {'}}'}</code>,{' '}
          <code className="bg-gray-100 px-1 rounded text-xs">{'{{'} serviceType {'}}'}</code>,{' '}
          <code className="bg-gray-100 px-1 rounded text-xs">{'{{'} message {'}}'}</code>,{' '}
          <code className="bg-gray-100 px-1 rounded text-xs">{'{{'} submittedAt {'}}'}</code> as placeholders.
        </p>
        {templates.map((tmpl) => (
          <TemplateCard key={tmpl.key} template={tmpl} />
        ))}
      </div>
    </div>
  );
}

function TemplateCard({ template }: { template: { key: string; subject: string; body: string; isActive: boolean } }) {
  const [open, setOpen] = useState(false);
  const save = saveEmailTemplate.bind(null, template.key);

  const labels: Record<string, string> = {
    contact_notification: 'Contact Notification (to business)',
    contact_confirmation: 'Contact Confirmation (to customer)',
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-gray-50 transition-colors"
      >
        <div>
          <p className="font-medium text-gray-900 text-sm">{labels[template.key] ?? template.key}</p>
          <p className="text-xs text-gray-500 font-mono mt-0.5">{template.key}</p>
        </div>
        <div className="flex items-center gap-3">
          <span className={`text-xs px-2 py-0.5 rounded-full ${template.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
            {template.isActive ? 'active' : 'inactive'}
          </span>
          <span className="text-gray-400 text-sm">{open ? '▲' : '▼'}</span>
        </div>
      </button>
      {open && (
        <form action={save} className="px-6 pb-6 space-y-4 border-t border-gray-100 pt-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
            <input
              type="text"
              name="subject"
              defaultValue={template.subject}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Body (HTML or plain text)</label>
            <textarea
              name="body"
              defaultValue={template.body}
              rows={10}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm font-mono text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 text-sm text-gray-700">
              <input type="checkbox" name="isActive" defaultChecked={template.isActive} className="rounded" />
              Active
            </label>
            <SubmitButton
              className="bg-blue-600 text-white px-4 py-1.5 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors disabled:opacity-60"
              message="Template saved!"
            >
              Save Template
            </SubmitButton>
          </div>
        </form>
      )}
    </div>
  );
}
