import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import type { CartItem } from '../utils/shop.ts';
import {
  calculateCartTotals,
  formatINR,
  FREE_SHIPPING_THRESHOLD,
  createWhatsAppOrderLink,
  validatePromoCode,
} from '../utils/shop.ts';
import {
  X,
  ShoppingBag,
  Trash2,
  ArrowRight,
  Truck,
  Tag,
  MessageCircle,
} from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (cartItemId: string, newQuantity: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onProceedToCheckout: () => void;
  onExploreProducts: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  onExploreProducts,
}) => {
  const [promoInput, setPromoInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [promoError, setPromoError] = useState<string | null>(null);

  const totals = calculateCartTotals(items, appliedPromo || undefined);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError(null);
    if (!promoInput.trim()) return;

    const res = validatePromoCode(promoInput, totals.subtotal);
    if (res.valid && res.promo) {
      setAppliedPromo(res.promo.code);
      setPromoInput('');
    } else {
      setPromoError(res.error || 'Invalid promo code');
    }
  };

  const handleRemovePromo = () => {
    setAppliedPromo(null);
    setPromoError(null);
  };

  const progressPercent = Math.min(
    100,
    Math.round((totals.subtotal / FREE_SHIPPING_THRESHOLD) * 100)
  );

  const whatsappLink = createWhatsAppOrderLink(items);

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

          {/* Slide-over panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="relative w-full max-w-md bg-white text-neutral-900 h-full flex flex-col justify-between shadow-2xl z-10 border-l border-neutral-200"
          >
            {/* Drawer Header */}
            <div className="p-5 md:p-6 border-b border-neutral-200 flex items-center justify-between bg-[#faf9f6]">
              <div className="flex items-center gap-2.5">
                <ShoppingBag size={18} className="text-neutral-950" />
                <span className="text-sm font-bold tracking-wider uppercase font-sans text-neutral-950">
                  Shopping Bag ({totals.itemCount})
                </span>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close shopping bag"
                className="p-1.5 text-neutral-500 hover:text-black transition-colors rounded-full hover:bg-neutral-200 cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Free Shipping Progress Bar */}
            <div className="px-5 py-3 bg-neutral-100 border-b border-neutral-200 text-xs">
              <div className="flex items-center justify-between mb-1.5 font-medium text-neutral-700">
                <span className="flex items-center gap-1.5">
                  <Truck size={14} className="text-neutral-900" />
                  {totals.isFreeShipping && totals.subtotal > 0 ? (
                    <strong className="text-emerald-700 font-semibold">
                      You unlocked FREE Express Delivery!
                    </strong>
                  ) : (
                    <span>
                      Add <strong>{formatINR(totals.freeShippingRemaining)}</strong> for Free Delivery
                    </span>
                  )}
                </span>
                <span className="font-mono text-[11px]">{progressPercent}%</span>
              </div>
              <div className="w-full h-1.5 bg-neutral-300 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-600 transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-400">
                    <ShoppingBag size={28} />
                  </div>
                  <div>
                    <h3 className="text-base font-bold uppercase tracking-tight text-neutral-900 font-sans">
                      Your bag is empty
                    </h3>
                    <p className="text-xs text-neutral-500 mt-1 max-w-xs leading-relaxed">
                      Discover our curated women’s fashion collection crafted with Kashmiri elegance and modern aesthetics.
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
                    Explore Collection
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-3.5 pb-4 border-b border-neutral-100 last:border-b-0"
                  >
                    {/* Item Image */}
                    <div className="w-20 h-26 rounded-xs bg-neutral-100 overflow-hidden flex-shrink-0 border border-neutral-200">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Item Details */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="text-xs font-bold text-neutral-900 leading-snug line-clamp-2">
                            {item.product.name}
                          </h4>
                          <button
                            type="button"
                            onClick={() => onRemoveItem(item.id)}
                            aria-label={`Remove ${item.product.name} from bag`}
                            className="p-1 text-neutral-400 hover:text-rose-600 transition-colors cursor-pointer flex-shrink-0"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>

                        <div className="flex items-center gap-2 text-[11px] text-neutral-500 mt-1 font-mono">
                          <span>Size: {item.size}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <span
                              className="w-2.5 h-2.5 rounded-full border border-neutral-300"
                              style={{ backgroundColor: item.color.hex }}
                            />
                            {item.color.name}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        {/* Quantity controls */}
                        <div className="inline-flex items-center border border-neutral-300 rounded-xs bg-white">
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                            className="px-2 py-0.5 text-xs text-neutral-600 hover:text-black cursor-pointer"
                          >
                            -
                          </button>
                          <span className="px-2 text-xs font-bold text-neutral-900 font-mono">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className="px-2 py-0.5 text-xs text-neutral-600 hover:text-black cursor-pointer"
                          >
                            +
                          </button>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <span className="text-xs font-bold text-neutral-950 font-mono">
                            {formatINR(item.product.price * item.quantity)}
                          </span>
                          {item.product.originalPrice > item.product.price && (
                            <span className="text-[10px] text-neutral-400 line-through block font-mono">
                              {formatINR(item.product.originalPrice * item.quantity)}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Cart Footer & Financials */}
            {items.length > 0 && (
              <div className="p-5 border-t border-neutral-200 bg-[#faf9f6] space-y-4">
                {/* Coupon Input */}
                {appliedPromo ? (
                  <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded flex items-center justify-between text-xs text-emerald-800">
                    <div className="flex items-center gap-2">
                      <Tag size={14} className="text-emerald-700" />
                      <span className="font-semibold">{appliedPromo}</span>
                      <span>(Applied)</span>
                    </div>
                    <button
                      type="button"
                      onClick={handleRemovePromo}
                      className="text-neutral-500 hover:text-black font-semibold uppercase text-[10px] cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyPromo} className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag
                        size={14}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
                      />
                      <input
                        type="text"
                        value={promoInput}
                        onChange={(e) => setPromoInput(e.target.value)}
                        placeholder="Promo Code (e.g. WEARZA10)"
                        className="w-full pl-9 pr-3 py-2 bg-white border border-neutral-300 rounded text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-neutral-900 uppercase font-mono"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-neutral-900 hover:bg-black text-white text-xs font-semibold uppercase tracking-wider rounded transition-colors cursor-pointer"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {promoError && (
                  <p className="text-[11px] text-rose-600 font-medium">{promoError}</p>
                )}

                {/* Subtotals breakdown */}
                <div className="space-y-1.5 text-xs text-neutral-600 border-t border-neutral-200 pt-3 font-mono">
                  <div className="flex justify-between">
                    <span>Subtotal (MRP)</span>
                    <span>{formatINR(totals.originalSubtotal)}</span>
                  </div>

                  {totals.productDiscountTotal > 0 && (
                    <div className="flex justify-between text-emerald-700 font-medium">
                      <span>Product Discount</span>
                      <span>-{formatINR(totals.productDiscountTotal)}</span>
                    </div>
                  )}

                  {totals.promoDiscount > 0 && (
                    <div className="flex justify-between text-emerald-700 font-medium">
                      <span>Promo Savings ({appliedPromo})</span>
                      <span>-{formatINR(totals.promoDiscount)}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>
                      {totals.isFreeShipping ? (
                        <span className="text-emerald-700 font-semibold">FREE</span>
                      ) : (
                        formatINR(totals.shipping)
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm font-bold text-neutral-950 pt-2 border-t border-neutral-300">
                    <span>Total Payable</span>
                    <span>{formatINR(totals.grandTotal)}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2 pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onProceedToCheckout();
                    }}
                    className="w-full py-3.5 px-4 bg-neutral-950 hover:bg-black text-white text-xs font-bold uppercase tracking-widest rounded-xs transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer active:scale-98"
                  >
                    <span>Proceed to Checkout</span>
                    <ArrowRight size={14} />
                  </button>

                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold uppercase tracking-wider rounded-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <MessageCircle size={15} />
                    <span>WhatsApp Boutique Order Desk</span>
                  </a>
                </div>

                <div className="text-[10px] text-center text-neutral-500">
                  🔒 Secure checkout · Kanelwan Market, Kashmir store fulfillment
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
