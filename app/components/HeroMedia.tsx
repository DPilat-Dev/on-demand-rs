'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

interface Props {
  videos: string[];
  image: string;
  imageAlt: string;
  overlayTitle: string;
  overlaySubtitle: string;
}

export function HeroMedia({ videos, image, imageAlt, overlayTitle, overlaySubtitle }: Props) {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [muted, setMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videos.length > 0) {
      setSelectedVideo(videos[Math.floor(Math.random() * videos.length)]);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function toggleMute() {
    setMuted((prev) => {
      if (videoRef.current) videoRef.current.muted = !prev;
      return !prev;
    });
  }

  return (
    <>
      {selectedVideo ? (
        <video
          ref={videoRef}
          src={selectedVideo}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-auto object-cover"
        />
      ) : (
        <Image
          src={image}
          alt={imageAlt}
          width={600}
          height={400}
          className="w-full h-auto object-cover"
          priority
        />
      )}

      {/* Gradient overlay — always visible */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

      {/* Text overlay — hidden when video is playing */}
      {!selectedVideo && (
        <div className="absolute bottom-6 left-6 right-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
            <p className="text-white font-semibold text-lg">{overlayTitle}</p>
            <p className="text-gray-200 text-sm mt-1">{overlaySubtitle}</p>
          </div>
        </div>
      )}

      {/* Mute toggle — only visible when video is playing */}
      {selectedVideo && (
        <button
          type="button"
          onClick={toggleMute}
          className="absolute bottom-4 right-4 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors backdrop-blur-sm"
          aria-label={muted ? 'Unmute video' : 'Mute video'}
        >
          {muted ? (
            // Muted icon
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M13 3.586L7.707 8.879A1 1 0 017 9H4a1 1 0 00-1 1v4a1 1 0 001 1h3a1 1 0 01.707.293L13 20.414V3.586zM11 6.414v11.172l-3.293-3.293A3 3 0 005.586 13H5v-2h.586A3 3 0 007.707 9.707L11 6.414zM17.293 9.293a1 1 0 011.414 1.414L17.414 12l1.293 1.293a1 1 0 01-1.414 1.414L16 13.414l-1.293 1.293a1 1 0 01-1.414-1.414L14.586 12l-1.293-1.293a1 1 0 011.414-1.414L16 10.586l1.293-1.293z"/>
            </svg>
          ) : (
            // Unmuted icon
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M13 3.586L7.707 8.879A1 1 0 017 9H4a1 1 0 00-1 1v4a1 1 0 001 1h3a1 1 0 01.707.293L13 20.414V3.586zM11 6.414v11.172l-3.293-3.293A3 3 0 005.586 13H5v-2h.586A3 3 0 007.707 9.707L11 6.414zM16.293 8.293a1 1 0 011.414 0A7.002 7.002 0 0120 12a7.002 7.002 0 01-2.293 3.707 1 1 0 01-1.414-1.414A5.001 5.001 0 0018 12a5.001 5.001 0 00-1.707-3.293 1 1 0 010-1.414zM14.293 10.293a1 1 0 011.414 0A3 3 0 0117 12a3 3 0 01-.293 1.293 1 1 0 01-1.707-1.04A1 1 0 0015 12a1 1 0 00-.293-.707 1 1 0 010-1.414z"/>
            </svg>
          )}
        </button>
      )}
    </>
  );
}
