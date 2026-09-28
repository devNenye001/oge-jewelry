for p in ['wishlist.html', 'preview/wishlist.html']:
    with open(p, 'r', encoding='utf-8') as f:
        content = f.read()
    assert "font-family: 'DM Sans'" in content, f"DM Sans missing in {p}"
    print(f"Verified {p}")

for css in ['assets/theme.css', 'preview/assets/theme.css']:
    with open(css, 'r', encoding='utf-8') as f:
        c = f.read()
    assert "h2.wishlist-empty-title" in c, f"h2.wishlist-empty-title missing in {css}"
    assert "p.wishlist-empty-desc" in c, f"p.wishlist-empty-desc missing in {css}"
    print(f"Verified {css}")

print("All Wishlist DM Sans checks passed!")
