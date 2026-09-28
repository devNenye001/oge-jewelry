const fs = require('fs');
const path = require('path');

const themeJsPath = path.resolve(__dirname, '../assets/theme.js');
const content = fs.readFileSync(themeJsPath, 'utf-8');

const lines = content.split('\n');
lines.forEach((line, idx) => {
  if (line.includes('variant') || line.includes('Variant') || line.includes('product-json')) {
    console.log(`L${idx + 1}: ${line.trim().slice(0, 100)}`);
  }
});
