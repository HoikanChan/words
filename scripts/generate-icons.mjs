import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

async function main() {
  const svg = Buffer.from(`
  <svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
    <rect width="512" height="512" rx="96" fill="#FFF9E6"/>
    <rect x="64" y="64" width="384" height="384" rx="76" fill="#000000"/>
    <circle cx="190" cy="205" r="42" fill="#FFF9E6"/>
    <circle cx="322" cy="205" r="42" fill="#FFF9E6"/>
    <rect x="156" y="284" width="200" height="84" rx="40" fill="#2B6C00"/>
    <circle cx="214" cy="250" r="16" fill="#FFF9E6"/>
    <circle cx="298" cy="250" r="16" fill="#FFF9E6"/>
  </svg>`);

  const outDir = path.join(process.cwd(), 'public', 'icons');
  fs.mkdirSync(outDir, { recursive: true });
  await sharp(svg).resize(192, 192).png().toFile(path.join(outDir, 'icon-192.png'));
  await sharp(svg).resize(512, 512).png().toFile(path.join(outDir, 'icon-512.png'));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
