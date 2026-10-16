/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { CustomCursor } from './components/CustomCursor.tsx';
import { FixedLogo } from './components/FixedLogo.tsx';
import { HeroCaption } from './components/HeroCaption.tsx';
import { HeaderNav } from './components/HeaderNav.tsx';
import { HeroVideo } from './components/HeroVideo.tsx';
import { BlackGalleryPanel } from './components/BlackGalleryPanel.tsx';
import { StoreInfo } from './components/StoreInfo.tsx';
import { OutroOverlay } from './components/OutroOverlay.tsx';
import { ViewButton } from './components/ViewButton.tsx';
import { Footer } from './components/Footer.tsx';
import { AboutPage } from './components/AboutPage.tsx';
import { ShopCatalog } from './components/ShopCatalog.tsx';
import { ProductDetailPage } from './components/ProductDetailPage.tsx';
import { ProductQuickViewModal } from './components/ProductQuickViewModal.tsx';
import { CartDrawer } from './components/CartDrawer.tsx';
import { WishlistDrawer } from './components/WishlistDrawer.tsx';
import { CheckoutModal } from './components/CheckoutModal.tsx';
import { PRODUCTS, type Product } from './data/products.ts';
import type { CartItem } from './utils/shop.ts';
import { calculateOutroProgress, calculateSpacerHeight } from './utils/scrollLayout.ts';

const CART_STORAGE_KEY = 'wearza_cart_items_v2';
const WISHLIST_STORAGE_KEY = 'wearza_wishlist_items_v2';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return window.location.pathname;
    }
    return '/';
  });

  const [selectedProductId, setSelectedProductId] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      const match = window.location.pathname.match(/\/product\/([a-zA-Z0-9-_]+)/);
      if (match) return match[1];
    }
    return null;
  });

  // Cart & Wishlist with localStorage persistence
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(CART_STORAGE_KEY);
        if (stored) return JSON.parse(stored);
      } catch (e) {
        console.error('Failed to parse stored cart', e);
      }
    }
    return [
      {
        id: 'wz-1133-M-Olive Moss',
        product: PRODUCTS[0],
        size: 'M',
        color: PRODUCTS[0].colors[0],
        quantity: 1,
      },
    ];
  });

  const [wishlist, setWishlist] = useState<Product[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(WISHLIST_STORAGE_KEY);
        if (stored) return JSON.parse(stored);
      } catch (e) {
        console.error('Failed to parse stored wishlist', e);
      }
    }
    return [PRODUCTS[2]];
  });

  // Drawers and Modals
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Viewport & Scroll
  const [scrollY, setScrollY] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(
    typeof window !== 'undefined' ? window.innerHeight : 900
  );
  const [viewportWidth, setViewportWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1440
  );
  const [maxScroll, setMaxScroll] = useState(1200);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [cart]);

  // Sync wishlist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
    } catch (e) {
      console.error('Failed to save wishlist to localStorage', e);
    }
  }, [wishlist]);

  // Sync with browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      setCurrentPath(path);
      const match = path.match(/\/product\/([a-zA-Z0-9-_]+)/);
      if (match) {
        setSelectedProductId(match[1]);
      } else {
        setSelectedProductId(null);
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (path: string) => {
    if (typeof window !== 'undefined') {
      window.history.pushState(null, '', path);
      setCurrentPath(path);
      const match = path.match(/\/product\/([a-zA-Z0-9-_]+)/);
      if (match) {
        setSelectedProductId(match[1]);
      } else {
        setSelectedProductId(null);
      }
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  };

  // Window resize
  const handleResize = useCallback(() => {
    setViewportHeight(window.innerHeight);
    setViewportWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  // Track scroll position
  useEffect(() => {
    const onScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const handleMaxScrollCalculated = useCallback((val: number) => {
    setMaxScroll((prev) => (Math.abs(prev - val) > 10 ? val : prev));
  }, []);

  // Outro & spacer layout calculations
  const outroProgress = calculateOutroProgress(scrollY, viewportHeight, maxScroll);
  const spacerHeight = calculateSpacerHeight(viewportHeight, maxScroll);

  // Cart operations
  const handleAddToCart = (
    product: Product,
    size: string,
    color: { name: string; hex: string },
    quantity = 1
  ) => {
    const lineId = `${product.id}-${size}-${color.name}`;
    setCart((prev) => {
      const existing = prev.find((item) => item.id === lineId);
      if (existing) {
        return prev.map((item) =>
          item.id === lineId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          id: lineId,
          product,
          size,
          color,
          quantity,
        },
      ];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (cartItemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemoveFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.id === cartItemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  // Wishlist operations
  const handleToggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        return prev.filter((p) => p.id !== product.id);
      }
      return [...prev, product];
    });
  };

  const handleRemoveFromWishlist = (product: Product) => {
    setWishlist((prev) => prev.filter((p) => p.id !== product.id));
  };

  const handleMoveToBag = (product: Product) => {
    handleAddToCart(product, product.sizes[0] || 'M', product.colors[0], 1);
  };

  // Direct checkout
  const handleBuyNow = (
    product: Product,
    size: string,
    color: { name: string; hex: string },
    quantity = 1
  ) => {
    handleAddToCart(product, size, color, quantity);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleViewClick = () => {
    navigateTo('/shop');
  };

  const handleNavigateSection = (sectionId: string) => {
    if (sectionId === 'shop') {
      navigateTo('/shop');
    } else if (sectionId === 'gallery') {
      if (currentPath !== '/') {
        navigateTo('/');
        setTimeout(() => {
          window.scrollTo({ top: viewportHeight + 50, behavior: 'smooth' });
        }, 100);
      } else {
        window.scrollTo({ top: viewportHeight + 50, behavior: 'smooth' });
      }
    } else if (sectionId === 'home') {
      if (currentPath !== '/') {
        navigateTo('/');
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const currentProduct = selectedProductId
    ? PRODUCTS.find((p) => p.id === selectedProductId) || null
    : null;

  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Common Header Nav
  const renderHeaderNav = (mode: 'overlay' | 'solid-light' = 'overlay') => (
    <HeaderNav
      mode={mode}
      cartCount={cartItemCount}
      wishlistCount={wishlist.length}
      onOpenCart={() => setIsCartOpen(true)}
      onOpenWishlist={() => setIsWishlistOpen(true)}
      onNavigateSection={handleNavigateSection}
      onNavigateAbout={() => navigateTo('/about')}
      onNavigateShop={() => navigateTo('/shop')}
      onNavigateHome={() => navigateTo('/')}
    />
  );

  // Universal Modals & Drawers
  const renderUniversalDrawers = () => (
    <>
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onProceedToCheckout={() => setIsCheckoutOpen(true)}
        onExploreProducts={() => {
          setIsCartOpen(false);
          navigateTo('/shop');
        }}
      />

      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlist={wishlist}
        onRemoveFromWishlist={handleRemoveFromWishlist}
        onMoveToBag={handleMoveToBag}
        onExploreProducts={() => {
          setIsWishlistOpen(false);
          navigateTo('/shop');
        }}
      />

      <ProductQuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onSelectProduct={(p) => {
          setQuickViewProduct(null);
          navigateTo(`/product/${p.id}`);
        }}
        onAddToCart={(p, size, color, qty) => handleAddToCart(p, size, color, qty)}
        isWishlisted={quickViewProduct ? wishlist.some((w) => w.id === quickViewProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cart}
        onOrderComplete={(orderId) => {
          setCart([]);
        }}
      />
    </>
  );

  // ROUTE 1: ABOUT US PAGE (/about)
  if (currentPath === '/about') {
    return (
      <div className="relative min-h-screen bg-neutral-950">
        <CustomCursor />
        <AboutPage
          onNavigateHome={() => navigateTo('/')}
          onNavigateCollections={() => navigateTo('/shop')}
        />
        {renderUniversalDrawers()}
      </div>
    );
  }

  // ROUTE 2: PRODUCT DETAIL VIEW (/product/:id)
  if (currentProduct) {
    return (
      <div className="relative min-h-screen bg-[#faf9f6]">
        <CustomCursor />
        {renderHeaderNav('solid-light')}
        <ProductDetailPage
          product={currentProduct}
          onBack={() => {
            if (window.history.length > 1) {
              window.history.back();
            } else {
              navigateTo('/shop');
            }
          }}
          onNavigateHome={() => navigateTo('/')}
          onNavigateShop={() => navigateTo('/shop')}
          onSelectProduct={(p) => navigateTo(`/product/${p.id}`)}
          onAddToCart={(p, size, color, qty) => handleAddToCart(p, size, color, qty)}
          onBuyNow={(p, size, color, qty) => handleBuyNow(p, size, color, qty)}
          isWishlisted={wishlist.some((w) => w.id === currentProduct.id)}
          onToggleWishlist={handleToggleWishlist}
        />
        {renderUniversalDrawers()}
      </div>
    );
  }

  // ROUTE 3: FULL SHOP CATALOG VIEW (/shop or /collections)
  if (currentPath === '/shop' || currentPath === '/collections') {
    return (
      <div className="relative min-h-screen bg-[#faf9f6]">
        <CustomCursor />
        {/* Sticky Header with Brand, Nav, Cart & Wishlist */}
        {renderHeaderNav('solid-light')}

        {/* Catalog */}
        <ShopCatalog
          onQuickView={(p) => setQuickViewProduct(p)}
          onSelectProduct={(p) => navigateTo(`/product/${p.id}`)}
          onAddToCart={handleAddToCart}
          wishlist={wishlist}
          onToggleWishlist={handleToggleWishlist}
          onNavigateAbout={() => navigateTo('/about')}
        />

        {/* Clean Static Footer */}
        <footer className="bg-neutral-950 text-white py-12 px-6 md:px-12 border-t border-neutral-800 text-xs">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <span className="font-bold tracking-tight uppercase text-sm block">
                WEARZA FASHION STORE
              </span>
              <p className="text-neutral-400 text-[11px] mt-1">
                Kanelwan Market, Kashmir, Jammu and Kashmir, India · Direct Boutique: +91 9596091671
              </p>
            </div>
            <div className="flex gap-6 text-[11px] uppercase tracking-wider text-neutral-400">
              <button
                type="button"
                onClick={() => navigateTo('/')}
                className="hover:text-white cursor-pointer"
              >
                Editorial Runway
              </button>
              <button
                type="button"
                onClick={() => navigateTo('/about')}
                className="hover:text-white cursor-pointer"
              >
                About Store
              </button>
              <button
                type="button"
                onClick={() => setIsCartOpen(true)}
                className="hover:text-white cursor-pointer"
              >
                Bag ({cartItemCount})
              </button>
            </div>
          </div>
        </footer>

        {renderUniversalDrawers()}
      </div>
    );
  }

  // ROUTE 4: HOMEPAGE (Editorial Runway + Video + Archive + Shop Section)
  return (
    <div
      id="scroll-spacer"
      className="relative bg-white select-none overflow-x-hidden min-h-screen"
      style={{
        height: `${spacerHeight}px`,
      }}
    >
      {/* Desktop Custom Cursor */}
      <CustomCursor />

      {/* Hero Dual Video Background */}
      <HeroVideo scrollY={scrollY} viewportHeight={viewportHeight} />

      {/* Fixed Overlay: Upper-Left Logo */}
      <FixedLogo />

      {/* Fixed Overlay: Hero Caption */}
      <HeroCaption scrollY={scrollY} viewportHeight={viewportHeight} />

      {/* Fixed Overlay: Header Navigation */}
      {renderHeaderNav('overlay')}

      {/* Fixed Black Gallery Panel with Scattered Image Grid */}
      <BlackGalleryPanel
        scrollY={scrollY}
        viewportHeight={viewportHeight}
        viewportWidth={viewportWidth}
        onMaxScrollCalculated={handleMaxScrollCalculated}
      />

      {/* Fixed Overlay: Store Information Block with Symbol Flipper */}
      <StoreInfo scrollY={scrollY} outroProgress={outroProgress} />

      {/* White Outro Overlay */}
      <OutroOverlay outroProgress={outroProgress} />

      {/* Large Pill-shaped View CTA Button (Opens Full Shop Catalog) */}
      <ViewButton outroProgress={outroProgress} onViewClick={handleViewClick} />

      {/* Fixed Footer */}
      <Footer outroProgress={outroProgress} />

      {/* Universal Drawers & Modals */}
      {renderUniversalDrawers()}
    </div>
  );
}
