'use client';

import React from 'react';
import Image from 'next/image';

interface PageHeaderBannerProps {
  title: string;
  subtitle?: string;
  bgImage?: string;
}

export default function PageHeaderBanner({
  title,
  bgImage = '/hero-bg.jpg',
}: PageHeaderBannerProps) {
  return (
    <div className="relative w-full h-56 sm:h-72 md:h-80 overflow-hidden bg-[#060d1f] flex items-center justify-center text-center">
      {/* Background Image: Full width & height, softly/subtly visible ("halkii se dikhey", cut na ho) */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={bgImage}
          alt={title}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-30 brightness-95"
        />
        {/* Soft atmospheric gradient so image blends gracefully without harsh cuts */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#060d1f]/75 via-transparent to-[#060d1f]" />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Content: ONLY Page Title, bold & clean */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight drop-shadow-xl">
          {title}
        </h1>
      </div>
    </div>
  );
}
