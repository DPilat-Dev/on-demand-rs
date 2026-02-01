import { ServiceData } from '@/types/service';

export const commercialRefrigerationData: ServiceData = {
  slug: 'commercial-refrigeration',
  name: 'Commercial Refrigeration',
  description: 'Professional commercial refrigeration services including installation, maintenance, and repairs for restaurants, hotels, schools, and healthcare facilities.',
  icon: '❄️',
  heroImage: '/content/optimized/Commercial-Refigeration-service-Hero.webp',
  serviceTypes: [
    {
      name: 'Installation',
      description: 'Professional installation of all commercial refrigeration equipment',
      features: [
        'Walk-in cooler/freezer setup',
        'Reach-in unit installation',
        'Display case installation',
        'System commissioning'
      ]
    },
    {
      name: 'Maintenance',
      description: 'Preventive maintenance to keep your equipment running efficiently',
      features: [
        'Regular system inspections',
        'Refrigerant level checks',
        'Coil cleaning and maintenance',
        'Component testing'
      ]
    },
    {
      name: 'Repairs',
      description: '24/7 emergency repair services with rapid response',
      features: [
        'Emergency breakdown service',
        'Component replacement',
        'System diagnostics',
        'Performance optimization'
      ]
    }
  ],
  equipment: [
    {
      name: 'Walk-in Cooler/Freezer Equipment',
      description: 'Complete walk-in refrigeration solutions',
      icon: '🚪'
    },
    {
      name: 'Ice Cream/Shake Machines',
      description: 'Specialized frozen dessert equipment',
      icon: '🍦'
    },
    {
      name: 'Reach-in Cooler/Freezer Equipment',
      description: 'Standard commercial refrigeration units',
      icon: '📦'
    },
    {
      name: 'Margarita/Slushy Machines',
      description: 'Frozen beverage dispensing equipment',
      icon: '🥤'
    },
    {
      name: 'Cold Beverage Dispenser',
      description: 'Commercial beverage cooling systems',
      icon: '🧊'
    },
    {
      name: 'Specialty Refrigeration Equipment',
      description: 'Custom and specialized cooling solutions',
      icon: '⚙️'
    },
    {
      name: 'Prep Tables',
      description: 'Refrigerated food preparation surfaces',
      icon: '🍽️'
    },
    {
      name: 'Open Refrigerated Display Cases',
      description: 'Customer-facing refrigerated displays',
      icon: '🏪'
    }
  ],
  industries: [
    'Fast Food Restaurants',
    'Hotels & Hospitality',
    'Schools & Universities',
    'Hospitals & Healthcare',
    'Convenience Stores',
    'Grocery Stores',
    'Cafeterias',
    'Food Service Facilities'
  ],
  commonIssues: [
    {
      problem: 'Thermostat Issues',
      solution: 'Our technicians diagnose and replace faulty thermostats, ensuring proper temperature control and energy efficiency.',
      prevention: 'Regular calibration and cleaning prevent most thermostat problems.'
    },
    {
      problem: 'Condenser/Evap Motor Failure',
      solution: 'We replace failed motors with OEM parts and inspect the entire system for underlying causes.',
      prevention: 'Regular maintenance and proper ventilation extend motor life significantly.'
    },
    {
      problem: 'Dirty Condenser Coil',
      solution: 'Professional coil cleaning restores efficiency and prevents system overheating.',
      prevention: 'Quarterly coil cleaning as part of our maintenance program.'
    },
    {
      problem: 'Start Component Failure',
      solution: 'Replacement of capacitors, relays, and contactors with high-quality OEM components.',
      prevention: 'Regular electrical testing identifies failing components before breakdown.'
    },
    {
      problem: 'Equipment Not Sized Correctly',
      solution: 'Load calculations and system redesign to match actual cooling requirements.',
      prevention: 'Proper initial sizing and regular capacity assessments.'
    },
    {
      problem: 'Overstocked Unit',
      solution: 'Airflow optimization and equipment upgrades to handle increased capacity.',
      prevention: 'Regular monitoring of load patterns and capacity planning.'
    }
  ],
  brands: [
    { name: 'True Manufacturing', logo: '/content/Commercial-Refigeration-logos/true-1.webp' },
    { name: 'Delfield', logo: '/content/Commercial-Refigeration-logos/Delfield-1.webp' },
    { name: 'Nor-Lake', logo: '/content/Commercial-Refigeration-logos/Norlake.webp' },
    { name: 'Traulsen', logo: '/content/Commercial-Refigeration-logos/traulsen.webp' },
    { name: 'Atosa', logo: '/content/Commercial-Refigeration-logos/atosa.webp' },
    { name: 'Electro Freeze', logo: '/content/Commercial-Refigeration-logos/electro-freeze-1.webp' },
    { name: 'Randall', logo: '/content/Commercial-Refigeration-logos/Randall-1.gif' },
    { name: 'Wasserstrom', logo: '/content/Commercial-Refigeration-logos/Wasserstrom-1.webp' }
  ],
  features: {
    experience: '45+ years combined experience',
    availability: '24/7 emergency service',
    response: '2-hour average response time',
    satisfaction: '98% customer satisfaction rate'
  },
  seo: {
    title: "Commercial Refrigeration Repair Oklahoma City - OnDemand Restaurant Service",
    description: "Reliable commercial refrigeration repair, maintenance, and installation in Oklahoma City. Walk-ins, reach-ins, display cases. 24/7 emergency service.",
    keywords: [
      "commercial refrigeration repair Oklahoma City",
      "walk-in cooler repair",
      "reach-in freezer service",
      "refrigeration maintenance OKC",
      "emergency refrigeration repair",
      "display case repair",
      "restaurant refrigeration service",
      "True refrigerator repair"
    ],
    ogTitle: "Commercial Refrigeration Repair - OnDemand Restaurant Service Oklahoma",
    ogDescription: "Professional repair and maintenance for walk-ins, reach-ins, and display cases. 24/7 emergency service in Oklahoma City.",
    ogImage: "/content/Commercial-Refigeration-service-Hero.jpg",
    ogImageAlt: "Technician repairing a commercial refrigerator condenser coil",
    ogType: "website",
    ogUrl: "https://ondemandrs.com/services/commercial-refrigeration",
    twitterTitle: "Commercial Refrigeration Repair Oklahoma City - 24/7 Emergency",
    twitterDescription: "Expert service for walk-ins, reach-ins, and specialty refrigeration equipment.",
    twitterImage: "/content/Commercial-Refigeration-service-Hero.jpg",
    twitterCard: "summary_large_image",
    canonical: "https://ondemandrs.com/services/commercial-refrigeration",
    robots: "index, follow",
    viewport: "width=device-width, initial-scale=1",
    language: "en-US",
    author: "OnDemand Restaurant Service",
    breadcrumbs: [
      { name: "Home", url: "https://ondemandrs.com" },
      { name: "Services", url: "https://ondemandrs.com/services" },
      { name: "Commercial Refrigeration", url: "https://ondemandrs.com/services/commercial-refrigeration" }
    ],
    serviceSchema: {
      serviceType: "Commercial Refrigeration Repair and Maintenance",
      provider: "OnDemand Restaurant Service",
      areaServed: ["Oklahoma"],
      availableChannel: {
        availableLanguage: ["English"],
        servicePhone: "405-242-6028",
        serviceUrl: "https://ondemandrs.com/services/commercial-refrigeration"
      },
      hours: ["Mo-Su 00:00-24:00"]
    }
  },
  sections: {
    equipment: true,
    brands: true,  // Brands section disabled
    industries: true,  // Industries section disabled
    faq: true,
    contact: true
  }
};
