import Hero from '@/app/components/Hero';
import Services from '@/app/components/Services';
import Testimonials from '@/app/components/Testimonials';
import WhyChooseUs from '@/app/components/WhyChooseUs';
import ContactCTA from '@/app/components/ContactCTA';

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <WhyChooseUs />
      <Testimonials />
      <ContactCTA />
    </>
  );
}
