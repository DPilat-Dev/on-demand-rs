/**
 * DB-first content access layer with TypeScript static-file fallback.
 *
 * Each function tries the database first. If no record exists yet (not seeded)
 * or the DB is unreachable, it returns the static data from ./data/.
 * This means all public pages work identically before and after DB setup.
 */

import { prisma } from './prisma';
import { homePageData, type HomePageData } from '@/data/homepage';
import { footerData } from '@/data/footer';
import { type FooterData } from '@/types/footer';
import { type ServiceData } from '@/types/service';

type ServicePageRow = Awaited<ReturnType<typeof prisma.servicePage.findMany>>[number];
type FeatureFlagRow = Awaited<ReturnType<typeof prisma.featureFlag.findMany>>[number];

// ─── Static service map (fallback) ───────────────────────────────────────────

async function getStaticServiceMap(): Promise<Record<string, ServiceData>> {
  const [
    { commercialRefrigerationData },
    { commercialHVACData },
    { foodServiceEquipmentData },
    { iceMachinesData },
    { preventiveMaintenanceData },
  ] = await Promise.all([
    import('@/data/services/commercial-refrigeration'),
    import('@/data/services/commercial-hvac'),
    import('@/data/services/food-service-equipment'),
    import('@/data/services/ice-machines'),
    import('@/data/services/preventive-maintenance'),
  ]);

  return {
    'commercial-refrigeration': commercialRefrigerationData,
    'commercial-hvac': commercialHVACData,
    'food-service-equipment': foodServiceEquipmentData,
    'ice-machines': iceMachinesData,
    'preventive-maintenance': preventiveMaintenanceData,
  };
}

// ─── Page content ─────────────────────────────────────────────────────────────

type PageKey = 'homepage' | 'about' | 'contact' | 'footer';

type PageDataMap = {
  homepage: HomePageData;
  about: unknown;
  contact: unknown;
  footer: FooterData;
};

async function getStaticPageContent<K extends PageKey>(pageKey: K): Promise<PageDataMap[K]> {
  switch (pageKey) {
    case 'homepage':
      return homePageData as PageDataMap[K];
    case 'footer':
      return footerData as PageDataMap[K];
    case 'about': {
      const { aboutUsData } = await import('@/data/about');
      return aboutUsData as PageDataMap[K];
    }
    case 'contact': {
      const { contactPageData } = await import('@/data/contact');
      return contactPageData as PageDataMap[K];
    }
    default:
      return homePageData as PageDataMap[K];
  }
}

export async function getPageContent<K extends PageKey>(pageKey: K): Promise<PageDataMap[K]> {
  const staticData = await getStaticPageContent(pageKey);
  try {
    const row = await prisma.pageContent.findUnique({ where: { pageKey } });
    if (row?.contentJson) {
      // Shallow-merge: static data provides base keys, DB data overrides what it has.
      // This ensures any top-level keys not yet saved in the DB still come from static.
      return { ...(staticData as object), ...(row.contentJson as object) } as PageDataMap[K];
    }
  } catch {
    // DB unreachable — fall through to static data
  }
  return staticData;
}

// ─── Services ────────────────────────────────────────────────────────────────

export async function getServiceData(slug: string): Promise<ServiceData | null> {
  try {
    const row = await prisma.servicePage.findUnique({
      where: { slug, isEnabled: true },
    });
    if (row?.contentJson) return row.contentJson as ServiceData;
  } catch {
    // DB unreachable — fall through to static data
  }

  const staticMap = await getStaticServiceMap();
  return staticMap[slug] ?? null;
}

export async function getAllServices(): Promise<ServiceData[]> {
  try {
    const rows = await prisma.servicePage.findMany({
      where: { isEnabled: true },
      orderBy: { sortOrder: 'asc' },
    });
    if (rows.length > 0) return rows.map((r: ServicePageRow) => r.contentJson as ServiceData);
  } catch {
    // DB unreachable — fall through to static data
  }

  const staticMap = await getStaticServiceMap();
  return Object.values(staticMap);
}

// ─── Feature flags ────────────────────────────────────────────────────────────

export async function getFeatureFlags(): Promise<Record<string, boolean>> {
  try {
    const flags = await prisma.featureFlag.findMany();
    return Object.fromEntries(flags.map((f: FeatureFlagRow) => [f.key, f.isEnabled]));
  } catch {
    // DB unreachable — return empty object (all features enabled by default)
    return {};
  }
}

// ─── Unread submission count (for admin sidebar badge) ────────────────────────

export async function getUnreadCount(): Promise<number> {
  try {
    return await prisma.contactSubmission.count({ where: { isRead: false, isArchived: false } });
  } catch {
    return 0;
  }
}
