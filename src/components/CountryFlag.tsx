/* eslint-disable @next/next/no-img-element */
import { COUNTRY_CODES } from '@/lib/constants';

interface CountryFlagProps {
  country: string;
  size?: 'sm' | 'md' | 'lg';
}

const SIZES = {
  sm: { w: 16, h: 12 },
  md: { w: 20, h: 15 },
  lg: { w: 24, h: 18 },
};

export default function CountryFlag({ country, size = 'md' }: CountryFlagProps) {
  const code = COUNTRY_CODES[country];
  const dim = SIZES[size];

  if (!code) {
    return <span className="text-xs text-gray-400">{country}</span>;
  }

  return (
    <img
      src={`https://flagcdn.com/${dim.w}x${dim.h}/${code}.png`}
      srcSet={`https://flagcdn.com/${dim.w * 2}x${dim.h * 2}/${code}.png 2x`}
      width={dim.w}
      height={dim.h}
      alt={country}
      className="inline-block shrink-0 rounded-sm"
      loading="lazy"
    />
  );
}
