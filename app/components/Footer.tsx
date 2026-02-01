import Link from 'next/link';
import Image from 'next/image';
import { footerData } from '@/data/footer';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function Footer() {
  const fullAddress = `${footerData.contact.address.street}, ${footerData.contact.address.city}, ${footerData.contact.address.state} ${footerData.contact.address.zip}`;

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="h-12 w-12 relative">
                <Image
                  src="/content/On-Demand-Logo-cropped.png"
                  alt="OnDemand Restaurant Service Logo"
                  width={48}
                  height={48}
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold">{footerData.company.name}</h3>
                <p className="text-blue-300">{footerData.company.tagline}</p>
              </div>
            </div>
            <p className="text-gray-300 mb-6">{footerData.company.description}</p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-blue-400 mt-0.5" />
                <span className="text-gray-300">{fullAddress}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-blue-400" />
                <a href={`tel:${footerData.contact.phone}`} className="text-gray-300 hover:text-white">
                  {footerData.contact.phone}
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-blue-400" />
                <a href={`mailto:${footerData.contact.email}`} className="text-gray-300 hover:text-white">
                  {footerData.contact.email}
                </a>
              </div>
              <div className="flex items-start space-x-3">
                <Clock className="h-5 w-5 text-blue-400 mt-0.5" />
                <div className="text-gray-300">
                  <p>{footerData.contact.hours.regular}</p>
                  <p className="text-blue-300 font-semibold">{footerData.contact.hours.emergency}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Links Sections */}
          {footerData.sections.map((section: any) => (
            <div key={section.title}>
              <h4 className="text-lg font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link: any) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Certifications */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center space-x-6">
              {footerData.certifications.map((cert: any) => (
                <a
                  key={cert.name}
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition-opacity"
                >
                   <div className="bg-white p-2 rounded-lg">
                     <div className="h-18 w-55 bg-gray-100 rounded flex items-center justify-center">
                       <Image
                         src={cert.image}
                         alt={cert.alt}
                         width={180}
                         height={180}
                         className="object-contain"
                       />
                     </div>
                   </div>
                </a>
              ))}
            </div>

            {/* Social Media */}
            <div className="flex items-center space-x-4">
              {footerData.socialMedia.map((social: any) => (
                <a
                  key={social.platform}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors"
                  aria-label={social.platform}
                >
                  <span className="text-lg">{social.icon}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Legal */}
        <div className="mt-8 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-sm">{footerData.legal.copyright}</p>
            <p className="text-gray-400 text-sm">{footerData.legal.license}</p>
            <div className="flex items-center space-x-4">
              <Link href={footerData.legal.privacyPolicy} className="text-gray-400 hover:text-white text-sm">
                Privacy Policy
              </Link>
              <Link href={footerData.legal.termsOfService} className="text-gray-400 hover:text-white text-sm">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}