const fs = require('fs');
const path = require('path');

const themeJsPath = path.resolve(__dirname, '../assets/theme.js');
const content = fs.readFileSync(themeJsPath, 'utf-8');

const matches = [...content.matchAll(/(['"`]\/(?:cart|checkout|collections|products|search|pages|policies)[^'"`]*['"`])/g)];
const uniqueMatches = [...new Set(matches.map(m => m[1]))];
console.log('URLs in theme.js:', uniqueMatches);
