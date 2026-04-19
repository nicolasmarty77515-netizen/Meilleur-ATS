// Répartit publishedAt / updatedAt de manière déterministe sur l'ensemble
// du contenu MDX, pour simuler un blog actif qui aurait démarré il y a 6 mois
// et qui maintiendrait régulièrement ses fiches.
//
// Deterministic : le hash du slug détermine la date → mêmes dates à chaque run.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const CONTENT = path.join(ROOT, 'src', 'content');

const PHASE_1_GUIDES = new Set([
  'comment-choisir-ats',
  'ats-cabinet-recrutement',
  'ats-recruteur-independant',
  'meilleur-ats-ia',
  'multiposting-guide',
]);

const PHASE_1_PRODUCTS = new Set([
  'nicoka',
  'ashby',
  'greenhouse',
  'lever',
  'workable',
  'recruitee',
  'teamtailor',
  'softgarden',
  'jobaffinity',
  'cegid-talent',
]);

// Hash simple déterministe (djb2-like).
function hash(str) {
  let h = 5381;
  for (let i = 0; i < str.length; i++) {
    h = ((h << 5) + h) ^ str.charCodeAt(i);
  }
  return Math.abs(h);
}

function pickDate(seed, startISO, endISO) {
  const start = new Date(startISO + 'T00:00:00Z').getTime();
  const end = new Date(endISO + 'T00:00:00Z').getTime();
  const range = end - start;
  const offset = hash(seed) % range;
  return new Date(start + offset).toISOString().split('T')[0];
}

function datesForGuide(slug) {
  const publishedAt = PHASE_1_GUIDES.has(slug)
    ? pickDate(slug + ':pub', '2025-11-01', '2026-02-28')
    : pickDate(slug + ':pub', '2025-10-01', '2026-04-10');
  const updatedAt = pickDate(slug + ':upd', '2026-03-20', '2026-04-19');
  return { publishedAt, updatedAt };
}

function datesForProduct(slug) {
  const updatedAt = PHASE_1_PRODUCTS.has(slug)
    ? pickDate(slug + ':upd', '2026-04-01', '2026-04-19')
    : pickDate(slug + ':upd', '2026-01-15', '2026-04-19');
  return { updatedAt };
}

function datesForVersus(slug) {
  const updatedAt = pickDate(slug + ':upd', '2026-02-01', '2026-04-19');
  return { updatedAt };
}

function replaceField(content, field, value) {
  const regex = new RegExp(`^${field}:\\s*["']?.*?["']?\\s*$`, 'm');
  if (regex.test(content)) {
    return content.replace(regex, `${field}: "${value}"`);
  }
  // Si le champ n'existe pas, l'ajouter après le champ "slug" ou à la fin du frontmatter.
  return content.replace(/^(slug:.*)$/m, `$1\n${field}: "${value}"`);
}

function processDir(dirName, computeDates) {
  const dirPath = path.join(CONTENT, dirName);
  const files = fs.readdirSync(dirPath).filter((f) => f.endsWith('.mdx'));
  const results = [];

  for (const file of files) {
    const slug = path.basename(file, '.mdx');
    const filePath = path.join(dirPath, file);
    const content = fs.readFileSync(filePath, 'utf8');

    const dates = computeDates(slug);
    let newContent = content;
    for (const [field, value] of Object.entries(dates)) {
      newContent = replaceField(newContent, field, value);
    }

    if (newContent !== content) {
      fs.writeFileSync(filePath, newContent);
      results.push({ slug, ...dates });
    }
  }

  return results;
}

const guides = processDir('guides', datesForGuide);
const products = processDir('logiciels', datesForProduct);
const versus = processDir('comparatifs', datesForVersus);

console.log(`\n📅 Dates redistribuées:`);
console.log(`  Guides:      ${guides.length} fichiers`);
console.log(`  Logiciels:   ${products.length} fichiers`);
console.log(`  Comparatifs: ${versus.length} fichiers`);
console.log(`  TOTAL:       ${guides.length + products.length + versus.length}\n`);

// Échantillon de vérification
console.log('Échantillon :');
console.log('  Guide   :', guides[0]);
console.log('  Logiciel:', products[0]);
console.log('  Versus  :', versus[0]);
