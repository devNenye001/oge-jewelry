const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');

const liquidFiles = [];
function findLiquid(dir) {
  for (const f of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, f.name);
    if (f.isDirectory() && !['node_modules', '.git', 'preview', 'scratch'].includes(f.name)) {
      findLiquid(full);
    } else if (f.isFile() && f.name.endsWith('.liquid')) {
      liquidFiles.push(full);
    }
  }
}
findLiquid(rootDir);

const allHrefs = new Set();
const fileHrefs = {};

liquidFiles.forEach(file => {
  const rel = path.relative(rootDir, file);
  const content = fs.readFileSync(file, 'utf-8');

  const matches = [...content.matchAll(/href=["']([^"']+)["']/g)];
  matches.forEach(m => {
    const href = m[1];
    if (!href.startsWith('#') && !href.startsWith('http') && !href.startsWith('javascript') && !href.startsWith('mailto') && !href.startsWith('tel')) {
      allHrefs.add(href);
      if (!fileHrefs[href]) fileHrefs[href] = [];
      fileHrefs[href].push(rel);
    }
  });
});

console.log('All relative/internal hrefs found in Liquid files:');
console.log(fileHrefs);
