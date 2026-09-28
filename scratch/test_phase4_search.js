const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('--- PHASE 4 SEARCH INTEGRATION VALIDATION ---');
let errors = 0;

function assert(condition, message) {
  if (!condition) {
    console.error(`[FAIL] ${message}`);
    errors++;
  } else {
    console.log(`[PASS] ${message}`);
  }
}

// 1. JavaScript Syntax Check
try {
  execSync('node -c assets/theme.js');
  assert(true, 'assets/theme.js compiles without syntax errors');
} catch (e) {
  assert(false, `assets/theme.js syntax error: ${e.message}`);
}

const themeJs = fs.readFileSync('assets/theme.js', 'utf8');

// 2. Validate SearchModal in theme.js
assert(themeJs.includes('const SearchModal = {'), 'SearchModal object exists in theme.js');
assert(themeJs.includes('/search/suggest.json'), 'SearchModal connects to Shopify Predictive Search (/search/suggest.json)');
assert(themeJs.includes('debounceTimer'), 'SearchModal implements debouncing for predictive search');
assert(themeJs.includes('resources[type]=product'), 'SearchModal restricts suggestions to products');
assert(themeJs.includes('search?q='), 'SearchModal links to native Shopify /search?q= route');
assert(!themeJs.includes('search.html?q='), 'SearchModal contains no mock search.html references');

// 3. Validate SearchResultsPage in theme.js
assert(themeJs.includes('const SearchResultsPage = {'), 'SearchResultsPage controller exists in theme.js');
assert(!themeJs.includes("countEl.textContent = '331'"), 'SearchResultsPage does not hardcode results count to 331');
assert(!themeJs.includes("query = urlParams.get('q') || 'gold earring'"), 'SearchResultsPage does not fallback to gold earring');
assert(themeJs.includes('data-search-page-input'), 'SearchResultsPage handles search page input');
assert(themeJs.includes('data-search-page-clear'), 'SearchResultsPage handles clear/close button');

// 4. Validate snippets/search-modal.liquid
const searchModalLiquid = fs.readFileSync('snippets/search-modal.liquid', 'utf8');
assert(searchModalLiquid.includes('data-search-modal'), 'search-modal.liquid has data-search-modal attribute');
assert(searchModalLiquid.includes('data-search-backdrop'), 'search-modal.liquid has data-search-backdrop attribute');
assert(searchModalLiquid.includes('data-search-input'), 'search-modal.liquid has data-search-input attribute');
assert(searchModalLiquid.includes('data-search-close'), 'search-modal.liquid has data-search-close attribute');
assert(searchModalLiquid.includes('data-search-categories'), 'search-modal.liquid has categories quick-access section');
assert(searchModalLiquid.includes('data-predictive-search'), 'search-modal.liquid has live predictive search container');
assert(searchModalLiquid.includes('action="{{ routes.search_url }}"'), 'search-modal.liquid form submits to routes.search_url');
assert(searchModalLiquid.includes('name="type" value="product"'), 'search-modal.liquid specifies type=product');

// 5. Validate sections/main-search.liquid
const mainSearchLiquid = fs.readFileSync('sections/main-search.liquid', 'utf8');
assert(mainSearchLiquid.includes('data-search-page'), 'main-search.liquid has data-search-page container');
assert(mainSearchLiquid.includes('data-search-page-input'), 'main-search.liquid has search page input');
assert(mainSearchLiquid.includes('value="{{ search.terms | escape }}"'), 'main-search.liquid preserves search query in input');
assert(mainSearchLiquid.includes("render 'product-card', product: item"), 'main-search.liquid renders reusable product-card.liquid');
assert(mainSearchLiquid.includes('search.performed'), 'main-search.liquid handles search.performed');
assert(mainSearchLiquid.includes('search-empty-state'), 'main-search.liquid provides real no-results empty state');
assert(mainSearchLiquid.includes('routes.all_products_collection_url'), 'main-search.liquid empty state links to all products');
assert(mainSearchLiquid.includes('paginate search.results'), 'main-search.liquid paginates search results');
assert(mainSearchLiquid.includes('default_pagination'), 'main-search.liquid includes pagination controls');

// Check schema validity in main-search.liquid
const schemaMatch = mainSearchLiquid.match(/\{% schema %\}([\s\S]*?)\{% endschema %\}/);
assert(schemaMatch !== null, 'main-search.liquid contains {% schema %} block');
if (schemaMatch) {
  try {
    const parsedSchema = JSON.parse(schemaMatch[1]);
    assert(parsedSchema.name === 'Search Results', 'main-search.liquid schema parsed valid JSON');
  } catch (err) {
    assert(false, `main-search.liquid schema JSON parse error: ${err.message}`);
  }
}

// Ensure no hardcoded mock items remain
assert(!mainSearchLiquid.includes('search-demo-1'), 'main-search.liquid has no mock demo-1 product');
assert(!mainSearchLiquid.includes('search-demo-2'), 'main-search.liquid has no mock demo-2 product');
assert(!mainSearchLiquid.includes('default: 331'), 'main-search.liquid has no hardcoded 331 count');
assert(!mainSearchLiquid.includes("default: 'gold earring'"), 'main-search.liquid has no hardcoded gold earring term');

// 6. Validate Header & Sidebar Search Open Triggers
const headerLiquid = fs.readFileSync('sections/header.liquid', 'utf8');
assert(headerLiquid.includes('data-search-open'), 'header.liquid has data-search-open trigger');
const sidebarLiquid = fs.readFileSync('snippets/sidebar-drawer.liquid', 'utf8');
assert(sidebarLiquid.includes('data-search-open'), 'sidebar-drawer.liquid has data-search-open trigger');

// 7. Validate CSS for Search Modal & Results Page
const themeCss = fs.readFileSync('assets/theme.css', 'utf8');
assert(themeCss.includes('.search-modal'), 'theme.css defines .search-modal');
assert(themeCss.includes('.search-modal.is-open'), 'theme.css defines .search-modal.is-open');
assert(themeCss.includes('.search-predictive-grid'), 'theme.css defines .search-predictive-grid');
assert(themeCss.includes('.search-predictive-view-all'), 'theme.css defines .search-predictive-view-all');
assert(themeCss.includes('.search-page-bar'), 'theme.css defines .search-page-bar');
assert(themeCss.includes('.search-page-count'), 'theme.css defines .search-page-count');

console.log(`\nValidation complete. Total errors: ${errors}`);
process.exit(errors === 0 ? 0 : 1);
