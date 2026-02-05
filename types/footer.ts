export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterSection {
  title: string;
  links: FooterLink[];
}

export interface SocialMediaLink {
  platform: string;
  href: string;
  icon: string;
  iconColor?: string;
}

export interface Certification {
  name: string;
  image: string;
  alt: string;
  link: string;
}

export interface FooterData {
  company: {
    name: string;
    tagline: string;
    description: string;
    logo: string;
    logoAlt: string;
  };
  contact: {
    address: {
      street: string;
      city: string;
      state: string;
      zip: string;
    };
    phone: string;
    email: string;
    hours: {
      regular: string;
      emergency: string;
    };
  };
  sections: FooterSection[];
  socialMedia: SocialMediaLink[];
  certifications: Certification[];
  legal: {
    copyright: string;
    privacyPolicy: string;
    termsOfService: string;
    license: string;
  };
}