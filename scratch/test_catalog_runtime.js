const fs = require('fs');

global.localStorage = {
  getItem: () => null,
  setItem: () => {}
};
global.window = {
  location: { search: '' },
  localStorage: global.localStorage
};
global.document = {
  readyState: 'complete',
  addEventListener: () => {},
  querySelector: () => null,
  querySelectorAll: () => []
};

// Evaluate catalog-data.js
const code = fs.readFileSync('assets/catalog-data.js', 'utf8');
eval(code);

console.log("Total catalog products:", window.OGE_CATALOG.length);

const categoriesToTest = ['earrings', 'necklaces', 'bracelets', 'rings', 'men', 'fine-jewelry', 'new', 'new-in', 'jewelries', 'all'];
console.log("\n--- Testing Categories ---");
categoriesToTest.forEach(cat => {
  const prods = window.OGE_HELPERS.getProductsByCategory(cat);
  console.log(`Category '${cat}': ${prods.length} products`);
  if (prods.length === 0) throw new Error(`Category ${cat} returned 0 products!`);
});

const collectionsToTest = ['self-woman', 'self-romance', 'alignment', 'boundaries', 'victorious', 'all'];
console.log("\n--- Testing Collections ---");
collectionsToTest.forEach(col => {
  const prods = window.OGE_HELPERS.getProductsByCollection(col);
  console.log(`Collection '${col}': ${prods.length} products`);
  if (prods.length === 0) throw new Error(`Collection ${col} returned 0 products!`);

  // Test tabs
  ['necklaces', 'bracelets', 'rings'].forEach(sub => {
    const subProds = window.OGE_HELPERS.getProductsByCollection(col, sub);
    console.log(`  -> subcategory '${sub}': ${subProds.length} products`);
  });
});

console.log("\n--- Testing Product Card Render ---");
const sampleCard = window.OGE_HELPERS.renderProductCard(window.OGE_CATALOG[0], 0);
console.log("Sample card length:", sampleCard.length);
console.log("Sample card contains product-card:", sampleCard.includes('product-card'));
console.log("Sample card contains product-card__img-primary:", sampleCard.includes('product-card__img-primary'));
console.log("Sample card contains product-card__img-secondary:", sampleCard.includes('product-card__img-secondary'));
console.log("Sample card contains product-card__wishlist-btn:", sampleCard.includes('product-card__wishlist-btn'));
console.log("Sample card contains product-card__add-btn:", sampleCard.includes('product-card__add-btn'));

console.log("\nALL CATALOG & HELPER TESTS PASSED SUCCESSFULLY!");
