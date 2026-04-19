'use client';

import { useState, useMemo } from 'react';
import Link from '@/components/LocaleLink';
import type { ProductFrontmatter } from '@/lib/types';
import RatingStars from './RatingStars';
import ProductLogo from './ProductLogo';
import CountryFlag from './CountryFlag';
import { CheckIcon } from './Icons';

/* ---------- Types ---------- */

type ProfileKey =
  | 'independant'
  | 'sourceur'
  | 'chasseur'
  | 'cabinet'
  | 'interim'
  | 'collectif'
  | 'rhInterne'
  | 'consultant';

interface Answers {
  profile: ProfileKey | null;
  teamSize: string | null;
  budget: string | null;
  features: Set<string>;
  hosting: string | null;
  rgpd: boolean;
}

const INITIAL_ANSWERS: Answers = {
  profile: null,
  teamSize: null,
  budget: null,
  features: new Set(),
  hosting: null,
  rgpd: false,
};

/* ---------- Constants ---------- */

const PROFILES: { key: ProfileKey; label: string; icon: string; desc: string }[] = [
  { key: 'independant', label: 'Recruteur indépendant', icon: '🧑‍💼', desc: 'Freelance, solo' },
  { key: 'sourceur', label: 'Sourceur', icon: '🔍', desc: 'Identification de talents' },
  { key: 'chasseur', label: 'Chasseur de têtes', icon: '🎯', desc: 'Cadres et dirigeants' },
  { key: 'cabinet', label: 'Cabinet de recrutement', icon: '🏢', desc: 'Équipe de consultants' },
  { key: 'interim', label: 'Agence intérim', icon: '⏱️', desc: 'Travail temporaire' },
  { key: 'collectif', label: 'Collectif de recruteurs', icon: '👥', desc: 'Travail collaboratif' },
  { key: 'rhInterne', label: 'RH interne', icon: '🏠', desc: 'PME, ETI, grand groupe' },
  { key: 'consultant', label: 'Consultant recrutement', icon: '💼', desc: 'Multi-clients' },
];

const TEAM_SIZES = [
  { value: 'solo', label: 'Solo', desc: '1 utilisateur' },
  { value: '2-5', label: 'Petite équipe', desc: '2 à 5 utilisateurs' },
  { value: '6-20', label: 'Équipe moyenne', desc: '6 à 20 utilisateurs' },
  { value: '20+', label: 'Grande équipe', desc: 'Plus de 20 utilisateurs' },
];

const BUDGETS = [
  { value: 'free', label: 'Gratuit', desc: 'Solution gratuite uniquement' },
  { value: '<50', label: 'Moins de 50 EUR/mois', desc: 'Budget serré' },
  { value: '50-150', label: '50 - 150 EUR/mois', desc: 'Budget moyen' },
  { value: '150-500', label: '150 - 500 EUR/mois', desc: 'Budget confortable' },
  { value: '500+', label: 'Plus de 500 EUR/mois', desc: 'Budget enterprise' },
  { value: 'no-limit', label: 'Pas de contrainte', desc: 'Le prix n\'est pas un critère' },
];

const FEATURE_OPTIONS = [
  { key: 'crm', label: 'CRM intégré', desc: 'Gestion de la relation clients' },
  { key: 'sirh', label: 'SIRH intégré', desc: 'Gestion RH complète (congés, paie...)' },
  { key: 'multiposting', label: 'Multiposting', desc: 'Diffusion sur plusieurs jobboards' },
  { key: 'aiMatching', label: 'IA / Matching', desc: 'Intelligence artificielle pour le tri' },
  { key: 'cvParsing', label: 'Parsing CV', desc: 'Extraction automatique des CV' },
  { key: 'careerPage', label: 'Page carrière', desc: 'Site carrière personnalisable' },
  { key: 'videoInterview', label: 'Entretien vidéo', desc: 'Visioconférence intégrée' },
  { key: 'mobileApp', label: 'Application mobile', desc: 'Accès iOS / Android' },
  { key: 'collaborativeHiring', label: 'Recrutement collaboratif', desc: 'Avis d\'équipe, scorecards' },
  { key: 'reporting', label: 'Reporting', desc: 'Tableaux de bord et analytics' },
  { key: 'api', label: 'API disponible', desc: 'Intégrations sur-mesure' },
];

const HOSTING_OPTIONS = [
  { value: 'france', label: 'France obligatoire', desc: 'Données hébergées en France' },
  { value: 'eu', label: 'Union Européenne', desc: 'France ou UE acceptable' },
  { value: 'any', label: 'Pas de contrainte', desc: 'Peu importe la localisation' },
];

const TOTAL_STEPS = 6;

/* ---------- Scoring ---------- */

function scoreProduct(product: ProductFrontmatter, answers: Answers): number {
  let score = 0;

  // 1. Profile match (0–50 pts)
  if (answers.profile) {
    const profileScore = product.targetProfiles[answers.profile] ?? 1;
    score += profileScore * 10; // 10–50
  }

  // 2. Feature match (0–55 pts, 5 per feature)
  for (const feat of answers.features) {
    const val = product.features[feat as keyof typeof product.features];
    if (val === true) score += 5;
  }

  // 3. Budget fit (0–20 pts)
  const price = product.pricing.startingPrice;
  if (answers.budget) {
    const fits = budgetFits(price, answers.budget);
    if (fits === 'perfect') score += 20;
    else if (fits === 'close') score += 10;
    else if (fits === 'over') score -= 10;
  }

  // 4. Hosting (0–15 pts)
  if (answers.hosting === 'france') {
    if (product.dataHosting === 'France') score += 15;
    else if (product.dataHosting === 'Union Europeenne') score += 5;
  } else if (answers.hosting === 'eu') {
    if (product.dataHosting === 'France' || product.dataHosting === 'Union Europeenne') score += 15;
    else score += 5;
  } else {
    score += 10; // no constraint = neutral bonus
  }

  // 5. RGPD (0–10 pts)
  if (answers.rgpd && product.rgpdCompliant) score += 10;

  // 6. Overall rating bonus (0–10 pts)
  score += product.ratings.overall * 2;

  return score;
}

function budgetFits(
  price: number | null,
  budget: string
): 'perfect' | 'close' | 'over' | 'any' {
  if (budget === 'no-limit') return 'perfect';
  if (price === null) return 'close'; // sur devis = unknown

  switch (budget) {
    case 'free':
      return price === 0 ? 'perfect' : 'over';
    case '<50':
      return price <= 50 ? 'perfect' : price <= 80 ? 'close' : 'over';
    case '50-150':
      return price >= 50 && price <= 150 ? 'perfect' : price <= 200 ? 'close' : 'over';
    case '150-500':
      return price >= 100 && price <= 500 ? 'perfect' : price <= 600 ? 'close' : 'over';
    case '500+':
      return price >= 300 ? 'perfect' : 'close';
    default:
      return 'any';
  }
}

function getMatchReasons(product: ProductFrontmatter, answers: Answers): string[] {
  const reasons: string[] = [];

  if (answers.profile) {
    const profileScore = product.targetProfiles[answers.profile] ?? 1;
    if (profileScore >= 4) reasons.push('Très adapté à votre profil');
    else if (profileScore >= 3) reasons.push('Compatible avec votre profil');
  }

  const matchedFeatures: string[] = [];
  for (const feat of answers.features) {
    const val = product.features[feat as keyof typeof product.features];
    if (val === true) {
      const opt = FEATURE_OPTIONS.find((o) => o.key === feat);
      if (opt) matchedFeatures.push(opt.label);
    }
  }
  if (matchedFeatures.length > 0) {
    reasons.push(`Inclut : ${matchedFeatures.join(', ')}`);
  }

  if (answers.hosting === 'france' && product.dataHosting === 'France') {
    reasons.push('Hébergé en France');
  }

  if (answers.rgpd && product.rgpdCompliant) {
    reasons.push('Conforme RGPD');
  }

  if (product.ratings.overall >= 4.3) {
    reasons.push(`Note excellente : ${product.ratings.overall}/5`);
  }

  return reasons;
}

/* ---------- Component ---------- */

interface QuestionnaireProps {
  products: ProductFrontmatter[];
}

export default function Questionnaire({ products }: QuestionnaireProps) {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<Answers>(INITIAL_ANSWERS);

  const results = useMemo(() => {
    if (step < TOTAL_STEPS) return [];
    return products
      .map((p) => ({
        product: p,
        score: scoreProduct(p, answers),
        reasons: getMatchReasons(p, answers),
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);
  }, [step, answers, products]);

  const canProceed = (): boolean => {
    switch (step) {
      case 1:
        return answers.profile !== null;
      case 2:
        return answers.teamSize !== null;
      case 3:
        return answers.budget !== null;
      case 4:
        return true; // features are optional
      case 5:
        return answers.hosting !== null;
      default:
        return true;
    }
  };

  const next = () => {
    if (canProceed() && step < TOTAL_STEPS) setStep(step + 1);
  };
  const prev = () => {
    if (step > 1) setStep(step - 1);
  };
  const restart = () => {
    setStep(1);
    setAnswers(INITIAL_ANSWERS);
  };

  const progressPercent = step < TOTAL_STEPS ? ((step - 1) / (TOTAL_STEPS - 1)) * 100 : 100;

  return (
    <div className="mx-auto max-w-3xl px-4">
      {/* Progress bar */}
      {step < TOTAL_STEPS && (
        <div className="mb-8">
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>
              Étape {step} / {TOTAL_STEPS - 1}
            </span>
            <span>{Math.round(progressPercent)}%</span>
          </div>
          <div className="mt-2 h-2 rounded-full bg-gray-200">
            <div
              className="h-2 rounded-full bg-blue-600 transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      )}

      {/* Step 1: Profile */}
      {step === 1 && (
        <fieldset>
          <legend className="text-2xl font-bold text-gray-900">Quel est votre profil ?</legend>
          <p className="mt-2 text-gray-600">
            Sélectionnez le profil qui correspond le mieux à votre activité.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2" role="radiogroup" aria-label="Profil de recruteur">
            {PROFILES.map(({ key, label, icon, desc }) => (
              <button
                key={key}
                onClick={() => setAnswers({ ...answers, profile: key })}
                role="radio"
                aria-checked={answers.profile === key}
                aria-label={`${label} — ${desc}`}
                className={`flex items-start gap-3 rounded-xl border-2 p-4 text-left transition ${
                  answers.profile === key
                    ? 'border-blue-600 bg-blue-50 ring-1 ring-blue-200'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <span className="mt-0.5 text-2xl" aria-hidden="true">{icon}</span>
                <div>
                  <p className="font-semibold text-gray-900">{label}</p>
                  <p className="text-sm text-gray-500">{desc}</p>
                </div>
                {answers.profile === key && (
                  <span className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white" aria-hidden="true">
                    <CheckIcon className="h-4 w-4" />
                  </span>
                )}
              </button>
            ))}
          </div>
        </fieldset>
      )}

      {/* Step 2: Team size */}
      {step === 2 && (
        <fieldset>
          <legend className="text-2xl font-bold text-gray-900">Quelle est la taille de votre équipe ?</legend>
          <p className="mt-2 text-gray-600">
            Combien de personnes utiliseront l&apos;outil au quotidien ?
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2" role="radiogroup" aria-label="Taille d'équipe">
            {TEAM_SIZES.map(({ value, label, desc }) => (
              <button
                key={value}
                onClick={() => setAnswers({ ...answers, teamSize: value })}
                role="radio"
                aria-checked={answers.teamSize === value}
                aria-label={`${label} — ${desc}`}
                className={`rounded-xl border-2 p-4 text-left transition ${
                  answers.teamSize === value
                    ? 'border-blue-600 bg-blue-50 ring-1 ring-blue-200'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <p className="font-semibold text-gray-900">{label}</p>
                <p className="text-sm text-gray-500">{desc}</p>
              </button>
            ))}
          </div>
        </fieldset>
      )}

      {/* Step 3: Budget */}
      {step === 3 && (
        <fieldset>
          <legend className="text-2xl font-bold text-gray-900">Quel est votre budget mensuel ?</legend>
          <p className="mt-2 text-gray-600">
            Indiquez votre fourchette de budget pour un logiciel de recrutement.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2" role="radiogroup" aria-label="Budget mensuel">
            {BUDGETS.map(({ value, label, desc }) => (
              <button
                key={value}
                onClick={() => setAnswers({ ...answers, budget: value })}
                role="radio"
                aria-checked={answers.budget === value}
                aria-label={`${label} — ${desc}`}
                className={`rounded-xl border-2 p-4 text-left transition ${
                  answers.budget === value
                    ? 'border-blue-600 bg-blue-50 ring-1 ring-blue-200'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <p className="font-semibold text-gray-900">{label}</p>
                <p className="text-sm text-gray-500">{desc}</p>
              </button>
            ))}
          </div>
        </fieldset>
      )}

      {/* Step 4: Features */}
      {step === 4 && (
        <fieldset>
          <legend className="text-2xl font-bold text-gray-900">
            Quelles fonctionnalités sont importantes ?
          </legend>
          <p className="mt-2 text-gray-600">
            Sélectionnez les fonctionnalités dont vous avez besoin.{' '}
            <span className="text-gray-400">(Facultatif — plusieurs choix possibles)</span>
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2" role="group" aria-label="Fonctionnalités souhaitées">
            {FEATURE_OPTIONS.map(({ key, label, desc }) => {
              const selected = answers.features.has(key);
              return (
                <button
                  key={key}
                  onClick={() => {
                    const next = new Set(answers.features);
                    if (selected) next.delete(key);
                    else next.add(key);
                    setAnswers({ ...answers, features: next });
                  }}
                  role="checkbox"
                  aria-checked={selected}
                  aria-label={`${label} — ${desc}`}
                  className={`flex items-start gap-3 rounded-xl border-2 p-4 text-left transition ${
                    selected
                      ? 'border-blue-600 bg-blue-50 ring-1 ring-blue-200'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <span
                    className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 ${
                      selected
                        ? 'border-blue-600 bg-blue-600 text-white'
                        : 'border-gray-300 bg-white'
                    }`}
                    aria-hidden="true"
                  >
                    {selected && <CheckIcon className="h-3.5 w-3.5" />}
                  </span>
                  <div>
                    <p className="font-semibold text-gray-900">{label}</p>
                    <p className="text-sm text-gray-500">{desc}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </fieldset>
      )}

      {/* Step 5: Hosting & RGPD */}
      {step === 5 && (
        <fieldset>
          <legend className="text-2xl font-bold text-gray-900">Contraintes techniques</legend>
          <p className="mt-2 text-gray-600">
            Avez-vous des exigences sur l&apos;hébergement ou la conformité ?
          </p>

          <h3 className="mt-6 text-lg font-semibold text-gray-800">
            Hébergement des données
          </h3>
          <div className="mt-3 grid gap-3 sm:grid-cols-3" role="radiogroup" aria-label="Hébergement des données">
            {HOSTING_OPTIONS.map(({ value, label, desc }) => (
              <button
                key={value}
                onClick={() => setAnswers({ ...answers, hosting: value })}
                role="radio"
                aria-checked={answers.hosting === value}
                aria-label={`${label} — ${desc}`}
                className={`rounded-xl border-2 p-4 text-left transition ${
                  answers.hosting === value
                    ? 'border-blue-600 bg-blue-50 ring-1 ring-blue-200'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <p className="font-semibold text-gray-900">{label}</p>
                <p className="text-sm text-gray-500">{desc}</p>
              </button>
            ))}
          </div>

          <h3 className="mt-8 text-lg font-semibold text-gray-800">Conformité RGPD</h3>
          <button
            onClick={() => setAnswers({ ...answers, rgpd: !answers.rgpd })}
            className={`mt-3 flex w-full items-center gap-3 rounded-xl border-2 p-4 text-left transition ${
              answers.rgpd
                ? 'border-blue-600 bg-blue-50 ring-1 ring-blue-200'
                : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
          >
            <span
              className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 ${
                answers.rgpd
                  ? 'border-blue-600 bg-blue-600 text-white'
                  : 'border-gray-300 bg-white'
              }`}
            >
              {answers.rgpd && <CheckIcon className="h-3.5 w-3.5" />}
            </span>
            <div>
              <p className="font-semibold text-gray-900">Conformité RGPD obligatoire</p>
              <p className="text-sm text-gray-500">
                Seules les solutions conformes au RGPD seront recommandées
              </p>
            </div>
          </button>
        </fieldset>
      )}

      {/* Step 6: Results */}
      {step === TOTAL_STEPS && (
        <div>
          <div className="text-center">
            <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-3xl">
              ✅
            </span>
            <h2 className="mt-4 text-2xl font-bold text-gray-900">
              Vos recommandations personnalisées
            </h2>
            <p className="mt-2 text-gray-600">
              Voici les {results.length} solutions les plus adaptées à vos besoins, classées par pertinence.
            </p>
          </div>

          <div className="mt-8 space-y-4">
            {results.map(({ product, score, reasons }, index) => {
              const maxScore = results[0]?.score ?? 1;
              const matchPercent = Math.round((score / maxScore) * 100);

              return (
                <div
                  key={product.slug}
                  className={`rounded-xl border-2 p-5 transition ${
                    index === 0
                      ? 'border-blue-300 bg-blue-50 ring-1 ring-blue-200'
                      : 'border-gray-200 bg-white'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    {/* Rank badge */}
                    <span
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-lg font-bold ${
                        index === 0
                          ? 'bg-blue-600 text-white'
                          : index === 1
                            ? 'bg-gray-700 text-white'
                            : 'bg-gray-200 text-gray-600'
                      }`}
                    >
                      {index + 1}
                    </span>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-3">
                        <ProductLogo name={product.name} slug={product.slug} size="sm" />
                        <div>
                          <h3 className="flex items-center gap-1.5 text-lg font-bold text-gray-900">
                            <CountryFlag country={product.headquarter} size="sm" />
                            {product.name}
                          </h3>
                          <RatingStars rating={product.ratings.overall} size="sm" />
                        </div>
                        <span
                          className={`ml-auto rounded-full px-3 py-1 text-sm font-bold ${
                            matchPercent >= 90
                              ? 'bg-green-100 text-green-800'
                              : matchPercent >= 70
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          {matchPercent}% match
                        </span>
                      </div>

                      <p className="mt-2 text-sm text-gray-600">{product.description}</p>

                      {/* Match reasons */}
                      {reasons.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {reasons.map((reason, ri) => (
                            <span
                              key={ri}
                              className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-medium text-green-800"
                            >
                              <CheckIcon className="h-3 w-3" />
                              {reason}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Price + CTA */}
                      <div className="mt-4 flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">
                          {product.pricing.startingPrice
                            ? `À partir de ${product.pricing.startingPrice} ${product.pricing.currency}/mois`
                            : 'Sur devis'}
                        </span>
                        <Link
                          href={`/logiciels/${product.slug}`}
                          className="rounded-lg bg-blue-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-800"
                        >
                          Voir la fiche
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Summary of answers */}
          <div className="mt-8 rounded-xl border border-gray-200 bg-gray-50 p-5">
            <h3 className="font-semibold text-gray-800">Récapitulatif de vos critères</h3>
            <div className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
              <p>
                <span className="text-gray-500">Profil :</span>{' '}
                <span className="font-medium">
                  {PROFILES.find((p) => p.key === answers.profile)?.label ?? '-'}
                </span>
              </p>
              <p>
                <span className="text-gray-500">Équipe :</span>{' '}
                <span className="font-medium">
                  {TEAM_SIZES.find((t) => t.value === answers.teamSize)?.label ?? '-'}
                </span>
              </p>
              <p>
                <span className="text-gray-500">Budget :</span>{' '}
                <span className="font-medium">
                  {BUDGETS.find((b) => b.value === answers.budget)?.label ?? '-'}
                </span>
              </p>
              <p>
                <span className="text-gray-500">Hébergement :</span>{' '}
                <span className="font-medium">
                  {HOSTING_OPTIONS.find((h) => h.value === answers.hosting)?.label ?? '-'}
                </span>
              </p>
              {answers.features.size > 0 && (
                <p className="sm:col-span-2">
                  <span className="text-gray-500">Fonctionnalités :</span>{' '}
                  <span className="font-medium">
                    {Array.from(answers.features)
                      .map((f) => FEATURE_OPTIONS.find((o) => o.key === f)?.label)
                      .filter(Boolean)
                      .join(', ')}
                  </span>
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Navigation buttons */}
      <div className="mt-8 flex items-center justify-between">
        {step > 1 && step < TOTAL_STEPS ? (
          <button
            onClick={prev}
            className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
          >
            Précédent
          </button>
        ) : step === TOTAL_STEPS ? (
          <button
            onClick={restart}
            className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
          >
            Recommencer
          </button>
        ) : (
          <span />
        )}

        {step < TOTAL_STEPS && (
          <button
            onClick={next}
            disabled={!canProceed()}
            className={`rounded-lg px-6 py-2.5 text-sm font-semibold text-white transition ${
              canProceed()
                ? 'bg-blue-700 hover:bg-blue-800'
                : 'cursor-not-allowed bg-gray-300'
            }`}
          >
            {step === TOTAL_STEPS - 1 ? 'Voir mes recommandations' : 'Suivant'}
          </button>
        )}

        {step === TOTAL_STEPS && (
          <Link
            href="/logiciels"
            className="rounded-lg bg-blue-700 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-800"
          >
            Voir tous les ATS
          </Link>
        )}
      </div>
    </div>
  );
}
