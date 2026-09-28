const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
let passedTests = 0;
let failedTests = 0;

function assert(condition, message) {
  if (condition) {
    passedTests++;
    console.log(`  ✓ ${message}`);
  } else {
    failedTests++;
    console.error(`  ✗ FAIL: ${message}`);
  }
}

console.log('====================================================');
console.log('OGÉ JEWELRY — PHASE 7 MERCHANT-READY AUTOMATED TESTS');
console.log('====================================================\n');

// 1. Validate All JSON files in templates/ and config/ and locales/
console.log('1. JSON Validation (templates, config, locales):');
const jsonDirs = ['templates', 'templates/customers', 'config', 'locales'];
jsonDirs.forEach(dir => {
  const fullDir = path.join(rootDir, dir);
  if (!fs.existsSync(fullDir)) return;
  const files = fs.readdirSync(fullDir).filter(f => f.endsWith('.json'));
  files.forEach(file => {
    const filePath = path.join(fullDir, file);
    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      JSON.parse(content);
      assert(true, `${dir}/${file} is valid JSON`);
    } catch (e) {
      assert(false, `${dir}/${file} failed JSON parse: ${e.message}`);
    }
  });
});

// 2. Validate all {% schema %} blocks in sections/
console.log('\n2. Liquid Schema Validation in sections/:');
const sectionsDir = path.join(rootDir, 'sections');
const sectionFiles = fs.readdirSync(sectionsDir).filter(f => f.endsWith('.liquid'));
sectionFiles.forEach(file => {
  const content = fs.readFileSync(path.join(sectionsDir, file), 'utf-8');
  const schemaMatch = content.match(/{%\s*schema\s*%}([\s\S]*?){%\s*endschema\s*%}/);
  if (schemaMatch) {
    try {
      const parsed = JSON.parse(schemaMatch[1]);
      assert(true, `sections/${file} schema is valid JSON (name: "${parsed.name || parsed.type || 'unnamed'}")`);
    } catch (e) {
      assert(false, `sections/${file} schema JSON error: ${e.message}`);
    }
  }
});

// 3. Verify that all sections referenced in templates exist
console.log('\n3. Template Section References Resolution:');
const templatesDir = path.join(rootDir, 'templates');
const templateFiles = fs.readdirSync(templatesDir).filter(f => f.endsWith('.json'));
templateFiles.forEach(file => {
  const content = JSON.parse(fs.readFileSync(path.join(templatesDir, file), 'utf-8'));
  if (content.sections) {
    Object.entries(content.sections).forEach(([secKey, secVal]) => {
      const sectionFile = path.join(sectionsDir, `${secVal.type}.liquid`);
      const exists = fs.existsSync(sectionFile);
      assert(exists, `templates/${file} section "${secKey}" (${secVal.type}.liquid) exists`);
    });
  }
});

// 4. Verify Homepage Sections & Dynamic Theme Editor Capabilities
console.log('\n4. Homepage Theme Editor Controls:');
const indexJson = JSON.parse(fs.readFileSync(path.join(rootDir, 'templates/index.json'), 'utf-8'));
assert(indexJson.order && indexJson.order.length >= 10, `index.json has ${indexJson.order.length} manageable sections`);

// 5. Verify Navigation Dynamic Menus
console.log('\n5. Navigation & Drawer Dynamic Menus:');
const sidebarContent = fs.readFileSync(path.join(rootDir, 'snippets/sidebar-drawer.liquid'), 'utf-8');
assert(sidebarContent.includes('linklists[menu]') || sidebarContent.includes('for link in link_list.links') || sidebarContent.includes('linklists[nav_menu]'), 'sidebar-drawer.liquid supports dynamic Shopify linklists');
const headerContent = fs.readFileSync(path.join(rootDir, 'sections/header.liquid'), 'utf-8');
assert(headerContent.includes('"id": "menu"') && headerContent.includes('"type": "link_list"'), 'sections/header.liquid has menu link_list setting in schema');

// 6. Verify Footer Dynamic Controls & Policy Links
console.log('\n6. Footer Policies & Settings:');
const footerContent = fs.readFileSync(path.join(rootDir, 'sections/footer.liquid'), 'utf-8');
assert(footerContent.includes('shop.privacy_policy.url'), 'footer.liquid references shop.privacy_policy.url');
assert(footerContent.includes('shop.terms_of_service.url'), 'footer.liquid references shop.terms_of_service.url');
assert(footerContent.includes('shop.shipping_policy.url'), 'footer.liquid references shop.shipping_policy.url');
assert(footerContent.includes('"id": "copyright"'), 'footer.liquid has copyright text setting in schema');

// 7. Verify About Page Dynamic Controls
console.log('\n7. About / Our Story Dynamic Controls:');
const aboutContent = fs.readFileSync(path.join(rootDir, 'sections/main-about.liquid'), 'utf-8');
assert(aboutContent.includes('section.settings.story_title'), 'main-about.liquid connects story_title');
assert(aboutContent.includes('section.settings.mission_title'), 'main-about.liquid connects mission_title');
assert(aboutContent.includes('section.settings.vision_title'), 'main-about.liquid connects vision_title');
assert(aboutContent.includes('section.settings.intention_title'), 'main-about.liquid connects intention_title');

// 8. Verify FAQ Dynamic Blocks
console.log('\n8. FAQ Page Blocks Management:');
const faqSectionContent = fs.readFileSync(path.join(rootDir, 'sections/faq-accordion.liquid'), 'utf-8');
assert(faqSectionContent.includes('type": "faq_item"'), 'faq-accordion.liquid defines faq_item blocks');
const pageFaqJson = JSON.parse(fs.readFileSync(path.join(rootDir, 'templates/page.faq.json'), 'utf-8'));
assert(pageFaqJson.sections.main.blocks && Object.keys(pageFaqJson.sections.main.blocks).length >= 5, 'page.faq.json has pre-populated blocks ready for Theme Editor');

// 9. Verify Policy Template
console.log('\n9. Policy Template:');
assert(fs.existsSync(path.join(rootDir, 'templates/policy.json')), 'templates/policy.json exists for Shopify native legal policies');
const mainPageContent = fs.readFileSync(path.join(rootDir, 'sections/main-page.liquid'), 'utf-8');
assert(mainPageContent.includes('page.title | default: policy.title'), 'main-page.liquid supports policy.title fallback');

// 10. Verify Safe URL resolution (No proto .html or hardcoded domains in Liquid)
console.log('\n10. URL Safety Audit in Liquid files:');
const allLiquidFiles = [];
function findLiquid(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory() && entry.name !== 'node_modules' && entry.name !== '.git' && entry.name !== 'preview' && entry.name !== 'scratch') {
      findLiquid(full);
    } else if (entry.isFile() && entry.name.endsWith('.liquid')) {
      allLiquidFiles.push(full);
    }
  }
}
findLiquid(rootDir);

let foundBadUrls = 0;
allLiquidFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf-8');
  // Check for .html inside href="..." (except shopify preview / cdn)
  const matches = content.match(/href="[^"]+\.html"/g);
  if (matches) {
    foundBadUrls++;
    console.error(`  Warning: Prototype .html found in ${path.relative(rootDir, file)}: ${matches.join(', ')}`);
  }
});
assert(foundBadUrls === 0, `No hardcoded prototype .html links in theme Liquid templates (${allLiquidFiles.length} files scanned)`);

// Summary
console.log('\n====================================================');
console.log(`PHASE 7 TEST RESULTS: ${passedTests} PASSED, ${failedTests} FAILED`);
console.log('====================================================\n');

if (failedTests > 0) {
  process.exit(1);
}
