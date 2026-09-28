import re

pages = {
    'privacy-policy.html': 'Legal Page',
    'terms-conditions.html': 'Legal Page',
    'shipping-returns.html': 'Legal Page',
    'blog-details.html': 'Blog Page',
    'about.html': 'About Page',
    'account-overview.html': 'Account Overview'
}

for page, label in pages.items():
    with open(page, 'r', encoding='utf-8') as f:
        content = f.read()
    print(f"[{page}] ({label}):")
    # check CSS link
    theme_css_m = re.search(r'theme\.css\?v=([\d\.]+)', content)
    print("  theme.css version:", theme_css_m.group(1) if theme_css_m else "none")
    # check scoped style
    style_m = re.search(r'<style>([\s\S]*?)</style>', content)
    if style_m:
        print("  Found scoped style tag with", len(style_m.group(1).splitlines()), "lines")
    else:
        print("  No scoped style tag")
    # check specific requirements
    if 'blog' in page:
        if '.blog-hero__title' in content and 'Perandory' in content and 'DM Sans' in content:
            print("  [OK] blog-hero__title Perandory & text blog DM Sans confirmed")
    if 'policy' in page or 'terms' in page or 'shipping' in page:
        if '.legal-page__title' in content and 'Perandory' in content and 'DM Sans' in content:
            print("  [OK] legal-page__title Perandory & body DM Sans confirmed")
    if 'about' in page:
        if 'Playfair Display' in content and 'Perandory' in content and 'DM Sans' in content:
            print("  [OK] Playfair quote, Perandory headings, DM Sans body confirmed")
    if 'account' in page:
        if 'id="btn-rec-prev"' in content and 'id="account-rec-grid"' in content:
            print("  [OK] Recommendations carousel controls & grid IDs confirmed")

print("\nAll page checks completed!")
