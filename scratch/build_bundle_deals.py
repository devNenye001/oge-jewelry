import re

# We will read about.html as a pristine template base
with open('about.html', 'r', encoding='utf-8') as f:
    about_html = f.read()

# Replace title
bundle_html = about_html.replace(
    '<title>Our Story — OGÉ Fine Jewelry</title>',
    '<title>Bundle Deals — OGÉ Fine Jewelry</title>'
)
bundle_html = bundle_html.replace(
    '<meta name="description" content="Discover the story and ethos behind OGÉ Fine Jewelry. Founded by Oge Ikekwem, creating timeless luxury that meets women where they stand with intention and empowerment.">',
    '<meta name="description" content="Exclusive fine jewelry bundle deals and curated luxury jewelry set offers by OGÉ.">'
)

# Extract header (up to </header>) and sidebar/drawers up to <main
header_and_drawers = bundle_html[:bundle_html.find('<main')]

# Extract footer from <footer class="site-footer"> to end
footer_and_scripts = bundle_html[bundle_html.find('<footer class="site-footer">'):]

# Create bundle deals main section
bundle_main = '''<!-- =========================================================================
       MAIN BUNDLE DEALS SECTION (EXACT FIGMA 1:1 MATCH FOR SCREENSHOT 1)
       ========================================================================= -->
  <main id="MainContent" role="main">
    <div class="bundle-deals-wrapper">
      <h1 class="bundle-deals-heading">BUNDLE DEALS</h1>

      <div class="bundle-deals-grid">
        <!-- Card 1: 2 Ala Rings for $150 -->
        <div class="bundle-card">
          <img src="assets/sales1.jpg" alt="Bundle deal - 2 Ala Rings for $150" class="bundle-card__img" loading="eager" width="800" height="1000">
          <div class="bundle-card__overlay">
            <span class="bundle-card__eyebrow">Bundle deal</span>
            <h2 class="bundle-card__title">2 ALA RINGS FOR $150</h2>
            <a href="javascript:void(0)" class="bundle-card__link" id="btn-bundle-ala">Shop Now</a>
          </div>
        </div>

        <!-- Card 2: Valor Earring + Necklace for $200 -->
        <div class="bundle-card">
          <img src="assets/sales2.jpg" alt="Jewelry Set Offer - Valor Earring + Necklace for $200" class="bundle-card__img" loading="eager" width="800" height="1000">
          <div class="bundle-card__overlay">
            <span class="bundle-card__eyebrow">Jewelry Set Offer</span>
            <h2 class="bundle-card__title">VALOR EARRING +<br>NECKLACE FOR $200</h2>
            <a href="javascript:void(0)" class="bundle-card__link" id="btn-bundle-valor">Shop Now</a>
          </div>
        </div>
      </div>
    </div>
  </main>

  <hr class="category-divider-line">

  '''

# Add bundle deals interaction script
bundle_script = '''
  <script>
    document.addEventListener('DOMContentLoaded', function() {
      const btnAla = document.getElementById('btn-bundle-ala');
      const btnValor = document.getElementById('btn-bundle-valor');

      if (btnAla) {
        btnAla.addEventListener('click', function(e) {
          e.preventDefault();
          if (window.CartDrawer) {
            window.CartDrawer.addItem({
              handle: '2-ala-rings-bundle',
              title: '2 Ala Rings Bundle',
              variant: 'Gold',
              price: 150,
              priceUSD: 150,
              image: 'assets/sales1.jpg',
              tag: 'Bundle Deal',
              qty: 1
            });
          }
        });
      }

      if (btnValor) {
        btnValor.addEventListener('click', function(e) {
          e.preventDefault();
          if (window.CartDrawer) {
            window.CartDrawer.addItem({
              handle: 'valor-earring-necklace-set',
              title: 'Valor Earring + Necklace Set',
              variant: 'Gold',
              price: 200,
              priceUSD: 200,
              image: 'assets/sales2.jpg',
              tag: 'Jewelry Set Offer',
              qty: 1
            });
          }
        });
      }
    });
  </script>
</body>
</html>'''

# Replace bottom script
footer_and_scripts = re.sub(r'</body>\s*</html>', bundle_script, footer_and_scripts)

full_bundle_html = header_and_drawers + bundle_main + footer_and_scripts

with open('bundle-deals.html', 'w', encoding='utf-8') as f:
    f.write(full_bundle_html)

print("Created bundle-deals.html successfully")
