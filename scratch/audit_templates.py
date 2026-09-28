import glob, json

for f in sorted(glob.glob('templates/**/*.json', recursive=True)):
    with open(f, 'r', encoding='utf-8') as fh:
        data = json.load(fh)
    sections = data.get('sections', {})
    order = data.get('order', [])
    print(f'{f}:')
    for s in order:
        if s not in sections:
            print(f'  WARNING: {s} in order but not in sections')
        else:
            s_type = sections[s].get('type')
            print(f'  - {s} (type: {s_type})')
    # check if any section not in order
    for s in sections:
        if s not in order:
            print(f'  WARNING: {s} in sections but not in order')
