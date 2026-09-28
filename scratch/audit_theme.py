import os, glob, re, json

all_snippets = set(os.path.splitext(f)[0] for f in os.listdir('snippets') if f.endswith('.liquid'))
print(f'Existing snippets ({len(all_snippets)}):', sorted(list(all_snippets)))

all_liquid_files = glob.glob('**/*.liquid', recursive=True)
# filter out scratch directory if any
all_liquid_files = [f for f in all_liquid_files if not f.startswith('scratch')]
print(f'Checking {len(all_liquid_files)} liquid files...')

missing_snippets = []
schema_errors = []
schema_counts = 0

for l_file in all_liquid_files:
    with open(l_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # check rendered snippets
    matches = re.findall(r'{%\s*(?:render|include)\s+[\'"]([^\'"]+)[\'"]', content)
    for m in matches:
        if m not in all_snippets:
            missing_snippets.append((l_file, m))
            
    # check schema if section
    if l_file.startswith('sections') or l_file.startswith('sections\\') or l_file.startswith('sections/'):
        schema_matches = re.findall(r'{%\s*schema\s*%}(.*?){%\s*endschema\s*%}', content, re.DOTALL)
        if schema_matches:
            schema_counts += 1
            raw_schema = schema_matches[0].strip()
            try:
                s_json = json.loads(raw_schema)
                # check schema fields
                if not isinstance(s_json, dict):
                    schema_errors.append((l_file, "Schema root is not a dict"))
            except Exception as e:
                schema_errors.append((l_file, str(e)))

print(f'Sections with schema: {schema_counts}')
print(f'Missing snippets: {missing_snippets}')
print(f'Schema errors: {schema_errors}')
