import shutil
import glob
import os

all_html = glob.glob('*.html')
for f in all_html:
    dest = os.path.join('preview', f)
    shutil.copy2(f, dest)

for asset in ['assets/theme.css', 'assets/theme.js', 'assets/catalog-data.js']:
    dest = os.path.join('preview', asset)
    os.makedirs(os.path.dirname(dest), exist_ok=True)
    shutil.copy2(asset, dest)

print("Synchronized all files to preview/ successfully")
