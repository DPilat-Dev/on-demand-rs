'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface Props {
  videos: string[];
  image: string;
  imageAlt: string;
}

export function HeroMedia({ videos, image, imageAlt }: Props) {
  // Start with null so the server render always outputs the image (no hydration mismatch).
  // After mount the client picks a random video if any are configured.
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  useEffect(() => {
    if (videos.length > 0) {
      setSelectedVideo(videos[Math.floor(Math.random() * videos.length)]);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (selectedVideo) {
    return (
      <video
        src={selectedVideo}
        autoPlay
        muted
        loop
        playsInline
        className="w-full h-auto object-cover"
      />
    );
  }

  return (
    <Image
      src={image}
      alt={imageAlt}
      width={600}
      height={400}
      className="w-full h-auto object-cover"
      priority
    />
  );
}
