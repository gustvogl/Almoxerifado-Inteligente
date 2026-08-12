import { cp, mkdir, rm } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const rootPath = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const assetGroups = [
  ['frontend/css', 'public/css'],
  ['frontend/js', 'public/js'],
];

await mkdir(path.join(rootPath, 'public'), { recursive: true });

for (const [source, destination] of assetGroups) {
  const sourcePath = path.join(rootPath, source);
  const destinationPath = path.join(rootPath, destination);
  await rm(destinationPath, { recursive: true, force: true });
  await cp(sourcePath, destinationPath, { recursive: true });
}

console.log('Assets publicos sincronizados em public/ para a Vercel.');
