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

const results = [];

liquidFiles.forEach(file => {
  const rel = path.relative(rootDir, file);
  const content = fs.readFileSync(file, 'utf-8');

  const matches = [...content.matchAll(/href=["'](\/(?:cart|search|account|collections\/all)(?:[?"'][^"']*)?)["']/g)];
  if (matches.length > 0) {
    results.push({
      file: rel,
      matches: matches.map(m => m[1])
    });
  }
});

console.log('Files with hardcoded native routes that could use Shopify routes.*:');
console.log(JSON.stringify(results, null, 2));
