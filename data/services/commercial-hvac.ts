import { ServiceData } from '../../types/service';

export const commercialHVACData: ServiceData = {
  slug: 'commercial-hvac',
  name: 'Commercial HVAC',
  description: 'Professional commercial HVAC services including kitchen ventilation, exhaust systems, and climate control for restaurants and commercial facilities.',
  icon: '💨',
  heroImage: '/content/optimized/Comercial-Hvac-Hero-2.webp',
  serviceTypes: [
    {
      name: 'Installation',
      description: 'Complete HVAC system installation and setup',
      features: [
        'Kitchen ventilation systems',
        'Exhaust hood installation',
        'Make-up air units',
        'Climate control systems'
      ]
    },
    {
      name: 'Maintenance',
      description: 'Comprehensive HVAC maintenance programs',
      features: [
        'Filter replacement',
        'Belt inspection and replacement',
        'Coil cleaning',
        'Electrical system checks'
      ]
    },
    {
      name: 'Repairs',
      description: 'Emergency and scheduled HVAC repairs',
      features: [
        'System diagnostics',
        'Component replacement',
        'Performance optimization',
        'Emergency service calls'
      ]
    }
  ],
  equipment: [
    {
      name: 'Kitchen Exhaust Hoods',
      description: 'Commercial kitchen ventilation and exhaust systems',
      icon: '🏭'
    },
    {
      name: 'Make-up Air Units',
      description: 'Fresh air replacement systems',
      icon: '🌬️'
    },
    {
      name: 'Package Units',
      description: 'Rooftop and ground-mounted HVAC units',
      icon: '📦'
    },
    {
      name: 'Mini Split Systems',
      description: 'Ductless heating and cooling solutions',
      icon: '❄️'
    },
    {
      name: 'Exhaust Fans',
      description: 'Commercial ventilation fans',
      icon: '🌪️'
    },
    {
      name: 'Ductwork Systems',
      description: 'Air distribution and ductwork',
      icon: '🔧'
    },
    {
      name: 'Control Systems',
      description: 'HVAC automation and controls',
      icon: '🎛️'
    },
    {
      name: 'Air Filtration',
      description: 'Commercial air filtration systems',
      icon: '🔍'
    }
  ],
  industries: [
    'Restaurants',
    'Commercial Kitchens',
    'Hotels & Hospitality',
    'Schools & Universities',
    'Hospitals & Healthcare',
    'Office Buildings',
    'Retail Establishments',
    'Food Processing Facilities'
  ],
  commonIssues: [
    {
      problem: 'Clogged Drains',
      solution: 'Professional drain cleaning and maintenance to prevent water damage and system failure.',
      prevention: 'Regular drain inspection and cleaning as part of maintenance program.'
    },
    {
      problem: 'Improper Sizing',
      solution: 'Load calculations and system modifications to match actual heating/cooling requirements.',
      prevention: 'Proper initial sizing and regular capacity assessments.'
    },
    {
      problem: 'Poor Air Balance',
      solution: 'Airflow testing and ductwork adjustments for optimal air distribution.',
      prevention: 'Regular airflow testing and filter maintenance.'
    },
    {
      problem: 'Thermostat Problems',
      solution: 'Calibration or replacement of temperature controls for accurate climate control.',
      prevention: 'Annual calibration and protection from kitchen heat and humidity.'
    },
    {
      problem: 'Refrigerant Leaks',
      solution: 'Leak detection, repair, and refrigerant recharge with proper testing.',
      prevention: 'Regular system inspections and coil protection.'
    },
    {
      problem: 'Belt Failures',
      solution: 'Belt replacement and pulley alignment for reliable fan operation.',
      prevention: 'Regular belt inspection and tension adjustment.'
    }
  ],
  brands: [
    { name: 'Carrier', logo: '/content/Commercial-Hvac-logos/Carrier-1.webp' },
    { name: 'Trane', logo: '/content/Commercial-Hvac-logos/Trane-1.webp' },
    { name: 'Lennox', logo: '/content/Commercial-Hvac-logos/Lennox-1.webp' },
    { name: 'York', logo: '/content/Commercial-Hvac-logos/York-1.webp' },
    { name: 'Rheem', logo: '/content/Commercial-Hvac-logos/Rheem-1.webp' },
    { name: 'Daikin', logo: '/content/Commercial-Hvac-logos/Daikin.jpg' },
    { name: 'Fujitsu', logo: '/content/Commercial-Hvac-logos/Fujistu.webp' },
    { name: 'Captive Aire', logo: '/content/Commercial-Hvac-logos/Captive-Aire.webp' },
    { name: 'Greenheck', logo: '/content/Commercial-Hvac-logos/Greenheck-1.webp' }
  ],
  features: {
    experience: '45+ years combined experience',
    availability: '24/7 emergency service',
    response: '2-hour average response time',
    satisfaction: '98% customer satisfaction rate'
  },
  seo: {
    title: "Commercial HVAC Repair Oklahoma City - OnDemand Restaurant Service",
    description: "Professional commercial HVAC repair & maintenance in Oklahoma City. Kitchen ventilation, exhaust systems, emergency service. Licensed technicians, 2-hour response guaranteed.",
    keywords: [
      "commercial HVAC repair Oklahoma City",
      "kitchen ventilation repair",
      "restaurant exhaust system",
      "commercial HVAC maintenance",
      "HVAC emergency service OKC",
      "kitchen hood repair",
      "commercial air conditioning repair",
      "restaurant ventilation service",
      "HVAC contractors Oklahoma"
    ],
    ogTitle: "Commercial HVAC Repair - OnDemand Restaurant Service Oklahoma",
    ogDescription: "Expert commercial HVAC repair for restaurants in Oklahoma City. 24/7 emergency service, licensed technicians, kitchen ventilation specialists.",
    ogImage: "/content/Comercial-Hvac-Hero-2.jpg",
    ogImageAlt: "Commercial HVAC technician working on restaurant equipment",
    ogType: "website",
    ogUrl: "https://ondemandrs.com/services/commercial-hvac",
    twitterTitle: "Commercial HVAC Repair Oklahoma City - Emergency Service",
    twitterDescription: "Professional commercial HVAC repair for restaurants. Kitchen ventilation, exhaust systems, 24/7 emergency service in Oklahoma City.",
    twitterImage: "/content/Comercial-Hvac-Hero-2.jpg",
    twitterCard: "summary_large_image",
    canonical: "https://ondemandrs.com/services/commercial-hvac",
    robots: "index, follow",
    viewport: "width=device-width, initial-scale=1",
    language: "en-US",
    author: "OnDemand Restaurant Service",
    breadcrumbs: [
      {
        name: "Home",
        url: "https://ondemandrs.com"
      },
      {
        name: "Services",
        url: "https://ondemandrs.com/services"
      },
      {
        name: "Commercial HVAC",
        url: "https://ondemandrs.com/services/commercial-hvac"
      }
    ],
    serviceSchema: {
      serviceType: "Commercial HVAC Repair and Maintenance",
      provider: "OnDemand Restaurant Service",
      areaServed: ["Oklahoma"],
      availableChannel: {
        availableLanguage: ["English"],
        servicePhone: "405-242-6028",
        serviceUrl: "https://ondemandrs.com/services/commercial-hvac"
      },
      hours: ["Mo-Su 00:00-24:00"]
    }
  },
  sections: {
    equipment: true,
    brands: true,
    industries: true,
    faq: true,
    contact: true
  }
};
