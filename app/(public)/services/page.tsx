import Link from 'next/link';
import { CheckCircle } from 'lucide-react';
import Image from 'next/image';
import DynamicIcon from '@/app/components/DynamicIcon';
import { getPageContent, getAllServices } from '@/lib/content';
import type { HomePageData } from '@/data/homepage';
import type { ServicesListingData } from '@/data/services-listing';

export default async function ServicesPage() {
  const [homepageData, listingData, allServices] = await Promise.all([
    getPageContent('homepage') as Promise<HomePageData>,
    getPageContent('services-listing') as Promise<ServicesListingData>,
    getAllServices(),
  ]);

  const { services } = homepageData;
  const { hero, emergencyCTA } = listingData;

  const serviceImageMap: Record<string, string> = Object.fromEntries(
    allServices.map((s) => [s.slug, s.heroImage ?? ''])
  );

  const getIcon = (iconName: string) => {
    const service = services.serviceCards.find((card) => card.icon === iconName);
    const iconColor = service?.iconColor;
    const icons: Record<string, React.ReactNode> = {
      refrigeration: <DynamicIcon iconName="FaSnowflake" size={24} color={iconColor} />,
      'food-service': <DynamicIcon iconName="FaUtensils" size={24} color={iconColor} />,
      hvac: <DynamicIcon iconName="FaThermometerHalf" size={24} color={iconColor} />,
      'ice-machine': <DynamicIcon iconName="FaCube" size={24} color={iconColor} />,
      maintenance: <DynamicIcon iconName="FaWrench" size={24} color={iconColor} />,
    };
    return icons[iconName] || <DynamicIcon iconName="FaWrench" size={24} color={iconColor} />;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 to-gray-900 text-white">
        <div className="container mx-auto px-4 py-24 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="max-w-3xl lg:flex-1">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                {hero.title}
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                {hero.subtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href={`tel:${hero.phone}`}
                  className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-6 py-3 text-white font-semibold hover:bg-blue-700 transition-colors"
                >
                  <DynamicIcon iconName="FaPhone" size={20} color="white" className="mr-2" /> Call Now: {hero.phone}
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-lg bg-white/10 border border-white px-6 py-3 font-semibold hover:bg-white/20 transition-colors"
                >
                  Request Service Online
                </Link>
              </div>
            </div>
            <div className="lg:w-1/2 lg:max-w-xl">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={hero.heroImage}
                  alt={hero.heroImageAlt}
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                    <p className="text-white font-semibold text-lg">{hero.overlayTitle}</p>
                    <p className="text-gray-200 text-sm mt-1">{hero.overlaySubtitle}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{services.title}</h2>
            <p className="text-lg text-gray-600">{services.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.serviceCards.map((service, index) => {
              const slug = service.link.replace('/services/', '');
              const serviceImage = serviceImageMap[slug];
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-all hover:-translate-y-1 flex flex-col"
                >
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
                          {getIcon(service.icon)}
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
                    <p className="text-gray-600 mb-4">{service.description}</p>
                    <ul className="space-y-2 mb-6 flex-1">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={service.link}
                      className="inline-flex items-center justify-center w-full rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition-colors mt-auto"
                    >
                      View Service Details
                      <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Emergency CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">{emergencyCTA.title}</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">{emergencyCTA.description}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`tel:${emergencyCTA.phone}`}
              className="inline-flex items-center justify-center rounded-lg bg-white px-8 py-4 text-blue-600 font-bold hover:bg-gray-100 transition-colors text-lg"
            >
              <DynamicIcon iconName="FaPhone" size={20} color="#3b82f6" className="mr-2" /> Emergency Call: {emergencyCTA.phone}
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg bg-transparent border-2 border-white px-8 py-4 font-bold hover:bg-white/10 transition-colors text-lg"
            >
              Request Emergency Service
            </Link>
          </div>
          <p className="mt-4 text-blue-100">{emergencyCTA.footer}</p>
        </div>
      </section>
    </div>
  );
}
