import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowRight, ShoppingBag, MapPin, Heart } from 'lucide-react';

interface HeaderNavProps {
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenSearch?: () => void;
  onNavigateSection?: (sectionId: string) => void;
  onNavigateAbout?: () => void;
  onNavigateShop?: () => void;
  onNavigateHome?: () => void;
  mode?: 'overlay' | 'solid-light' | 'solid-dark';
  showBrand?: boolean;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onNavigateSection,
  onNavigateAbout,
  onNavigateShop,
  onNavigateHome,
  mode = 'overlay',
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavClick = (section: string) => {
    setIsMenuOpen(false);
    if (section === 'about') {
      if (onNavigateAbout) onNavigateAbout();
    } else if (section === 'shop') {
      if (onNavigateShop) {
        onNavigateShop();
      } else if (onNavigateSection) {
        onNavigateSection('shop');
      }
    } else if (section === 'collections') {
      if (onNavigateSection) {
        onNavigateSection('gallery');
      } else {
        const el = document.getElementById('scroll-spacer');
        if (el) window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
      }
    } else if (section === 'home') {
      if (onNavigateHome) {
        onNavigateHome();
      } else if (onNavigateSection) {
        onNavigateSection('home');
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else if (section === 'wishlist') {
      onOpenWishlist();
    } else if (section === 'cart') {
      onOpenCart();
    }
  };

  const isSolidLight = mode === 'solid-light';

  return (
    <>
      {/* Header Bar */}
      {isSolidLight ? (
        <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-neutral-200 px-4 md:px-12 py-3.5 flex items-center justify-between">
          {/* Brand Logo */}
          <button
            type="button"
            onClick={() => {
              if (onNavigateHome) onNavigateHome();
              else handleNavClick('home');
            }}
            className="text-lg md:text-xl font-extrabold tracking-tighter uppercase font-sans text-neutral-950 hover:opacity-80 transition-opacity cursor-pointer"
          >
            WEARZA
          </button>

          {/* Right Navigation */}
          <nav
            aria-label="Main Navigation"
            className="flex items-center gap-3.5 md:gap-6 text-neutral-900"
          >
            {/* Editorial Runway / Home */}
            <button
              type="button"
              onClick={() => {
                if (onNavigateHome) onNavigateHome();
                else handleNavClick('home');
              }}
              className="hidden sm:inline-block text-xs md:text-sm font-semibold tracking-wider uppercase text-neutral-600 hover:text-black transition-colors cursor-pointer"
            >
              Runway
            </button>

            {/* SHOP Button */}
            <button
              type="button"
              onClick={() => {
                if (onNavigateShop) onNavigateShop();
                else if (onNavigateSection) onNavigateSection('shop');
              }}
              className="hidden sm:inline-block text-xs md:text-sm font-bold tracking-wider uppercase text-neutral-950 hover:opacity-75 transition-opacity cursor-pointer"
            >
              Shop
            </button>

            {/* ABOUT Button */}
            <button
              type="button"
              onClick={() => {
                if (onNavigateAbout) onNavigateAbout();
              }}
              className="hidden sm:inline-block text-xs md:text-sm font-semibold tracking-wider uppercase text-neutral-600 hover:text-black transition-colors cursor-pointer"
            >
              About
            </button>

            {/* WISHLIST Button */}
            <button
              type="button"
              aria-label={`Open wishlist (${wishlistCount} items)`}
              onClick={onOpenWishlist}
              className="flex items-center gap-1 text-xs md:text-sm font-semibold tracking-wider uppercase text-neutral-800 hover:text-black transition-opacity cursor-pointer p-1"
            >
              <Heart size={16} className={wishlistCount > 0 ? 'fill-rose-600 text-rose-600' : 'text-neutral-700'} />
              <span className="font-mono text-xs">[{wishlistCount}]</span>
            </button>

            {/* [ CART ] Button */}
            <button
              type="button"
              aria-label={`Open shopping cart (${cartCount} items)`}
              onClick={onOpenCart}
              className="flex items-center gap-1.5 text-xs md:text-sm font-bold tracking-wider uppercase bg-neutral-950 text-white px-3 py-1.5 rounded-full hover:bg-neutral-800 transition-all cursor-pointer shadow-xs"
            >
              <ShoppingBag size={14} />
              <span className="font-mono text-xs">BAG {cartCount > 0 ? `(${cartCount})` : ''}</span>
            </button>

            {/* Two-Line Hamburger Button */}
            <button
              type="button"
              aria-label="Open menu"
              onClick={() => setIsMenuOpen(true)}
              className="flex flex-col justify-center items-center w-6 h-6 hover:opacity-70 transition-opacity cursor-pointer p-1"
            >
              <span className="w-5 h-[2px] bg-neutral-900 mb-1 rounded-full"></span>
              <span className="w-5 h-[2px] bg-neutral-900 rounded-full"></span>
            </button>
          </nav>
        </header>
      ) : (
        /* Floating exclusion header for homepage */
        <motion.header
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
          className="fixed top-4 right-4 md:top-8 md:right-8 z-30 blend-exclusion select-none pointer-events-none"
        >
          <nav
            aria-label="Main Navigation"
            className="flex items-center justify-end gap-4 md:gap-6 text-white"
          >
            {/* SHOP Button */}
            <button
              type="button"
              onClick={() => {
                if (onNavigateShop) onNavigateShop();
                else if (onNavigateSection) onNavigateSection('shop');
              }}
              className="hidden sm:inline-block pointer-events-auto text-[13px] md:text-[15px] font-medium tracking-tight uppercase hover:opacity-70 transition-opacity cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-white"
            >
              SHOP
            </button>

            {/* ABOUT Button */}
            <button
              type="button"
              onClick={() => {
                if (onNavigateAbout) onNavigateAbout();
              }}
              className="hidden sm:inline-block pointer-events-auto text-[13px] md:text-[15px] font-medium tracking-tight uppercase hover:opacity-70 transition-opacity cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-white"
            >
              ABOUT
            </button>

            {/* WISHLIST Button */}
            <button
              type="button"
              aria-label={`Open wishlist (${wishlistCount} items)`}
              onClick={onOpenWishlist}
              className="pointer-events-auto flex items-center gap-1.5 text-[13px] md:text-[15px] font-medium tracking-tight uppercase hover:opacity-70 transition-opacity cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-white"
            >
              <Heart size={15} className={wishlistCount > 0 ? 'fill-white' : ''} />
              <span className="font-mono text-xs">[{wishlistCount}]</span>
            </button>

            {/* [ CART ] Button */}
            <button
              type="button"
              aria-label={`Open shopping cart (${cartCount} items)`}
              onClick={onOpenCart}
              className="pointer-events-auto flex items-center gap-1.5 text-[13px] md:text-[15px] font-medium tracking-tight uppercase hover:opacity-70 transition-opacity cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-white"
            >
              <ShoppingBag size={15} />
              <span>[ CART {cartCount > 0 ? `(${cartCount})` : ''} ]</span>
            </button>

            {/* Two-Line Hamburger Button */}
            <button
              type="button"
              aria-label="Open menu"
              onClick={() => setIsMenuOpen(true)}
              className="pointer-events-auto flex flex-col justify-center items-center w-6 h-6 md:w-[30px] md:h-[30px] hover:opacity-70 transition-opacity cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-white ml-1"
            >
              <span className="w-full h-[2.5px] bg-white mb-[5px] md:mb-[6px] rounded-full"></span>
              <span className="w-full h-[2.5px] bg-white rounded-full"></span>
            </button>
          </nav>
        </motion.header>
      )}

      {/* Hamburger Menu Drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <div className="fixed inset-0 z-50 flex justify-end">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="relative w-full max-w-md bg-neutral-950 text-white h-full p-8 md:p-12 flex flex-col justify-between shadow-2xl border-l border-neutral-800 z-10 overflow-y-auto"
            >
              <div>
                <div className="flex items-center justify-between mb-12">
                  <div className="text-xs uppercase tracking-widest text-neutral-400 font-mono">
                    WEARZA FASHION STORE
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsMenuOpen(false)}
                    aria-label="Close menu"
                    className="p-2 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                  >
                    <X size={22} />
                  </button>
                </div>

                <div className="space-y-6">
                  <button
                    type="button"
                    onClick={() => handleNavClick('home')}
                    className="block text-2xl md:text-3xl font-medium tracking-tight hover:text-neutral-300 transition-colors cursor-pointer text-left w-full font-sans"
                  >
                    HOME
                  </button>
                  <button
                    type="button"
                    onClick={() => handleNavClick('shop')}
                    className="block text-2xl md:text-3xl font-medium tracking-tight hover:text-neutral-300 transition-colors cursor-pointer text-left w-full font-sans flex items-center justify-between"
                  >
                    <span>SHOP CATALOG</span>
                    <span className="text-xs font-mono text-amber-500 uppercase">10 Products</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleNavClick('collections')}
                    className="block text-2xl md:text-3xl font-medium tracking-tight hover:text-neutral-300 transition-colors cursor-pointer text-left w-full font-sans"
                  >
                    EDITORIAL RUNWAY
                  </button>
                  <button
                    type="button"
                    onClick={() => handleNavClick('about')}
                    className="block text-2xl md:text-3xl font-medium tracking-tight hover:text-neutral-300 transition-colors cursor-pointer text-left w-full font-sans"
                  >
                    ABOUT THE STORE
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsMenuOpen(false);
                      onOpenWishlist();
                    }}
                    className="block text-xl font-medium tracking-tight hover:text-neutral-300 transition-colors cursor-pointer text-left w-full text-neutral-400 font-sans"
                  >
                    WISHLIST ({wishlistCount})
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsMenuOpen(false);
                      onOpenCart();
                    }}
                    className="block text-xl font-medium tracking-tight hover:text-neutral-300 transition-colors cursor-pointer text-left w-full text-neutral-400 font-sans"
                  >
                    SHOPPING BAG ({cartCount})
                  </button>
                </div>
              </div>

              <div className="border-t border-neutral-800 pt-8 mt-12 space-y-4 text-xs text-neutral-400">
                <div className="flex items-center gap-2">
                  <MapPin size={14} className="text-neutral-300" />
                  <span>Kanelwan Market, Kashmir, Jammu and Kashmir, India</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShoppingBag size={14} className="text-neutral-300" />
                  <span>Women's & Girls' Curated Fashion</span>
                </div>
                <div className="text-[11px] text-neutral-500 pt-4 font-mono">
                  WEARZA FASHION STORE © 2026. ALL RIGHTS RESERVED.
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
