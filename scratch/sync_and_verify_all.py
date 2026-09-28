import shutil
import os
import glob

# Files to sync
files = [
    'bundle-deals.html',
    'wishlist.html',
    'index.html',
    'assets/theme.css',
    'assets/theme.js'
]

# Add all HTML files where Bundle Deals link was updated
for f in glob.glob('*.html'):
    if f not in files:
        files.append(f)

for f in files:
    dest = os.path.join('preview', f)
    os.makedirs(os.path.dirname(dest), exist_ok=True)
    shutil.copy2(f, dest)

print(f"Synced {len(files)} files to preview/ successfully")

# Verify wishlist.html
with open('wishlist.html', 'r', encoding='utf-8') as f:
    w_html = f.read()

assert 'Back to Overview' in w_html
assert 'Nothing has been saved to your Wishlist' in w_html
assert 'Your saved items' in w_html
assert 'Shop' in w_html
assert 'YOU MAY ALSO LIKE' in w_html
assert 'related-prev' in w_html and 'related-next' in w_html
print("[OK] wishlist.html assertions passed")

# Verify bundle-deals.html
with open('bundle-deals.html', 'r', encoding='utf-8') as f:
    b_html = f.read()

assert 'BUNDLE DEALS' in b_html
assert '2 ALA RINGS FOR $150' in b_html
assert 'VALOR EARRING +' in b_html
assert 'assets/sales1.jpg' in b_html
assert 'assets/sales2.jpg' in b_html
assert 'Shop Now' in b_html
print("[OK] bundle-deals.html assertions passed")

# Verify theme.css
with open('assets/theme.css', 'r', encoding='utf-8') as f:
    t_css = f.read()

assert '.bundle-deals-wrapper' in t_css
assert '.wishlist-page-wrapper' in t_css
assert 'border: 1px solid #8C4B3A !important;' in t_css
print("[OK] assets/theme.css assertions passed")

# Verify theme.js
with open('assets/theme.js', 'r', encoding='utf-8') as f:
    t_js = f.read()

assert "item.addEventListener('toggle'" in t_js
print("[OK] assets/theme.js assertions passed")

print("ALL VERIFICATIONS AND PREVIEWS COMPLETED SUCCESSFULLY!")
