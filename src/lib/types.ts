export interface PricingPlan {
  name: string;
  price: number | null;
  period: 'month' | 'year' | 'custom';
  description: string;
}

export interface ProductPricing {
  startingPrice: number | null;
  currency: string;
  model: 'per-user-per-month' | 'flat' | 'per-job' | 'custom' | 'free';
  freeTrial: boolean;
  freeTrialDays: number | null;
  commitment: ('monthly' | 'annual' | 'custom')[];
  annualDiscount: string | null;
  plans: PricingPlan[];
}

export interface ProductRatings {
  overall: number;
  easeOfUse: number;
  features: number;
  support: number;
  valueForMoney: number;
  candidateExperience: number;
}

export interface ProductFeatures {
  multiposting: boolean;
  multipostingCount: number | null;
  crm: boolean;
  sirh: boolean;
  aiMatching: boolean;
  cvParsing: boolean;
  careerPage: boolean;
  videoInterview: boolean;
  assessments: boolean;
  reporting: boolean;
  api: boolean;
  mobileApp: boolean;
  collaborativeHiring: boolean;
}

export interface ProductIntegrations {
  linkedin: boolean;
  indeed: boolean;
  apec: boolean;
  poleEmploi: boolean;
  welcomeToTheJungle: boolean;
  helloWork: boolean;
}

export type ProfileSlug =
  | 'recruteur-independant'
  | 'sourceur'
  | 'chasseur-de-tetes'
  | 'cabinet-recrutement'
  | 'interim'
  | 'collectif-recruteurs'
  | 'rh-interne'
  | 'consultant-recrutement';

export interface TargetProfiles {
  independant: number;
  sourceur: number;
  chasseur: number;
  cabinet: number;
  interim: number;
  collectif: number;
  rhInterne: number;
  consultant: number;
}

export interface BrowserExtension {
  available: boolean;
  name: string | null;
  users: number | null;
  url: string | null;
}

export interface ProductBrowserExtensions {
  chrome: BrowserExtension;
  edge: BrowserExtension;
}

export interface ProductFrontmatter {
  name: string;
  slug: string;
  logo: string;
  description: string;
  website: string;
  founded: number | null;
  headquarter: string;
  dataHosting: string;
  rgpdCompliant: boolean;
  pricing: ProductPricing;
  ratings: ProductRatings;
  targetProfiles: TargetProfiles;
  features: ProductFeatures;
  integrations: ProductIntegrations;
  browserExtensions: ProductBrowserExtensions;
  pros: string[];
  cons: string[];
  updatedAt: string;
}

export interface Product extends ProductFrontmatter {
  content: string;
}

export interface ProfileFrontmatter {
  slug: ProfileSlug;
  name: string;
  shortName: string;
  description: string;
  icon: string;
  keyNeeds: string[];
  updatedAt: string;
}

export interface Profile extends ProfileFrontmatter {
  content: string;
}

export interface GuideFrontmatter {
  title: string;
  slug: string;
  description: string;
  category: string;
  publishedAt: string;
  updatedAt: string;
  readingTime: number;
  keywords: string[];
}

export interface Guide extends GuideFrontmatter {
  content: string;
}

export interface ComparativeFrontmatter {
  slug: string;
  productA: string;
  productB: string;
  title: string;
  description: string;
  updatedAt: string;
}

export interface Comparative extends ComparativeFrontmatter {
  content: string;
}
