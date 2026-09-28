const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');

const mainAndFooterHtml = `  <main id="MainContent" role="main">

    <!-- =========================================================================
         SECTION 1: HERO BANNER
         ========================================================================= -->
    <section class="hero-banner" id="hero">
      <div class="hero-banner__image-wrap">
        <img src="assets/hero.jpg" alt="OGÉ Fine Jewelry Campaign" class="hero-banner__image" loading="eager" width="2000" height="1200">
        <div class="hero-banner__overlay"></div>
      </div>
      <div class="page-container" style="position: relative; z-index: 2; width: 100%;">
        <div class="hero-banner__content">
          <div class="hero-banner__eyebrow">NEW IN COLLECTION</div>
          <h1 class="hero-banner__title">TIMELESS ELEGANCE</h1>
          <p class="hero-banner__text">Discover intentional fine jewelry created for the modern woman who honors her inner authority.</p>
          <div class="hero-banner__actions">
            <a href="category.html?type=new" class="btn btn-primary" style="background: #FFFFFF; color: #000000; border-color: #FFFFFF;">Shop New In</a>
            <a href="about.html" class="btn btn-secondary" style="color: #FFFFFF; border-color: #FFFFFF;">Our Story</a>
          </div>
        </div>
      </div>
    </section>

    <!-- =========================================================================
         SECTION 2: NEW ARRIVALS
         ========================================================================= -->
    <section class="featured-collection-section" style="padding: 60px 0 40px; background-color: #FFFFFF;" id="new-arrivals">
      <div class="page-container">
        <div class="section-header section-header__with-counter">
          <h2 class="section-header__title">NEW ARRIVALS</h2>
          <div class="section-counter">01/05</div>
        </div>

        <div class="products-grid products-grid--mobile-scroll">
          <!-- Card 1 (Cutout in front, model on hover) -->
          <article class="product-card" data-product-handle="aurelia-earrings">
            <div class="product-card__media">
              <span class="product-card__badge-new">New</span>
              <button type="button" class="product-card__wishlist-btn" data-wishlist-btn data-product-handle="aurelia-earrings" aria-label="Add Aurelia Earrings to Wishlist">
                <svg class="icon icon-heart" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" width="20" height="20">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
              </button>
              <a href="product.html?handle=aurelia-earrings" class="product-card__image-link">
                <img src="assets/product1.png" alt="Aurelia Earrings" class="product-card__img-primary" loading="lazy" width="600" height="720">
                <img src="assets/earring-category.jpg" alt="Aurelia Earrings on Model" class="product-card__img-secondary" loading="lazy" width="600" height="720">
              </a>
              <button type="button" class="product-card__add-btn" data-quick-add data-product-handle="aurelia-earrings" data-product-title="Aurelia Earrings" data-product-price="140" data-product-img="assets/product1.png" aria-label="Quick Add Aurelia Earrings">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" width="16" height="16"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
              </button>
            </div>
            <div class="product-card__info">
              <h3 class="product-card__title"><a href="product.html?handle=aurelia-earrings">Aurelia Earrings</a></h3>
              <p class="product-card__material">18K Gold Vermeil</p>
              <div class="product-card__price">
                <span class="product-card__current-price" data-price-usd="140">$140</span>
              </div>
            </div>
          </article>

          <!-- Card 2 (Cutout in front, model on hover) -->
          <article class="product-card" data-product-handle="valor-stud-earrings">
            <div class="product-card__media">
              <span class="product-card__badge-new">New</span>
              <button type="button" class="product-card__wishlist-btn" data-wishlist-btn data-product-handle="valor-stud-earrings" aria-label="Add Red Clover Stud Earrings to Wishlist">
                <svg class="icon icon-heart" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" width="20" height="20">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
              </button>
              <a href="product.html?handle=valor-stud-earrings" class="product-card__image-link">
                <img src="assets/product2.png" alt="Red Clover Stud Earrings" class="product-card__img-primary" loading="lazy" width="600" height="720">
                <img src="assets/product-earrings-1.jpg" alt="Red Clover Stud Earrings on Model" class="product-card__img-secondary" loading="lazy" width="600" height="720">
              </a>
              <button type="button" class="product-card__add-btn" data-quick-add data-product-handle="valor-stud-earrings" data-product-title="Red Clover Stud Earrings" data-product-price="95" data-product-img="assets/product2.png" aria-label="Quick Add Red Clover Stud Earrings">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" width="16" height="16"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
              </button>
            </div>
            <div class="product-card__info">
              <h3 class="product-card__title"><a href="product.html?handle=valor-stud-earrings">Red Clover Stud Earrings</a></h3>
              <p class="product-card__material">18K Gold Vermeil &amp; Carnelian</p>
              <div class="product-card__price">
                <span class="product-card__current-price" data-price-usd="95">$95</span>
              </div>
            </div>
          </article>

          <!-- Card 3 (3rd Card Rule: MODEL WEARING IT IN FRONT, cutout on hover!) -->
          <article class="product-card" data-product-handle="valor-necklace">
            <div class="product-card__media">
              <span class="product-card__badge-new">New</span>
              <button type="button" class="product-card__wishlist-btn" data-wishlist-btn data-product-handle="valor-necklace" aria-label="Add Valor V Onyx Necklace to Wishlist">
                <svg class="icon icon-heart" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" width="20" height="20">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
              </button>
              <a href="product.html?handle=valor-necklace" class="product-card__image-link">
                <img src="assets/necklace-category.jpg" alt="Valor V Onyx Necklace on Model" class="product-card__img-primary" loading="lazy" width="600" height="720">
                <img src="assets/product3.jpg" alt="Valor V Onyx Necklace" class="product-card__img-secondary" loading="lazy" width="600" height="720">
              </a>
              <button type="button" class="product-card__add-btn" data-quick-add data-product-handle="valor-necklace" data-product-title="Valor V Onyx Necklace" data-product-price="185" data-product-img="assets/product3.jpg" aria-label="Quick Add Valor V Onyx Necklace">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" width="16" height="16"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
              </button>
            </div>
            <div class="product-card__info">
              <h3 class="product-card__title"><a href="product.html?handle=valor-necklace">Valor V Onyx Necklace</a></h3>
              <p class="product-card__material">18K Gold Vermeil &amp; Black Onyx</p>
              <div class="product-card__price">
                <span class="product-card__current-price" data-price-usd="185">$185</span>
              </div>
            </div>
          </article>

          <!-- Card 4 (Cutout in front, model on hover) -->
          <article class="product-card" data-product-handle="boundaries-ring">
            <div class="product-card__media">
              <button type="button" class="product-card__wishlist-btn" data-wishlist-btn data-product-handle="boundaries-ring" aria-label="Add Valor Ring to Wishlist">
                <svg class="icon icon-heart" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" width="20" height="20">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
              </button>
              <a href="product.html?handle=boundaries-ring" class="product-card__image-link">
                <img src="assets/product4.png" alt="Valor Ring" class="product-card__img-primary" loading="lazy" width="600" height="720">
                <img src="assets/product-ring-1.jpg" alt="Valor Ring on Model" class="product-card__img-secondary" loading="lazy" width="600" height="720">
              </a>
              <button type="button" class="product-card__add-btn" data-quick-add data-product-handle="boundaries-ring" data-product-title="Valor Ring" data-product-price="110" data-product-img="assets/product4.png" aria-label="Quick Add Valor Ring">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" width="16" height="16"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
              </button>
            </div>
            <div class="product-card__info">
              <h3 class="product-card__title"><a href="product.html?handle=boundaries-ring">Valor Ring</a></h3>
              <p class="product-card__material">Sterling Silver</p>
              <div class="product-card__price">
                <span class="product-card__current-price" data-price-usd="110">$110</span>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- =========================================================================
         SECTION 3: SHOP BY CATEGORY (BENTO GRID)
         ========================================================================= -->
    <section class="category-bento-section" style="padding: 20px 0 40px; background-color: #FFFFFF;">
      <div class="page-container">
        <div class="section-header">
          <h2 class="section-header__title">SHOP BY CATEGORY</h2>
        </div>
        <div class="category-bento-grid">
          <!-- Left Large Bento: Necklaces -->
          <a href="category.html?type=necklaces" class="category-bento-left">
            <img src="assets/necklace-category.jpg" alt="Necklaces Fine Jewelry" loading="lazy" width="800" height="960">
            <div class="category-bento__overlay">
              <h3 class="category-bento__title">NECKLACE</h3>
              <span class="category-bento__link">Shop now</span>
            </div>
          </a>

          <!-- Right Stacked Bento: Rings & Earrings -->
          <div class="category-bento-right">
            <a href="category.html?type=rings" class="category-bento-card">
              <img src="assets/rings-category.jpg" alt="Rings Fine Jewelry" loading="lazy" width="800" height="450">
              <div class="category-bento__overlay">
                <h3 class="category-bento__title">RINGS</h3>
                <span class="category-bento__link">Shop now</span>
              </div>
            </a>
            <a href="category.html?type=earrings" class="category-bento-card">
              <img src="assets/earring-category.jpg" alt="Earrings Fine Jewelry" loading="lazy" width="800" height="450">
              <div class="category-bento__overlay">
                <h3 class="category-bento__title">EARRING</h3>
                <span class="category-bento__link">Shop now</span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- =========================================================================
         SECTION 4: TWO LANDSCAPE COLLECTION BANNERS (EXACT FIGMA MATCH)
         ========================================================================= -->
    <section style="padding: 10px 0 40px; background-color: #FFFFFF;">
      <div class="page-container">
        <div class="two-landscape-banners">
          <a href="collection.html?collection=victorious" class="landscape-banner-card">
            <img src="assets/Victorious-collection.jpg" alt="Victoria's Collection" loading="lazy" width="800" height="450">
            <div class="landscape-banner-card__overlay">
              <h3 class="landscape-banner-card__title">VICTORIA’S COLLECTION</h3>
              <span class="landscape-banner-card__link">Shop now</span>
            </div>
          </a>
          <a href="collection.html?collection=alignment" class="landscape-banner-card">
            <img src="assets/alignment-collection.jpg" alt="The Alignment Collection" loading="lazy" width="800" height="450">
            <div class="landscape-banner-card__overlay">
              <h3 class="landscape-banner-card__title">THE ALIGNMENT COLLECTION</h3>
              <span class="landscape-banner-card__link">Shop now</span>
            </div>
          </a>
        </div>
      </div>
    </section>

    <!-- =========================================================================
         SECTION 5: BEST SELLERS
         ========================================================================= -->
    <section class="featured-collection-section" style="padding: 20px 0 40px; background-color: #FFFFFF;" id="best-sellers">
      <div class="page-container">
        <div class="section-header section-header__with-counter">
          <h2 class="section-header__title">BEST SELLERS</h2>
          <div class="section-counter">01/05</div>
        </div>

        <div class="products-grid products-grid--mobile-scroll">
          <!-- Card 1 (Cutout in front, model on hover) -->
          <article class="product-card" data-product-handle="ring-havoc">
            <div class="product-card__media">
              <span class="product-card__badge-new">New</span>
              <button type="button" class="product-card__wishlist-btn" data-wishlist-btn data-product-handle="ring-havoc" aria-label="Add Havoc Ring to Wishlist">
                <svg class="icon icon-heart" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" width="20" height="20">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
              </button>
              <a href="product.html?handle=ring-havoc" class="product-card__image-link">
                <img src="assets/product4.png" alt="Havoc Ring" class="product-card__img-primary" loading="lazy" width="600" height="720">
                <img src="assets/product-ring-1.jpg" alt="Havoc Ring on Model" class="product-card__img-secondary" loading="lazy" width="600" height="720">
              </a>
              <button type="button" class="product-card__add-btn" data-quick-add data-product-handle="ring-havoc" data-product-title="Havoc Ring" data-product-price="92" data-product-img="assets/product4.png" aria-label="Quick Add Havoc Ring">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" width="16" height="16"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
              </button>
            </div>
            <div class="product-card__info">
              <h3 class="product-card__title"><a href="product.html?handle=ring-havoc">Havoc Ring</a></h3>
              <p class="product-card__material">18K Gold Vermeil &amp; MOP</p>
              <div class="product-card__price">
                <span class="product-card__current-price" data-price-usd="92">$92</span>
              </div>
            </div>
          </article>

          <!-- Card 2 (Cutout in front, model on hover) -->
          <article class="product-card" data-product-handle="valor-v-onyx-bracelet">
            <div class="product-card__media">
              <span class="product-card__badge-new">New</span>
              <button type="button" class="product-card__wishlist-btn" data-wishlist-btn data-product-handle="valor-v-onyx-bracelet" aria-label="Add Valor V Onyx Bracelet to Wishlist">
                <svg class="icon icon-heart" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" width="20" height="20">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
              </button>
              <a href="product.html?handle=valor-v-onyx-bracelet" class="product-card__image-link">
                <img src="assets/product5.png" alt="Valor V Onyx Bracelet" class="product-card__img-primary" loading="lazy" width="600" height="720">
                <img src="assets/product-bracelet-1.jpg" alt="Valor V Onyx Bracelet on Model" class="product-card__img-secondary" loading="lazy" width="600" height="720">
              </a>
              <button type="button" class="product-card__add-btn" data-quick-add data-product-handle="valor-v-onyx-bracelet" data-product-title="Valor V Onyx Bracelet" data-product-price="92" data-product-img="assets/product5.png" aria-label="Quick Add Valor V Onyx Bracelet">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" width="16" height="16"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
              </button>
            </div>
            <div class="product-card__info">
              <h3 class="product-card__title"><a href="product.html?handle=valor-v-onyx-bracelet">Valor V Onyx Bracelet</a></h3>
              <p class="product-card__material">18K Gold Vermeil &amp; Black Onyx</p>
              <div class="product-card__price">
                <span class="product-card__current-price" data-price-usd="92">$92</span>
              </div>
            </div>
          </article>

          <!-- Card 3 (3rd Card Rule: MODEL WEARING IT IN FRONT, cutout on hover!) -->
          <article class="product-card" data-product-handle="valor-necklace-white-gold">
            <div class="product-card__media">
              <span class="product-card__badge-new">New</span>
              <button type="button" class="product-card__wishlist-btn" data-wishlist-btn data-product-handle="valor-necklace-white-gold" aria-label="Add Valor Necklace to Wishlist">
                <svg class="icon icon-heart" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" width="20" height="20">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
              </button>
              <a href="product.html?handle=valor-necklace-white-gold" class="product-card__image-link">
                <img src="assets/product7.jpg" alt="Valor Necklace on Model" class="product-card__img-primary" loading="lazy" width="600" height="720">
                <img src="assets/product6.png" alt="Valor Necklace" class="product-card__img-secondary" loading="lazy" width="600" height="720">
              </a>
              <button type="button" class="product-card__add-btn" data-quick-add data-product-handle="valor-necklace-white-gold" data-product-title="Valor Necklace" data-product-price="185" data-product-img="assets/product7.jpg" aria-label="Quick Add Valor Necklace">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" width="16" height="16"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
              </button>
            </div>
            <div class="product-card__info">
              <h3 class="product-card__title"><a href="product.html?handle=valor-necklace-white-gold">Valor Necklace</a></h3>
              <p class="product-card__material">18K Gold Vermeil</p>
              <div class="product-card__price">
                <span class="product-card__current-price" data-price-usd="185">$185</span>
              </div>
            </div>
          </article>

          <!-- Card 4 (Cutout in front, model on hover) -->
          <article class="product-card" data-product-handle="ala-ring">
            <div class="product-card__media">
              <button type="button" class="product-card__wishlist-btn" data-wishlist-btn data-product-handle="ala-ring" aria-label="Add Ala Ring to Wishlist">
                <svg class="icon icon-heart" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" width="20" height="20">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
              </button>
              <a href="product.html?handle=ala-ring" class="product-card__image-link">
                <img src="assets/product8.png" alt="Ala Ring" class="product-card__img-primary" loading="lazy" width="600" height="720">
                <img src="assets/ear.jpg" alt="Ala Ring on Model" class="product-card__img-secondary" loading="lazy" width="600" height="720">
              </a>
              <button type="button" class="product-card__add-btn" data-quick-add data-product-handle="ala-ring" data-product-title="Ala Ring" data-product-price="135" data-product-img="assets/product8.png" aria-label="Quick Add Ala Ring">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" width="16" height="16"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
              </button>
            </div>
            <div class="product-card__info">
              <h3 class="product-card__title"><a href="product.html?handle=ala-ring">Ala Ring</a></h3>
              <p class="product-card__material">18K Gold Vermeil &amp; Peridot</p>
              <div class="product-card__price">
                <span class="product-card__current-price" data-price-usd="135">$135</span>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- =========================================================================
         SECTION 6: TWO TALL COLLECTION BANNERS (EXACT FIGMA MATCH)
         ========================================================================= -->
    <section style="padding: 10px 0 40px; background-color: #FFFFFF;">
      <div class="page-container">
        <div class="two-tall-banners">
          <a href="collection.html?collection=boundaries" class="tall-banner-card">
            <img src="assets/Boundaries-collection.jpg" alt="Bondry Collection" loading="lazy" width="800" height="1000">
            <div class="tall-banner-card__overlay">
              <h3 class="tall-banner-card__title">BONDRY COLLECTION</h3>
              <span class="tall-banner-card__link">Shop now</span>
            </div>
          </a>
          <a href="collection.html?collection=rebirth" class="tall-banner-card">
            <img src="assets/Rebirth-collection.jpg" alt="Rebirth Collection" loading="lazy" width="800" height="1000">
            <div class="tall-banner-card__overlay">
              <h3 class="tall-banner-card__title">REBIRTH COLLECTION</h3>
              <span class="tall-banner-card__link">Shop now</span>
            </div>
          </a>
        </div>
      </div>
    </section>

    <!-- =========================================================================
         SECTION 7: BRAND STORY EDITORIAL (THE ESSENCE OF OGÉ JEWELRY)
         ========================================================================= -->
    <section class="essence-section">
      <div class="page-container">
        <div class="essence-grid">
          <div class="essence-media">
            <img src="assets/SelfRomance-collection.jpg" alt="The Essence of OGÉ Jewelry" loading="lazy" width="800" height="1000">
          </div>
          <div class="essence-content">
            <h2 class="essence-title">THE ESSENCE OF OGÉ JEWELRY</h2>
            <p class="essence-text">
              OGÉ Jewelry began with a love for accessories and their transformative power. More than adornment, jewelry shapes identity, commands space, and communicates intentional presence without saying a word.
            </p>
            <p class="essence-text">
              Designed from a place of self-trust, emotional clarity, and disciplined grace, our pieces empower women to lead from within. When you wear OGÉ, you carry an enduring reminder of your quiet authority.
            </p>
            <a href="about.html" class="essence-link">Discover Our Story</a>
          </div>
        </div>
      </div>
    </section>

    <!-- =========================================================================
         SECTION 8: TESTIMONIALS (WHAT OUR CLIENTS SAY)
         ========================================================================= -->
    <section class="testimonials-section" style="padding: 60px 0; background-color: #FAF8F5;">
      <div class="page-container">
        <div class="section-header" style="text-align: center; margin-bottom: 40px;">
          <h2 class="section-header__title" style="letter-spacing: 0.1em;">WHAT OUR CLIENTS SAY</h2>
        </div>
        <div class="testimonials-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 24px;">
          <div class="testimonial-card" style="background: #FFFFFF; padding: 32px 24px; border-radius: 4px; border: 1px solid #ECECEC;">
            <div class="testimonial-stars" style="color: #FFD569; font-size: 1.1rem; margin-bottom: 12px;">★★★★★</div>
            <p class="testimonial-quote" style="font-size: 0.875rem; line-height: 1.6; color: #222; margin-bottom: 16px;">"The weight, luster, and emotional significance of the Boundaries Ring is breathtaking. It feels like wearing an intimate piece of art."</p>
            <span class="testimonial-author" style="font-size: 0.8125rem; font-weight: 600; color: #666;">— Sarah M.</span>
          </div>
          <div class="testimonial-card" style="background: #FFFFFF; padding: 32px 24px; border-radius: 4px; border: 1px solid #ECECEC;">
            <div class="testimonial-stars" style="color: #FFD569; font-size: 1.1rem; margin-bottom: 12px;">★★★★★</div>
            <p class="testimonial-quote" style="font-size: 0.875rem; line-height: 1.6; color: #222; margin-bottom: 16px;">"Unparalleled craftsmanship. The Onyx bracelet hasn't left my wrist since the package arrived. OGÉ has set a new standard in modern fine jewelry."</p>
            <span class="testimonial-author" style="font-size: 0.8125rem; font-weight: 600; color: #666;">— Abigail T.</span>
          </div>
          <div class="testimonial-card" style="background: #FFFFFF; padding: 32px 24px; border-radius: 4px; border: 1px solid #ECECEC;">
            <div class="testimonial-stars" style="color: #FFD569; font-size: 1.1rem; margin-bottom: 12px;">★★★★★</div>
            <p class="testimonial-quote" style="font-size: 0.875rem; line-height: 1.6; color: #222; margin-bottom: 16px;">"The gold vermeil luster is truly extraordinary. Every piece I own has received compliments from colleagues and friends."</p>
            <span class="testimonial-author" style="font-size: 0.8125rem; font-weight: 600; color: #666;">— Elena R.</span>
          </div>
          <div class="testimonial-card" style="background: #FFFFFF; padding: 32px 24px; border-radius: 4px; border: 1px solid #ECECEC;">
            <div class="testimonial-stars" style="color: #FFD569; font-size: 1.1rem; margin-bottom: 12px;">★★★★★</div>
            <p class="testimonial-quote" style="font-size: 0.875rem; line-height: 1.6; color: #222; margin-bottom: 16px;">"From the presentation box to the jewelry itself, the experience is unmatched. Truly heirloom quality."</p>
            <span class="testimonial-author" style="font-size: 0.8125rem; font-weight: 600; color: #666;">— Chloe W.</span>
          </div>
        </div>
      </div>
    </section>

    <!-- =========================================================================
         SECTION 9: AS SEEN ON YOU (UGC VIDEO CAROUSEL)
         ========================================================================= -->
    <section class="ugc-section">
      <div class="page-container">
        <div class="section-header" style="margin-bottom: 32px;">
          <h2 class="section-header__title" style="letter-spacing: 0.1em;">AS SEEN ON YOU</h2>
        </div>
        <div class="ugc-grid">
          <div class="ugc-card">
            <img src="assets/sales1.jpg" alt="OGÉ Client Styling Reel 1" loading="lazy" width="400" height="533">
            <div class="play-circle-btn" aria-label="Play Video" onclick="alert('Opening OGÉ Campaign Video');">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><polygon points="8 5 19 12 8 19 8 5"/></svg>
            </div>
          </div>
          <div class="ugc-card">
            <img src="assets/sales2.jpg" alt="OGÉ Client Styling Reel 2" loading="lazy" width="400" height="533">
            <div class="play-circle-btn" aria-label="Play Video" onclick="alert('Opening OGÉ Campaign Video');">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><polygon points="8 5 19 12 8 19 8 5"/></svg>
            </div>
          </div>
          <div class="ugc-card">
            <img src="assets/hero-banner.jpg" alt="OGÉ Client Styling Reel 3" loading="lazy" width="400" height="533">
            <div class="play-circle-btn" aria-label="Play Video" onclick="alert('Opening OGÉ Campaign Video');">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><polygon points="8 5 19 12 8 19 8 5"/></svg>
            </div>
          </div>
        </div>
        <a href="https://instagram.com" target="_blank" rel="noopener" class="ugc-follow-btn">FOLLOW ON TIKTOK / INSTAGRAM</a>
      </div>
    </section>

    <!-- =========================================================================
         SECTION 10: WIDE CAMPAIGN VIDEO BANNER
         ========================================================================= -->
    <div class="campaign-video-banner">
      <img src="assets/hero.jpg" alt="OGÉ Campaign Feature" loading="lazy" width="1800" height="770">
      <div class="play-circle-btn" style="width: 64px; height: 64px;" aria-label="Play Campaign Film" onclick="alert('Opening OGÉ Brand Film');">
        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><polygon points="8 5 19 12 8 19 8 5"/></svg>
      </div>
    </div>

    <!-- =========================================================================
         SECTION 11: BEHIND THE SCENES
         ========================================================================= -->
    <section class="behind-scenes-section">
      <div class="page-container">
        <div class="section-header section-header__with-counter">
          <h2 class="section-header__title">BEHIND THE SCENES</h2>
          <div class="section-counter">01/03</div>
        </div>
        <div class="behind-scenes-grid">
          <article class="behind-scenes-card">
            <div class="behind-scenes-media">
              <img src="assets/blog1.jpg" alt="How each piece comes to life" loading="lazy" width="600" height="450">
            </div>
            <h3 class="behind-scenes-title">How each piece comes to life at the atelier</h3>
            <p class="behind-scenes-desc">From initial hand sketches to master stone setting, discover the deliberate craftsmanship behind every curve and contour.</p>
            <a href="about.html" class="behind-scenes-link">Read More</a>
          </article>

          <article class="behind-scenes-card">
            <div class="behind-scenes-media">
              <img src="assets/blog2.jpg" alt="Inside our stone sourcing and vermeil process" loading="lazy" width="600" height="450">
            </div>
            <h3 class="behind-scenes-title">Inside our gemstone sourcing &amp; 18K vermeil plating</h3>
            <p class="behind-scenes-desc">We work exclusively with ethical gem cutters and layer 18K solid gold over 925 sterling silver for enduring brilliance.</p>
            <a href="about.html" class="behind-scenes-link">Read More</a>
          </article>

          <article class="behind-scenes-card">
            <div class="behind-scenes-media">
              <img src="assets/blog3.jpg" alt="Behind the new campaign" loading="lazy" width="600" height="450">
            </div>
            <h3 class="behind-scenes-title">Behind the new campaign: Sculpted hair &amp; inner strength</h3>
            <p class="behind-scenes-desc">Exploring the cultural dialogues, crowns, and personal power that inspired the visual world of our newest collection.</p>
            <a href="about.html" class="behind-scenes-link">Read More</a>
          </article>
        </div>
      </div>
    </section>

    <!-- =========================================================================
         SECTION 12: FAQS ACCORDION
         ========================================================================= -->
    <section class="faq-section" style="padding: 60px 0; background-color: #FAF8F5;" id="faqs">
      <div class="page-container">
        <div class="section-header" style="text-align: center; margin-bottom: 40px;">
          <h2 class="section-header__title">FREQUENTLY ASKED QUESTIONS</h2>
        </div>
        <div class="faq-accordion-list" style="max-width: 800px; margin: 0 auto;">
          <details class="faq-item" style="border-bottom: 1px solid #ECECEC; padding: 18px 0;">
            <summary class="faq-item__question" style="font-family: var(--font-body); font-size: 0.9375rem; font-weight: 600; cursor: pointer; display: flex; justify-content: space-between; align-items: center; color: #111;">
              Where are OGÉ pieces manufactured?
              <span style="font-size: 1.2rem; font-weight: 300;">+</span>
            </summary>
            <div class="faq-item__answer" style="padding-top: 12px; font-size: 0.875rem; color: #555; line-height: 1.6;">
              <p>OGÉ Fine Jewelry pieces are meticulously handcrafted by master artisans specializing in fine jewelry forging, precision micro-pave setting, and heirloom gold layering.</p>
            </div>
          </details>

          <details class="faq-item" style="border-bottom: 1px solid #ECECEC; padding: 18px 0;">
            <summary class="faq-item__question" style="font-family: var(--font-body); font-size: 0.9375rem; font-weight: 600; cursor: pointer; display: flex; justify-content: space-between; align-items: center; color: #111;">
              What materials do you use?
              <span style="font-size: 1.2rem; font-weight: 300;">+</span>
            </summary>
            <div class="faq-item__answer" style="padding-top: 12px; font-size: 0.875rem; color: #555; line-height: 1.6;">
              <p>We work with thick 18K gold vermeil (layered heavily over solid 925 sterling silver), genuine black onyx, natural white mother of pearl, vivid green peridot, and scratch-resistant jewelry enamel.</p>
            </div>
          </details>

          <details class="faq-item" style="border-bottom: 1px solid #ECECEC; padding: 18px 0;">
            <summary class="faq-item__question" style="font-family: var(--font-body); font-size: 0.9375rem; font-weight: 600; cursor: pointer; display: flex; justify-content: space-between; align-items: center; color: #111;">
              How do I care for my jewelry?
              <span style="font-size: 1.2rem; font-weight: 300;">+</span>
            </summary>
            <div class="faq-item__answer" style="padding-top: 12px; font-size: 0.875rem; color: #555; line-height: 1.6;">
              <p>Keep your pieces away from lotions, harsh chemicals, and perfumes. Remove before bathing or swimming, and wipe gently with the soft microfiber cloth provided in your OGÉ presentation box.</p>
            </div>
          </details>

          <details class="faq-item" style="border-bottom: 1px solid #ECECEC; padding: 18px 0;">
            <summary class="faq-item__question" style="font-family: var(--font-body); font-size: 0.9375rem; font-weight: 600; cursor: pointer; display: flex; justify-content: space-between; align-items: center; color: #111;">
              Do you ship internationally?
              <span style="font-size: 1.2rem; font-weight: 300;">+</span>
            </summary>
            <div class="faq-item__answer" style="padding-top: 12px; font-size: 0.875rem; color: #555; line-height: 1.6;">
              <p>Yes, we offer fully insured express courier shipping worldwide with signature confirmation. Full tracking is sent to your email upon dispatch.</p>
            </div>
          </details>

          <details class="faq-item" style="border-bottom: 1px solid #ECECEC; padding: 18px 0;">
            <summary class="faq-item__question" style="font-family: var(--font-body); font-size: 0.9375rem; font-weight: 600; cursor: pointer; display: flex; justify-content: space-between; align-items: center; color: #111;">
              What is your return policy?
              <span style="font-size: 1.2rem; font-weight: 300;">+</span>
            </summary>
            <div class="faq-item__answer" style="padding-top: 12px; font-size: 0.875rem; color: #555; line-height: 1.6;">
              <p>Eligible items may be returned within our return window in pristine, unworn condition with all original presentation packaging intact. Review our Shipping &amp; Returns page for full instructions.</p>
            </div>
          </details>
        </div>
      </div>
    </section>

  </main>

  <hr class="legal-page-divider" style="margin-top: 0;">

  <!-- =========================================================================
       16. UNIVERSAL SITE FOOTER (EXACT FIGMA 1:1 MATCH)
       ========================================================================= -->
  <footer class="site-footer">
    <div class="page-container">
      <div class="site-footer__main">
        <!-- Col 1: SHOP -->
        <div class="footer-col">
          <h4 class="footer-col__title">SHOP</h4>
          <nav class="footer-col__nav" aria-label="Shop Navigation">
            <a href="category.html?type=new" class="footer-col__link">New Arrivals</a>
            <a href="shop.html" class="footer-col__link">Best Sellers</a>
            <a href="collection.html?collection=victorious" class="footer-col__link">Victoria’s Collection</a>
            <a href="collection.html?collection=self-woman" class="footer-col__link">Self Woman’s Collection</a>
            <a href="collection.html?collection=boundaries" class="footer-col__link">Bondry Collection</a>
            <a href="collection.html?collection=rebirth" class="footer-col__link">Rebirth Collection</a>
            <a href="category.html?type=fine-jewelry" class="footer-col__link">Bundle Deals</a>
          </nav>
        </div>

        <!-- Col 2: DISCOVER -->
        <div class="footer-col">
          <h4 class="footer-col__title">DISCOVER</h4>
          <nav class="footer-col__nav" aria-label="Discover Navigation">
            <a href="about.html" class="footer-col__link">Our Story</a>
            <a href="contact.html" class="footer-col__link">Contact Us</a>
            <a href="#faqs" class="footer-col__link">FAQs</a>
          </nav>
        </div>

        <!-- Col 3: STAY IN THE OGE CIRCLE -->
        <div class="footer-col footer-col--newsletter">
          <h4 class="footer-col__title">STAY IN THE OGE CIRCLE</h4>
          <p class="footer-newsletter__text">
            Be the first to know about new collections, exclusive offers, and private launches.
          </p>
          <form class="footer-newsletter__form" onsubmit="event.preventDefault(); alert('Thank you for subscribing to the OGÉ Circle.');">
            <input type="email" class="footer-newsletter__input" placeholder="Enter your email" required aria-label="Email address for newsletter">
          </form>
        </div>
      </div>

      <!-- Footer Middle Bar: Payment Badges + Social Icons -->
      <div class="site-footer__middle">
        <div class="footer-payments" aria-label="Accepted Payment Methods">
          <!-- 1. Visa Debit / V -->
          <span class="payment-badge" title="Visa Debit">
            <svg viewBox="0 0 38 24" width="38" height="24"><rect width="38" height="24" rx="2" fill="#F4F4F4"/><text x="14" y="16" font-family="'DM Sans',sans-serif" font-weight="700" font-size="12" fill="#1A1F71">V</text></svg>
          </span>
          <!-- 2. Visa -->
          <span class="payment-badge" title="Visa">
            <svg viewBox="0 0 38 24" width="38" height="24"><rect width="38" height="24" rx="2" fill="#F4F4F4"/><text x="5" y="16" font-family="'DM Sans',sans-serif" font-weight="700" font-size="10" fill="#1A1F71">VISA</text></svg>
          </span>
          <!-- 3. Apple Pay -->
          <span class="payment-badge" title="Apple Pay">
            <svg viewBox="0 0 38 24" width="38" height="24"><rect width="38" height="24" rx="2" fill="#F4F4F4"/><text x="6" y="15" font-family="'DM Sans',sans-serif" font-weight="600" font-size="8.5" fill="#000000">Pay</text></svg>
          </span>
          <!-- 4. Diners -->
          <span class="payment-badge" title="Diners Club">
            <svg viewBox="0 0 38 24" width="38" height="24"><rect width="38" height="24" rx="2" fill="#F4F4F4"/><circle cx="15" cy="12" r="5" stroke="#333333" stroke-width="1.2" fill="none"/><circle cx="23" cy="12" r="5" stroke="#333333" stroke-width="1.2" fill="none"/></svg>
          </span>
          <!-- 5. Discover -->
          <span class="payment-badge" title="Discover">
            <svg viewBox="0 0 38 24" width="38" height="24"><rect width="38" height="24" rx="2" fill="#F4F4F4"/><text x="4" y="15" font-family="'DM Sans',sans-serif" font-weight="700" font-size="7" fill="#FF6000">DISCOVER</text></svg>
          </span>
          <!-- 6. Google Pay -->
          <span class="payment-badge" title="Google Pay">
            <svg viewBox="0 0 38 24" width="38" height="24"><rect width="38" height="24" rx="2" fill="#F4F4F4"/><text x="5" y="15" font-family="'DM Sans',sans-serif" font-weight="600" font-size="8.5" fill="#5F6368">G Pay</text></svg>
          </span>
          <!-- 7. Mastercard -->
          <span class="payment-badge" title="Mastercard">
            <svg viewBox="0 0 38 24" width="38" height="24"><rect width="38" height="24" rx="2" fill="#F4F4F4"/><circle cx="15" cy="12" r="6" fill="#EB001B"/><circle cx="23" cy="12" r="6" fill="#F79E1B" fill-opacity="0.85"/></svg>
          </span>
          <!-- 8. PayPal -->
          <span class="payment-badge" title="PayPal">
            <svg viewBox="0 0 38 24" width="38" height="24"><rect width="38" height="24" rx="2" fill="#F4F4F4"/><text x="5" y="16" font-family="'DM Sans',sans-serif" font-weight="700" font-size="9" fill="#003087">PayPal</text></svg>
          </span>
          <!-- 9. Shop Pay -->
          <span class="payment-badge" title="Shop Pay">
            <svg viewBox="0 0 38 24" width="38" height="24"><rect width="38" height="24" rx="2" fill="#5A31F4"/><text x="4" y="15" font-family="'DM Sans',sans-serif" font-weight="700" font-size="7.5" fill="#FFFFFF">shop Pay</text></svg>
          </span>
          <!-- 10. Interac -->
          <span class="payment-badge" title="Interac">
            <svg viewBox="0 0 38 24" width="38" height="24"><rect width="38" height="24" rx="2" fill="#E8B024"/><text x="4" y="15" font-family="'DM Sans',sans-serif" font-weight="700" font-size="7.5" fill="#000000">Interac</text></svg>
          </span>
        </div>

        <div class="footer-socials" aria-label="Social Media Links">
          <a href="https://facebook.com" target="_blank" rel="noopener" class="social-circle-btn" aria-label="Facebook">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
          </a>
          <a href="https://tiktok.com" target="_blank" rel="noopener" class="social-circle-btn" aria-label="TikTok">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5v3a8 8 0 0 1-5-1.7V16a8 8 0 1 1-8-8c.7 0 1.3.1 2 .3V12z"/></svg>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener" class="social-circle-btn" aria-label="Instagram">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
          </a>
          <a href="https://youtube.com" target="_blank" rel="noopener" class="social-circle-btn" aria-label="YouTube">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33zM9.75 15.02V8.48l5.75 3.27-5.75 3.27z"/></svg>
          </a>
        </div>
      </div>

      <!-- Footer Bottom Bar: Interactive Country/Currency Selector + Copyright + Legal Links -->
      <div class="site-footer__bottom">
        <div class="footer-region" data-country-trigger style="cursor: pointer;" title="Select Country &amp; Currency">
          <span class="region-badge">
            <span class="region-flag" data-country-display-flag>
              <svg viewBox="0 0 20 14" width="18" height="13" style="display:inline-block;vertical-align:middle;border-radius:2px;"><rect width="20" height="14" fill="#003399"/><circle cx="10" cy="7" r="4.2" fill="none" stroke="#FFCC00" stroke-width="1.2" stroke-dasharray="0.8 1.4"/></svg>
            </span>
            <span data-country-display-code>EU</span>
            <svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
          </span>
          <span class="footer-sep">&bull;</span>
          <span class="footer-copyright">&copy; 2026 Oge Jewlery. All Rights Reserved.</span>
        </div>

        <nav class="footer-legal" aria-label="Legal Links">
          <a href="privacy-policy.html" class="footer-legal__link">Privacy Policy</a>
          <span class="footer-legal__sep">&middot;</span>
          <a href="terms-conditions.html" class="footer-legal__link">Terms &amp; Conditions</a>
          <span class="footer-legal__sep">&middot;</span>
          <a href="shipping-returns.html" class="footer-legal__link">Shipping &amp; Returns</a>
        </nav>
      </div>
    </div>
  </footer>`;

// Read index.html up to main
const indexFile = path.join(rootDir, 'index.html');
const content = fs.readFileSync(indexFile, 'utf8');

const mainIndex = content.indexOf('<main');
const beforeMain = content.substring(0, mainIndex);

const newIndexHtml = beforeMain + mainAndFooterHtml + '\n\n</body>\n</html>\n';
fs.writeFileSync(indexFile, newIndexHtml, 'utf8');
console.log('Updated index.html');

// Also update preview/index.html
const previewIndexFile = path.join(rootDir, 'preview', 'index.html');
fs.writeFileSync(previewIndexFile, newIndexHtml, 'utf8');
console.log('Updated preview/index.html');
