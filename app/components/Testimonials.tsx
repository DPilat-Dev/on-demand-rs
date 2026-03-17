import { Star } from 'lucide-react';
import DynamicIcon from './DynamicIcon';
import type { HomePageData } from '@/data/homepage';

export default function Testimonials({ testimonials }: { testimonials: HomePageData['testimonials'] }) {

  const getPlatformIcon = (type: string) => {
    switch (type) {
      case 'google': return <DynamicIcon iconName="FaGoogle" size={16} color="#3b82f6" className="inline mr-1" />;
      case 'yelp': return <DynamicIcon iconName="FaYelp" size={16} color="#dc2626" className="inline mr-1" />;
      case 'facebook': return <DynamicIcon iconName="FaFacebook" size={16} color="#3b82f6" className="inline mr-1" />;
      default: return <DynamicIcon iconName="FaStar" size={16} color="#eab308" className="inline mr-1" />;
    }
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {testimonials.title}
          </h2>
          <p className="text-lg text-gray-600">
            {testimonials.subtitle}
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {testimonials.testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:border-blue-300 transition-colors"
            >
              {/* Rating */}
              <div className="flex items-center mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                 <span className="ml-2 text-sm text-gray-500 flex items-center">
                   {getPlatformIcon(testimonial.type)}
                   <span className="ml-1">{testimonial.type.charAt(0).toUpperCase() + testimonial.type.slice(1)}</span>
                 </span>
              </div>

              {/* Title */}
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                {testimonial.title}
              </h4>

              {/* Content */}
              <p className="text-gray-600 mb-4 italic">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="pt-4 border-t border-gray-200">
                <p className="font-semibold text-gray-900">{testimonial.name}</p>
                <p className="text-sm text-gray-500">{testimonial.business}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Google CTA */}
        <div className="text-center">
          <p className="text-lg text-gray-600 mb-4">
            {testimonials.googleCTA.text}
          </p>
           <a
             href={testimonials.googleCTA.link}
             target="_blank"
             rel="noopener noreferrer"
             className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-6 py-3 text-white font-semibold hover:bg-blue-700 transition-colors"
           >
              <DynamicIcon iconName="FaStar" size={20} color="#eab308" className="mr-2" />
             {testimonials.googleCTA.buttonText}
           </a>
        </div>
      </div>
    </section>
  );
}