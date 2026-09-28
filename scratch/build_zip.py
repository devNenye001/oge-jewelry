import os
import zipfile

root_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
zip_path = os.path.join(root_dir, "oge-jewelry-theme.zip")

folders = ["layout", "templates", "sections", "snippets", "assets", "config", "locales"]

# Exclude .mp4 video files from assets because Shopify has a 50MB theme upload limit
# Large videos in Shopify belong in Admin -> Content -> Files (Shopify CDN)
exclude_extensions = {".mp4"}

total_files = 0
uncompressed_size = 0

with zipfile.ZipFile(zip_path, "w", zipfile.ZIP_DEFLATED) as zipf:
    for folder in folders:
        folder_path = os.path.join(root_dir, folder)
        if not os.path.exists(folder_path):
            continue
        for root, dirs, files in os.walk(folder_path):
            for file in files:
                ext = os.path.splitext(file)[1].lower()
                if ext in exclude_extensions:
                    print(f"Skipping large media file from theme zip: {file}")
                    continue
                full_path = os.path.join(root, file)
                rel_path = os.path.relpath(full_path, root_dir)
                zipf.write(full_path, rel_path)
                total_files += 1
                uncompressed_size += os.path.getsize(full_path)

zip_size_mb = os.path.getsize(zip_path) / (1024 * 1024)
print(f"\nCreated: {zip_path}")
print(f"Total files in zip: {total_files}")
print(f"Uncompressed size: {uncompressed_size / (1024*1024):.2f} MB")
print(f"Final compressed ZIP size: {zip_size_mb:.2f} MB")
if zip_size_mb < 50:
    print("SUCCESS: ZIP size is UNDER the Shopify 50MB limit!")
else:
    print("WARNING: ZIP size still exceeds 50MB!")
