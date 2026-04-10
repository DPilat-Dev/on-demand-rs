'use client';

import { useState } from 'react';
import type { MiniCtaBlock } from '@/types/service';

// ─── Constants ─────────────────────────────────────────────────────────────────

const CORE_SECTIONS = [
  {
    key: 'serviceTypes',
    label: 'Service Types',
    inputName: 'sectionsServiceTypes',
    contentField: 'serviceTypes' as const,
    schema: '{ name, description, features: string[] }',
  },
  {
    key: 'equipment',
    label: 'Equipment We Service',
    inputName: 'sectionsEquipment',
    contentField: 'equipment' as const,
    schema: '{ name, description, icon, image? }',
  },
  {
    key: 'commonIssues',
    label: 'Common Issues',
    inputName: 'sectionsCommonIssues',
    contentField: 'commonIssues' as const,
    schema: '{ problem, solution, prevention? }',
  },
  {
    key: 'brands',
    label: 'Brands',
    inputName: 'sectionsBrands',
    contentField: 'brands' as const,
    schema: '{ name, logo? }',
  },
  {
    key: 'faqs',
    label: 'FAQs',
    inputName: 'sectionsFaqs',
    contentField: 'faqs' as const,
    schema: '{ question, answer }',
  },
] as const;

type CoreKey = (typeof CORE_SECTIONS)[number]['contentField'];

// ─── Types ─────────────────────────────────────────────────────────────────────

interface MiniCtaFormData {
  id: string;
  title: string;
  description: string;
  buttonText: string;
  buttonHref: string;
  phone: string;
  style: 'default' | 'emergency' | 'subtle';
}

const EMPTY_FORM: Omit<MiniCtaFormData, 'id'> = {
  title: '',
  description: '',
  buttonText: 'Contact Us',
  buttonHref: '',
  phone: '',
  style: 'default',
};

interface Props {
  initialOrder?: string[];
  initialMiniCtas?: MiniCtaBlock[];
  initialSections?: {
    serviceTypes?: boolean;
    equipment?: boolean;
    brands?: boolean;
    commonIssues?: boolean;
    faqs?: boolean;
  };
  initialContent?: {
    serviceTypes?: any[];
    equipment?: any[];
    commonIssues?: any[];
    brands?: any[];
    faqs?: any[];
  };
}

// ─── Main component ────────────────────────────────────────────────────────────

export default function SectionOrderEditor({
  initialOrder,
  initialMiniCtas = [],
  initialSections,
  initialContent,
}: Props) {
  const buildOrder = (raw?: string[]): string[] => {
    const base = raw && raw.length > 0 ? raw : CORE_SECTIONS.map((s) => s.key);
    const existing = new Set(base);
    const missing = CORE_SECTIONS.map((s) => s.key).filter((k) => !existing.has(k));
    return [...base, ...missing];
  };

  const [order, setOrder] = useState<string[]>(() => buildOrder(initialOrder));

  const [miniCtas, setMiniCtas] = useState<MiniCtaFormData[]>(() =>
    initialMiniCtas.map((c) => ({
      id: c.id,
      title: c.title,
      description: c.description ?? '',
      buttonText: c.buttonText,
      buttonHref: c.buttonHref ?? '',
      phone: c.phone ?? '',
      style: (c.style as MiniCtaFormData['style']) ?? 'default',
    }))
  );

  const [visibility, setVisibility] = useState<Record<string, boolean>>(() => ({
    serviceTypes: initialSections?.serviceTypes !== false,
    equipment:    initialSections?.equipment    !== false,
    commonIssues: initialSections?.commonIssues !== false,
    brands:       initialSections?.brands       !== false,
    faqs:         initialSections?.faqs         !== false,
  }));

  const toggleVisibility = (key: string) =>
    setVisibility((prev) => ({ ...prev, [key]: !prev[key] }));

  // Which core section has its content editor open
  const [expandedContent, setExpandedContent] = useState<string | null>(null);

  // Mini CTA form state
  const [showAddForm, setShowAddForm] = useState(false);
  const [insertAfterIndex, setInsertAfterIndex] = useState<number>(-1);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Omit<MiniCtaFormData, 'id'>>(EMPTY_FORM);

  // ── Helpers ──────────────────────────────────────────────────────────────────

  const getLabelForKey = (key: string): string => {
    if (key.startsWith('miniCta:')) {
      const id = key.slice(8);
      return miniCtas.find((c) => c.id === id)?.title || 'Untitled CTA';
    }
    return CORE_SECTIONS.find((s) => s.key === key)?.label ?? key;
  };

  const moveUp = (i: number) => {
    if (i === 0) return;
    const next = [...order];
    [next[i - 1], next[i]] = [next[i], next[i - 1]];
    setOrder(next);
  };

  const moveDown = (i: number) => {
    if (i === order.length - 1) return;
    const next = [...order];
    [next[i], next[i + 1]] = [next[i + 1], next[i]];
    setOrder(next);
  };

  const openInsertForm = (afterIndex: number) => {
    setForm(EMPTY_FORM);
    setEditingId(null);
    setInsertAfterIndex(afterIndex);
    setShowAddForm(true);
  };

  const addMiniCta = () => {
    if (!form.title.trim()) return;
    const id = `cta-${Date.now()}`;
    setMiniCtas((prev) => [...prev, { id, ...form }]);
    setOrder((prev) => {
      const next = [...prev];
      const pos = insertAfterIndex >= 0 ? insertAfterIndex + 1 : next.length;
      next.splice(pos, 0, `miniCta:${id}`);
      return next;
    });
    setForm(EMPTY_FORM);
    setShowAddForm(false);
    setInsertAfterIndex(-1);
  };

  const startEdit = (id: string) => {
    const cta = miniCtas.find((c) => c.id === id);
    if (!cta) return;
    setForm({ title: cta.title, description: cta.description, buttonText: cta.buttonText, buttonHref: cta.buttonHref, phone: cta.phone, style: cta.style });
    setEditingId(id);
    setShowAddForm(false);
  };

  const saveEdit = (id: string) => {
    if (!form.title.trim()) return;
    setMiniCtas((prev) => prev.map((c) => (c.id === id ? { id, ...form } : c)));
    setEditingId(null);
  };

  const removeMiniCta = (id: string) => {
    setMiniCtas((prev) => prev.filter((c) => c.id !== id));
    setOrder((prev) => prev.filter((k) => k !== `miniCta:${id}`));
  };

  // ── Render ───────────────────────────────────────────────────────────────────

  return (
    <div className="space-y-2">
      {/* Hidden inputs for the parent <form> */}
      <input type="hidden" name="sectionOrder" value={JSON.stringify(order)} />
      <input type="hidden" name="miniCtas"     value={JSON.stringify(miniCtas)} />
      {CORE_SECTIONS.map(({ key, inputName }) => (
        <input key={inputName} type="hidden" name={inputName} value={visibility[key] ? 'on' : 'off'} />
      ))}

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-400 pb-1">
        <span>👁 = visible on page</span>
        <span>Edit = edit section content</span>
        <span>+ CTA = insert mini CTA below</span>
        <span>↑ ↓ = reorder</span>
      </div>

      {/* Pinned: Hero */}
      <PinnedRow label="Hero Section" note="always first" />

      {/* Orderable rows */}
      {order.map((key, index) => {
        const isMiniCta = key.startsWith('miniCta:');
        const ctaId     = isMiniCta ? key.slice(8) : null;
        const meta      = CORE_SECTIONS.find((s) => s.key === key);
        const isEditing        = editingId === ctaId;
        const isInsertingAfter = showAddForm && insertAfterIndex === index;
        const isContentOpen    = expandedContent === key;
        const label     = getLabelForKey(key);
        const isVisible = isMiniCta ? true : (visibility[key] ?? true);

        return (
          <div key={key}>
            {/* Row card */}
            <div className={`border rounded-lg overflow-hidden transition-opacity ${isVisible ? 'border-gray-200' : 'border-gray-100 opacity-50'}`}>
              {/* Row header */}
              <div className="flex items-center gap-2 px-3 py-2.5 bg-white">
                {/* Position number */}
                <span className="text-gray-400 text-xs font-mono w-4 text-center select-none shrink-0">
                  {index + 1}
                </span>

                {/* Visibility toggle — core sections only */}
                {!isMiniCta ? (
                  <button
                    type="button"
                    onClick={() => toggleVisibility(key)}
                    title={isVisible ? 'Click to hide section' : 'Click to show section'}
                    className={`text-base leading-none shrink-0 transition-colors ${isVisible ? 'text-blue-500 hover:text-blue-700' : 'text-gray-300 hover:text-gray-500'}`}
                  >
                    👁
                  </button>
                ) : (
                  <span className="w-5 shrink-0" />
                )}

                {/* Type badge + label */}
                <div className="flex-1 flex items-center gap-2 min-w-0">
                  {isMiniCta ? (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 text-xs font-medium whitespace-nowrap">
                      Mini CTA
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-gray-100 text-gray-500 text-xs font-medium whitespace-nowrap">
                      Section
                    </span>
                  )}
                  <span className={`text-sm font-medium truncate ${isVisible ? 'text-gray-800' : 'text-gray-400 line-through'}`}>
                    {label}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1 shrink-0">
                  {/* Core section: edit content */}
                  {meta && (
                    <button
                      type="button"
                      onClick={() => setExpandedContent(isContentOpen ? null : key)}
                      className={`px-2 py-1 text-xs rounded transition-colors ${isContentOpen ? 'text-blue-700 bg-blue-100' : 'text-gray-500 hover:text-blue-600 hover:bg-blue-50'}`}
                    >
                      {isContentOpen ? 'Close' : 'Edit'}
                    </button>
                  )}

                  {/* Mini CTA: edit / remove */}
                  {isMiniCta && (
                    <>
                      <button
                        type="button"
                        onClick={() => (isEditing ? setEditingId(null) : startEdit(ctaId!))}
                        className="px-2 py-1 text-xs text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                      >
                        {isEditing ? 'Close' : 'Edit'}
                      </button>
                      <button
                        type="button"
                        onClick={() => removeMiniCta(ctaId!)}
                        className="px-2 py-1 text-xs text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                      >
                        ✕
                      </button>
                    </>
                  )}

                  {/* Insert CTA after this row */}
                  <button
                    type="button"
                    onClick={() => isInsertingAfter ? setShowAddForm(false) : openInsertForm(index)}
                    className={`px-2 py-1 text-xs rounded transition-colors ${isInsertingAfter ? 'text-blue-600 bg-blue-50' : 'text-gray-400 hover:text-blue-600 hover:bg-blue-50'}`}
                    title="Insert mini CTA after this row"
                  >
                    + CTA
                  </button>

                  {/* Reorder */}
                  <button type="button" onClick={() => moveUp(index)} disabled={index === 0}
                    className="px-1 py-1 text-gray-400 hover:text-gray-700 rounded disabled:opacity-25 disabled:cursor-not-allowed transition-colors">↑</button>
                  <button type="button" onClick={() => moveDown(index)} disabled={index === order.length - 1}
                    className="px-1 py-1 text-gray-400 hover:text-gray-700 rounded disabled:opacity-25 disabled:cursor-not-allowed transition-colors">↓</button>
                </div>
              </div>

              {/* Expandable content editor for core sections.
                  Always rendered (even when hidden) so the textarea value is always submitted. */}
              {meta && (
                <div className={isContentOpen ? 'border-t border-gray-100' : 'hidden'}>
                  <div className="p-3 bg-gray-50 space-y-2">
                    <p className="text-xs text-gray-500">
                      JSON array of{' '}
                      <code className="bg-white border border-gray-200 px-1 rounded">{meta.schema}</code>
                    </p>
                    <textarea
                      name={meta.contentField}
                      defaultValue={JSON.stringify(initialContent?.[meta.contentField] ?? [], null, 2)}
                      rows={10}
                      className="w-full font-mono text-xs text-gray-900 bg-white border border-gray-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
                      spellCheck={false}
                    />
                  </div>
                </div>
              )}

              {/* Mini CTA inline edit form */}
              {isMiniCta && isEditing && (
                <div className="border-t border-gray-100">
                  <MiniCtaForm form={form} onChange={setForm} onSave={() => saveEdit(ctaId!)} onCancel={() => setEditingId(null)} saveLabel="Update" />
                </div>
              )}
            </div>

            {/* Inline insert form — appears between rows */}
            {isInsertingAfter && (
              <div className="mt-2 border border-blue-200 rounded-lg overflow-hidden">
                <div className="bg-blue-50 px-3 py-2 text-sm font-medium text-blue-700 flex justify-between items-center">
                  <span>Insert Mini CTA after <strong>{label}</strong></span>
                  <button type="button" onClick={() => setShowAddForm(false)} className="text-blue-400 hover:text-blue-600 text-xl leading-none">×</button>
                </div>
                <MiniCtaForm form={form} onChange={setForm} onSave={addMiniCta} onCancel={() => setShowAddForm(false)} saveLabel="Insert CTA" />
              </div>
            )}
          </div>
        );
      })}

      {/* Pinned: Final CTA */}
      <PinnedRow label="Final CTA Section" note="always last" />

      {/* Append CTA at bottom */}
      {showAddForm && insertAfterIndex === -1 ? (
        <div className="border border-blue-200 rounded-lg overflow-hidden">
          <div className="bg-blue-50 px-3 py-2 text-sm font-medium text-blue-700 flex justify-between items-center">
            <span>New Mini CTA (at end)</span>
            <button type="button" onClick={() => setShowAddForm(false)} className="text-blue-400 hover:text-blue-600 text-xl leading-none">×</button>
          </div>
          <MiniCtaForm form={form} onChange={setForm} onSave={addMiniCta} onCancel={() => setShowAddForm(false)} saveLabel="Add to Page" />
        </div>
      ) : !showAddForm ? (
        <button
          type="button"
          onClick={() => { setForm(EMPTY_FORM); setEditingId(null); setInsertAfterIndex(-1); setShowAddForm(true); }}
          className="w-full border-2 border-dashed border-gray-200 rounded-lg py-2.5 text-sm text-gray-400 hover:border-blue-400 hover:text-blue-600 transition-colors"
        >
          + Add Mini CTA at end
        </button>
      ) : null}
    </div>
  );
}

// ─── Pinned row ────────────────────────────────────────────────────────────────

function PinnedRow({ label, note }: { label: string; note: string }) {
  return (
    <div className="flex items-center gap-2 px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg">
      <span className="w-4 shrink-0" />
      <span className="w-5 shrink-0" />
      <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-gray-200 text-gray-500 text-xs font-medium whitespace-nowrap">
        Pinned
      </span>
      <span className="text-sm font-medium text-gray-500">{label}</span>
      <span className="text-xs text-gray-400 italic">— {note}</span>
    </div>
  );
}

// ─── Mini CTA form ─────────────────────────────────────────────────────────────

interface MiniCtaFormProps {
  form: Omit<MiniCtaFormData, 'id'>;
  onChange: (data: Omit<MiniCtaFormData, 'id'>) => void;
  onSave: () => void;
  onCancel: () => void;
  saveLabel: string;
}

function MiniCtaForm({ form, onChange, onSave, onCancel, saveLabel }: MiniCtaFormProps) {
  const set = (field: keyof Omit<MiniCtaFormData, 'id'>, value: string) =>
    onChange({ ...form, [field]: value });

  const inputCls = 'w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500';

  return (
    <div className="p-4 space-y-3 bg-white">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Title <span className="text-red-500">*</span></label>
          <input type="text" value={form.title} onChange={(e) => set('title', e.target.value)} placeholder="Ready to get started?" className={inputCls} />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Style</label>
          <select value={form.style} onChange={(e) => set('style', e.target.value)} className={inputCls}>
            <option value="default">Default (Blue)</option>
            <option value="emergency">Emergency (Red)</option>
            <option value="subtle">Subtle (Gray)</option>
          </select>
        </div>
      </div>
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">Description</label>
        <input type="text" value={form.description} onChange={(e) => set('description', e.target.value)} placeholder="Optional supporting text" className={inputCls} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Button Text</label>
          <input type="text" value={form.buttonText} onChange={(e) => set('buttonText', e.target.value)} placeholder="Contact Us" className={inputCls} />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Button Link</label>
          <input type="text" value={form.buttonHref} onChange={(e) => set('buttonHref', e.target.value)} placeholder="/contact (default)" className={inputCls} />
        </div>
      </div>
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">Phone <span className="text-gray-400">(optional — adds a call button)</span></label>
        <input type="text" value={form.phone} onChange={(e) => set('phone', e.target.value)} placeholder="405-242-6028" className={inputCls} />
      </div>
      <div className="flex justify-end gap-2 pt-1">
        <button type="button" onClick={onCancel} className="px-4 py-2 text-sm text-gray-500 hover:text-gray-700">Cancel</button>
        <button type="button" onClick={onSave} disabled={!form.title.trim()} className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
          {saveLabel}
        </button>
      </div>
    </div>
  );
}
