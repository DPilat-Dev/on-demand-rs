'use client';

import React from 'react';
import Image from 'next/image';

interface BrandLogo {
  src: string;
  alt: string;
  category: string;
}

export const BrandCarousel: React.FC = () => {
  // All brand logos organized by category
  const brandLogos: BrandLogo[] = [
    // Commercial HVAC
    { src: '/content/Commercial-Hvac-logos/Captive-Aire.webp', alt: 'Captive Aire', category: 'HVAC' },
    { src: '/content/Commercial-Hvac-logos/Carrier-1.webp', alt: 'Carrier', category: 'HVAC' },
    { src: '/content/Commercial-Hvac-logos/Daikin.jpg', alt: 'Daikin', category: 'HVAC' },
    { src: '/content/Commercial-Hvac-logos/Fujistu.webp', alt: 'Fujitsu', category: 'HVAC' },
    { src: '/content/Commercial-Hvac-logos/Greenheck-1.webp', alt: 'Greenheck', category: 'HVAC' },
    { src: '/content/Commercial-Hvac-logos/Lennox-1.webp', alt: 'Lennox', category: 'HVAC' },
    { src: '/content/Commercial-Hvac-logos/Rheem-1.webp', alt: 'Rheem', category: 'HVAC' },
    { src: '/content/Commercial-Hvac-logos/Trane-1.webp', alt: 'Trane', category: 'HVAC' },
    { src: '/content/Commercial-Hvac-logos/York-1.webp', alt: 'York', category: 'HVAC' },
    
    // Commercial Refrigeration
    { src: '/content/Commercial-Refigeration-logos/atosa.webp', alt: 'Atosa', category: 'Refrigeration' },
    { src: '/content/Commercial-Refigeration-logos/Delfield-1.webp', alt: 'Delfield', category: 'Refrigeration' },
    { src: '/content/Commercial-Refigeration-logos/electro-freeze-1.webp', alt: 'Electro Freeze', category: 'Refrigeration' },
    { src: '/content/Commercial-Refigeration-logos/Norlake.webp', alt: 'Norlake', category: 'Refrigeration' },
    { src: '/content/Commercial-Refigeration-logos/Randall-1.gif', alt: 'Randall', category: 'Refrigeration' },
    { src: '/content/Commercial-Refigeration-logos/traulsen.webp', alt: 'Traulsen', category: 'Refrigeration' },
    { src: '/content/Commercial-Refigeration-logos/true-1.webp', alt: 'True Manufacturing', category: 'Refrigeration' },
    { src: '/content/Commercial-Refigeration-logos/Wasserstrom-1.webp', alt: 'Wasserstrom', category: 'Refrigeration' },
    
    // Food Service Equipment
    { src: '/content/Food-Service-Equipment-logos/Bunn.webp', alt: 'Bunn', category: 'Food Service' },
    { src: '/content/Food-Service-Equipment-logos/Cleveland-1.webp', alt: 'Cleveland', category: 'Food Service' },
    { src: '/content/Food-Service-Equipment-logos/frymaster-2.webp', alt: 'Frymaster', category: 'Food Service' },
    { src: '/content/Food-Service-Equipment-logos/hatco-1.webp', alt: 'Hatco', category: 'Food Service' },
    { src: '/content/Food-Service-Equipment-logos/jackson-warewashing-1.webp', alt: 'Jackson Warewashing', category: 'Food Service' },
    { src: '/content/Food-Service-Equipment-logos/princastle.webp', alt: 'Princastle', category: 'Food Service' },
    
    // Ice Machines
    { src: '/content/Ice-Machine-logos/Hoshizaki-1.webp', alt: 'Hoshizaki', category: 'Ice Machines' },
    { src: '/content/Ice-Machine-logos/ice-o-matic.webp', alt: 'Ice-O-Matic', category: 'Ice Machines' },
    { src: '/content/Ice-Machine-logos/Scotsman-1.webp', alt: 'Scotsman', category: 'Ice Machines' },
  ];

  return (
    <div className="brands-carousel-container">
      {/* Animated Carousel for all screen sizes */}
      <div className="brands-carousel">
        <div className="brands-track">
          {/* First set of brands */}
          {brandLogos.map((brand, index) => (
            <div key={index} className="brand-item">
              <Image
                src={brand.src}
                alt={brand.alt}
                width={120}
                height={60}
                className="brand-logo"
              />
            </div>
          ))}
          {/* Duplicate set for seamless loop */}
          {brandLogos.map((brand, index) => (
            <div key={`duplicate-${index}`} className="brand-item">
              <Image
                src={brand.src}
                alt={brand.alt}
                width={120}
                height={60}
                className="brand-logo"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
