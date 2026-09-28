import os, re
from collections import Counter

with open('account-overview.html', 'r', encoding='utf-8') as f:
    html = f.read()

ids = re.findall(r'id=["\']([^"\']+)["\']', html)
counts = Counter(ids)
duplicates = {k: v for k, v in counts.items() if v > 1}
print('Duplicate IDs:', duplicates)

# Check tag balance
tags = re.findall(r'<\/?([a-zA-Z0-9\-]+)(?:\s+[^>]*?)?\/?>', html)
print('Total tag matches:', len(tags))
