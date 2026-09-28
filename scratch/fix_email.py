import re
import os

root_dir = r"c:\Users\USER\Desktop\oge-jewelry-shopify"
preview_dir = os.path.join(root_dir, "preview")

# 1. Update shipping-returns.html to replace [Email Address] with oge@ogejewelry.com
for folder in [root_dir, preview_dir]:
    path = os.path.join(folder, "shipping-returns.html")
    if os.path.exists(path):
        with open(path, "r", encoding="utf-8") as f:
            content = f.read()
        content = content.replace("[Email Address]", "oge@ogejewelry.com")
        with open(path, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"Updated {path} email address")
