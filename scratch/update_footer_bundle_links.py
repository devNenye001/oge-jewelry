import glob

count = 0
for filepath in glob.glob('*.html'):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    new_content = content.replace(
        '<a href="category.html?type=fine-jewelry" class="footer-col__link">Bundle Deals</a>',
        '<a href="bundle-deals.html" class="footer-col__link">Bundle Deals</a>'
    )
    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        count += 1
        print(f"Updated Bundle Deals link in {filepath}")

print(f"Updated {count} files in root")
