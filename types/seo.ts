export interface SEOMetadata {
  title: string;
  description: string;
  keywords: string[];
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  ogImageAlt: string;
  ogType: string;
  ogUrl: string;
  twitterTitle: string;
  twitterDescription: string;
  twitterImage: string;
  twitterCard: string;
  localBusiness: {
    name: string;
    description: string;
    address: {
      streetAddress: string;
      addressLocality: string;
      addressRegion: string;
      postalCode: string;
      addressCountry: string;
    };
    phone: string;
    email: string;
    url: string;
    openingHours: string[];
    serviceArea: string[];
    areaServed: string[];
    services: string[];
    priceRange: string;
    aggregateRating: {
      ratingValue: number;
      reviewCount: number;
    };
  };
  canonical: string;
  robots: string;
  viewport: string;
  language: string;
  author: string;
  breadcrumbs: Array<{
    name: string;
    url: string;
  }>;
}