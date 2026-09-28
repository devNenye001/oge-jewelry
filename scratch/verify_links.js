const fs = require('fs');
const path = require('path');

const root = 'c:\\Users\\USER\\Desktop\\oge-jewelry-shopify';
['index.html', 'blog-details.html'].forEach(filename => {
  const filePath = path.join(root, filename);
  const content = fs.readFileSync(filePath, 'utf8');
  const hrefMatches = [...content.matchAll(/href="([^"#][^"]*)"/g)].map(m => m[1]);
  const srcMatches = [...content.matchAll(/src="([^"#][^"]*)"/g)].map(m => m[1]);
  const allRefs = [...hrefMatches, ...srcMatches];
  const missing = [];
  allRefs.forEach(ref => {
    const clean = ref.split('?')[0].split('#')[0];
    if (!clean || clean.startsWith('http://') || clean.startsWith('https://') || clean.startsWith('mailto:') || clean.startsWith('tel:') || clean.startsWith('data:')) return;
    if (!fs.existsSync(path.join(root, clean))) missing.push(clean);
  });
  console.log(`Checking ${filename}: Total refs=${allRefs.length}, Missing=${missing.length}`);
  if (missing.length) console.log('Missing in', filename, missing);
});
