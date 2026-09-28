import re
import shutil

# 1. Refine theme.css
theme_path = 'assets/theme.css'
with open(theme_path, 'r', encoding='utf-8') as f:
    css = f.read()

# Update about split blocks to gap: 0 and border-radius: 0
css = css.replace("""/* 4. Split Mission & Vision Side-by-Side Blocks */
.about-split-blocks {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 24px clamp(40px, 5vw, 64px);
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.about-split-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  align-items: stretch;
  min-height: 320px;
}

.about-split-media {
  width: 100%;
  height: 100%;
  min-height: 300px;
  position: relative;
  overflow: hidden;
  border-radius: 2px;
  background-color: #EFEFEF;
}""", """/* 4. Split Mission & Vision Side-by-Side Blocks (Flush 2x2 Checkerboard) */
.about-split-blocks {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 24px clamp(40px, 5vw, 64px);
  display: flex;
  flex-direction: column;
  gap: 0;
}

.about-split-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;
  align-items: stretch;
  min-height: 320px;
}

.about-split-media {
  width: 100%;
  height: 100%;
  min-height: 300px;
  position: relative;
  overflow: hidden;
  border-radius: 0;
  background-color: #EFEFEF;
}""")

# Update sage box border radius
css = css.replace("""border-radius: 2px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  box-sizing: border-box;
}""", """border-radius: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  box-sizing: border-box;
}""")

# Update product add to bag and wishlist border-radius to 0
css = css.replace(""".product-add-to-bag-btn {
  flex: 1;
  height: 48px;
  background-color: #8C4B3A;
  color: #FFFFFF;
  font-family: var(--font-body);
  font-size: 0.875rem;
  font-weight: 500;
  border: none;
  border-radius: 2px;""", """.product-add-to-bag-btn {
  flex: 1;
  height: 48px;
  background-color: #8C4B3A;
  color: #FFFFFF;
  font-family: var(--font-body);
  font-size: 0.875rem;
  font-weight: 500;
  border: none;
  border-radius: 0;""")

css = css.replace(""".product-wishlist-btn {
  width: 48px;
  height: 48px;
  border: 1px solid #D4D4D4;
  border-radius: 2px;""", """.product-wishlist-btn {
  width: 48px;
  height: 48px;
  border: 1px solid #D4D4D4;
  border-radius: 0;""")

# Update story media and intention media border radius
css = css.replace(""".about-story-media {
  width: 100%;
  aspect-ratio: 4 / 5;
  overflow: hidden;
  border-radius: 2px;""", """.about-story-media {
  width: 100%;
  aspect-ratio: 4 / 5;
  overflow: hidden;
  border-radius: 0;""")

css = css.replace(""".about-intention-media {
  width: 100%;
  aspect-ratio: 16 / 9;
  max-height: 520px;
  overflow: hidden;
  border-radius: 2px;""", """.about-intention-media {
  width: 100%;
  aspect-ratio: 16 / 9;
  max-height: 520px;
  overflow: hidden;
  border-radius: 0;""")

with open(theme_path, 'w', encoding='utf-8') as f:
    f.write(css)

print("Updated assets/theme.css successfully")
