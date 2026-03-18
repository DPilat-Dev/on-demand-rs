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

export interface ServiceData {
  slug: string;
  name: string;
  description: string;
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