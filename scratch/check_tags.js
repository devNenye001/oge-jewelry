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

console.log(`Checking tag balance across ${liquidFiles.length} Liquid files...`);

const blockTags = [
  { open: 'if', close: 'endif' },
  { open: 'for', close: 'endfor' },
  { open: 'form', close: 'endform' },
  { open: 'paginate', close: 'endpaginate' },
  { open: 'case', close: 'endcase' },
  { open: 'unless', close: 'endunless' },
  { open: 'comment', close: 'endcomment' },
  { open: 'schema', close: 'endschema' }
];

let issues = 0;

liquidFiles.forEach(file => {
  const rel = path.relative(rootDir, file);
  const content = fs.readFileSync(file, 'utf-8');

  // Strip liquid comments first when counting other tags, but check comments themselves
  blockTags.forEach(pair => {
    // Regex for opening tag
    const openRegex = new RegExp(`{%(?:-)?\\s*${pair.open}\\b(?:[\\s\\S]*?)(?:-)?%}`, 'g');
    const closeRegex = new RegExp(`{%(?:-)?\\s*${pair.close}\\b(?:[\\s\\S]*?)(?:-)?%}`, 'g');

    const openCount = (content.match(openRegex) || []).length;
    const closeCount = (content.match(closeRegex) || []).length;

    if (openCount !== closeCount) {
      console.error(`[TAG MISMATCH] ${rel}: "${pair.open}" has ${openCount} open vs ${closeCount} close`);
      issues++;
    }
  });
});

console.log(`Tag balance check completed with ${issues} issues.`);
