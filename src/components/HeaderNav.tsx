import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowRight, ShoppingBag, MapPin, Clock, Phone, Mail } from 'lucide-react';

interface HeaderNavProps {
  onNavigateSection?: (sectionId: string) => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({ onNavigateSection }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [enquirySent, setEnquirySent] = useState(false);

  const handleNavClick = (section: string) => {
    setIsMenuOpen(false);
    if (section === 'about') {
      setIsAboutOpen(true);
    } else if (section === 'collections') {
      if (onNavigateSection) {
        onNavigateSection('gallery');
      } else {
        const el = document.getElementById('scroll-spacer');
        if (el) window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
      }
    } else if (section === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (section === 'contact') {
      setIsCartOpen(true);
    }
  };

  return (
    <>
      {/* Fixed Header Bar */}
      <motion.header
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
        className="fixed top-4 right-4 md:top-8 md:right-8 z-30 blend-exclusion select-none pointer-events-none"
      >
        <nav
          aria-label="Main Navigation"
          className="flex items-center justify-end gap-5 md:gap-8 text-white lg:w-[330px] lg:h-[30px]"
        >
          {/* ABOUT Button */}
          <button
            type="button"
            onClick={() => setIsAboutOpen(true)}
            className="hidden sm:inline-block pointer-events-auto text-[13px] md:text-[15px] font-medium tracking-tight uppercase hover:opacity-70 transition-opacity cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-white"
          >
            ABOUT
          </button>

          {/* Two-Line Hamburger Button */}
          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setIsMenuOpen(true)}
            className="pointer-events-auto flex flex-col justify-center items-center w-6 h-6 md:w-[30px] md:h-[30px] hover:opacity-70 transition-opacity cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-white"
          >
            <span className="w-full h-[2.5px] bg-white mb-[5px] md:mb-[6px] rounded-full"></span>
            <span className="w-full h-[2.5px] bg-white rounded-full"></span>
          </button>

          {/* [ CART ] Button */}
          <button
            type="button"
            aria-label="Open cart and order inquiries"
            onClick={() => setIsCartOpen(true)}
            className="pointer-events-auto text-[13px] md:text-[15px] font-medium tracking-tight uppercase hover:opacity-70 transition-opacity cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-white"
          >
            [ CART ]
          </button>
        </nav>
      </motion.header>

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
                  <div className="text-xs uppercase tracking-widest text-neutral-400">
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
                    className="block text-2xl md:text-3xl font-medium tracking-tight hover:text-neutral-300 transition-colors cursor-pointer text-left w-full"
                  >
                    HOME
                  </button>
                  <button
                    type="button"
                    onClick={() => handleNavClick('collections')}
                    className="block text-2xl md:text-3xl font-medium tracking-tight hover:text-neutral-300 transition-colors cursor-pointer text-left w-full"
                  >
                    COLLECTIONS
                  </button>
                  <button
                    type="button"
                    onClick={() => handleNavClick('about')}
                    className="block text-2xl md:text-3xl font-medium tracking-tight hover:text-neutral-300 transition-colors cursor-pointer text-left w-full"
                  >
                    ABOUT THE STORE
                  </button>
                  <button
                    type="button"
                    onClick={() => handleNavClick('contact')}
                    className="block text-2xl md:text-3xl font-medium tracking-tight hover:text-neutral-300 transition-colors cursor-pointer text-left w-full"
                  >
                    INQUIRIES & CONTACT
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
                  <span>Curated Women's & Girls' Fashion</span>
                </div>
                <div className="text-[11px] text-neutral-500 pt-4">
                  WEARZA FASHION STORE © 2026. ALL RIGHTS RESERVED.
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Cart & Inquiries Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <div className="fixed inset-0 z-50 flex justify-end">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="relative w-full max-w-md bg-neutral-950 text-white h-full p-8 md:p-10 flex flex-col justify-between shadow-2xl border-l border-neutral-800 z-10 overflow-y-auto"
            >
              <div>
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-2">
                    <ShoppingBag size={18} className="text-white" />
                    <span className="text-sm font-semibold tracking-wider uppercase">
                      STORE INQUIRIES & ORDERS
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setIsCartOpen(false);
                      setEnquirySent(false);
                    }}
                    aria-label="Close cart"
                    className="p-2 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="p-4 bg-neutral-900 border border-neutral-800 rounded-lg text-xs leading-relaxed text-neutral-300 mb-6">
                  <p className="font-medium text-white mb-1">Wearza Direct Fashion Desk</p>
                  Explore our collection of women's clothing, ethnic wear, and festive apparel. Submit your desired styles, sizes, or inquiries below and our team at Kanelwan Market will assist you with availability.
                </div>

                {enquirySent ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-6 bg-neutral-900 rounded-lg border border-neutral-700 text-center space-y-3"
                  >
                    <div className="w-10 h-10 rounded-full bg-white text-black font-bold flex items-center justify-center mx-auto">
                      ✓
                    </div>
                    <h4 className="text-sm font-semibold uppercase">Inquiry Received</h4>
                    <p className="text-xs text-neutral-400">
                      Thank you for contacting Wearza Fashion Store. A team member will respond to your request shortly.
                    </p>
                    <button
                      type="button"
                      onClick={() => setEnquirySent(false)}
                      className="mt-4 px-4 py-2 text-xs font-semibold uppercase bg-neutral-800 hover:bg-neutral-700 rounded transition-colors cursor-pointer"
                    >
                      Send Another Note
                    </button>
                  </motion.div>
                ) : (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setEnquirySent(true);
                    }}
                    className="space-y-4"
                  >
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-neutral-400 mb-1">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Ayesha"
                        className="w-full bg-neutral-900 border border-neutral-700 rounded px-3 py-2 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-neutral-400 mb-1">
                        Email or Contact
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="your contact detail..."
                        className="w-full bg-neutral-900 border border-neutral-700 rounded px-3 py-2 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-neutral-400 mb-1">
                        Items, Sizes or Inquiries
                      </label>
                      <textarea
                        rows={3}
                        required
                        placeholder="Specify styles, sizes, occasion wear, or product availability..."
                        className="w-full bg-neutral-900 border border-neutral-700 rounded px-3 py-2 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-white resize-none"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-3 bg-white text-black font-semibold text-xs uppercase tracking-wider rounded hover:bg-neutral-200 transition-colors cursor-pointer flex items-center justify-center gap-2"
                    >
                      <span>Submit Inquiry</span>
                      <ArrowRight size={14} />
                    </button>
                  </form>
                )}
              </div>

              <div className="border-t border-neutral-800 pt-6 text-[11px] text-neutral-500">
                Wearza Fashion Store processes direct boutique inquiries for our Kanelwan Market store collection.
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* About Modal */}
      <AnimatePresence>
        {isAboutOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAboutOpen(false)}
              className="fixed inset-0 bg-black/75 backdrop-blur-xs"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative w-full max-w-xl bg-neutral-950 text-white rounded-xl border border-neutral-800 p-8 md:p-10 shadow-2xl z-10 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between pb-6 border-b border-neutral-800">
                <div>
                  <h3 className="text-xl font-bold tracking-tight uppercase">About Wearza Fashion Store</h3>
                  <p className="text-xs text-neutral-400 mt-1">Kanelwan Market, Kashmir</p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsAboutOpen(false)}
                  aria-label="Close about dialog"
                  className="p-2 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="py-6 space-y-4 text-sm leading-relaxed text-neutral-300">
                <p>
                  <strong className="text-white">Wearza Fashion Store</strong> brings you a thoughtfully selected range of women's fashion, combining style, comfort, and affordability. Visit us at Kanelwan Market, Kashmir, to explore our collection.
                </p>
                <p>
                  Dedicated to women and girls, our boutique offers an inspired variety of everyday outfits, festive ensembles, and timeless seasonal silhouettes in Indian Rupees (₹).
                </p>
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-neutral-900 text-xs text-neutral-400">
                  <div>
                    <span className="block text-white font-medium mb-1">LOCATION</span>
                    Kanelwan Market, Kashmir, Jammu and Kashmir, India.
                  </div>
                  <div>
                    <span className="block text-white font-medium mb-1">FOCUS</span>
                    Women's & girls' fashion for every occasion.
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-800 flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsAboutOpen(false)}
                  className="px-6 py-2.5 bg-white text-black text-xs font-semibold uppercase tracking-wider rounded hover:bg-neutral-200 transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
