import json

with open('config/settings_schema.json', 'r', encoding='utf-8') as f:
    schema = json.load(f)

print(f"settings_schema.json is valid JSON with {len(schema)} sections.")
for idx, sec in enumerate(schema):
    name = sec.get("name")
    print(f"  {idx+1}. {name}")
    if name != "theme_info":
        settings = sec.get("settings", [])
        for s in settings:
            stype = s.get("type")
            sid = s.get("id")
            slabel = s.get("label")
            if not stype or not sid or not slabel:
                print(f"     WARNING: Incomplete setting: {s}")

with open('config/settings_data.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

print("settings_data.json is valid JSON with top-level keys:", list(data.keys()))
