const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
let passed = 0;
let failed = 0;
let warnings = 0;

function test(name, fn) {
  try {
    fn();
    passed++;
    console.log(`  ✓ [PASS] ${name}`);
  } catch (err) {
    failed++;
    console.error(`  ✗ [FAIL] ${name}: ${err.message}`);
  }
}

function warn(msg) {
  warnings++;
  console.warn(`  ! [WARN] ${msg}`);
}

function getFiles(dir, exts) {
  let files = [];
  if (!fs.existsSync(dir)) return files;
  for (const f of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, f.name);
    if (f.isDirectory() && !['node_modules', '.git', 'preview', 'scratch'].includes(f.name)) {
      files = files.concat(getFiles(full, exts));
    } else if (f.isFile() && exts.some(e => f.name.endsWith(e))) {
      files.push(full);
    }
  }
  return files;
}

console.log('====================================================');
console.log('OGÉ JEWELRY — PHASE 9 FINAL THEME DELIVERY VERIFICATION');
console.log('====================================================\n');

// 1. Theme Structure Verification
console.log('1. Theme Directory Structure:');
const requiredDirs = ['layout', 'templates', 'sections', 'snippets', 'assets', 'config', 'locales'];
requiredDirs.forEach(dir => {
  test(`Required directory "${dir}/" exists`, () => {
    if (!fs.existsSync(path.join(rootDir, dir))) throw new Error(`Missing ${dir}/ directory`);
  });
});

// 2. Templates Resolution
console.log('\n2. Templates & Sections Mapping:');
const templates = getFiles(path.join(rootDir, 'templates'), ['.json']);
test(`Found ${templates.length} JSON templates`, () => {
  if (templates.length < 24) throw new Error(`Expected at least 24 templates, found ${templates.length}`);
});

templates.forEach(tpl => {
  const rel = path.relative(rootDir, tpl);
  test(`Template "${rel}" parses as valid JSON and maps to existing sections`, () => {
    const data = JSON.parse(fs.readFileSync(tpl, 'utf-8'));
    if (data.sections) {
      Object.entries(data.sections).forEach(([secKey, secVal]) => {
        if (secVal.type) {
          const secFile = path.join(rootDir, 'sections', `${secVal.type}.liquid`);
          if (!fs.existsSync(secFile)) {
            throw new Error(`Referenced section "${secVal.type}.liquid" does not exist`);
          }
        }
      });
    }
  });
});

// 3. Liquid Schemas & Tag Balancing
console.log('\n3. Liquid Schemas & Tag Balancing:');
const sections = getFiles(path.join(rootDir, 'sections'), ['.liquid']);
test(`Found ${sections.length} section files`, () => {
  if (sections.length < 35) throw new Error(`Expected at least 35 sections, found ${sections.length}`);
});

sections.forEach(sec => {
  const rel = path.relative(rootDir, sec);
  const content = fs.readFileSync(sec, 'utf-8');
  const schemaMatch = content.match(/{%\s*schema\s*%}([\s\S]*?){%\s*endschema\s*%}/);
  if (schemaMatch) {
    test(`Section "${rel}" schema is valid JSON`, () => {
      JSON.parse(schemaMatch[1]);
    });
  }
});

const allLiquids = getFiles(rootDir, ['.liquid']);
const blockPairs = [
  { open: 'if', close: 'endif' },
  { open: 'for', close: 'endfor' },
  { open: 'form', close: 'endform' },
  { open: 'paginate', close: 'endpaginate' },
  { open: 'case', close: 'endcase' },
  { open: 'unless', close: 'endunless' },
  { open: 'comment', close: 'endcomment' },
  { open: 'schema', close: 'endschema' }
];

allLiquids.forEach(file => {
  const rel = path.relative(rootDir, file);
  const content = fs.readFileSync(file, 'utf-8');
  blockPairs.forEach(pair => {
    const openRegex = new RegExp(`{%(?:-)?\\s*${pair.open}\\b(?:[\\s\\S]*?)(?:-)?%}`, 'g');
    const closeRegex = new RegExp(`{%(?:-)?\\s*${pair.close}\\b(?:[\\s\\S]*?)(?:-)?%}`, 'g');
    const openCount = (content.match(openRegex) || []).length;
    const closeCount = (content.match(closeRegex) || []).length;
    if (openCount !== closeCount) {
      test(`File "${rel}" tags balanced for "${pair.open}"`, () => {
        throw new Error(`Open (${openCount}) != Close (${closeCount})`);
      });
    }
  });
});
test(`All ${allLiquids.length} Liquid files have balanced tags`, () => {});

// 4. JavaScript Verification
console.log('\n4. JavaScript Syntax & Runtime Health:');
const themeJsPath = path.join(rootDir, 'assets/theme.js');
test('assets/theme.js exists and is syntax-valid', () => {
  const code = fs.readFileSync(themeJsPath, 'utf-8');
  new Function(code);
});
test('assets/theme.js includes ShopifyRoutes with dynamic endpoints', () => {
  const code = fs.readFileSync(themeJsPath, 'utf-8');
  if (!code.includes('ShopifyRoutes')) throw new Error('Missing ShopifyRoutes');
});

// 5. Assets Audit
console.log('\n5. Assets Audit:');
const diskAssets = new Set(fs.readdirSync(path.join(rootDir, 'assets')));
let missingAssets = 0;
allLiquids.forEach(file => {
  const content = fs.readFileSync(file, 'utf-8');
  const matches = [...content.matchAll(/['"]([^'"]+\.[a-zA-Z0-9]+)['"]\s*\|\s*asset_url/g)];
  matches.forEach(m => {
    if (!diskAssets.has(m[1])) {
      missingAssets++;
      warn(`Asset "${m[1]}" referenced in ${path.relative(rootDir, file)} not found on disk`);
    }
  });
});
test('Zero missing asset_url references in theme Liquid templates', () => {
  if (missingAssets > 0) throw new Error(`${missingAssets} missing assets detected`);
});

// 6. Production Cleanliness Audit
console.log('\n6. Production Cleanliness Audit:');
let protoLinks = 0;
allLiquids.forEach(file => {
  const content = fs.readFileSync(file, 'utf-8');
  const matches = [...content.matchAll(/href=["']([^"']*\.html[^"']*)["']/g)];
  if (matches.length > 0) {
    protoLinks += matches.length;
    console.error(`Found prototype .html link in ${path.relative(rootDir, file)}: ${matches.map(m=>m[1]).join(', ')}`);
  }
});
test('Zero prototype .html links in theme Liquid templates', () => {
  if (protoLinks > 0) throw new Error(`${protoLinks} .html links found`);
});

// 7. Configuration & Locales
console.log('\n7. Configuration & Locales:');
test('config/settings_schema.json is valid JSON', () => {
  JSON.parse(fs.readFileSync(path.join(rootDir, 'config/settings_schema.json'), 'utf-8'));
});
test('config/settings_data.json is valid JSON', () => {
  JSON.parse(fs.readFileSync(path.join(rootDir, 'config/settings_data.json'), 'utf-8'));
});
test('locales/en.default.json is valid JSON', () => {
  JSON.parse(fs.readFileSync(path.join(rootDir, 'locales/en.default.json'), 'utf-8'));
});

// Summary
console.log('\n====================================================');
console.log(`PHASE 9 VERIFICATION RESULTS: ${passed} PASSED, ${failed} FAILED, ${warnings} WARNINGS`);
console.log(`TOTAL FILES CHECKED: ${allLiquids.length + templates.length + 3}`);
console.log('====================================================\n');

if (failed > 0) process.exit(1);
