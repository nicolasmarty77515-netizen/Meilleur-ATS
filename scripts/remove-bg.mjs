/**
 * Script pour retirer les fonds blancs/clairs des logos PNG.
 * Remplace les pixels proches du blanc par des pixels transparents.
 *
 * Usage : node scripts/remove-bg.mjs
 */

import sharp from 'sharp';
import { readdir } from 'node:fs/promises';
import { join } from 'node:path';

const DIR = join(import.meta.dirname, '..', 'public', 'images', 'logiciels');

// Seuil : tout pixel dont R, G et B sont >= THRESHOLD est considéré blanc
const THRESHOLD = 240;

async function removeWhiteBg(filePath) {
  const image = sharp(filePath);
  const { width, height, channels } = await image.metadata();

  if (!width || !height) return;

  // Forcer RGBA
  const { data, info } = await image
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const pixels = Buffer.from(data);

  let changed = 0;
  for (let i = 0; i < pixels.length; i += 4) {
    const r = pixels[i];
    const g = pixels[i + 1];
    const b = pixels[i + 2];

    if (r >= THRESHOLD && g >= THRESHOLD && b >= THRESHOLD) {
      pixels[i + 3] = 0; // alpha -> transparent
      changed++;
    }
  }

  await sharp(pixels, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .png()
    .toFile(filePath);

  return changed;
}

const files = (await readdir(DIR)).filter((f) => f.endsWith('.png'));
console.log(`Traitement de ${files.length} logos...\n`);

for (const file of files) {
  const path = join(DIR, file);
  try {
    const changed = await removeWhiteBg(path);
    const name = file.replace('.png', '');
    console.log(`  ✓ ${name.padEnd(20)} ${changed} pixels rendus transparents`);
  } catch (err) {
    console.log(`  ✗ ${file}: ${err.message}`);
  }
}

console.log('\nTermine !');
