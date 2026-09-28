import re

with open('assets/catalog-data.js', 'r', encoding='utf-8') as f:
    content = f.read()

collections = set(re.findall(r'collection:\s*["\']([^"\']+)["\']', content))
categories = set(re.findall(r'category:\s*["\']([^"\']+)["\']', content))
print('Collections:', collections)
print('Categories:', categories)
