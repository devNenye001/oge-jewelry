import glob

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
  </aside>

"""

all_files = glob.glob('*.html') + glob.glob('preview/*.html')

for f in all_files:
    with open(f, 'r', encoding='utf-8') as infile:
        content = infile.read()
    
    # Locate where the cart drawer starts
    # It starts around 'data-cart-drawer-backdrop' or 'CART DRAWER'
    # And it ends right before '<main'
    start_marker = None
    for marker in ['<!-- Cart Drawer -->', '<!-- ====', '<div class="cart-drawer-backdrop"']:
        pos = content.find(marker)
        if pos != -1 and 'CART DRAWER' in content[pos:pos+200]:
            start_marker = pos
            break
    
    if start_marker is None:
        pos = content.find('<div class="cart-drawer-backdrop"')
        if pos != -1:
            start_marker = pos

    if start_marker is not None:
        main_pos = content.find('<main')
        if main_pos != -1 and main_pos > start_marker:
            old_drawer_block = content[start_marker:main_pos]
            # Replace old_drawer_block with clean_cart_drawer
            new_content = content[:start_marker] + clean_cart_drawer + content[main_pos:]
            if new_content != content:
                with open(f, 'w', encoding='utf-8') as outfile:
                    outfile.write(new_content)
                print(f"Cleaned drawer in {f}")

print("Cart drawer cleanup script finished.")
