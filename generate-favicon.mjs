import sharp from 'sharp';

const svg = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="256" height="256">
  <rect width="100" height="100" rx="22" fill="#09090b"/>
  <path d="M50 18 L76 72 H63 L50 46 L37 72 H24 Z" fill="#9333ea"/>
  <rect x="35" y="59" width="30" height="5" rx="2.5" fill="#09090b"/>
  <circle cx="50" cy="18" r="4" fill="#c084fc"/>
</svg>`);

// Gera PNG em múltiplos tamanhos para o ICO
const size16  = await sharp(svg).resize(16, 16).png().toBuffer();
const size32  = await sharp(svg).resize(32, 32).png().toBuffer();
const size48  = await sharp(svg).resize(48, 48).png().toBuffer();

// Salva o favicon.ico manualmente (formato ICO com header)
function createIco(images) {
  const count = images.length;
  const headerSize = 6 + count * 16;
  let offset = headerSize;

  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(count, 4);

  const entries = [];
  for (const img of images) {
    const entry = Buffer.alloc(16);
    const info = { width: 0, height: 0 }; // 0 = 256 for ICO spec, but we use real sizes
    // We'll let the PNG data speak for itself
    entry.writeUInt8(img.size, 0);
    entry.writeUInt8(img.size, 1);
    entry.writeUInt8(0, 2);
    entry.writeUInt8(0, 3);
    entry.writeUInt16LE(1, 4);
    entry.writeUInt16LE(32, 6);
    entry.writeUInt32LE(img.data.length, 8);
    entry.writeUInt32LE(offset, 12);
    offset += img.data.length;
    entries.push(entry);
  }

  return Buffer.concat([header, ...entries, ...images.map(i => i.data)]);
}

const ico = createIco([
  { size: 16, data: size16 },
  { size: 32, data: size32 },
  { size: 48, data: size48 },
]);

import { writeFileSync } from 'fs';
writeFileSync('./public/favicon.ico', ico);
console.log('favicon.ico gerado com sucesso!');
