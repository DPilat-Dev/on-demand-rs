export interface ServiceFeature {
  name: string;
  description: string;
  features: string[];
}

export interface EquipmentItem {
  name: string;
  description: string;
  icon: string;
  image?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface MiniCtaBlock {
  id: string;
  title: string;
  description?: string;
  buttonText: string;
  /** Link for the button. Defaults to /contact if omitted. */
  buttonHref?: string;
  phone?: string;
  style?: 'default' | 'emergency' | 'subtle';
}

export interface ServiceData {
  slug: string;
  name: string;
  description: string;
  /** Short description shown on the /services listing card. Falls back to description. */
  listingDescription?: string;
  /** Bullet-point features shown on the /services listing card. */
  listingFeatures?: string[];
  icon: string;
  heroImage: string;
  serviceTypes: ServiceFeature[];
  equipment: EquipmentItem[];
  faqs?: FAQItem[];
  seo: {
    title: string;
    description: string;
    keywords: string[];
    ogTitle?: string;
    ogDescription?: string;
    ogImage?: string;
    ogImageAlt?: string;
    ogType?: string;
    ogUrl?: string;
    twitterTitle?: string;
    twitterDescription?: string;
    twitterImage?: string;
    twitterCard?: string;
    canonical?: string;
    robots?: string;
    viewport?: string;
    language?: string;
    author?: string;
    breadcrumbs?: Array<{
      name: string;
      url: string;
    }>;
    serviceSchema?: any;
  };
  cta?: {
    title: string;
    description: string;
    buttonText: string;
    phone: string;
  };
  industries?: any;
  commonIssues?: Array<{
    problem: string;
    solution: string;
    prevention?: string;
  }>;
  brands?: Array<{
    name: string;
    logo?: string;
  }>;
  /**
   * Mini call-to-action blocks that can be inserted between sections.
   * Referenced in `sectionOrder` as `"miniCta:<id>"`.
   */
  miniCtas?: MiniCtaBlock[];
  /**
   * Ordered list of section keys to render on the service page.
   * Core keys: serviceTypes | equipment | commonIssues | brands | faqs
   * Mini CTAs: miniCta:<id>
   * Defaults to the fixed order if absent.
   */
  sectionOrder?: string[];
  sections?: {
    serviceTypes?: boolean;
    equipment?: boolean;
    brands?: boolean;
    commonIssues?: boolean;
    faqs?: boolean;
    industries?: boolean;
    /** @deprecated use commonIssues */
    faq?: boolean;
    [key: string]: any;
  };
  response?: string;
  satisfaction?: string;
  experience?: string;
  contact?: any;
  [key: string]: any; // Allow additional properties
}