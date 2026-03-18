import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getPageContent } from '@/lib/content';
import { savePageContent } from '../../actions';
import { Field, TextareaField, SectionCard } from '../../components/FormField';
import { ImageField } from '../../components/ImageField';
import { VideoListField } from '../../components/VideoListField';
import { SubmitButton } from '../../components/SubmitButton';

interface PageProps {
  params: Promise<{ pageKey: string }>;
}

const PAGE_META: Record<string, { label: string; path: string }> = {
  homepage: { label: 'Homepage', path: '/' },
  about: { label: 'About Us', path: '/about' },
  contact: { label: 'Contact Page', path: '/contact' },
  footer: { label: 'Footer', path: '/' },
  'services-listing': { label: 'Services Listing Page', path: '/services' },
};

export default async function ContentEditorPage({ params }: PageProps) {
  const { pageKey } = await params;

  if (!PAGE_META[pageKey]) notFound();

  const meta = PAGE_META[pageKey];
  const data = await getPageContent(pageKey as any);

  const save = savePageContent.bind(null, pageKey);

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Link href="/admin/content" className="text-sm text-gray-400 hover:text-gray-600">
            ← Page Content
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 mt-1">{meta.label}</h1>
        </div>
        <Link
          href={meta.path}
          target="_blank"
          className="text-sm text-blue-600 hover:text-blue-800"
        >
          Preview ↗
        </Link>
      </div>

      <ContentForm pageKey={pageKey} data={data} save={save} />
    </div>
  );
}

// ─── Per-page form renderers ──────────────────────────────────────────────────

async function ContentForm({
  pageKey,
  data,
  save,
}: {
  pageKey: string;
  data: any;
  save: (formData: FormData) => Promise<void>;
}) {
  switch (pageKey) {
    case 'homepage':
      return <HomepageForm data={data} save={save} />;
    case 'about':
      return <AboutForm data={data} save={save} />;
    case 'contact':
      return <ContactForm data={data} save={save} />;
    case 'footer':
      return <FooterForm data={data} save={save} />;
    case 'services-listing':
      return <ServicesListingForm data={data} save={save} />;
    default:
      return null;
  }
}

// ─── Homepage ────────────────────────────────────────────────────────────────

function HomepageForm({ data, save }: { data: any; save: (fd: FormData) => Promise<void> }) {
  return (
    <form action={save} className="space-y-6">
      <SectionCard title="SEO">
        <Field label="Page Title" name="seoTitle" defaultValue={data.seo?.title ?? ''} />
        <TextareaField label="Meta Description" name="seoDescription" defaultValue={data.seo?.description ?? ''} rows={2} />
        <Field label="Keywords" name="seoKeywords" defaultValue={(data.seo?.keywords ?? []).join(', ')} hint="Comma-separated" />
      </SectionCard>

      <SectionCard title="Hero Section">
        <Field label="Badge Text" name="heroBadge" defaultValue={data.hero?.badge ?? ''} />
        <Field label="Title" name="heroTitle" defaultValue={data.hero?.title ?? ''} />
        <Field label="Subtitle" name="heroSubtitle" defaultValue={data.hero?.subtitle ?? ''} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Emergency Phone" name="heroPhone" defaultValue={data.hero?.emergency?.phone ?? ''} />
          <Field label="Emergency Text" name="heroEmergencyText" defaultValue={data.hero?.emergency?.text ?? ''} />
        </div>
        <ImageField label="Background Image" name="heroBackgroundImage" defaultValue={data.hero?.backgroundImage ?? ''} hint="Upload via Media Library or paste a URL" />
        <Field label="Background Image Alt Text" name="heroBackgroundImageAlt" defaultValue={data.hero?.backgroundImageAlt ?? ''} />
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Hero Videos</label>
          <VideoListField name="heroVideos" defaultValue={data.hero?.heroVideos ?? []} hint="One video is randomly selected each page load. Clear all to use the background image instead." />
        </div>
        <Field label="Button Text" name="heroButtonText" defaultValue={data.hero?.form?.buttonText ?? ''} />
        <ImageField label="Certification Logo" name="heroCertificationImage" defaultValue={data.hero?.certification?.image ?? ''} hint="e.g. /content/cfesa-logo.png" />
        <Field label="Certification Alt Text" name="heroCertificationAlt" defaultValue={data.hero?.certification?.alt ?? ''} />
      </SectionCard>

      <SectionCard title="Why Choose Section">
        <Field label="Title" name="whyChooseTitle" defaultValue={data.whyChoose?.title ?? ''} />
        <Field label="Subtitle" name="whyChooseSubtitle" defaultValue={data.whyChoose?.subtitle ?? ''} />
        <TextareaField
          label="Business Cards"
          name="whyChooseBusinessCards"
          defaultValue={JSON.stringify(data.whyChoose?.businessCards ?? [], null, 2)}
          rows={12}
          mono
        />
      </SectionCard>

      <SectionCard title="Service Promise Section">
        <Field label="Title" name="servicePromiseTitle" defaultValue={data.servicePromise?.title ?? ''} />
        <Field label="Subtitle" name="servicePromiseSubtitle" defaultValue={data.servicePromise?.subtitle ?? ''} />
        <TextareaField
          label="Delivery Cards"
          name="servicePromiseCards"
          defaultValue={JSON.stringify(data.servicePromise?.deliveryCards ?? [], null, 2)}
          rows={20}
          mono
        />
      </SectionCard>

      <SectionCard title="Testimonials">
        <Field label="Title" name="testimonialsTitle" defaultValue={data.testimonials?.title ?? ''} />
        <Field label="Subtitle" name="testimonialsSubtitle" defaultValue={data.testimonials?.subtitle ?? ''} />
        <TextareaField
          label="Testimonials"
          name="testimonialsList"
          defaultValue={JSON.stringify(data.testimonials?.testimonials ?? [], null, 2)}
          rows={18}
          mono
        />
        <Field label="Google CTA Text" name="googleCtaText" defaultValue={data.testimonials?.googleCTA?.text ?? ''} />
        <Field label="Google CTA Button" name="googleCtaButton" defaultValue={data.testimonials?.googleCTA?.buttonText ?? ''} />
        <Field label="Google CTA Link" name="googleCtaLink" defaultValue={data.testimonials?.googleCTA?.link ?? ''} />
      </SectionCard>

      <SectionCard title="Why Choose Us (Stats Section)">
        <Field label="Title" name="whyUsTitle" defaultValue={data.whyChooseUs?.title ?? ''} />
        <TextareaField label="Description" name="whyUsDescription" defaultValue={data.whyChooseUs?.description ?? ''} rows={2} />
        <TextareaField
          label="Features"
          name="whyUsFeatures"
          defaultValue={JSON.stringify(data.whyChooseUs?.features ?? [], null, 2)}
          rows={12}
          mono
        />
        <TextareaField
          label="Stats"
          name="whyUsStats"
          defaultValue={JSON.stringify(data.whyChooseUs?.stats ?? [], null, 2)}
          rows={8}
          mono
        />
      </SectionCard>

      <SectionCard title="Emergency CTA">
        <Field label="Title" name="emergencyCtaTitle" defaultValue={data.emergencyCTA?.title ?? ''} />
        <Field label="Description" name="emergencyCtaDescription" defaultValue={data.emergencyCTA?.description ?? ''} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Phone" name="emergencyCtaPhone" defaultValue={data.emergencyCTA?.phone ?? ''} />
          <Field label="Note" name="emergencyCtaNote" defaultValue={data.emergencyCTA?.note ?? ''} />
        </div>
      </SectionCard>

      <SectionCard title="Services Section">
        <Field label="Title" name="servicesTitle" defaultValue={data.services?.title ?? ''} />
        <Field label="Subtitle" name="servicesSubtitle" defaultValue={data.services?.subtitle ?? ''} />
        <p className="text-xs text-gray-500 mb-2">
          JSON array of <code className="bg-gray-100 px-1 rounded">{'{ title, description, icon, iconColor, features, link }'}</code>
        </p>
        <TextareaField
          label=""
          name="servicesServiceCards"
          defaultValue={JSON.stringify(data.services?.serviceCards ?? [], null, 2)}
          rows={30}
          mono
        />
      </SectionCard>

      <SectionCard title="Contact Section">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Title" name="contactTitle" defaultValue={data.contact?.title ?? ''} />
          <Field label="Subtitle" name="contactSubtitle" defaultValue={data.contact?.subtitle ?? ''} />
          <Field label="Phone" name="contactPhone" defaultValue={data.contact?.contactInfo?.phone ?? ''} />
          <Field label="Email" name="contactEmail" defaultValue={data.contact?.contactInfo?.email ?? ''} />
          <Field label="Hours" name="contactHours" defaultValue={data.contact?.contactInfo?.hours ?? ''} />
        </div>
        <Field label="Address" name="contactAddress" defaultValue={data.contact?.contactInfo?.address ?? ''} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Map Embed URL" name="contactMapEmbedUrl" defaultValue={data.contact?.map?.embedUrl ?? ''} />
          <Field label="Directions URL" name="contactMapDirectionsUrl" defaultValue={data.contact?.map?.directionsUrl ?? ''} />
        </div>
        <p className="text-xs text-gray-500 mb-2">Contact Form config (JSON)</p>
        <TextareaField
          label=""
          name="contactForm"
          defaultValue={JSON.stringify(data.contact?.form ?? {}, null, 2)}
          rows={16}
          mono
        />
      </SectionCard>

      <SaveBar href="/admin/content" />
    </form>
  );
}

// ─── About ───────────────────────────────────────────────────────────────────

function AboutForm({ data, save }: { data: any; save: (fd: FormData) => Promise<void> }) {
  return (
    <form action={save} className="space-y-6">
      <SectionCard title="Hero">
        <Field label="Title" name="heroTitle" defaultValue={data.hero?.title ?? ''} />
        <Field label="Subtitle" name="heroSubtitle" defaultValue={data.hero?.subtitle ?? ''} />
        <TextareaField label="Description" name="heroDescription" defaultValue={data.hero?.description ?? ''} rows={2} />
        <ImageField label="Background Image" name="heroBackgroundImage" defaultValue={data.hero?.backgroundImage ?? ''} hint="Upload via Media Library or paste a URL" />
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Hero Videos</label>
          <VideoListField name="heroVideos" defaultValue={data.hero?.heroVideos ?? []} hint="One video is randomly selected each page load. Clear all to use the background image instead." />
        </div>
      </SectionCard>

      <SectionCard title="Mission">
        <Field label="Title" name="missionTitle" defaultValue={data.mission?.title ?? ''} />
        <TextareaField label="Content" name="missionContent" defaultValue={data.mission?.content ?? ''} rows={4} />
      </SectionCard>

      <SectionCard title="Our Story">
        <Field label="Title" name="storyTitle" defaultValue={data.story?.title ?? ''} />
        <p className="text-xs text-gray-500 mb-2">
          JSON array of <code className="bg-gray-100 px-1 rounded">{'{ id, title, content, icon?, highlight? }'}</code>
        </p>
        <TextareaField
          label=""
          name="storySections"
          defaultValue={JSON.stringify(data.story?.sections ?? [], null, 2)}
          rows={16}
          mono
        />
      </SectionCard>

      <SectionCard title="Values">
        <Field label="Title" name="valuesTitle" defaultValue={data.values?.title ?? ''} />
        <Field label="Subtitle" name="valuesSubtitle" defaultValue={data.values?.subtitle ?? ''} />
        <p className="text-xs text-gray-500 mb-2">
          JSON array of <code className="bg-gray-100 px-1 rounded">{'{ title, description, icon }'}</code>
        </p>
        <TextareaField
          label=""
          name="valuesList"
          defaultValue={JSON.stringify(data.values?.values ?? [], null, 2)}
          rows={14}
          mono
        />
      </SectionCard>

      <SectionCard title="Team">
        <Field label="Title" name="teamTitle" defaultValue={data.team?.title ?? ''} />
        <Field label="Subtitle" name="teamSubtitle" defaultValue={data.team?.subtitle ?? ''} />
        <TextareaField label="Experience Text" name="teamExperience" defaultValue={data.team?.experience ?? ''} rows={2} />
        <p className="text-xs text-gray-500 mb-2">
          JSON array of <code className="bg-gray-100 px-1 rounded">{'{ name, role, bio, image?, experience }'}</code>
        </p>
        <TextareaField
          label=""
          name="teamMembers"
          defaultValue={JSON.stringify(data.team?.members ?? [], null, 2)}
          rows={20}
          mono
        />
      </SectionCard>

      <SectionCard title="Commitment">
        <Field label="Title" name="commitmentTitle" defaultValue={data.commitment?.title ?? ''} />
        <p className="text-xs text-gray-500 mb-2">JSON array of strings</p>
        <TextareaField
          label=""
          name="commitmentPoints"
          defaultValue={JSON.stringify(data.commitment?.points ?? [], null, 2)}
          rows={8}
          mono
        />
      </SectionCard>

      <SectionCard title="Contact Info (bottom of page)">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Title" name="contactTitle" defaultValue={data.contact?.title ?? ''} />
          <Field label="Subtitle" name="contactSubtitle" defaultValue={data.contact?.subtitle ?? ''} />
          <Field label="Phone" name="contactPhone" defaultValue={data.contact?.phone ?? ''} />
          <Field label="Email" name="contactEmail" defaultValue={data.contact?.email ?? ''} />
        </div>
        <Field label="Address" name="contactAddress" defaultValue={data.contact?.address ?? ''} />
      </SectionCard>

      <SaveBar href="/admin/content" />
    </form>
  );
}

// ─── Contact ──────────────────────────────────────────────────────────────────

function ContactForm({ data, save }: { data: any; save: (fd: FormData) => Promise<void> }) {
  return (
    <form action={save} className="space-y-6">
      <SectionCard title="Hero">
        <Field label="Title" name="heroTitle" defaultValue={data.hero?.title ?? ''} />
        <Field label="Subtitle" name="heroSubtitle" defaultValue={data.hero?.subtitle ?? ''} />
        <TextareaField label="Description" name="heroDescription" defaultValue={data.hero?.description ?? ''} rows={2} />
        <ImageField label="Background Image" name="heroBackgroundImage" defaultValue={data.hero?.backgroundImage ?? ''} hint="Upload via Media Library or paste a URL" />
      </SectionCard>

      <SectionCard title="Contact Info Cards">
        <p className="text-xs text-gray-500 mb-2">
          JSON array of <code className="bg-gray-100 px-1 rounded">{'{ icon, title, content, link?, type? }'}</code>
        </p>
        <TextareaField
          label=""
          name="contactInfo"
          defaultValue={JSON.stringify(data.contactInfo ?? [], null, 2)}
          rows={20}
          mono
        />
      </SectionCard>

      <SectionCard title="Emergency Info">
        <Field label="Title" name="emergencyTitle" defaultValue={data.emergencyInfo?.title ?? ''} />
        <Field label="Subtitle" name="emergencySubtitle" defaultValue={data.emergencyInfo?.subtitle ?? ''} />
        <Field label="Phone" name="emergencyPhone" defaultValue={data.emergencyInfo?.phone ?? ''} />
        <p className="text-xs text-gray-500 mb-2">JSON array of feature strings</p>
        <TextareaField
          label=""
          name="emergencyFeatures"
          defaultValue={JSON.stringify(data.emergencyInfo?.features ?? [], null, 2)}
          rows={8}
          mono
        />
      </SectionCard>

      <SectionCard title="Services Quick Links">
        <Field label="Title" name="servicesTitle" defaultValue={data.services?.title ?? ''} />
        <Field label="Subtitle" name="servicesSubtitle" defaultValue={data.services?.subtitle ?? ''} />
        <p className="text-xs text-gray-500 mb-2">
          JSON array of <code className="bg-gray-100 px-1 rounded">{'{ name, href, icon, description }'}</code>
        </p>
        <TextareaField
          label=""
          name="quickLinks"
          defaultValue={JSON.stringify(data.services?.quickLinks ?? [], null, 2)}
          rows={16}
          mono
        />
      </SectionCard>

      <SectionCard title="Location">
        <Field label="Title" name="locationTitle" defaultValue={data.location?.title ?? ''} />
        <Field label="Address" name="locationAddress" defaultValue={data.location?.address ?? ''} />
      </SectionCard>

      <SaveBar href="/admin/content" />
    </form>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function FooterForm({ data, save }: { data: any; save: (fd: FormData) => Promise<void> }) {
  return (
    <form action={save} className="space-y-6">
      <SectionCard title="Company Info">
        <Field label="Company Name" name="companyName" defaultValue={data.company?.name ?? ''} />
        <Field label="Tagline" name="companyTagline" defaultValue={data.company?.tagline ?? ''} />
        <TextareaField label="Description" name="companyDescription" defaultValue={data.company?.description ?? ''} rows={3} />
        <ImageField label="Logo" name="companyLogo" defaultValue={data.company?.logo ?? ''} hint="Upload via Media Library or paste a URL" />
        <Field label="Logo Alt" name="companyLogoAlt" defaultValue={data.company?.logoAlt ?? ''} />
      </SectionCard>

      <SectionCard title="Contact Details">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Phone" name="contactPhone" defaultValue={data.contact?.phone ?? ''} />
          <Field label="Email" name="contactEmail" defaultValue={data.contact?.email ?? ''} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Street" name="contactStreet" defaultValue={data.contact?.address?.street ?? ''} />
          <Field label="City" name="contactCity" defaultValue={data.contact?.address?.city ?? ''} />
          <Field label="State" name="contactState" defaultValue={data.contact?.address?.state ?? ''} />
          <Field label="ZIP" name="contactZip" defaultValue={data.contact?.address?.zip ?? ''} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Regular Hours" name="contactHoursRegular" defaultValue={data.contact?.hours?.regular ?? ''} />
          <Field label="Emergency Hours" name="contactHoursEmergency" defaultValue={data.contact?.hours?.emergency ?? ''} />
        </div>
      </SectionCard>

      <SectionCard title="Navigation Sections">
        <p className="text-xs text-gray-500 mb-2">
          JSON array of <code className="bg-gray-100 px-1 rounded">{'{ title, links: [{ label, href }] }'}</code>
        </p>
        <TextareaField
          label=""
          name="sections"
          defaultValue={JSON.stringify(data.sections ?? [], null, 2)}
          rows={18}
          mono
        />
      </SectionCard>

      <SectionCard title="Social Media">
        <p className="text-xs text-gray-500 mb-2">
          JSON array of <code className="bg-gray-100 px-1 rounded">{'{ platform, href, icon, iconColor }'}</code>
        </p>
        <TextareaField
          label=""
          name="socialMedia"
          defaultValue={JSON.stringify(data.socialMedia ?? [], null, 2)}
          rows={14}
          mono
        />
      </SectionCard>

      <SectionCard title="Legal">
        <Field label="Copyright" name="legalCopyright" defaultValue={data.legal?.copyright ?? ''} />
        <Field label="License" name="legalLicense" defaultValue={data.legal?.license ?? ''} />
        <Field label="Privacy Policy URL" name="legalPrivacy" defaultValue={data.legal?.privacyPolicy ?? ''} />
        <Field label="Terms of Service URL" name="legalTerms" defaultValue={data.legal?.termsOfService ?? ''} />
      </SectionCard>

      <SaveBar href="/admin/content" />
    </form>
  );
}

// ─── Services Listing ─────────────────────────────────────────────────────────

function ServicesListingForm({ data, save }: { data: any; save: (fd: FormData) => Promise<void> }) {
  return (
    <form action={save} className="space-y-6">
      <SectionCard title="Hero Section">
        <Field label="Title" name="heroTitle" defaultValue={data.hero?.title ?? ''} />
        <Field label="Subtitle" name="heroSubtitle" defaultValue={data.hero?.subtitle ?? ''} />
        <Field label="Phone" name="heroPhone" defaultValue={data.hero?.phone ?? ''} />
        <ImageField label="Hero Image" name="heroImage" defaultValue={data.hero?.heroImage ?? ''} hint="Upload via Media Library or paste a URL" />
        <Field label="Hero Image Alt Text" name="heroImageAlt" defaultValue={data.hero?.heroImageAlt ?? ''} />
        <Field label="Overlay Title" name="heroOverlayTitle" defaultValue={data.hero?.overlayTitle ?? ''} />
        <Field label="Overlay Subtitle" name="heroOverlaySubtitle" defaultValue={data.hero?.overlaySubtitle ?? ''} />
      </SectionCard>

      <SectionCard title="Our Expertise Section">
        <Field label="Title" name="expertiseTitle" defaultValue={data.expertise?.title ?? ''} />
        <Field label="Subtitle" name="expertiseSubtitle" defaultValue={data.expertise?.subtitle ?? ''} />
      </SectionCard>

      <SectionCard title="Emergency CTA Section">
        <Field label="Title" name="emergencyTitle" defaultValue={data.emergencyCTA?.title ?? ''} />
        <TextareaField label="Description" name="emergencyDescription" defaultValue={data.emergencyCTA?.description ?? ''} rows={3} />
        <Field label="Phone" name="emergencyPhone" defaultValue={data.emergencyCTA?.phone ?? ''} />
        <Field label="Footer Text" name="emergencyFooter" defaultValue={data.emergencyCTA?.footer ?? ''} hint="e.g. Available 24/7 • Licensed & Insured" />
      </SectionCard>

      <SaveBar href="/admin/content" />
    </form>
  );
}

// ─── Shared save bar ──────────────────────────────────────────────────────────

function SaveBar({ href }: { href: string }) {
  return (
    <div className="flex items-center gap-4 pb-8">
      <SubmitButton>Save Changes</SubmitButton>
      <Link href={href} className="text-sm text-gray-500 hover:text-gray-700">
        Cancel
      </Link>
    </div>
  );
}
