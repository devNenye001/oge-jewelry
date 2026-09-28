import re
with open('about.html', 'r', encoding='utf-8') as f:
    c = f.read()
imgs = re.findall(r'<img[^>]+src=["\']([^"\']+)["\']', c)
for img in sorted(set(imgs)):
    print(img)
