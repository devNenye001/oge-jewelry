const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const privacyHtml = fs.readFileSync(path.join(rootDir, 'privacy-policy.html'), 'utf8');

const targetTitle = 'Shipping &amp; Returns — OGÉ Fine Jewelry';
const targetDesc = 'Shipping &amp; Returns policies for OGÉ Fine Jewelry. Learn about our delivery destinations, timelines, tracking, returns, exchanges, and jewelry care.';

const shippingContent = `    <article class="legal-page-wrap">
      <h1 class="legal-page__title">SHIPPING &amp; RETURNS</h1>

      <div class="legal-page__body">
        <p>
          We want every OGÉ Jewelry experience to feel as thoughtful as the piece you chose.
        </p>
        <p>
          Please review the information below before placing your order.
        </p>

        <h2>SHIPPING</h2>

        <h3>Where do you ship?</h3>
        <p>
          OGÉ Jewelry ships to <strong>[insert countries/regions]</strong>.
        </p>
        <p>
          Available shipping options and costs will be displayed at checkout based on your delivery location.
        </p>

        <h3>How long does processing take?</h3>
        <p>
          Orders are typically processed within <strong>[insert number] business days</strong> after payment has been successfully received.
        </p>
        <p>
          Orders containing personalized, specially made, or pre-order pieces may require additional processing time. Where applicable, the estimated timeframe will be communicated on the product page or at checkout.
        </p>

        <h3>How long does delivery take?</h3>
        <p>
          Once your order has been dispatched, delivery times depend on your location and selected shipping method.
        </p>
        <p>Estimated delivery times:</p>
        <ul>
          <li><strong>Nigeria:</strong> [insert timeframe]</li>
          <li><strong>International:</strong> [insert timeframe]</li>
        </ul>
        <p>
          Please note that delivery estimates are not guarantees. Delays may occur due to customs, weather, public holidays, courier delays, or other circumstances outside our control.
        </p>

        <h3>Will I receive tracking information?</h3>
        <p>
          Yes. Where tracking is available for your selected shipping method, tracking information will be provided once your order has been dispatched.
        </p>
        <p>
          Please ensure that the email address and phone number provided at checkout are correct.
        </p>

        <h3>Are customs duties and taxes included?</h3>
        <p>
          For international orders, customs duties, import taxes, or other charges may apply depending on the destination country.
        </p>
        <p>
          Any applicable charges are the responsibility of the customer unless otherwise stated at checkout.
        </p>

        <h3>What if my package is delayed or lost?</h3>
        <p>
          If your order appears to be delayed, please contact us with your order number so we can assist.
        </p>
        <p>
          Once an order has been handed over to the shipping provider, delivery is also subject to the courier's processes and timelines.
        </p>

        <hr>

        <h2>RETURNS &amp; EXCHANGES</h2>
        <p>
          We want you to love your OGÉ piece. If something isn't right, please contact us as soon as possible.
        </p>

        <h3>What is your return window?</h3>
        <p>
          Eligible items may be returned within <strong>[insert number] days</strong> of delivery.
        </p>
        <p>To qualify for a return, the item must:</p>
        <ul>
          <li>Be unworn and unused</li>
          <li>Be in its original condition</li>
          <li>Include the original packaging</li>
          <li>Not show signs of damage, wear, or alteration</li>
          <li>Meet any additional return requirements communicated by OGÉ Jewelry</li>
        </ul>

        <h3>How do I request a return?</h3>
        <p>
          Please contact us at <strong><a href="mailto:oge@ogejewelry.com">[Email Address]</a></strong> with:
        </p>
        <ul>
          <li>Your order number</li>
          <li>The name of the item</li>
          <li>The reason for the return</li>
          <li>Photos of the item where requested</li>
        </ul>
        <p>
          Our team will review your request and provide the next steps.
        </p>
        <p>
          Please do not send an item back before receiving return instructions from us.
        </p>

        <h3>Are there items that cannot be returned?</h3>
        <p>
          Unless otherwise required by applicable law, certain items may not be eligible for return, including:
        </p>
        <ul>
          <li>Personalized or specially made jewelry</li>
          <li>Items that have been worn</li>
          <li>Items damaged through improper use or care</li>
          <li>Items returned without their original packaging</li>
          <li>Sale or final-sale items, where stated at the time of purchase</li>
        </ul>

        <h3>Are exchanges available?</h3>
        <p>
          Exchanges are available <strong>[insert actual exchange policy]</strong>.
        </p>
        <p>
          If the requested replacement is unavailable, we will contact you to discuss the available options.
        </p>

        <h3>When will I receive my refund?</h3>
        <p>
          Once your returned item has been received and inspected, we will notify you of the outcome.
        </p>
        <p>
          Approved refunds will be processed through the original payment method, subject to the processing times of your bank or payment provider.
        </p>

        <h3>What if I receive a damaged or incorrect item?</h3>
        <p>
          Please contact us within <strong>[insert timeframe]</strong> of receiving your order and include your order number and clear photos of the item and packaging.
        </p>
        <p>
          If the item was damaged during delivery or you received the wrong item, we will review the issue and advise you on the next steps.
        </p>

        <h3>Who pays for return shipping?</h3>
        <p>
          Return shipping costs are <strong>[insert actual policy]</strong>.
        </p>
        <p>
          If the return is due to an error on our part or an item arrived damaged, please contact us before arranging a return.
        </p>

        <hr>

        <h2>JEWELRY CARE</h2>
        <p>
          Your OGÉ pieces are designed to be treasured.
        </p>
        <p>To help maintain their beauty:</p>
        <ul>
          <li>Keep jewelry away from perfumes, lotions, oils, and harsh chemicals.</li>
          <li>Remove jewelry before swimming, bathing, or exercising.</li>
          <li>Avoid prolonged exposure to water and moisture.</li>
          <li>Store pieces separately in a cool, dry place.</li>
          <li>Use a soft, clean cloth to gently wipe your jewelry after wearing it.</li>
        </ul>
        <p>
          Different materials may naturally change over time with regular wear. Proper care can help preserve the appearance of your pieces.
        </p>

        <h2>QUESTIONS?</h2>
        <p>We're here to help.</p>
        <p>
          If you have questions about an order, return, exchange, or delivery, contact the OGÉ team at:
        </p>
        <p>
          <strong><a href="mailto:oge@ogejewelry.com">[Email Address]</a></strong>
        </p>
        <p>
          We’ll be happy to assist.
        </p>
      </div>
    </article>`;

// Replace title & description
let res = privacyHtml.replace(/<title>.*?<\/title>/, `<title>${targetTitle}</title>`);
res = res.replace(/<meta name="description" content=".*?">/, `<meta name="description" content="${targetDesc}">`);

// Replace legal page article
res = res.replace(/<article class="legal-page-wrap">[\s\S]*?<\/article>/, shippingContent);

fs.writeFileSync(path.join(rootDir, 'shipping-returns.html'), res, 'utf8');
console.log('Created shipping-returns.html');

fs.writeFileSync(path.join(rootDir, 'preview', 'shipping-returns.html'), res, 'utf8');
console.log('Created preview/shipping-returns.html');
