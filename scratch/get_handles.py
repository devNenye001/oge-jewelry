import re

content = open('assets/catalog-data.js', encoding='utf-8').read()
handles = re.findall(r'handle:\s*"([^"]+)"', content)
print("Total handles:", len(handles))
for h in handles:
    print(h)
