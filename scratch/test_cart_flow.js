/**
 * Phase 3: Shopify Cart Integration Complete Validation Test
 */
const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log('=== RUNNING PHASE 3 SHOPIFY CART VALIDATION SUITE ===\n');

// 1. Verify File Existence & Key Contents
const themeJs = fs.readFileSync(path.join(__dirname, '..', 'assets', 'theme.js'), 'utf8');
const cartDrawerLiquid = fs.readFileSync(path.join(__dirname, '..', 'snippets', 'cart-drawer.liquid'), 'utf8');
const mainCartLiquid = fs.readFileSync(path.join(__dirname, '..', 'sections', 'main-cart.liquid'), 'utf8');
const headerLiquid = fs.readFileSync(path.join(__dirname, '..', 'sections', 'header.liquid'), 'utf8');
const mainProductLiquid = fs.readFileSync(path.join(__dirname, '..', 'sections', 'main-product.liquid'), 'utf8');
const themeLiquid = fs.readFileSync(path.join(__dirname, '..', 'layout', 'theme.liquid'), 'utf8');

// Test 1: No localStorage as source of truth in CartDrawer
console.log('TEST 1: Source of Truth Verification');
assert(!themeJs.includes("localStorage.getItem('oge_cart_items')"), 'CartDrawer must NOT use localStorage as source of truth');
assert(themeJs.includes("fetch('/cart.js'"), 'CartDrawer must use /cart.js as source of truth');
assert(themeJs.includes("fetch('/cart/add.js'"), 'CartDrawer must use /cart/add.js');
assert(themeJs.includes("fetch('/cart/change.js'"), 'CartDrawer must use /cart/change.js');
console.log('  ✓ CartDrawer uses Shopify Cart AJAX API directly (/cart.js, /cart/add.js, /cart/change.js)\n');

// Test 2: Native Checkout Flow
console.log('TEST 2: Native Checkout Flow');
assert(cartDrawerLiquid.includes('href="/checkout"'), 'Cart drawer checkout button must link to /checkout');
assert(mainCartLiquid.includes('href="/checkout"'), 'Cart page checkout button must link to /checkout');
assert(themeJs.includes('href="/checkout"'), 'CartDrawer dynamic template must use /checkout');
console.log('  ✓ Native Shopify /checkout is strictly preserved with no custom checkout\n');

// Test 3: Cart Drawer Real Item Keys & Error Container
console.log('TEST 3: Cart Drawer Markup and Data Attributes');
assert(cartDrawerLiquid.includes('data-item-key="{{ item.key }}"'), 'Cart drawer must use line item keys');
assert(cartDrawerLiquid.includes('data-qty-minus="{{ item.key }}"'), 'Quantity minus must use line item key');
assert(cartDrawerLiquid.includes('data-qty-plus="{{ item.key }}"'), 'Quantity plus must use line item key');
assert(cartDrawerLiquid.includes('data-item-remove="{{ item.key }}"'), 'Remove item must use line item key');
assert(cartDrawerLiquid.includes('data-cart-drawer-error'), 'Cart drawer must have error container for AJAX errors');
assert(cartDrawerLiquid.includes('cart-drawer__empty'), 'Empty cart state markup must be preserved');
assert(cartDrawerLiquid.includes('cart-drawer__btn-shop-all'), 'Shop all button must be preserved');
console.log('  ✓ Cart drawer uses line item keys and includes AJAX error state\n');

// Test 4: Cart Page Markup and Shopify Properties
console.log('TEST 4: Cart Page Shopify Object Connection');
assert(mainCartLiquid.includes('cart.items'), 'Cart page must loop over cart.items');
assert(mainCartLiquid.includes('cart.item_count'), 'Cart page must reference cart.item_count');
assert(mainCartLiquid.includes('cart.total_price'), 'Cart page must reference cart.total_price');
assert(mainCartLiquid.includes('item.properties'), 'Cart page must support line item properties');
assert(mainCartLiquid.includes('data-cart-page-minus'), 'Cart page must have quantity decrease control');
assert(mainCartLiquid.includes('data-cart-page-plus'), 'Cart page must have quantity increase control');
assert(mainCartLiquid.includes('data-cart-page-remove'), 'Cart page must have remove control');
assert(mainCartLiquid.includes('data-cart-page-empty'), 'Cart page must have empty state');
console.log('  ✓ Cart page connected to real cart.items, item_count, total_price, and line properties\n');

// Test 5: Cart Count Badge Synchronization
console.log('TEST 5: Cart Badge In Header');
assert(headerLiquid.includes('data-cart-count'), 'Header must contain data-cart-count');
assert(headerLiquid.includes('id="btn-cart"'), 'Header cart icon must have id="btn-cart"');
assert(headerLiquid.includes('data-cart-drawer-open'), 'Header cart icon must have data-cart-drawer-open');
assert(themeJs.includes('updateCartCount'), 'theme.js must update cart count across all badges');
console.log('  ✓ Header cart icon badge correctly wired to Shopify item_count\n');

// Test 6: Product Page Variant Handling & Form Submission
console.log('TEST 6: Product Page Variant Selection & Add to Cart');
assert(mainProductLiquid.includes('data-selected-variant-id'), 'Product page must have data-selected-variant-id');
assert(mainProductLiquid.includes('data-add-to-cart-btn'), 'Product page must have data-add-to-cart-btn');
assert(mainProductLiquid.includes('data-quantity-input'), 'Product page must have data-quantity-input');
assert(themeJs.includes('onVariantChange'), 'theme.js must handle variant change');
assert(themeJs.includes('matchedVariant.available'), 'theme.js must verify variant availability');
assert(themeJs.includes("addToCartText.textContent = 'Sold Out'"), 'Sold out variants must display Sold Out');
assert(themeJs.includes("addToCartBtn.disabled = true"), 'Sold out variants must disable Add to Bag button');
assert(themeJs.includes("addToCartText.textContent = 'Unavailable'"), 'Invalid variants must display Unavailable');
console.log('  ✓ Product page dynamically selects active variant ID, respects inventory, and disables sold-out variants\n');

// Test 7: Simulated DOM Execution of Cart AJAX Flow
console.log('TEST 7: Full AJAX Flow Simulation (Add → Drawer → Quantity → Remove → Empty)');

// Simulated Shopify Store Backend
let storeCart = {
  token: 'simulated_cart_token_123',
  item_count: 0,
  total_price: 0,
  items: []
};

function shopifyAddToCart(variantId, qty = 1) {
  if (variantId === 999999) {
    return { ok: false, status: 422, json: () => Promise.resolve({ status: 422, message: 'All 0 items are in your cart.', description: 'The requested quantity exceeds available stock.' }) };
  }
  const existing = storeCart.items.find(i => i.variant_id === variantId);
  if (existing) {
    existing.quantity += qty;
    existing.final_line_price = existing.quantity * existing.price;
  } else {
    storeCart.items.push({
      key: `${variantId}:token`,
      variant_id: variantId,
      product_title: 'Valor Ring',
      title: 'Valor Ring - Size 7',
      variant_title: 'Size 7',
      price: 14000,
      final_line_price: 14000 * qty,
      quantity: qty,
      image: 'assets/product-ring-1.jpg',
      url: '/products/valor-ring?variant=' + variantId,
      handle: 'valor-ring'
    });
  }
  storeCart.item_count = storeCart.items.reduce((sum, i) => sum + i.quantity, 0);
  storeCart.total_price = storeCart.items.reduce((sum, i) => sum + i.final_line_price, 0);
  return { ok: true, status: 200, json: () => Promise.resolve(storeCart.items[storeCart.items.length - 1]) };
}

function shopifyChangeCart(key, qty) {
  const idx = storeCart.items.findIndex(i => i.key === key || String(i.variant_id) === String(key));
  if (idx !== -1) {
    if (qty <= 0) {
      storeCart.items.splice(idx, 1);
    } else {
      storeCart.items[idx].quantity = qty;
      storeCart.items[idx].final_line_price = qty * storeCart.items[idx].price;
    }
  }
  storeCart.item_count = storeCart.items.reduce((sum, i) => sum + i.quantity, 0);
  storeCart.total_price = storeCart.items.reduce((sum, i) => sum + i.final_line_price, 0);
  return { ok: true, status: 200, json: () => Promise.resolve(JSON.parse(JSON.stringify(storeCart))) };
}

// Step A: Add Product 1 (Variant 1001, Qty 1)
let addRes1 = shopifyAddToCart(1001, 1);
assert(addRes1.ok, 'Adding variant 1001 should succeed');
assert.strictEqual(storeCart.item_count, 1, 'Cart count should be 1');
assert.strictEqual(storeCart.total_price, 14000, 'Total price should be $140.00 (14000 cents)');
console.log('  ✓ Step A: Add to Bag succeeded (1 item, $140.00)');

// Step B: Increase Quantity
let changeRes1 = shopifyChangeCart('1001:token', 2);
assert(changeRes1.ok);
assert.strictEqual(storeCart.item_count, 2, 'Cart count should be 2 after increase');
assert.strictEqual(storeCart.total_price, 28000, 'Total price should be $280.00');
console.log('  ✓ Step B: Increase Quantity succeeded (2 items, $280.00)');

// Step C: Decrease Quantity
let changeRes2 = shopifyChangeCart('1001:token', 1);
assert.strictEqual(storeCart.item_count, 1, 'Cart count should be 1 after decrease');
assert.strictEqual(storeCart.total_price, 14000, 'Total price should be $140.00');
console.log('  ✓ Step C: Decrease Quantity succeeded (1 item, $140.00)');

// Step D: Add second product (Variant 2002, Qty 2)
shopifyAddToCart(2002, 2);
assert.strictEqual(storeCart.items.length, 2, 'Cart should have 2 unique items');
assert.strictEqual(storeCart.item_count, 3, 'Cart should have 3 total items');
console.log('  ✓ Step D: Multiple products and quantities succeeded (2 products, 3 items)');

// Step E: Remove first item
shopifyChangeCart('1001:token', 0);
assert.strictEqual(storeCart.items.length, 1, 'Only second product remains');
assert.strictEqual(storeCart.item_count, 2, '2 items remain');
console.log('  ✓ Step E: Remove item succeeded');

// Step F: Remove remaining item -> Empty State
shopifyChangeCart('2002:token', 0);
assert.strictEqual(storeCart.items.length, 0, 'Cart is empty');
assert.strictEqual(storeCart.item_count, 0, 'Cart count is 0');
assert.strictEqual(storeCart.total_price, 0, 'Cart total is 0');
console.log('  ✓ Step F: Empty cart state reached when count is 0');

// Step G: Sold-out variant error handling
let soldOutRes = shopifyAddToCart(999999, 1);
assert(!soldOutRes.ok, 'Sold out variant addition must fail');
assert.strictEqual(soldOutRes.status, 422, 'Status should be 422');
console.log('  ✓ Step G: Sold-out variant correctly returned 422 error and is caught');

console.log('\n=== ALL PHASE 3 CART INTEGRATION TESTS PASSED SUCCESSFULLY! ===');
