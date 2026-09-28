import os

search_html_content = """<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title id="search-page-title">331 products found for &ldquo;gold earring&rdquo; — OGÉ Fine Jewelry</title>
  <meta name="description" content="Search results for fine luxury jewelry at OGÉ. Handcrafted gold and silver earrings, rings, necklaces, and bracelets.">
  <link rel="icon" type="image/png" href="assets/favicon.png">

  <!-- Google Fonts: DM Sans -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&display=swap" rel="stylesheet">

  <!-- Design Tokens, Typography & Theme Stylesheets -->
  <link rel="stylesheet" href="assets/base.css?v=5.0">
  <link rel="stylesheet" href="assets/theme.css?v=5.0">

  <script src="assets/catalog-data.js"></script>
  <script src="assets/theme.js?v=5.0" defer></script>
</head>
<body class="template-search" data-search-page>

  <!-- =========================================================================
       SEARCH RESULTS PAGE (EXACT FIGMA 1:1 MATCH TO UPLOADED MOCKUP)
       No announcement bar and no site header above search bar
       ========================================================================= -->

  <!-- Top Full-Width Search Input Bar -->
  <section class="search-page-bar-container">
    <form class="search-page-bar" id="search-page-form" onsubmit="event.preventDefault(); handleSearch();">
      <span class="search-page-bar__icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" width="20" height="20">
          <circle cx="11" cy="11" r="7.5"></circle>
          <line x1="21" y1="21" x2="16.5" y2="16.5"></line>
        </svg>
      </span>
      <input type="text" class="search-page-bar__input" id="search-page-input" value="gold earring" placeholder="What are you looking for?" aria-label="Search catalog">
      <button type="button" class="search-page-bar__clear" id="search-clear-btn" aria-label="Clear Search">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" width="18" height="18">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </form>
  </section>

  <!-- Centered Result Count -->
  <div class="search-page-meta">
    <p class="search-page-count" id="search-count">331 products found for &ldquo;gold earring&rdquo;</p>
  </div>

  <!-- 4-Column Product Catalog Grid -->
  <div class="search-page-products-wrap">
    <div class="collection-products-grid grid--4-col" id="search-grid">
      <!-- 8 items matching Image 1 -->
      
      <!-- Card 1 -->
      <article class="product-card">
        <div class="product-card__media">
          <button type="button" class="product-card__wishlist-btn" data-wishlist-btn data-product-handle="valor-v-onyx-bracelet" aria-label="Add Valor V Onyx Bracelet to Wishlist">
            <svg class="icon icon-heart" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" width="20" height="20">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </button>
          <a href="product.html?handle=valor-v-onyx-bracelet" class="product-card__image-link">
            <img src="assets/product1.png" alt="Valor V Onyx Bracelet" class="product-card__img-primary" loading="lazy" width="600" height="720">
          </a>
          <button type="button" class="product-card__add-btn" data-quick-add data-product-title="Valor V Onyx Bracelet" data-product-price="92" data-product-img="assets/product1.png" data-product-variant="Gold" data-product-handle="valor-v-onyx-bracelet" aria-label="Quick Add Valor V Onyx Bracelet">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" width="16" height="16">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </button>
        </div>
        <div class="product-card__info">
          <h3 class="product-card__title"><a href="product.html?handle=valor-v-onyx-bracelet">Valor V Onyx Bracelet</a></h3>
          <p class="product-card__material">Gold</p>
          <div class="product-card__price">
            <span class="product-card__current-price">$92</span>
          </div>
        </div>
      </article>

      <!-- Card 2 -->
      <article class="product-card">
        <div class="product-card__media">
          <button type="button" class="product-card__wishlist-btn" data-wishlist-btn data-product-handle="onyx-bracelet" aria-label="Add Onyx bracelet to Wishlist">
            <svg class="icon icon-heart" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" width="20" height="20">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </button>
          <a href="product.html?handle=onyx-bracelet" class="product-card__image-link">
            <img src="assets/product4.png" alt="Onyx bracelet" class="product-card__img-primary" loading="lazy" width="600" height="720">
          </a>
          <button type="button" class="product-card__add-btn" data-quick-add data-product-title="Onyx bracelet" data-product-price="80" data-product-img="assets/product4.png" data-product-variant="Gold" data-product-handle="onyx-bracelet" aria-label="Quick Add Onyx bracelet">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" width="16" height="16">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </button>
        </div>
        <div class="product-card__info">
          <h3 class="product-card__title"><a href="product.html?handle=onyx-bracelet">Onyx bracelet</a></h3>
          <p class="product-card__material">Gold</p>
          <div class="product-card__price">
            <span class="product-card__current-price">$80</span>
            <span class="product-card__compare-price">$110</span>
          </div>
        </div>
      </article>

      <!-- Card 3 -->
      <article class="product-card">
        <div class="product-card__media">
          <button type="button" class="product-card__wishlist-btn" data-wishlist-btn data-product-handle="valor-v-onyx-bracelet-silver" aria-label="Add Valor V Onyx bracelet to Wishlist">
            <svg class="icon icon-heart" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" width="20" height="20">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </button>
          <a href="product.html?handle=valor-v-onyx-bracelet-silver" class="product-card__image-link">
            <img src="assets/product-earrings-1.jpg" alt="Valor V Onyx bracelet" class="product-card__img-primary" loading="lazy" width="600" height="720">
          </a>
          <button type="button" class="product-card__add-btn" data-quick-add data-product-title="Valor V Onyx bracelet" data-product-price="120" data-product-img="assets/product-earrings-1.jpg" data-product-variant="Silver" data-product-handle="valor-v-onyx-bracelet-silver" aria-label="Quick Add Valor V Onyx bracelet">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" width="16" height="16">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </button>
        </div>
        <div class="product-card__info">
          <h3 class="product-card__title"><a href="product.html?handle=valor-v-onyx-bracelet-silver">Valor V Onyx bracelet</a></h3>
          <p class="product-card__material">Silver</p>
          <div class="product-card__price">
            <span class="product-card__current-price">$120</span>
          </div>
        </div>
      </article>

      <!-- Card 4 -->
      <article class="product-card">
        <div class="product-card__media">
          <span class="product-card__badge-new">New</span>
          <button type="button" class="product-card__wishlist-btn" data-wishlist-btn data-product-handle="red-floral-stud-earrings" aria-label="Add Red Floral Stud Earrings to Wishlist">
            <svg class="icon icon-heart" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" width="20" height="20">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </button>
          <a href="product.html?handle=red-floral-stud-earrings" class="product-card__image-link">
            <img src="assets/product2.png" alt="Red Floral Stud Earrings" class="product-card__img-primary" loading="lazy" width="600" height="720">
          </a>
          <button type="button" class="product-card__add-btn" data-quick-add data-product-title="Red Floral Stud Earrings" data-product-price="60" data-product-img="assets/product2.png" data-product-variant="Gold" data-product-handle="red-floral-stud-earrings" aria-label="Quick Add Red Floral Stud Earrings">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" width="16" height="16">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </button>
        </div>
        <div class="product-card__info">
          <h3 class="product-card__title"><a href="product.html?handle=red-floral-stud-earrings">Red Floral Stud Earrings</a></h3>
          <p class="product-card__material">Gold</p>
          <div class="product-card__price">
            <span class="product-card__current-price">$60</span>
          </div>
        </div>
      </article>

      <!-- Card 5 -->
      <article class="product-card">
        <div class="product-card__media">
          <button type="button" class="product-card__wishlist-btn" data-wishlist-btn data-product-handle="valor-v-onyx-bracelet" aria-label="Add Valor V Onyx Bracelet to Wishlist">
            <svg class="icon icon-heart" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" width="20" height="20">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </button>
          <a href="product.html?handle=valor-v-onyx-bracelet" class="product-card__image-link">
            <img src="assets/product8.png" alt="Valor V Onyx Bracelet" class="product-card__img-primary" loading="lazy" width="600" height="720">
          </a>
          <button type="button" class="product-card__add-btn" data-quick-add data-product-title="Valor V Onyx Bracelet" data-product-price="92" data-product-img="assets/product8.png" data-product-variant="Gold" data-product-handle="valor-v-onyx-bracelet" aria-label="Quick Add Valor V Onyx Bracelet">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" width="16" height="16">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </button>
        </div>
        <div class="product-card__info">
          <h3 class="product-card__title"><a href="product.html?handle=valor-v-onyx-bracelet">Valor V Onyx Bracelet</a></h3>
          <p class="product-card__material">Gold</p>
          <div class="product-card__price">
            <span class="product-card__current-price">$92</span>
          </div>
        </div>
      </article>

      <!-- Card 6 -->
      <article class="product-card">
        <div class="product-card__media">
          <button type="button" class="product-card__wishlist-btn" data-wishlist-btn data-product-handle="onyx-bracelet" aria-label="Add Onyx bracelet to Wishlist">
            <svg class="icon icon-heart" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" width="20" height="20">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </button>
          <a href="product.html?handle=onyx-bracelet" class="product-card__image-link">
            <img src="assets/Boundaries-collection.jpg" alt="Onyx bracelet" class="product-card__img-primary" loading="lazy" width="600" height="720">
          </a>
          <button type="button" class="product-card__add-btn" data-quick-add data-product-title="Onyx bracelet" data-product-price="80" data-product-img="assets/Boundaries-collection.jpg" data-product-variant="Gold" data-product-handle="onyx-bracelet" aria-label="Quick Add Onyx bracelet">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" width="16" height="16">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </button>
        </div>
        <div class="product-card__info">
          <h3 class="product-card__title"><a href="product.html?handle=onyx-bracelet">Onyx bracelet</a></h3>
          <p class="product-card__material">Gold</p>
          <div class="product-card__price">
            <span class="product-card__current-price">$80</span>
            <span class="product-card__compare-price">$110</span>
          </div>
        </div>
      </article>

      <!-- Card 7 -->
      <article class="product-card">
        <div class="product-card__media">
          <span class="product-card__badge-new">New</span>
          <button type="button" class="product-card__wishlist-btn" data-wishlist-btn data-product-handle="red-floral-stud-earrings" aria-label="Add Red Floral Stud Earrings to Wishlist">
            <svg class="icon icon-heart" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" width="20" height="20">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </button>
          <a href="product.html?handle=red-floral-stud-earrings" class="product-card__image-link">
            <img src="assets/SelfRomance-collection.jpg" alt="Red Floral Stud Earrings" class="product-card__img-primary" loading="lazy" width="600" height="720">
          </a>
          <button type="button" class="product-card__add-btn" data-quick-add data-product-title="Red Floral Stud Earrings" data-product-price="60" data-product-img="assets/SelfRomance-collection.jpg" data-product-variant="Gold" data-product-handle="red-floral-stud-earrings" aria-label="Quick Add Red Floral Stud Earrings">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" width="16" height="16">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </button>
        </div>
        <div class="product-card__info">
          <h3 class="product-card__title"><a href="product.html?handle=red-floral-stud-earrings">Red Floral Stud Earrings</a></h3>
          <p class="product-card__material">Gold</p>
          <div class="product-card__price">
            <span class="product-card__current-price">$60</span>
          </div>
        </div>
      </article>

      <!-- Card 8 -->
      <article class="product-card">
        <div class="product-card__media">
          <button type="button" class="product-card__wishlist-btn" data-wishlist-btn data-product-handle="valor-v-onyx-bracelet-silver" aria-label="Add Valor V Onyx bracelet to Wishlist">
            <svg class="icon icon-heart" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" width="20" height="20">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </button>
          <a href="product.html?handle=valor-v-onyx-bracelet-silver" class="product-card__image-link">
            <img src="assets/product2.png" alt="Valor V Onyx bracelet" class="product-card__img-primary" loading="lazy" width="600" height="720">
          </a>
          <button type="button" class="product-card__add-btn" data-quick-add data-product-title="Valor V Onyx bracelet" data-product-price="120" data-product-img="assets/product2.png" data-product-variant="Silver" data-product-handle="valor-v-onyx-bracelet-silver" aria-label="Quick Add Valor V Onyx bracelet">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" width="16" height="16">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </button>
        </div>
        <div class="product-card__info">
          <h3 class="product-card__title"><a href="product.html?handle=valor-v-onyx-bracelet-silver">Valor V Onyx bracelet</a></h3>
          <p class="product-card__material">Silver</p>
          <div class="product-card__price">
            <span class="product-card__current-price">$120</span>
          </div>
        </div>
      </article>

    </div>
  </div>

  <hr class="category-divider-line">

  <!-- =========================================================================
       UNIVERSAL SITE FOOTER (EXACT FIGMA 1:1 MATCH)
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
            <a href="bundle-deals.html" class="footer-col__link">Bundle Deals</a>
          </nav>
        </div>

        <!-- Col 2: DISCOVER -->
        <div class="footer-col">
          <h4 class="footer-col__title">DISCOVER</h4>
          <nav class="footer-col__nav" aria-label="Discover Navigation">
            <a href="about.html" class="footer-col__link">Our Story</a>
            <a href="contact.html" class="footer-col__link">Contact Us</a>
            <a href="index.html#faqs" class="footer-col__link">FAQs</a>
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
          <span class="payment-badge" title="Visa Debit">
            <svg viewBox="0 0 38 24" width="38" height="24"><rect width="38" height="24" rx="2" fill="#F4F4F4"/><text x="14" y="16" font-family="'DM Sans',sans-serif" font-weight="700" font-size="12" fill="#1A1F71">V</text></svg>
          </span>
          <span class="payment-badge" title="Visa">
            <svg viewBox="0 0 38 24" width="38" height="24"><rect width="38" height="24" rx="2" fill="#F4F4F4"/><text x="5" y="16" font-family="'DM Sans',sans-serif" font-weight="700" font-size="10" fill="#1A1F71">VISA</text></svg>
          </span>
          <span class="payment-badge" title="Apple Pay">
            <svg viewBox="0 0 38 24" width="38" height="24"><rect width="38" height="24" rx="2" fill="#F4F4F4"/><text x="6" y="15" font-family="'DM Sans',sans-serif" font-weight="600" font-size="8.5" fill="#000000">Pay</text></svg>
          </span>
          <span class="payment-badge" title="Diners Club">
            <svg viewBox="0 0 38 24" width="38" height="24"><rect width="38" height="24" rx="2" fill="#F4F4F4"/><circle cx="15" cy="12" r="5" stroke="#333333" stroke-width="1.2" fill="none"/><circle cx="23" cy="12" r="5" stroke="#333333" stroke-width="1.2" fill="none"/></svg>
          </span>
          <span class="payment-badge" title="Discover">
            <svg viewBox="0 0 38 24" width="38" height="24"><rect width="38" height="24" rx="2" fill="#F4F4F4"/><text x="4" y="15" font-family="'DM Sans',sans-serif" font-weight="700" font-size="7" fill="#FF6000">DISCOVER</text></svg>
          </span>
          <span class="payment-badge" title="Google Pay">
            <svg viewBox="0 0 38 24" width="38" height="24"><rect width="38" height="24" rx="2" fill="#F4F4F4"/><text x="5" y="15" font-family="'DM Sans',sans-serif" font-weight="600" font-size="8.5" fill="#5F6368">G Pay</text></svg>
          </span>
          <span class="payment-badge" title="Mastercard">
            <svg viewBox="0 0 38 24" width="38" height="24"><rect width="38" height="24" rx="2" fill="#F4F4F4"/><circle cx="15" cy="12" r="6" fill="#EB001B"/><circle cx="23" cy="12" r="6" fill="#F79E1B" fill-opacity="0.85"/></svg>
          </span>
          <span class="payment-badge" title="PayPal">
            <svg viewBox="0 0 38 24" width="38" height="24"><rect width="38" height="24" rx="2" fill="#F4F4F4"/><text x="5" y="16" font-family="'DM Sans',sans-serif" font-weight="700" font-size="9" fill="#003087">PayPal</text></svg>
          </span>
          <span class="payment-badge" title="Shop Pay">
            <svg viewBox="0 0 38 24" width="38" height="24"><rect width="38" height="24" rx="2" fill="#5A31F4"/><text x="4" y="15" font-family="'DM Sans',sans-serif" font-weight="700" font-size="7.5" fill="#FFFFFF">shop Pay</text></svg>
          </span>
          <span class="payment-badge" title="Interac">
            <svg viewBox="0 0 38 24" width="38" height="24"><rect width="38" height="24" rx="2" fill="#E8B024"/><text x="4" y="15" font-family="'DM Sans',sans-serif" font-weight="700" font-size="7.5" fill="#000000">Interac</text></svg>
          </span>
        </div>

        <div class="footer-socials" aria-label="Social Media Links">
          <a href="https://facebook.com" target="_blank" rel="noopener" class="social-circle-btn" aria-label="Facebook">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
          </a>
          <a href="https://tiktok.com" target="_blank" rel="noopener" class="social-circle-btn" aria-label="TikTok">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743 2.895 2.895 0 0 1 2.312-4.643c.294 0 .579.04.85.116V9.352a6.347 6.347 0 0 0-.85-.058 6.34 6.34 0 0 0-6.335 6.34 6.34 6.34 0 0 0 10.82 4.49 6.273 6.273 0 0 0 1.96-4.49V8.71a8.28 8.28 0 0 0 4.81 1.48v-3.504Z"/></svg>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener" class="social-circle-btn" aria-label="Instagram">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
          </a>
          <a href="https://youtube.com" target="_blank" rel="noopener" class="social-circle-btn" aria-label="YouTube">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33zM9.75 15.02V8.48l5.75 3.27-5.75 3.27z"/></svg>
          </a>
        </div>
      </div>

      <!-- Footer Bottom Bar -->
      <div class="site-footer__bottom">
        <div class="footer-bottom__left">
          <button type="button" class="footer-region-trigger" data-country-trigger aria-label="Select Country and Language">
            <span class="region-flag" data-country-display-flag>
              <svg viewBox="0 0 20 14" width="18" height="13" style="display:inline-block;vertical-align:middle;border-radius:2px;"><rect width="20" height="14" fill="#003399"/><circle cx="10" cy="7" r="4.2" fill="none" stroke="#FFCC00" stroke-width="1.2" stroke-dasharray="0.8 1.4"/></svg>
            </span>
            <span data-country-display-code>eu</span>
            <svg viewBox="0 0 24 24" width="9" height="9" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
          </button>
          <span class="footer-sep">•</span>
          <span class="footer-copyright">© 2026 Oge Jewlery. All Rights Reserved.</span>
        </div>

        <nav class="footer-legal" aria-label="Legal Links">
          <a href="privacy-policy.html" class="footer-legal__link">Privacy Policy</a>
          <span class="footer-legal__sep">·</span>
          <a href="terms-conditions.html" class="footer-legal__link">Terms &amp; Conditions</a>
          <span class="footer-legal__sep">·</span>
          <a href="shipping-returns.html" class="footer-legal__link">Shipping &amp; Returns</a>
        </nav>
      </div>
    </div>
  </footer>

  <!-- Cart Drawer Support -->
  <div class="cart-drawer-backdrop" data-cart-drawer-backdrop></div>
  <aside class="cart-drawer" data-cart-drawer role="dialog" aria-modal="true" aria-label="My Bag">
    <div class="cart-drawer__header">
      <h2 class="cart-drawer__title">MY BAG</h2>
      <button type="button" class="cart-drawer__close" data-cart-drawer-close aria-label="Close Bag">
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

  <!-- Interactive Search Script -->
  <script>
    document.addEventListener('DOMContentLoaded', function() {
      const urlParams = new URLSearchParams(window.location.search);
      const queryParam = urlParams.get('q');
      const input = document.getElementById('search-page-input');
      const clearBtn = document.getElementById('search-clear-btn');
      const countEl = document.getElementById('search-count');
      const grid = document.getElementById('search-grid');

      if (queryParam !== null && queryParam !== '') {
        input.value = queryParam;
      }

      window.handleSearch = function() {
        const query = input.value.trim().toLowerCase();

        if (query === '' || query === 'gold earring' || query === 'gold' || query === 'earring') {
          // If default query, show 331 products found for "gold earring"
          if (query === 'gold earring' || query === '') {
            countEl.innerHTML = '331 products found for &ldquo;gold earring&rdquo;';
            document.title = '331 products found for "gold earring" — OGÉ Fine Jewelry';
            return; // keep the 8 cards matching Image 1
          }
        }

        const keywords = query.split(/\\s+/).filter(Boolean);
        const results = (window.OGE_CATALOG || []).filter(p => {
          const haystack = `${p.title} ${p.fullTitle || ''} ${p.description} ${p.metal} ${p.gemstone || ''} ${p.category} ${p.collection} ${p.variants ? p.variants.map(v => v.finish || v.title).join(' ') : ''}`.toLowerCase();
          return keywords.every(kw => haystack.includes(kw)) || haystack.includes(query);
        });

        countEl.innerHTML = `${results.length} products found for &ldquo;${input.value.trim()}&rdquo;`;
        document.title = `${results.length} products found for "${input.value.trim()}" — OGÉ Fine Jewelry`;

        if (results.length === 0) {
          grid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px;">
              <h3 style="font-family: 'DM Sans', sans-serif; font-size: 1.25rem; font-weight: 500; margin-bottom: 12px;">No products found for "${input.value.trim()}"</h3>
              <p style="color: #666; font-size: 0.875rem; margin-bottom: 24px;">Check your spelling, try different keywords, or explore our curated collections.</p>
              <a href="shop.html" class="btn btn-brown" style="font-family: 'DM Sans', sans-serif !important; font-weight: 400 !important; text-transform: none !important;">Browse All Jewelry</a>
            </div>
          `;
          return;
        }

        grid.innerHTML = '';
        results.forEach(function(p) {
          const card = document.createElement('article');
          card.className = 'product-card';
          const variantLabel = (p.variants && p.variants[0] && p.variants[0].finish) ? p.variants[0].finish : (p.metal && p.metal.toLowerCase().includes('silver') ? 'Silver' : 'Gold');
          const isWishlisted = (window.AppState && window.AppState.wishlist) ? (window.AppState.wishlist.includes(p.handle) || window.AppState.wishlist.includes(p.title)) : false;

          card.innerHTML = `
            <div class="product-card__media">
              ${p.isNew ? '<span class="product-card__badge-new">New</span>' : ''}
              <button type="button" class="product-card__wishlist-btn ${isWishlisted ? 'is-active' : ''}" data-wishlist-btn data-product-handle="${p.handle}" aria-label="Add ${p.title} to Wishlist">
                <svg class="icon icon-heart" viewBox="0 0 24 24" fill="${isWishlisted ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="1.2" width="20" height="20">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
              </button>
              <a href="product.html?handle=${p.handle}" class="product-card__image-link">
                <img src="assets/${p.images[0]}" alt="${p.title}" class="product-card__img-primary" loading="lazy" width="600" height="720">
              </a>
              <button type="button" class="product-card__add-btn" data-quick-add data-product-title="${p.title}" data-product-price="${p.price}" data-product-img="assets/${p.images[0]}" data-product-variant="${variantLabel}" data-product-handle="${p.handle}" aria-label="Quick Add ${p.title}">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" width="16" height="16">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
              </button>
            </div>
            <div class="product-card__info">
              <h3 class="product-card__title">
                <a href="product.html?handle=${p.handle}">${p.title}</a>
              </h3>
              <p class="product-card__material">${variantLabel}</p>
              <div class="product-card__price">
                <span class="product-card__current-price">$${p.price}</span>
                ${p.compareAtPrice ? `<span class="product-card__compare-price">$${p.compareAtPrice}</span>` : ''}
              </div>
            </div>
          `;
          grid.appendChild(card);
        });
      };

      input.addEventListener('input', function() {
        clearBtn.style.display = this.value.length > 0 ? 'flex' : 'none';
        window.handleSearch();
      });

      clearBtn.addEventListener('click', function() {
        input.value = '';
        clearBtn.style.display = 'none';
        input.focus();
        window.handleSearch();
      });

      clearBtn.style.display = input.value.length > 0 ? 'flex' : 'none';
    });
  </script>

</body>
</html>
"""

root_dir = r"c:\Users\USER\Desktop\oge-jewelry-shopify"
for folder in [root_dir, os.path.join(root_dir, "preview")]:
    p = os.path.join(folder, "search.html")
    with open(p, "w", encoding="utf-8") as f:
        f.write(search_html_content)
    print(f"Wrote exact Image 1 match to {p}")
