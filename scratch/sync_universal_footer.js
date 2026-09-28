const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');

const universalFooter = `  <!-- =========================================================================
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
  </footer>`;

function updateFileFooter(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  if (!content.includes('site-footer')) return;

  const footerRegex = /<!--\s*={5,}\s*(?:\d+\.)?\s*SITE FOOTER[\s\S]*?<\/footer>|<footer class="site-footer"[\s\S]*?<\/footer>/i;
  if (footerRegex.test(content)) {
    content = content.replace(footerRegex, universalFooter);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Updated footer in:', filePath);
  }
}

function processDir(dir) {
  const list = fs.readdirSync(dir);
  for (const item of list) {
    const full = path.join(dir, item);
    if (fs.statSync(full).isDirectory() && item !== 'node_modules' && item !== '.git') {
      processDir(full);
    } else if (item.endsWith('.html') && item !== 'checkout.html') {
      updateFileFooter(full);
    }
  }
}

processDir(rootDir);
console.log('Finished updating footers across all HTML pages.');
