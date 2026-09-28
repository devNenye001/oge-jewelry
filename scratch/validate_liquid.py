import glob, os, re

paired_tags = {
    'if': 'endif',
    'unless': 'endunless',
    'for': 'endfor',
    'case': 'endcase',
    'form': 'endform',
    'schema': 'endschema',
    'style': 'endstyle',
    'javascript': 'endjavascript',
    'doc': 'enddoc',
    'comment': 'endcomment',
    'raw': 'endraw'
}

reverse_paired = {v: k for k, v in paired_tags.items()}

all_liquid_files = sorted(glob.glob('**/*.liquid', recursive=True))
all_liquid_files = [f for f in all_liquid_files if not f.startswith('scratch')]

errors = []

for filepath in all_liquid_files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Check unclosed {{ or {%
    # Find all {% and {{ and ensure matching %} and }}
    tag_pattern = re.compile(r'({%|%}|{{|}})')
    tokens = tag_pattern.findall(content)
    
    # check simple bracket balance
    cur_delim = None
    for token in tokens:
        if token in ('{%', '{{'):
            if cur_delim is not None:
                errors.append(f"{filepath}: nested or unclosed opening delimiter '{token}' while inside '{cur_delim}'")
            cur_delim = token
        elif token in ('%}', '}}'):
            expected = '%}' if cur_delim == '{%' else '}}' if cur_delim == '{{' else None
            if cur_delim is None:
                errors.append(f"{filepath}: unexpected closing delimiter '{token}'")
            elif token != expected:
                errors.append(f"{filepath}: mismatched closing delimiter '{token}', expected '{expected}'")
            cur_delim = None

    if cur_delim is not None:
        errors.append(f"{filepath}: unclosed opening delimiter '{cur_delim}' at end of file")

    # Now parse block tags
    # Remove raw/comment contents for block analysis
    cleaned = re.sub(r'{%\s*comment\s*%}.*?{%\s*endcomment\s*%}', '', content, flags=re.DOTALL)
    cleaned = re.sub(r'{%\s*raw\s*%}.*?{%\s*endraw\s*%}', '', cleaned, flags=re.DOTALL)
    cleaned = re.sub(r'{%\s*doc\s*%}.*?{%\s*enddoc\s*%}', '', cleaned, flags=re.DOTALL)
    cleaned = re.sub(r'{%\s*schema\s*%}.*?{%\s*endschema\s*%}', '', cleaned, flags=re.DOTALL)

    block_matches = re.finditer(r'{%[-]?\s*([a-zA-Z_0-9]+)', cleaned)
    stack = []
    for m in block_matches:
        tag = m.group(1)
        if tag in paired_tags:
            stack.append((tag, m.start()))
        elif tag in reverse_paired:
            expected_start = reverse_paired[tag]
            if not stack:
                errors.append(f"{filepath}: unexpected closing tag '{tag}' with empty stack")
            else:
                last_start, pos = stack.pop()
                if last_start != expected_start:
                    errors.append(f"{filepath}: mismatched closing tag '{tag}', expected end for '{last_start}'")

    if stack:
        for tag, pos in stack:
            errors.append(f"{filepath}: unclosed opening tag '{tag}'")

print(f"Validated {len(all_liquid_files)} Liquid files.")
if errors:
    print(f"Found {len(errors)} Liquid errors:")
    for e in errors:
        print("  - " + e)
else:
    print("All Liquid files passed block and delimiter validation with zero errors!")
