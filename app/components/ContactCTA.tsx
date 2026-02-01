import { homePageData } from '@/data/homepage';
import { Phone, Mail, MapPin } from 'lucide-react';
import { FaClock } from 'react-icons/fa';

export default function ContactCTA() {
  const { contact, emergencyCTA } = homePageData;

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {contact.title}
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              {contact.subtitle}
            </p>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <Phone className="h-6 w-6 text-blue-600 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900">Phone</h4>
                  <a href={`tel:${contact.contactInfo.phone}`} className="text-gray-600 hover:text-blue-600">
                    {contact.contactInfo.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Mail className="h-6 w-6 text-blue-600 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900">Email</h4>
                  <a href={`mailto:${contact.contactInfo.email}`} className="text-gray-600 hover:text-blue-600">
                    {contact.contactInfo.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <MapPin className="h-6 w-6 text-blue-600 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900">Address</h4>
                  <p className="text-gray-600 whitespace-pre-line">{contact.contactInfo.address}</p>
                </div>
              </div>

               <div className="flex items-start space-x-4">
                 <FaClock className="h-6 w-6 text-blue-600 mt-1" />
                 <div>
                   <h4 className="font-semibold text-gray-900">Hours</h4>
                   <p className="text-gray-600">{contact.contactInfo.hours}</p>
                 </div>
               </div>
            </div>

            {/* Emergency CTA */}
            <div className="mt-8 p-6 bg-red-50 border border-red-200 rounded-xl">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {emergencyCTA.title}
              </h3>
              <p className="text-gray-600 mb-4">
                {emergencyCTA.description}
              </p>
              <a
                href={`tel:${emergencyCTA.phone}`}
                className="inline-flex items-center justify-center rounded-lg bg-red-600 px-6 py-3 text-white font-semibold hover:bg-red-700 transition-colors"
              >
                <Phone className="h-5 w-5 mr-2" />
                Call Now: {emergencyCTA.phone}
              </a>
              <p className="text-sm text-red-600 mt-2">{emergencyCTA.note}</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-gray-50 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              {contact.form.title}
            </h3>
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {contact.form.fields.name}
                </label>
                <input
                  type="text"
                  className="w-full rounded-lg text-gray-700 border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {contact.form.fields.email}
                  </label>
                  <input
                    type="email"
                    className="w-full rounded-lg text-gray-700 border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {contact.form.fields.phone}
                  </label>
                  <input
                    type="tel"
                    className="w-full rounded-lg text-gray-700 border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {contact.form.fields.serviceType}
                </label>
                <select className="w-full rounded-lg text-gray-700 border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  {contact.form.serviceOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {contact.form.fields.message}
                </label>
                <textarea
                  rows={4}
                  className="w-full rounded-lg text-gray-700 border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-lg bg-blue-600 px-6 py-3 text-white font-semibold hover:bg-blue-700 transition-colors"
              >
                {contact.form.fields.submitButton}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}