import re
import glob

# =========================================================================
# 1. Update assets/theme.css
# =========================================================================
with open('assets/theme.css', 'r', encoding='utf-8') as f:
    css = f.read()

# Replace search modal CSS to be flush full-width with NO top or side gap
old_search_modal_block = re.search(r'\.search-modal\s*\{[\s\S]*?\.search-modal\.is-open\s*\{[\s\S]*?\}', css)
if old_search_modal_block:
    new_search_modal_rules = """.search-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  background-color: #FFFFFF;
  z-index: calc(var(--z-modal) + 1);
  opacity: 0;
  visibility: hidden;
  transform: translateY(-100%);
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.25s ease, visibility 0.25s ease;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  box-sizing: border-box;
  border-radius: 0;
  margin: 0;
}

.search-modal.is-open {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}"""
    css = css[:old_search_modal_block.start()] + new_search_modal_rules + css[old_search_modal_block.end():]
    print("Replaced .search-modal positioning to be flush full-width")

# Update .search-modal__inner and .search-modal__categories
css = re.sub(
    r'\.search-modal__inner\s*\{[\s\S]*?\}',
    """.search-modal__inner {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px 32px 36px;
  box-sizing: border-box;
}""",
    css
)

css = re.sub(
    r'\.search-modal__categories\s*\{[\s\S]*?\}',
    """.search-modal__categories {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  max-width: 480px;
  margin: 0 auto;
  width: 100%;
  box-sizing: border-box;
}""",
    css
)

# Update wishlist styles so product cards in wishlist have standard size and outline hearts
wishlist_css_addon = """
/* Wishlist Page Styling Refinements */
.wishlist-page-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px 24px 64px;
}

.wishlist-back-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: var(--font-body);
  font-size: 0.8125rem;
  color: #111111;
  text-decoration: none;
  margin-bottom: 20px;
  transition: color var(--transition-fast);
}

.wishlist-back-link:hover {
  color: #8C4B3A;
}

.wishlist-title {
  font-family: var(--font-heading);
  font-size: clamp(1.75rem, 3.2vw, 2.5rem);
  font-weight: 400;
  letter-spacing: -0.04em;
  text-transform: uppercase;
  color: #111111;
  margin: 0 0 16px;
}

.wishlist-title-divider {
  border: none;
  border-top: 1px solid #ECECEC;
  margin: 0 0 28px;
}

.wishlist-active-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 28px;
}

.wishlist-saved-count {
  font-family: var(--font-body);
  font-size: 0.875rem;
  color: #444444;
}

.wishlist-view-switchers {
  display: flex;
  gap: 8px;
}

.wishlist-view-btn {
  width: 28px;
  height: 28px;
  background: transparent;
  border: 1px solid transparent;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #777777;
  padding: 0;
  transition: all var(--transition-fast);
}

.wishlist-view-btn.is-active,
.wishlist-view-btn:hover {
  color: #111111;
  border-color: #D4D4D4;
}

.wishlist-grid-wrap {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

@media (max-width: 1024px) {
  .wishlist-grid-wrap {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .wishlist-grid-wrap {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }
}

.wishlist-grid-wrap--1-col {
  grid-template-columns: 1fr !important;
  max-width: 440px !important;
  margin: 0 auto !important;
}

/* Empty State Card */
.wishlist-empty-box {
  text-align: center;
  padding: 48px 20px 48px;
  max-width: 520px;
  margin: 0 auto 40px;
}

.wishlist-empty-title {
  font-family: var(--font-body);
  font-size: 1.0625rem;
  font-weight: 500;
  color: #111111;
  margin: 0 0 10px;
}

.wishlist-empty-desc {
  font-family: var(--font-body);
  font-size: 0.84375rem;
  color: #666666;
  line-height: 1.6;
  margin: 0 0 24px;
}

.wishlist-empty-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: #8C4B3A;
  color: #FFFFFF;
  font-family: var(--font-body);
  font-size: 0.875rem;
  font-weight: 400;
  text-transform: none;
  padding: 10px 40px;
  border-radius: 0;
  text-decoration: none;
  transition: background-color var(--transition-fast);
}

.wishlist-empty-btn:hover {
  background-color: #783E2F;
}
"""

css += wishlist_css_addon

with open('assets/theme.css', 'w', encoding='utf-8') as f:
    f.write(css)

print("Updated assets/theme.css successfully")
