import sharp from 'sharp';

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="512" height="512">
  <rect width="100" height="100" rx="22" fill="#09090b"/>
  <circle cx="50" cy="50" r="40" fill="none" stroke="#9333ea" stroke-width="1.5" opacity="0.4"/>
  <path d="M50 18 L76 72 H63 L50 46 L37 72 H24 Z" fill="#9333ea"/>
  <rect x="35" y="59" width="30" height="5" rx="2.5" fill="#09090b"/>
  <circle cx="50" cy="18" r="4" fill="#c084fc"/>
</svg>`;

const buf = Buffer.from(svg);

await sharp(buf).resize(512, 512).png().toFile('./public/logo_axion_512.png');
await sharp(buf).resize(192, 192).png().toFile('./public/logo_axion_192.png');
await sharp(buf).resize(32, 32).png().toFile('./public/favicon.png');

console.log('Ícones gerados: logo_axion_512.png, logo_axion_192.png, favicon.png');
