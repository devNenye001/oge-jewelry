import os
import re

root_dir = r"c:\Users\USER\Desktop\oge-jewelry-shopify"
folders = [root_dir, os.path.join(root_dir, "preview")]

for folder in folders:
    for filename in os.listdir(folder):
        if not filename.endswith(".html"):
            continue
        filepath = os.path.join(folder, filename)
        with open(filepath, "r", encoding="utf-8") as f:
            content = f.read()

        orig = content

        # 1. Cache busting on theme.css, base.css, theme.js
        content = re.sub(r'href="assets/theme\.css(\?v=[^"]*)?"', 'href="assets/theme.css?v=5.0"', content)
        content = re.sub(r'href="assets/base\.css(\?v=[^"]*)?"', 'href="assets/base.css?v=5.0"', content)
        content = re.sub(r'src="assets/theme\.js(\?v=[^"]*)?"', 'src="assets/theme.js?v=5.0"', content)

        # 2. Search modal Earrings image: ensure it points to sales1.jpg (the flower earring from mockup media_1790098721456.png)
        content = content.replace(
            '<img src="assets/earring-category.jpg" alt="Earrings" class="search-category-card__image"',
            '<img src="assets/sales1.jpg" alt="Earrings" class="search-category-card__image"'
        )

        # 3. Fix any lingering [Email Address]
        content = content.replace("[Email Address]", "oge@ogejewelry.com")

        if content != orig:
            with open(filepath, "w", encoding="utf-8") as f:
                f.write(content)
            print(f"Updated {filename} in {folder}")
        else:
            print(f"No changes needed for {filename} in {folder}")
