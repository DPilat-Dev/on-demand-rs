import { getPageContent, getAllServices } from '@/lib/content';
import type { HomePageData } from '@/data/homepage';
import Hero from '@/app/components/Hero';
import Services from '@/app/components/Services';
import Testimonials from '@/app/components/Testimonials';
import WhyChooseUs from '@/app/components/WhyChooseUs';
import ContactCTA from '@/app/components/ContactCTA';

export default async function Home() {
  const [data, allServices] = await Promise.all([
    getPageContent('homepage') as Promise<HomePageData>,
    getAllServices(),
  ]);

  const serviceImageMap: Record<string, string> = Object.fromEntries(
    allServices.map((s) => [s.slug, s.heroImage ?? ''])
  );

  return (
    <>
      <Hero hero={data.hero} />
      <Services services={data.services} serviceImageMap={serviceImageMap} />
      <WhyChooseUs whyChooseUs={data.whyChooseUs} />
      <Testimonials testimonials={data.testimonials} />
      <ContactCTA contact={data.contact} emergencyCTA={data.emergencyCTA} />
    </>
  );
}
