'use client';

/* eslint-disable @next/next/no-img-element */

interface LogoImageProps {
  src: string;
  alt: string;
  size: number;
}

export default function LogoImage({ src, alt, size }: LogoImageProps) {
  return (
    <img
      src={src}
      alt={alt}
      width={size}
      height={size}
      className="absolute inset-0 h-full w-full bg-white object-contain p-1"
      loading="lazy"
      onError={(e) => {
        (e.target as HTMLImageElement).style.display = 'none';
      }}
    />
  );
}
