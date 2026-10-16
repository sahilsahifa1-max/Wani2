import React, { useState } from 'react';
import type { Product } from '../data/products.ts';
import { PRODUCTS } from '../data/products.ts';
import { formatINR, calculateSavings, createWhatsAppOrderLink } from '../utils/shop.ts';
import {
  ArrowLeft,
  Heart,
  ShoppingBag,
  Check,
  Truck,
  RotateCcw,
  ShieldCheck,
  MapPin,
  ChevronDown,
  Ruler,
  MessageCircle,
  Star,
} from 'lucide-react';

interface ProductDetailPageProps {
  product: Product;
  onBack: () => void;
  onNavigateHome: () => void;
  onNavigateShop: () => void;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, size: string, color: { name: string; hex: string }, quantity: number) => void;
  onBuyNow: (product: Product, size: string, color: { name: string; hex: string }, quantity: number) => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  product,
  onBack,
  onNavigateHome,
  onNavigateShop,
  onSelectProduct,
  onAddToCart,
  onBuyNow,
  isWishlisted,
  onToggleWishlist,
}) => {
  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || 'M');
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeAccordion, setActiveAccordion] = useState<string | null>('details');
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const savings = calculateSavings(product.originalPrice, product.price);

  const handleAdd = () => {
    onAddToCart(product, selectedSize, selectedColor, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleDirectBuy = () => {
    onBuyNow(product, selectedSize, selectedColor, quantity);
  };

  const relatedProducts = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 4);

  const toggleAccordion = (id: string) => {
    setActiveAccordion((prev) => (prev === id ? null : id));
  };

  const whatsappInquiryUrl = createWhatsAppOrderLink(
    [
      {
        id: `${product.id}-${selectedSize}-${selectedColor.name}`,
        product,
        size: selectedSize,
        color: selectedColor,
        quantity,
      },
    ]
  );

  return (
    <div className="min-h-screen bg-[#faf9f6] text-neutral-900 selection:bg-neutral-900 selection:text-white">
      {/* Top Breadcrumb & Navigation Bar */}
      <div className="border-b border-neutral-200 bg-white/80 backdrop-blur-md sticky top-0 z-20 px-4 md:px-12 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-neutral-500 font-mono">
            <button
              type="button"
              onClick={onNavigateHome}
              className="hover:text-black transition-colors cursor-pointer"
            >
              HOME
            </button>
            <span>/</span>
            <button
              type="button"
              onClick={onNavigateShop}
              className="hover:text-black transition-colors cursor-pointer"
            >
              COLLECTIONS
            </button>
            <span>/</span>
            <span className="text-neutral-900 font-semibold truncate max-w-[180px] md:max-w-none">
              {product.name}
            </span>
          </div>

          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider text-neutral-600 hover:text-black font-semibold transition-colors cursor-pointer"
          >
            <ArrowLeft size={14} />
            <span>Back</span>
          </button>
        </div>
      </div>

      {/* Main Product Container */}
      <main className="max-w-7xl mx-auto px-4 md:px-12 py-8 md:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Left Column: Image Gallery (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {/* Primary Large Image */}
            <div className="relative aspect-[3/4] w-full rounded-sm overflow-hidden bg-neutral-100 shadow-md border border-neutral-200/80">
              <img
                src={selectedImage}
                alt={product.name}
                className="w-full h-full object-cover object-center transition-all duration-500"
              />

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.badge && (
                  <span className="px-3 py-1 text-xs font-mono tracking-wider uppercase font-semibold bg-neutral-950 text-white rounded-xs shadow-md">
                    {product.badge}
                  </span>
                )}
                {product.discountPercent > 0 && (
                  <span className="px-2.5 py-1 text-xs font-mono font-bold bg-rose-600 text-white rounded-xs shadow-md">
                    {product.discountPercent}% OFF
                  </span>
                )}
              </div>

              {/* Wishlist toggle */}
              <button
                type="button"
                onClick={() => onToggleWishlist(product)}
                aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                className={`absolute top-4 right-4 p-3 rounded-full transition-all duration-200 shadow-md cursor-pointer ${
                  isWishlisted
                    ? 'bg-rose-50 text-rose-600 border border-rose-200'
                    : 'bg-white/90 backdrop-blur-xs text-neutral-700 hover:text-black hover:bg-white'
                }`}
              >
                <Heart size={20} className={isWishlisted ? 'fill-rose-600 text-rose-600' : ''} />
              </button>
            </div>

            {/* Thumbnails list */}
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedImage(img)}
                    className={`relative aspect-[3/4] rounded-xs overflow-hidden border-2 transition-all cursor-pointer ${
                      selectedImage === img
                        ? 'border-neutral-950 ring-2 ring-neutral-300'
                        : 'border-neutral-200 opacity-75 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} view ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Garment Information & Purchases (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-start">
            <div className="pb-6 border-b border-neutral-200">
              <div className="flex items-center gap-2 text-xs text-neutral-500 uppercase tracking-wider mb-2 font-medium">
                <span>{product.category}</span>
                <span className="inline-block w-1 h-1 rounded-full bg-neutral-300" />
                <span>{product.subcategory}</span>
                <span className="inline-block w-1 h-1 rounded-full bg-neutral-300" />
                <span className="flex items-center gap-1 text-amber-700 font-semibold">
                  <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500 inline" />
                  <span>{product.rating}</span>
                  <span className="text-neutral-500">({product.reviewsCount} reviews)</span>
                </span>
              </div>

              <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-neutral-950 leading-tight">
                {product.name}
              </h1>

              {/* Pricing section */}
              <div className="mt-4 flex items-baseline gap-3">
                <span className="text-3xl font-extrabold text-neutral-950">
                  {formatINR(product.price)}
                </span>
                {product.originalPrice > product.price && (
                  <span className="text-lg text-neutral-400 line-through">
                    {formatINR(product.originalPrice)}
                  </span>
                )}
                {product.discountPercent > 0 && (
                  <span className="px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider bg-rose-50 text-rose-600 border border-rose-200 rounded">
                    Save {formatINR(savings)} ({product.discountPercent}% OFF)
                  </span>
                )}
              </div>
              <p className="text-[11px] text-neutral-500 mt-1">
                Inclusive of all taxes · Free delivery on orders over {formatINR(1999)}
              </p>

              {/* Short editorial description */}
              <p className="mt-4 text-sm text-neutral-700 leading-relaxed font-normal">
                {product.fullDescription}
              </p>
            </div>

            {/* Garment Customization Controls */}
            <div className="py-6 border-b border-neutral-200 space-y-6">
              {/* Color swatches */}
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-xs font-bold text-neutral-900 uppercase tracking-wider">
                    Color:{' '}
                    <span className="font-normal text-neutral-600">{selectedColor.name}</span>
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      type="button"
                      onClick={() => setSelectedColor(c)}
                      aria-label={`Select color ${c.name}`}
                      className={`relative w-8 h-8 rounded-full border-2 transition-all cursor-pointer flex items-center justify-center ${
                        selectedColor.name === c.name
                          ? 'border-neutral-950 ring-2 ring-neutral-400 scale-105'
                          : 'border-neutral-300 hover:scale-105'
                      }`}
                      style={{ backgroundColor: c.hex }}
                    >
                      {selectedColor.name === c.name && (
                        <Check size={14} className={c.hex === '#f4f1ea' || c.hex === '#ede6d8' || c.hex === '#f7f6f2' ? 'text-black' : 'text-white'} />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selection & Size Guide */}
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-xs font-bold text-neutral-900 uppercase tracking-wider">
                    Size:{' '}
                    <span className="font-normal text-neutral-600">{selectedSize}</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowSizeGuide(true)}
                    className="inline-flex items-center gap-1 text-xs text-neutral-600 hover:text-black underline cursor-pointer"
                  >
                    <Ruler size={13} />
                    <span>Size Guide</span>
                  </button>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSelectedSize(s)}
                      className={`px-4 py-2 text-xs font-semibold rounded-xs border transition-all cursor-pointer ${
                        selectedSize === s
                          ? 'bg-neutral-950 text-white border-neutral-950 shadow-sm'
                          : 'bg-white text-neutral-800 border-neutral-300 hover:border-black'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Stepper & Stock status */}
              <div className="flex items-center justify-between">
                <div>
                  <span className="block text-xs font-bold text-neutral-900 uppercase tracking-wider mb-2">
                    Quantity
                  </span>
                  <div className="inline-flex items-center border border-neutral-300 rounded-xs bg-white">
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      disabled={quantity <= 1}
                      className="px-3.5 py-1.5 text-sm text-neutral-600 hover:text-black disabled:opacity-30 cursor-pointer"
                    >
                      -
                    </button>
                    <span className="px-4 py-1.5 text-xs font-bold text-neutral-900 min-w-8 text-center font-mono">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => Math.min(product.stockCount, q + 1))}
                      disabled={quantity >= product.stockCount}
                      className="px-3.5 py-1.5 text-sm text-neutral-600 hover:text-black disabled:opacity-30 cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="text-right">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
                    <span>In Stock ({product.stockCount} remaining)</span>
                  </span>
                  <p className="text-[11px] text-neutral-500 mt-1">Ready for dispatch in 24 hrs</p>
                </div>
              </div>
            </div>

            {/* Primary Order Buttons */}
            <div className="py-6 space-y-3">
              <button
                type="button"
                onClick={handleAdd}
                className={`w-full py-4 px-6 rounded-xs font-semibold text-xs uppercase tracking-widest transition-all cursor-pointer flex items-center justify-center gap-2 shadow-md ${
                  isAdded
                    ? 'bg-emerald-600 text-white'
                    : 'bg-neutral-950 hover:bg-black text-white hover:shadow-lg active:scale-98'
                }`}
              >
                {isAdded ? (
                  <>
                    <Check size={18} />
                    <span>Added to Bag!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag size={18} />
                    <span>Add to Bag · {formatINR(product.price * quantity)}</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleDirectBuy}
                className="w-full py-3.5 px-6 rounded-xs font-semibold text-xs uppercase tracking-widest bg-amber-600 hover:bg-amber-700 text-white transition-all shadow-sm active:scale-98 cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Direct Checkout / Instant Order</span>
              </button>

              {/* WhatsApp Concierge for this garment */}
              <a
                href={whatsappInquiryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xs border border-emerald-600 text-emerald-800 hover:bg-emerald-50 text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <MessageCircle size={16} className="text-emerald-600" />
                <span>Inquire on WhatsApp with Boutique Staff</span>
              </a>
            </div>

            {/* Value Guarantees Grid */}
            <div className="grid grid-cols-2 gap-3 py-4 border-t border-b border-neutral-200 text-xs text-neutral-700">
              <div className="flex items-start gap-2.5">
                <Truck size={16} className="text-neutral-900 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-neutral-900 font-semibold">Free Express Shipping</strong>
                  <span>On orders above ₹1,999 across India</span>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin size={16} className="text-neutral-900 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-neutral-900 font-semibold">Store Pickup</strong>
                  <span>Wearza, Kanelwan Market, Kashmir</span>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <ShieldCheck size={16} className="text-neutral-900 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-neutral-900 font-semibold">Authentic Quality</strong>
                  <span>Inspected fine textiles & stitching</span>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <RotateCcw size={16} className="text-neutral-900 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-neutral-900 font-semibold">7-Day Easy Exchange</strong>
                  <span>Hassle-free size replacement</span>
                </div>
              </div>
            </div>

            {/* Accordions */}
            <div className="mt-6 space-y-2">
              {/* Garment Details & Fabric */}
              <div className="border border-neutral-200 rounded-sm bg-white overflow-hidden">
                <button
                  type="button"
                  onClick={() => toggleAccordion('details')}
                  className="w-full px-4 py-3.5 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-neutral-900 hover:bg-neutral-50 transition-colors cursor-pointer"
                >
                  <span>Garment Details & Fabric Specs</span>
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-200 ${
                      activeAccordion === 'details' ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {activeAccordion === 'details' && (
                  <div className="px-4 pb-4 pt-1 text-xs text-neutral-600 space-y-2 border-t border-neutral-100">
                    <ul className="list-disc pl-4 space-y-1.5 leading-relaxed">
                      {product.details.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Care Instructions */}
              <div className="border border-neutral-200 rounded-sm bg-white overflow-hidden">
                <button
                  type="button"
                  onClick={() => toggleAccordion('care')}
                  className="w-full px-4 py-3.5 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-neutral-900 hover:bg-neutral-50 transition-colors cursor-pointer"
                >
                  <span>Garment Care & Longevity</span>
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-200 ${
                      activeAccordion === 'care' ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {activeAccordion === 'care' && (
                  <div className="px-4 pb-4 pt-1 text-xs text-neutral-600 space-y-2 border-t border-neutral-100">
                    <ul className="list-disc pl-4 space-y-1.5 leading-relaxed">
                      {product.careInstructions.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Store Pickup & Inquiries */}
              <div className="border border-neutral-200 rounded-sm bg-white overflow-hidden">
                <button
                  type="button"
                  onClick={() => toggleAccordion('store')}
                  className="w-full px-4 py-3.5 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-neutral-900 hover:bg-neutral-50 transition-colors cursor-pointer"
                >
                  <span>Boutique Location & Kashmir Store Hours</span>
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-200 ${
                      activeAccordion === 'store' ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {activeAccordion === 'store' && (
                  <div className="px-4 pb-4 pt-1 text-xs text-neutral-600 space-y-2 border-t border-neutral-100 leading-relaxed">
                    <p>
                      <strong>Wearza Fashion Store</strong> is located in Kanelwan Market, Kashmir.
                    </p>
                    <p>
                      Store Hours: Monday to Saturday (10:00 AM – 7:30 PM). Sunday (11:00 AM – 5:00 PM).
                    </p>
                    <p>
                      Customer Support: +91 9596091671 / +91 9596352933
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Complete the Look Section */}
        <section className="mt-20 pt-12 border-t border-neutral-300">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-neutral-500">
                Curated Recommendations
              </span>
              <h3 className="text-xl md:text-2xl font-bold tracking-tight text-neutral-900">
                Complete the Look
              </h3>
            </div>
            <button
              type="button"
              onClick={onNavigateShop}
              className="text-xs font-bold uppercase tracking-wider text-neutral-900 hover:underline cursor-pointer"
            >
              View Full Collection →
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {relatedProducts.map((rel) => (
              <div
                key={rel.id}
                onClick={() => {
                  onSelectProduct(rel);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="group cursor-pointer bg-white p-3 rounded-sm border border-neutral-200/80 hover:shadow-lg transition-all"
              >
                <div className="aspect-[3/4] bg-neutral-100 overflow-hidden rounded-xs mb-3">
                  <img
                    src={rel.images[0]}
                    alt={rel.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="text-[10px] font-mono text-neutral-500 uppercase">{rel.category}</div>
                <h4 className="text-xs font-semibold text-neutral-900 line-clamp-1 group-hover:text-amber-800 transition-colors">
                  {rel.name}
                </h4>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="text-xs font-bold text-neutral-950">{formatINR(rel.price)}</span>
                  <span className="text-[10px] text-neutral-400 line-through">{formatINR(rel.originalPrice)}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Size Guide Modal */}
      {showSizeGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="relative w-full max-w-lg bg-white rounded-sm p-6 md:p-8 shadow-2xl border border-neutral-300">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-200">
              <div className="flex items-center gap-2">
                <Ruler size={18} className="text-neutral-900" />
                <h4 className="text-sm font-bold uppercase tracking-wider text-neutral-900">
                  Wearza Standard Size Chart (Inches)
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setShowSizeGuide(false)}
                className="p-1 text-neutral-400 hover:text-black cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="py-4 overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-neutral-100 text-neutral-700 uppercase font-mono text-[10px]">
                  <tr>
                    <th className="p-2.5">Size</th>
                    <th className="p-2.5">Bust</th>
                    <th className="p-2.5">Waist</th>
                    <th className="p-2.5">Hips</th>
                    <th className="p-2.5">Length</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100 text-neutral-800 font-mono">
                  <tr>
                    <td className="p-2.5 font-bold">XS</td>
                    <td className="p-2.5">32-34"</td>
                    <td className="p-2.5">26-28"</td>
                    <td className="p-2.5">36-38"</td>
                    <td className="p-2.5">44"</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold">S</td>
                    <td className="p-2.5">35-36"</td>
                    <td className="p-2.5">29-30"</td>
                    <td className="p-2.5">39-40"</td>
                    <td className="p-2.5">45"</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold">M</td>
                    <td className="p-2.5">37-39"</td>
                    <td className="p-2.5">31-33"</td>
                    <td className="p-2.5">41-43"</td>
                    <td className="p-2.5">45.5"</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold">L</td>
                    <td className="p-2.5">40-42"</td>
                    <td className="p-2.5">34-36"</td>
                    <td className="p-2.5">44-46"</td>
                    <td className="p-2.5">46"</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold">XL</td>
                    <td className="p-2.5">43-45"</td>
                    <td className="p-2.5">37-39"</td>
                    <td className="p-2.5">47-49"</td>
                    <td className="p-2.5">46.5"</td>
                  </tr>
                </tbody>
              </table>
              <p className="text-[11px] text-neutral-500 mt-3">
                * All garments have generous margins for custom tailoring. Need custom sizing? Contact our Kanelwan Market boutique staff via WhatsApp.
              </p>
            </div>

            <div className="pt-4 border-t border-neutral-200 flex justify-end">
              <button
                type="button"
                onClick={() => setShowSizeGuide(false)}
                className="px-5 py-2 bg-neutral-950 text-white text-xs font-semibold uppercase tracking-wider rounded-xs hover:bg-neutral-800 cursor-pointer"
              >
                Got It
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
