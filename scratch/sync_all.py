import os, glob, re, shutil

# 1. Update all HTML files in root
html_files = glob.glob('*.html')
for hf in html_files:
    with open(hf, 'r', encoding='utf-8') as f:
        content = f.read()

    modified = False

    # Replace CHECKOUT with Checkout in buttons/links
    if '>CHECKOUT<' in content:
        content = content.replace('>CHECKOUT<', '>Checkout<')
        modified = True
    
    # Ensure location modal has display: none
    if 'class="location-modal-backdrop"' in content and 'style="display: none;"' not in content[:content.find('class="location-modal-backdrop"') + 80]:
        content = content.replace('class="location-modal-backdrop"', 'class="location-modal-backdrop" style="display: none;"')
        modified = True
    
    if 'class="location-modal"' in content and 'style="display: none;"' not in content[:content.find('class="location-modal"') + 80]:
        content = content.replace('class="location-modal"', 'class="location-modal" style="display: none;"')
        modified = True

    if modified:
        with open(hf, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {hf}")

# 2. Sync to preview/
if os.path.isdir('preview'):
    # Copy all HTML files to preview/
    for hf in html_files:
        dest = os.path.join('preview', hf)
        shutil.copy2(hf, dest)
    print("Copied all HTML files to preview/")

    # Copy assets to preview/assets
    if os.path.isdir('assets'):
        os.makedirs('preview/assets', exist_ok=True)
        for af in os.listdir('assets'):
            src = os.path.join('assets', af)
            dst = os.path.join('preview', 'assets', af)
            if os.path.isfile(src):
                shutil.copy2(src, dst)
        print("Copied all assets to preview/assets/")

print("Sync completed successfully!")
