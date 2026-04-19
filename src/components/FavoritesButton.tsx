'use client';

import { useFavorites } from './FavoritesProvider';

interface FavoritesButtonProps {
  slug: string;
  name: string;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export default function FavoritesButton({
  slug,
  name,
  size = 'md',
  showLabel = false,
}: FavoritesButtonProps) {
  const { toggleFavorite, isFavorite } = useFavorites();
  const saved = isFavorite(slug);

  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
  };

  return (
    <button
      onClick={() => toggleFavorite(slug)}
      className={`inline-flex items-center gap-1.5 rounded-lg transition print:hidden ${
        showLabel
          ? `border px-3 py-1.5 text-sm font-medium ${
              saved
                ? 'border-red-200 bg-red-50 text-red-600 hover:bg-red-100'
                : 'border-gray-300 bg-white text-gray-600 hover:bg-gray-50 hover:border-gray-400'
            }`
          : `p-1.5 ${saved ? 'text-red-500 hover:text-red-600' : 'text-gray-400 hover:text-red-500'}`
      }`}
      aria-label={saved ? `Retirer ${name} des favoris` : `Ajouter ${name} aux favoris`}
      aria-pressed={saved}
    >
      <svg
        className={sizeClasses[size]}
        viewBox="0 0 24 24"
        fill={saved ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth={saved ? 0 : 2}
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
        />
      </svg>
      {showLabel && (
        <span>{saved ? 'Sauvegardé' : 'Sauvegarder'}</span>
      )}
    </button>
  );
}
