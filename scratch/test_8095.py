import urllib.request

req = urllib.request.urlopen('http://localhost:8095/index.html')
html = req.read().decode('utf-8')

print('Occurrences of data-cart-drawer-body:', html.count('data-cart-drawer-body'))
print('Occurrences of </aside>:', html.count('</aside>'))
print('Occurrences of <main:', html.count('<main'))

lines = html.splitlines()
for i, l in enumerate(lines):
    if '<main' in l:
        for j in range(max(0, i-8), min(len(lines), i+8)):
            print(f'{j+1}: {lines[j]}')
