import { SEOMetadata } from '@/types/seo';

export interface TestimonialData {
  name: string;
  business: string;
  rating: number;
  title: string;
  content: string;
  type: 'google' | 'yelp' | 'facebook';
}

export interface StatHighlight {
  number: string;
  text: string;
}

export interface BusinessCard {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  buttonText: string;
  buttonLink: string;
}

export interface ServiceCard {
  title: string;
  description: string;
  icon: string;
  features: string[];
  link: string;
}

export interface DeliveryCard {
  icon: string;
  title: string;
  description: string;
  statHighlight: StatHighlight;
}

export interface FeatureItem {
  icon: string;
  title: string;
  description: string;
}

export interface StatCard {
  number: string;
  label: string;
}

export interface HomePageData {
  seo: SEOMetadata;
  hero: {
    badge: string;
    title: string;
    subtitle: string;
    form: {
      emailPlaceholder: string;
      buttonText: string;
    };
    certification: {
      image: string;
      alt: string;
    };
    emergency: {
      text: string;
      phone: string;
    };
    backgroundImage: string;
    backgroundImageAlt: string;
  };
  
  whyChoose: {
    title: string;
    subtitle: string;
    businessCards: BusinessCard[];
  };
  
  services: {
    title: string;
    subtitle: string;
    serviceCards: ServiceCard[];
  };
  
  servicePromise: {
    title: string;
    subtitle: string;
    deliveryCards: DeliveryCard[];
  };
  
  testimonials: {
    title: string;
    subtitle: string;
    testimonials: TestimonialData[];
    googleCTA: {
      text: string;
      buttonText: string;
      link: string;
    };
  };
  
  whyChooseUs: {
    title: string;
    description: string;
    features: FeatureItem[];
    stats: StatCard[];
  };
  
  emergencyCTA: {
    title: string;
    description: string;
    phone: string;
    note: string;
  };
  
  contact: {
    title: string;
    subtitle: string;
    contactInfo: {
      phone: string;
      email: string;
      address: string;
      hours: string;
    };
    map: {
      embedUrl: string;
      directionsUrl: string;
    };
    form: {
      title: string;
      serviceOptions: Array<{label: string; value: string}>;
      fields: {
        name: string;
        email: string;
        phone: string;
        serviceType: string;
        message: string;
        submitButton: string;
      };
    };
  };
}

export const homePageData: HomePageData = {
  seo: {
    title: "OnDemand Restaurant Service - Oklahoma's #1 Equipment Repair Experts",
    description: "24/7 emergency restaurant equipment repair in Oklahoma. Licensed technicians for commercial HVAC, refrigeration, ice machines & food service equipment. 2-hour response guaranteed.",
    keywords: [
      "restaurant equipment repair Oklahoma",
      "commercial HVAC Oklahoma City",
      "emergency equipment repair",
      "commercial refrigeration repair",
      "ice machine repair OKC",
      "food service equipment repair",
      "24/7 restaurant service",
      "licensed HVAC technicians",
      "commercial kitchen repair"
    ],
    ogTitle: "OnDemand Restaurant Service - Oklahoma's Trusted Equipment Experts",
    ogDescription: "Professional restaurant equipment repair with 2-hour response time. Licensed technicians serving Oklahoma with 24/7 emergency service.",
    ogImage: "/content/OnDemandRs-Hero.jpg",
    ogImageAlt: "OnDemand Restaurant Service truck and technician",
    ogType: "business.business",
    ogUrl: "https://ondemandrs.com",
    twitterTitle: "OnDemand Restaurant Service - Oklahoma Equipment Repair",
    twitterDescription: "24/7 emergency restaurant equipment repair. Licensed technicians, 2-hour response, serving all of Oklahoma.",
    twitterImage: "/content/OnDemandRs-Hero.jpg",
    twitterCard: "summary_large_image",
    localBusiness: {
      name: "OnDemand Restaurant Service",
      description: "Professional commercial restaurant equipment repair and maintenance services serving Oklahoma with 24/7 emergency support.",
      address: {
        streetAddress: "340 S Eckroat St Building 6",
        addressLocality: "Oklahoma City",
        addressRegion: "OK",
        postalCode: "73129",
        addressCountry: "US"
      },
      phone: "405-242-6028",
      email: "Service@ondemandrs.com",
      url: "https://ondemandrs.com",
      openingHours: [
        "Mo-Su 00:00-24:00"
      ],
      serviceArea: [
        "All of Oklahoma"
      ],
      areaServed: [
        "Oklahoma"
      ],
      services: [
        "Commercial HVAC Repair",
        "Commercial Refrigeration Repair",
        "Ice Machine Repair",
        "Food Service Equipment Repair",
        "Emergency Equipment Service",
        "Preventive Maintenance",
        "Equipment Installation"
      ],
      priceRange: "$$",
      aggregateRating: {
        ratingValue: 4.9,
        reviewCount: 127
      }
    },
    canonical: "https://ondemandrs.com",
    robots: "index, follow",
    viewport: "width=device-width, initial-scale=1",
    language: "en-US",
    author: "OnDemand Restaurant Service",
    breadcrumbs: [
      {
        name: "Home",
        url: "https://ondemandrs.com"
      }
    ]
  },
  hero: {
    badge: "Serving All of Oklahoma",
    title: "Equipment Down? Get Back Online Fast!",
    subtitle: "Oklahoma's Most Trusted Restaurant Equipment Experts",
    form: {
      emailPlaceholder: "Email",
      buttonText: "Get Emergency Help Now"
    },
    certification: {
      image: "/content/cfesa-logo.png",
      alt: "Certified & Licensed"
    },
    emergency: {
      text: "Emergency Service Available 24/7",
      phone: "405-242-6028"
    },
    backgroundImage: "/content/OnDemandRs-Hero.jpg",
    backgroundImageAlt: "Professional technician working on commercial kitchen equipment"
  },
  
  whyChoose: {
    title: "Why Oklahoma Restaurants Trust OnDemand",
    subtitle: "Licensed, certified technicians with 45+ years combined experience • 2-hour response time guaranteed",
    businessCards: [
      {
        title: "Licensed Technicians",
        description: "Our team of licensed technicians provide superior service and insight to your broken equipment all throughout Oklahoma.",
        image: "/content/optimized/Licensed-Technicians-homepage-image.webp",
        imageAlt: "Licensed technicians at work",
        buttonText: "Learn More About Us",
        buttonLink: "/about"
      },
      {
        title: "Superior Service Approach",
        description: "We use our next level superior service approach to make sure your equipment is back up and running in a timely manner.",
        image: "/content/optimized/Superior-Service-Approach-homepage-image.webp",
        imageAlt: "Emergency restaurant service",
        buttonText: "Contact Us Today",
        buttonLink: "/contact"
      }
    ]
  },
  
  services: {
    title: "Our Expertise",
    subtitle: "Comprehensive commercial kitchen equipment services across Oklahoma",
    serviceCards: [
      {
        title: "Commercial Refrigeration",
        description: "Walk-in coolers, reach-in refrigerators, freezers, and display cases",
        icon: "refrigeration",
        features: [
          "Emergency repairs",
          "Preventive maintenance",
          "Energy efficiency upgrades"
        ],
        link: "/services/commercial-refrigeration"
      },
      {
        title: "Food Service Equipment",
        description: "Ovens, fryers, grills, steamers, and warming equipment",
        icon: "food-service",
        features: [
          "All major brands",
          "Parts replacement",
          "Performance optimization"
        ],
        link: "/services/food-service-equipment"
      },
      {
        title: "Commercial HVAC",
        description: "Kitchen ventilation, exhaust systems, and climate control",
        icon: "hvac",
        features: [
          "Hood cleaning",
          "Ductwork repair",
          "System installations"
        ],
        link: "/services/commercial-hvac"
      },
      {
        title: "Ice Machines",
        description: "Commercial ice makers, dispensers, and storage solutions",
        icon: "ice-machine",
        features: [
          "Cleaning & sanitizing",
          "Filter replacements",
          "Capacity upgrades"
        ],
        link: "/services/ice-machines"
      },
      {
        title: "Preventive Maintenance",
        description: "Regular maintenance programs to prevent equipment failures",
        icon: "maintenance",
        features: [
          "Scheduled inspections",
          "Performance tuning",
          "Extended equipment life"
        ],
        link: "/services/preventive-maintenance"
      }
    ]
  },
  
  servicePromise: {
    title: "Superior Service & Customer Care",
    subtitle: "We are focused and geared towards providing our customers with superior service and customer care",
    deliveryCards: [
      {
        icon: "🔧",
        title: "All Major Brands",
        description: "EPA Certified • NATE Certified • Fully Insured technicians trained on all major commercial brands.",
        statHighlight: {
          number: "24/7",
          text: "Emergency Service"
        }
      },
      {
        icon: "⚡",
        title: "Rapid Response",
        description: "When your equipment breaks down, every minute counts. We provide fast, reliable service to minimize your downtime.",
        statHighlight: {
          number: "2hr",
          text: "Response Guaranteed"
        }
      },
      {
        icon: "🎯",
        title: "Superior Quality",
        description: "Our next level superior service approach ensures your equipment is back up and running properly the first time.",
        statHighlight: {
          number: "90-Day",
          text: "Warranty"
        }
      },
      {
        icon: "📍",
        title: "Oklahoma Coverage",
        description: "Serving restaurants and commercial kitchens throughout Oklahoma with comprehensive equipment service.",
        statHighlight: {
          number: "500+",
          text: "Restaurants Served"
        }
      }
    ]
  },
  
  testimonials: {
    title: "Trusted by the trades. Backed by solid reviews.",
    subtitle: "See what restaurant owners across Oklahoma are saying about our service",
    testimonials: [
      {
        name: "Mike Thompson",
        business: "Thompson's Steakhouse, OKC",
        rating: 5,
        title: "Emergency Cooler Repair",
        content: "OnDemand was the best solution when our walk-in cooler went down during our busiest weekend. They had us back up and running in 2 hours. Outstanding service!",
        type: "google"
      },
      {
        name: "Sarah Martinez",
        business: "Bella Vista Restaurant Group",
        rating: 5,
        title: "Preventive Maintenance Program",
        content: "With OnDemand I know I'm getting real-time response when equipment fails. Their preventive maintenance program has saved us thousands in downtime costs.",
        type: "google"
      },
      {
        name: "David Chen",
        business: "Golden Dragon Restaurant Chain",
        rating: 5,
        title: "HVAC Installation & Maintenance",
        content: "From our initial HVAC installation to ongoing maintenance, OnDemand has been our trusted partner. Professional, reliable, and always available when we need them most.",
        type: "google"
      }
    ],
    googleCTA: {
      text: "See all our reviews on Google",
      buttonText: "View Google Reviews",
      link: "https://www.google.com/search?q=OnDemand+Restaurant+Service+reviews"
    }
  },
  
  whyChooseUs: {
    title: "Why Restaurants Trust OnDemand",
    description: "When your equipment breaks down, every minute counts. We understand the urgency and provide reliable, professional service to get you back to serving customers.",
    features: [
      {
        icon: "🚀",
        title: "Rapid Response",
        description: "Average 2-hour response time for emergency calls"
      },
      {
        icon: "👨‍🔧",
        title: "Expert Technicians",
        description: "Certified professionals with 10+ years experience"
      },
      {
        icon: "🔧",
        title: "All Brands Serviced",
        description: "Authorized service for major commercial equipment brands"
      },
      {
        icon: "💰",
        title: "Transparent Pricing",
        description: "No hidden fees, upfront quotes, competitive rates"
      }
    ],
    stats: [
      { number: "500+", label: "Restaurants Served" },
      { number: "24/7", label: "Emergency Support" },
      { number: "98%", label: "Customer Satisfaction" },
      { number: "2hr", label: "Average Response" }
    ]
  },
  
  emergencyCTA: {
    title: "Equipment Down? We're Here to Help!",
    description: "Don't let broken equipment cost you customers. Call now for immediate assistance.",
    phone: "405-242-6028",
    note: "Available 24/7"
  },
  
  contact: {
    title: "Get In Touch",
    subtitle: "Ready to schedule service or have questions? We're here to help.",
    contactInfo: {
      phone: "(405) 242-6028",
      email: "Service@ondemandrs.com",
      address: "340 S Eckroat St Building 6\nOklahoma City, OK 73129",
      hours: "Open 24/7"
    },
    map: {
      embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3252.123456789!2d-97.52345678!3d35.45678901!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87b217abcdef1234%3A0x1234567890abcdef!2s340%20S%20Eckroat%20St%2C%20Oklahoma%20City%2C%20OK%2073129!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus",
      directionsUrl: "https://www.google.com/maps/search/?api=1&query=340+S+Eckroat+St+Building+6,Oklahoma+City,OK+73129"
    },
    form: {
      title: "Request Service",
      serviceOptions: [
        { label: "Select Service Type", value: "" },
        { label: "Commercial Refrigeration", value: "commercial-refrigeration" },
        { label: "Food Service Equipment", value: "food-service-equipment" },
        { label: "Commercial HVAC", value: "commercial-hvac" },
        { label: "Ice Machines", value: "ice-machines" }
      ],
      fields: {
        name: "Your Name",
        email: "Email Address",
        phone: "Phone Number",
        serviceType: "Select Service Type",
        message: "Describe your issue",
        submitButton: "Submit Request"
      }
    }
  }
};
