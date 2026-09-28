import os
import re

files_to_check = {
    'categories': [
        'category.html', 'earrings.html', 'necklaces.html', 'bracelets.html',
        'rings.html', 'men.html', 'fine-jewelry.html', 'new-in.html', 'jewelries.html', 'shop.html'
    ],
    'collections': [
        'collection.html', 'collections.html'
    ]
}

passed = 0
failed = 0

for folder in ['', 'preview/']:
    print(f"\n--- Checking {folder or 'root'} ---")
    for f in files_to_check['categories']:
        path = os.path.join(folder, f)
        if not os.path.exists(path):
            print(f"FAILED: {path} does not exist!")
            failed += 1
            continue
        with open(path, 'r', encoding='utf-8') as fh:
            content = fh.read()
        has_title = 'category-page-title' in content or 'category-page-heading' in content
        has_divider = 'category-divider-line' in content
        has_util = 'collection-utility-bar' in content and 'Filter &amp; Sort' in content
        has_grid = 'category-grid' in content
        has_script = 'initCategoryPage' in content
        if has_title and has_divider and has_util and has_grid and has_script:
            print(f"PASSED: {path} (Category page structure complete)")
            passed += 1
        else:
            print(f"FAILED: {path} (Missing: title={has_title}, divider={has_divider}, util={has_util}, grid={has_grid}, script={has_script})")
            failed += 1

    for f in files_to_check['collections']:
        path = os.path.join(folder, f)
        if not os.path.exists(path):
            print(f"FAILED: {path} does not exist!")
            failed += 1
            continue
        with open(path, 'r', encoding='utf-8') as fh:
            content = fh.read()
        has_banner = 'collection-hero-banner' in content
        has_tabs = 'collection-category-tabs' in content
        has_util = 'collection-utility-bar' in content
        has_grid = 'collection-grid' in content
        has_script = 'initCollectionPage' in content
        if has_banner and has_tabs and has_util and has_grid and has_script:
            print(f"PASSED: {path} (Collection page structure complete)")
            passed += 1
        else:
            print(f"FAILED: {path} (Missing: banner={has_banner}, tabs={has_tabs}, util={has_util}, grid={has_grid}, script={has_script})")
            failed += 1

print(f"\nTotal: {passed} PASSED, {failed} FAILED.")
