with open('category.html', 'r', encoding='utf-8') as f:
    template = f.read()

category_pages = [
    {
        'file': 'earrings.html',
        'key': 'earrings',
        'title': 'EARRINGS',
        'meta_title': 'Earrings — OGÉ Fine Jewelry'
    },
    {
        'file': 'necklaces.html',
        'key': 'necklaces',
        'title': 'NECKLACES',
        'meta_title': 'Necklaces — OGÉ Fine Jewelry'
    },
    {
        'file': 'bracelets.html',
        'key': 'bracelets',
        'title': 'BRACELETS',
        'meta_title': 'Bracelets — OGÉ Fine Jewelry'
    },
    {
        'file': 'rings.html',
        'key': 'rings',
        'title': 'RINGS',
        'meta_title': 'Rings — OGÉ Fine Jewelry'
    },
    {
        'file': 'men.html',
        'key': 'men',
        'title': 'MEN',
        'meta_title': 'Men’s Jewelry — OGÉ Fine Jewelry'
    },
    {
        'file': 'fine-jewelry.html',
        'key': 'fine-jewelry',
        'title': 'FINE JEWELRY',
        'meta_title': 'Fine Jewelry — OGÉ Fine Jewelry'
    },
    {
        'file': 'new-in.html',
        'key': 'new-in',
        'title': 'NEW IN',
        'meta_title': 'New Arrivals — OGÉ Fine Jewelry'
    },
    {
        'file': 'jewelries.html',
        'key': 'jewelries',
        'title': 'SHOP ALL JEWELRIES',
        'meta_title': 'Shop All Jewelries — OGÉ Fine Jewelry'
    },
    {
        'file': 'shop.html',
        'key': 'all',
        'title': 'SHOP ALL JEWELRIES',
        'meta_title': 'Shop All Jewelry — OGÉ Fine Jewelry'
    }
]

for p in category_pages:
    content = template
    content = content.replace('<title id="category-page-title">Jewelry — OGÉ Fine Jewelry</title>', f'<title id="category-page-title">{p["meta_title"]}</title>')
    content = content.replace('<h1 class="category-page-title" id="category-page-heading">EARRINGS</h1>', f'<h1 class="category-page-title" id="category-page-heading">{p["title"]}</h1>')
    content = content.replace("let categoryKey = (params.get('type') || params.get('category') || 'earrings').toLowerCase().trim();", f"let categoryKey = (params.get('type') || params.get('category') || '{p['key']}').toLowerCase().trim();")

    with open(p['file'], 'w', encoding='utf-8') as f:
        f.write(content)

    with open(f'preview/{p["file"]}', 'w', encoding='utf-8') as f:
        f.write(content)

    print(f"Generated {p['file']} and preview/{p['file']}")
