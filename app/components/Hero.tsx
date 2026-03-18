import Image from 'next/image';
import { Phone, Clock } from 'lucide-react';
import { BrandCarousel } from './BrandCarousel';
import DynamicIcon from './DynamicIcon';
import { HeroMedia } from './HeroMedia';
import type { HomePageData } from '@/data/homepage';

export default function Hero({ hero }: { hero: HomePageData['hero'] }) {

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 to-blue-900 text-white">
      <div className="absolute inset-0 bg-black/50 z-0" />
      <div className="relative z-10 container mx-auto px-4 py-24 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* Left Content */}
          <div className="max-w-3xl lg:flex-1">
             {/* Badge */}
             <div className="inline-flex items-center rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold mb-6">
                <DynamicIcon iconName="FaMapMarkerAlt" size={16} color="white" className="mr-2" />
               {hero.badge}
             </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
              {hero.title}
            </h1>

            {/* Subtitle */}
            <p className="text-xl text-gray-300 mb-8">
              {hero.subtitle}
            </p>

            {/* Emergency Info */}
            <div className="flex items-center space-x-4 mb-8">
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-blue-400" />
                <span className="font-semibold">{hero.emergency.text}</span>
              </div>
              <a
                href={`tel:${hero.emergency.phone}`}
                className="flex items-center space-x-2 text-blue-300 hover:text-white"
              >
                <Phone className="h-5 w-5" />
                <span className="font-bold text-lg">{hero.emergency.phone}</span>
              </a>
            </div>

            {/* CTA Form */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <h3 className="text-xl font-semibold mb-4">Get Emergency Help Now</h3>
              <form className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <input
                    type="email"
                    placeholder={hero.form.emailPlaceholder}
                    className="flex-1 rounded-lg bg-white/10 border border-white/20 px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="submit"
                    className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 transition-colors whitespace-nowrap"
                  >
                    {hero.form.buttonText}
                  </button>
                </div>
                <p className="text-sm text-gray-300">
                  By submitting, you agree to our terms and privacy policy.
                </p>
              </form>
            </div>

            {/* Certification */}
            <div className="mt-8 flex items-center space-x-4">
              <div className="h-18 w-55 rounded-lg bg-white p-2 flex items-center justify-center">
                <Image
                  src={hero.certification?.image ?? '/content/cfesa-logo.png'}
                  alt={hero.certification?.alt ?? 'Certified & Licensed'}
                  width={180}
                  height={180}
                  className="object-contain"
                />
              </div>
              <div>
                <p className="text-sm text-gray-300">Certified & Licensed</p>
                <p className="font-semibold">Professional Restaurant Equipment Experts</p>
              </div>
            </div>
          </div>

          {/* Right Image / Video Section */}
          <div className="lg:w-1/2 lg:max-w-xl">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <HeroMedia
                videos={hero.heroVideos ?? []}
                image={hero.backgroundImage}
                imageAlt={hero.backgroundImageAlt}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <p className="text-white font-semibold text-lg">Professional Service • 24/7 Support</p>
                  <p className="text-gray-200 text-sm mt-1">Licensed technicians ready to help</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Brand Carousel */}
        <div className="mt-12">
          <div className="mb-4">
            <p className="text-sm text-gray-300 mb-1">Trusted by Leading Brands</p>
            <p className="font-semibold">We Service All Major Equipment Manufacturers</p>
          </div>
          <BrandCarousel />
        </div>
      </div>
    </section>
  );
}