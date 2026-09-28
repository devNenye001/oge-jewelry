import re

with open('assets/catalog-data.js', 'r', encoding='utf-8') as f:
    text = f.read()

# Let's find product entries in catalog-data.js
# handles, titles, prices, images
entries = re.findall(r'\{[^{}]*handle:\s*["\']([^"\']+)["\'][^{}]*\}', text)
print(f'Total handles found: {len(entries)}')

# Let's inspect products with secondary images
for block in re.finditer(r'\{([^{}]+handle:\s*["\']([^"\']+)["\'][^{}]+)\}', text):
    b = block.group(1)
    handle = block.group(2)
    title_m = re.search(r'title:\s*["\']([^"\']+)["\']', b)
    price_m = re.search(r'price:\s*["\']?([^"\',]+)["\']?', b)
    images_m = re.search(r'images:\s*\[([^\]]+)\]', b)
    img_list = [img.strip().strip('"\'') for img in images_m.group(1).split(',')] if images_m else []
    print(f'Handle: {handle} | Title: {title_m.group(1) if title_m else "?"} | Price: {price_m.group(1) if price_m else "?"} | Images: {img_list}')
