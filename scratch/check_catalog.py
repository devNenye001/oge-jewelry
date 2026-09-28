import re

with open('assets/catalog-data.js', 'r', encoding='utf-8') as f:
    cat = f.read()

handles = re.findall(r'handle:\s*["\']([^"\']+)["\']', cat)
for h in handles:
    if 'bracelet' in h or 'onyx' in h:
        print('Matching handle:', h)
