import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type {
  ProductFrontmatter,
  ProfileFrontmatter,
  GuideFrontmatter,
  ComparativeFrontmatter,
  ProfileSlug,
} from './types';
import { isIndexable } from './constants';

const contentDir = path.join(process.cwd(), 'src', 'content');

function readMdxFiles<T>(dir: string): { frontmatter: T; content: string; slug: string }[] {
  const fullPath = path.join(contentDir, dir);
  if (!fs.existsSync(fullPath)) return [];

  return fs
    .readdirSync(fullPath)
    .filter((f) => f.endsWith('.mdx'))
    .map((filename) => {
      const filePath = path.join(fullPath, filename);
      const raw = fs.readFileSync(filePath, 'utf-8');
      const { data, content } = matter(raw);
      return {
        frontmatter: data as T,
        content,
        slug: filename.replace('.mdx', ''),
      };
    });
}

// --- Products ---

export function getAllProducts(): (ProductFrontmatter & { content: string })[] {
  return readMdxFiles<ProductFrontmatter>('logiciels').map(({ frontmatter, content }) => ({
    ...frontmatter,
    content,
  }));
}

export function getProductBySlug(slug: string): (ProductFrontmatter & { content: string }) | null {
  const filePath = path.join(contentDir, 'logiciels', `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);
  return { ...(data as ProductFrontmatter), content };
}

export function getProductSlugs(): string[] {
  const dir = path.join(contentDir, 'logiciels');
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace('.mdx', ''));
}

/**
 * Renvoie uniquement les produits "publiés" (phase courante).
 * À utiliser pour les listings et suggestions.
 * Les fiches individuelles continuent à rendre via getProductBySlug.
 */
export function getVisibleProducts(): (ProductFrontmatter & { content: string })[] {
  return getAllProducts().filter((p) => isIndexable('product', p.slug));
}

export function getProductsForProfile(
  profileKey: string,
  minScore = 3
): (ProductFrontmatter & { content: string })[] {
  return getAllProducts()
    .filter((p) => {
      const score = p.targetProfiles[profileKey as keyof typeof p.targetProfiles];
      return score !== undefined && score >= minScore;
    })
    .sort((a, b) => {
      const scoreA = a.targetProfiles[profileKey as keyof typeof a.targetProfiles] ?? 0;
      const scoreB = b.targetProfiles[profileKey as keyof typeof b.targetProfiles] ?? 0;
      return scoreB - scoreA || b.ratings.overall - a.ratings.overall;
    });
}

// --- Profiles ---

export function getAllProfiles(): (ProfileFrontmatter & { content: string })[] {
  return readMdxFiles<ProfileFrontmatter>('profils').map(({ frontmatter, content }) => ({
    ...frontmatter,
    content,
  }));
}

export function getProfileBySlug(
  slug: ProfileSlug
): (ProfileFrontmatter & { content: string }) | null {
  const filePath = path.join(contentDir, 'profils', `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);
  return { ...(data as ProfileFrontmatter), content };
}

export function getProfileSlugs(): ProfileSlug[] {
  const dir = path.join(contentDir, 'profils');
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace('.mdx', '')) as ProfileSlug[];
}

// --- Guides ---

export function getAllGuides(): (GuideFrontmatter & { content: string })[] {
  return readMdxFiles<GuideFrontmatter>('guides')
    .map(({ frontmatter, content }) => ({ ...frontmatter, content }))
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

/** Renvoie uniquement les guides "publiés" (phase courante). */
export function getVisibleGuides(): (GuideFrontmatter & { content: string })[] {
  return getAllGuides().filter((g) => isIndexable('guide', g.slug));
}

export function getGuideBySlug(slug: string): (GuideFrontmatter & { content: string }) | null {
  const filePath = path.join(contentDir, 'guides', `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);
  return { ...(data as GuideFrontmatter), content };
}

export function getGuideSlugs(): string[] {
  const dir = path.join(contentDir, 'guides');
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace('.mdx', ''));
}

// --- Comparatives ---

export function getAllComparatives(): (ComparativeFrontmatter & { content: string })[] {
  return readMdxFiles<ComparativeFrontmatter>('comparatifs').map(({ frontmatter, content }) => ({
    ...frontmatter,
    content,
  }));
}

/** Renvoie uniquement les comparatifs "publiés" (phase courante). */
export function getVisibleComparatives(): (ComparativeFrontmatter & { content: string })[] {
  return getAllComparatives().filter((c) => isIndexable('versus', c.slug));
}

export function getComparativeBySlug(
  slug: string
): (ComparativeFrontmatter & { content: string }) | null {
  const filePath = path.join(contentDir, 'comparatifs', `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);
  return { ...(data as ComparativeFrontmatter), content };
}

export function getComparativeSlugs(): string[] {
  const dir = path.join(contentDir, 'comparatifs');
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace('.mdx', ''));
}
