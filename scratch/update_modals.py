import glob
import re
import os

CANONICAL_SEARCH_MODAL = """  <!-- =========================================================================
       SEARCH MODAL (EXACT MATCH FOR UPLOADED MOCKUP)
       ========================================================================= -->
  <div class="search-modal-backdrop" data-search-backdrop></div>
  <div class="search-modal" data-search-modal role="dialog" aria-modal="true" aria-label="Search Catalog">
    <div class="search-modal__inner">
      <div class="search-modal__bar">
        <span class="search-modal__icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" width="22" height="22"><circle cx="11" cy="11" r="7.5"></circle><line x1="21" y1="21" x2="16.5" y2="16.5"></line></svg>
        </span>
        <input type="text" class="search-modal__input" placeholder="What are you looking for?" data-search-input aria-label="Search products">
        <button type="button" class="search-modal__close" data-search-close aria-label="Close Search" id="btn-search-close">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" width="20" height="20"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
      </div>
      <div class="search-modal__categories">
        <a href="category.html?type=rings" class="search-category-card">
          <div class="search-category-card__media">
            <img src="assets/rings-category.jpg" alt="Rings" class="search-category-card__image" loading="lazy" width="400" height="400">
          </div>
          <span class="search-category-card__title">Rings</span>
        </a>
        <a href="category.html?type=earrings" class="search-category-card">
          <div class="search-category-card__media">
            <img src="assets/sales1.jpg" alt="Earrings" class="search-category-card__image" loading="lazy" width="400" height="400">
          </div>
          <span class="search-category-card__title">Earrings</span>
        </a>
      </div>
    </div>
  </div>"""

CANONICAL_CART_DRAWER = """  <!-- =========================================================================
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

def update_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original = content

    # 1. Update or Insert Search Modal
    search_modal_pattern = re.compile(r'(?:<!--\s*=*\s*SEARCH MODAL[\s\S]*?-->\s*)?<div[^>]*class=["\'][^"\']*search-modal-backdrop["\'][\s\S]*?<div[^>]*class=["\'][^"\']*search-modal["\'][\s\S]*?</div>\s*</div>\s*</div>', re.MULTILINE)
    if search_modal_pattern.search(content):
        content = search_modal_pattern.sub(CANONICAL_SEARCH_MODAL.strip(), content, count=1)
    else:
        # Insert after site-header if missing
        m_header = re.search(r'(</header>)', content)
        if m_header and 'login.html' not in filepath and 'checkout.html' not in filepath:
            content = content[:m_header.end()] + '\n\n' + CANONICAL_SEARCH_MODAL.strip() + '\n' + content[m_header.end():]

    # 2. Update Cart Drawer
    cart_drawer_pattern = re.compile(r'(?:<!--\s*=*\s*CART DRAWER[\s\S]*?-->\s*)?(?:<div[^>]*class=["\'][^"\']*cart-drawer-backdrop["\'][^>]*></div>\s*)?<(?:aside|div)[^>]*data-cart-drawer[\s\S]*?</(?:aside|div)>', re.MULTILINE)
    if cart_drawer_pattern.search(content):
        content = cart_drawer_pattern.sub(CANONICAL_CART_DRAWER.strip(), content, count=1)

    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f'Updated {filepath}')
    else:
        print(f'No changes needed for {filepath}')

target_files = [f for f in glob.glob('*.html') + glob.glob('preview/*.html') 
                if os.path.getsize(f) > 1000 
                and 'checkout' not in f 
                and 'login' not in f 
                and 'signup' not in f 
                and 'reset-password' not in f]

for f in target_files:
    update_file(f)
