import shutil
import os

files_to_sync = [
    'product.html',
    'about.html',
    'assets/theme.css',
    'assets/catalog-data.js'
]

for f in files_to_sync:
    dest = os.path.join('preview', f)
    os.makedirs(os.path.dirname(dest), exist_ok=True)
    shutil.copy2(f, dest)
    print(f"Copied {f} -> {dest}")

# Test about.html contents
with open('about.html', 'r', encoding='utf-8') as f:
    about_html = f.read()

assert "MORE THAN JEWELRY. IT'S A FEELING." in about_html, "Hero title missing or mismatch"
assert "assets/sign-up-pic.jpg" in about_html, "Hero image missing"
assert "I design from a place of" in about_html, "Quote text missing"
assert "-Oge Ikekwem" in about_html, "Quote author missing"
assert "OUR STORY" in about_html, "Our Story heading missing"
assert "assets/Victorious-collection.jpg" in about_html, "Our Story image missing"
assert "OUR MISSION" in about_html, "Our Mission heading missing"
assert "assets/our-mission.jpg" in about_html, "Our Mission image missing"
assert "OUR VISION" in about_html, "Our Vision heading missing"
assert "assets/our-vision.JPG" in about_html, "Our Vision image missing"
assert "JEWELRY WITH INTENTION" in about_html, "Jewelry With Intention missing"
assert "assets/sales2.jpg" in about_html, "Jewelry With Intention image missing"
print("[OK] about.html verification passed!")

# Test product.html contents
with open('product.html', 'r', encoding='utf-8') as f:
    prod_html = f.read()

assert "VALOR V ONYX RING" in prod_html, "Product title missing"
assert "$70" in prod_html, "Product price missing"
assert "*Free Delivery on all orders above 100$*" in prod_html, "Free delivery note missing"
assert "Details &amp; Dimension" in prod_html or "Details & Dimension" in prod_html, "Details & Dimension accordion missing"
assert "About the materials" in prod_html, "About the materials accordion missing"
assert "Emotional Breakdown" in prod_html, "Emotional Breakdown accordion missing"
assert "Precautions" in prod_html, "Precautions accordion missing"
assert "Add to Bag" in prod_html, "Add to Bag button missing"
assert "YOU MAY ALSO LIKE" in prod_html, "Related products section missing"
assert "related-prev" in prod_html and "related-next" in prod_html, "Related nav buttons missing"
print("[OK] product.html verification passed!")

# Verify theme.css
with open('assets/theme.css', 'r', encoding='utf-8') as f:
    theme_css = f.read()

assert ".about-sage-box" in theme_css, "about-sage-box missing"
assert ".product-add-to-bag-btn" in theme_css, "product-add-to-bag-btn missing"
assert ".related-nav-btn" in theme_css, "related-nav-btn missing"
print("[OK] assets/theme.css verification passed!")

print("ALL CHECKS AND SYNCS COMPLETED SUCCESSFULLY!")
