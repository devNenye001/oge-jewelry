import glob, re

old_tiktok_re = re.compile(
    r'<a[^>]*href="https://tiktok\.com"[^>]*>.*?<svg[^>]*>.*?</svg>.*?</a>',
    re.DOTALL
)

new_tiktok = '''<a href="https://tiktok.com" target="_blank" rel="noopener" class="social-circle-btn" aria-label="TikTok">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743 2.895 2.895 0 0 1 2.312-4.643c.294 0 .579.04.85.116V9.352a6.347 6.347 0 0 0-.85-.058 6.34 6.34 0 0 0-6.335 6.34 6.34 6.34 0 0 0 10.82 4.49 6.273 6.273 0 0 0 1.96-4.49V8.71a8.28 8.28 0 0 0 4.81 1.48v-3.504Z"/></svg>
          </a>'''

count = 0
for f in glob.glob('*.html'):
    with open(f, 'r', encoding='utf-8') as fl:
        content = fl.read()
    
    if 'tiktok.com' in content:
        new_content = old_tiktok_re.sub(new_tiktok, content)
        if new_content != content:
            with open(f, 'w', encoding='utf-8') as fl:
                fl.write(new_content)
            count += 1
            print(f"Updated TikTok in {f}")

print(f"Updated TikTok SVG in {count} HTML files.")
