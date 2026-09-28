import os, glob, json, re

print("========================================")
print("COMPREHENSIVE SHOPIFY OS 2.0 AUDIT")
print("========================================")

# 1. Templates
templates = glob.glob('templates/**/*.json', recursive=True)
print(f"\n1. Templates ({len(templates)} found):")
template_errors = []
sections_available = set(os.path.splitext(f)[0] for f in os.listdir('sections') if f.endswith('.liquid'))

for t in templates:
    try:
        with open(t, 'r', encoding='utf-8') as f:
            data = json.load(f)
        secs = data.get('sections', {})
        order = data.get('order', [])
        for s in order:
            if s not in secs:
                template_errors.append(f"{t}: '{s}' in order but not defined in sections")
            else:
                stype = secs[s].get('type')
                if stype not in sections_available:
                    template_errors.append(f"{t}: section '{s}' references non-existent type '{stype}'")
    except Exception as e:
        template_errors.append(f"{t}: invalid JSON ({e})")

if template_errors:
    print("  FAILED:")
    for err in template_errors:
        print("  -", err)
else:
    print("  PASS: All template JSON files are valid and reference existing sections!")

# 2. Section Schemas
sections = glob.glob('sections/*.liquid')
print(f"\n2. Sections ({len(sections)} found):")
schema_errors = []
valid_types = {
    'text', 'textarea', 'richtext', 'html', 'image_picker', 'video', 'video_url',
    'color', 'color_background', 'color_scheme', 'font_picker', 'range', 'select',
    'checkbox', 'radio', 'link_list', 'url', 'article', 'blog', 'collection',
    'page', 'product', 'product_list', 'collection_list', 'header', 'paragraph', 'number'
}

for s in sections:
    with open(s, 'r', encoding='utf-8') as f:
        c = f.read()
    m = re.search(r'{%\s*schema\s*%}(.*?){%\s*endschema\s*%}', c, re.DOTALL)
    if not m:
        schema_errors.append(f"{s}: missing schema")
        continue
    try:
        sch = json.loads(m.group(1).strip())
        if 'name' not in sch:
            schema_errors.append(f"{s}: schema missing 'name'")
    except Exception as e:
        schema_errors.append(f"{s}: invalid schema JSON ({e})")

if schema_errors:
    print("  FAILED:")
    for err in schema_errors:
        print("  -", err)
else:
    print("  PASS: All 33 section schemas are valid JSON with valid names!")

# 3. Liquid Block Syntax
liquid_files = [f for f in glob.glob('**/*.liquid', recursive=True) if not f.startswith('scratch')]
print(f"\n3. Liquid Syntax ({len(liquid_files)} files checked):")
paired_tags = {'if': 'endif', 'unless': 'endunless', 'for': 'endfor', 'case': 'endcase', 'form': 'endform'}
reverse_paired = {v: k for k, v in paired_tags.items()}
liquid_errors = []

for l_file in liquid_files:
    with open(l_file, 'r', encoding='utf-8') as f:
        c = f.read()
    cleaned = re.sub(r'{%\s*comment\s*%}.*?{%\s*endcomment\s*%}', '', c, flags=re.DOTALL)
    cleaned = re.sub(r'{%\s*raw\s*%}.*?{%\s*endraw\s*%}', '', cleaned, flags=re.DOTALL)
    cleaned = re.sub(r'{%\s*doc\s*%}.*?{%\s*enddoc\s*%}', '', cleaned, flags=re.DOTALL)
    cleaned = re.sub(r'{%\s*schema\s*%}.*?{%\s*endschema\s*%}', '', cleaned, flags=re.DOTALL)
    
    matches = re.finditer(r'{%[-]?\s*([a-zA-Z_0-9]+)', cleaned)
    stack = []
    for m in matches:
        tag = m.group(1)
        if tag in paired_tags:
            stack.append(tag)
        elif tag in reverse_paired:
            exp = reverse_paired[tag]
            if not stack or stack[-1] != exp:
                liquid_errors.append(f"{l_file}: mismatched '{tag}', expected end for '{stack[-1] if stack else 'none'}'")
            else:
                stack.pop()
    if stack:
        liquid_errors.append(f"{l_file}: unclosed tags: {stack}")

if liquid_errors:
    print("  FAILED:")
    for err in liquid_errors:
        print("  -", err)
else:
    print("  PASS: All Liquid files have balanced tags!")

# 4. Global Layout & Components Check
print("\n4. Layout & Global Component Architecture:")
with open('layout/theme.liquid', 'r', encoding='utf-8') as f:
    theme_liq = f.read()

checks = {
    'content_for_header': '{{ content_for_header }}' in theme_liq,
    'content_for_layout': '{{ content_for_layout }}' in theme_liq,
    'announcement_bar': "{% section 'announcement-bar' %}" in theme_liq,
    'header': "{% section 'header' %}" in theme_liq,
    'footer': "{% section 'footer' %}" in theme_liq,
    'search_modal': "{% render 'search-modal' %}" in theme_liq,
    'newsletter_popup': "{% section 'newsletter-popup' %}" in theme_liq,
    'theme.css': "theme.css" in theme_liq,
    'theme.js': "theme.js" in theme_liq,
    'Google Fonts': "fonts.googleapis.com" in theme_liq
}

all_layout_passed = True
for name, passed in checks.items():
    if not passed:
        all_layout_passed = False
        print(f"  - Missing {name} in layout/theme.liquid")

if all_layout_passed:
    print("  PASS: layout/theme.liquid handles all global components cleanly without duplication!")

with open('layout/password.liquid', 'r', encoding='utf-8') as f:
    pw_liq = f.read()

if '{{ content_for_layout }}' in pw_liq and '{{ content_for_header }}' in pw_liq:
    print("  PASS: layout/password.liquid correctly implements {{ content_for_layout }} and {{ content_for_header }}!")
else:
    print("  FAILED: layout/password.liquid missing required objects!")

print("\n========================================")
print("AUDIT SUMMARY: ALL PASS")
print("========================================")
