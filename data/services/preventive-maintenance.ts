import { ServiceData } from '../../types/service';

export const preventiveMaintenanceData: ServiceData = {
  slug: 'preventive-maintenance',
  name: 'Preventive Maintenance',
  description: 'Comprehensive preventive maintenance programs to extend equipment life, reduce downtime, and optimize performance for all your commercial kitchen equipment.',
  icon: '🔧',
  heroImage: '/content/optimized/Superior-Service-Approach-homepage-image.webp',
  serviceTypes: [
    {
      name: 'Scheduled Maintenance Plans',
      description: 'Regularly scheduled maintenance to prevent unexpected breakdowns',
      features: [
        'Quarterly equipment inspections',
        'Performance optimization',
        'Safety compliance checks',
        'Energy efficiency audits'
      ]
    },
    {
      name: 'Equipment-Specific Programs',
      description: 'Tailored maintenance for different types of equipment',
      features: [
        'Refrigeration system maintenance',
        'HVAC and ventilation cleaning',
        'Food service equipment tuning',
        'Ice machine sanitization'
      ]
    },
    {
      name: 'Emergency Prevention',
      description: 'Proactive measures to avoid costly emergency repairs',
      features: [
        'Wear-and-tear analysis',
        'Component life cycle tracking',
        'Early failure detection',
        'Replacement part forecasting'
      ]
    }
  ],
  equipment: [
    {
      name: 'Commercial Refrigeration Systems',
      description: 'Walk-in coolers, freezers, and reach-in units',
      icon: '❄️'
    },
    {
      name: 'Food Service Equipment',
      description: 'Ovens, fryers, grills, and steamers',
      icon: '🍳'
    },
    {
      name: 'Commercial HVAC Systems',
      description: 'Kitchen ventilation and climate control',
      icon: '🌡️'
    },
    {
      name: 'Ice Machines',
      description: 'Commercial ice makers and dispensers',
      icon: '🧊'
    }
  ],
  industries: [
    'Restaurants & Cafes',
    'Hotels & Resorts',
    'Schools & Universities',
    'Healthcare Facilities',
    'Corporate Cafeterias',
    'Catering Services'
  ],
  commonIssues: [
    {
      problem: 'Unexpected equipment failures',
      solution: 'Regular inspections and component testing',
      prevention: 'Scheduled maintenance program'
    },
    {
      problem: 'Reduced equipment efficiency',
      solution: 'Performance tuning and calibration',
      prevention: 'Quarterly efficiency audits'
    },
    {
      problem: 'Increased energy costs',
      solution: 'Energy consumption analysis',
      prevention: 'Regular system optimization'
    }
  ],
  brands: [
    { name: 'All major commercial equipment brands' },
    { name: 'Custom programs for your specific needs' }
  ],
  features: {
    experience: '45+ years combined technician experience',
    availability: 'Flexible scheduling options',
    response: 'Priority service for maintenance clients',
    satisfaction: '98% customer satisfaction rate'
  },
  seo: {
    title: 'Preventive Maintenance Programs | OnDemand Restaurant Service',
    description: 'Professional preventive maintenance programs for commercial kitchen equipment. Reduce downtime, extend equipment life, and save on energy costs.',
    keywords: [
      'preventive maintenance',
      'equipment maintenance programs',
      'restaurant equipment maintenance',
      'commercial kitchen maintenance',
      'scheduled maintenance',
      'equipment life extension'
    ]
  },
  sections: {
    equipment: true,
    brands: false,
    industries: true,
    faq: true,  // FAQ section disabled for this service
    contact: true
  }
};