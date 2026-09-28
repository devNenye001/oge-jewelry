import glob
import re

clean_categories_html = """      <div class="search-modal__categories">
        <a href="category.html?type=rings" class="search-category-card">
          <div class="search-category-card__media">
            <img src="assets/rings-category.jpg" alt="Rings" class="search-category-card__image" loading="lazy" width="400" height="400">
          </div>
          <span class="search-category-card__title">Rings</span>
        </a>
        <a href="category.html?type=earrings" class="search-category-card">
          <div class="search-category-card__media">
            <img src="assets/earring-category.jpg" alt="Earrings" class="search-category-card__image" loading="lazy" width="400" height="400">
          </div>
          <span class="search-category-card__title">Earrings</span>
        </a>
      </div>"""

all_files = glob.glob('*.html')

count = 0
for f in all_files:
    with open(f, 'r', encoding='utf-8') as infile:
        content = infile.read()
    
    # Replace search-modal__categories block
    pattern = r'<div class="search-modal__categories">[\s\S]*?</div>\s*</div>\s*</div>'
    match = re.search(pattern, content)
    if match:
        new_content = content[:match.start()] + clean_categories_html + "\n    </div>\n  </div>" + content[match.end():]
        if new_content != content:
            with open(f, 'w', encoding='utf-8') as outfile:
                outfile.write(new_content)
            count += 1
            print(f"Updated search modal categories in {f}")

print(f"Total files updated: {count}")
