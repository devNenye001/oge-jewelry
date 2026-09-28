for css_path in ['assets/theme.css', 'preview/assets/theme.css']:
    with open(css_path, 'r', encoding='utf-8') as f:
        content = f.read()
    assert 'h3:not(.product-card__title):not(.account-product-card__title)' in content, f"Missing exclusion in {css_path}"
    assert '.product-card__title,' in content, f"Missing .product-card__title in {css_path}"
    assert "font-family: 'DM Sans', var(--font-body), sans-serif !important;" in content, f"Missing DM Sans rule in {css_path}"
    print(f"Verified {css_path}")

print("All product card title font checks passed!")
