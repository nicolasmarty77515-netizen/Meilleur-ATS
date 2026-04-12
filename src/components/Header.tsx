import Link from 'next/link';
import { SITE_NAME } from '@/lib/constants';
import GlobalSearch from './GlobalSearch';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-xl font-bold text-blue-700">
          {SITE_NAME}
        </Link>

        <ul className="hidden items-center gap-8 text-sm font-medium text-gray-700 md:flex">
          <li>
            <Link href="/logiciels" className="transition hover:text-blue-700">
              Logiciels ATS
            </Link>
          </li>
          <li>
            <Link href="/profils/rh-interne" className="transition hover:text-blue-700">
              Par profil
            </Link>
          </li>
          <li>
            <Link href="/questionnaire" className="transition hover:text-blue-700">
              Questionnaire
            </Link>
          </li>
          <li>
            <Link href="/guides" className="transition hover:text-blue-700">
              Guides
            </Link>
          </li>
          <li>
            <Link href="/a-propos" className="transition hover:text-blue-700">
              À propos
            </Link>
          </li>
        </ul>

        <div className="flex items-center gap-3">
          <GlobalSearch />
          <Link
            href="/logiciels"
            className="rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-800"
          >
            Comparer
          </Link>
        </div>
      </nav>
    </header>
  );
}
