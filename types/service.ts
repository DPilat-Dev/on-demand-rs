export interface ServiceFeature {
  name: string;
  description: string;
  features: string[];
}

export interface EquipmentItem {
  name: string;
  description: string;
  icon: string;
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
    equipment?: boolean;
    brands?: boolean;
    industries?: boolean;
    faq?: boolean;
    [key: string]: any;
  };
  response?: string;
  satisfaction?: string;
  experience?: string;
  contact?: any;
  [key: string]: any; // Allow additional properties
}