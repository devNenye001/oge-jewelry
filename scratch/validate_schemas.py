import glob, json, re

valid_types = {
    'text', 'textarea', 'richtext', 'html', 'image_picker', 'video', 'video_url',
    'color', 'color_background', 'color_scheme', 'font_picker', 'range', 'select',
    'checkbox', 'radio', 'link_list', 'url', 'article', 'blog', 'collection',
    'page', 'product', 'product_list', 'collection_list', 'header', 'paragraph', 'number'
}

schema_errors = []
sections = glob.glob('sections/*.liquid')

for s in sections:
    with open(s, 'r', encoding='utf-8') as f:
        content = f.read()

    schema_match = re.search(r'{%\s*schema\s*%}(.*?){%\s*endschema\s*%}', content, re.DOTALL)
    if not schema_match:
        schema_errors.append(s + ": missing schema block")
        continue

    try:
        data = json.loads(schema_match.group(1).strip())
    except Exception as e:
        schema_errors.append(f"{s}: invalid JSON in schema - {e}")
        continue

    if not isinstance(data, dict):
        schema_errors.append(f"{s}: schema root is not an object")
        continue

    if "name" not in data:
        schema_errors.append(f"{s}: schema missing 'name'")

    settings = data.get("settings", [])
    if not isinstance(settings, list):
        schema_errors.append(f"{s}: 'settings' is not a list")
    else:
        for idx, setting in enumerate(settings):
            stype = setting.get("type")
            if not stype:
                schema_errors.append(f"{s}: setting #{idx} missing 'type'")
            elif stype not in valid_types:
                schema_errors.append(f"{s}: setting #{idx} invalid type '{stype}'")
            if stype not in ('header', 'paragraph'):
                if "id" not in setting:
                    schema_errors.append(f"{s}: setting #{idx} missing 'id'")

    blocks = data.get("blocks", [])
    if not isinstance(blocks, list):
        schema_errors.append(f"{s}: 'blocks' is not a list")
    else:
        for idx, block in enumerate(blocks):
            if "type" not in block:
                schema_errors.append(f"{s}: block #{idx} missing 'type'")
            if "name" not in block:
                schema_errors.append(f"{s}: block #{idx} missing 'name'")
            bsettings = block.get("settings", [])
            for bidx, bsetting in enumerate(bsettings):
                bstype = bsetting.get("type")
                if not bstype or bstype not in valid_types:
                    schema_errors.append(f"{s}: block #{idx} setting #{bidx} invalid type '{bstype}'")
                if bstype not in ('header', 'paragraph'):
                    if "id" not in bsetting:
                        schema_errors.append(f"{s}: block #{idx} setting #{bidx} missing 'id'")

print(f"Validated schemas for {len(sections)} sections.")
if schema_errors:
    print(f"Found {len(schema_errors)} schema errors:")
    for err in schema_errors:
        print("  - " + err)
else:
    print("All section schemas strictly conform to Shopify requirements!")
