import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { getServiceData } from '@/lib/content';
import Link from 'next/link';
import { saveService } from '../../actions';
import { Field, TextareaField, CheckboxField, SectionCard } from '../../components/FormField';
import { ImageField } from '../../components/ImageField';
import type { ServiceData } from '@/types/service';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ServiceEditorPage({ params }: PageProps) {
  const { slug } = await params;
  const svc = await getServiceData(slug) as ServiceData | null;

  if (!svc) notFound();

  const dbRow = await prisma.servicePage.findUnique({ where: { slug } });

  const saveWithSlug = saveService.bind(null, slug);

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Link href="/admin/services" className="text-sm text-gray-400 hover:text-gray-600">
            ← Services
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 mt-1">{svc.name}</h1>
          {dbRow && !dbRow.isEnabled && (
            <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full mt-1 inline-block">
              Hidden from public site
            </span>
          )}
        </div>
        <Link
          href={`/services/${slug}`}
          target="_blank"
          className="text-sm text-blue-600 hover:text-blue-800"
        >
          Preview ↗
        </Link>
      </div>

      <form action={saveWithSlug} className="space-y-6">
        {/* Basic Info */}
        <SectionCard title="Basic Info">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Service Name" name="name" defaultValue={svc.name} required />
            <Field label="Icon (emoji)" name="icon" defaultValue={svc.icon} hint="e.g. ❄️ or 🔧" />
          </div>
          <TextareaField label="Description" name="description" defaultValue={svc.description} rows={3} />
          <ImageField label="Hero Image" name="heroImage" defaultValue={svc.heroImage ?? ''} hint="Upload via Media Library or paste a URL" />
        </SectionCard>

        {/* Call to Action */}
        <SectionCard title="Call to Action">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="CTA Title" name="ctaTitle" defaultValue={svc.cta?.title ?? ''} />
            <Field label="Phone Number" name="ctaPhone" defaultValue={svc.cta?.phone ?? ''} />
          </div>
          <TextareaField label="CTA Description" name="ctaDescription" defaultValue={svc.cta?.description ?? ''} rows={2} />
          <Field label="Button Text" name="ctaButtonText" defaultValue={svc.cta?.buttonText ?? 'Call Now'} />
        </SectionCard>

        {/* Section Visibility */}
        <SectionCard title="Section Visibility">
          <p className="text-xs text-gray-500 mb-3">Control which sections appear on this service page.</p>
          <div className="space-y-3">
            <CheckboxField label="Show Service Types Section" name="sectionsServiceTypes" defaultChecked={svc.sections?.serviceTypes !== false} />
            <CheckboxField label="Show Equipment Section" name="sectionsEquipment" defaultChecked={svc.sections?.equipment !== false} />
            <CheckboxField label="Show Brands Section" name="sectionsBrands" defaultChecked={svc.sections?.brands !== false} />
            <CheckboxField label="Show Common Issues Section" name="sectionsCommonIssues" defaultChecked={svc.sections?.commonIssues !== false} />
            <CheckboxField label="Show FAQs Section" name="sectionsFaqs" defaultChecked={svc.sections?.faqs !== false} />
          </div>
        </SectionCard>

        {/* Service Types */}
        <SectionCard title="Service Types">
          <p className="text-xs text-gray-500 mb-2">
            JSON array of{' '}
            <code className="bg-gray-100 px-1 rounded">{'{ name, description, features: string[] }'}</code>
          </p>
          <TextareaField
            label=""
            name="serviceTypes"
            defaultValue={JSON.stringify(svc.serviceTypes ?? [], null, 2)}
            rows={10}
            mono
          />
        </SectionCard>

        {/* Equipment */}
        <SectionCard title="Equipment We Service">
          <p className="text-xs text-gray-500 mb-2">
            JSON array of{' '}
            <code className="bg-gray-100 px-1 rounded">{'{ name, description, icon }'}</code>
          </p>
          <TextareaField
            label=""
            name="equipment"
            defaultValue={JSON.stringify(svc.equipment ?? [], null, 2)}
            rows={10}
            mono
          />
        </SectionCard>

        {/* Brands */}
        <SectionCard title="Brands">
          <p className="text-xs text-gray-500 mb-2">
            JSON array of{' '}
            <code className="bg-gray-100 px-1 rounded">{'{ name, logo? }'}</code>
          </p>
          <TextareaField
            label=""
            name="brands"
            defaultValue={JSON.stringify(svc.brands ?? [], null, 2)}
            rows={8}
            mono
          />
        </SectionCard>

        {/* FAQs */}
        <SectionCard title="FAQs">
          <p className="text-xs text-gray-500 mb-2">
            JSON array of{' '}
            <code className="bg-gray-100 px-1 rounded">{'{ question, answer }'}</code>
          </p>
          <TextareaField
            label=""
            name="faqs"
            defaultValue={JSON.stringify(svc.faqs ?? [], null, 2)}
            rows={10}
            mono
          />
        </SectionCard>

        {/* Common Issues */}
        <SectionCard title="Common Issues">
          <p className="text-xs text-gray-500 mb-2">
            JSON array of{' '}
            <code className="bg-gray-100 px-1 rounded">{'{ problem, solution, prevention? }'}</code>
          </p>
          <TextareaField
            label=""
            name="commonIssues"
            defaultValue={JSON.stringify(svc.commonIssues ?? [], null, 2)}
            rows={10}
            mono
          />
        </SectionCard>

        {/* SEO */}
        <SectionCard title="SEO">
          <Field label="Page Title" name="seoTitle" defaultValue={svc.seo?.title ?? ''} />
          <TextareaField label="Meta Description" name="seoDescription" defaultValue={svc.seo?.description ?? ''} rows={2} />
          <Field
            label="Keywords"
            name="seoKeywords"
            defaultValue={(svc.seo?.keywords ?? []).join(', ')}
            hint="Comma-separated list"
          />
        </SectionCard>

        {/* Save */}
        <div className="flex items-center gap-4 pb-8">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors"
          >
            Save Changes
          </button>
          <Link href="/admin/services" className="text-sm text-gray-500 hover:text-gray-700">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
