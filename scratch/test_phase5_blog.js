const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('--- PHASE 5 BLOG & ARTICLE INTEGRATION VALIDATION ---');
let errors = 0;

function assert(condition, message) {
  if (!condition) {
    console.error(`[FAIL] ${message}`);
    errors++;
  } else {
    console.log(`[PASS] ${message}`);
  }
}

// 1. JavaScript Syntax Check
try {
  execSync('node -c assets/theme.js');
  assert(true, 'assets/theme.js compiles without syntax errors');
} catch (e) {
  assert(false, `assets/theme.js syntax error: ${e.message}`);
}

// 2. Validate templates/blog.json
assert(fs.existsSync('templates/blog.json'), 'templates/blog.json exists');
try {
  const blogJson = JSON.parse(fs.readFileSync('templates/blog.json', 'utf8'));
  assert(blogJson.sections && blogJson.sections.main && blogJson.sections.main.type === 'main-blog', 'templates/blog.json maps to main-blog section');
} catch (e) {
  assert(false, `templates/blog.json is invalid JSON: ${e.message}`);
}

// 3. Validate templates/article.json
assert(fs.existsSync('templates/article.json'), 'templates/article.json exists');
try {
  const articleJson = JSON.parse(fs.readFileSync('templates/article.json', 'utf8'));
  assert(articleJson.sections && articleJson.sections.main && articleJson.sections.main.type === 'main-article', 'templates/article.json maps to main-article section');
} catch (e) {
  assert(false, `templates/article.json is invalid JSON: ${e.message}`);
}

// 4. Validate snippets/article-card.liquid
assert(fs.existsSync('snippets/article-card.liquid'), 'snippets/article-card.liquid exists');
const articleCard = fs.readFileSync('snippets/article-card.liquid', 'utf8');
assert(articleCard.includes('journal-card'), 'article-card.liquid uses journal-card class');
assert(articleCard.includes('article.title'), 'article-card.liquid uses article.title');
assert(articleCard.includes('article.url'), 'article-card.liquid uses article.url');
assert(articleCard.includes('article.image'), 'article-card.liquid uses article.image');
assert(articleCard.includes('article.excerpt'), 'article-card.liquid uses article.excerpt');
assert(articleCard.includes('article.published_at'), 'article-card.liquid uses article.published_at');
assert(articleCard.includes('article.tags'), 'article-card.liquid uses article.tags');
assert(!articleCard.includes('.html'), 'article-card.liquid has no .html links');

// 5. Validate sections/main-blog.liquid
assert(fs.existsSync('sections/main-blog.liquid'), 'sections/main-blog.liquid exists');
const mainBlog = fs.readFileSync('sections/main-blog.liquid', 'utf8');
assert(mainBlog.includes('blog-hero'), 'main-blog.liquid contains blog-hero');
assert(mainBlog.includes('blog.title'), 'main-blog.liquid uses blog.title');
assert(mainBlog.includes('blog.all_tags'), 'main-blog.liquid supports category/tag filters');
assert(mainBlog.includes("render 'article-card'"), 'main-blog.liquid renders article-card snippet');
assert(mainBlog.includes('paginate blog.articles'), 'main-blog.liquid paginates blog.articles');
assert(mainBlog.includes('default_pagination'), 'main-blog.liquid includes pagination controls');

const blogSchemaMatch = mainBlog.match(/\{% schema %\}([\s\S]*?)\{% endschema %\}/);
assert(blogSchemaMatch !== null, 'main-blog.liquid contains schema');
if (blogSchemaMatch) {
  try {
    const parsedBlogSchema = JSON.parse(blogSchemaMatch[1]);
    assert(parsedBlogSchema.name === 'Blog Posts', 'main-blog.liquid schema parsed successfully');
  } catch (err) {
    assert(false, `main-blog.liquid schema JSON parse error: ${err.message}`);
  }
}

// 6. Validate sections/main-article.liquid
assert(fs.existsSync('sections/main-article.liquid'), 'sections/main-article.liquid exists');
const mainArticle = fs.readFileSync('sections/main-article.liquid', 'utf8');
assert(mainArticle.includes('blog-hero'), 'main-article.liquid contains blog-hero');
assert(mainArticle.includes('article.title'), 'main-article.liquid uses article.title');
assert(mainArticle.includes('article.image'), 'main-article.liquid uses article.image');
assert(mainArticle.includes('article.content'), 'main-article.liquid renders {{ article.content }}');
assert(mainArticle.includes('blog-article-content'), 'main-article.liquid uses blog-article-content class');
assert(mainArticle.includes('article.published_at'), 'main-article.liquid handles article.published_at');
assert(mainArticle.includes('article.author'), 'main-article.liquid handles article.author');
assert(mainArticle.includes('article.tags'), 'main-article.liquid handles article.tags');
assert(mainArticle.includes('blog.url'), 'main-article.liquid links back to blog.url');
assert(mainArticle.includes('related_article'), 'main-article.liquid handles related articles');
assert(!mainArticle.includes('.html'), 'main-article.liquid has no .html links');

const articleSchemaMatch = mainArticle.match(/\{% schema %\}([\s\S]*?)\{% endschema %\}/);
assert(articleSchemaMatch !== null, 'main-article.liquid contains schema');
if (articleSchemaMatch) {
  try {
    const parsedArticleSchema = JSON.parse(articleSchemaMatch[1]);
    assert(parsedArticleSchema.name === 'Blog Article', 'main-article.liquid schema parsed successfully');
  } catch (err) {
    assert(false, `main-article.liquid schema JSON parse error: ${err.message}`);
  }
}

// 7. Validate sections/journal-blog.liquid
assert(fs.existsSync('sections/journal-blog.liquid'), 'sections/journal-blog.liquid exists');
const journalBlog = fs.readFileSync('sections/journal-blog.liquid', 'utf8');
assert(journalBlog.includes("render 'article-card'"), 'journal-blog.liquid renders article-card snippet');
assert(journalBlog.includes('journal_blog.articles'), 'journal-blog.liquid queries journal_blog.articles');
assert(journalBlog.includes('horizontal-scroll-container'), 'journal-blog.liquid supports horizontal-scroll-container');
assert(!journalBlog.includes('#blog-1'), 'journal-blog.liquid replaced #blog-1 with real blog URL');

// 8. Validate CSS for Blog & Article
const themeCss = fs.readFileSync('assets/theme.css', 'utf8');
assert(themeCss.includes('.blog-hero'), 'theme.css defines .blog-hero');
assert(themeCss.includes('.blog-hero__title'), 'theme.css defines .blog-hero__title');
assert(themeCss.includes('.blog-article-container'), 'theme.css defines .blog-article-container');
assert(themeCss.includes('.blog-article-content'), 'theme.css defines .blog-article-content');
assert(themeCss.includes('.blog-listing-wrap'), 'theme.css defines .blog-listing-wrap');
assert(themeCss.includes('.blog-tag-link'), 'theme.css defines .blog-tag-link');
assert(themeCss.includes('.journal-card'), 'theme.css defines .journal-card');

console.log(`\nValidation complete. Total errors: ${errors}`);
process.exit(errors === 0 ? 0 : 1);
