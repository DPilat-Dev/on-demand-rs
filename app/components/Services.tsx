import Link from 'next/link';
import { CheckCircle } from 'lucide-react';
import Image from 'next/image';
import DynamicIcon from './DynamicIcon';
import type { HomePageData } from '@/data/homepage';

export default function Services({
  services,
  serviceImageMap,
}: {
  services: HomePageData['services'];
  serviceImageMap: Record<string, string>;
}) {

  const getIcon = (iconName: string, iconColor?: string) => {
    const icons: Record<string, React.ReactNode> = {
      'refrigeration': <DynamicIcon iconName="FaSnowflake" size={24} color={iconColor} />,
      'food-service': <DynamicIcon iconName="FaUtensils" size={24} color={iconColor} />,
      'hvac': <DynamicIcon iconName="FaThermometerHalf" size={24} color={iconColor} />,
      'ice-machine': <DynamicIcon iconName="FaCube" size={24} color={iconColor} />,
      'maintenance': <DynamicIcon iconName="FaWrench" size={24} color={iconColor} />
    };
    return icons[iconName] || <DynamicIcon iconName="FaWrench" size={24} color={iconColor} />;
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {services.title}
          </h2>
          <p className="text-lg text-gray-600">
            {services.subtitle}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.serviceCards.map((service, index) => {
            // Extract slug from link
            const slug = service.link.replace('/services/', '');
            const serviceImage = serviceImageMap[slug];
            
            return (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow flex flex-col"
              >
                {/* Service Image */}
                {serviceImage && (
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={serviceImage}
                      alt={service.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                     <div className="absolute top-4 left-4">
                        <div className="h-12 w-12 rounded-lg bg-white/90 backdrop-blur-sm flex items-center justify-center">
                          {getIcon(service.icon, service.iconColor)}
                        </div>
                     </div>
                  </div>
                )}

                <div className="p-6 flex-1 flex flex-col">
                  {/* Title & Description */}
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {service.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2 mb-6 flex-1">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <Link
                    href={service.link}
                    className="inline-flex items-center justify-center w-full rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition-colors mt-auto"
                  >
                    Learn More
                    <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Emergency CTA */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">Need Emergency Service?</h3>
          <p className="text-lg mb-6">Our team is available 24/7 for emergency repairs</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
             <a
               href="tel:405-242-6028"
               className="inline-flex items-center justify-center rounded-lg bg-white px-6 py-3 text-blue-600 font-semibold hover:bg-gray-100 transition-colors"
             >
                <DynamicIcon iconName="FaPhone" size={20} color="#3b82f6" className="mr-2" />
               Call Now: 405-242-6028
             </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg bg-transparent border-2 border-white px-6 py-3 font-semibold hover:bg-white/10 transition-colors"
            >
              Request Service Online
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}