import os
import re

root_dir = r"c:\Users\USER\Desktop\oge-jewelry-shopify"
theme_css_path = os.path.join(root_dir, "assets", "theme.css")
preview_theme_css_path = os.path.join(root_dir, "preview", "assets", "theme.css")

css_additions = """
/* ==========================================================================
   FLUSH TOP SEARCH MODAL & EXACT SEARCH RESULTS PAGE ENHANCEMENTS
   ========================================================================== */
.search-modal {
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
  right: 0 !important;
  width: 100vw !important;
  max-width: 100vw !important;
  margin: 0 !important;
  padding: 0 !important;
  border: none !important;
  border-radius: 0 !important;
  background-color: #FFFFFF !important;
  z-index: 99999 !important;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.12) !important;
  box-sizing: border-box !important;
  transform: translateY(-100%) !important;
  transition: transform 0.32s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.25s ease, visibility 0.25s ease !important;
  opacity: 0 !important;
  visibility: hidden !important;
}

.search-modal.is-open {
  opacity: 1 !important;
  visibility: visible !important;
  transform: translateY(0) !important;
}

.search-modal-backdrop {
  position: fixed !important;
  inset: 0 !important;
  background-color: rgba(0, 0, 0, 0.45) !important;
  z-index: 99998 !important;
  opacity: 0 !important;
  visibility: hidden !important;
  transition: opacity 0.3s ease, visibility 0.3s ease !important;
}

.search-modal-backdrop.is-active {
  opacity: 1 !important;
  visibility: visible !important;
}

.search-modal__inner {
  width: 100% !important;
  max-width: 1200px !important;
  margin: 0 auto !important;
  padding: 16px 32px 32px !important;
  box-sizing: border-box !important;
}

.search-modal__bar {
  display: flex !important;
  align-items: center !important;
  gap: 14px !important;
  border: none !important;
  border-bottom: 1px solid #ECECEC !important;
  padding: 8px 0 14px !important;
  margin-bottom: 24px !important;
  width: 100% !important;
}

.search-modal__categories {
  display: grid !important;
  grid-template-columns: repeat(2, 220px) !important;
  justify-content: center !important;
  gap: 28px !important;
  margin: 0 auto !important;
  width: 100% !important;
  box-sizing: border-box !important;
}

@media (max-width: 540px) {
  .search-modal__categories {
    grid-template-columns: 1fr 1fr !important;
    gap: 16px !important;
    max-width: 360px !important;
  }
}

.search-category-card {
  display: flex !important;
  flex-direction: column !important;
  text-decoration: none !important;
  width: 100% !important;
}

.search-category-card__media {
  width: 100% !important;
  aspect-ratio: 1 / 1 !important;
  overflow: hidden !important;
  background-color: #F6F6F6 !important;
}

.search-category-card__image {
  width: 100% !important;
  height: 100% !important;
  object-fit: cover !important;
  display: block !important;
}

.search-category-card__title {
  font-family: 'DM Sans', sans-serif !important;
  font-size: 0.875rem !important;
  font-weight: 500 !important;
  color: #111111 !important;
  margin-top: 10px !important;
  text-align: left !important;
}

/* --------------------------------------------------------------------------
   SEARCH RESULTS PAGE (IMAGE 1 FIGMA 1:1 MATCH)
   -------------------------------------------------------------------------- */
.search-page-bar-container {
  width: 100%;
  background-color: #FFFFFF;
  border-bottom: 1px solid #ECECEC;
  padding: 14px 32px;
  box-sizing: border-box;
}

.search-page-bar {
  max-width: 1440px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 14px;
  width: 100%;
}

.search-page-bar__icon {
  color: #111111;
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.search-page-bar__input {
  flex: 1;
  border: none;
  background: transparent;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.9375rem;
  color: #111111;
  outline: none;
  padding: 4px 0;
}

.search-page-bar__clear {
  background: transparent;
  border: none;
  padding: 6px;
  cursor: pointer;
  color: #111111;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s ease, color 0.2s ease;
}

.search-page-bar__clear:hover {
  transform: scale(1.1);
  color: #995544;
}

.search-page-meta {
  text-align: center;
  padding: 24px 20px 32px;
}

.search-page-count {
  font-family: 'DM Sans', sans-serif;
  font-size: 0.8125rem;
  font-weight: 400;
  color: #222222;
  margin: 0;
  letter-spacing: 0.01em;
}

.search-page-products-wrap {
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 32px 64px;
  box-sizing: border-box;
}

@media (max-width: 768px) {
  .search-page-bar-container {
    padding: 12px 18px;
  }
  .search-page-products-wrap {
    padding: 0 16px 48px;
  }
}

/* --------------------------------------------------------------------------
   TERMS & CONDITIONS TYPOGRAPHY (IMAGE 2 MATCH)
   -------------------------------------------------------------------------- */
.legal-page-wrap {
  width: 100%;
  max-width: 900px !important;
  margin: 0 auto !important;
  padding: 44px 32px 64px !important;
  background-color: #FFFFFF !important;
}

.legal-page__title {
  font-family: 'Perandory', 'Cormorant Garamond', Georgia, serif !important;
  font-size: 2.25rem !important;
  font-weight: 600 !important;
  letter-spacing: 0.02em !important;
  text-transform: uppercase !important;
  color: #111111 !important;
  margin: 0 0 24px !important;
  text-align: left !important;
  line-height: 1.2 !important;
}

.legal-page__body {
  font-family: 'DM Sans', sans-serif !important;
  font-size: 0.875rem !important;
  line-height: 1.65 !important;
  color: #111111 !important;
}

.legal-page__body p {
  font-family: 'DM Sans', sans-serif !important;
  font-size: 0.875rem !important;
  font-weight: 400 !important;
  line-height: 1.65 !important;
  color: #222222 !important;
  margin-bottom: 14px !important;
}

.legal-page__section {
  margin-top: 26px !important;
}

.legal-page__body h3,
.legal-page__section h3 {
  font-family: 'DM Sans', sans-serif !important;
  font-size: 0.875rem !important;
  font-weight: 700 !important;
  letter-spacing: 0.04em !important;
  text-transform: uppercase !important;
  color: #111111 !important;
  margin: 26px 0 8px !important;
}
"""

for p in [theme_css_path, preview_theme_css_path]:
    if os.path.exists(p):
        with open(p, "r", encoding="utf-8") as f:
            content = f.read()
        # Append additions if not already present
        if "FLUSH TOP SEARCH MODAL & EXACT SEARCH RESULTS PAGE ENHANCEMENTS" not in content:
            content += "\n" + css_additions
            with open(p, "w", encoding="utf-8") as f:
                f.write(content)
            print(f"Appended enhancements to {p}")
        else:
            print(f"Already updated {p}")
