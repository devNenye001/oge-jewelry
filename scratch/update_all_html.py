import glob
import re
import os

LOCATION_MODAL_HTML = '''  <!-- =========================================================================
       LOCATION SELECTOR MODAL (EXACT FIGMA MATCH)
       ========================================================================= -->
  <div class="location-modal-backdrop" data-location-modal-backdrop style="display: none;"></div>
  <div class="location-modal" data-location-modal style="display: none;" role="dialog" aria-modal="true" aria-label="Select your location">
    <div class="location-modal__header">
      <h3 class="location-modal__title">Select your location</h3>
      <button type="button" class="location-modal__close" data-location-modal-close aria-label="Close location modal">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.6"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
      </button>
    </div>
    <div class="location-modal__grid">
      <!-- 1. Europe -->
      <button type="button" class="location-item is-selected" data-location-item data-location-code="eu">
        <span class="location-item__flag">
          <svg viewBox="0 0 32 32" width="32" height="32"><circle cx="16" cy="16" r="16" fill="#003399"/><circle cx="16" cy="16" r="9" fill="none" stroke="#FFCC00" stroke-width="2.5" stroke-dasharray="1.8 2.8"/></svg>
        </span>
        <span class="location-item__text">
          <span class="location-item__country">Europe</span>
          <span class="location-item__language">English</span>
        </span>
      </button>

      <!-- 2. Australia & NZ -->
      <button type="button" class="location-item" data-location-item data-location-code="au">
        <span class="location-item__flag">
          <svg viewBox="0 0 32 32" width="32" height="32"><circle cx="16" cy="16" r="16" fill="#00008B"/><rect width="14" height="10" fill="#00247D"/><path d="M0 0 L14 10 M14 0 L0 10" stroke="#FFF" stroke-width="2"/><path d="M0 0 L14 10 M14 0 L0 10" stroke="#CF142B" stroke-width="1"/><path d="M7 0 V10 M0 5 H14" stroke="#FFF" stroke-width="3"/><path d="M7 0 V10 M0 5 H14" stroke="#CF142B" stroke-width="1.8"/><circle cx="23" cy="8" r="1.2" fill="#FFF"/><circle cx="26" cy="14" r="1.2" fill="#FFF"/><circle cx="24" cy="22" r="1.2" fill="#FFF"/><circle cx="19" cy="24" r="1.2" fill="#FFF"/><circle cx="10" cy="22" r="1.8" fill="#FFF"/></svg>
        </span>
        <span class="location-item__text">
          <span class="location-item__country">Australia &amp; NZ</span>
          <span class="location-item__language">English</span>
        </span>
      </button>

      <!-- 3. Canada -->
      <button type="button" class="location-item" data-location-item data-location-code="ca">
        <span class="location-item__flag">
          <svg viewBox="0 0 32 32" width="32" height="32"><circle cx="16" cy="16" r="16" fill="#FF0000"/><rect x="8" width="16" height="32" fill="#FFFFFF"/><path d="M16 9 L17.5 13.5 L21 12.5 L19.5 16 L22.5 18 L18.5 19 L19 22 L16 20.5 L13 22 L13.5 19 L9.5 18 L12.5 16 L11 12.5 L14.5 13.5 Z M15.5 20.5 L15.5 24 L16.5 24 L16.5 20.5 Z" fill="#FF0000"/></svg>
        </span>
        <span class="location-item__text">
          <span class="location-item__country">Canada</span>
          <span class="location-item__language">English</span>
        </span>
      </button>

      <!-- 4. Danmark -->
      <button type="button" class="location-item" data-location-item data-location-code="dk">
        <span class="location-item__flag">
          <svg viewBox="0 0 32 32" width="32" height="32"><circle cx="16" cy="16" r="16" fill="#C8102E"/><rect x="10" y="0" width="4" height="32" fill="#FFFFFF"/><rect x="0" y="14" width="32" height="4" fill="#FFFFFF"/></svg>
        </span>
        <span class="location-item__text">
          <span class="location-item__country">Danmark</span>
          <span class="location-item__language">Dansk</span>
        </span>
      </button>

      <!-- 5. Deutschland & Österreich -->
      <button type="button" class="location-item" data-location-item data-location-code="de">
        <span class="location-item__flag">
          <svg viewBox="0 0 32 32" width="32" height="32"><clipPath id="de-clip"><circle cx="16" cy="16" r="16"/></clipPath><g clip-path="url(#de-clip)"><rect width="32" height="10.67" fill="#000000"/><rect y="10.67" width="32" height="10.67" fill="#DD0000"/><rect y="21.33" width="32" height="10.67" fill="#FFCE00"/></g></svg>
        </span>
        <span class="location-item__text">
          <span class="location-item__country">Deutschland &amp; Österreich</span>
          <span class="location-item__language">Deutsch</span>
        </span>
      </button>

      <!-- 6. France -->
      <button type="button" class="location-item" data-location-item data-location-code="fr">
        <span class="location-item__flag">
          <svg viewBox="0 0 32 32" width="32" height="32"><clipPath id="fr-clip"><circle cx="16" cy="16" r="16"/></clipPath><g clip-path="url(#fr-clip)"><rect width="10.67" height="32" fill="#002395"/><rect x="10.67" width="10.67" height="32" fill="#FFFFFF"/><rect x="21.33" width="10.67" height="32" fill="#ED2939"/></g></svg>
        </span>
        <span class="location-item__text">
          <span class="location-item__country">France</span>
          <span class="location-item__language">Français</span>
        </span>
      </button>

      <!-- 7. Nederland -->
      <button type="button" class="location-item" data-location-item data-location-code="nl">
        <span class="location-item__flag">
          <svg viewBox="0 0 32 32" width="32" height="32"><clipPath id="nl-clip"><circle cx="16" cy="16" r="16"/></clipPath><g clip-path="url(#nl-clip)"><rect width="32" height="10.67" fill="#AE1C28"/><rect y="10.67" width="32" height="10.67" fill="#FFFFFF"/><rect y="21.33" width="32" height="10.67" fill="#21468B"/></g></svg>
        </span>
        <span class="location-item__text">
          <span class="location-item__country">Nederland</span>
          <span class="location-item__language">Nederlands</span>
        </span>
      </button>

      <!-- 8. Norway -->
      <button type="button" class="location-item" data-location-item data-location-code="no">
        <span class="location-item__flag">
          <svg viewBox="0 0 32 32" width="32" height="32"><circle cx="16" cy="16" r="16" fill="#BA0C2F"/><rect x="9" y="0" width="6" height="32" fill="#FFFFFF"/><rect x="0" y="13" width="32" height="6" fill="#FFFFFF"/><rect x="10.5" y="0" width="3" height="32" fill="#00205B"/><rect x="0" y="14.5" width="32" height="3" fill="#00205B"/></svg>
        </span>
        <span class="location-item__text">
          <span class="location-item__country">Norway</span>
          <span class="location-item__language">English</span>
        </span>
      </button>

      <!-- 9. Schweiz -->
      <button type="button" class="location-item" data-location-item data-location-code="ch">
        <span class="location-item__flag">
          <svg viewBox="0 0 32 32" width="32" height="32"><circle cx="16" cy="16" r="16" fill="#D52B1E"/><rect x="13.5" y="7" width="5" height="18" fill="#FFFFFF"/><rect x="7" y="13.5" width="18" height="5" fill="#FFFFFF"/></svg>
        </span>
        <span class="location-item__text">
          <span class="location-item__country">Schweiz</span>
          <span class="location-item__language">Deutsch</span>
        </span>
      </button>

      <!-- 10. Sverige -->
      <button type="button" class="location-item" data-location-item data-location-code="se">
        <span class="location-item__flag">
          <svg viewBox="0 0 32 32" width="32" height="32"><circle cx="16" cy="16" r="16" fill="#006AA7"/><rect x="10" y="0" width="4.5" height="32" fill="#FECC00"/><rect x="0" y="13.75" width="32" height="4.5" fill="#FECC00"/></svg>
        </span>
        <span class="location-item__text">
          <span class="location-item__country">Sverige</span>
          <span class="location-item__language">Svenska</span>
        </span>
      </button>

      <!-- 11. United Kingdom -->
      <button type="button" class="location-item" data-location-item data-location-code="gb">
        <span class="location-item__flag">
          <svg viewBox="0 0 32 32" width="32" height="32"><circle cx="16" cy="16" r="16" fill="#012169"/><path d="M0 0 L32 32 M32 0 L0 32" stroke="#FFFFFF" stroke-width="4.5"/><path d="M0 0 L32 32 M32 0 L0 32" stroke="#C8102E" stroke-width="2"/><path d="M16 0 V32 M0 16 H32" stroke="#FFFFFF" stroke-width="7"/><path d="M16 0 V32 M0 16 H32" stroke="#C8102E" stroke-width="4.2"/></svg>
        </span>
        <span class="location-item__text">
          <span class="location-item__country">United Kingdom</span>
          <span class="location-item__language">English</span>
        </span>
      </button>

      <!-- 12. United States -->
      <button type="button" class="location-item" data-location-item data-location-code="us">
        <span class="location-item__flag">
          <svg viewBox="0 0 32 32" width="32" height="32"><clipPath id="us-clip"><circle cx="16" cy="16" r="16"/></clipPath><g clip-path="url(#us-clip)"><rect width="32" height="32" fill="#B22234"/><line x1="0" y1="3.5" x2="32" y2="3.5" stroke="#FFF" stroke-width="2.5"/><line x1="0" y1="8.5" x2="32" y2="8.5" stroke="#FFF" stroke-width="2.5"/><line x1="0" y1="13.5" x2="32" y2="13.5" stroke="#FFF" stroke-width="2.5"/><line x1="0" y1="18.5" x2="32" y2="18.5" stroke="#FFF" stroke-width="2.5"/><line x1="0" y1="23.5" x2="32" y2="23.5" stroke="#FFF" stroke-width="2.5"/><line x1="0" y1="28.5" x2="32" y2="28.5" stroke="#FFF" stroke-width="2.5"/><rect width="15" height="15" fill="#3C3B6E"/><circle cx="4" cy="4" r="0.9" fill="#FFF"/><circle cx="8" cy="4" r="0.9" fill="#FFF"/><circle cx="12" cy="4" r="0.9" fill="#FFF"/><circle cx="6" cy="7.5" r="0.9" fill="#FFF"/><circle cx="10" cy="7.5" r="0.9" fill="#FFF"/><circle cx="4" cy="11" r="0.9" fill="#FFF"/><circle cx="8" cy="11" r="1" fill="#FFF"/><circle cx="12" cy="11" r="0.9" fill="#FFF"/></g></svg>
        </span>
        <span class="location-item__text">
          <span class="location-item__country">United States</span>
          <span class="location-item__language">English</span>
        </span>
      </button>

      <!-- 13. Rest of World -->
      <button type="button" class="location-item" data-location-item data-location-code="row">
        <span class="location-item__flag" style="background:#000;color:#FFF;">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
        </span>
        <span class="location-item__text">
          <span class="location-item__country">Rest of World</span>
          <span class="location-item__language">English</span>
        </span>
      </button>
    </div>
  </div>'''

SIDEBAR_LOC_REPLACEMENT = '''          <div class="sidebar-localization" data-country-trigger role="button" tabindex="0" aria-label="Select Country and Language" style="cursor: pointer;">
            <span class="sidebar-localization__flag-wrap" data-country-display-flag>
              <svg class="sidebar-localization__flag" viewBox="0 0 20 14" width="18" height="12" fill="none">
                <rect width="20" height="14" fill="#003399"/>
                <circle cx="10" cy="7" r="4.2" fill="none" stroke="#FFCC00" stroke-width="1.2" stroke-dasharray="0.8 1.4"/>
              </svg>
            </span>
            <span data-sidebar-location-text>Europe &nbsp;|&nbsp; English</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" width="12" height="12"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </div>'''

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as fp:
        content = fp.read()

    orig = content

    # 1. Update cart badge: hide when 0
    # Replace <span class="header-icon-btn__badge" data-cart-count>0</span> with style="display: none;"
    content = re.sub(
        r'<span class="header-icon-btn__badge" data-cart-count(?:\s*style="[^"]*")?>\s*0\s*</span>',
        '<span class="header-icon-btn__badge" data-cart-count style="display: none;">0</span>',
        content
    )
    # Also without "0" if any
    content = re.sub(
        r'<span class="header-icon-btn__badge" data-cart-count></span>',
        '<span class="header-icon-btn__badge" data-cart-count style="display: none;">0</span>',
        content
    )

    # 2. Update sidebar-localization block
    # Matches <div class="sidebar-localization"> ... </div> (closing tag before </div)
    sidebar_loc_pattern = re.compile(
        r'<div class="sidebar-localization"[\s\S]*?</div>\s*</div>\s*</div>\s*<!-- Panel 2',
        re.MULTILINE
    )
    if sidebar_loc_pattern.search(content):
        content = sidebar_loc_pattern.sub(
            SIDEBAR_LOC_REPLACEMENT + '\n        </div>\n      </div>\n\n      <!-- Panel 2',
            content
        )

    # 3. Add Location Modal if missing and page has body/footer
    if '<footer' in content and 'data-location-modal' not in content:
        # Insert before </body>
        if '</body>' in content:
            content = content.replace('</body>', LOCATION_MODAL_HTML + '\n\n</body>')

    if content != orig:
        with open(filepath, 'w', encoding='utf-8') as fp:
            fp.write(content)
        print(f"Updated {filepath}")
    else:
        print(f"No changes needed for {filepath}")

for folder in ['.', 'preview']:
    for f in sorted(glob.glob(os.path.join(folder, '*.html'))):
        process_file(f)
