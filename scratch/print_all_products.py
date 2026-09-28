import re

with open('assets/catalog-data.js', 'r', encoding='utf-8') as f:
    text = f.read()

products = []
raw_products = text.split('{')
for block in raw_products:
    if 'handle:' in block:
        h = re.search(r'handle:\s*"([^"]+)"', block)
        t = re.search(r'title:\s*"([^"]+)"', block)
        c = re.search(r'category:\s*"([^"]+)"', block)
        col = re.search(r'collection:\s*"([^"]+)"', block)
        if h and t and c and col:
            products.append({
                'handle': h.group(1),
                'title': t.group(1),
                'category': c.group(1),
                'collection': col.group(1)
            })

for p in products:
    print(f"{p['collection']:15} | {p['category']:10} | {p['title']}")
