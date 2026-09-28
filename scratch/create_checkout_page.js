const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');

const checkoutHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Checkout — OGÉ Fine Jewelry</title>
  <meta name="description" content="Secure Checkout for OGÉ Fine Jewelry. Complete your order with worldwide insured shipping.">
  <link rel="icon" type="image/png" href="assets/favicon.png">

  <!-- Google Fonts: DM Sans -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&display=swap" rel="stylesheet">

  <link rel="stylesheet" href="assets/base.css">
  <link rel="stylesheet" href="assets/theme.css">

  <style>
    body {
      background-color: #FFFFFF;
      color: #111111;
      font-family: var(--font-body);
      margin: 0;
      padding: 0;
    }
    .checkout-wrap {
      display: grid;
      grid-template-columns: 1.15fr 0.85fr;
      min-height: 100vh;
    }
    .checkout-main {
      padding: 40px 60px 80px;
      border-right: 1px solid #ECECEC;
      max-width: 680px;
      margin-left: auto;
      width: 100%;
      box-sizing: border-box;
    }
    .checkout-sidebar {
      padding: 40px 60px 80px;
      background-color: #FAFAFA;
      max-width: 520px;
      width: 100%;
      box-sizing: border-box;
    }
    .checkout-header {
      margin-bottom: 32px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .checkout-logo {
      display: inline-block;
    }
    .checkout-logo img {
      width: 105px;
      height: auto;
    }
    .checkout-secure-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-size: 0.8125rem;
      color: #666666;
    }
    .checkout-express {
      margin-bottom: 24px;
    }
    .checkout-express__title {
      font-size: 0.8125rem;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      color: #666666;
      margin-bottom: 12px;
      text-align: center;
    }
    .checkout-express__btns {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 10px;
    }
    .checkout-express__btn {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 44px;
      border-radius: 4px;
      border: 1px solid #E0E0E0;
      background: #FFFFFF;
      cursor: pointer;
      font-weight: 600;
      font-size: 0.875rem;
      transition: all 0.15s ease;
    }
    .checkout-express__btn--shoppay {
      background: #5A31F4;
      color: #FFFFFF;
      border-color: #5A31F4;
    }
    .checkout-express__btn--paypal {
      background: #FFC439;
      color: #003087;
      border-color: #FFC439;
    }
    .checkout-express__btn--gpay {
      background: #000000;
      color: #FFFFFF;
      border-color: #000000;
    }
    .checkout-divider {
      position: relative;
      text-align: center;
      margin: 28px 0;
    }
    .checkout-divider::before {
      content: '';
      position: absolute;
      left: 0;
      top: 50%;
      right: 0;
      height: 1px;
      background: #ECECEC;
    }
    .checkout-divider span {
      position: relative;
      background: #FFFFFF;
      padding: 0 16px;
      font-size: 0.75rem;
      color: #888888;
      text-transform: uppercase;
      letter-spacing: 0.08em;
    }
    .checkout-section {
      margin-bottom: 32px;
    }
    .checkout-section__title {
      font-family: var(--font-heading);
      font-size: 1.125rem;
      font-weight: 400;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      color: #111111;
      margin: 0 0 16px;
    }
    .form-group {
      margin-bottom: 14px;
    }
    .form-group label {
      display: block;
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      color: #444444;
      margin-bottom: 6px;
    }
    .form-input, .form-select {
      width: 100%;
      height: 44px;
      padding: 0 14px;
      border: 1px solid #D4D4D4;
      border-radius: 4px;
      font-family: var(--font-body);
      font-size: 0.875rem;
      box-sizing: border-box;
      background: #FFFFFF;
      color: #111111;
    }
    .form-input:focus, .form-select:focus {
      outline: none;
      border-color: #111111;
    }
    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
    }
    .form-row--3 {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 12px;
    }
    .checkout-btn-submit {
      width: 100%;
      height: 52px;
      background: #111111;
      color: #FFFFFF;
      border: none;
      border-radius: 4px;
      font-family: var(--font-body);
      font-size: 0.9375rem;
      font-weight: 600;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      cursor: pointer;
      transition: background-color 0.2s ease;
      margin-top: 20px;
    }
    .checkout-btn-submit:hover {
      background: #333333;
    }
    /* Sidebar Summary */
    .summary-item {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-bottom: 16px;
    }
    .summary-item__img-wrap {
      position: relative;
      width: 64px;
      height: 76px;
      border: 1px solid #ECECEC;
      border-radius: 4px;
      background: #FFFFFF;
      flex-shrink: 0;
      overflow: visible;
    }
    .summary-item__img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 4px;
    }
    .summary-item__badge {
      position: absolute;
      top: -8px;
      right: -8px;
      width: 20px;
      height: 20px;
      background: #666666;
      color: #FFFFFF;
      border-radius: 50%;
      font-size: 0.75rem;
      font-weight: 600;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .summary-item__info {
      flex: 1;
    }
    .summary-item__title {
      font-size: 0.875rem;
      font-weight: 500;
      margin: 0 0 4px;
      color: #111111;
    }
    .summary-item__variant {
      font-size: 0.75rem;
      color: #777777;
      margin: 0;
    }
    .summary-item__price {
      font-size: 0.875rem;
      font-weight: 600;
      color: #111111;
    }
    .summary-discount {
      display: flex;
      gap: 8px;
      margin: 24px 0;
    }
    .summary-discount input {
      flex: 1;
      height: 42px;
      padding: 0 12px;
      border: 1px solid #D4D4D4;
      border-radius: 4px;
      font-size: 0.875rem;
    }
    .summary-discount button {
      padding: 0 20px;
      background: #ECECEC;
      border: none;
      border-radius: 4px;
      font-weight: 600;
      font-size: 0.8125rem;
      cursor: pointer;
    }
    .summary-totals {
      border-top: 1px solid #ECECEC;
      padding-top: 16px;
    }
    .summary-totals__row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
      font-size: 0.875rem;
      color: #555555;
    }
    .summary-totals__row--total {
      border-top: 1px solid #ECECEC;
      padding-top: 16px;
      margin-top: 16px;
      font-size: 1.125rem;
      font-weight: 700;
      color: #111111;
    }
    @media (max-width: 900px) {
      .checkout-wrap {
        grid-template-columns: 1fr;
      }
      .checkout-main {
        padding: 30px 20px;
        order: 2;
      }
      .checkout-sidebar {
        padding: 24px 20px;
        order: 1;
        border-bottom: 1px solid #ECECEC;
      }
    }
  </style>

  <script src="assets/catalog-data.js"></script>
  <script src="assets/theme.js" defer></script>
</head>
<body>

  <div class="checkout-wrap">
    <!-- Main Form Area -->
    <main class="checkout-main">
      <header class="checkout-header">
        <a href="index.html" class="checkout-logo" aria-label="OGÉ Home">
          <img src="assets/logo2.png" alt="OGÉ" width="105" height="32">
        </a>
        <div class="checkout-secure-badge">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
          <span>SSL 256-Bit Encrypted</span>
        </div>
      </header>

      <!-- Express Checkout -->
      <div class="checkout-express">
        <div class="checkout-express__title">Express Checkout</div>
        <div class="checkout-express__btns">
          <button type="button" class="checkout-express__btn checkout-express__btn--shoppay" onclick="simulateOrder('Shop Pay')">Shop Pay</button>
          <button type="button" class="checkout-express__btn checkout-express__btn--paypal" onclick="simulateOrder('PayPal')">PayPal</button>
          <button type="button" class="checkout-express__btn checkout-express__btn--gpay" onclick="simulateOrder('Google Pay')">G Pay</button>
        </div>
      </div>

      <div class="checkout-divider">
        <span>OR</span>
      </div>

      <form id="checkout-form" onsubmit="handleCheckoutSubmit(event)">
        <!-- Contact -->
        <section class="checkout-section">
          <h2 class="checkout-section__title">Contact Information</h2>
          <div class="form-group">
            <label for="contact-email">Email Address</label>
            <input type="email" id="contact-email" class="form-input" placeholder="you@example.com" required>
          </div>
        </section>

        <!-- Delivery Address -->
        <section class="checkout-section">
          <h2 class="checkout-section__title">Delivery Address</h2>
          
          <div class="form-group">
            <label for="checkout-country">Country / Region</label>
            <select id="checkout-country" class="form-select" onchange="handleCountryChange(this.value)">
              <option value="EU">European Union (EUR €)</option>
              <option value="US">United States (USD $)</option>
              <option value="UK">United Kingdom (GBP £)</option>
              <option value="NG">Nigeria (NGN ₦)</option>
              <option value="CA">Canada (CAD CA$)</option>
              <option value="AU">Australia (AUD AU$)</option>
              <option value="AE">United Arab Emirates (AED)</option>
            </select>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="first-name">First Name</label>
              <input type="text" id="first-name" class="form-input" required>
            </div>
            <div class="form-group">
              <label for="last-name">Last Name</label>
              <input type="text" id="last-name" class="form-input" required>
            </div>
          </div>

          <div class="form-group">
            <label for="address">Address</label>
            <input type="text" id="address" class="form-input" placeholder="Street name and number" required>
          </div>

          <div class="form-row--3">
            <div class="form-group">
              <label for="city">City</label>
              <input type="text" id="city" class="form-input" required>
            </div>
            <div class="form-group">
              <label for="state">State / Province</label>
              <input type="text" id="state" class="form-input" required>
            </div>
            <div class="form-group">
              <label for="zip">Postal Code</label>
              <input type="text" id="zip" class="form-input" required>
            </div>
          </div>

          <div class="form-group">
            <label for="phone">Phone (for courier updates)</label>
            <input type="tel" id="phone" class="form-input" placeholder="+1 (555) 000-0000" required>
          </div>
        </section>

        <!-- Shipping Method -->
        <section class="checkout-section">
          <h2 class="checkout-section__title">Shipping Method</h2>
          <div style="border: 1px solid #ECECEC; border-radius: 4px; padding: 16px; background: #FFF; display: flex; justify-content: space-between; align-items: center;">
            <div>
              <div style="font-weight: 600; font-size: 0.875rem;">Complimentary Insured Courier</div>
              <div style="font-size: 0.75rem; color: #666;">2–4 business days with tracking &amp; signature</div>
            </div>
            <div style="font-weight: 700; color: #008751; font-size: 0.875rem;">FREE</div>
          </div>
        </section>

        <!-- Payment -->
        <section class="checkout-section">
          <h2 class="checkout-section__title">Payment Details</h2>
          <div class="form-group">
            <label for="card-number">Card Number</label>
            <input type="text" id="card-number" class="form-input" placeholder="•••• •••• •••• ••••" required>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label for="card-exp">Expiration Date</label>
              <input type="text" id="card-exp" class="form-input" placeholder="MM / YY" required>
            </div>
            <div class="form-group">
              <label for="card-cvv">Security Code (CVV)</label>
              <input type="text" id="card-cvv" class="form-input" placeholder="CVV" required>
            </div>
          </div>
        </section>

        <button type="submit" class="checkout-btn-submit" id="btn-submit-order">
          Pay Now
        </button>
      </form>

      <footer style="margin-top: 48px; border-top: 1px solid #ECECEC; padding-top: 20px; font-size: 0.75rem; color: #777; display: flex; gap: 16px;">
        <a href="privacy-policy.html" style="color: #666; text-decoration: none;">Privacy Policy</a>
        <a href="terms-conditions.html" style="color: #666; text-decoration: none;">Terms &amp; Conditions</a>
        <a href="shipping-returns.html" style="color: #666; text-decoration: none;">Shipping &amp; Returns</a>
      </footer>
    </main>

    <!-- Sidebar Order Summary -->
    <aside class="checkout-sidebar">
      <div id="checkout-items-list">
        <!-- Rendered by JS -->
      </div>

      <div class="summary-discount">
        <input type="text" placeholder="Discount code or gift card">
        <button type="button" onclick="alert('Promo code applied!')">Apply</button>
      </div>

      <div class="summary-totals">
        <div class="summary-totals__row">
          <span>Subtotal</span>
          <span id="checkout-subtotal">$0</span>
        </div>
        <div class="summary-totals__row">
          <span>Shipping</span>
          <span style="color: #008751; font-weight: 600;">Complimentary</span>
        </div>
        <div class="summary-totals__row">
          <span>Estimated Taxes</span>
          <span id="checkout-taxes">$0</span>
        </div>
        <div class="summary-totals__row summary-totals__row--total">
          <span>Total</span>
          <span id="checkout-total">$0</span>
        </div>
      </div>
    </aside>
  </div>

  <script>
    function renderCheckoutSummary() {
      const items = JSON.parse(localStorage.getItem('oge_cart_items') || '[]');
      const container = document.getElementById('checkout-items-list');
      
      const currentCountry = window.OGE_CURRENCY ? window.OGE_CURRENCY.getCurrentCountry() : { code: 'EU', currency: 'EUR', symbol: '€', rate: 0.92 };
      
      // Update country select dropdown
      const countrySelect = document.getElementById('checkout-country');
      if (countrySelect) {
        countrySelect.value = currentCountry.code;
      }

      if (items.length === 0) {
        container.innerHTML = '<p style="font-size: 0.875rem; color: #666;">Your shopping bag is currently empty.</p>';
        document.getElementById('checkout-subtotal').textContent = window.OGE_CURRENCY ? window.OGE_CURRENCY.format(0) : '$0';
        document.getElementById('checkout-total').textContent = window.OGE_CURRENCY ? window.OGE_CURRENCY.format(0) : '$0';
        return;
      }

      let subtotalUSD = 0;
      let html = '';

      items.forEach(item => {
        const qty = item.qty || 1;
        const priceUSD = parseFloat(String(item.priceUSD || item.price).replace(/[^0-9.]/g, '')) || 70;
        subtotalUSD += (priceUSD * qty);
        const itemFormatted = window.OGE_CURRENCY ? window.OGE_CURRENCY.format(priceUSD * qty) : ('$' + (priceUSD * qty));

        html += \`
          <div class="summary-item">
            <div class="summary-item__img-wrap">
              <img src="\${item.image || 'assets/product1.png'}" alt="\${item.title}" class="summary-item__img">
              <span class="summary-item__badge">\${qty}</span>
            </div>
            <div class="summary-item__info">
              <h4 class="summary-item__title">\${item.title}</h4>
              <p class="summary-item__variant">\${item.variant || 'Gold'}</p>
            </div>
            <div class="summary-item__price">\${itemFormatted}</div>
          </div>
        \`;
      });

      container.innerHTML = html;

      const formattedSubtotal = window.OGE_CURRENCY ? window.OGE_CURRENCY.format(subtotalUSD) : ('$' + Math.round(subtotalUSD));
      document.getElementById('checkout-subtotal').textContent = formattedSubtotal;
      document.getElementById('checkout-total').textContent = formattedSubtotal;
      
      const submitBtn = document.getElementById('btn-submit-order');
      if (submitBtn) {
        submitBtn.textContent = 'Pay Now • ' + formattedSubtotal;
      }
    }

    function handleCountryChange(code) {
      if (window.OGE_CURRENCY) {
        window.OGE_CURRENCY.setCountry(code);
        renderCheckoutSummary();
      }
    }

    function simulateOrder(method) {
      const currentCountry = window.OGE_CURRENCY ? window.OGE_CURRENCY.getCurrentCountry() : { currency: 'EUR' };
      alert('Simulating ' + method + ' payment for delivery to ' + currentCountry.name + ' (' + currentCountry.currency + '). Order confirmed!');
      localStorage.removeItem('oge_cart_items');
      window.location.href = 'account-overview.html';
    }

    function handleCheckoutSubmit(e) {
      e.preventDefault();
      simulateOrder('Credit Card');
    }

    document.addEventListener('DOMContentLoaded', () => {
      renderCheckoutSummary();
    });
    window.addEventListener('oge:country-change', () => {
      renderCheckoutSummary();
    });
  </script>
</body>
</html>`;

fs.writeFileSync(path.join(rootDir, 'checkout.html'), checkoutHtml, 'utf8');
console.log('Created checkout.html');

fs.writeFileSync(path.join(rootDir, 'preview', 'checkout.html'), checkoutHtml, 'utf8');
console.log('Created preview/checkout.html');
