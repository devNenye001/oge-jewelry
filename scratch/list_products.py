with open('assets/catalog-data.js', 'r', encoding='utf-8') as f:
    lines = f.readlines()

import re
products = []
current = {}
for line in lines:
    t = re.search(r'title:\s*["\']([^"\']+)["\']', line)
    cat = re.search(r'category:\s*["\']([^"\']+)["\']', line)
    col = re.search(r'collection:\s*["\']([^"\']+)["\']', line)
    price = re.search(r'price:\s*(\d+)', line)
    if t and 'title' not in current:
        current['title'] = t.group(1)
    if cat and 'category' not in current:
        current['category'] = cat.group(1)
    if col and 'collection' not in current:
        current['collection'] = col.group(1)
    if price and 'price' not in current:
        current['price'] = price.group(1)
    if 'materials:' in line and current:
        products.append(current)
        current = {}

print(f"Total products parsed: {len(products)}")
for p in products[:15]:
    print(p)
