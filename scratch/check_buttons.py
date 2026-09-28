import re, glob

for file in ['index.html', 'blog-details.html']:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Check buttons and btn links
    matches = re.findall(r'<(?:button|a)[^>]*class="[^"]*(?:btn|button)[^"]*"[^>]*>(.*?)</(?:button|a)>', content, re.DOTALL)
    print(f"=== {file} ===")
    for m in matches:
        text = re.sub(r'<[^>]+>', '', m).strip()
        if text:
            print("  ", text)
