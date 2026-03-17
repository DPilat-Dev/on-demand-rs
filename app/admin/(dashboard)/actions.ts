'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

// ─── Feature Flags ────────────────────────────────────────────────────────────

export async function updateFeatureFlag(key: string, isEnabled: boolean) {
  await prisma.featureFlag.update({ where: { key }, data: { isEnabled } });
  revalidatePath('/admin/flags');
  if (key.startsWith('homepage.') || key.startsWith('googleReviews.')) revalidatePath('/');
  if (key.startsWith('service.')) revalidatePath('/services', 'layout');
  if (key.startsWith('contact.')) revalidatePath('/contact');
}

// ─── Services ─────────────────────────────────────────────────────────────────

export async function toggleServiceEnabled(id: string, slug: string, isEnabled: boolean) {
  await prisma.servicePage.update({ where: { id }, data: { isEnabled } });
  revalidatePath('/admin/services');
  revalidatePath('/services');
  revalidatePath(`/services/${slug}`);
}

export async function saveService(slug: string, formData: FormData) {
  const name = formData.get('name') as string;
  const description = formData.get('description') as string;
  const icon = formData.get('icon') as string;
  const heroImage = formData.get('heroImage') as string;
  const ctaTitle = formData.get('ctaTitle') as string;
  const ctaDescription = formData.get('ctaDescription') as string;
  const ctaButtonText = formData.get('ctaButtonText') as string;
  const ctaPhone = formData.get('ctaPhone') as string;
  const seoTitle = formData.get('seoTitle') as string;
  const seoDescription = formData.get('seoDescription') as string;
  const seoKeywordsRaw = formData.get('seoKeywords') as string;
  const sectionsServiceTypes = formData.get('sectionsServiceTypes') === 'on';
  const sectionsEquipment = formData.get('sectionsEquipment') === 'on';
  const sectionsBrands = formData.get('sectionsBrands') === 'on';
  const sectionsCommonIssues = formData.get('sectionsCommonIssues') === 'on';
  const sectionsFaqs = formData.get('sectionsFaqs') === 'on';

  // Parse JSON array fields
  let serviceTypes = [];
  let equipment = [];
  let brands = [];
  let faqs = [];
  let commonIssues = [];

  try { serviceTypes = JSON.parse(formData.get('serviceTypes') as string || '[]'); } catch {}
  try { equipment = JSON.parse(formData.get('equipment') as string || '[]'); } catch {}
  try { brands = JSON.parse(formData.get('brands') as string || '[]'); } catch {}
  try { faqs = JSON.parse(formData.get('faqs') as string || '[]'); } catch {}
  try { commonIssues = JSON.parse(formData.get('commonIssues') as string || '[]'); } catch {}

  const contentJson = {
    slug,
    name,
    description,
    icon,
    heroImage,
    serviceTypes,
    equipment,
    brands,
    faqs,
    commonIssues,
    cta: { title: ctaTitle, description: ctaDescription, buttonText: ctaButtonText, phone: ctaPhone },
    sections: {
      serviceTypes: sectionsServiceTypes,
      equipment: sectionsEquipment,
      brands: sectionsBrands,
      commonIssues: sectionsCommonIssues,
      faqs: sectionsFaqs,
    },
    seo: {
      title: seoTitle,
      description: seoDescription,
      keywords: seoKeywordsRaw.split(',').map((k) => k.trim()).filter(Boolean),
    },
  };

  await prisma.servicePage.upsert({
    where: { slug },
    update: { name, contentJson },
    create: { slug, name, contentJson, isEnabled: true },
  });

  revalidatePath('/admin/services');
  revalidatePath('/services');
  revalidatePath(`/services/${slug}`);
}

export async function createService(formData: FormData) {
  const name = formData.get('name') as string;
  const slug = name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

  const existing = await prisma.servicePage.findUnique({ where: { slug } });
  if (existing) throw new Error(`A service with slug "${slug}" already exists.`);

  const contentJson = {
    slug,
    name,
    description: '',
    icon: '🔧',
    heroImage: '',
    serviceTypes: [],
    equipment: [],
    brands: [],
    faqs: [],
    commonIssues: [],
    cta: { title: 'Need Service?', description: 'Contact us today.', buttonText: 'Call Now', phone: '405-242-6028' },
    sections: { equipment: true, brands: true, faq: true },
    seo: { title: name, description: '', keywords: [] },
  };

  const count = await prisma.servicePage.count();
  await prisma.servicePage.create({ data: { slug, name, contentJson, isEnabled: false, sortOrder: count } });

  revalidatePath('/admin/services');
  revalidatePath('/services');
  return slug;
}

export async function deleteService(id: string, slug: string) {
  await prisma.servicePage.delete({ where: { id } });
  revalidatePath('/admin/services');
  revalidatePath('/services');
  revalidatePath(`/services/${slug}`);
}

// ─── Page Content ─────────────────────────────────────────────────────────────

function tryJson(raw: string | null, fallback: unknown = []) {
  if (!raw) return fallback;
  try { return JSON.parse(raw); } catch { return fallback; }
}

function buildHomepageContent(fd: FormData) {
  return {
    seo: {
      title: fd.get('seoTitle'),
      description: fd.get('seoDescription'),
      keywords: (fd.get('seoKeywords') as string ?? '')
        .split(',').map((k) => k.trim()).filter(Boolean),
    },
    hero: {
      badge: fd.get('heroBadge'),
      title: fd.get('heroTitle'),
      subtitle: fd.get('heroSubtitle'),
      backgroundImage: fd.get('heroBackgroundImage'),
      backgroundImageAlt: fd.get('heroBackgroundImageAlt'),
      form: { buttonText: fd.get('heroButtonText'), emailPlaceholder: 'Email' },
      emergency: { phone: fd.get('heroPhone'), text: fd.get('heroEmergencyText') },
      certification: {
        image: fd.get('heroCertificationImage'),
        alt: fd.get('heroCertificationAlt'),
      },
    },
    whyChoose: {
      title: fd.get('whyChooseTitle'),
      subtitle: fd.get('whyChooseSubtitle'),
      businessCards: tryJson(fd.get('whyChooseBusinessCards') as string),
    },
    servicePromise: {
      title: fd.get('servicePromiseTitle'),
      subtitle: fd.get('servicePromiseSubtitle'),
      deliveryCards: tryJson(fd.get('servicePromiseCards') as string),
    },
    testimonials: {
      title: fd.get('testimonialsTitle'),
      subtitle: fd.get('testimonialsSubtitle'),
      testimonials: tryJson(fd.get('testimonialsList') as string),
      googleCTA: {
        text: fd.get('googleCtaText'),
        buttonText: fd.get('googleCtaButton'),
        link: fd.get('googleCtaLink'),
      },
    },
    whyChooseUs: {
      title: fd.get('whyUsTitle'),
      description: fd.get('whyUsDescription'),
      features: tryJson(fd.get('whyUsFeatures') as string),
      stats: tryJson(fd.get('whyUsStats') as string),
    },
    emergencyCTA: {
      title: fd.get('emergencyCtaTitle'),
      description: fd.get('emergencyCtaDescription'),
      phone: fd.get('emergencyCtaPhone'),
      note: fd.get('emergencyCtaNote'),
    },
    services: {
      title: fd.get('servicesTitle'),
      subtitle: fd.get('servicesSubtitle'),
      serviceCards: tryJson(fd.get('servicesServiceCards') as string),
    },
    contact: {
      title: fd.get('contactTitle'),
      subtitle: fd.get('contactSubtitle'),
      contactInfo: {
        phone: fd.get('contactPhone'),
        email: fd.get('contactEmail'),
        address: fd.get('contactAddress'),
        hours: fd.get('contactHours'),
      },
      map: {
        embedUrl: fd.get('contactMapEmbedUrl'),
        directionsUrl: fd.get('contactMapDirectionsUrl'),
      },
      form: tryJson(fd.get('contactForm') as string, null),
    },
  };
}

function buildAboutContent(fd: FormData) {
  return {
    hero: {
      title: fd.get('heroTitle'),
      subtitle: fd.get('heroSubtitle'),
      description: fd.get('heroDescription'),
      backgroundImage: fd.get('heroBackgroundImage'),
    },
    mission: { title: fd.get('missionTitle'), content: fd.get('missionContent') },
    story: {
      title: fd.get('storyTitle'),
      sections: tryJson(fd.get('storySections') as string),
    },
    values: {
      title: fd.get('valuesTitle'),
      subtitle: fd.get('valuesSubtitle'),
      values: tryJson(fd.get('valuesList') as string),
    },
    team: {
      title: fd.get('teamTitle'),
      subtitle: fd.get('teamSubtitle'),
      experience: fd.get('teamExperience'),
      members: tryJson(fd.get('teamMembers') as string),
    },
    commitment: {
      title: fd.get('commitmentTitle'),
      points: tryJson(fd.get('commitmentPoints') as string),
    },
    contact: {
      title: fd.get('contactTitle'),
      subtitle: fd.get('contactSubtitle'),
      address: fd.get('contactAddress'),
      phone: fd.get('contactPhone'),
      email: fd.get('contactEmail'),
    },
  };
}

function buildContactContent(fd: FormData) {
  return {
    hero: {
      title: fd.get('heroTitle'),
      subtitle: fd.get('heroSubtitle'),
      description: fd.get('heroDescription'),
      backgroundImage: fd.get('heroBackgroundImage'),
    },
    contactInfo: tryJson(fd.get('contactInfo') as string),
    emergencyInfo: {
      title: fd.get('emergencyTitle'),
      subtitle: fd.get('emergencySubtitle'),
      phone: fd.get('emergencyPhone'),
      features: tryJson(fd.get('emergencyFeatures') as string),
    },
    services: {
      title: fd.get('servicesTitle'),
      subtitle: fd.get('servicesSubtitle'),
      quickLinks: tryJson(fd.get('quickLinks') as string),
    },
    location: {
      title: fd.get('locationTitle'),
      address: fd.get('locationAddress'),
    },
  };
}

function buildFooterContent(fd: FormData) {
  return {
    company: {
      name: fd.get('companyName'),
      tagline: fd.get('companyTagline'),
      description: fd.get('companyDescription'),
      logo: fd.get('companyLogo'),
      logoAlt: fd.get('companyLogoAlt'),
    },
    contact: {
      phone: fd.get('contactPhone'),
      email: fd.get('contactEmail'),
      address: {
        street: fd.get('contactStreet'),
        city: fd.get('contactCity'),
        state: fd.get('contactState'),
        zip: fd.get('contactZip'),
      },
      hours: {
        regular: fd.get('contactHoursRegular'),
        emergency: fd.get('contactHoursEmergency'),
      },
    },
    sections: tryJson(fd.get('sections') as string),
    socialMedia: tryJson(fd.get('socialMedia') as string),
    legal: {
      copyright: fd.get('legalCopyright'),
      license: fd.get('legalLicense'),
      privacyPolicy: fd.get('legalPrivacy'),
      termsOfService: fd.get('legalTerms'),
    },
  };
}

function buildServicesListingContent(fd: FormData) {
  return {
    hero: {
      title: fd.get('heroTitle'),
      subtitle: fd.get('heroSubtitle'),
      phone: fd.get('heroPhone'),
      heroImage: fd.get('heroImage'),
      heroImageAlt: fd.get('heroImageAlt'),
      overlayTitle: fd.get('heroOverlayTitle'),
      overlaySubtitle: fd.get('heroOverlaySubtitle'),
    },
    emergencyCTA: {
      title: fd.get('emergencyTitle'),
      description: fd.get('emergencyDescription'),
      phone: fd.get('emergencyPhone'),
      footer: fd.get('emergencyFooter'),
    },
  };
}

const CONTENT_BUILDERS: Record<string, (fd: FormData) => object> = {
  homepage: buildHomepageContent,
  about: buildAboutContent,
  contact: buildContactContent,
  footer: buildFooterContent,
  'services-listing': buildServicesListingContent,
};

export async function savePageContent(pageKey: string, formData: FormData) {
  const builder = CONTENT_BUILDERS[pageKey];
  if (!builder) throw new Error(`Unknown pageKey: ${pageKey}`);
  const contentJson = builder(formData);

  await prisma.pageContent.upsert({
    where: { pageKey },
    update: { contentJson },
    create: { pageKey, contentJson },
  });

  const pathMap: Record<string, string[]> = {
    homepage: ['/'],
    about: ['/about'],
    contact: ['/contact'],
    footer: ['/'],
    'services-listing': ['/services'],
  };

  for (const path of pathMap[pageKey] ?? ['/']) {
    revalidatePath(path);
  }
  revalidatePath(`/admin/content/${pageKey}`);
}
