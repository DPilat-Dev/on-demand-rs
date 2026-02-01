export interface ContactInfo {
  icon: string;
  title: string;
  content: string;
  link?: string;
  type?: 'phone' | 'email' | 'address' | 'hours';
}

export interface ServiceQuickLink {
  name: string;
  href: string;
  icon: string;
  description: string;
}

export interface ContactPageData {
  hero: {
    title: string;
    subtitle: string;
    description: string;
    backgroundImage?: string;
  };
  contactInfo: ContactInfo[];
  services: {
    title: string;
    subtitle: string;
    quickLinks: ServiceQuickLink[];
  };
  emergencyInfo: {
    title: string;
    subtitle: string;
    phone: string;
    features: string[];
  };
  form: {
    title: string;
    subtitle: string;
    fields: {
      name: string;
      email: string;
      phone: string;
      service: string;
      urgency: string;
      message: string;
    };
    serviceOptions: Array<{ value: string; label: string; }>;
    urgencyOptions: Array<{ value: string; label: string; }>;
  };
  location: {
    title: string;
    address: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
}

export const contactPageData: ContactPageData = {
  hero: {
    title: "Get In Touch",
    subtitle: "Professional Restaurant Equipment Service",
    description: "Ready to get your equipment back up and running? Contact our expert team for fast, reliable service across Oklahoma.",
    backgroundImage: "/content/OnDemandRs-Hero.jpg"
  },
  contactInfo: [
    {
      icon: "📞",
      title: "Emergency Service Line",
      content: "(405) 242-6028",
      link: "tel:405-242-6028",
      type: "phone"
    },
    {
      icon: "✉️",
      title: "Email Us",
      content: "Service@ondemandrs.com",
      link: "mailto:Service@ondemandrs.com",
      type: "email"
    },
    {
      icon: "📍",
      title: "Service Area",
      content: "340 S Eckroat St Building 6\nOklahoma City, OK 73129",
      type: "address"
    },
    {
      icon: "🕒",
      title: "Hours",
      content: "24/7 Emergency Service\nMonday - Friday: 8AM - 6PM\nWeekends: Emergency Only",
      type: "hours"
    }
  ],
  services: {
    title: "Our Services",
    subtitle: "Comprehensive commercial kitchen equipment solutions",
    quickLinks: [
      {
        name: "Commercial Refrigeration",
        href: "/services/commercial-refrigeration",
        icon: "❄️",
        description: "Walk-in coolers, reach-in refrigerators, freezers"
      },
      {
        name: "Food Service Equipment",
        href: "/services/food-service-equipment",
        icon: "🍳",
        description: "Ovens, fryers, grills, steamers, warming equipment"
      },
      {
        name: "Commercial HVAC",
        href: "/services/commercial-hvac",
        icon: "🌬️",
        description: "Kitchen ventilation, exhaust systems, climate control"
      },
      {
        name: "Ice Machines",
        href: "/services/ice-machines",
        icon: "🧊",
        description: "Commercial ice makers, dispensers, storage solutions"
      }
    ]
  },
  emergencyInfo: {
    title: "24/7 Emergency Service",
    subtitle: "When your equipment breaks down, every minute counts",
    phone: "405-242-6028",
    features: [
      "Average 2-hour response time",
      "Licensed & experienced technicians",
      "All major brands serviced",
      "Parts inventory on trucks",

      "Quality guarantee on all repairs"
    ]
  },
  form: {
    title: "Request Service",
    subtitle: "Tell us about your equipment issue and we'll get back to you quickly",
    fields: {
      name: "Full Name",
      email: "Email Address",
      phone: "Phone Number",
      service: "Service Type",
      urgency: "Urgency Level",
      message: "Describe Your Issue"
    },
    serviceOptions: [
      { value: "", label: "Select Service Type" },
      { value: "commercial-refrigeration", label: "Commercial Refrigeration" },
      { value: "food-service-equipment", label: "Food Service Equipment" },
      { value: "commercial-hvac", label: "Commercial HVAC" },
      { value: "ice-machines", label: "Ice Machines" },
      { value: "preventive-maintenance", label: "Preventive Maintenance" },
      { value: "other", label: "Other / General Inquiry" }
    ],
    urgencyOptions: [
      { value: "", label: "Select Urgency Level" },
      { value: "emergency", label: "🚨 Emergency - Equipment Down" },
      { value: "high", label: "⚡ High Priority - Within 24 Hours" },
      { value: "normal", label: "📅 Normal - Within a Few Days" }
    ]
  },
  location: {
    title: "Our Location",
    address: "340 S Eckroat St Building 6, Oklahoma City, OK 73129",
    coordinates: {
      lat: 35.4396,
      lng: -97.4731
    }
  }
};
