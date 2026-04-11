/**
 * Composant logo produit.
 * Affiche le vrai logo si disponible, sinon un placeholder avec initiales.
 */

import LogoImage from './LogoImage';

const PALETTE = [
  { bg: '#1e40af', text: '#dbeafe' },
  { bg: '#7c3aed', text: '#ede9fe' },
  { bg: '#0f766e', text: '#ccfbf1' },
  { bg: '#b91c1c', text: '#fee2e2' },
  { bg: '#c2410c', text: '#ffedd5' },
  { bg: '#4338ca', text: '#e0e7ff' },
  { bg: '#0369a1', text: '#e0f2fe' },
  { bg: '#15803d', text: '#dcfce7' },
  { bg: '#9333ea', text: '#f3e8ff' },
  { bg: '#0891b2', text: '#cffafe' },
] as const;

const SIZES = {
  sm: { container: 32, fontSize: 12, rounded: 'rounded-md' },
  md: { container: 48, fontSize: 16, rounded: 'rounded-lg' },
  lg: { container: 64, fontSize: 22, rounded: 'rounded-xl' },
} as const;

function hashSlug(slug: string): number {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    hash = ((hash << 5) - hash + slug.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}

interface ProductLogoProps {
  name: string;
  slug: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function ProductLogo({ name, slug, size = 'md' }: ProductLogoProps) {
  const colorIndex = hashSlug(slug) % PALETTE.length;
  const color = PALETTE[colorIndex];
  const dim = SIZES[size];
  const initials = name.slice(0, 2).toUpperCase();
  const logoSrc = `/images/logiciels/${slug}.png`;

  return (
    <div
      className={`${dim.rounded} relative inline-flex shrink-0 items-center justify-center overflow-hidden shadow-sm`}
      style={{
        width: dim.container,
        height: dim.container,
        backgroundColor: color.bg,
      }}
      role="img"
      aria-label={`Logo ${name}`}
    >
      <span
        className="font-bold leading-none select-none"
        style={{ fontSize: dim.fontSize, color: color.text }}
      >
        {initials}
      </span>
      <LogoImage src={logoSrc} alt={`Logo ${name}`} size={dim.container} />
    </div>
  );
}
