import { ServiceData } from '../../types/service';

export const iceMachinesData: ServiceData = {
  slug: 'ice-machines',
  name: 'Ice Machines',
  description: 'Professional ice machine services including installation, maintenance, and repairs for commercial ice makers, dispensers, and storage solutions.',
  icon: '🧊',
  heroImage: '/content/optimized/Ice-Machine-Hero-Image.webp',
  serviceTypes: [
    {
      name: 'Installation',
      description: 'Professional ice machine installation and setup',
      features: [
        'Water line connections',
        'Drain system setup',
        'Electrical connections',
        'System commissioning and testing'
      ]
    },
    {
      name: 'Maintenance',
      description: 'Regular cleaning and maintenance programs',
      features: [
        'Deep cleaning and sanitizing',
        'Filter replacement',
        'Water quality testing',
        'Performance optimization'
      ]
    },
    {
      name: 'Repairs',
      description: 'Expert repair services for all ice machine types',
      features: [
        'Emergency breakdown service',
        'Component replacement',
        'Water system repairs',
        'Electrical troubleshooting'
      ]
    }
  ],
  equipment: [
    {
      name: 'Cube Ice Machines',
      description: 'Standard cube ice makers for restaurants and bars',
      icon: '🧊'
    },
    {
      name: 'Flake Ice Machines',
      description: 'Flake ice for food display and preservation',
      icon: '❄️'
    },
    {
      name: 'Nugget Ice Machines',
      description: 'Chewable nugget ice dispensers',
      icon: '🥤'
    },
    {
      name: 'Ice Dispensers',
      description: 'Self-service ice dispensing systems',
      icon: '🚰'
    },
    {
      name: 'Ice Storage Bins',
      description: 'Insulated ice storage solutions',
      icon: '📦'
    },
    {
      name: 'Specialty Ice Machines',
      description: 'Custom and specialty ice equipment',
      icon: '⚙️'
    },
    {
      name: 'Water Filtration',
      description: 'Ice machine water treatment systems',
      icon: '💧'
    },
    {
      name: 'Remote Condensers',
      description: 'Remote condensing units for ice machines',
      icon: '🔧'
    }
  ],
  industries: [
    'Restaurants',
    'Bars & Nightclubs',
    'Hotels & Hospitality',
    'Healthcare Facilities',
    'Convenience Stores',
    'Cafeterias',
    'Food Service Operations',
    'Sports Venues'
  ],
  commonIssues: [
    {
      problem: 'Loose Wires',
      solution: 'Electrical inspection and secure connection of all wiring for safe operation.',
      prevention: 'Regular electrical inspections and vibration dampening.'
    },
    {
      problem: 'Clogged Filters',
      solution: 'Filter replacement and water system cleaning for optimal ice quality.',
      prevention: 'Regular filter changes based on water usage and quality.'
    },
    {
      problem: 'Scaled Evaporators',
      solution: 'Professional descaling and water treatment system installation.',
      prevention: 'Regular cleaning cycles and water quality management.'
    },
    {
      problem: 'Dirty Condenser Coils',
      solution: 'Thorough coil cleaning and improved ventilation for efficient operation.',
      prevention: 'Quarterly coil cleaning and proper equipment spacing.'
    },
    {
      problem: 'Water Leaks',
      solution: 'Leak detection and repair of water lines, valves, and connections.',
      prevention: 'Regular inspection of water connections and hoses.'
    },
    {
      problem: 'Ice Quality Issues',
      solution: 'Deep cleaning, sanitizing, and water filtration system optimization.',
      prevention: 'Regular cleaning schedule and water quality testing.'
    }
  ],
  brands: [
    { name: 'Hoshizaki', logo: '/content/Ice-Machine-logos/Hoshizaki-1.webp' },
    { name: 'Scotsman', logo: '/content/Ice-Machine-logos/Scotsman-1.webp' },
    { name: 'Ice-O-Matic', logo: '/content/Ice-Machine-logos/ice-o-matic.webp' }
  ],
  features: {
    experience: '45+ years combined experience',
    availability: '24/7 emergency service',
    response: '2-hour average response time',
    satisfaction: '98% customer satisfaction rate'
  },
  seo: {
    title: "Commercial Ice Machine Repair Oklahoma City - OnDemand Restaurant Service",
    description: "Expert commercial ice machine repair, cleaning, and maintenance in Oklahoma City. Hoshizaki, Scotsman, Ice-O-Matic service. 24/7 emergency support.",
    keywords: [
      "ice machine repair Oklahoma City",
      "commercial ice maker repair",
      "Hoshizaki repair OKC",
      "Scotsman ice machine service",
      "Ice-O-Matic repair",
      "ice machine cleaning service",
      "commercial ice machine maintenance",
      "emergency ice machine repair"
    ],
    ogTitle: "Commercial Ice Machine Repair - OnDemand Restaurant Service Oklahoma",
    ogDescription: "Professional repair and maintenance for commercial ice machines. 24/7 emergency service in Oklahoma City and surrounding areas.",
    ogImage: "/content/Ice-Machine-Hero-Image.jpg",
    ogImageAlt: "Technician servicing a commercial ice machine",
    ogType: "website",
    ogUrl: "https://ondemandrs.com/services/ice-machines",
    twitterTitle: "Commercial Ice Machine Repair Oklahoma City - 24/7 Service",
    twitterDescription: "Expert service for Hoshizaki, Scotsman, and Ice-O-Matic. Fast response.",
    twitterImage: "/content/Ice-Machine-Hero-Image.jpg",
    twitterCard: "summary_large_image",
    canonical: "https://ondemandrs.com/services/ice-machines",
    robots: "index, follow",
    viewport: "width=device-width, initial-scale=1",
    language: "en-US",
    author: "OnDemand Restaurant Service",
    breadcrumbs: [
      { name: "Home", url: "https://ondemandrs.com" },
      { name: "Services", url: "https://ondemandrs.com/services" },
      { name: "Ice Machines", url: "https://ondemandrs.com/services/ice-machines" }
    ],
    serviceSchema: {
      serviceType: "Commercial Ice Machine Repair and Maintenance",
      provider: "OnDemand Restaurant Service",
      areaServed: ["Oklahoma"],
      availableChannel: {
        availableLanguage: ["English"],
        servicePhone: "405-242-6028",
        serviceUrl: "https://ondemandrs.com/services/ice-machines"
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
