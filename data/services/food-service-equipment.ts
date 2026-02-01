import { ServiceData } from '../../types/service';

export const foodServiceEquipmentData: ServiceData = {
  slug: 'food-service-equipment',
  name: 'Food Service Equipment',
  description: 'Complete food service equipment solutions including installation, maintenance, and repair of commercial cooking equipment for restaurants and foodservice operations.',
  icon: '🔥',
  heroImage: '/content/optimized/Food-Equipment-Service-Hero-Image.webp',
  serviceTypes: [
    {
      name: 'Installation',
      description: 'Professional installation of commercial cooking equipment',
      features: [
        'Gas line connections',
        'Electrical hookups',
        'Ventilation integration',
        'Safety testing and commissioning'
      ]
    },
    {
      name: 'Maintenance',
      description: 'Planned maintenance programs to keep equipment running smoothly',
      features: [
        'Gas pressure calibration',
        'Electrical system inspection',
        'Burner and element testing',
        'Thermostat calibration'
      ]
    },
    {
      name: 'Repairs',
      description: 'Expert repair services for all commercial cooking equipment',
      features: [
        'Emergency breakdown service',
        'Component replacement',
        'Performance restoration',
        'Safety compliance checks'
      ]
    }
  ],
  equipment: [
    {
      name: 'Microwave',
      description: 'Commercial microwave ovens and warming equipment',
      icon: '📡'
    },
    {
      name: 'All Kitchen Ovens',
      description: 'Convection, deck, and specialty ovens',
      icon: '🔥'
    },
    {
      name: 'Cooktops/Grills',
      description: 'Gas and electric cooking surfaces',
      icon: '🍳'
    },
    {
      name: 'All Fryers',
      description: 'Deep fryers and pressure fryers',
      icon: '🍟'
    },
    {
      name: 'Combi Ovens',
      description: 'Combination steam and convection ovens',
      icon: '⚡'
    },
    {
      name: 'Kettles/Skillets',
      description: 'Steam kettles and tilt skillets',
      icon: '🥘'
    },
    {
      name: 'Heated Display Cases/Lamps',
      description: 'Food warming and display equipment',
      icon: '💡'
    },
    {
      name: 'Dishwashers',
      description: 'Commercial warewashing equipment',
      icon: '🧽'
    },
    {
      name: 'Garbage Disposals',
      description: 'Commercial waste disposal systems',
      icon: '🗑️'
    }
  ],
  industries: [
    'Fast Food Restaurants',
    'Full Service Restaurants',
    'Hotels & Hospitality',
    'Schools & Universities',
    'Hospitals & Healthcare',
    'Cafeterias',
    'Catering Companies',
    'Food Trucks'
  ],
  commonIssues: [
    {
      problem: 'Pilot Light Not Staying On',
      solution: 'We clean pilot assemblies, replace thermocouples, and adjust gas flow for reliable ignition.',
      prevention: 'Regular cleaning and annual pilot system inspection.'
    },
    {
      problem: 'Failed Heating Elements',
      solution: 'Professional replacement with OEM heating elements and electrical testing.',
      prevention: 'Regular electrical inspections and proper usage training.'
    },
    {
      problem: 'Thermostat Failures',
      solution: 'Calibration or replacement of temperature controls for accurate cooking temperatures.',
      prevention: 'Annual calibration and protection from kitchen humidity.'
    },
    {
      problem: 'Safety High Limit Failures',
      solution: 'Testing and replacement of safety systems to prevent overheating.',
      prevention: 'Regular safety system testing and proper ventilation.'
    },
    {
      problem: 'Blower Motor Failures',
      solution: 'Motor replacement and airflow optimization for convection equipment.',
      prevention: 'Regular filter changes and motor lubrication.'
    },
    {
      problem: 'Gas Pressure Issues',
      solution: 'Gas pressure testing and regulator adjustment per manufacturer specifications.',
      prevention: 'Annual gas system inspection and pressure verification.'
    }
  ],
  brands: [
    { name: 'Cleveland', logo: '/content/Food-Service-Equipment-logos/Cleveland-1.webp' },
    { name: 'Bunn', logo: '/content/Food-Service-Equipment-logos/Bunn.webp' },
    { name: 'Frymaster', logo: '/content/Food-Service-Equipment-logos/frymaster-2.webp' },
    { name: 'Hatco', logo: '/content/Food-Service-Equipment-logos/hatco-1.webp' },
    { name: 'Jackson Warewashing', logo: '/content/Food-Service-Equipment-logos/jackson-warewashing-1.webp' },
    { name: 'Princastle', logo: '/content/Food-Service-Equipment-logos/princastle.webp' }
  ],
  features: {
    experience: '45+ years combined experience',
    availability: '24/7 emergency service',
    response: '2-hour average response time',
    satisfaction: '98% customer satisfaction rate'
  },
  seo: {
    title: "Commercial Kitchen Equipment Repair Oklahoma City - OnDemand Restaurant Service",
    description: "Expert repair and maintenance for commercial cooking equipment in Oklahoma City. Ovens, fryers, grills, dishwashers. 24/7 emergency service.",
    keywords: [
      "commercial kitchen equipment repair Oklahoma City",
      "restaurant equipment repair",
      "oven repair OKC",
      "fryer repair service",
      "commercial dishwasher repair",
      "grill repair",
      "kitchen equipment maintenance",
      "emergency restaurant equipment repair"
    ],
    ogTitle: "Commercial Kitchen Equipment Repair - OnDemand Restaurant Service Oklahoma",
    ogDescription: "Professional repair, installation, and maintenance for restaurant cooking equipment. 24/7 service in Oklahoma City.",
    ogImage: "/content/Food-Equipment-Service-Hero-Image.png",
    ogImageAlt: "Technician servicing commercial kitchen equipment",
    ogType: "website",
    ogUrl: "https://ondemandrs.com/services/food-service-equipment",
    twitterTitle: "Commercial Kitchen Equipment Repair OKC - 24/7 Service",
    twitterDescription: "Expert service for ovens, fryers, grills, and dishwashers. Fast response.",
    twitterImage: "/content/Food-Equipment-Service-Hero-Image.png",
    twitterCard: "summary_large_image",
    canonical: "https://ondemandrs.com/services/food-service-equipment",
    robots: "index, follow",
    viewport: "width=device-width, initial-scale=1",
    language: "en-US",
    author: "OnDemand Restaurant Service",
    breadcrumbs: [
      { name: "Home", url: "https://ondemandrs.com" },
      { name: "Services", url: "https://ondemandrs.com/services" },
      { name: "Food Service Equipment", url: "https://ondemandrs.com/services/food-service-equipment" }
    ],
    serviceSchema: {
      serviceType: "Commercial Kitchen Equipment Repair and Maintenance",
      provider: "OnDemand Restaurant Service",
      areaServed: ["Oklahoma"],
      availableChannel: {
        availableLanguage: ["English"],
        servicePhone: "405-242-6028",
        serviceUrl: "https://ondemandrs.com/services/food-service-equipment"
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
