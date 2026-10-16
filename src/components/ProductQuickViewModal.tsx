import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import type { Product } from '../data/products.ts';
import { formatINR, calculateSavings } from '../utils/shop.ts';
import { X, Heart, ShoppingBag, Check, ArrowRight, MapPin } from 'lucide-react';

interface ProductQuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, size: string, color: { name: string; hex: string }, quantity: number) => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
}

export const ProductQuickViewModal: React.FC<ProductQuickViewModalProps> = ({
  product,
  onClose,
  onSelectProduct,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
}) => {
  if (!product) return null;

  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || 'M');
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  const savings = calculateSavings(product.originalPrice, product.price);

  const handleAdd = () => {
    onAddToCart(product, selectedSize, selectedColor, quantity);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      onClose();
    }, 1200);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/75 backdrop-blur-xs"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
          className="relative w-full max-w-3xl bg-white text-neutral-900 rounded-sm shadow-2xl overflow-hidden z-10 max-h-[92vh] flex flex-col md:flex-row border border-neutral-200"
        >
          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/80 backdrop-blur-xs hover:bg-neutral-100 text-neutral-600 hover:text-black transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>

          {/* Left: Product Images */}
          <div className="w-full md:w-1/2 bg-neutral-100 flex flex-col justify-between p-4 md:p-6">
            <div className="relative aspect-[3/4] w-full rounded-sm overflow-hidden bg-neutral-200">
              <img
                src={selectedImage}
                alt={product.name}
                className="w-full h-full object-cover object-center transition-all duration-300"
              />
              {product.badge && (
                <span className="absolute top-3 left-3 px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider font-semibold bg-neutral-950 text-white rounded-xs">
                  {product.badge}
                </span>
              )}
            </div>

            {/* Thumbnail selector */}
            {product.images.length > 1 && (
              <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setSelectedImage(img)}
                    className={`relative w-14 h-16 rounded-xs overflow-hidden border-2 transition-all cursor-pointer flex-shrink-0 ${
                      selectedImage === img ? 'border-neutral-900 ring-1 ring-black' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`${product.name} angle ${i + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Product Details & Controls */}
          <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between overflow-y-auto">
            <div>
              {/* Category & Wishlist */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-mono tracking-wider uppercase text-neutral-500 font-medium">
                  {product.category} · {product.subcategory}
                </span>
                <button
                  type="button"
                  onClick={() => onToggleWishlist(product)}
                  aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                  className="p-1.5 text-neutral-400 hover:text-rose-600 transition-colors cursor-pointer"
                >
                  <Heart size={18} className={isWishlisted ? 'fill-rose-600 text-rose-600' : ''} />
                </button>
              </div>

              {/* Title */}
              <h2 className="text-xl font-bold tracking-tight text-neutral-900 leading-snug font-sans">
                {product.name}
              </h2>

              {/* Price & Savings */}
              <div className="mt-3 flex items-baseline gap-3">
                <span className="text-2xl font-bold text-neutral-950 font-sans">
                  {formatINR(product.price)}
                </span>
                {product.originalPrice > product.price && (
                  <span className="text-sm text-neutral-400 line-through">
                    {formatINR(product.originalPrice)}
                  </span>
                )}
                {product.discountPercent > 0 && (
                  <span className="px-2 py-0.5 text-xs font-semibold bg-rose-50 text-rose-600 border border-rose-200 rounded">
                    {product.discountPercent}% OFF
                  </span>
                )}
              </div>
              {savings > 0 && (
                <p className="text-xs text-emerald-700 font-medium mt-1">
                  You save {formatINR(savings)} on this piece!
                </p>
              )}

              {/* Short description */}
              <p className="text-xs text-neutral-600 mt-3 leading-relaxed">
                {product.shortDescription}
              </p>

              {/* Color Selection */}
              <div className="mt-5">
                <label className="block text-xs font-semibold text-neutral-800 uppercase tracking-wider mb-2">
                  Color: <span className="text-neutral-500 font-normal">{selectedColor.name}</span>
                </label>
                <div className="flex items-center gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      type="button"
                      onClick={() => setSelectedColor(color)}
                      aria-label={`Select color ${color.name}`}
                      className={`w-7 h-7 rounded-full border-2 transition-all cursor-pointer flex items-center justify-center ${
                        selectedColor.name === color.name ? 'border-black ring-2 ring-neutral-300 scale-110' : 'border-neutral-300'
                      }`}
                      style={{ backgroundColor: color.hex }}
                    />
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div className="mt-5">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-semibold text-neutral-800 uppercase tracking-wider">
                    Select Size
                  </label>
                  <span className="text-[11px] text-neutral-500">True to size</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSelectedSize(s)}
                      className={`px-3.5 py-1.5 text-xs font-semibold rounded-xs border transition-all cursor-pointer ${
                        selectedSize === s
                          ? 'bg-neutral-950 text-white border-neutral-950 shadow-xs'
                          : 'bg-white text-neutral-800 border-neutral-300 hover:border-black'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="mt-5 flex items-center gap-4">
                <span className="text-xs font-semibold text-neutral-800 uppercase tracking-wider">
                  Quantity
                </span>
                <div className="inline-flex items-center border border-neutral-300 rounded-xs bg-white">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    disabled={quantity <= 1}
                    className="px-3 py-1 text-sm text-neutral-600 hover:text-black disabled:opacity-30 cursor-pointer"
                  >
                    -
                  </button>
                  <span className="px-3 py-1 text-xs font-bold text-neutral-900 min-w-8 text-center font-mono">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.min(product.stockCount, q + 1))}
                    disabled={quantity >= product.stockCount}
                    className="px-3 py-1 text-sm text-neutral-600 hover:text-black disabled:opacity-30 cursor-pointer"
                  >
                    +
                  </button>
                </div>
                <span className="text-[11px] text-neutral-500 font-mono">
                  {product.stockCount} in stock
                </span>
              </div>

              {/* Store Location Notice */}
              <div className="mt-5 p-2.5 bg-neutral-50 border border-neutral-200 rounded text-[11px] text-neutral-600 flex items-center gap-2">
                <MapPin size={14} className="text-neutral-900 flex-shrink-0" />
                <span>Available for immediate pickup or delivery from Kanelwan Market, Kashmir.</span>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="mt-6 pt-4 border-t border-neutral-200 flex flex-col gap-2">
              <button
                type="button"
                onClick={handleAdd}
                className={`w-full py-3 px-6 rounded-xs font-semibold text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 ${
                  isAdded
                    ? 'bg-emerald-600 text-white'
                    : 'bg-neutral-950 hover:bg-neutral-800 text-white shadow-md active:scale-98'
                }`}
              >
                {isAdded ? (
                  <>
                    <Check size={16} />
                    <span>Added to Bag!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag size={16} />
                    <span>Add to Bag · {formatINR(product.price * quantity)}</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => {
                  onClose();
                  onSelectProduct(product);
                }}
                className="w-full py-2.5 text-xs font-semibold text-neutral-600 hover:text-black uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>View Full Product Details & Fabric Care</span>
                <ArrowRight size={13} />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
