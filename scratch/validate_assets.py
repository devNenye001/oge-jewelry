import os, glob, re

assets = set(os.listdir('assets'))
print(f"Assets in assets/ directory: {len(assets)}")

liquid_files = glob.glob('**/*.liquid', recursive=True)
referenced_assets = set()
missing = set()

for f in liquid_files:
    if f.startswith('scratch'):
        continue
    with open(f, 'r', encoding='utf-8') as fh:
        c = fh.read()
    matches = re.findall(r'[\'"]([^\'"]+\.(?:css|js|png|jpg|jpeg|svg|webp|gif))[\'"]\s*\|\s*asset_url', c)
    for m in matches:
        referenced_assets.add(m)
        if m not in assets:
            missing.add((f, m))

print(f"Total distinct referenced assets: {len(referenced_assets)}")
if missing:
    print(f"Missing assets found ({len(missing)}):")
    for f, m in sorted(list(missing)):
        print(f"  {f} references missing: {m}")
else:
    print("All referenced assets exist in assets/ directory!")
