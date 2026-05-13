import { notFound } from 'next/navigation';
import { getServiceDataForAdmin } from '@/lib/content';
import Link from 'next/link';
import { saveService } from '../../actions';
import { Field, TextareaField, SectionCard } from '../../components/FormField';
import { ImageField } from '../../components/ImageField';
import { SubmitButton } from '../../components/SubmitButton';
import SectionOrderEditor from './SectionOrderEditor';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ServiceEditorPage({ params }: PageProps) {
  const { slug } = await params;
  const result = await getServiceDataForAdmin(slug);

  if (!result) notFound();

  const { svc, dbRow } = result;

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
          <TextareaField label="Description" name="description" defaultValue={svc.description} rows={3} hint="Used on the individual service page." />
          <ImageField label="Hero Image" name="heroImage" defaultValue={svc.heroImage ?? ''} hint="Upload via Media Library or paste a URL" />
        </SectionCard>

        {/* Services Listing Card */}
        <SectionCard title="Services Listing Card">
          <p className="text-xs text-gray-500 mb-3">Controls how this service appears on the <strong>/services</strong> listing page.</p>
          <TextareaField label="Listing Description" name="listingDescription" defaultValue={svc.listingDescription ?? ''} rows={2} hint="Short snippet shown on the /services page. Leave blank to use the main description." />
          <TextareaField
            label="Listing Features"
            name="listingFeatures"
            defaultValue={JSON.stringify(svc.listingFeatures ?? [], null, 2)}
            rows={6}
            mono
            hint={'JSON array of bullet points, e.g. ["24/7 Emergency Service", "All Major Brands"]'}
          />
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

        {/* Sections — visibility, order, content editors, mini CTAs */}
        <SectionCard title="Sections">
          <SectionOrderEditor
            initialOrder={svc.sectionOrder}
            initialMiniCtas={svc.miniCtas}
            initialSections={svc.sections}
            initialContent={{
              serviceTypes: svc.serviceTypes ?? [],
              equipment:    svc.equipment    ?? [],
              commonIssues: svc.commonIssues ?? [],
              brands:       svc.brands       ?? [],
              faqs:         svc.faqs         ?? [],
            }}
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
          <SubmitButton>Save Changes</SubmitButton>
          <Link href="/admin/services" className="text-sm text-gray-500 hover:text-gray-700">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
