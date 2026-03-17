/**
 * Seeds the database from the existing ./data/ TypeScript files.
 * Run: npm run db:seed
 *
 * Safe to re-run — uses upsert for all records.
 */

import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import bcrypt from 'bcryptjs';

import { homePageData } from '../data/homepage';
import { footerData } from '../data/footer';
import { aboutUsData } from '../data/about';
import { contactPageData } from '../data/contact';
import { commercialRefrigerationData } from '../data/services/commercial-refrigeration';
import { commercialHVACData } from '../data/services/commercial-hvac';
import { foodServiceEquipmentData } from '../data/services/food-service-equipment';
import { iceMachinesData } from '../data/services/ice-machines';
import { preventiveMaintenanceData } from '../data/services/preventive-maintenance';

const connectionString =
  process.env.DATABASE_URL_UNPOOLED ?? process.env.DATABASE_URL ?? '';

const pool = new Pool({ connectionString });
// Cast needed: standalone `pg` Pool type conflicts with the one bundled in @prisma/adapter-pg
const adapter = new PrismaPg(pool as any);
const prisma = new PrismaClient({ adapter } as any);

async function main() {
  console.log('🌱 Seeding database...');

  // ── Admin user ──────────────────────────────────────────────────────────────
  const adminEmail = process.env.ADMIN_EMAIL ?? 'admin@ondemandrs.com';
  const adminPassword = process.env.ADMIN_PASSWORD ?? 'ChangeMe123!';
  const hashedPassword = await bcrypt.hash(adminPassword, 12);

  await prisma.adminUser.upsert({
    where: { email: adminEmail },
    update: {},
    create: { email: adminEmail, hashedPassword, name: 'Admin' },
  });
  console.log(`  ✓ Admin user: ${adminEmail}`);

  // ── Page content ────────────────────────────────────────────────────────────
  const pages = [
    { pageKey: 'homepage', contentJson: homePageData as object },
    { pageKey: 'footer', contentJson: footerData as object },
    { pageKey: 'about', contentJson: aboutUsData as object },
    { pageKey: 'contact', contentJson: contactPageData as object },
  ];

  for (const page of pages) {
    await prisma.pageContent.upsert({
      where: { pageKey: page.pageKey },
      update: { contentJson: page.contentJson },
      create: page,
    });
    console.log(`  ✓ Page content: ${page.pageKey}`);
  }

  // ── Service pages ───────────────────────────────────────────────────────────
  const services = [
    { slug: 'commercial-refrigeration', data: commercialRefrigerationData, sortOrder: 0 },
    { slug: 'food-service-equipment', data: foodServiceEquipmentData, sortOrder: 1 },
    { slug: 'commercial-hvac', data: commercialHVACData, sortOrder: 2 },
    { slug: 'ice-machines', data: iceMachinesData, sortOrder: 3 },
    { slug: 'preventive-maintenance', data: preventiveMaintenanceData, sortOrder: 4 },
  ];

  for (const svc of services) {
    await prisma.servicePage.upsert({
      where: { slug: svc.slug },
      update: { contentJson: svc.data as object, name: svc.data.name },
      create: {
        slug: svc.slug,
        name: svc.data.name,
        contentJson: svc.data as object,
        sortOrder: svc.sortOrder,
        isEnabled: true,
      },
    });
    console.log(`  ✓ Service page: ${svc.slug}`);
  }

  // ── Feature flags ────────────────────────────────────────────────────────────
  const flags = [
    { key: 'homepage.testimonials', label: 'Homepage Testimonials Section', description: 'Show/hide the testimonials section on the homepage', isEnabled: true },
    { key: 'homepage.whyChooseUs', label: 'Homepage Why Choose Us Section', description: 'Show/hide the Why Choose Us section on the homepage', isEnabled: true },
    { key: 'homepage.emergencyCTA', label: 'Homepage Emergency CTA Section', description: 'Show/hide the emergency CTA and contact section on the homepage', isEnabled: true },
    { key: 'service.brands', label: 'Service Page Brands Section', description: 'Show/hide the brands carousel on all service pages', isEnabled: true },
    { key: 'service.faq', label: 'Service Page FAQ / Common Issues', description: 'Show/hide the FAQ and common issues sections on all service pages', isEnabled: true },
    { key: 'service.commonIssues', label: 'Service Page Common Issues', description: 'Show/hide the common issues accordion on service pages', isEnabled: true },
    { key: 'contact.googleMap', label: 'Contact Page Google Map', description: 'Show/hide the embedded Google Map on the contact page', isEnabled: true },
    { key: 'googleReviews.enabled', label: 'Google Reviews Integration', description: 'When enabled, pulls live reviews from Google Places API', isEnabled: false },
  ];

  for (const flag of flags) {
    await prisma.featureFlag.upsert({
      where: { key: flag.key },
      update: { label: flag.label, description: flag.description },
      create: flag,
    });
    console.log(`  ✓ Feature flag: ${flag.key}`);
  }

  // ── Email templates ──────────────────────────────────────────────────────────
  const templates = [
    {
      key: 'contact_notification',
      subject: 'New Service Request — {{name}}',
      body: `<h2>New Service Request Received</h2>
<p><strong>Name:</strong> {{name}}</p>
<p><strong>Email:</strong> {{email}}</p>
<p><strong>Phone:</strong> {{phone}}</p>
<p><strong>Service Type:</strong> {{serviceType}}</p>
<h3>Message:</h3>
<p>{{message}}</p>
<p><em>Submitted: {{submittedAt}}</em></p>`,
    },
    {
      key: 'contact_confirmation',
      subject: "We've received your service request — OnDemand Restaurant Service",
      body: `<h2>Thank you, {{name}}!</h2>
<p>We've received your service request and will be in touch shortly.</p>
<p>For emergency service, call us 24/7 at <strong>(405) 242-6028</strong>.</p>
<p>— The OnDemand Restaurant Service Team</p>`,
    },
  ];

  for (const tmpl of templates) {
    await prisma.emailTemplate.upsert({
      where: { key: tmpl.key },
      update: {},
      create: tmpl,
    });
    console.log(`  ✓ Email template: ${tmpl.key}`);
  }

  // ── Site settings ────────────────────────────────────────────────────────────
  await prisma.siteSettings.upsert({
    where: { id: 'global' },
    update: {},
    create: { id: 'global' },
  });
  console.log('  ✓ Site settings: global');

  console.log('\n✅ Seed complete.');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
