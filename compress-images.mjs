import sharp from 'sharp';
import { readdirSync, statSync, unlinkSync } from 'fs';
import { join, extname, basename } from 'path';

const publicDir = './public';
const files = readdirSync(publicDir).filter(f => extname(f) === '.png');

for (const file of files) {
  const inputPath = join(publicDir, file);
  const stat = statSync(inputPath);
  if (stat.size === 0) continue;

  const outputName = basename(file, '.png') + '.webp';
  const outputPath = join(publicDir, outputName);

  await sharp(inputPath)
    .webp({ quality: 82 })
    .toFile(outputPath);

  const newStat = statSync(outputPath);
  const savings = (((stat.size - newStat.size) / stat.size) * 100).toFixed(0);
  console.log(`${file}: ${(stat.size/1024/1024).toFixed(1)}MB → ${(newStat.size/1024).toFixed(0)}KB (-${savings}%)`);
}

console.log('\nPronto! Atualize as referências no App.tsx para .webp');
