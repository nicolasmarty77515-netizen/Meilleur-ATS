import Link from '@/components/LocaleLink';
import { PROFILES } from '@/lib/constants';
import type { ProfileSlug } from '@/lib/types';

export default function ProfileSelector() {
  const entries = Object.entries(PROFILES) as [ProfileSlug, (typeof PROFILES)[ProfileSlug]][];

  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-3xl font-bold text-gray-900">
          Quel est votre profil ?
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-lg text-gray-600">
          Chaque métier du recrutement a ses besoins. Trouvez l&apos;ATS adapté au vôtre.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {entries.map(([slug, profile]) => (
            <Link
              key={slug}
              href={`/profils/${slug}`}
              className="group rounded-xl border border-gray-200 bg-white p-6 text-center shadow-sm transition hover:border-blue-300 hover:shadow-md"
            >
              <span className="text-4xl">{profile.icon}</span>
              <h3 className="mt-3 text-base font-semibold text-gray-900 group-hover:text-blue-700">
                {profile.shortName}
              </h3>
              <p className="mt-2 text-sm text-gray-500">{profile.keyNeeds.slice(0, 2).join(', ')}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
