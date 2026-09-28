import glob
import re

clean_cart_drawer = """  <!-- =========================================================================
       CART DRAWER (EXACT FIGMA MATCH: BAG1 EMPTY & BAG2 ACTIVE)
       ========================================================================= -->
  <div class="cart-drawer-backdrop" data-cart-drawer-backdrop></div>
  <aside class="cart-drawer" data-cart-drawer role="dialog" aria-modal="true" aria-label="My Bag">
    <div class="cart-drawer__header">
      <h2 class="cart-drawer__title">MY BAG</h2>
      <button type="button" class="cart-drawer__close" data-cart-drawer-close aria-label="Close Bag" id="btn-cart-close">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" width="18" height="18"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
      </button>
    </div>
    <div class="cart-drawer__body" data-cart-drawer-body>
      <div class="cart-drawer__empty">
        <p class="cart-drawer__empty-text">Your bag is empty</p>
      </div>
    </div>
    <div class="cart-drawer__footer" data-cart-drawer-footer>
      <a href="shop.html" class="cart-drawer__btn-shop-all" data-cart-drawer-close>Shop All</a>
    </div>
  </aside>"""

fixed_count = 0
for pattern in ['*.html', 'preview/*.html']:
    for f in glob.glob(pattern):
        with open(f, 'r', encoding='utf-8') as infile:
            content = infile.read()
        
        # Check if file has duplicate drawer body or dangling extra tags
        # Look specifically for </aside> followed by <div class="cart-drawer__body"
        if re.search(r'</aside>\s*<div class="cart-drawer__body"', content):
            # Replace the entire cart drawer block with clean_cart_drawer
            new_content = re.sub(
                r'(\s*<!--\s*Cart Drawer\s*-->)?\s*<!--\s*={5,}\s*CART DRAWER[\s\S]*?</aside>\s*<div class="cart-drawer__body"[\s\S]*?</(aside|div)>',
                '\n\n' + clean_cart_drawer,
                content
            )
            if new_content != content:
                with open(f, 'w', encoding='utf-8') as outfile:
                    outfile.write(new_content)
                fixed_count += 1
                print(f"Fixed cart drawer in: {f}")

print(f"Total fixed files: {fixed_count}")
