export function Field({
  label,
  name,
  defaultValue = '',
  type = 'text',
  required = false,
  hint,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  type?: string;
  required?: boolean;
  hint?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        name={name}
        defaultValue={defaultValue}
        required={required}
        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {hint && <p className="text-xs text-gray-400 mt-1">{hint}</p>}
    </div>
  );
}

export function TextareaField({
  label,
  name,
  defaultValue = '',
  rows = 3,
  hint,
  mono = false,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  rows?: number;
  hint?: string;
  mono?: boolean;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <textarea
        name={name}
        defaultValue={defaultValue}
        rows={rows}
        className={`w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y ${mono ? 'font-mono text-xs' : ''}`}
      />
      {hint && <p className="text-xs text-gray-400 mt-1">{hint}</p>}
    </div>
  );
}

export function CheckboxField({
  label,
  name,
  defaultChecked = true,
  hint,
}: {
  label: string;
  name: string;
  defaultChecked?: boolean;
  hint?: string;
}) {
  return (
    <label className="flex items-start gap-3 cursor-pointer">
      <input
        type="checkbox"
        name={name}
        defaultChecked={defaultChecked}
        className="mt-0.5 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
      />
      <div>
        <span className="text-sm font-medium text-gray-700">{label}</span>
        {hint && <p className="text-xs text-gray-400 mt-0.5">{hint}</p>}
      </div>
    </label>
  );
}

export function SectionCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
        <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">{title}</h2>
      </div>
      <div className="p-6 space-y-4">{children}</div>
    </div>
  );
}
