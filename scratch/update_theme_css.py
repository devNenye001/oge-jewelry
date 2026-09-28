import re

with open('assets/theme.css', 'r', encoding='utf-8') as f:
    css = f.read()

# 1. Update .account-product-grid (lines ~2983-2987)
old_grid = """.account-product-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}"""

new_grid = """.account-product-grid {
  display: flex !important;
  flex-wrap: nowrap !important;
  overflow-x: auto !important;
  scroll-behavior: smooth !important;
  scroll-snap-type: x mandatory !important;
  -webkit-overflow-scrolling: touch !important;
  gap: 20px !important;
  scrollbar-width: none !important;
  -ms-overflow-style: none !important;
  padding: 4px 0 16px !important;
  width: 100% !important;
}

.account-product-grid::-webkit-scrollbar {
  display: none !important;
}

.account-product-grid .product-card,
.account-product-grid .account-product-card {
  flex: 0 0 calc((100% - 40px) / 3) !important;
  min-width: 240px !important;
  max-width: 320px !important;
  scroll-snap-align: start !important;
}"""

if old_grid in css:
    css = css.replace(old_grid, new_grid)
    print("Updated .account-product-grid")
else:
    print("WARNING: old_grid not found")

# 2. Update About Page Typography in theme.css
# .about-hero__title
css = re.sub(
    r'\.about-hero__title\s*\{[^}]*\}',
    """.about-hero__title {
  font-family: 'Perandory', 'Cormorant Garamond', Georgia, serif !important;
  font-size: clamp(1.5rem, 3.2vw, 2.5rem);
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #FFFFFF;
  margin: 0;
  line-height: 1.2;
  text-shadow: 0 2px 14px rgba(0, 0, 0, 0.6);
}""",
    css
)

# .about-quote-text & .about-quote-author
css = re.sub(
    r'\.about-quote-text\s*\{[^}]*\}',
    """.about-quote-text {
  font-family: 'Playfair Display', Georgia, serif !important;
  font-size: clamp(1.2rem, 2.2vw, 1.5625rem) !important;
  font-weight: 500;
  font-style: normal;
  line-height: 1.65;
  color: #111111;
  margin: 0 0 24px;
  letter-spacing: 0.01em;
}""",
    css
)

css = re.sub(
    r'\.about-quote-author\s*\{[^}]*\}',
    """.about-quote-author {
  font-family: 'Playfair Display', Georgia, serif !important;
  font-size: 1.125rem !important;
  font-weight: 600;
  font-style: normal;
  color: #222222;
  margin: 0;
  letter-spacing: 0.04em;
}""",
    css
)

# .about-section-title & .about-story-text
css = re.sub(
    r'\.about-section-title\s*\{[^}]*\}',
    """.about-section-title {
  font-family: 'Perandory', 'Cormorant Garamond', Georgia, serif !important;
  font-size: clamp(1.6rem, 2.8vw, 2.25rem);
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #111111;
  margin: 0 0 8px;
}""",
    css
)

css = re.sub(
    r'\.about-story-text\s*\{[^}]*\}',
    """.about-story-text {
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif !important;
  font-size: 0.9375rem !important;
  line-height: 1.7;
  color: #222222;
  font-weight: 400;
  margin: 0;
}""",
    css
)

# .about-sage-title & .about-sage-text
css = re.sub(
    r'\.about-sage-title\s*\{[^}]*\}',
    """.about-sage-title {
  font-family: 'Perandory', 'Cormorant Garamond', Georgia, serif !important;
  font-size: clamp(1.4rem, 2.4vw, 1.95rem);
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #FFFFFF;
  margin: 0 0 16px;
}""",
    css
)

css = re.sub(
    r'\.about-sage-text\s*\{[^}]*\}',
    """.about-sage-text {
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif !important;
  font-size: 0.9375rem !important;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.95);
  font-weight: 400;
  margin: 0;
}""",
    css
)

# .about-intention-title & .about-intention-desc
css = re.sub(
    r'\.about-intention-title\s*\{[^}]*\}',
    """.about-intention-title {
  font-family: 'Perandory', 'Cormorant Garamond', Georgia, serif !important;
  font-size: clamp(1.5rem, 2.5vw, 2.1rem);
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #111111;
  margin: 0 0 10px;
}""",
    css
)

css = re.sub(
    r'\.about-intention-desc\s*\{[^}]*\}',
    """.about-intention-desc {
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif !important;
  font-size: 0.9375rem !important;
  line-height: 1.7;
  color: #222222;
  font-weight: 400;
  margin: 0;
  max-width: 900px;
}""",
    css
)
print("Updated About Page Typography in theme.css")

# 3. Global Headings (Perandory) and Exclusions
old_global = """h1, 
h2:not(.account-sidebar__name):not(.orders-empty-title):not(.profile-col-title):not(.wishlist-empty-title), 
h3:not(.product-card__title):not(.account-product-card__title):not(.account-card__title):not(.profile-edit-modal__title):not(.journal-card__title):not(.blog-card__title), 
h4, h5, h6,
.section-header__title,
.category-bento__title,
.signature-collection-card__title,
.tall-banner-card__title,
.essence-title,
.footer-col__title,
.blog-hero-title {
  font-family: 'Perandory', 'Cormorant Garamond', Georgia, serif !important;
  letter-spacing: 0 !important;
}"""

new_global = """h1:not(.no-perandory), 
h2:not(.account-sidebar__name):not(.orders-empty-title):not(.profile-col-title):not(.wishlist-empty-title):not(.legal-page-wrap *):not(.blog-article-content *):not(.blog-article-container *), 
h3:not(.product-card__title):not(.account-product-card__title):not(.account-card__title):not(.profile-edit-modal__title):not(.journal-card__title):not(.blog-card__title):not(.legal-page-wrap *):not(.blog-article-content *):not(.blog-article-container *), 
h4:not(.legal-page-wrap *):not(.blog-article-content *):not(.blog-article-container *), 
h5:not(.legal-page-wrap *):not(.blog-article-content *):not(.blog-article-container *), 
h6:not(.legal-page-wrap *):not(.blog-article-content *):not(.blog-article-container *),
.section-header__title,
.category-bento__title,
.signature-collection-card__title,
.tall-banner-card__title,
.essence-title,
.footer-col__title,
.blog-hero-title,
.blog-hero__title {
  font-family: 'Perandory', 'Cormorant Garamond', Georgia, serif !important;
  letter-spacing: 0 !important;
}

/* Legal Pages Typography: Only main heading is Perandory; ALL body text and subheadings are DM Sans */
.legal-page-wrap h2,
.legal-page-wrap h3,
.legal-page-wrap h4,
.legal-page-wrap h5,
.legal-page-wrap h6,
.legal-page-wrap p,
.legal-page-wrap ul,
.legal-page-wrap ol,
.legal-page-wrap li,
.legal-page-wrap span,
.legal-page-wrap strong,
.legal-page-wrap em,
.legal-page-wrap a,
.legal-page__body,
.legal-page__body *,
.legal-page__section,
.legal-page__section *,
.template-policy .legal-page-wrap *:not(.legal-page__title) {
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif !important;
}

/* Blog Article Typography: Only main hero title is Perandory; ALL article content headings and text are DM Sans */
.blog-article-container h2,
.blog-article-container h3,
.blog-article-container h4,
.blog-article-container h5,
.blog-article-container h6,
.blog-article-container p,
.blog-article-container ul,
.blog-article-container ol,
.blog-article-container li,
.blog-article-container span,
.blog-article-container strong,
.blog-article-container em,
.blog-article-container a,
.blog-article-content,
.blog-article-content * {
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif !important;
}"""

if old_global in css:
    css = css.replace(old_global, new_global)
    print("Updated Global Headings and added Legal & Blog DM Sans overrides")
else:
    print("WARNING: old_global not found")

with open('assets/theme.css', 'w', encoding='utf-8') as f:
    f.write(css)

print("Saved assets/theme.css successfully")
