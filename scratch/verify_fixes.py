import urllib.request

# Verify wishlist.html
with open('wishlist.html', 'r', encoding='utf-8') as f:
    w = f.read()

assert 'wishlist-grid-wrap' in w, "wishlist-grid-wrap missing"
assert 'wishlist-title-divider' in w, "wishlist-title-divider missing"
assert 'fill="none" stroke="#111111"' in w, "outline heart missing"
assert 'Nothing has been saved to your Wishlist' in w, "empty title missing"
assert 'Shop' in w, "Shop button missing"
assert 'YOU MAY ALSO LIKE' in w, "You May Also Like missing"
print("[OK] wishlist.html assertions passed")

# Verify theme.css
with open('assets/theme.css', 'r', encoding='utf-8') as f:
    c = f.read()

assert 'top: 0;' in c and 'transform: translateY(-100%);' in c, "search modal top attachment missing"
assert '.wishlist-grid-wrap {' in c, "wishlist-grid-wrap CSS missing"
print("[OK] assets/theme.css assertions passed")

# Verify HTTP
req1 = urllib.request.urlopen('http://localhost:8095/wishlist.html')
assert req1.status == 200
req2 = urllib.request.urlopen('http://localhost:8095/index.html')
assert req2.status == 200
print("[OK] HTTP 200 on port 8095")

print("ALL VERIFICATIONS COMPLETED SUCCESSFULLY!")
