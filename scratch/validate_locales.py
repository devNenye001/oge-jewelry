import json, glob, re

with open('locales/en.default.json', 'r', encoding='utf-8') as f:
    locales = json.load(f)

def get_key(d, keys):
    for k in keys:
        if isinstance(d, dict) and k in d:
            d = d[k]
        else:
            return None
    return d

liquid_files = glob.glob('**/*.liquid', recursive=True)
missing_keys = set()

for f in liquid_files:
    if f.startswith('scratch'): continue
    with open(f, 'r', encoding='utf-8') as fh:
        c = fh.read()
    # matches 'key.subkey' | t
    matches = re.findall(r'[\'"]([a-zA-Z0-9_.]+)[\'"]\s*\|\s*t', c)
    for m in matches:
        keys = m.split('.')
        val = get_key(locales, keys)
        if val is None:
            missing_keys.add((f, m))

if missing_keys:
    print(f"Missing translation keys ({len(missing_keys)}):")
    for f, k in sorted(list(missing_keys)):
        print(f"  {f}: '{k}'")
else:
    print("All translation keys exist in locales/en.default.json!")
