import re

with open('wishlist.html', 'r', encoding='utf-8') as f:
    w_html = f.read()

# Make sure title divider is included
w_html = re.sub(
    r'<h1 class="wishlist-title">WISHLIST</h1>(\s*<hr class="wishlist-title-divider">)?',
    '<h1 class="wishlist-title">WISHLIST</h1>\n      <hr class="wishlist-title-divider">',
    w_html
)

# Update the renderWishlist script inside wishlist.html
new_script = """  <!-- Dynamic Wishlist Page Script (Handles both Empty & Active States 1:1) -->
  <script>
    document.addEventListener('DOMContentLoaded', function() {
      const urlParams = new URLSearchParams(window.location.search);
      const forcedState = urlParams.get('state'); // 'empty' or 'active' / 'saved'

      function getWishlist() {
        if (forcedState === 'empty') return [];
        if (forcedState === 'active' || forcedState === 'saved') {
          return ['red-floral-stud-earrings', 'valor-v-onyx-bracelet'];
        }
        let stored = JSON.parse(localStorage.getItem('oge_wishlist') || 'null');
        if (stored === null) {
          // Default initial items matching Screenshot 2 (active state with 2 items)
          stored = ['red-floral-stud-earrings', 'valor-v-onyx-bracelet'];
          localStorage.setItem('oge_wishlist', JSON.stringify(stored));
        }
        return stored;
      }

      function renderWishlist() {
        const wishlistHandles = getWishlist();
        const contentArea = document.getElementById('wishlist-content-area');
        const relatedSection = document.getElementById('wishlist-related-section');
        const relatedGrid = document.getElementById('related-products-grid');

        if (wishlistHandles.length === 0) {
          // ==========================================
          // STATE 1: WISHLIST EMPTY (Image 3 Reference)
          // ==========================================
          contentArea.innerHTML = `
            <div class="wishlist-empty-box">
              <h2 class="wishlist-empty-title">Nothing has been saved to your Wishlist</h2>
              <p class="wishlist-empty-desc">It looks like you haven't saved any items yet, why not check out our best sellers?</p>
              <a href="shop.html" class="wishlist-empty-btn">Shop</a>
            </div>
          `;

          // Show YOU MAY ALSO LIKE
          relatedSection.style.display = 'block';

          if (relatedGrid && window.OGE_CATALOG) {
            const related = [
              window.OGE_CATALOG.find(p => p.handle === 'valor-v-onyx-bracelet'),
              window.OGE_CATALOG.find(p => p.handle === 'van-dorr-bracelet'),
              window.OGE_CATALOG.find(p => p.handle === 'valor-bracelet-white-gold'),
              window.OGE_CATALOG.find(p => p.handle === 'red-floral-stud-earrings')
            ].filter(Boolean);

            relatedGrid.innerHTML = related.map(function(p) {
              const variantLabel = (p.variants && p.variants[0] && p.variants[0].finish) ? p.variants[0].finish : (p.metal && p.metal.toLowerCase().includes('silver') ? 'Silver' : 'Gold');
              return `
                <article class="product-card" data-product-handle="${p.handle}">
                  <div class="product-card__media">
                    ${p.isNew ? '<span class="product-card__badge-new">New</span>' : ''}
                    <button type="button" class="product-card__wishlist-btn" data-wishlist-btn data-product-handle="${p.handle}" aria-label="Add ${p.title} to Wishlist">
                      <svg class="icon icon-heart" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" width="20" height="20">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                      </svg>
                    </button>
                    <a href="product.html?handle=${p.handle}" class="product-card__image-link">
                      <img src="assets/${p.images[0]}" alt="${p.title}" class="product-card__img-primary" loading="lazy" width="600" height="720">
                      ${p.images[1] ? `<img src="assets/${p.images[1]}" alt="${p.title}" class="product-card__img-secondary" loading="lazy" width="600" height="720">` : ''}
                    </a>
                    <button type="button" class="product-card__add-btn" data-quick-add data-product-title="${p.title}" data-product-price="${p.price}" data-product-img="assets/${p.images[0]}" data-product-variant="${variantLabel}" data-product-handle="${p.handle}" aria-label="Quick Add ${p.title}">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" width="16" height="16">
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                      </svg>
                    </button>
                  </div>
                  <div class="product-card__info">
                    <h3 class="product-card__title"><a href="product.html?handle=${p.handle}">${p.title}</a></h3>
                    <p class="product-card__material">${variantLabel}</p>
                    <div class="product-card__price">
                      <span class="product-card__current-price">$${p.price}</span>
                      ${p.compareAtPrice ? `<span class="product-card__compare-price">$${p.compareAtPrice}</span>` : ''}
                    </div>
                  </div>
                </article>
              `;
            }).join('');

            const prevBtn = document.getElementById('related-prev');
            const nextBtn = document.getElementById('related-next');
            if (prevBtn && nextBtn) {
              prevBtn.onclick = () => relatedGrid.scrollBy({ left: -320, behavior: 'smooth' });
              nextBtn.onclick = () => relatedGrid.scrollBy({ left: 320, behavior: 'smooth' });
            }
          }
        } else {
          // ==========================================
          // STATE 2: WISHLIST ACTIVE (Image 2 Reference)
          // ==========================================
          relatedSection.style.display = 'none';

          const products = wishlistHandles.map(h => window.OGE_CATALOG.find(p => p.handle === h || p.id === h)).filter(Boolean);

          contentArea.innerHTML = `
            <div class="wishlist-active-bar">
              <span class="wishlist-saved-count">Your saved items (${products.length})</span>
              <div class="wishlist-view-switchers" aria-label="Grid Density">
                <button type="button" class="wishlist-view-btn" data-cols="1" aria-label="Single column view" title="Single Column View">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" width="16" height="16"><rect x="4" y="4" width="16" height="16" rx="1"></rect></svg>
                </button>
                <button type="button" class="wishlist-view-btn is-active" data-cols="4" aria-label="Grid view" title="Grid View">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" width="16" height="16"><rect x="3" y="3" width="8" height="18" rx="1"></rect><rect x="13" y="3" width="8" height="18" rx="1"></rect></svg>
                </button>
              </div>
            </div>
            <div class="wishlist-grid-wrap" id="wishlist-grid">
              ${products.map(p => {
                const variantLabel = (p.variants && p.variants[0] && p.variants[0].finish) ? p.variants[0].finish : (p.metal && p.metal.toLowerCase().includes('silver') ? 'Silver' : 'Gold');
                return `
                  <article class="product-card" data-product-handle="${p.handle}">
                    <div class="product-card__media">
                      ${p.isNew ? '<span class="product-card__badge-new">New</span>' : ''}
                      <button type="button" class="product-card__wishlist-btn is-active" data-remove-wishlist="${p.handle}" aria-label="Remove ${p.title} from Wishlist" title="Remove from Wishlist">
                        <svg class="icon icon-heart" viewBox="0 0 24 24" fill="none" stroke="#111111" stroke-width="1.3" width="20" height="20">
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                        </svg>
                      </button>
                      <a href="product.html?handle=${p.handle}" class="product-card__image-link">
                        <img src="assets/${p.images[0]}" alt="${p.title}" class="product-card__img-primary" loading="lazy" width="600" height="720">
                        ${p.images[1] ? `<img src="assets/${p.images[1]}" alt="${p.title}" class="product-card__img-secondary" loading="lazy" width="600" height="720">` : ''}
                      </a>
                      <button type="button" class="product-card__add-btn" data-quick-add data-product-title="${p.title}" data-product-price="${p.price}" data-product-img="assets/${p.images[0]}" data-product-variant="${variantLabel}" data-product-handle="${p.handle}" aria-label="Quick Add ${p.title}">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" width="16" height="16">
                          <line x1="12" y1="5" x2="12" y2="19"></line>
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                      </button>
                    </div>
                    <div class="product-card__info">
                      <h3 class="product-card__title"><a href="product.html?handle=${p.handle}">${p.title}</a></h3>
                      <p class="product-card__material">${variantLabel}</p>
                      <div class="product-card__price">
                        <span class="product-card__current-price">$${p.price}</span>
                        ${p.compareAtPrice ? `<span class="product-card__compare-price">$${p.compareAtPrice}</span>` : ''}
                      </div>
                    </div>
                  </article>
                `;
              }).join('')}
            </div>
          `;

          // Handle removal
          contentArea.querySelectorAll('[data-remove-wishlist]').forEach(btn => {
            btn.addEventListener('click', function(e) {
              e.preventDefault();
              const h = btn.getAttribute('data-remove-wishlist');
              let current = getWishlist().filter(item => item !== h);
              localStorage.setItem('oge_wishlist', JSON.stringify(current));
              renderWishlist();
            });
          });

          // Handle density toggle
          contentArea.querySelectorAll('.wishlist-view-btn').forEach(btn => {
            btn.addEventListener('click', function() {
              contentArea.querySelectorAll('.wishlist-view-btn').forEach(b => b.classList.remove('is-active'));
              btn.classList.add('is-active');
              const cols = btn.dataset.cols;
              const grid = document.getElementById('wishlist-grid');
              if (grid) {
                if (cols === '1') {
                  grid.classList.add('wishlist-grid-wrap--1-col');
                } else {
                  grid.classList.remove('wishlist-grid-wrap--1-col');
                }
              }
            });
          });
        }
      }

      renderWishlist();
    });
  </script>"""

w_html = re.sub(r'<!-- Dynamic Wishlist Page Script[\s\S]*?</script>', new_script, w_html)

with open('wishlist.html', 'w', encoding='utf-8') as f:
    f.write(w_html)

print("Updated wishlist.html successfully")
