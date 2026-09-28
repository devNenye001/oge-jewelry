import os
import re

terms_body = """    <article class="legal-page-wrap">
      <h1 class="legal-page__title">TERMS &amp; CONDITIONS</h1>

      <div class="legal-page__body">
        <p>
          Welcome to OGE Jewelry. These Terms &amp; Conditions govern your use of our website and the purchase of products from OGE Jewelry. By accessing our website or placing an order, you agree to these terms.
        </p>

        <div class="legal-page__section">
          <h3>1. ABOUT OGE</h3>
          <p>
            OGE Jewelry provides jewelry and related products through our online store. We reserve the right to update our products, pricing, content, and policies at any time.
          </p>
        </div>

        <div class="legal-page__section">
          <h3>2. PRODUCTS &amp; AVAILABILITY</h3>
          <p>
            We make every effort to ensure that product descriptions, images, materials, measurements, and prices are accurate. However, colours may appear slightly different depending on your device or screen.
          </p>
          <p>
            Product availability may change without notice. We reserve the right to limit quantities or discontinue products at any time.
          </p>
        </div>

        <div class="legal-page__section">
          <h3>3. PRICING &amp; PAYMENT</h3>
          <p>
            All prices displayed on our website are listed in the applicable currency shown at checkout.
          </p>
          <p>
            Prices may change without prior notice. Orders are only confirmed once payment has been successfully received.
          </p>
          <p>
            We reserve the right to correct pricing errors and, where necessary, cancel an order affected by an incorrect price.
          </p>
        </div>

        <div class="legal-page__section">
          <h3>4. ORDERS</h3>
          <p>
            Once an order is placed, you will receive an order confirmation by email.
          </p>
          <p>
            We reserve the right to refuse or cancel an order where there is an error in product information, pricing, availability, suspected fraudulent activity, or other circumstances requiring cancellation.
          </p>
          <p>
            If your order is cancelled after payment has been received, you will be notified and refunded through the applicable payment method.
          </p>
        </div>

        <div class="legal-page__section">
          <h3>5. SHIPPING &amp; DELIVERY</h3>
          <p>
            Orders are processed and shipped according to the delivery information provided on our website.
          </p>
          <p>
            Delivery times are estimates and may vary depending on the destination, shipping provider, customs processing, weather, or other circumstances outside our control.
          </p>
          <p>
            Customers are responsible for providing accurate shipping information at checkout.
          </p>
          <p>
            International orders may be subject to customs duties, taxes, or other fees imposed by the destination country. These charges are the responsibility of the customer unless otherwise stated.
          </p>
        </div>

        <div class="legal-page__section">
          <h3>6. RETURNS &amp; EXCHANGES</h3>
          <p>
            Our returns and exchange policy applies to eligible purchases and should be reviewed before placing an order.
          </p>
          <p>
            Returned items must meet the conditions outlined in our Returns Policy, including any applicable time limits and requirements regarding the condition of the jewelry.
          </p>
          <p>
            Items that are personalized, final sale, worn, damaged, or otherwise excluded under our Returns Policy may not be eligible for return or exchange.
          </p>
        </div>

        <div class="legal-page__section">
          <h3>7. JEWELRY CARE</h3>
          <p>
            To preserve the appearance and condition of your jewelry, we recommend following our jewelry-care instructions.
          </p>
          <p>
            Exposure to water, perfumes, lotions, chemicals, and other substances may affect certain materials and finishes.
          </p>
          <p>
            OGE is not responsible for damage resulting from improper use or care.
          </p>
        </div>

        <div class="legal-page__section">
          <h3>8. INTELLECTUAL PROPERTY</h3>
          <p>
            All content on this website, including photographs, videos, graphics, logos, product names, text, designs, and other materials, belongs to OGE Jewelry or its respective content owners.
          </p>
          <p>
            You may not copy, reproduce, modify, distribute, or use our content for commercial purposes without prior written permission.
          </p>
        </div>

        <div class="legal-page__section">
          <h3>9. WEBSITE USE</h3>
          <p>
            You agree to use our website only for lawful purposes and in a way that does not interfere with the operation or security of the website.
          </p>
          <p>
            You must not attempt to gain unauthorized access to any part of our website, introduce malicious software, or use the website for fraudulent purposes.
          </p>
        </div>

        <div class="legal-page__section">
          <h3>10. ACCURACY OF INFORMATION</h3>
          <p>
            We make reasonable efforts to keep information on our website accurate and current. However, we do not guarantee that all content will always be complete, accurate, or free from errors.
          </p>
          <p>
            We may correct or update information at any time without prior notice.
          </p>
        </div>

        <div class="legal-page__section">
          <h3>11. THIRD-PARTY SERVICES</h3>
          <p>
            Our website may use third-party services, including payment providers, shipping providers, analytics tools, and other applications.
          </p>
          <p>
            Your use of these services may be subject to the terms and privacy policies of the relevant third parties.
          </p>
        </div>

        <div class="legal-page__section">
          <h3>12. LIMITATION OF LIABILITY</h3>
          <p>
            To the extent permitted by applicable law, OGE Jewelry will not be responsible for losses arising from circumstances beyond our reasonable control, including shipping delays, service interruptions, technical issues, or events outside our control.
          </p>
          <p>
            Nothing in these Terms limits any rights or protections that cannot legally be excluded under applicable law.
          </p>
        </div>

        <div class="legal-page__section">
          <h3>13. PRIVACY</h3>
          <p>
            Your use of our website is also governed by our Privacy Policy, which explains how we collect, use, and protect your information.
          </p>
        </div>

        <div class="legal-page__section">
          <h3>14. CHANGES TO THESE TERMS</h3>
          <p>
            We may update these Terms &amp; Conditions from time to time. Any changes will be posted on this page with an updated "Last Updated" date.
          </p>
          <p>
            Your continued use of the website after changes are posted means you accept the updated terms.
          </p>
        </div>
      </div>
    </article>"""

root_dir = r"c:\Users\USER\Desktop\oge-jewelry-shopify"
for folder in [root_dir, os.path.join(root_dir, "preview")]:
    p = os.path.join(folder, "terms-conditions.html")
    if os.path.exists(p):
        with open(p, "r", encoding="utf-8") as f:
            content = f.read()

        # Remove announcement bar in terms-conditions.html (Image 2 starts directly with site-header)
        content = re.sub(r'<!-- =*?\s*1\.\s*ANNOUNCEMENT BAR\s*=*?-->\s*<aside class="announcement-bar"[\s\S]*?</aside>', '', content)
        content = re.sub(r'<aside class="announcement-bar"[\s\S]*?</aside>', '', content)

        # Replace article content
        content = re.sub(r'<article class="legal-page-wrap">[\s\S]*?</article>', terms_body, content)

        with open(p, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"Updated {p} to match Image 2 exact terms")
