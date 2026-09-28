const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.resolve(__dirname, '../assets/theme.js'), 'utf-8');
const lines = content.split('\n');
lines.forEach((l, i) => {
  if (l.includes('CartPageController')) {
    console.log(`L${i+1}: ${l}`);
  }
});
