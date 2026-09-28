const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');

console.log('--- COMPREHENSIVE PRODUCTION AUDIT SCRIPT ---');

const results = {
  liquidFiles: 0,
  schemaErrors: [],
  missingSnippets: [],
  missingSections: [],
  missingAssets: [],
  htmlLinks: [],
  brokenRoutes: [],
  jsSyntaxErrors: [],
  deprecatedLiquid: []
};

// 1. Scan all files in the theme
function getFiles(dir, exts) {
  let files = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (!['node_modules', '.git', 'preview', 'scratch'].includes(entry.name)) {
        files = files.concat(getFiles(full, exts));
      }
    } else if (exts.some(ext => entry.name.endsWith(ext))) {
      files.push(full);
    }
  }
  return files;
}

const liquidFiles = getFiles(rootDir, ['.liquid']);
results.liquidFiles = liquidFiles.length;

// Check existing assets and snippets
const assetsOnDisk = new Set(fs.readdirSync(path.join(rootDir, 'assets')));
const snippetsOnDisk = new Set(
  fs.existsSync(path.join(rootDir, 'snippets')) 
    ? fs.readdirSync(path.join(rootDir, 'snippets')).map(f => f.replace('.liquid', '')) 
    : []
);
const sectionsOnDisk = new Set(
  fs.existsSync(path.join(rootDir, 'sections')) 
    ? fs.readdirSync(path.join(rootDir, 'sections')).map(f => f.replace('.liquid', '')) 
    : []
);

// 2. Audit each Liquid file
liquidFiles.forEach(file => {
  const relPath = path.relative(rootDir, file);
  const content = fs.readFileSync(file, 'utf-8');

  // Check Schema
  const schemaMatch = content.match(/{%\s*schema\s*%}([\s\S]*?){%\s*endschema\s*%}/);
  if (schemaMatch) {
    try {
      JSON.parse(schemaMatch[1]);
    } catch (e) {
      results.schemaErrors.push({ file: relPath, error: e.message });
    }
  }

  // Check Snippet renders: {% render 'snippet' or {% include 'snippet'
  const renderMatches = [...content.matchAll(/{%\s*(?:render|include)\s+['"]([^'"]+)['"]/g)];
  renderMatches.forEach(m => {
    const snippetName = m[1];
    if (!snippetsOnDisk.has(snippetName)) {
      results.missingSnippets.push({ file: relPath, snippet: snippetName });
    }
  });

  // Check Section tags: {% section 'section' %}
  const sectionMatches = [...content.matchAll(/{%\s*section\s+['"]([^'"]+)['"]/g)];
  sectionMatches.forEach(m => {
    const secName = m[1];
    if (!sectionsOnDisk.has(secName)) {
      results.missingSections.push({ file: relPath, section: secName });
    }
  });

  // Check Asset URLs: {{ 'filename' | asset_url }}
  const assetMatches = [...content.matchAll(/['"]([^'"]+\.[a-zA-Z0-9]+)['"]\s*\|\s*asset_url/g)];
  assetMatches.forEach(m => {
    const assetName = m[1];
    if (!assetsOnDisk.has(assetName)) {
      results.missingAssets.push({ file: relPath, asset: assetName });
    }
  });

  // Check for prototype .html links
  const htmlLinkMatches = [...content.matchAll(/href=["']([^"']*\.html[^"']*)["']/g)];
  htmlLinkMatches.forEach(m => {
    results.htmlLinks.push({ file: relPath, link: m[1] });
  });

  // Check for deprecated Liquid filters or tags
  if (content.includes('include ')) {
    results.deprecatedLiquid.push({ file: relPath, issue: "Uses deprecated {% include %} instead of {% render %}" });
  }
  if (content.includes('| hex_to_rgba')) {
    results.deprecatedLiquid.push({ file: relPath, issue: "hex_to_rgba is deprecated in Shopify" });
  }
  if (content.includes('customer_login_link') || content.includes('customer_register_link')) {
    // Check if used as filter or tag
  }
});

// 3. Audit templates/*.json for sections resolution
const templatesDir = path.join(rootDir, 'templates');
const templateFiles = getFiles(templatesDir, ['.json']);
templateFiles.forEach(file => {
  const relPath = path.relative(rootDir, file);
  try {
    const data = JSON.parse(fs.readFileSync(file, 'utf-8'));
    if (data.sections) {
      Object.entries(data.sections).forEach(([key, val]) => {
        if (val.type && !sectionsOnDisk.has(val.type)) {
          results.missingSections.push({ file: relPath, section: val.type });
        }
      });
    }
  } catch (e) {
    results.schemaErrors.push({ file: relPath, error: e.message });
  }
});

// 4. Audit theme.js for JS syntax errors
const themeJsPath = path.join(rootDir, 'assets/theme.js');
if (fs.existsSync(themeJsPath)) {
  const jsContent = fs.readFileSync(themeJsPath, 'utf-8');
  try {
    new Function(jsContent);
  } catch (e) {
    results.jsSyntaxErrors.push({ file: 'assets/theme.js', error: e.message });
  }
}

console.log(JSON.stringify(results, null, 2));
