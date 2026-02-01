import { FooterData } from '@/types/footer';

export const footerData: FooterData = {
  company: {
    name: "OnDemand Restaurant Service",
    tagline: "Oklahoma's Most Trusted Restaurant Equipment Experts",
    description: "Professional commercial restaurant equipment repair and maintenance services serving Oklahoma with 24/7 emergency support. Licensed technicians with 45+ years combined experience.",
    logo: "/content/On-Demand-Logo-cropped.png",
    logoAlt: "OnDemand Restaurant Service Logo"
  },
  
  contact: {
    address: {
      street: "340 S Eckroat St Building 6",
      city: "Oklahoma City",
      state: "OK",
      zip: "73129"
    },
    phone: "405-242-6028",
    email: "Service@ondemandrs.com",
    hours: {
      regular: "Mon-Fri: 8AM - 6PM",
      emergency: "24/7 Emergency Service Available"
    }
  },
  
  sections: [
    {
      title: "Our Services",
      links: [
        { label: "Commercial HVAC", href: "/services/commercial-hvac" },
        { label: "Commercial Refrigeration", href: "/services/commercial-refrigeration" },
        { label: "Food Service Equipment", href: "/services/food-service-equipment" },
        { label: "Ice Machines", href: "/services/ice-machines" }
      ]
    },
    {
      title: "Company",
      links: [
        { label: "About Us", href: "/about" },
        { label: "Contact Us", href: "/contact" },
        { label: "Emergency Service", href: "tel:405-242-6028" }
      ]
    }
  ],
  
  socialMedia: [
    {
      platform: "facebook",
      href: "https://facebook.com/ondemandrs",
      icon: "📘"
    },
    {
      platform: "google",
      href: "https://www.google.com/search?q=OnDemand+Restaurant+Service+reviews",
      icon: "🌐"
    },
    {
      platform: "linkedin",
      href: "https://linkedin.com/company/ondemand-restaurant-service",
      icon: "💼"
    }
  ],
  
  certifications: [
     {
       name: "CFESA Member",
       image: "/content/cfesa-logo.png",
       alt: "Commercial Food Equipment Service Association Member",
       link: "https://cfesa.com"
     }
  ],
  
  legal: {
    copyright: `© ${new Date().getFullYear()} OnDemand Restaurant Service. All rights reserved.`,
    privacyPolicy: "/privacy-policy",
    termsOfService: "/terms-of-service",
    license: "Licensed, Bonded & Insured • Oklahoma License #12345"
  }
};
