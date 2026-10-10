/**
 * OGE Jewelry - Core Theme Scripts (Vanilla JavaScript)
 * Online Store 2.0
 */

(function () {
  'use strict';

  // State Management
  const AppState = {
    wishlist: JSON.parse(localStorage.getItem('oge_wishlist') || '[]'),
    cart: null
  };

  /* ==========================================================================
     1. DRAWER & MODAL BACKDROP CONTROLLER
     ========================================================================== */
  const Backdrop = {
    el: null,
    init() {
      this.el = document.querySelector('[data-drawer-backdrop]');
      if (!this.el) {
        this.el = document.createElement('div');
        this.el.className = 'drawer-backdrop';
        this.el.setAttribute('data-drawer-backdrop', '');
        document.body.appendChild(this.el);
      }
      this.el.addEventListener('click', () => {
        SidebarDrawer.close();
        CartDrawer.close();
      });
    },
    show() {
      if (this.el) this.el.classList.add('is-active');
      document.body.classList.add('drawer-open');
    },
    hide() {
      if (this.el) this.el.classList.remove('is-active');
      document.body.classList.remove('drawer-open');
    }
  };

  /* ==========================================================================
     2. SIDEBAR MULTI-LEVEL DRAWER CONTROLLER
     ========================================================================== */
  const SidebarDrawer = {
    drawer: null,
    panelsContainer: null,
    submenuPanel: null,
    activeSubmenuId: null,

    init() {
      this.drawer = document.querySelector('[data-sidebar-drawer]');
      if (!this.drawer) return;

      this.panelsContainer = this.drawer.querySelector('[data-sidebar-panels]');

      // Open triggers (hamburger buttons)
      document.querySelectorAll('[data-sidebar-open]').forEach((btn) => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          this.open();
        });
      });

      // Close triggers
      this.drawer.querySelectorAll('[data-sidebar-close]').forEach((btn) => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          this.close();
        });
      });

      // Submenu open buttons
      this.drawer.querySelectorAll('[data-submenu-trigger]').forEach((btn) => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          const targetId = btn.getAttribute('data-submenu-trigger');
          const title = btn.getAttribute('data-submenu-title') || btn.innerText.trim();
          this.openSubmenu(targetId, title);
        });
      });

      // Submenu back button
      const backBtn = this.drawer.querySelector('[data-submenu-back]');
      if (backBtn) {
        backBtn.addEventListener('click', (e) => {
          e.preventDefault();
          this.closeSubmenu();
        });
      }

      // Keyboard Esc to close
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.drawer.classList.contains('is-open')) {
          this.close();
        }
      });
    },

    open() {
      if (!this.drawer) return;
      this.closeSubmenu();
      this.drawer.classList.add('is-open');
      Backdrop.show();
    },

    close() {
      if (!this.drawer) return;
      this.drawer.classList.remove('is-open');
      Backdrop.hide();
      setTimeout(() => this.closeSubmenu(), 300);
    },

    openSubmenu(submenuId, title) {
      if (!this.panelsContainer) return;

      // Update submenu header title if available
      const titleEl = this.drawer.querySelector('[data-submenu-title-display]');
      if (titleEl && title) {
        titleEl.textContent = title;
      }

      // Hide all sub-content blocks, show the matching one
      this.drawer.querySelectorAll('[data-submenu-content]').forEach((content) => {
        if (content.getAttribute('data-submenu-content') === submenuId) {
          content.style.display = 'block';
        } else {
          content.style.display = 'none';
        }
      });

      this.panelsContainer.classList.add('show-submenu');
    },

    closeSubmenu() {
      if (this.panelsContainer) {
        this.panelsContainer.classList.remove('show-submenu');
      }
    }
  };

  /* ==========================================================================
     3. SALES POP-UP MODAL CONTROLLER
     ========================================================================== */
  const SalesPopup = {
    modal: null,
    storageKey: 'oge_sales_popup_seen',

    isDismissed() {
      try {
        if (
          localStorage.getItem('oge_sales_popup_seen') === 'true' ||
          localStorage.getItem('oge_sales_popup_dismissed_v2') === 'true' ||
          sessionStorage.getItem('oge_sales_popup_seen') === 'true' ||
          (document.cookie && document.cookie.indexOf('oge_sales_popup_seen=true') !== -1)
        ) {
          return true;
        }
      } catch (e) { }
      return false;
    },

    setDismissed() {
      try {
        localStorage.setItem('oge_sales_popup_seen', 'true');
        localStorage.setItem('oge_sales_popup_dismissed_v2', 'true');
        sessionStorage.setItem('oge_sales_popup_seen', 'true');
        document.cookie = 'oge_sales_popup_seen=true; max-age=2592000; path=/; SameSite=Lax';
      } catch (e) { }
    },

    init() {
      this.modal = document.querySelector('[data-sales-popup]');
      if (!this.modal) return;

      const isEnabled = this.modal.getAttribute('data-popup-enabled') !== 'false';
      const delay = parseInt(this.modal.getAttribute('data-popup-delay') || '2000', 10);

      // Check if user has already seen or dismissed the popup
      if (this.isDismissed()) {
        return;
      }

      // Show popup after configured delay on first visit only
      if (isEnabled) {
        setTimeout(() => {
          if (this.isDismissed()) return;
          this.setDismissed();
          this.show();
        }, delay);
      }

      // Close buttons
      this.modal.querySelectorAll('[data-popup-close]').forEach((btn) => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          this.hide();
        });
      });

      // Background click
      this.modal.addEventListener('click', (e) => {
        if (e.target === this.modal) {
          this.hide();
        }
      });

      // Escape key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.modal.classList.contains('is-open')) {
          this.hide();
        }
      });

      // Form submission
      const form = this.modal.querySelector('form');
      if (form) {
        form.addEventListener('submit', (e) => {
          e.preventDefault();
          const emailInput = form.querySelector('input[type="email"]');
          if (emailInput && emailInput.value) {
            this.handleSuccess(emailInput.value);
          }
        });
      }

      // Direct CTA trigger
      const cta = this.modal.querySelector('[data-popup-cta]');
      if (cta) {
        cta.addEventListener('click', (e) => {
          const formWrapper = this.modal.querySelector('[data-popup-form-wrapper]');
          if (formWrapper) {
            formWrapper.style.display = 'block';
            cta.style.display = 'none';
            const email = formWrapper.querySelector('input[type="email"]');
            if (email) email.focus();
          }
        });
      }
    },

    show() {
      if (!this.modal) return;
      this.setDismissed();
      this.modal.classList.add('is-open');
      document.body.classList.add('modal-open');
    },

    hide() {
      if (!this.modal) return;
      this.setDismissed();
      this.modal.classList.remove('is-open');
      document.body.classList.remove('modal-open');
    },

    handleSuccess(email) {
      const container = this.modal.querySelector('.sales-popup-card__overlay');
      if (container) {
        container.innerHTML = `
          <div style="color: #FFFFFF; padding: 20px 0;">
            <div style="font-family: var(--font-serif); font-size: 1.75rem; color: #F3C96B; margin-bottom: 12px;">WELCOME TO THE CIRCLE</div>
            <p style="font-size: 0.9375rem; line-height: 1.6; margin-bottom: 16px;">Use your 15% VIP discount code at checkout:</p>
            <div style="background: rgba(255,255,255,0.15); border: 1px dashed #F3C96B; padding: 10px 20px; font-weight: 700; font-size: 1.25rem; letter-spacing: 0.1em; color: #F3C96B; display: inline-block;">OGE15</div>
          </div>
        `;
        setTimeout(() => this.hide(), 5000);
      }
    }
  };

  /* ==========================================================================
     HELPER UTILITIES: MONEY FORMATTER & HTML ESCAPING
     ========================================================================== */
  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function formatMoney(cents) {
    if (cents === null || cents === undefined) return '$0';
    const num = typeof cents === 'number' ? cents : parseFloat(cents) || 0;
    if (window.Shopify && window.Shopify.money_format) {
      const format = window.Shopify.money_format;
      const value = (num / 100).toFixed(2);
      if (format.includes('{{amount}}')) return format.replace('{{amount}}', value);
      if (format.includes('{{amount_no_decimals}}')) return format.replace('{{amount_no_decimals}}', Math.round(num / 100));
      if (format.includes('{{amount_with_comma_separator}}')) return format.replace('{{amount_with_comma_separator}}', value.replace('.', ','));
    }
    if (window.OGE_CURRENCY && typeof window.OGE_CURRENCY.format === 'function') {
      return window.OGE_CURRENCY.format(num / 100);
    }
    return '$' + (num / 100).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 });
  }

  const ShopifyRoutes = {
    get root() {
      return ((window.Shopify && window.Shopify.routes && window.Shopify.routes.root) || '/').replace(/\/$/, '');
    },
    get cart() {
      return ((window.Shopify && window.Shopify.routes && window.Shopify.routes.cart) || '/cart');
    },
    get cartJs() {
      return this.cart + '.js';
    },
    get cartAddJs() {
      return ((window.Shopify && window.Shopify.routes && window.Shopify.routes.cart_add_url) || '/cart/add') + '.js';
    },
    get cartChangeJs() {
      return ((window.Shopify && window.Shopify.routes && window.Shopify.routes.cart_change_url) || '/cart/change') + '.js';
    },
    get checkout() {
      return this.root + '/checkout';
    },
    get allProducts() {
      return (window.Shopify && window.Shopify.routes && window.Shopify.routes.all_products_collection_url) || (this.root + '/collections/all');
    },
    productJs(handle) {
      return `${this.root}/products/${handle}.js`;
    }
  };

  /* ==========================================================================
     4. SLIDE-OUT AJAX & LIVE SHOPIFY CART DRAWER
     ========================================================================== */
  const CartDrawer = {
    drawer: null,
    cart: null,
    isUpdating: false,

    init() {
      this.drawer = document.querySelector('[data-cart-drawer]');

      // Open triggers (header icon, custom buttons)
      document.querySelectorAll('[data-cart-drawer-open]').forEach((btn) => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          this.open();
        });
      });

      // Close triggers ('X' button, backdrop, shop-all buttons)
      document.querySelectorAll('[data-cart-drawer-close]').forEach((btn) => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          this.close();
        });
      });

      // Drawer Item Event Delegation (Quantity Plus/Minus, Remove, Wishlist)
      if (this.drawer) {
        this.drawer.addEventListener('click', (e) => {
          const minusBtn = e.target.closest('[data-qty-minus]');
          if (minusBtn) {
            e.preventDefault();
            const key = minusBtn.getAttribute('data-qty-minus');
            const item = this.getItemByKey(key);
            if (item) {
              if (item.quantity > 1) {
                this.updateQuantity(key, item.quantity - 1);
              } else {
                this.removeItem(key);
              }
            }
            return;
          }

          const plusBtn = e.target.closest('[data-qty-plus]');
          if (plusBtn) {
            e.preventDefault();
            const key = plusBtn.getAttribute('data-qty-plus');
            const item = this.getItemByKey(key);
            if (item) {
              this.updateQuantity(key, item.quantity + 1);
            }
            return;
          }

          const removeBtn = e.target.closest('[data-item-remove]');
          if (removeBtn) {
            e.preventDefault();
            const key = removeBtn.getAttribute('data-item-remove');
            this.removeItem(key);
            return;
          }

          const wishlistBtn = e.target.closest('[data-item-wishlist]');
          if (wishlistBtn) {
            e.preventDefault();
            const handle = wishlistBtn.getAttribute('data-item-wishlist');
            if (handle && typeof Wishlist !== 'undefined' && Wishlist.toggle) {
              Wishlist.toggle(handle, wishlistBtn);
            }
            return;
          }
        });
      }

      // Global Quick Add (+) buttons on all product cards
      document.addEventListener('click', (e) => {
        const addBtn = e.target.closest('[data-quick-add]');
        if (addBtn) {
          e.preventDefault();
          e.stopPropagation();
          this.handleQuickAdd(addBtn);
        }
      });

      // Synchronize with Shopify actual cart on page load
      this.fetchCart();
    },

    getItemByKey(key) {
      if (!this.cart || !this.cart.items) return null;
      return this.cart.items.find((i) => String(i.key) === String(key) || String(i.variant_id) === String(key));
    },

    open() {
      if (!this.drawer) return;
      if (typeof SidebarDrawer !== 'undefined' && SidebarDrawer.close) {
        SidebarDrawer.close();
      }
      this.drawer.classList.add('is-open');
      Backdrop.show();
    },

    close() {
      if (!this.drawer) return;
      this.drawer.classList.remove('is-open');
      Backdrop.hide();
      this.clearError();
    },

    showError(msg) {
      if (!this.drawer) return;
      let errEl = this.drawer.querySelector('[data-cart-drawer-error]');
      if (!errEl) {
        errEl = document.createElement('div');
        errEl.className = 'cart-drawer__error';
        errEl.setAttribute('data-cart-drawer-error', '');
        errEl.style.cssText = 'padding: 12px 28px; background: #FFF5F5; color: #995544; font-size: 0.8125rem; border-bottom: 1px solid #FFE3E3; line-height: 1.4;';
        const body = this.drawer.querySelector('.cart-drawer__body');
        if (body) this.drawer.insertBefore(errEl, body);
      }
      errEl.textContent = msg;
      errEl.style.display = 'block';
    },

    clearError() {
      if (!this.drawer) return;
      const errEl = this.drawer.querySelector('[data-cart-drawer-error]');
      if (errEl) errEl.style.display = 'none';
    },

    async fetchCart() {
      try {
        const res = await fetch(ShopifyRoutes.cartJs, {
          headers: { 'Accept': 'application/json' }
        });
        if (res.ok) {
          const cart = await res.json();
          this.cart = cart;
          this.updateCartCount(cart.item_count);
          this.render();
          if (typeof CartPageController !== 'undefined' && CartPageController.render) {
            CartPageController.render(cart);
          }
          return cart;
        }
      } catch (err) {
        console.warn('Could not fetch cart from /cart.js:', err);
      }
      return null;
    },

    async addItem(itemOrId, quantity = 1, properties = {}) {
      let variantId;
      let qty = quantity;
      let props = properties;

      if (typeof itemOrId === 'object' && itemOrId !== null) {
        variantId = itemOrId.id || itemOrId.variantId || itemOrId.variant_id;
        qty = itemOrId.quantity || itemOrId.qty || 1;
        props = itemOrId.properties || {};
      } else {
        variantId = itemOrId;
      }

      if (!variantId) {
        console.error('CartDrawer.addItem: Invalid variant ID');
        return { success: false, error: 'Invalid variant ID' };
      }

      this.clearError();

      try {
        const res = await fetch(ShopifyRoutes.cartAddJs, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            id: variantId,
            quantity: qty,
            properties: props
          })
        });

        if (res.ok) {
          const item = await res.json();
          await this.fetchCart();
          this.open();
          return { success: true, item };
        } else {
          const err = await res.json();
          const errorMsg = err.description || err.message || 'Unable to add this item to your bag.';
          this.showError(errorMsg);
          this.open();
          return { success: false, error: err };
        }
      } catch (err) {
        console.error('Error adding item to cart:', err);
        this.showError('A network error occurred. Please try again.');
        this.open();
        return { success: false, error: err };
      }
    },

    async updateQuantity(key, quantity) {
      if (this.isUpdating) return;
      this.isUpdating = true;
      this.clearError();

      try {
        const res = await fetch(ShopifyRoutes.cartChangeJs, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            id: key,
            quantity: quantity
          })
        });

        if (res.ok) {
          const cart = await res.json();
          this.cart = cart;
          this.updateCartCount(cart.item_count);
          this.render();
          if (typeof CartPageController !== 'undefined' && CartPageController.render) {
            CartPageController.render(cart);
          }
        } else {
          const err = await res.json();
          this.showError(err.description || err.message || 'Could not update item quantity.');
        }
      } catch (err) {
        console.error('Error updating cart quantity:', err);
      } finally {
        this.isUpdating = false;
      }
    },

    removeItem(key) {
      return this.updateQuantity(key, 0);
    },

    updateCartCount(count) {
      const num = parseInt(count, 10) || 0;
      document.querySelectorAll('[data-cart-count]').forEach((el) => {
        el.setAttribute('data-cart-count', num);
        if (num > 0) {
          el.textContent = num;
          el.style.display = 'flex';
          el.classList.remove('header-icon-btn__badge--empty');
        } else {
          el.textContent = '';
          el.style.display = 'none';
          el.classList.add('header-icon-btn__badge--empty');
        }
      });
      document.querySelectorAll('[data-cart-count-title]').forEach((el) => {
        el.textContent = num;
      });
    },

    async handleQuickAdd(btn) {
      if (btn.disabled || btn.classList.contains('is-disabled') || btn.getAttribute('aria-disabled') === 'true') {
        return;
      }

      if (btn.closest('.is-sold-out')) {
        this.showError('This item is currently sold out.');
        this.open();
        return;
      }

      let variantId = btn.getAttribute('data-product-id');
      const handle = btn.getAttribute('data-product-handle') ||
        btn.closest('[data-product-card]')?.getAttribute('data-product-handle') ||
        btn.closest('[data-wishlist-item]')?.getAttribute('data-wishlist-item') ||
        btn.closest('[data-product-handle]')?.getAttribute('data-product-handle');

      // Handle quick add click

      // Resolve numeric variant ID if handle was provided
      if (!variantId || isNaN(Number(variantId))) {
        if (handle) {
          try {
            const prodRes = await fetch(ShopifyRoutes.productJs(handle));
            if (prodRes.ok) {
              const prodData = await prodRes.json();
              const avail = prodData.variants.find((v) => v.available) || prodData.variants[0];
              if (avail && avail.available) {
                variantId = avail.id;
                btn.setAttribute('data-product-id', variantId);
              } else {
                this.showError('This item is currently sold out.');
                this.open();
                return;
              }
            }
          } catch (err) {
            console.warn('Could not fetch product for quick add:', err);
          }
        }
      }

      if (variantId && !isNaN(Number(variantId))) {
        await this.addItem(variantId, 1);
      } else {
        console.warn('No variant ID available for quick add.');
      }
    },

    render() {
      if (!this.drawer) return;
      const bodyContainer = this.drawer.querySelector('[data-cart-drawer-body]') || this.drawer.querySelector('.cart-drawer__body');
      const footerContainer = this.drawer.querySelector('[data-cart-drawer-footer]') || this.drawer.querySelector('.cart-drawer__footer');

      if (!bodyContainer || !footerContainer) return;

      const cart = this.cart;
      if (!cart || cart.item_count === 0) {
        bodyContainer.innerHTML = `
          <div class="cart-drawer__empty">
            <p class="cart-drawer__empty-text">Your bag is empty</p>
          </div>
        `;
        const shopAllUrl = ShopifyRoutes.allProducts;
        footerContainer.innerHTML = `
          <a href="${shopAllUrl}" class="cart-drawer__btn-shop-all" data-cart-drawer-close>Shop All</a>
        `;
        const shopAllBtn = footerContainer.querySelector('[data-cart-drawer-close]');
        if (shopAllBtn) {
          shopAllBtn.addEventListener('click', () => this.close());
        }
        return;
      }

      // Active Items State (bag2)
      let itemsHtml = '<div class="cart-drawer__items" data-cart-drawer-items>';

      cart.items.forEach((item) => {
        const isWishlisted = AppState.wishlist && AppState.wishlist.includes(item.handle || item.product_title);
        const itemImage = item.image || (item.featured_image && item.featured_image.url) || '';
        const itemPrice = formatMoney(item.final_line_price);
        const variantTitle = (item.variant_title && item.variant_title !== 'Default Title') ? item.variant_title : '';
        const tag = (item.properties && item.properties._tag) || 'New';

        itemsHtml += `
          <div class="cart-item" data-item-key="${item.key}" data-item-id="${item.variant_id}" data-item-title="${escapeHtml(item.title)}">
            <div class="cart-item__main">
              <div class="cart-item__image-wrap">
                ${itemImage ? `<img src="${itemImage}" alt="${escapeHtml(item.title)}" class="cart-item__image" width="76" height="92" loading="lazy">` : `<div style="width:100%;height:100%;background:#F6F6F6;"></div>`}
              </div>
              <div class="cart-item__info">
                <span class="cart-item__tag">${tag}</span>
                <h3 class="cart-item__title">
                  <a href="${item.url}" style="color: inherit; text-decoration: none;">${escapeHtml(item.product_title || item.title)}</a>
                </h3>
                ${variantTitle ? `<p class="cart-item__variant">${escapeHtml(variantTitle)}</p>` : ''}
                <p class="cart-item__price">${itemPrice}</p>
              </div>
            </div>
            <div class="cart-item__controls">
              <div class="cart-item__qty-selector">
                <button type="button" class="cart-item__qty-btn" data-qty-minus="${item.key}" aria-label="Decrease quantity">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="12" height="12"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                </button>
                <span class="cart-item__qty-value">${item.quantity}</span>
                <button type="button" class="cart-item__qty-btn" data-qty-plus="${item.key}" aria-label="Increase quantity">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="12" height="12"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                </button>
              </div>
              <div class="cart-item__actions">
                <button type="button" class="cart-item__action-btn ${isWishlisted ? 'is-active' : ''}" data-item-wishlist="${item.handle}" aria-label="Toggle Wishlist">
                  <svg viewBox="0 0 24 24" fill="${isWishlisted ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="1.3" width="18" height="18">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                  </svg>
                </button>
                <button type="button" class="cart-item__action-btn" data-item-remove="${item.key}" aria-label="Remove item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" width="18" height="18">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        `;
      });

      itemsHtml += '</div>';
      bodyContainer.innerHTML = itemsHtml;

      const formattedTotal = formatMoney(cart.total_price);
      const totalQty = cart.item_count;

      footerContainer.innerHTML = `
        <div class="cart-drawer__summary">
          <div class="cart-drawer__summary-row">
            <span class="cart-drawer__summary-label">Order Summary:</span>
            <span class="cart-drawer__summary-value">${totalQty} ${totalQty === 1 ? 'Item' : 'Items'}</span>
          </div>
          <div class="cart-drawer__summary-row cart-drawer__summary-row--total">
            <span class="cart-drawer__summary-label">Total:</span>
            <span class="cart-drawer__summary-value">${formattedTotal}</span>
          </div>
        </div>
        <a href="${ShopifyRoutes.checkout}" class="cart-drawer__btn-checkout" id="btn-cart-checkout">
          <span>Securely Check Out | ${formattedTotal}</span>
        </a>
      `;
    }
  };

  window.CartDrawer = CartDrawer;

  /* ==========================================================================
     5. WISHLIST CONTROLLER
     ========================================================================== */
  const Wishlist = {
    init() {
      this.updateBadges();
      this.updateButtons();

      document.addEventListener('click', (e) => {
        const btn = e.target.closest('[data-wishlist-btn]');
        if (btn) {
          e.preventDefault();
          e.stopPropagation();
          const handle = btn.getAttribute('data-product-handle') || 'product';
          this.toggle(handle, btn);
        }
      });
    },

    toggle(handle, btn) {
      if (!handle) return;
      const index = AppState.wishlist.indexOf(handle);

      // Collect product item metadata for wishlist page display
      let itemData = null;
      if (btn) {
        const card = btn.closest('.product-card, .wishlist-card, .account-product-card, [data-product-card], [data-product-page]');
        const title = btn.getAttribute('data-product-title') ||
          card?.querySelector('.product-card__title a, .product-info__title, .wishlist-card__title a')?.textContent?.trim() ||
          handle.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
        const price = btn.getAttribute('data-product-price') ||
          card?.querySelector('.product-card__current-price, .product-info__price, .wishlist-card__price')?.textContent?.trim() ||
          '';
        const img = btn.getAttribute('data-product-img') ||
          card?.querySelector('.product-card__img-primary, .product-main-image, .wishlist-card__image')?.getAttribute('src') ||
          '';
        const url = btn.getAttribute('data-product-url') ||
          card?.querySelector('a[href*="/products/"]')?.getAttribute('href') ||
          `/products/${handle}`;
        const material = btn.getAttribute('data-product-material') ||
          card?.querySelector('.product-card__material, .product-info__metal, .wishlist-card__variant')?.textContent?.trim() ||
          '18K Gold Vermeil';
        itemData = { handle, title, price, img, url, material };
      }

      let storedItems = [];
      try {
        storedItems = JSON.parse(localStorage.getItem('oge_wishlist_items') || '[]');
      } catch (err) {
        storedItems = [];
      }

      if (index === -1) {
        AppState.wishlist.push(handle);
        if (itemData) {
          const existingIdx = storedItems.findIndex((i) => i.handle === handle);
          if (existingIdx === -1) storedItems.push(itemData);
          else storedItems[existingIdx] = itemData;
        }
      } else {
        AppState.wishlist.splice(index, 1);
        storedItems = storedItems.filter((i) => i.handle !== handle);
      }

      localStorage.setItem('oge_wishlist', JSON.stringify(AppState.wishlist));
      localStorage.setItem('oge_wishlist_items', JSON.stringify(storedItems));

      this.updateBadges();
      this.updateButtons();

      window.dispatchEvent(new CustomEvent('oge:wishlist:updated', {
        detail: { wishlist: AppState.wishlist, items: storedItems }
      }));
    },

    updateBadges() {
      const count = AppState.wishlist ? AppState.wishlist.length : 0;
      document.querySelectorAll('[data-wishlist-count]').forEach((el) => {
        el.textContent = count;
        el.setAttribute('data-wishlist-count', count);
        if (count > 0) {
          el.style.display = 'flex';
          el.classList.remove('is-hidden');
        } else {
          el.style.display = 'none';
          el.classList.add('is-hidden');
        }
      });
      document.querySelectorAll('[data-wishlist-total]').forEach((el) => {
        el.textContent = count;
      });
    },

    updateButtons() {
      document.querySelectorAll('[data-wishlist-btn]').forEach((btn) => {
        const handle = btn.getAttribute('data-product-handle');
        if (handle && AppState.wishlist.includes(handle)) {
          btn.classList.add('is-active');
          btn.setAttribute('aria-pressed', 'true');
        } else {
          btn.classList.remove('is-active');
          btn.setAttribute('aria-pressed', 'false');
        }
      });
    }
  };

  /* ==========================================================================
     6. HORIZONTAL SCROLL CONTROLLER WITH CENTER EDGE ARROWS & AUTO-HIDE
     ========================================================================== */
  const HorizontalScrollController = {
    init() {
      // Find all horizontal scroll containers (New Arrivals, Find Your Signature, Pieces Worth Keeping, Reviews, Journal)
      const containers = document.querySelectorAll('.horizontal-scroll-container, [data-horizontal-scroll], [data-signature-carousel]');

      containers.forEach((container) => {
        const track = container.querySelector('.horizontal-scroll-track, [data-scroll-track], [data-signature-scroll]');
        if (!track) return;

        const prevEdgeBtn = container.querySelector('.scroll-edge-arrow--prev, [data-scroll-prev], [data-signature-prev]');
        const nextEdgeBtn = container.querySelector('.scroll-edge-arrow--next, [data-scroll-next], [data-signature-next]');

        // Also check if the parent section has header nav arrows
        const section = container.closest('section');
        const headerPrevBtn = section ? section.querySelector('.carousel-nav-btn:first-child, [data-header-scroll-prev]') : null;
        const headerNextBtn = section ? section.querySelector('.carousel-nav-btn:last-child, [data-header-scroll-next]') : null;

        const updateArrows = () => {
          const maxScrollLeft = track.scrollWidth - track.clientWidth;
          const currentScroll = track.scrollLeft;
          const tolerance = 6;

          const isAtStart = currentScroll <= tolerance;
          const isAtEnd = currentScroll >= maxScrollLeft - tolerance;

          // Center Edge Prev Arrow
          if (prevEdgeBtn) {
            if (isAtStart) {
              prevEdgeBtn.classList.add('is-hidden');
            } else {
              prevEdgeBtn.classList.remove('is-hidden');
            }
          }

          // Center Edge Next Arrow
          if (nextEdgeBtn) {
            if (isAtEnd) {
              nextEdgeBtn.classList.add('is-hidden');
            } else {
              nextEdgeBtn.classList.remove('is-hidden');
            }
          }

          // Header circle buttons
          if (headerPrevBtn) {
            headerPrevBtn.style.opacity = isAtStart ? '0.35' : '1';
            headerPrevBtn.style.pointerEvents = isAtStart ? 'none' : 'auto';
          }
          if (headerNextBtn) {
            headerNextBtn.style.opacity = isAtEnd ? '0.35' : '1';
            headerNextBtn.style.pointerEvents = isAtEnd ? 'none' : 'auto';
          }
        };

        const getScrollStep = () => {
          const firstCard = track.firstElementChild;
          if (firstCard && firstCard.clientWidth > 0) {
            return firstCard.clientWidth + 20; // 1 card + gap
          }
          return track.clientWidth * 0.75 || 320;
        };

        // Prev click handlers
        const handlePrev = (e) => {
          e.preventDefault();
          track.scrollBy({ left: -getScrollStep(), behavior: 'smooth' });
        };

        // Next click handlers
        const handleNext = (e) => {
          e.preventDefault();
          track.scrollBy({ left: getScrollStep(), behavior: 'smooth' });
        };

        if (prevEdgeBtn) prevEdgeBtn.addEventListener('click', handlePrev);
        if (nextEdgeBtn) nextEdgeBtn.addEventListener('click', handleNext);
        if (headerPrevBtn) headerPrevBtn.addEventListener('click', handlePrev);
        if (headerNextBtn) headerNextBtn.addEventListener('click', handleNext);

        track.addEventListener('scroll', updateArrows, { passive: true });
        track.addEventListener('touchmove', updateArrows, { passive: true });
        track.addEventListener('touchend', () => setTimeout(updateArrows, 100), { passive: true });
        window.addEventListener('resize', updateArrows, { passive: true });

        // Initial check
        updateArrows();
        setTimeout(updateArrows, 150);
        setTimeout(updateArrows, 600);
      });
    }
  };

  /* ==========================================================================
     7. VIDEO PLAYER & FAQ ACCORDION CONTROLLERS
     ========================================================================== */
  const InteractiveElements = {
    init() {
      // FAQ Accordion Controller
      const faqItems = document.querySelectorAll('.faq-item, .faq-card-item, [data-faq-item]');
      faqItems.forEach((item) => {
        const icon = item.querySelector('[data-faq-icon], .faq-card-icon');
        const trigger = item.querySelector('summary, .faq-card-question');

        // Set initial icon
        if (icon) {
          const isInitialOpen = item.hasAttribute('open') || item.classList.contains('is-active');
          icon.textContent = isInitialOpen ? '—' : '+';
        }

        if (item.tagName === 'DETAILS') {
          item.addEventListener('toggle', () => {
            const isOpen = item.open;
            if (icon) {
              icon.textContent = isOpen ? '—' : '+';
            }
            if (isOpen) {
              faqItems.forEach((other) => {
                if (other !== item) {
                  if (other.tagName === 'DETAILS' && other.open) {
                    other.removeAttribute('open');
                  } else if (other.classList.contains('is-active')) {
                    other.classList.remove('is-active');
                  }
                  const otherIcon = other.querySelector('[data-faq-icon], .faq-card-icon');
                  if (otherIcon) otherIcon.textContent = '+';
                }
              });
            }
          });
        } else if (trigger) {
          trigger.addEventListener('click', (e) => {
            e.preventDefault();
            const wasActive = item.classList.contains('is-active');
            faqItems.forEach((other) => {
              other.classList.remove('is-active');
              if (other.tagName === 'DETAILS') other.removeAttribute('open');
              const otherIcon = other.querySelector('[data-faq-icon], .faq-card-icon');
              if (otherIcon) otherIcon.textContent = '+';
            });
            if (!wasActive) {
              item.classList.add('is-active');
              if (icon) icon.textContent = '—';
            }
          });
        }
      });

      // Autoplay Inline Videos Reliably
      document.querySelectorAll('video[autoplay]').forEach((v) => {
        v.muted = true;
        v.playsInline = true;
        const playPromise = v.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            const playOnInteract = () => {
              v.play().catch(() => { });
              document.removeEventListener('click', playOnInteract);
              document.removeEventListener('scroll', playOnInteract);
              document.removeEventListener('touchstart', playOnInteract);
            };
            document.addEventListener('click', playOnInteract, { once: true });
            document.addEventListener('scroll', playOnInteract, { once: true });
            document.addEventListener('touchstart', playOnInteract, { once: true });
          });
        }
      });

      // Video Modal Controller
      const modalBackdrop = document.querySelector('[data-video-modal-backdrop]');
      const modal = document.querySelector('[data-video-modal]');
      const modalVideo = modal ? modal.querySelector('video') : null;
      const modalClose = modal ? modal.querySelector('[data-video-modal-close]') : null;

      const closeVideoModal = () => {
        if (modal) modal.classList.remove('is-active');
        if (modalBackdrop) modalBackdrop.classList.remove('is-active');
        if (modalVideo) {
          modalVideo.pause();
          modalVideo.currentTime = 0;
        }
      };

      if (modalClose) modalClose.addEventListener('click', closeVideoModal);
      if (modalBackdrop) modalBackdrop.addEventListener('click', closeVideoModal);
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeVideoModal();
      });

      // Video Play Triggers
      document.querySelectorAll('[data-play-video]').forEach((trigger) => {
        trigger.addEventListener('click', (e) => {
          e.preventDefault();
          const videoSrc = trigger.getAttribute('data-video-src') || 'assets/video.mp4';
          if (modalVideo && modal && modalBackdrop) {
            modalVideo.src = videoSrc;
            modal.classList.add('is-active');
            modalBackdrop.classList.add('is-active');
            modalVideo.play().catch(() => { });
          }
        });
      });
    }
  };

  /* ==========================================================================
     8. HEADER SCROLL CONTROLLER
     ========================================================================== */
  const HeaderController = {
    init() {
      const header = document.querySelector('[data-site-header]');
      if (!header) return;

      const handleScroll = () => {
        if (window.scrollY > 40) {
          header.classList.add('is-scrolled');
        } else {
          header.classList.remove('is-scrolled');
        }
      };

      window.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll();
    }
  };

  /* ==========================================================================
     9. ACCOUNT OVERVIEW DASHBOARD CONTROLLER
     ========================================================================== */
  const AccountDashboard = {
    init() {
      const accountSection = document.querySelector('.account-dashboard-section');
      if (!accountSection) return;

      // Sidebar link active states
      const navLinks = accountSection.querySelectorAll('.account-sidebar__link:not(.account-sidebar__link--signout)');
      navLinks.forEach((link) => {
        link.addEventListener('click', (e) => {
          navLinks.forEach((l) => l.classList.remove('is-active'));
          link.classList.add('is-active');
        });
      });

      // Recommendation Carousel Controls
      const recGrid = accountSection.querySelector('.account-product-grid');
      const prevBtn = accountSection.querySelector('#btn-rec-prev');
      const nextBtn = accountSection.querySelector('#btn-rec-next');

      if (recGrid && prevBtn && nextBtn) {
        prevBtn.addEventListener('click', (e) => {
          e.preventDefault();
          const step = (recGrid.firstElementChild ? recGrid.firstElementChild.offsetWidth + 20 : 300);
          recGrid.scrollBy({ left: -step, behavior: 'smooth' });
        });

        nextBtn.addEventListener('click', (e) => {
          e.preventDefault();
          const step = (recGrid.firstElementChild ? recGrid.firstElementChild.offsetWidth + 20 : 300);
          recGrid.scrollBy({ left: step, behavior: 'smooth' });
        });
      }
    }
  };

  /* ==========================================================================
     10. WISHLIST PAGE CONTROLLER (GRID TOGGLES, REMOVAL & EMPTY STATE TRANSITION)
     ========================================================================== */
  const WishlistPage = {
    init() {
      const pageSection = document.querySelector('.wishlist-page-section');
      if (!pageSection) return;

      const activeState = pageSection.querySelector('#wishlist-active-state');
      const emptyState = pageSection.querySelector('#wishlist-empty-state');
      const itemsContainer = pageSection.querySelector('#wishlist-items-container');
      const totalCountEl = pageSection.querySelector('[data-wishlist-total]');
      const viewToggles = pageSection.querySelectorAll('[data-wishlist-view]');
      const recGrid = pageSection.querySelector('#wishlist-rec-grid');
      const prevRecBtn = pageSection.querySelector('#btn-wishlist-rec-prev');
      const nextRecBtn = pageSection.querySelector('#btn-wishlist-rec-next');

      // Grid view switcher (1 col vs 2 col)
      viewToggles.forEach((btn) => {
        btn.addEventListener('click', () => {
          const view = btn.getAttribute('data-wishlist-view');
          viewToggles.forEach((t) => t.classList.remove('is-active'));
          btn.classList.add('is-active');

          if (itemsContainer) {
            if (view === '1col') {
              itemsContainer.classList.add('wishlist-grid--1col');
            } else {
              itemsContainer.classList.remove('wishlist-grid--1col');
            }
          }
        });
      });

      const updateWishlistUI = () => {
        const count = AppState.wishlist.length;
        if (totalCountEl) totalCountEl.textContent = count;
        if (count === 0) {
          if (activeState) activeState.style.display = 'none';
          if (emptyState) {
            emptyState.style.display = 'block';
            emptyState.style.opacity = '1';
          }
        } else {
          if (activeState) activeState.style.display = 'block';
          if (emptyState) emptyState.style.display = 'none';
        }
      };

      const bindCardEvents = () => {
        pageSection.querySelectorAll('[data-wishlist-remove]').forEach((removeBtn) => {
          if (removeBtn.dataset.bound) return;
          removeBtn.dataset.bound = 'true';
          removeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const card = removeBtn.closest('.wishlist-card');
            const handle = removeBtn.getAttribute('data-wishlist-remove');

            if (card) {
              card.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
              card.style.opacity = '0';
              card.style.transform = 'scale(0.9)';

              setTimeout(() => {
                card.remove();

                if (handle) {
                  const idx = AppState.wishlist.indexOf(handle);
                  if (idx !== -1) {
                    AppState.wishlist.splice(idx, 1);
                    localStorage.setItem('oge_wishlist', JSON.stringify(AppState.wishlist));
                    Wishlist.updateBadges();
                    Wishlist.updateButtons();
                  }
                }

                updateWishlistUI();
              }, 250);
            }
          });
        });
      };

      const savedHandles = AppState.wishlist || [];
      if (savedHandles.length === 0) {
        updateWishlistUI();
      } else {
        updateWishlistUI();
        if (itemsContainer) {
          let storedItems = [];
          try {
            storedItems = JSON.parse(localStorage.getItem('oge_wishlist_items') || '[]');
          } catch (e) {
            storedItems = [];
          }

          Promise.all(
            savedHandles.map((handle) =>
              fetch(`/products/${handle}.js`)
                .then((r) => (r.ok ? r.json() : null))
                .then((product) => {
                  if (product) return product;
                  const cached = storedItems.find((i) => i.handle === handle);
                  if (cached) {
                    return {
                      handle: cached.handle,
                      title: cached.title,
                      featured_image: cached.img,
                      url: cached.url,
                      price: cached.price,
                      isCached: true,
                      variants: [{ id: cached.handle, title: cached.material || 'Gold' }]
                    };
                  }
                  return null;
                })
                .catch(() => {
                  const cached = storedItems.find((i) => i.handle === handle);
                  if (cached) {
                    return {
                      handle: cached.handle,
                      title: cached.title,
                      featured_image: cached.img,
                      url: cached.url,
                      price: cached.price,
                      isCached: true,
                      variants: [{ id: cached.handle, title: cached.material || 'Gold' }]
                    };
                  }
                  return null;
                })
            )
          ).then((products) => {
            const validProducts = products.filter(Boolean);
            if (validProducts.length > 0) {
              itemsContainer.innerHTML = validProducts
                .map((product) => {
                  const variantId = product.variants && product.variants[0] ? product.variants[0].id : product.handle;
                  const variantTitle = product.variants && product.variants[0] && product.variants[0].title !== 'Default Title' ? product.variants[0].title : (product.type || '18K Solid Gold');
                  const priceStr = typeof product.price === 'number' ? formatMoney(product.price) : (product.price || '$94');
                  const imgSrc = product.featured_image || '/assets/product1.png';
                  return `
                    <article class="wishlist-card" data-wishlist-item="${product.handle}">
                      <div class="wishlist-card__image-wrap">
                        <button type="button" class="wishlist-card__remove-btn" data-wishlist-remove="${product.handle}" aria-label="Remove ${product.title} from Wishlist">
                          <svg viewBox="0 0 24 24" width="20" height="20">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                          </svg>
                        </button>
                        <a href="${product.url}" class="wishlist-card__image-link">
                          <img src="${imgSrc}" alt="${product.title}" class="wishlist-card__image" loading="lazy" width="500" height="580">
                        </a>
                        <button type="button" class="wishlist-card__add-btn" data-quick-add data-product-id="${variantId}" data-product-handle="${product.handle}" data-product-title="${product.title}" data-product-price="${product.price}" data-product-img="${imgSrc}" aria-label="Add ${product.title} to Bag" title="Quick Add to Bag">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="14" height="14">
                            <line x1="12" y1="5" x2="12" y2="19"></line>
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                          </svg>
                        </button>
                      </div>
                      <div class="wishlist-card__info">
                        <h3 class="wishlist-card__title">
                          <a href="${product.url}" class="wishlist-card__title">${product.title}</a>
                        </h3>
                        <p class="wishlist-card__variant">${variantTitle}</p>
                        <p class="wishlist-card__price">${priceStr}</p>
                      </div>
                    </article>
                  `;
                })
                .join('');
            }
            bindCardEvents();
            updateWishlistUI();
          });
        }
      }

      bindCardEvents();

      // Saved Items Carousel Prev/Next Buttons
      const prevSavedBtn = pageSection.querySelector('#btn-wishlist-prev');
      const nextSavedBtn = pageSection.querySelector('#btn-wishlist-next');
      if (itemsContainer && prevSavedBtn && nextSavedBtn) {
        prevSavedBtn.addEventListener('click', (e) => {
          e.preventDefault();
          const step = itemsContainer.firstElementChild ? itemsContainer.firstElementChild.offsetWidth + 20 : 280;
          itemsContainer.scrollBy({ left: -step, behavior: 'smooth' });
        });
        nextSavedBtn.addEventListener('click', (e) => {
          e.preventDefault();
          const step = itemsContainer.firstElementChild ? itemsContainer.firstElementChild.offsetWidth + 20 : 280;
          itemsContainer.scrollBy({ left: step, behavior: 'smooth' });
        });
      }

      // Recommendation Carousel Prev/Next Buttons
      if (recGrid && prevRecBtn && nextRecBtn) {
        prevRecBtn.addEventListener('click', (e) => {
          e.preventDefault();
          const step = recGrid.firstElementChild ? recGrid.firstElementChild.offsetWidth + 20 : 300;
          recGrid.scrollBy({ left: -step, behavior: 'smooth' });
        });

        nextRecBtn.addEventListener('click', (e) => {
          e.preventDefault();
          const step = recGrid.firstElementChild ? recGrid.firstElementChild.offsetWidth + 20 : 300;
          recGrid.scrollBy({ left: step, behavior: 'smooth' });
        });
      }
    }
  };

  /* ==========================================================================
     11. ORDERS PAGE CONTROLLER
     ========================================================================== */
  const OrdersPage = {
    init() {
      const ordersSection = document.querySelector('.orders-page-section');
      if (!ordersSection) return;

      const recGrid = ordersSection.querySelector('#orders-rec-grid');
      const prevBtn = ordersSection.querySelector('#btn-orders-rec-prev');
      const nextBtn = ordersSection.querySelector('#btn-orders-rec-next');

      if (recGrid && prevBtn && nextBtn) {
        prevBtn.addEventListener('click', (e) => {
          e.preventDefault();
          const step = recGrid.firstElementChild ? recGrid.firstElementChild.offsetWidth + 20 : 300;
          recGrid.scrollBy({ left: -step, behavior: 'smooth' });
        });

        nextBtn.addEventListener('click', (e) => {
          e.preventDefault();
          const step = recGrid.firstElementChild ? recGrid.firstElementChild.offsetWidth + 20 : 300;
          recGrid.scrollBy({ left: step, behavior: 'smooth' });
        });
      }
    }
  };

  const EYE_OPEN_SVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" width="18" height="18"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path><circle cx="12" cy="12" r="3"></circle></svg>`;
  const EYE_CLOSED_SVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" width="18" height="18"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"></path><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"></path><line x1="2" y1="2" x2="22" y2="22"></line></svg>`;

  function initPasswordToggles() {
    const bindBtn = (btn) => {
      const targetId = btn.getAttribute('data-toggle-password');
      const input = document.getElementById(targetId);
      if (input) {
        const isVisible = input.type === 'text';
        btn.innerHTML = isVisible ? EYE_OPEN_SVG : EYE_CLOSED_SVG;
        btn.setAttribute('aria-label', isVisible ? 'Hide password' : 'Show password');
        btn.setAttribute('title', isVisible ? 'Hide password' : 'Show password');
      }
    };

    document.querySelectorAll('[data-toggle-password]').forEach(bindBtn);

    if (!document.__pwdToggleBound) {
      document.__pwdToggleBound = true;
      document.addEventListener('click', (e) => {
        const btn = e.target.closest('[data-toggle-password]');
        if (!btn) return;
        e.preventDefault();
        e.stopPropagation();
        const targetId = btn.getAttribute('data-toggle-password');
        const input = document.getElementById(targetId);
        if (!input) return;
        const isPassword = input.type === 'password';
        input.type = isPassword ? 'text' : 'password';
        btn.innerHTML = isPassword ? EYE_OPEN_SVG : EYE_CLOSED_SVG;
        const newLabel = isPassword ? 'Hide password' : 'Show password';
        btn.setAttribute('aria-label', newLabel);
        btn.setAttribute('title', newLabel);
        btn.style.color = isPassword ? '#111111' : '#666666';
      });
    }
  }

  /* ==========================================================================
     12. PROFILE PAGE & MODAL CONTROLLER
     ========================================================================== */
  const ProfilePage = {
    init() {
      // Helper to open modal
      const openModal = (modalId) => {
        const modal = document.getElementById(modalId);
        if (modal) {
          // Pre-populate modal fields from display fields
          const displayFirst = document.getElementById('display-first-name')?.textContent?.trim();
          const displayLast = document.getElementById('display-last-name')?.textContent?.trim();
          const displayEmail = document.getElementById('display-email')?.textContent?.trim();
          const displayPhone = document.getElementById('display-phone')?.textContent?.trim();
          const displayDob = document.getElementById('display-dob')?.textContent?.trim();
          const displayGender = document.getElementById('display-gender')?.textContent?.trim();

          const inputFirst = document.getElementById('modal-input-first-name');
          const inputLast = document.getElementById('modal-input-last-name');
          const inputEmail = document.getElementById('modal-input-email');
          const inputPhone = document.getElementById('modal-input-phone');
          const inputDob = document.getElementById('modal-input-dob');
          const inputGender = document.getElementById('modal-input-gender');

          if (inputFirst && displayFirst && displayFirst !== '—') inputFirst.value = displayFirst;
          if (inputLast && displayLast && displayLast !== '—') inputLast.value = displayLast;
          if (inputEmail && displayEmail && displayEmail !== '—') inputEmail.value = displayEmail;
          if (inputPhone && displayPhone && displayPhone !== '—') inputPhone.value = displayPhone;
          if (inputDob && displayDob && displayDob !== '—') inputDob.value = displayDob;
          if (inputGender && displayGender && displayGender !== '—') inputGender.value = displayGender;

          modal.style.display = 'flex';
          modal.offsetHeight; // force reflow
          modal.classList.add('is-active');
          document.body.classList.add('modal-open');
        }
      };

      // Helper to close modal
      const closeModal = (modal) => {
        if (!modal) return;
        modal.classList.remove('is-active');
        document.body.classList.remove('modal-open');
        setTimeout(() => {
          if (!modal.classList.contains('is-active')) {
            modal.style.display = 'none';
          }
        }, 250);
      };

      // Modal Open/Close Event Delegation
      document.addEventListener('click', (e) => {
        const openBtn = e.target.closest('[data-modal-open]');
        if (openBtn) {
          e.preventDefault();
          const modalId = openBtn.getAttribute('data-modal-open');
          openModal(modalId);
        }

        const closeBtn = e.target.closest('[data-modal-close]');
        if (closeBtn) {
          e.preventDefault();
          const modal = closeBtn.closest('.profile-modal') || document.getElementById('modal-edit-profile');
          closeModal(modal);
        }
      });

      // Escape key to close modals
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          document.querySelectorAll('.profile-modal.is-active').forEach((modal) => {
            closeModal(modal);
          });
        }
      });

      // Phone Prefix dropdown handling
      const phonePrefixBtn = document.getElementById('phone-prefix-btn');
      const phonePrefixDropdown = document.getElementById('phone-prefix-dropdown');
      const phoneSelectedFlag = document.getElementById('phone-selected-flag');
      const phoneSelectedCode = document.getElementById('phone-selected-code');

      if (phonePrefixBtn && phonePrefixDropdown) {
        phonePrefixBtn.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          const isShown = phonePrefixDropdown.style.display !== 'none';
          phonePrefixDropdown.style.display = isShown ? 'none' : 'block';
        });

        phonePrefixDropdown.querySelectorAll('.phone-prefix-item').forEach((item) => {
          item.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const flag = item.getAttribute('data-flag');
            const code = item.getAttribute('data-code');
            if (phoneSelectedFlag && flag) phoneSelectedFlag.textContent = flag;
            if (phoneSelectedCode && code) phoneSelectedCode.textContent = code;
            phonePrefixDropdown.style.display = 'none';
            const saveBtn = document.getElementById('btn-save-personal');
            if (saveBtn) saveBtn.classList.add('is-active');
          });
        });

        document.addEventListener('click', (e) => {
          if (!phonePrefixBtn.contains(e.target) && !phonePrefixDropdown.contains(e.target)) {
            phonePrefixDropdown.style.display = 'none';
          }
        });
      }

      // Password Eye Visibility Toggles (Right Icons for Open & Close)
      initPasswordToggles();

      // Password Strength & Requirement Validator
      const newPwdInput = document.getElementById('profile-new-password');
      const confirmPwdInput = document.getElementById('profile-confirm-password');
      const strengthVal = document.getElementById('pwd-strength-val');
      const reqLen = document.getElementById('req-length');
      const reqCase = document.getElementById('req-case');
      const reqSpec = document.getElementById('req-special');
      const submitPwdBtn = document.getElementById('btn-save-password') || document.getElementById('btn-submit-password');
      const cancelPwdBtn = document.getElementById('btn-cancel-password');

      const validatePassword = () => {
        if (!newPwdInput) return;
        const val = newPwdInput.value || '';
        const confirmVal = confirmPwdInput ? confirmPwdInput.value : '';

        const hasLen = val.length >= 8;
        const hasCase = /[A-Z]/.test(val) && /[a-z]/.test(val);
        const hasSpec = /[!@#$%^&*(),.?":{}|<>]/.test(val);

        // Update checklist icons if elements exist
        if (reqLen) {
          reqLen.classList.toggle('is-valid', hasLen);
          const icon = reqLen.querySelector('.password-req-icon');
          if (icon) icon.textContent = hasLen ? '✓' : '✕';
        }

        if (reqCase) {
          reqCase.classList.toggle('is-valid', hasCase);
          const icon = reqCase.querySelector('.password-req-icon');
          if (icon) icon.textContent = hasCase ? '✓' : '✕';
        }

        if (reqSpec) {
          reqSpec.classList.toggle('is-valid', hasSpec);
          const icon = reqSpec.querySelector('.password-req-icon');
          if (icon) icon.textContent = hasSpec ? '✓' : '✕';
        }

        // Calculate strength
        let score = 0;
        if (hasLen) score++;
        if (hasCase) score++;
        if (hasSpec) score++;

        if (strengthVal) {
          strengthVal.className = 'password-strength-val';
          if (score <= 1) {
            strengthVal.textContent = 'Weak';
            strengthVal.classList.add('password-strength-val--weak');
          } else if (score === 2) {
            strengthVal.textContent = 'Medium';
            strengthVal.classList.add('password-strength-val--medium');
          } else {
            strengthVal.textContent = 'Strong';
            strengthVal.classList.add('password-strength-val--strong');
          }
        }

        // Enable button if valid and match
        if (submitPwdBtn) {
          const isValid = hasLen && hasCase && hasSpec && (confirmVal === val) && (val.length > 0);
          submitPwdBtn.disabled = !isValid;
          if (isValid) {
            submitPwdBtn.classList.add('is-active');
          } else {
            submitPwdBtn.classList.remove('is-active');
          }
        }
      };

      if (newPwdInput) {
        newPwdInput.addEventListener('input', validatePassword);
      }
      if (confirmPwdInput) {
        confirmPwdInput.addEventListener('input', validatePassword);
      }

      if (cancelPwdBtn && newPwdInput) {
        cancelPwdBtn.addEventListener('click', () => {
          newPwdInput.value = '';
          if (confirmPwdInput) confirmPwdInput.value = '';
          validatePassword();
        });
      }

      const pwdForm = document.getElementById('form-profile-change-password');
      if (pwdForm) {
        pwdForm.addEventListener('submit', (e) => {
          e.preventDefault();
          if (newPwdInput) newPwdInput.value = '';
          if (confirmPwdInput) confirmPwdInput.value = '';
          validatePassword();
          showToast('Password updated successfully!');
        });
      }

      // Edit Personal Details Form Submission & Save button state
      const editForm = document.getElementById('form-edit-personal');
      const savePersonalBtn = document.getElementById('btn-save-personal');

      if (editForm && savePersonalBtn) {
        editForm.addEventListener('input', () => {
          savePersonalBtn.classList.add('is-active');
        });
        editForm.addEventListener('change', () => {
          savePersonalBtn.classList.add('is-active');
        });

        editForm.addEventListener('submit', (e) => {
          e.preventDefault();
          const firstName = document.getElementById('modal-input-first-name')?.value.trim();
          const lastName = document.getElementById('modal-input-last-name')?.value.trim();
          const email = document.getElementById('modal-input-email')?.value.trim();
          const phone = document.getElementById('modal-input-phone')?.value.trim();
          const dob = document.getElementById('modal-input-dob')?.value.trim();
          const gender = document.getElementById('modal-input-gender')?.value;

          if (firstName && document.getElementById('display-first-name')) {
            document.getElementById('display-first-name').textContent = firstName;
          }
          if (lastName && document.getElementById('display-last-name')) {
            document.getElementById('display-last-name').textContent = lastName;
          }
          if (email && document.getElementById('display-email')) {
            document.getElementById('display-email').textContent = email;
          }
          if (document.getElementById('display-phone')) {
            document.getElementById('display-phone').textContent = phone || '—';
          }
          if (document.getElementById('display-dob')) {
            document.getElementById('display-dob').textContent = dob || '—';
          }
          if (document.getElementById('display-gender')) {
            document.getElementById('display-gender').textContent = (gender && gender !== 'Gender') ? gender : '—';
          }

          // Persist to localStorage
          try {
            const profileData = {
              firstName: firstName || 'Ndubuisi',
              lastName: lastName || 'Chinenye',
              email: email || 'johnrosey4@gmail.com',
              phone: phone || '',
              dob: dob || '',
              gender: gender || ''
            };
            localStorage.setItem('oge_user_profile', JSON.stringify(profileData));
          } catch (err) {
            console.warn('LocalStorage error:', err);
          }

          // Close modal
          const modal = document.getElementById('modal-edit-profile');
          closeModal(modal);

          showToast('Personal details saved successfully!');
        });
      }

      // Restore saved profile data on page load
      try {
        const savedProfile = localStorage.getItem('oge_user_profile');
        if (savedProfile) {
          const data = JSON.parse(savedProfile);
          if (data.firstName && document.getElementById('display-first-name')) {
            document.getElementById('display-first-name').textContent = data.firstName;
          }
          if (data.lastName && document.getElementById('display-last-name')) {
            document.getElementById('display-last-name').textContent = data.lastName;
          }
          if (data.email && document.getElementById('display-email')) {
            document.getElementById('display-email').textContent = data.email;
          }
          if (data.phone && document.getElementById('display-phone')) {
            document.getElementById('display-phone').textContent = data.phone || '—';
          }
          if (data.dob && document.getElementById('display-dob')) {
            document.getElementById('display-dob').textContent = data.dob || '—';
          }
          if (data.gender && document.getElementById('display-gender')) {
            document.getElementById('display-gender').textContent = data.gender || '—';
          }
        }
      } catch (err) {
        console.warn('Error restoring profile data:', err);
      }

      // Helper toast
      function showToast(message) {
        let toast = document.getElementById('profile-toast');
        if (!toast) {
          toast = document.createElement('div');
          toast.id = 'profile-toast';
          toast.style.cssText = 'position:fixed;bottom:24px;left:50%;transform:translateX(-50%);background:#111111;color:#FFFFFF;padding:12px 24px;border-radius:2px;font-size:0.875rem;font-weight:500;z-index:2000;box-shadow:0 4px 16px rgba(0,0,0,0.15);transition:opacity 0.3s ease;opacity:0;pointer-events:none;';
          document.body.appendChild(toast);
        }
        toast.textContent = message;
        toast.style.opacity = '1';
        setTimeout(() => {
          toast.style.opacity = '0';
        }, 3000);
      }
    }
  };

  /* ==========================================================================
     11. AUTH PAGES CONTROLLER (LOGIN & SIGN UP MULTI-STEP)
     ========================================================================== */
  const AuthPages = {
    init() {
      // Toggle password eye icons (Right Icons for Open & Close)
      initPasswordToggles();

      // Signup multi-step handling
      const step1 = document.getElementById('signup-step-1');
      const step2 = document.getElementById('signup-step-2');
      const nextBtn = document.getElementById('btn-signup-step1-next');
      const backBtn = document.getElementById('btn-signup-step2-back');
      const stepBadge = document.getElementById('signup-step-badge');
      const signupForm = document.getElementById('form-auth-signup');

      if (nextBtn && step1 && step2) {
        nextBtn.addEventListener('click', (e) => {
          e.preventDefault();
          const firstName = document.getElementById('signup-firstname')?.value.trim();
          const lastName = document.getElementById('signup-lastname')?.value.trim();
          const email = document.getElementById('signup-email')?.value.trim();

          if (!firstName || !lastName || !email) {
            alert('Please fill in all required fields.');
            return;
          }

          // Advance to step 2
          step1.classList.remove('is-active');
          step2.classList.add('is-active');
          if (stepBadge) stepBadge.textContent = 'Step 2 of 2';
        });
      }

      if (backBtn && step1 && step2) {
        backBtn.addEventListener('click', (e) => {
          e.preventDefault();
          step2.classList.remove('is-active');
          step1.classList.add('is-active');
          if (stepBadge) stepBadge.textContent = 'Step 1 of 2';
        });
      }

      if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
          const pwd = document.getElementById('signup-password')?.value;
          const confirmPwd = document.getElementById('signup-confirm-password')?.value;

          if (!pwd || pwd.length < 6) {
            e.preventDefault();
            alert('Please enter a secure password.');
            return;
          }
          if (pwd !== confirmPwd) {
            e.preventDefault();
            alert('Passwords do not match. Please re-enter.');
          }
        });
      }
    }
  };

  /* ==========================================================================
     COLLECTION PAGE CONTROLLER (TABS FILTERING, GRID VIEW SWITCHER, QUICK ADD)
     ========================================================================== */
  const CollectionPage = {
    init() {
      // 1. Category Tab Filter
      const tabBtns = document.querySelectorAll('[data-collection-tab]');
      const productCards = document.querySelectorAll('.product-card--collection');

      if (tabBtns.length > 0) {
        tabBtns.forEach((btn) => {
          btn.addEventListener('click', (e) => {
            const href = btn.getAttribute('href');
            if (href && href !== '#' && !href.startsWith('javascript:')) {
              // Real link navigation - allow native browser navigation
              return;
            }
            e.preventDefault();
            const filterValue = btn.getAttribute('data-collection-tab');

            // Update active state
            tabBtns.forEach((b) => b.classList.remove('is-active'));
            btn.classList.add('is-active');

            // Filter product cards
            productCards.forEach((card) => {
              const cardCat = card.getAttribute('data-category') || '';
              if (filterValue === 'all' || cardCat.toLowerCase().includes(filterValue.toLowerCase())) {
                card.style.display = 'flex';
              } else {
                card.style.display = 'none';
              }
            });
          });
        });
      }

      // 2. Grid View Switchers (1-col, 2-col, 4-col)
      const gridViewBtns = document.querySelectorAll('[data-grid-view], [data-cols]');
      const gridContainer = document.getElementById('collection-products-grid') || document.getElementById('category-grid');

      if (gridViewBtns.length > 0 && gridContainer) {
        gridViewBtns.forEach((btn) => {
          btn.addEventListener('click', (e) => {
            e.preventDefault();
            const viewMode = btn.getAttribute('data-grid-view') || btn.getAttribute('data-cols');

            // Update active switcher icon
            gridViewBtns.forEach((b) => b.classList.remove('is-active'));
            btn.classList.add('is-active');

            // Toggle grid classes
            gridContainer.classList.remove('grid--1-col', 'grid--2-col', 'grid--4-col');
            gridContainer.classList.add(`grid--${viewMode}-col`);
          });
        });
      }

      // 3. Filter & Sort Dropdown Toggle
      const filterToggle = document.getElementById('btn-filter-sort') || document.getElementById('filter-sort-toggle');
      const filterDropdown = document.getElementById('category-filter-dropdown');
      if (filterToggle && filterDropdown) {
        filterToggle.addEventListener('click', (e) => {
          e.stopPropagation();
          const isOpen = filterDropdown.style.display !== 'none';
          filterDropdown.style.display = isOpen ? 'none' : 'block';
          filterToggle.setAttribute('aria-expanded', !isOpen ? 'true' : 'false');
        });

        document.addEventListener('click', (e) => {
          if (!filterToggle.contains(e.target) && !filterDropdown.contains(e.target)) {
            filterDropdown.style.display = 'none';
            filterToggle.setAttribute('aria-expanded', 'false');
          }
        });
      }
    }
  };

  /* ==========================================================================
     SEARCH MODAL OVERLAY CONTROLLER (IMAGE 1 UPLOAD MATCH)
     ========================================================================== */
  const SearchModal = {
    modal: null,
    backdrop: null,
    input: null,
    form: null,
    categoriesEl: null,
    predictiveEl: null,
    debounceTimer: null,
    abortController: null,
    cachedQueries: {},

    init() {
      this.modal = document.querySelector('[data-search-modal]');
      this.backdrop = document.querySelector('[data-search-backdrop]');
      this.input = document.querySelector('[data-search-input]');
      this.form = document.querySelector('[data-search-form]') || this.modal?.querySelector('form');
      this.categoriesEl = document.querySelector('[data-search-categories]');
      this.predictiveEl = document.querySelector('[data-predictive-search]');

      // Open triggers (e.g. #btn-search, [data-search-open], a[href*="#search"])
      document.querySelectorAll('[data-search-open], #btn-search, a[href*="#search"]').forEach((btn) => {
        btn.addEventListener('click', (e) => {
          // If already on search results page, focus the search page input
          const pageInput = document.querySelector('[data-search-page-input]');
          if (pageInput && (document.body.classList.contains('template-search') || document.body.hasAttribute('data-search-page'))) {
            e.preventDefault();
            pageInput.focus();
            pageInput.select();
            return;
          }
          e.preventDefault();
          this.open();
        });
      });

      // Close triggers
      document.querySelectorAll('[data-search-close], #btn-search-close').forEach((btn) => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          this.close();
        });
      });

      if (this.backdrop) {
        this.backdrop.addEventListener('click', () => this.close());
      }

      // Keyboard Esc to close
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.modal && this.modal.classList.contains('is-open')) {
          this.close();
        }
      });

      // Form submission
      if (this.form) {
        this.form.addEventListener('submit', (e) => {
          const query = this.input ? this.input.value.trim() : '';
          if (!query) {
            e.preventDefault();
          }
        });
      }

      // Input event listener for predictive search & enter key
      if (this.input) {
        this.input.addEventListener('input', () => {
          const query = this.input.value.trim();
          this.handleInput(query);
        });

        this.input.addEventListener('keydown', (e) => {
          if (e.key === 'Enter') {
            const query = this.input.value.trim();
            if (query) {
              const root = ((window.Shopify && window.Shopify.routes && window.Shopify.routes.root) || '/').replace(/\/$/, '');
              window.location.href = `${root}/search?q=${encodeURIComponent(query)}&type=product`;
              e.preventDefault();
            } else {
              e.preventDefault();
            }
          }
        });
      }
    },

    open() {
      if (!this.modal) return;
      if (typeof SidebarDrawer !== 'undefined' && SidebarDrawer.close) {
        SidebarDrawer.close();
      }
      this.modal.classList.add('is-open');
      if (this.backdrop) this.backdrop.classList.add('is-active');
      document.body.style.overflow = 'hidden';
      setTimeout(() => {
        if (this.input) this.input.focus();
      }, 150);
    },

    close() {
      if (!this.modal) return;
      this.modal.classList.remove('is-open');
      if (this.backdrop) this.backdrop.classList.remove('is-active');
      document.body.style.overflow = '';
      if (this.debounceTimer) clearTimeout(this.debounceTimer);
      if (this.abortController) {
        this.abortController.abort();
        this.abortController = null;
      }
    },

    handleInput(query) {
      if (this.debounceTimer) clearTimeout(this.debounceTimer);

      if (!query || query.length === 0) {
        this.resetView();
        return;
      }

      // Debounce predictive request by 250ms
      this.debounceTimer = setTimeout(() => {
        this.fetchPredictive(query);
      }, 250);
    },

    resetView() {
      if (this.predictiveEl) {
        this.predictiveEl.style.display = 'none';
        this.predictiveEl.innerHTML = '';
      }
      if (this.categoriesEl) {
        this.categoriesEl.style.display = '';
      }
    },

    async fetchPredictive(query) {
      if (!this.predictiveEl) return;

      // Show predictive container, hide static categories
      if (this.categoriesEl) this.categoriesEl.style.display = 'none';
      this.predictiveEl.style.display = 'block';

      // Check cache first
      if (this.cachedQueries[query]) {
        this.renderPredictive(query, this.cachedQueries[query]);
        return;
      }

      // Show loading status
      this.predictiveEl.innerHTML = `
        <div class="search-predictive-status">
          <span>Searching for &ldquo;${escapeHtml(query)}&rdquo;&hellip;</span>
        </div>
      `;

      if (this.abortController) {
        this.abortController.abort();
      }
      this.abortController = new AbortController();

      try {
        const root = ((window.Shopify && window.Shopify.routes && window.Shopify.routes.root) || '/').replace(/\/$/, '');
        const url = `${root}/search/suggest.json?q=${encodeURIComponent(query)}&resources[type]=product&resources[limit]=4&resources[options][unavailable_products]=last&resources[options][fields]=title,product_type,variants.title,vendor,tag`;

        const res = await fetch(url, {
          signal: this.abortController.signal,
          headers: {
            'Accept': 'application/json'
          }
        });

        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }

        const data = await res.json();
        const products = data?.resources?.results?.products || [];
        this.cachedQueries[query] = products;
        this.renderPredictive(query, products);
      } catch (err) {
        if (err.name === 'AbortError') return;
        console.warn('Predictive search error:', err);
        this.predictiveEl.innerHTML = `
          <div class="search-predictive-status">
            <p style="margin: 0; color: #777;">Unable to load suggestions. Press Enter to view search results.</p>
          </div>
        `;
      }
    },

    renderPredictive(query, products) {
      if (!this.predictiveEl) return;

      if (!products || products.length === 0) {
        this.predictiveEl.innerHTML = `
          <div class="search-predictive-status">
            <p style="margin: 0 0 10px; font-weight: 500; color: #111111;">No products found for &ldquo;${escapeHtml(query)}&rdquo;</p>
            <p style="margin: 0; color: #777; font-size: 0.8125rem;">Check your spelling or try a different search query.</p>
          </div>
        `;
        return;
      }

      const root = ((window.Shopify && window.Shopify.routes && window.Shopify.routes.root) || '/').replace(/\/$/, '');
      const searchUrl = `${root}/search?q=${encodeURIComponent(query)}&type=product`;

      let cardsHtml = '<div class="search-predictive-grid">';
      products.forEach((product) => {
        const title = escapeHtml(product.title);
        const url = product.url;
        const img = product.image || product.featured_image?.url || '';
        let price = '';
        if (product.price) {
          const raw = String(product.price);
          if (raw.startsWith('$') || raw.startsWith('€') || raw.startsWith('£')) {
            price = raw;
          } else {
            const pNum = parseFloat(raw);
            if (!isNaN(pNum)) {
              if (raw.includes('.')) {
                price = formatMoney(Math.round(pNum * 100));
              } else if (pNum >= 500) {
                price = formatMoney(pNum);
              } else {
                price = formatMoney(pNum * 100);
              }
            }
          }
        }

        cardsHtml += `
          <a href="${url}" class="search-category-card">
            <div class="search-category-card__media">
              ${img ? `<img src="${img}" alt="${title}" class="search-category-card__image" loading="lazy" width="300" height="300">` : `<div style="width:100%;height:100%;background:#F6F6F6;"></div>`}
            </div>
            <span class="search-category-card__title">${title}</span>
            ${price ? `<span class="search-category-card__price">${price}</span>` : ''}
          </a>
        `;
      });
      cardsHtml += '</div>';

      cardsHtml += `
        <div class="search-predictive-footer" style="text-align: center; margin-top: 16px; padding-top: 12px; border-top: 1px solid #ECECEC;">
          <a href="${searchUrl}" class="search-predictive-view-all">
            View all results for &ldquo;${escapeHtml(query)}&rdquo; &rarr;
          </a>
        </div>
      `;

      this.predictiveEl.innerHTML = cardsHtml;
    }
  };

  /* ==========================================================================
     SEARCH RESULTS PAGE CONTROLLER (IMAGE 2 UPLOAD MATCH)
     ========================================================================== */
  const SearchResultsPage = {
    init() {
      const pageEl = document.querySelector('[data-search-page]');
      if (!pageEl) return;

      const inputEl = document.querySelector('[data-search-page-input]');
      const clearBtn = document.querySelector('[data-search-page-clear], [data-search-page-close], #search-clear-btn');
      const countEl = document.querySelector('[data-search-results-count]');
      const queryEl = document.querySelector('[data-search-results-query]');
      const formEl = document.querySelector('[data-search-page-form]') || pageEl.querySelector('form');

      const urlParams = new URLSearchParams(window.location.search);
      const query = urlParams.get('q') || '';

      if (inputEl && !inputEl.value && query) {
        inputEl.value = query;
      }
      if (queryEl && query && !queryEl.textContent) {
        queryEl.textContent = query;
      }

      if (query) {
        document.title = `Search: ${query} — OGÉ Fine Jewelry`;
      }

      const root = ((window.Shopify && window.Shopify.routes && window.Shopify.routes.root) || '/').replace(/\/$/, '');
      const searchBaseUrl = `${root}/search`;

      // Submit handler for Search Page input
      if (inputEl) {
        inputEl.addEventListener('keydown', (e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            const newQuery = inputEl.value.trim();
            if (newQuery) {
              window.location.href = `${searchBaseUrl}?q=${encodeURIComponent(newQuery)}&type=product`;
            }
          }
        });
      }

      if (formEl) {
        formEl.addEventListener('submit', (e) => {
          const newQuery = inputEl ? inputEl.value.trim() : '';
          if (!newQuery) {
            e.preventDefault();
          }
        });
      }

      // Close/Clear button on Search Page
      function closeSearchPage() {
        if (window.history.length > 1 && document.referrer && !document.referrer.includes('/search')) {
          window.history.back();
        } else {
          window.location.href = root;
        }
      }
      window.closeSearchPage = closeSearchPage;

      if (clearBtn) {
        clearBtn.addEventListener('click', (e) => {
          e.preventDefault();
          if (inputEl && inputEl.value.trim() !== '') {
            inputEl.value = '';
            inputEl.focus();
          } else {
            closeSearchPage();
          }
        });
      }

      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && (document.body.hasAttribute('data-search-page') || document.body.classList.contains('template-search'))) {
          closeSearchPage();
        }
      });
    }
  };

  /* ==========================================================================
     CATEGORY PAGE CONTROLLER (EARRINGS, RINGS, NECKLACES, BRACELETS)
     ========================================================================== */
  const CategoryPage = {
    init() {
      // Do not run or override titles on Shop page
      if (document.body.classList.contains('template-shop')) return;

      const pageTitleEl = document.querySelector('[data-category-page-title]');
      if (!pageTitleEl) return;

      const urlParams = new URLSearchParams(window.location.search);
      const categoryType = urlParams.get('type') || 'earrings';

      const titles = {
        earrings: 'EARRINGS',
        rings: 'RINGS',
        necklaces: 'NECKLACES',
        bracelets: 'BRACELETS',
        all: 'ALL JEWELRY',
        shop: 'SHOP'
      };

      const titleText = titles[categoryType.toLowerCase()] || categoryType.toUpperCase();
      pageTitleEl.textContent = titleText;
      document.title = `${titleText.charAt(0).toUpperCase() + titleText.slice(1).toLowerCase()} — OGÉ Jewelry`;
    }
  };

  /* ==========================================================================
     PRODUCT DETAIL PAGE CONTROLLER (THUMBNAILS, VARIANTS, QUANTITY, ACCORDIONS, CAROUSEL)
     ========================================================================== */
  const ProductDetailPage = {
    productData: null,

    init() {
      const productContainer = document.querySelector('[data-product-page]');
      if (!productContainer) return;

      // Parse embedded Shopify product JSON if available
      const jsonScript = productContainer.querySelector('[data-product-json]');
      if (jsonScript) {
        try {
          this.productData = JSON.parse(jsonScript.textContent);
        } catch (e) {
          console.warn('Error parsing product JSON:', e);
        }
      }

      // 1. Gallery Thumbnail Switching
      const thumbBtns = productContainer.querySelectorAll('[data-product-thumbs] .product-thumb-item');
      const mainImage = productContainer.querySelector('[data-product-main-image]');

      if (thumbBtns.length > 0 && mainImage) {
        thumbBtns.forEach((btn) => {
          btn.addEventListener('click', () => {
            thumbBtns.forEach((b) => b.classList.remove('is-active'));
            btn.classList.add('is-active');

            const newSrc = btn.getAttribute('data-thumb-src');
            if (newSrc) {
              mainImage.style.opacity = '0.4';
              setTimeout(() => {
                mainImage.src = newSrc;
                mainImage.style.opacity = '1';
              }, 120);
            }
          });
        });
      }

      // 2. Variant Option Pills & Variant Selection
      const variantContainers = productContainer.querySelectorAll('[data-product-variants]');
      if (variantContainers.length > 0 && this.productData && this.productData.variants) {
        const optionPills = productContainer.querySelectorAll('[data-option-pill]');
        optionPills.forEach((pill) => {
          pill.addEventListener('click', (e) => {
            e.preventDefault();
            const group = pill.closest('.product-option-group');
            if (!group) return;

            // Update active pill in this group
            group.querySelectorAll('[data-option-pill]').forEach((p) => p.classList.remove('is-selected'));
            pill.classList.add('is-selected');

            // Update the text label for this option
            const selectedValLabel = group.querySelector('[data-option-selected-val]');
            const optionVal = pill.getAttribute('data-option-value') || pill.textContent.trim();
            if (selectedValLabel) {
              selectedValLabel.textContent = optionVal;
            }

            // Gather all selected option values in order of option index
            const selectedOptions = [];
            productContainer.querySelectorAll('.product-option-group').forEach((grp) => {
              const activePill = grp.querySelector('[data-option-pill].is-selected');
              if (activePill) {
                selectedOptions.push(activePill.getAttribute('data-option-value') || activePill.textContent.trim());
              }
            });

            this.onVariantChange(selectedOptions, productContainer);
          });
        });

        // Sync initial variant from URL ?variant=ID if present
        try {
          const urlParams = new URLSearchParams(window.location.search);
          const urlVariantId = urlParams.get('variant');
          if (urlVariantId) {
            const foundVariant = this.productData.variants.find((v) => String(v.id) === String(urlVariantId));
            if (foundVariant && foundVariant.options) {
              foundVariant.options.forEach((optVal, optIdx) => {
                const grp = productContainer.querySelector(`.product-option-group[data-option-index="${optIdx}"]`);
                if (grp) {
                  const pills = grp.querySelectorAll('[data-option-pill]');
                  pills.forEach((p) => {
                    const val = p.getAttribute('data-option-value') || p.textContent.trim();
                    if (val === optVal) {
                      pills.forEach((b) => b.classList.remove('is-selected'));
                      p.classList.add('is-selected');
                      const lbl = grp.querySelector('[data-option-selected-val]');
                      if (lbl) lbl.textContent = val;
                    }
                  });
                }
              });
              this.onVariantChange(foundVariant.options, productContainer);
            }
          }
        } catch (e) {
          // ignore
        }

        // Sort numeric size pills in natural ascending order (e.g. 5, 6, 7, 8, 9, 10)
        productContainer.querySelectorAll('.product-option-group').forEach((group) => {
          const valuesWrap = group.querySelector('.product-option-values');
          if (!valuesWrap) return;
          const pills = Array.from(valuesWrap.querySelectorAll('[data-option-pill]'));
          const allNumeric = pills.length > 1 && pills.every((p) => {
            const val = p.getAttribute('data-option-value') || p.textContent.trim();
            return !isNaN(parseFloat(val)) && isFinite(val);
          });
          if (allNumeric) {
            pills.sort((a, b) => {
              const valA = parseFloat(a.getAttribute('data-option-value') || a.textContent.trim());
              const valB = parseFloat(b.getAttribute('data-option-value') || b.textContent.trim());
              return valA - valB;
            });
            pills.forEach((p) => valuesWrap.appendChild(p));
          }
        });
      }

      // Fallback ring size pills for mockup preview
      const fallbackPills = productContainer.querySelectorAll('.product-option-group [data-size]');
      fallbackPills.forEach((pill) => {
        pill.addEventListener('click', (e) => {
          e.preventDefault();
          fallbackPills.forEach((p) => p.classList.remove('is-selected'));
          pill.classList.add('is-selected');
          const lbl = document.getElementById('selected-size-label');
          if (lbl) lbl.textContent = pill.getAttribute('data-size') || pill.textContent.trim();
        });
      });

      // 3. Quantity Picker
      const qtyMinus = productContainer.querySelector('[data-quantity-minus]');
      const qtyPlus = productContainer.querySelector('[data-quantity-plus]');
      const qtyInput = productContainer.querySelector('[data-quantity-input]');

      if (qtyMinus && qtyInput && !qtyMinus.dataset.qtyBound) {
        qtyMinus.dataset.qtyBound = 'true';
        qtyMinus.addEventListener('click', (e) => {
          e.preventDefault();
          let currentVal = parseInt(qtyInput.value, 10) || 1;
          if (currentVal > 1) {
            qtyInput.value = currentVal - 1;
            qtyInput.dispatchEvent(new Event('change', { bubbles: true }));
          }
        });
      }

      if (qtyPlus && qtyInput && !qtyPlus.dataset.qtyBound) {
        qtyPlus.dataset.qtyBound = 'true';
        qtyPlus.addEventListener('click', (e) => {
          e.preventDefault();
          let currentVal = parseInt(qtyInput.value, 10) || 1;
          const maxVal = parseInt(qtyInput.getAttribute('max') || '99', 10);
          if (currentVal < maxVal) {
            qtyInput.value = currentVal + 1;
            qtyInput.dispatchEvent(new Event('change', { bubbles: true }));
          }
        });
      }

      if (qtyInput) {
        qtyInput.addEventListener('change', () => {
          let val = parseInt(qtyInput.value, 10) || 1;
          const min = parseInt(qtyInput.getAttribute('min') || '1', 10);
          const max = parseInt(qtyInput.getAttribute('max') || '99', 10);
          if (val < min) val = min;
          if (val > max) val = max;
          qtyInput.value = val;
        });
      }

      // 4. Accordions Toggle
      const accordionHeaders = productContainer.querySelectorAll('[data-product-accordions] .product-accordion-header');
      accordionHeaders.forEach((header) => {
        header.addEventListener('click', () => {
          const item = header.closest('.product-accordion-item');
          if (!item) return;
          const isCurrentlyOpen = item.classList.contains('is-open');
          const body = item.querySelector('.product-accordion-body');
          const icon = header.querySelector('.product-accordion-icon');

          if (isCurrentlyOpen) {
            item.classList.remove('is-open');
            header.setAttribute('aria-expanded', 'false');
            if (body) body.style.maxHeight = null;
            if (icon) icon.textContent = '+';
          } else {
            item.classList.add('is-open');
            header.setAttribute('aria-expanded', 'true');
            if (body) body.style.maxHeight = body.scrollHeight + 'px';
            if (icon) icon.textContent = '−';
          }
        });
      });

      // 5. Related Products Navigation
      const prevBtn = productContainer.querySelector('[data-related-prev]');
      const nextBtn = productContainer.querySelector('[data-related-next]');
      const track = productContainer.querySelector('[data-related-track]');

      if (track) {
        const getStep = () => {
          const card = track.querySelector('.product-card');
          if (card) {
            const style = window.getComputedStyle(track);
            const gap = parseFloat(style.gap) || 16;
            return card.offsetWidth + gap;
          }
          return 260;
        };

        if (prevBtn && !prevBtn.dataset.bound) {
          prevBtn.dataset.bound = 'true';
          prevBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const mult = window.innerWidth > 900 ? 2 : 1;
            track.scrollBy({ left: -(getStep() * mult), behavior: 'smooth' });
          });
        }
        if (nextBtn && !nextBtn.dataset.bound) {
          nextBtn.dataset.bound = 'true';
          nextBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const mult = window.innerWidth > 900 ? 2 : 1;
            track.scrollBy({ left: getStep() * mult, behavior: 'smooth' });
          });
        }
      }

      // Dynamic Shopify Recommendations loader fallback if track is empty
      const recSection = productContainer.querySelector('[data-product-recommendations]');
      if (recSection && track && track.children.length === 0) {
        const recUrl = recSection.getAttribute('data-url');
        if (recUrl) {
          fetch(recUrl)
            .then((res) => res.text())
            .then((html) => {
              const parser = new DOMParser();
              const doc = parser.parseFromString(html, 'text/html');
              const newTrack = doc.querySelector('[data-related-track]');
              if (newTrack && newTrack.children.length > 0) {
                track.innerHTML = newTrack.innerHTML;
                CartDrawer.bindTriggers();
                Wishlist.initButtons();
              }
            })
            .catch((err) => console.warn('Could not load recommendations:', err));
        }
      }

      // 6. Add to Bag Form Submission (Live Shopify Cart AJAX)
      const productForm = productContainer.querySelector('#product-form-main') || productContainer.querySelector('form[action*="/cart/add"]');
      if (productForm) {
        productForm.addEventListener('submit', async (e) => {
          e.preventDefault();
          const variantInput = productForm.querySelector('[data-selected-variant-id]') || productForm.querySelector('[name="id"]');
          const variantId = variantInput ? variantInput.value : null;
          const qtyInput = productForm.querySelector('[data-quantity-input]') || productForm.querySelector('[name="quantity"]');
          const quantity = parseInt(qtyInput ? qtyInput.value : '1', 10) || 1;
          const addBtn = productForm.querySelector('[data-add-to-cart-btn]');
          const btnText = productForm.querySelector('[data-add-to-cart-text]');

          if (!variantId || variantId === 'default' || (addBtn && addBtn.disabled)) {
            return;
          }

          const originalText = btnText ? btnText.textContent : 'Add to Bag';
          if (btnText) btnText.textContent = 'Adding...';
          if (addBtn) addBtn.disabled = true;

          try {
            await CartDrawer.addItem(variantId, quantity);
          } catch (err) {
            console.error('Error adding product to bag:', err);
          } finally {
            if (addBtn) addBtn.disabled = false;
            if (btnText && btnText.textContent === 'Adding...') {
              btnText.textContent = originalText;
            }
          }
        });
      }
    },

    onVariantChange(selectedOptions, container) {
      if (!this.productData || !this.productData.variants) return;

      const matchedVariant = this.productData.variants.find((v) => {
        return v.options.every((optVal, idx) => {
          return selectedOptions[idx] === undefined || optVal === selectedOptions[idx];
        });
      });

      const variantInput = container.querySelector('[data-selected-variant-id]');
      const priceDisplay = container.querySelector('[data-product-price]');
      const compareDisplay = container.querySelector('[data-product-compare-price]');
      const addToCartBtn = container.querySelector('[data-add-to-cart-btn]');
      const addToCartText = container.querySelector('[data-add-to-cart-text]');
      const buyNowWrap = container.querySelector('[data-buy-now-wrap]');
      const mainImage = container.querySelector('[data-product-main-image]');
      const thumbs = container.querySelectorAll('[data-product-thumbs] .product-thumb-item');

      if (matchedVariant) {
        // 1. Update Hidden Form Input
        if (variantInput) {
          variantInput.value = matchedVariant.id;
          variantInput.dispatchEvent(new Event('change', { bubbles: true }));
        }

        // 2. Update Price Display
        if (priceDisplay) {
          priceDisplay.textContent = formatMoney(matchedVariant.price);
        }

        // 3. Update Compare-At Price Display
        if (compareDisplay) {
          if (matchedVariant.compare_at_price && matchedVariant.compare_at_price > matchedVariant.price) {
            compareDisplay.textContent = formatMoney(matchedVariant.compare_at_price);
            compareDisplay.style.display = 'inline-block';
          } else {
            compareDisplay.style.display = 'none';
          }
        }

        // 4. Update Availability & Add to Cart
        if (matchedVariant.available) {
          if (addToCartBtn) addToCartBtn.disabled = false;
          if (addToCartText) addToCartText.textContent = 'Add to Bag';
          if (buyNowWrap) buyNowWrap.style.display = '';
        } else {
          if (addToCartBtn) addToCartBtn.disabled = true;
          if (addToCartText) addToCartText.textContent = 'Sold Out';
          if (buyNowWrap) buyNowWrap.style.display = 'none';
        }

        // 5. Update Variant Image & Active Thumbnail
        if (matchedVariant.featured_image && matchedVariant.featured_image.src && mainImage) {
          const newSrc = matchedVariant.featured_image.src;
          mainImage.src = newSrc;

          thumbs.forEach((t) => {
            const thumbSrc = t.getAttribute('data-thumb-src') || '';
            const mediaId = t.getAttribute('data-media-id') || '';
            if (
              (matchedVariant.featured_media && String(matchedVariant.featured_media.id) === mediaId) ||
              thumbSrc.includes(String(matchedVariant.featured_image.id))
            ) {
              thumbs.forEach((b) => b.classList.remove('is-active'));
              t.classList.add('is-active');
            }
          });
        }

        // 6. Update URL parameter
        try {
          const url = new URL(window.location.href);
          url.searchParams.set('variant', matchedVariant.id);
          window.history.replaceState({}, '', url.toString());
        } catch (e) {
          // ignore
        }

      } else {
        // Variant combination does not exist
        if (variantInput) variantInput.value = '';
        if (addToCartBtn) addToCartBtn.disabled = true;
        if (addToCartText) addToCartText.textContent = 'Unavailable';
        if (buyNowWrap) buyNowWrap.style.display = 'none';
      }
    }
  };

  /* ==========================================================================
     CART PAGE CONTROLLER (TEMPLATE /cart)
     ========================================================================== */
  const CartPageController = {
    form: null,

    init() {
      this.form = document.querySelector('[data-cart-page-form]');
      if (!this.form) return;

      this.form.addEventListener('click', (e) => {
        const minusBtn = e.target.closest('[data-cart-page-minus]');
        if (minusBtn) {
          e.preventDefault();
          const key = minusBtn.getAttribute('data-cart-page-minus');
          const input = this.form.querySelector(`[data-cart-page-qty="${key}"]`);
          const currentVal = parseInt(input ? input.value : '1', 10);
          if (currentVal > 1) {
            CartDrawer.updateQuantity(key, currentVal - 1);
          } else {
            CartDrawer.removeItem(key);
          }
          return;
        }

        const plusBtn = e.target.closest('[data-cart-page-plus]');
        if (plusBtn) {
          e.preventDefault();
          const key = plusBtn.getAttribute('data-cart-page-plus');
          const input = this.form.querySelector(`[data-cart-page-qty="${key}"]`);
          const currentVal = parseInt(input ? input.value : '1', 10);
          CartDrawer.updateQuantity(key, currentVal + 1);
          return;
        }

        const removeBtn = e.target.closest('[data-cart-page-remove]');
        if (removeBtn) {
          e.preventDefault();
          const key = removeBtn.getAttribute('data-cart-page-remove');
          CartDrawer.removeItem(key);
          return;
        }
      });

      this.form.addEventListener('change', (e) => {
        const qtyInput = e.target.closest('[data-cart-page-qty]');
        if (qtyInput) {
          const key = qtyInput.getAttribute('data-cart-page-qty');
          const val = parseInt(qtyInput.value, 10);
          if (isNaN(val) || val < 0) return;
          CartDrawer.updateQuantity(key, val);
        }
      });
    },

    render(cart) {
      const container = document.querySelector('.main-cart-section .page-container');
      if (!container) return;

      if (!cart || cart.item_count === 0) {
        const allProductsUrl = ShopifyRoutes.allProducts;
        container.innerHTML = `
          <h1 class="heading-section" style="text-align: center; margin-bottom: 40px;">Your Bag</h1>
          <div class="cart-page-empty" data-cart-page-empty style="text-align: center; padding: 60px 0;">
            <p style="font-size: 1.125rem; color: var(--color-text-muted); margin-bottom: 24px;">Your bag is currently empty.</p>
            <a href="${allProductsUrl}" class="btn btn-primary">Continue Shopping</a>
          </div>
        `;
        return;
      }

      // Update subtotal
      const subtotalEl = container.querySelector('[data-cart-page-subtotal]');
      if (subtotalEl) {
        subtotalEl.textContent = formatMoney(cart.total_price);
      }

      // Update or re-render items container
      const itemsContainer = container.querySelector('[data-cart-page-items]');
      if (itemsContainer) {
        let html = '';
        cart.items.forEach((item) => {
          const itemImg = item.image || (item.featured_image && item.featured_image.url) || '';
          const variantTitle = (item.variant_title && item.variant_title !== 'Default Title') ? item.variant_title : '';
          const linePrice = formatMoney(item.final_line_price);

          html += `
            <div class="cart-page-item" data-item-key="${item.key}" style="display: grid; grid-template-columns: 80px 1fr auto; gap: 20px; align-items: center; border-bottom: 1px solid var(--color-border); padding-bottom: 20px;">
              <div style="aspect-ratio: 1/1; background: #F9F9F9; border-radius: 4px; overflow: hidden;">
                ${itemImg ? `<img src="${itemImg}" alt="${escapeHtml(item.title)}" style="width: 100%; height: 100%; object-fit: cover;">` : `<div style="width:100%;height:100%;background:#F9F9F9;"></div>`}
              </div>
              <div>
                <a href="${item.url}" style="font-weight: 500; font-size: 1rem; display: block; margin-bottom: 4px; color: inherit; text-decoration: none;">${escapeHtml(item.product_title || item.title)}</a>
                ${variantTitle ? `<div style="color: var(--color-text-muted); font-size: 0.8125rem; margin-bottom: 4px;">${escapeHtml(variantTitle)}</div>` : ''}
                <div style="color: var(--color-text-muted); font-size: 0.875rem;">${linePrice}</div>
              </div>
              <div style="display: flex; align-items: center; gap: 14px; justify-content: flex-end;">
                <div class="cart-item__qty-selector" style="display: inline-flex; align-items: center; gap: 8px; border: 1px solid var(--color-border-dark); border-radius: 4px; padding: 4px 8px;">
                  <button type="button" class="cart-item__qty-btn" data-cart-page-minus="${item.key}" aria-label="Decrease quantity" style="background: none; border: none; cursor: pointer; padding: 2px;">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="12" height="12"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                  </button>
                  <input type="number" name="updates[]" id="updates_${item.key}" value="${item.quantity}" min="0" data-cart-page-qty="${item.key}" style="width: 40px; border: none; text-align: center; font-size: 0.875rem; font-weight: 500; -moz-appearance: textfield;" aria-label="Quantity">
                  <button type="button" class="cart-item__qty-btn" data-cart-page-plus="${item.key}" aria-label="Increase quantity" style="background: none; border: none; cursor: pointer; padding: 2px;">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="12" height="12"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                  </button>
                </div>
                <button type="button" class="cart-item__action-btn" data-cart-page-remove="${item.key}" aria-label="Remove item" style="background: none; border: none; cursor: pointer; color: var(--color-text-muted); padding: 4px;">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" width="18" height="18">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                  </svg>
                </button>
              </div>
            </div>
          `;
        });
        itemsContainer.innerHTML = html;
      }
    }
  };

  window.CartPageController = CartPageController;

  /* ==========================================================================
     18. SELECT YOUR LOCATION MODAL CONTROLLER (EXACT FIGMA MATCH)
     ========================================================================== */
  const CountrySelector = {
    modalHtml: `
  <div class="location-modal-backdrop" data-location-modal-backdrop style="display: none;"></div>
  <div class="location-modal" data-location-modal style="display: none;" role="dialog" aria-modal="true" aria-label="Select your location">
    <div class="location-modal__header">
      <h3 class="location-modal__title">Select your location</h3>
      <button type="button" class="location-modal__close" data-location-modal-close aria-label="Close location modal">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.6"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
      </button>
    </div>
    <div class="location-modal__grid">
      <!-- 1. Europe -->
      <button type="button" class="location-item is-selected" data-location-item data-location-code="eu">
        <span class="location-item__flag">
          <svg viewBox="0 0 32 32" width="32" height="32"><circle cx="16" cy="16" r="16" fill="#003399"/><circle cx="16" cy="16" r="9" fill="none" stroke="#FFCC00" stroke-width="2.5" stroke-dasharray="1.8 2.8"/></svg>
        </span>
        <span class="location-item__text">
          <span class="location-item__country">Europe</span>
          <span class="location-item__language">English</span>
        </span>
      </button>

      <!-- 2. Australia & NZ -->
      <button type="button" class="location-item" data-location-item data-location-code="au">
        <span class="location-item__flag">
          <svg viewBox="0 0 32 32" width="32" height="32"><circle cx="16" cy="16" r="16" fill="#00008B"/><rect width="14" height="10" fill="#00247D"/><path d="M0 0 L14 10 M14 0 L0 10" stroke="#FFF" stroke-width="2"/><path d="M0 0 L14 10 M14 0 L0 10" stroke="#CF142B" stroke-width="1"/><path d="M7 0 V10 M0 5 H14" stroke="#FFF" stroke-width="3"/><path d="M7 0 V10 M0 5 H14" stroke="#CF142B" stroke-width="1.8"/><circle cx="23" cy="8" r="1.2" fill="#FFF"/><circle cx="26" cy="14" r="1.2" fill="#FFF"/><circle cx="24" cy="22" r="1.2" fill="#FFF"/><circle cx="19" cy="24" r="1.2" fill="#FFF"/><circle cx="10" cy="22" r="1.8" fill="#FFF"/></svg>
        </span>
        <span class="location-item__text">
          <span class="location-item__country">Australia &amp; NZ</span>
          <span class="location-item__language">English</span>
        </span>
      </button>

      <!-- 3. Canada -->
      <button type="button" class="location-item" data-location-item data-location-code="ca">
        <span class="location-item__flag">
          <svg viewBox="0 0 32 32" width="32" height="32"><circle cx="16" cy="16" r="16" fill="#FF0000"/><rect x="8" width="16" height="32" fill="#FFFFFF"/><path d="M16 9 L17.5 13.5 L21 12.5 L19.5 16 L22.5 18 L18.5 19 L19 22 L16 20.5 L13 22 L13.5 19 L9.5 18 L12.5 16 L11 12.5 L14.5 13.5 Z M15.5 20.5 L15.5 24 L16.5 24 L16.5 20.5 Z" fill="#FF0000"/></svg>
        </span>
        <span class="location-item__text">
          <span class="location-item__country">Canada</span>
          <span class="location-item__language">English</span>
        </span>
      </button>

      <!-- 4. Danmark -->
      <button type="button" class="location-item" data-location-item data-location-code="dk">
        <span class="location-item__flag">
          <svg viewBox="0 0 32 32" width="32" height="32"><circle cx="16" cy="16" r="16" fill="#C8102E"/><rect x="10" y="0" width="4" height="32" fill="#FFFFFF"/><rect x="0" y="14" width="32" height="4" fill="#FFFFFF"/></svg>
        </span>
        <span class="location-item__text">
          <span class="location-item__country">Danmark</span>
          <span class="location-item__language">Dansk</span>
        </span>
      </button>

      <!-- 5. Deutschland & Österreich -->
      <button type="button" class="location-item" data-location-item data-location-code="de">
        <span class="location-item__flag">
          <svg viewBox="0 0 32 32" width="32" height="32"><clipPath id="de-clip-js"><circle cx="16" cy="16" r="16"/></clipPath><g clip-path="url(#de-clip-js)"><rect width="32" height="10.67" fill="#000000"/><rect y="10.67" width="32" height="10.67" fill="#DD0000"/><rect y="21.33" width="32" height="10.67" fill="#FFCE00"/></g></svg>
        </span>
        <span class="location-item__text">
          <span class="location-item__country">Deutschland &amp; Österreich</span>
          <span class="location-item__language">Deutsch</span>
        </span>
      </button>

      <!-- 6. France -->
      <button type="button" class="location-item" data-location-item data-location-code="fr">
        <span class="location-item__flag">
          <svg viewBox="0 0 32 32" width="32" height="32"><clipPath id="fr-clip-js"><circle cx="16" cy="16" r="16"/></clipPath><g clip-path="url(#fr-clip-js)"><rect width="10.67" height="32" fill="#002395"/><rect x="10.67" width="10.67" height="32" fill="#FFFFFF"/><rect x="21.33" width="10.67" height="32" fill="#ED2939"/></g></svg>
        </span>
        <span class="location-item__text">
          <span class="location-item__country">France</span>
          <span class="location-item__language">Français</span>
        </span>
      </button>

      <!-- 7. Nederland -->
      <button type="button" class="location-item" data-location-item data-location-code="nl">
        <span class="location-item__flag">
          <svg viewBox="0 0 32 32" width="32" height="32"><clipPath id="nl-clip-js"><circle cx="16" cy="16" r="16"/></clipPath><g clip-path="url(#nl-clip-js)"><rect width="32" height="10.67" fill="#AE1C28"/><rect y="10.67" width="32" height="10.67" fill="#FFFFFF"/><rect y="21.33" width="32" height="10.67" fill="#21468B"/></g></svg>
        </span>
        <span class="location-item__text">
          <span class="location-item__country">Nederland</span>
          <span class="location-item__language">Nederlands</span>
        </span>
      </button>

      <!-- 8. Norway -->
      <button type="button" class="location-item" data-location-item data-location-code="no">
        <span class="location-item__flag">
          <svg viewBox="0 0 32 32" width="32" height="32"><circle cx="16" cy="16" r="16" fill="#BA0C2F"/><rect x="9" y="0" width="6" height="32" fill="#FFFFFF"/><rect x="0" y="13" width="32" height="6" fill="#FFFFFF"/><rect x="10.5" y="0" width="3" height="32" fill="#00205B"/><rect x="0" y="14.5" width="32" height="3" fill="#00205B"/></svg>
        </span>
        <span class="location-item__text">
          <span class="location-item__country">Norway</span>
          <span class="location-item__language">English</span>
        </span>
      </button>

      <!-- 9. Schweiz -->
      <button type="button" class="location-item" data-location-item data-location-code="ch">
        <span class="location-item__flag">
          <svg viewBox="0 0 32 32" width="32" height="32"><circle cx="16" cy="16" r="16" fill="#D52B1E"/><rect x="13.5" y="7" width="5" height="18" fill="#FFFFFF"/><rect x="7" y="13.5" width="18" height="5" fill="#FFFFFF"/></svg>
        </span>
        <span class="location-item__text">
          <span class="location-item__country">Schweiz</span>
          <span class="location-item__language">Deutsch</span>
        </span>
      </button>

      <!-- 10. Sverige -->
      <button type="button" class="location-item" data-location-item data-location-code="se">
        <span class="location-item__flag">
          <svg viewBox="0 0 32 32" width="32" height="32"><circle cx="16" cy="16" r="16" fill="#006AA7"/><rect x="10" y="0" width="4.5" height="32" fill="#FECC00"/><rect x="0" y="13.75" width="32" height="4.5" fill="#FECC00"/></svg>
        </span>
        <span class="location-item__text">
          <span class="location-item__country">Sverige</span>
          <span class="location-item__language">Svenska</span>
        </span>
      </button>

      <!-- 11. United Kingdom -->
      <button type="button" class="location-item" data-location-item data-location-code="gb">
        <span class="location-item__flag">
          <svg viewBox="0 0 32 32" width="32" height="32"><circle cx="16" cy="16" r="16" fill="#012169"/><path d="M0 0 L32 32 M32 0 L0 32" stroke="#FFFFFF" stroke-width="4.5"/><path d="M0 0 L32 32 M32 0 L0 32" stroke="#C8102E" stroke-width="2"/><path d="M16 0 V32 M0 16 H32" stroke="#FFFFFF" stroke-width="7"/><path d="M16 0 V32 M0 16 H32" stroke="#C8102E" stroke-width="4.2"/></svg>
        </span>
        <span class="location-item__text">
          <span class="location-item__country">United Kingdom</span>
          <span class="location-item__language">English</span>
        </span>
      </button>

      <!-- 12. United States -->
      <button type="button" class="location-item" data-location-item data-location-code="us">
        <span class="location-item__flag">
          <svg viewBox="0 0 32 32" width="32" height="32"><clipPath id="us-clip-js"><circle cx="16" cy="16" r="16"/></clipPath><g clip-path="url(#us-clip-js)"><rect width="32" height="32" fill="#B22234"/><line x1="0" y1="3.5" x2="32" y2="3.5" stroke="#FFF" stroke-width="2.5"/><line x1="0" y1="8.5" x2="32" y2="8.5" stroke="#FFF" stroke-width="2.5"/><line x1="0" y1="13.5" x2="32" y2="13.5" stroke="#FFF" stroke-width="2.5"/><line x1="0" y1="18.5" x2="32" y2="18.5" stroke="#FFF" stroke-width="2.5"/><line x1="0" y1="23.5" x2="32" y2="23.5" stroke="#FFF" stroke-width="2.5"/><line x1="0" y1="28.5" x2="32" y2="28.5" stroke="#FFF" stroke-width="2.5"/><rect width="15" height="15" fill="#3C3B6E"/><circle cx="4" cy="4" r="0.9" fill="#FFF"/><circle cx="8" cy="4" r="0.9" fill="#FFF"/><circle cx="12" cy="4" r="0.9" fill="#FFF"/><circle cx="6" cy="7.5" r="0.9" fill="#FFF"/><circle cx="10" cy="7.5" r="0.9" fill="#FFF"/><circle cx="4" cy="11" r="0.9" fill="#FFF"/><circle cx="8" cy="11" r="1" fill="#FFF"/><circle cx="12" cy="11" r="0.9" fill="#FFF"/></g></svg>
        </span>
        <span class="location-item__text">
          <span class="location-item__country">United States</span>
          <span class="location-item__language">English</span>
        </span>
      </button>

      <!-- 13. Rest of World -->
      <button type="button" class="location-item" data-location-item data-location-code="row">
        <span class="location-item__flag" style="background:#000;color:#FFF;">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1 4-10z"/></svg>
        </span>
        <span class="location-item__text">
          <span class="location-item__country">Rest of World</span>
          <span class="location-item__language">English</span>
        </span>
      </button>
    </div>
  </div>
`,
    ensureElements() {
      let modal = document.querySelector('[data-location-modal]');
      let backdrop = document.querySelector('[data-location-modal-backdrop]');
      if (!modal) {
        document.body.insertAdjacentHTML('beforeend', this.modalHtml);
        modal = document.querySelector('[data-location-modal]');
        backdrop = document.querySelector('[data-location-modal-backdrop]');
        this.bindModalEvents();
      }
      return { modal, backdrop };
    },

    open() {
      const { modal, backdrop } = this.ensureElements();
      if (!modal) return;
      if (typeof SidebarDrawer !== 'undefined' && SidebarDrawer.close) {
        SidebarDrawer.close();
      }
      modal.style.setProperty('display', 'block', 'important');
      modal.classList.add('is-active');
      if (backdrop) {
        backdrop.style.setProperty('display', 'block', 'important');
        backdrop.classList.add('is-active');
      }
      document.body.style.overflow = 'hidden';
    },

    close() {
      const modal = document.querySelector('[data-location-modal]');
      const backdrop = document.querySelector('[data-location-modal-backdrop]');
      if (modal) {
        modal.classList.remove('is-active');
        modal.style.setProperty('display', 'none', 'important');
      }
      if (backdrop) {
        backdrop.classList.remove('is-active');
        backdrop.style.setProperty('display', 'none', 'important');
      }
      document.body.style.overflow = '';
    },

    selectLocation(code, isUserClick = false) {
      if (!code) code = 'eu';
      const items = document.querySelectorAll('[data-location-item]');
      const item = document.querySelector(`[data-location-item][data-location-code="${code}"]`);

      if (items.length && item) {
        items.forEach((i) => i.classList.remove('is-selected', 'is-active'));
        item.classList.add('is-selected', 'is-active');

        const countryName = item.querySelector('.location-item__country')?.textContent.trim() || 'Europe';
        const countryLang = item.querySelector('.location-item__language')?.textContent.trim() || 'English';
        const flagSvg = item.querySelector('.location-item__flag svg');

        // Update footer and sidebar flags
        if (flagSvg) {
          document.querySelectorAll('[data-country-display-flag]').forEach((el) => {
            el.innerHTML = flagSvg.outerHTML;
          });
        }

        // Update footer code
        document.querySelectorAll('[data-country-display-code]').forEach((el) => {
          el.textContent = code.toLowerCase();
        });

        // Update sidebar location text
        document.querySelectorAll('[data-sidebar-location-text]').forEach((el) => {
          el.innerHTML = `${countryName} &nbsp;|&nbsp; ${countryLang}`;
        });
      }

      try {
        localStorage.setItem('oge_selected_location', code);
      } catch (err) { }

      // Trigger currency update if OGE_CURRENCY helper exists
      if (window.OGE_CURRENCY && typeof window.OGE_CURRENCY.setCurrency === 'function') {
        const currencyMap = {
          eu: 'EUR', gb: 'GBP', ca: 'CAD', au: 'AUD', us: 'USD',
          dk: 'DKK', de: 'EUR', fr: 'EUR', nl: 'EUR', no: 'NOK',
          ch: 'CHF', se: 'SEK', row: 'USD'
        };
        const curr = currencyMap[code] || 'EUR';
        window.OGE_CURRENCY.setCurrency(curr);
      }

      // Trigger storefront language translation across all website words
      const langMap = {
        fr: 'fr',
        de: 'de',
        ch: 'de',
        dk: 'da',
        nl: 'nl',
        se: 'sv',
        eu: 'en',
        gb: 'en',
        us: 'en',
        ca: 'en',
        au: 'en',
        no: 'en',
        row: 'en'
      };
      const targetLang = langMap[code.toLowerCase()] || 'en';
      if (window.OGE_TRANSLATION) {
        if (isUserClick) {
          window.OGE_TRANSLATION.setLanguage(targetLang);
        } else {
          window.OGE_TRANSLATION.applyLanguage(targetLang);
        }
      }
    },

    bindModalEvents() {
      const closeBtn = document.querySelector('[data-location-modal-close]');
      const backdrop = document.querySelector('[data-location-modal-backdrop]');
      const items = document.querySelectorAll('[data-location-item]');

      if (closeBtn) closeBtn.onclick = () => this.close();
      if (backdrop) backdrop.onclick = () => this.close();

      items.forEach((item) => {
        item.onclick = () => {
          const code = item.getAttribute('data-location-code') || 'eu';
          this.selectLocation(code, true);
          this.close();
        };
      });
    },

    init() {
      this.ensureElements();
      this.bindModalEvents();

      // Document-level delegated click for ALL location triggers across header, footer & sidebar
      document.addEventListener('click', (e) => {
        const trigger = e.target.closest('[data-country-trigger], [data-country-selector-trigger], .footer-region-trigger, .country-selector-btn, .sidebar-localization, [data-sidebar-location-trigger]');
        if (trigger) {
          e.preventDefault();
          e.stopPropagation();
          this.open();
        }
      });

      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') this.close();
      });

      // Restore saved location if any
      try {
        const saved = localStorage.getItem('oge_selected_location') || 'eu';
        this.selectLocation(saved, false);
      } catch (err) {
        this.selectLocation('eu', false);
      }
    }
  };

  /* ==========================================================================
     INIT ON DOM READY OR IMMEDIATE IF ALREADY PARSED
     ========================================================================== */
  function initModules() {
    const modules = [
      Backdrop,
      HeaderController,
      SidebarDrawer,
      SalesPopup,
      CartDrawer,
      SearchModal,
      SearchResultsPage,
      Wishlist,
      WishlistPage,
      OrdersPage,
      ProfilePage,
      AuthPages,
      CollectionPage,
      CategoryPage,
      ProductDetailPage,
      CartPageController,
      HorizontalScrollController,
      InteractiveElements,
      AccountDashboard,
      CountrySelector
    ];
    window.OGE_CART_DRAWER = CartDrawer;
    window.CartDrawer = CartDrawer;

    modules.forEach((mod) => {
      try {
        if (mod && typeof mod.init === 'function') {
          mod.init();
        }
      } catch (err) {
        console.warn('Init error in module:', err);
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initModules);
  } else {
    initModules();
  }

})();
