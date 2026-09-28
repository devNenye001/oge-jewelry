with open('collection.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Customize collections.html
html = html.replace('<title id="collection-page-title">The Self Woman Collection — OGÉ Fine Jewelry</title>', '<title id="collection-page-title">Shop All Collections — OGÉ Fine Jewelry</title>')
html = html.replace("let collectionKey = (params.get('collection') || 'self-woman').toLowerCase().trim();", "let collectionKey = (params.get('collection') || 'all').toLowerCase().trim();")
html = html.replace('<h1 class="collection-hero-banner__title" id="collection-banner-title">THE SELF WOMAN COLLECTION</h1>', '<h1 class="collection-hero-banner__title" id="collection-banner-title">SHOP ALL COLLECTIONS</h1>')

with open('collections.html', 'w', encoding='utf-8') as f:
    f.write(html)

with open('preview/collections.html', 'w', encoding='utf-8') as f:
    f.write(html)

print("collections.html and preview/collections.html created successfully.")
