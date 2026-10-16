import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import type { Product } from '../data/products.ts';
import { formatINR } from '../utils/shop.ts';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlist: Product[];
  onRemoveFromWishlist: (product: Product) => void;
  onMoveToBag: (product: Product) => void;
  onExploreProducts: () => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlist,
  onRemoveFromWishlist,
  onMoveToBag,
  onExploreProducts,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
          />

          {/* Slide-over */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="relative w-full max-w-md bg-white text-neutral-900 h-full flex flex-col justify-between shadow-2xl z-10 border-l border-neutral-200"
          >
            {/* Header */}
            <div className="p-5 md:p-6 border-b border-neutral-200 flex items-center justify-between bg-[#faf9f6]">
              <div className="flex items-center gap-2">
                <Heart size={18} className="text-rose-600 fill-rose-600" />
                <span className="text-sm font-bold tracking-wider uppercase font-sans text-neutral-950">
                  Wishlist ({wishlist.length})
                </span>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close wishlist"
                className="p-1.5 text-neutral-500 hover:text-black transition-colors rounded-full hover:bg-neutral-200 cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Wishlist Items List */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {wishlist.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-400">
                    <Heart size={28} />
                  </div>
                  <div>
                    <h3 className="text-base font-bold uppercase tracking-tight text-neutral-900 font-sans">
                      Your wishlist is empty
                    </h3>
                    <p className="text-xs text-neutral-500 mt-1 max-w-xs leading-relaxed">
                      Save your favorite contemporary and Kashmiri apparel pieces here to shop or inquire anytime.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onExploreProducts();
                    }}
                    className="px-6 py-2.5 bg-neutral-950 text-white text-xs font-semibold uppercase tracking-wider rounded-xs hover:bg-neutral-800 transition-colors cursor-pointer"
                  >
                    Browse Collections
                  </button>
                </div>
              ) : (
                wishlist.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-3.5 pb-4 border-b border-neutral-100 last:border-b-0"
                  >
                    <div className="w-20 h-26 rounded-xs bg-neutral-100 overflow-hidden flex-shrink-0 border border-neutral-200">
                      <img
                        src={item.images[0]}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="text-xs font-bold text-neutral-900 leading-snug line-clamp-2">
                            {item.name}
                          </h4>
                          <button
                            type="button"
                            onClick={() => onRemoveFromWishlist(item)}
                            aria-label={`Remove ${item.name} from wishlist`}
                            className="p-1 text-neutral-400 hover:text-rose-600 transition-colors cursor-pointer flex-shrink-0"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>

                        <div className="text-[11px] text-neutral-500 font-mono mt-0.5">
                          {item.category}
                        </div>

                        <div className="mt-1 flex items-baseline gap-2">
                          <span className="text-xs font-bold text-neutral-950 font-mono">
                            {formatINR(item.price)}
                          </span>
                          {item.originalPrice > item.price && (
                            <span className="text-[10px] text-neutral-400 line-through font-mono">
                              {formatINR(item.originalPrice)}
                            </span>
                          )}
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          onMoveToBag(item);
                          onRemoveFromWishlist(item);
                        }}
                        className="mt-2 py-1.5 px-3 bg-neutral-950 hover:bg-black text-white text-[11px] font-semibold uppercase tracking-wider rounded-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer w-full"
                      >
                        <ShoppingBag size={13} />
                        <span>Move to Bag</span>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Wishlist Footer */}
            {wishlist.length > 0 && (
              <div className="p-4 border-t border-neutral-200 bg-[#faf9f6]">
                <button
                  type="button"
                  onClick={() => {
                    wishlist.forEach((item) => onMoveToBag(item));
                    onClose();
                  }}
                  className="w-full py-3 bg-neutral-950 hover:bg-black text-white text-xs font-bold uppercase tracking-wider rounded-xs flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <ShoppingBag size={14} />
                  <span>Move All to Bag</span>
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
