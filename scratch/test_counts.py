import re

with open('assets/catalog-data.js', 'r', encoding='utf-8') as f:
    text = f.read()

# Let's count products per category
cats = ['earrings', 'necklaces', 'bracelets', 'rings', 'men', 'fine-jewelry', 'new', 'all']
for c in cats:
    count = 0
    # Let's simulate getProductsByCategory logic
    # In catalog-data.js:
    # men -> victorious or rings or bracelets
    # fine-jewelry -> Solid or Vermeil or price >= 140
    # new -> isNew: true
    matches = re.findall(rf'category:\s*"{c}"', text)
    print(f"Category '{c}': direct category matches = {len(matches)}")

cols = ['self-romance', 'alignment', 'boundaries', 'victorious']
for col in cols:
    matches = re.findall(rf'collection:\s*"{col}"', text)
    print(f"Collection '{col}': direct collection matches = {len(matches)}")
