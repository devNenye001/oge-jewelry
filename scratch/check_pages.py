import os
import re

files = ['privacy-policy.html', 'terms-conditions.html', 'shipping-returns.html', 'blog-details.html']
for fn in files:
    if not os.path.exists(fn):
        continue
    with open(fn, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # find main content
    m = re.search(r'<main[^>]*>([\s\S]*?)</main>', content, re.IGNORECASE)
    main_html = m.group(1) if m else content
    
    print(f"=== {fn} ===")
    matches = re.findall(r'<(h[1-6]|p|div|span|section|article)[^>]*class=[\'"]([^\'"]*)[\'"][^>]*>([^<]*)', main_html)
    headings = re.findall(r'<(h[1-6])([^>]*)>([\s\S]*?)</\1>', main_html)
    for tag, attrs, text in headings:
        clean_text = re.sub(r'<[^>]+>', '', text).strip()
        print(f"<{tag} {attrs.strip()}>{clean_text[:60]}")
