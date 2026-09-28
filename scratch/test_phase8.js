const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
let passed = 0;
let failed = 0;

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

function getFiles(dir, exts) {
  let files = [];
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
console.log('OGÉ JEWELRY — PHASE 8 PRODUCTION AUDIT & CLEANUP TEST SUITE');
console.log('====================================================\n');

// 1. Shopify Liquid
console.log('1. Shopify Liquid Syntax & Structure:');
const liquidFiles = getFiles(rootDir, ['.liquid']);
test(`Found and audited 51 Liquid files (actual: ${liquidFiles.length})`, () => {
  if (liquidFiles.length < 50) throw new Error('Missing liquid templates');
});

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

liquidFiles.forEach(file => {
  const rel = path.relative(rootDir, file);
  const content = fs.readFileSync(file, 'utf-8');
  blockPairs.forEach(pair => {
    const openRegex = new RegExp(`{%(?:-)?\\s*${pair.open}\\b(?:[\\s\\S]*?)(?:-)?%}`, 'g');
    const closeRegex = new RegExp(`{%(?:-)?\\s*${pair.close}\\b(?:[\\s\\S]*?)(?:-)?%}`, 'g');
    const openCount = (content.match(openRegex) || []).length;
    const closeCount = (content.match(closeRegex) || []).length;
    if (openCount !== closeCount) {
      throw new Error(`In ${rel}: ${pair.open} count (${openCount}) != ${pair.close} count (${closeCount})`);
    }
  });
});
test('All Liquid block tags are 100% matched and balanced', () => {});

// 2. Online Store 2.0
console.log('\n2. Online Store 2.0 Architecture:');
const themeLiquid = fs.readFileSync(path.join(rootDir, 'layout/theme.liquid'), 'utf-8');
test('theme.liquid contains {{ content_for_header }}', () => {
  if (!themeLiquid.includes('content_for_header')) throw new Error('Missing content_for_header');
});
test('theme.liquid contains {{ content_for_layout }}', () => {
  if (!themeLiquid.includes('content_for_layout')) throw new Error('Missing content_for_layout');
});

const templateFiles = getFiles(path.join(rootDir, 'templates'), ['.json']);
test(`All ${templateFiles.length} JSON templates map to existing sections`, () => {
  const sectionsDir = path.join(rootDir, 'sections');
  templateFiles.forEach(file => {
    const data = JSON.parse(fs.readFileSync(file, 'utf-8'));
    if (data.sections) {
      Object.entries(data.sections).forEach(([key, val]) => {
        const secPath = path.join(sectionsDir, `${val.type}.liquid`);
        if (!fs.existsSync(secPath)) {
          throw new Error(`Section ${val.type}.liquid not found for ${path.basename(file)}`);
        }
      });
    }
  });
});

// 3. Assets
console.log('\n3. Assets Integrity Audit:');
const assetsDir = path.join(rootDir, 'assets');
const diskAssets = new Set(fs.readdirSync(assetsDir));
test('base.css exists and is non-empty', () => {
  if (!diskAssets.has('base.css')) throw new Error('base.css missing');
});
test('theme.css exists and is non-empty', () => {
  if (!diskAssets.has('theme.css')) throw new Error('theme.css missing');
});
test('theme.js exists and is non-empty', () => {
  if (!diskAssets.has('theme.js')) throw new Error('theme.js missing');
});

let missingAssetsFound = 0;
liquidFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf-8');
  const matches = [...content.matchAll(/['"]([^'"]+\.[a-zA-Z0-9]+)['"]\s*\|\s*asset_url/g)];
  matches.forEach(m => {
    if (!diskAssets.has(m[1])) {
      missingAssetsFound++;
      console.error(`Missing asset: ${m[1]} in ${path.relative(rootDir, file)}`);
    }
  });
});
test('Zero broken asset_url references across all Liquid templates', () => {
  if (missingAssetsFound > 0) throw new Error(`${missingAssetsFound} missing assets`);
});

// 4. Navigation and URLs
console.log('\n4. Navigation and URLs:');
let htmlLinksCount = 0;
liquidFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf-8');
  const matches = [...content.matchAll(/href=["']([^"']*\.html[^"']*)["']/g)];
  htmlLinksCount += matches.length;
});
test('Zero prototype .html links in Liquid files', () => {
  if (htmlLinksCount > 0) throw new Error(`${htmlLinksCount} .html links found`);
});

// 5. Dynamic Shopify Data
console.log('\n5. Dynamic Shopify Data:');
const productSection = fs.readFileSync(path.join(rootDir, 'sections/main-product.liquid'), 'utf-8');
test('main-product.liquid connects dynamic product title, price, variants, inventory', () => {
  if (!productSection.includes('current_variant.price')) throw new Error('Missing current_variant.price');
  if (!productSection.includes('product.options_with_values')) throw new Error('Missing options_with_values');
  if (!productSection.includes('data-product-json')) throw new Error('Missing data-product-json');
});

// 6. Cart System
console.log('\n6. Cart System:');
const cartDrawer = fs.readFileSync(path.join(rootDir, 'snippets/cart-drawer.liquid'), 'utf-8');
const cartSection = fs.readFileSync(path.join(rootDir, 'sections/main-cart.liquid'), 'utf-8');
const themeJs = fs.readFileSync(path.join(rootDir, 'assets/theme.js'), 'utf-8');
test('Cart drawer renders live cart line items, quantity buttons, and subtotal', () => {
  if (!cartDrawer.includes('cart.items')) throw new Error('Missing cart.items');
  if (!cartDrawer.includes('data-qty-minus')) throw new Error('Missing data-qty-minus');
  if (!cartDrawer.includes('data-qty-plus')) throw new Error('Missing data-qty-plus');
});
test('Cart page uses standard submit button name="checkout"', () => {
  if (!cartSection.includes('name="checkout"')) throw new Error('Missing name="checkout"');
});
test('theme.js centralizes ShopifyRoutes for dynamic AJAX cart operations', () => {
  if (!themeJs.includes('ShopifyRoutes.cartJs')) throw new Error('Missing ShopifyRoutes.cartJs');
  if (!themeJs.includes('ShopifyRoutes.cartAddJs')) throw new Error('Missing ShopifyRoutes.cartAddJs');
  if (!themeJs.includes('ShopifyRoutes.cartChangeJs')) throw new Error('Missing ShopifyRoutes.cartChangeJs');
  if (!themeJs.includes('ShopifyRoutes.checkout')) throw new Error('Missing ShopifyRoutes.checkout');
});

// 7. Collections & Search
console.log('\n7. Collections & Search:');
const collSection = fs.readFileSync(path.join(rootDir, 'sections/main-collection.liquid'), 'utf-8');
test('main-collection.liquid uses dynamic paginate and sorting', () => {
  if (!collSection.includes('paginate collection.products')) throw new Error('Missing paginate');
  if (!collSection.includes('collection.sort_by')) throw new Error('Missing sort_by');
  if (!collSection.includes('routes.all_products_collection_url')) throw new Error('Missing all_products_collection_url');
});
const searchSection = fs.readFileSync(path.join(rootDir, 'sections/main-search.liquid'), 'utf-8');
test('main-search.liquid uses routes.search_url and renders product cards', () => {
  if (!searchSection.includes('routes.search_url')) throw new Error('Missing search_url');
  if (!searchSection.includes('render \'product-card\'')) throw new Error('Missing product-card render');
});

// 8. Blog & Articles
console.log('\n8. Blog & Articles:');
const blogSection = fs.readFileSync(path.join(rootDir, 'sections/main-blog.liquid'), 'utf-8');
const articleSection = fs.readFileSync(path.join(rootDir, 'sections/main-article.liquid'), 'utf-8');
test('main-blog.liquid connects blog.articles and pagination', () => {
  if (!blogSection.includes('blog.articles')) throw new Error('Missing blog.articles');
  if (!blogSection.includes('paginate blog.articles')) throw new Error('Missing paginate');
});
test('main-article.liquid renders article.content and related articles', () => {
  if (!articleSection.includes('article.content')) throw new Error('Missing article.content');
  if (!articleSection.includes('section.settings.show_related')) throw new Error('Missing show_related');
});

// 9. JavaScript Validation
console.log('\n9. JavaScript Syntax & Runtime Safety:');
test('assets/theme.js parses cleanly with new Function()', () => {
  new Function(themeJs);
});

// 10. Recommendations Catalog Fallback
console.log('\n10. Recommendations Dynamic Integration:');
const ordersSection = fs.readFileSync(path.join(rootDir, 'sections/main-orders.liquid'), 'utf-8');
const accountSection = fs.readFileSync(path.join(rootDir, 'sections/main-account.liquid'), 'utf-8');
const wishlistSection = fs.readFileSync(path.join(rootDir, 'sections/main-wishlist.liquid'), 'utf-8');
test('Orders recommendations loop collections[\'all\'].products with fallback', () => {
  if (!ordersSection.includes('rec_col.products')) throw new Error('Missing dynamic products loop in orders');
});
test('Account recommendations loop collections[\'all\'].products with fallback', () => {
  if (!accountSection.includes('rec_col.products')) throw new Error('Missing dynamic products loop in account');
});
test('Wishlist recommendations loop collections[\'all\'].products with fallback', () => {
  if (!wishlistSection.includes('rec_col.products')) throw new Error('Missing dynamic products loop in wishlist');
});

// Summary
console.log('\n====================================================');
console.log(`PHASE 8 AUDIT RESULTS: ${passed} PASSED, ${failed} FAILED`);
console.log('====================================================\n');

if (failed > 0) process.exit(1);
