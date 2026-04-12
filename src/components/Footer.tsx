import Link from 'next/link';
import { SITE_NAME, PROFILES } from '@/lib/constants';
import type { ProfileSlug } from '@/lib/types';

export default function Footer() {
  const profileEntries = Object.entries(PROFILES) as [ProfileSlug, (typeof PROFILES)[ProfileSlug]][];

  return (
    <footer className="border-t border-gray-200 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <h3 className="text-lg font-bold text-gray-900">{SITE_NAME}</h3>
            <p className="mt-2 text-sm text-gray-600">
              Comparatif indépendant des meilleurs logiciels de recrutement en France.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
              Navigation
            </h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link href="/logiciels" className="text-gray-600 hover:text-blue-700">
                  Tous les ATS
                </Link>
              </li>
              <li>
                <Link href="/guides" className="text-gray-600 hover:text-blue-700">
                  Guides
                </Link>
              </li>
              <li>
                <Link href="/a-propos" className="text-gray-600 hover:text-blue-700">
                  À propos
                </Link>
              </li>
              <li>
                <Link href="/editeurs" className="text-gray-600 hover:text-blue-700">
                  Éditeurs
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
              Par profil
            </h4>
            <ul className="mt-3 space-y-2 text-sm">
              {profileEntries.slice(0, 4).map(([slug, profile]) => (
                <li key={slug}>
                  <Link href={`/profils/${slug}`} className="text-gray-600 hover:text-blue-700">
                    {profile.shortName}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-gray-500">&nbsp;</h4>
            <ul className="mt-3 space-y-2 text-sm">
              {profileEntries.slice(4).map(([slug, profile]) => (
                <li key={slug}>
                  <Link href={`/profils/${slug}`} className="text-gray-600 hover:text-blue-700">
                    {profile.shortName}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-200 pt-6 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} {SITE_NAME}. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
}
