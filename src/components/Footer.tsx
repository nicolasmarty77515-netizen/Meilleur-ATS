import Link from '@/components/LocaleLink';
import { SITE_NAME, PROFILES } from '@/lib/constants';
import type { ProfileSlug } from '@/lib/types';
import type { Locale } from '@/lib/i18n';

interface FooterProps {
  locale?: Locale;
}

const labels = {
  fr: {
    description: 'Comparatif indépendant des meilleurs logiciels de recrutement en France.',
    navigation: 'Navigation',
    allAts: 'Tous les ATS',
    comparator: 'Comparateur',
    guides: 'Guides',
    glossary: 'Glossaire',
    stats: 'Études & Stats',
    changelog: 'Actualités ATS',
    resources: 'Ressources',
    questionnaire: 'Questionnaire',
    accompagnement: 'Accompagnement',
    about: 'À propos',
    editors: 'Éditeurs',
    contact: 'Contact',
    rss: 'Flux RSS',
    byProfile: 'Par profil',
    byProfileCont: 'Par profil (suite)',
    allRights: 'Tous droits réservés.',
    footerLabel: 'Pied de page',
    navLabel: 'Navigation du pied de page',
    profileLabel: 'Par profil de recruteur',
    profileLabel2: 'Par profil de recruteur (suite)',
  },
  en: {
    description: 'Independent comparison of the best recruitment software in France.',
    navigation: 'Navigation',
    allAts: 'All ATS',
    comparator: 'Comparator',
    guides: 'Guides',
    glossary: 'Glossary',
    stats: 'Studies & Stats',
    changelog: 'ATS News',
    resources: 'Resources',
    questionnaire: 'Quiz',
    accompagnement: 'Support',
    about: 'About',
    editors: 'Vendors',
    contact: 'Contact',
    rss: 'RSS Feed',
    byProfile: 'By Profile',
    byProfileCont: 'By Profile (cont.)',
    allRights: 'All rights reserved.',
    footerLabel: 'Footer',
    navLabel: 'Footer navigation',
    profileLabel: 'By recruiter profile',
    profileLabel2: 'By recruiter profile (continued)',
  },
} as const;

export default function Footer({ locale = 'fr' }: FooterProps) {
  const t = labels[locale];
  const profileEntries = Object.entries(PROFILES) as [ProfileSlug, (typeof PROFILES)[ProfileSlug]][];

  return (
    <footer className="border-t border-gray-200 bg-gray-50" aria-label={t.footerLabel}>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-5">
          <div>
            <h3 className="text-lg font-bold text-gray-900">{SITE_NAME}</h3>
            <p className="mt-2 text-sm text-gray-600">{t.description}</p>
          </div>

          <nav aria-label={t.navLabel}>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
              {t.navigation}
            </h4>
            <ul className="mt-3 space-y-2 text-sm" role="list">
              <li><Link href="/logiciels" className="text-gray-600 hover:text-blue-700">{t.allAts}</Link></li>
              <li><Link href="/comparer" className="text-gray-600 hover:text-blue-700">{t.comparator}</Link></li>
              <li><Link href="/guides" className="text-gray-600 hover:text-blue-700">{t.guides}</Link></li>
              <li><Link href="/glossaire" className="text-gray-600 hover:text-blue-700">{t.glossary}</Link></li>
              <li><Link href="/etudes" className="text-gray-600 hover:text-blue-700">{t.stats}</Link></li>
              <li><Link href="/changelog" className="text-gray-600 hover:text-blue-700">{t.changelog}</Link></li>
            </ul>
          </nav>

          <nav aria-label={t.resources}>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
              {t.resources}
            </h4>
            <ul className="mt-3 space-y-2 text-sm" role="list">
              <li><Link href="/questionnaire" className="text-gray-600 hover:text-blue-700">{t.questionnaire}</Link></li>
              <li><Link href="/accompagnement" className="text-gray-600 hover:text-blue-700">{t.accompagnement}</Link></li>
              <li><Link href="/a-propos" className="text-gray-600 hover:text-blue-700">{t.about}</Link></li>
              <li><Link href="/editeurs" className="text-gray-600 hover:text-blue-700">{t.editors}</Link></li>
              <li><Link href="/contact" className="text-gray-600 hover:text-blue-700">{t.contact}</Link></li>
              <li><Link href="/feed.xml" className="text-gray-600 hover:text-blue-700">{t.rss}</Link></li>
            </ul>
          </nav>

          <nav aria-label={t.profileLabel}>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
              {t.byProfile}
            </h4>
            <ul className="mt-3 space-y-2 text-sm" role="list">
              {profileEntries.slice(0, 4).map(([slug, profile]) => (
                <li key={slug}>
                  <Link href={`/profils/${slug}`} className="text-gray-600 hover:text-blue-700">
                    {profile.shortName}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label={t.profileLabel2}>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
              <span className="sr-only">{t.byProfileCont}</span>
              <span aria-hidden="true">&nbsp;</span>
            </h4>
            <ul className="mt-3 space-y-2 text-sm" role="list">
              {profileEntries.slice(4).map(([slug, profile]) => (
                <li key={slug}>
                  <Link href={`/profils/${slug}`} className="text-gray-600 hover:text-blue-700">
                    {profile.shortName}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-10 border-t border-gray-200 pt-6 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} {SITE_NAME}. {t.allRights}
        </div>
      </div>
    </footer>
  );
}
