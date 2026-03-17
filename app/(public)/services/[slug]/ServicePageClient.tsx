'use client';

import { notFound } from 'next/navigation';
import { CheckCircle, Phone, Clock, Shield } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import DynamicIcon from '@/app/components/DynamicIcon';
import { type ServiceData } from '@/types/service';

interface ServicePageClientProps {
  serviceData: ServiceData | null;
}

export default function ServicePageClient({ serviceData }: ServicePageClientProps) {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  if (!serviceData) {
    notFound();
  }

  // Ensure all required properties exist
  const safeServiceData = {
    ...serviceData,
    serviceTypes: serviceData.serviceTypes || [],
    equipment: serviceData.equipment || [],
    faqs: serviceData.faqs || [],
    commonIssues: serviceData.commonIssues || [],
    brands: serviceData.brands || [],
    sections: serviceData.sections || {},
    cta: serviceData.cta || {
      title: 'Need Emergency Service?',
      description: 'Our team is available 24/7 for emergency repairs',
      buttonText: 'Call Now',
      phone: '405-242-6028'
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 to-gray-900 text-white">
        <div className="container mx-auto px-4 py-24 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            {/* Left Content */}
            <div className="max-w-3xl lg:flex-1">
              <div className="flex items-center space-x-3 mb-6">
                <div className="text-3xl">{safeServiceData.icon}</div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
                  {safeServiceData.name}
                </h1>
              </div>
              <p className="text-xl text-gray-300 mb-8">
                {safeServiceData.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="tel:405-242-6028"
                  className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-6 py-3 text-white font-semibold hover:bg-blue-700 transition-colors"
                >
                  <Phone className="h-5 w-5 mr-2" />
                  Call Now: 405-242-6028
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-lg bg-white/10 border border-white px-6 py-3 font-semibold hover:bg-white/20 transition-colors"
                >
                  Request Service
                </Link>
              </div>
            </div>

            {/* Right Image Section */}
            {safeServiceData.heroImage && (
              <div className="lg:w-1/2 lg:max-w-xl">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src={safeServiceData.heroImage}
                    alt={`${safeServiceData.name} service`}
                    width={600}
                    height={400}
                    className="w-full h-auto object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                      <p className="text-white font-semibold text-lg">Professional {safeServiceData.name} Service</p>
                      <p className="text-gray-200 text-sm mt-1">Licensed technicians • 24/7 Emergency Support</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Service Types */}
      {safeServiceData.serviceTypes.length > 0 && (safeServiceData.sections?.serviceTypes !== false) && (
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Our {safeServiceData.name} Services
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {safeServiceData.serviceTypes.map((serviceType: any, index: number) => (
              <div
                key={index}
                className="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:border-blue-300 transition-colors"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {serviceType.name}
                </h3>
                <p className="text-gray-600 mb-6">
                  {serviceType.description}
                </p>
                <ul className="space-y-3">
                  {serviceType.features && serviceType.features.map((feature: string, idx: number) => (
                    <li key={idx} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* Equipment */}
      {safeServiceData.equipment.length > 0 && (safeServiceData.sections?.equipment !== false) && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              Equipment We Service
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {safeServiceData.equipment.map((item: any, index: number) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow"
                >
                  <div className="text-2xl mb-4">{item.icon}</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {item.name}
                  </h3>
                  <p className="text-gray-600">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

       {/* Common Issues Section */}
       {safeServiceData.commonIssues.length > 0 && (safeServiceData.sections?.commonIssues !== false) && (
         <section className="faq-section py-16 bg-gray-50">
           <div className="container mx-auto px-4 sm:px-6 lg:px-8">
             <div className="faq-container max-w-4xl mx-auto">
               <div className="faq-header text-center mb-12">
                 <h2 className="faq-title text-3xl font-bold text-gray-900 mb-4">
                   Common {safeServiceData.name} Issues
                 </h2>
                 <p className="faq-subtitle text-lg text-gray-600">
                   Quick solutions to the most frequent problems we encounter
                 </p>
               </div>

               <div className="faq-list space-y-4">
                 {safeServiceData.commonIssues.map((issue: any, index: number) => (
                   <div key={index} className="faq-item bg-white rounded-xl border border-gray-200 overflow-hidden">
                     <button
                       className={`faq-question w-full text-left p-6 flex justify-between items-center hover:bg-gray-50 transition-colors ${openFAQ === index ? 'active' : ''}`}
                       onClick={() => toggleFAQ(index)}
                     >
                       <span className="text-lg font-semibold text-gray-900">{issue.problem}</span>
                       <div className="faq-icon text-2xl text-blue-600">
                         {openFAQ === index ? '−' : '+'}
                       </div>
                     </button>
                     <div className={`faq-answer overflow-hidden transition-all duration-300 ${openFAQ === index ? 'max-h-96' : 'max-h-0'}`}>
                       <div className="faq-answer-content p-6 pt-0">
                         <div className="faq-answer-section mb-4">
                           <span className="faq-answer-label font-semibold text-gray-900 mr-2">Solution:</span>
                           <span className="text-gray-600">{issue.solution}</span>
                         </div>
                         {issue.prevention && (
                           <div className="faq-answer-section">
                             <span className="faq-answer-label font-semibold text-gray-900 mr-2">Prevention:</span>
                             <span className="text-gray-600">{issue.prevention}</span>
                           </div>
                         )}
                       </div>
                     </div>
                   </div>
                 ))}
               </div>

               <div className="faq-cta mt-12 text-center">
                 <h3 className="faq-cta-title text-2xl font-bold text-gray-900 mb-4">Need Professional Help?</h3>
                 <p className="faq-cta-text text-lg text-gray-600 mb-6">
                   Our certified technicians can diagnose and fix any {safeServiceData.name.toLowerCase()} issue quickly and efficiently.
                 </p>
                 <a href="tel:405-242-6028" className="faq-cta-button inline-flex items-center justify-center rounded-lg bg-blue-600 px-8 py-4 text-white font-semibold hover:bg-blue-700 transition-colors">
                     <DynamicIcon iconName="FaWrench" size={20} color="white" className="mr-2" />
                    Schedule Service Call
                 </a>
               </div>
             </div>
           </div>
         </section>
       )}

       {/* Brands Section */}
       {safeServiceData.brands.length > 0 && (safeServiceData.sections?.brands !== false) && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Trusted Brands We Service
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                We&apos;re certified to service all major commercial equipment brands
              </p>
            </div>

            {/* Desktop Carousel */}
            <div className="hidden md:block overflow-hidden mb-8">
              <div className="flex animate-scroll">
                {/* First set of brands */}
                {safeServiceData.brands.map((brand: any, index: number) => (
                  <div key={index} className="flex-shrink-0 w-48 h-32 flex items-center justify-center px-4">
                    {brand.logo ? (
                      <div className="relative w-32 h-16">
                        <Image
                          src={brand.logo}
                          alt={`${brand.name} logo`}
                          fill
                          className="object-contain"
                          sizes="128px"
                        />
                      </div>
                    ) : (
                      <div className="text-lg font-semibold text-gray-700">{brand.name}</div>
                    )}
                  </div>
                ))}
                {/* Duplicate set for seamless loop */}
                {safeServiceData.brands.map((brand: any, index: number) => (
                  <div key={`duplicate-${index}`} className="flex-shrink-0 w-48 h-32 flex items-center justify-center px-4">
                    {brand.logo ? (
                      <div className="relative w-32 h-16">
                        <Image
                          src={brand.logo}
                          alt={`${brand.name} logo`}
                          fill
                          className="object-contain"
                          sizes="128px"
                        />
                      </div>
                    ) : (
                      <div className="text-lg font-semibold text-gray-700">{brand.name}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile/Tablet Grid */}
            <div className="md:hidden grid grid-cols-3 sm:grid-cols-4 gap-6 mb-8">
              {safeServiceData.brands.map((brand: any, index: number) => (
                <div key={index} className="h-24 flex items-center justify-center p-2">
                  {brand.logo ? (
                    <div className="relative w-full h-12">
                      <Image
                        src={brand.logo}
                        alt={`${brand.name} logo`}
                        fill
                        className="object-contain"
                        sizes="(max-width: 640px) 100px, 128px"
                      />
                    </div>
                  ) : (
                    <div className="text-sm font-semibold text-gray-700 text-center">{brand.name}</div>
                  )}
                </div>
              ))}
            </div>

            <div className="text-center">
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Don&apos;t see your brand? We service most commercial equipment manufacturers and can work on older or specialty models.
              </p>
              <a href="tel:405-242-6028" className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-6 py-3 text-white font-semibold hover:bg-blue-700 transition-colors">
                  <DynamicIcon iconName="FaWrench" size={20} color="white" className="mr-2" />
                 Ask About Your Brand
              </a>
            </div>
          </div>
        </section>
      )}

      {/* FAQs */}
      {safeServiceData.faqs.length > 0 && (safeServiceData.sections?.faqs !== false) && (
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              Frequently Asked Questions
            </h2>

            <div className="max-w-3xl mx-auto space-y-6">
              {safeServiceData.faqs.map((faq: any, index: number) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 border border-gray-200"
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-gray-600">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {safeServiceData.cta.title}
            </h2>
            <p className="text-xl mb-8">
              {safeServiceData.cta.description}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white/10 rounded-lg p-6">
                <Clock className="h-8 w-8 text-white mx-auto mb-4" />
                <h4 className="font-semibold mb-2">24/7 Emergency Service</h4>
                <p className="text-blue-100">Always available when you need us</p>
              </div>
              <div className="bg-white/10 rounded-lg p-6">
                <Shield className="h-8 w-8 text-white mx-auto mb-4" />
                <h4 className="font-semibold mb-2">Licensed & Insured</h4>
                <p className="text-blue-100">Professional and reliable service</p>
              </div>
              <div className="bg-white/10 rounded-lg p-6">
                <div className="h-8 w-8 text-white mx-auto mb-4 flex items-center justify-center text-xl">
                  ⚡
                </div>
                <h4 className="font-semibold mb-2">2-Hour Response</h4>
                <p className="text-blue-100">Guaranteed rapid response time</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href={`tel:${safeServiceData.cta.phone}`}
                  className="inline-flex items-center justify-center rounded-lg bg-white px-8 py-4 text-blue-600 font-bold hover:bg-gray-100 transition-colors text-lg"
                >
                  <Phone className="h-5 w-5 mr-2" />
                  {safeServiceData.cta.buttonText}
                </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-lg bg-transparent border-2 border-white px-8 py-4 font-bold hover:bg-white/10 transition-colors text-lg"
              >
                Request Service Online
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
