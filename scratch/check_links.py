import glob
import re
import os

for folder, pattern in [('root', '*.html'), ('preview', 'preview/*.html')]:
    broken = []
    files = glob.glob(pattern)
    for f in sorted(files):
        with open(f, 'r', encoding='utf-8') as fp:
            c = fp.read()
        hrefs = re.findall(r'href=["\']([^#"\':]+?\.html(?:\?[^#"\' ]*)?)["\']', c)
        for h in hrefs:
            base = h.split('?')[0]
            target = os.path.join('preview', base) if folder == 'preview' else base
            if not os.path.exists(target):
                broken.append((f, h))
    print(f"[{folder}] checked {len(files)} files, broken links: {len(broken)}")
    for src, lnk in broken:
        print(f"  In {src}: {lnk}")
