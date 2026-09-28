# OGÉ Jewelry — Shopify Online Store 2.0 Theme

[![Shopify](https://img.shields.io/badge/Shopify-Online%20Store%202.0-96bf48?style=flat-square&logo=shopify&logoColor=white)](https://shopify.dev/docs/themes)
[![GitHub branch](https://img.shields.io/badge/branch-main-black?style=flat-square&logo=github)](https://github.com/devNenye001/oge-jewelry)
[![Theme Size](https://img.shields.io/badge/theme%20size-18.7%20MB-success?style=flat-square)]()
[![Status](https://img.shields.io/badge/status-Production%20Ready-gold?style=flat-square)]()

A bespoke, high-performance luxury jewelry theme built for **OGÉ Jewelry** on Shopify's **Online Store 2.0** architecture. Engineered with editorial elegance, fluid micro-animations, and full Shopify Admin / Theme Editor customizability.

---

## 💎 Features Overview

### 1. Storefront & Visual Experience
- **Editorial Luxury Design**: Tailored aesthetics with curated typography, gold accents (`#D4AF37`), subtle borders, and smooth transitions.
- **Hero & Video Reels**: Hero banner and interactive video reels with automatic fallback to high-resolution editorial photography.
- **Category Bento Grids & Signature Collections**: Interactive category highlights for Rings, Necklaces, Bracelets, and Earrings.
- **Announcement Bar & Header**: Sticky navigation with currency/language support, search trigger, customer account access, and real-time cart badge counter.
- **Brand Storytelling**: Dedicated sections for brand heritage, mission, vision, and customer testimonials.

### 2. Shopify Cart Integration
- **Real-Time AJAX Cart**: Fully connected to Shopify's `/cart/add.js`, `/cart/change.js`, and `/cart.js` APIs.
- **Interactive Cart Drawer**: Slide-out drawer displaying item images, titles, selected variants, unit prices, quantity increment/decrement, and item removal without page reloads.
- **Free Shipping Threshold Bar**: Dynamic visual progress meter calculating remaining spend needed for free shipping.
- **Gift Packaging Add-on & Order Notes**: Built-in support for special customer requests and luxury gift wrap attributes.

### 3. Catalog, Collections & Products
- **Reusable Product Cards**: Uniform aspect ratios, hover image switch, quick-view, custom collection badges (*New*, *Sale*, *Bestseller*), and dynamic Add to Cart.
- **Dynamic Variant Selector**: Real-time price updating, variant availability checks, and image switching.
- **Collection Filtering & Sorting**: Faceted filtering by availability, price, and category with alphabetical, price, and date sorting.
- **Product Recommendations**: Automated Shopify recommendation engine integration on product detail pages.

### 4. Search & Predictive Search
- **Live Predictive Search Modal**: Fetches matching Shopify products with titles, thumbnails, and live prices as the customer types.
- **Dedicated Search Page (`/search`)**: Full fallback search results grid supporting pagination and query filters.

### 5. Editorial Journal & Blog
- **Magazine-Style Blog (`/blogs/news`)**: Featured editorial banner with responsive article card grids.
- **Article Details (`templates/article.json`)**: Formatted article typography, author details, publication date, social sharing, and related article links.

### 6. Customer Account Suite
- Complete customer authentication and profile management templates:
  - Account Overview (`templates/customers/account.json`)
  - Order History & Order Details (`templates/customers/order.json`)
  - Customer Addresses (`templates/customers/addresses.json`)
  - Login, Registration, and Password Reset (`templates/customers/login.json`, etc.)

---

## 📁 Repository Structure

```text
oge-jewelry/
├── assets/                  # CSS styles, JS scripts, SVGs, and brand photography
│   ├── theme.css            # Master stylesheet with CSS Custom Properties
│   ├── theme.js             # Modular vanilla JS (Cart, Search, Modals, Drawers)
│   └── *.jpg, *.png         # High-resolution optimized brand photography
├── config/                  # Shopify theme configuration
│   ├── settings_schema.json # Theme Editor settings (Colors, Fonts, Social, Cart)
│   └── settings_data.json   # Active store configuration presets
├── layout/                  # Theme layouts
│   ├── theme.liquid         # Primary HTML5 shell for all pages
│   └── password.liquid      # Maintenance / Password-protected storefront layout
├── locales/                 # Internationalization & translations
│   └── en.default.json      # Default English schema and interface strings
├── sections/                # 26 Modular Online Store 2.0 sections
│   ├── header.liquid        # Global header with navigation & triggers
│   ├── footer.liquid        # Universal brand footer
│   ├── hero-banner.liquid   # Full-width hero with CTA
│   ├── main-product.liquid  # Product detail section with variant pickers
│   ├── main-collection.liquid # Collection listing & filter grid
│   ├── video-reels.liquid   # Reels & video banner showcase
│   └── ...
├── snippets/                # 14 Reusable Liquid snippets
│   ├── product-card.liquid  # Standardized product card component
│   ├── cart-drawer.liquid   # AJAX slide-out cart drawer
│   ├── search-modal.liquid  # Live predictive search modal
│   ├── sidebar-drawer.liquid# Mobile navigation menu
│   └── icon-*.liquid        # Clean inline SVG icon snippets
├── templates/               # 27 Online Store 2.0 JSON templates
│   ├── index.json           # Homepage structure
│   ├── product.json         # Product detail page
│   ├── collection.json      # Collection page
│   ├── cart.json            # Cart page
│   ├── blog.json            # Blog listing
│   ├── article.json         # Article detail
│   └── customers/           # Customer account JSON templates
├── .gitignore               # Excludes large videos and local build files
├── .shopifyignore          # Rules for Shopify CLI & GitHub theme sync
└── README.md
```

---

## 🚀 Deployment & Installation

### Option 1: Shopify GitHub Integration (Recommended)
This repository is connected directly to Shopify. Any commits pushed to `main` automatically sync to your store:

1. In **Shopify Admin**, go to **Online Store → Themes**.
2. Click **Add theme** → **Connect from GitHub**.
3. Select the account `devNenye001`, repository `oge-jewelry`, and branch `main`.
4. Shopify will automatically pull the **18.7 MB** theme into your **Draft themes**.
5. Click **Actions (`...`) → Preview** to test on your live store.
6. When ready, click **Publish**.

### Option 2: Upload ZIP File
A pre-packaged, Shopify-compliant ZIP archive (`oge-jewelry-theme.zip`, 17.6 MB) is also available:
1. In **Shopify Admin → Online Store → Themes**, click **Add theme** → **Upload zip file**.
2. Select `oge-jewelry-theme.zip` from your computer.
3. Click **Upload file**.

---

## 🎬 Video Reels & Large Banner Setup

To adhere to Shopify's 50 MB theme limit and ensure maximum streaming performance, video files are hosted on Shopify's global CDN:

1. In **Shopify Admin**, navigate to **Content → Files** in the left sidebar.
2. Click **Upload files** and select your video files:
   - `large-home-video.mp4`
   - `video.mp4`
3. Click the **Link icon** next to the uploaded video to copy its Shopify CDN URL.
4. Go to **Online Store → Themes → Customize**.
5. Select the **Video Reels & Large Banner** section in the left panel.
6. Paste the CDN URL into the **Video URL** fields.
7. Click **Save**.

---

## 🛠️ Technology Stack

- **Liquid**: Shopify's open-source templating engine.
- **Architecture**: Shopify Online Store 2.0 (JSON templates + dynamic sections).
- **CSS**: Vanilla CSS3 with semantic design tokens (CSS custom properties), Flexbox, and CSS Grid.
- **JavaScript**: Modular vanilla JavaScript (ES6+) utilizing Shopify's AJAX APIs (`/cart/add.js`, `/search/suggest.json`).
- **Typography**: Cormorant Garamond & Inter (via Google Fonts / Shopify Font Picker).

---

## 📄 License & Credits

- **Designed & Developed for**: OGÉ Jewelry
- **Author**: Ndubuisi Chinenye
- **Version**: 1.0.0
