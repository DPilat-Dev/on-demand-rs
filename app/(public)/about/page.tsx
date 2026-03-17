import { Shield, Clock, Users, Award, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import DynamicIcon from '@/app/components/DynamicIcon';

export default function AboutPage() {
  const features = [
    {
      icon: <Shield className="h-8 w-8" />,
      title: 'Licensed & Insured',
      description: 'Fully licensed and insured technicians with EPA and NATE certifications'
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: '24/7 Emergency Service',
      description: 'Always available when you need us most, with 2-hour response guarantee'
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: '45+ Years Experience',
      description: 'Combined expertise serving Oklahoma restaurants for decades'
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: 'CFESA Certified',
      description: 'Proud member of the Commercial Food Equipment Service Association'
    }
  ];

  const values = [
    'Customer satisfaction is our top priority',
    'Transparent pricing with no hidden fees',
    'Quality workmanship on every service call',
    'Rapid response to minimize your downtime',
    'Continuous training on latest equipment',
    'Environmental responsibility in all repairs'
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 to-gray-900 text-white">
        <div className="container mx-auto px-4 py-24 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            {/* Left Content */}
            <div className="max-w-3xl lg:flex-1">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                About OnDemand Restaurant Service
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Oklahoma's most trusted restaurant equipment experts with 45+ years of combined experience serving commercial kitchens across the state.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="tel:405-242-6028"
                  className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-6 py-3 text-white font-semibold hover:bg-blue-700 transition-colors"
                >
                    <DynamicIcon iconName="FaPhone" size={20} color="white" className="mr-2" /> Call Now: 405-242-6028
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-lg bg-white/10 border border-white px-6 py-3 font-semibold hover:bg-white/20 transition-colors"
                >
                  Contact Us
                </Link>
              </div>
            </div>

            {/* Right Image Section */}
            <div className="lg:w-1/2 lg:max-w-xl">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/content/optimized/Superior-Service-Approach-homepage-image.webp"
                  alt="OnDemand Restaurant Service team providing superior service"
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                    <p className="text-white font-semibold text-lg">Superior Service Approach</p>
                    <p className="text-gray-200 text-sm mt-1">45+ Years Experience • CFESA Certified • 24/7 Support</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
              Our Story
            </h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 mb-6">
                Founded with a mission to provide reliable, professional restaurant equipment service across Oklahoma, OnDemand Restaurant Service has grown to become the state's most trusted equipment repair company.
              </p>
              <p className="text-gray-600 mb-6">
                Our team of licensed technicians brings over 45 years of combined experience in commercial HVAC, refrigeration, food service equipment, and ice machine repair. We understand that when your equipment fails, every minute counts - which is why we offer 24/7 emergency service with a guaranteed 2-hour response time.
              </p>
              <p className="text-gray-600">
                As proud members of the Commercial Food Equipment Service Association (CFESA), we stay current with the latest industry standards and technologies to provide the highest quality service to restaurants, hotels, schools, healthcare facilities, and commercial kitchens throughout Oklahoma.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
            Why Choose OnDemand
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow text-center"
              >
                <div className="h-16 w-16 rounded-lg bg-blue-100 flex items-center justify-center mx-auto mb-4 text-blue-600">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
              Our Values
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {values.map((value, index) => (
                <div key={index} className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                  <span className="text-gray-700 text-lg">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">500+</div>
              <div className="text-blue-100">Restaurants Served</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">45+</div>
              <div className="text-blue-100">Years Experience</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">24/7</div>
              <div className="text-blue-100">Emergency Service</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">98%</div>
              <div className="text-blue-100">Customer Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Ready to Experience Superior Service?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join hundreds of Oklahoma restaurants who trust OnDemand for their equipment repair and maintenance needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:405-242-6028"
              className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-8 py-4 text-white font-bold hover:bg-blue-700 transition-colors text-lg"
            >
                <DynamicIcon iconName="FaPhone" size={20} color="white" className="mr-2" /> Call Now: 405-242-6028
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg bg-gray-900 px-8 py-4 text-white font-bold hover:bg-black transition-colors text-lg"
            >
              Request Service Online
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}