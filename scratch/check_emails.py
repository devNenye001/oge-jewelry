import os
import re

root_dir = r"c:\Users\USER\Desktop\oge-jewelry-shopify"

patterns = [r"\[Email", r"example\.com", r"your-email", r"@email\.com"]

for folder in [root_dir, os.path.join(root_dir, "preview")]:
    for f in os.listdir(folder):
        if f.endswith(".html"):
            p = os.path.join(folder, f)
            with open(p, "r", encoding="utf-8") as file:
                content = file.read()
                for pat in patterns:
                    matches = re.findall(pat, content, re.IGNORECASE)
                    if matches:
                        print(f"File {f} in {folder} matched {pat}: {len(matches)} times")
