import React, { useState } from 'react';
import type { Product } from '../data/products.ts';
import { formatINR, calculateSavings } from '../utils/shop.ts';
import { Heart, Eye, ShoppingBag, Check } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, size: string, color: { name: string; hex: string }) => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onQuickView,
  onSelectProduct,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'M');
  const [showSizePicker, setShowSizePicker] = useState(false);
  const [addedNotice, setAddedNotice] = useState(false);

  const savings = calculateSavings(product.originalPrice, product.price);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (product.sizes.length > 1 && !showSizePicker) {
      setShowSizePicker(true);
      return;
    }

    onAddToCart(product, selectedSize, product.colors[0]);
    setShowSizePicker(false);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 1800);
  };

  const handleSizeClick = (e: React.MouseEvent, size: string) => {
    e.stopPropagation();
    setSelectedSize(size);
    onAddToCart(product, size, product.colors[0]);
    setShowSizePicker(false);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 1800);
  };

  return (
    <div
      className="group relative flex flex-col bg-white rounded-sm border border-neutral-200/80 transition-all duration-300 hover:shadow-xl hover:border-neutral-300 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setShowSizePicker(false);
      }}
    >
      {/* Product Image Container */}
      <div
        onClick={() => onSelectProduct(product)}
        className="relative w-full aspect-[3/4] bg-neutral-100 overflow-hidden cursor-pointer"
      >
        <img
          src={isHovered && product.images[1] ? product.images[1] : product.images[0]}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover object-center transition-all duration-700 ease-out group-hover:scale-105"
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10 pointer-events-none">
          {product.badge && (
            <span
              className={`px-2.5 py-1 text-[10px] font-mono tracking-wider uppercase font-semibold rounded-xs shadow-xs ${
                product.badge === 'Bestseller'
                  ? 'bg-amber-500 text-black'
                  : product.badge === 'New Arrival'
                  ? 'bg-neutral-900 text-white'
                  : product.badge === 'Exclusive'
                  ? 'bg-purple-900 text-white'
                  : 'bg-neutral-950 text-white'
              }`}
            >
              {product.badge}
            </span>
          )}
          {product.discountPercent > 0 && (
            <span className="px-2 py-0.5 text-[10px] font-mono tracking-wider font-bold bg-rose-600 text-white rounded-xs">
              {product.discountPercent}% OFF
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          aria-label={isWishlisted ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
          className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-200 z-10 cursor-pointer shadow-md ${
            isWishlisted
              ? 'bg-rose-50 text-rose-600 border border-rose-200'
              : 'bg-white/90 backdrop-blur-xs text-neutral-600 hover:text-black hover:bg-white'
          }`}
        >
          <Heart
            size={16}
            className={isWishlisted ? 'fill-rose-600 text-rose-600' : ''}
          />
        </button>

        {/* Quick View Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onQuickView(product);
          }}
          aria-label={`Quick view ${product.name}`}
          className="absolute bottom-3 left-1/2 -translate-x-1/2 hidden md:inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/95 backdrop-blur-xs text-black text-xs font-semibold uppercase tracking-wider shadow-lg opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-black hover:text-white cursor-pointer z-10"
        >
          <Eye size={14} />
          <span>Quick View</span>
        </button>

        {/* Quick Size Picker Overlay */}
        {showSizePicker && (
          <div
            onClick={(e) => e.stopPropagation()}
            className="absolute inset-x-0 bottom-0 bg-neutral-950/95 backdrop-blur-md p-4 text-white z-20 flex flex-col gap-2 animate-in fade-in slide-in-from-bottom-2 duration-200"
          >
            <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400">
              <span className="uppercase tracking-wider">Select Size to Add</span>
              <button
                type="button"
                onClick={() => setShowSizePicker(false)}
                className="text-white hover:text-neutral-300 cursor-pointer"
              >
                ✕
              </button>
            </div>
            <div className="flex flex-wrap gap-1.5 justify-center">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={(e) => handleSizeClick(e, s)}
                  className="px-2.5 py-1 text-xs font-semibold bg-neutral-800 hover:bg-white hover:text-black rounded transition-colors cursor-pointer"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Product Content Details */}
      <div className="p-4 flex flex-col flex-1 justify-between bg-white">
        <div>
          <div className="flex items-center justify-between text-[11px] text-neutral-500 font-mono uppercase tracking-wider mb-1">
            <span>{product.category}</span>
            <span>★ {product.rating} ({product.reviewsCount})</span>
          </div>

          <h3
            onClick={() => onSelectProduct(product)}
            className="text-sm font-semibold text-neutral-900 group-hover:text-black transition-colors line-clamp-1 cursor-pointer font-sans"
          >
            {product.name}
          </h3>

          <p className="text-xs text-neutral-500 line-clamp-2 mt-1 leading-relaxed">
            {product.shortDescription}
          </p>
        </div>

        {/* Pricing & Add to Cart Action */}
        <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-base font-bold text-neutral-950 font-sans">
                {formatINR(product.price)}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-xs text-neutral-400 line-through">
                  {formatINR(product.originalPrice)}
                </span>
              )}
            </div>
            {savings > 0 && (
              <span className="text-[10px] text-emerald-700 font-medium block">
                Save {formatINR(savings)}
              </span>
            )}
          </div>

          {/* Quick Add CTA */}
          <button
            type="button"
            onClick={handleQuickAdd}
            aria-label={`Add ${product.name} to bag`}
            className={`p-2.5 rounded-full transition-all duration-200 cursor-pointer flex items-center justify-center ${
              addedNotice
                ? 'bg-emerald-600 text-white'
                : 'bg-neutral-900 hover:bg-black text-white hover:scale-105 shadow-sm'
            }`}
          >
            {addedNotice ? <Check size={16} /> : <ShoppingBag size={16} />}
          </button>
        </div>
      </div>
    </div>
  );
};
