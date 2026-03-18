export interface ServicesListingData {
  hero: {
    title: string;
    subtitle: string;
    phone: string;
    heroImage: string;
    heroImageAlt: string;
    overlayTitle: string;
    overlaySubtitle: string;
  };
  expertise: {
    title: string;
    subtitle: string;
  };
  emergencyCTA: {
    title: string;
    description: string;
    phone: string;
    footer: string;
  };
}

export const servicesListingData: ServicesListingData = {
  hero: {
    title: 'Our Professional Services',
    subtitle:
      'Comprehensive commercial kitchen equipment services across Oklahoma. Licensed technicians with 45+ years combined experience.',
    phone: '405-242-6028',
    heroImage: '/content/optimized/Licensed-Technicians-homepage-image.webp',
    heroImageAlt: 'Licensed technicians providing professional service',
    overlayTitle: 'Certified & Licensed Technicians',
    overlaySubtitle: '45+ Years Combined Experience • 24/7 Emergency Support',
  },
  expertise: {
    title: 'Our Expertise',
    subtitle: 'We specialize in keeping your commercial kitchen running at peak performance.',
  },
  emergencyCTA: {
    title: 'Need Emergency Service Right Now?',
    description:
      'Our team is available 24/7 for emergency repairs. We guarantee a 2-hour response time for critical equipment failures.',
    phone: '405-242-6028',
    footer: 'Available 24/7 • Licensed & Insured • 2-Hour Response Guarantee',
  },
};
