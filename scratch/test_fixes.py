import sys

with open('index.html', 'r', encoding='utf-8') as f:
    idx = f.read()

with open('preview/index.html', 'r', encoding='utf-8') as f:
    pidx = f.read()

with open('assets/catalog-data.js', 'r', encoding='utf-8') as f:
    cd = f.read()

with open('preview/assets/catalog-data.js', 'r', encoding='utf-8') as f:
    pcd = f.read()

# 1. Wishlist Heart in headers
assert 'id="btn-wishlist"' in idx, 'Wishlist missing in index.html'
assert 'id="btn-wishlist"' in pidx, 'Wishlist missing in preview/index.html'
assert 'icon-heart' in idx[:idx.find('btn-account')], 'Heart must be before account in index.html'
assert 'icon-heart' in pidx[:pidx.find('btn-account')], 'Heart must be before account in preview/index.html'

# 2. No currency selector modal anywhere in JS
assert 'SELECT COUNTRY' not in cd, 'Currency modal found in assets/catalog-data.js'
assert 'SELECT COUNTRY' not in pcd, 'Currency modal found in preview/assets/catalog-data.js'
assert 'Select your delivery country' not in cd, 'Delivery country text found in assets/catalog-data.js'
assert 'Select your delivery country' not in pcd, 'Delivery country text found in preview/assets/catalog-data.js'

# 3. Location modal present
assert 'data-location-modal' in idx, 'Location modal missing in index.html'
assert 'data-location-modal' in pidx, 'Location modal missing in preview/index.html'
assert 'Select your location' in idx, 'Select your location title missing in index.html'
assert 'Select your location' in pidx, 'Select your location title missing in preview/index.html'

# 4. FAQ section verification
assert 'font-weight: 600;' not in idx[idx.find('id="faqs"'):idx.find('</section>', idx.find('id="faqs"'))], 'Inline 600 bold found in index FAQ'
assert 'font-weight: 600;' not in pidx[pidx.find('id="faqs"'):pidx.find('</section>', pidx.find('id="faqs"'))], 'Inline 600 bold found in preview FAQ'

# 5. Button styling in CSS
with open('assets/theme.css', 'r', encoding='utf-8') as f:
    css = f.read()
assert 'BUTTON TYPOGRAPHY & CASING' in css, 'Missing button typography rule in assets/theme.css'

print('ALL CONSTRAINTS RIGOROUSLY VALIDATED AND PASSED!')
