export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image?: string;
  experience: string;
}

export interface AboutSection {
  id: string;
  title: string;
  content: string;
  icon?: string;
  highlight?: boolean;
}

export interface CompanyValue {
  title: string;
  description: string;
  icon: string;
}

export interface AboutUsData {
  hero: {
    title: string;
    subtitle: string;
    description: string;
    backgroundImage?: string;
    heroVideos?: string[];
  };
  mission: {
    title: string;
    content: string;
  };
  story: {
    title: string;
    sections: AboutSection[];
  };
  values: {
    title: string;
    subtitle: string;
    values: CompanyValue[];
  };
  team: {
    title: string;
    subtitle: string;
    experience: string;
    members?: TeamMember[];
  };
  commitment: {
    title: string;
    points: string[];
  };
  contact: {
    title: string;
    subtitle: string;
    address: string;
    phone: string;
    email: string;
  };
}

export const aboutUsData: AboutUsData = {
  hero: {
    title: "The OnDemand Team",
    subtitle: "Oklahoma's Finest Restaurant Service",
    description: "Founded on the principle of truly listening to our customers and providing next-level customer care & service.",
    backgroundImage: "/content/OnDemandRs-Hero.jpg"
  },
  mission: {
    title: "Our Mission",
    content: "OnDemand Restaurant Service was founded on the need in the marketplace for a service provider that truly listens to their customers and provides next level customer care & service."
  },
  story: {
    title: "Our Story",
    sections: [
      {
        id: "foundation",
        title: "Founded on Customer Feedback",
        content: "While working at our competitors of today, we have listened to customers over the last few years and engaged with them on how a company should be treating them and taking care of their needs when it comes to service.",
        icon: "👂",
        highlight: true
      },
      {
        id: "engagement",
        title: "Building Relationships",
        content: "By being attentive listeners we are able to further engage with our customers and build a bond.",
        icon: "🤝"
      },
      {
        id: "expertise",
        title: "Superior Service & Expertise",
        content: "Then by executing superior service with over 45 years of combined knowledge in the trade, we can build trust with our customers and give them peace of mind that their equipment will be fixed right the first time.",
        icon: "🔧"
      },
      {
        id: "followup",
        title: "Ongoing Care",
        content: "Lastly, following up with our customers on a previous repair shows them we care about how their business is doing and that we truly care about our workmanship.",
        icon: "💙"
      }
    ]
  },
  values: {
    title: "Our Values",
    subtitle: "What drives us every day",
    values: [
      {
        title: "Excellence",
        description: "We always strive for excellence here at OnDemand Restaurant Service and whether we get positive or negative feedback from our customers we use it to help us move forward as a company and adapt to our customer needs.",
        icon: "⭐"
      },
      {
        title: "Family-Oriented",
        description: "We are a family oriented company and believe that our employees deserve to have more of a family life than a work life. We will not push our technicians just to secure more profits.",
        icon: "👨‍👩‍👧‍👦"
      },
      {
        title: "Industry Change",
        description: "We will never forget why we started OnDemand Restaurant Service and do believe we will make a change in our industry for how customer service is done on the next level!",
        icon: "🚀"
      }
    ]
  },
  team: {
    title: "Our Expert Team",
    subtitle: "Over 45 years of combined knowledge in the trade",
    experience: "Our experienced technicians are committed to providing superior service and building trust with every customer.",
    members: [
      {
        name: "John Smith",
        role: "Lead HVAC Technician",
        bio: "With over 15 years of experience in commercial HVAC systems, John specializes in kitchen ventilation and climate control solutions.",
        image: "/content/team/john-smith.jpg",
        experience: "15+ years"
      },
      {
        name: "Mike Johnson",
        role: "Refrigeration Specialist",
        bio: "Mike brings 12 years of expertise in commercial refrigeration systems, ensuring your equipment runs efficiently and reliably.",
        image: "/content/team/mike-johnson.jpg",
        experience: "12+ years"
      },
      {
        name: "Sarah Davis",
        role: "Food Service Equipment Expert",
        bio: "Sarah has 10 years of experience maintaining and repairing all types of commercial kitchen equipment with precision and care.",
        image: "/content/team/sarah-davis.jpg",
        experience: "10+ years"
      },
      {
        name: "Tom Wilson",
        role: "Ice Machine Technician",
        bio: "Tom specializes in ice machine installation, maintenance, and repair with 8 years of dedicated experience in the field.",
        image: "/content/team/tom-wilson.jpg",
        experience: "8+ years"
      }
    ]
  },
  commitment: {
    title: "Our Commitment",
    points: [
      "24/7 Emergency Service Available",
      "Superior service with decades of combined experience",
      "Equipment fixed right the first time",
      "Follow-up on every repair to ensure satisfaction",
      "Family-oriented company culture",
      "Continuous improvement based on customer feedback"
    ]
  },
  contact: {
    title: "Get in Touch",
    subtitle: "Service is at your Command",
    address: "340 S Eckroat St Building 6, Oklahoma City, OK 73129",
    phone: "405-242-6028",
    email: "Service@ondemandrs.com"
  }
};


