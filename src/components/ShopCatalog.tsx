import React, { useState, useMemo } from 'react';
import type { Product, CategoryFilter } from '../data/products.ts';
import { CATEGORIES, PRODUCTS } from '../data/products.ts';
import { filterAndSortProducts } from '../utils/shop.ts';
import { ProductCard } from './ProductCard.tsx';
import {
  Search,
  SlidersHorizontal,
  X,
  Sparkles,
  ArrowRight,
  MapPin,
  ShoppingBag,
} from 'lucide-react';

interface ShopCatalogProps {
  onQuickView: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, size: string, color: { name: string; hex: string }) => void;
  wishlist: Product[];
  onToggleWishlist: (product: Product) => void;
  onNavigateAbout: () => void;
}

export const ShopCatalog: React.FC<ShopCatalogProps> = ({
  onQuickView,
  onSelectProduct,
  onAddToCart,
  wishlist,
  onToggleWishlist,
  onNavigateAbout,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<
    'featured' | 'price-low' | 'price-high' | 'discount' | 'rating' | 'newest'
  >('featured');
  const [inStockOnly, setInStockOnly] = useState(false);

  const filteredProducts = useMemo(() => {
    return filterAndSortProducts(PRODUCTS, {
      category: selectedCategory,
      searchQuery,
      sortBy,
      inStockOnly,
    });
  }, [selectedCategory, searchQuery, sortBy, inStockOnly]);

  const wishlistedIds = useMemo(() => {
    return new Set(wishlist.map((w) => w.id));
  }, [wishlist]);

  const resetFilters = () => {
    setSelectedCategory('All');
    setSearchQuery('');
    setSortBy('featured');
    setInStockOnly(false);
  };

  return (
    <section id="shop-catalog" className="bg-[#faf9f6] text-neutral-900 py-12 md:py-20 px-4 md:px-12 lg:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-neutral-200">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 border border-neutral-300 text-neutral-700 text-xs font-mono uppercase tracking-widest mb-3">
              <Sparkles size={13} className="text-amber-700" />
              <span>Full E-Commerce Collection</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-neutral-950 font-sans uppercase">
              Curated Wardrobe
            </h2>
            <p className="text-sm md:text-base text-neutral-600 mt-2 max-w-xl leading-relaxed">
              Timeless silhouettes blending contemporary minimalism with master Kashmiri craftsmanship. Available online with express delivery across India or for in-person styling at Kanelwan Market.
            </p>
          </div>

          <button
            type="button"
            onClick={onNavigateAbout}
            className="self-start md:self-end inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-900 hover:text-amber-800 transition-colors cursor-pointer group"
          >
            <span>Learn Our Heritage & Story</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Filter and Search Bar */}
        <div className="mt-8 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search garments, velvet, linen, chanderi..."
              className="w-full pl-10 pr-9 py-2.5 bg-white border border-neutral-300 rounded-sm text-xs md:text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-neutral-950 focus:ring-1 focus:ring-black transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-black cursor-pointer"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Sort & Quick Stock Filter */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <SlidersHorizontal size={14} className="text-neutral-500" />
              <label htmlFor="sort-select" className="text-xs font-semibold text-neutral-600 uppercase tracking-wider hidden sm:inline">
                Sort:
              </label>
            </div>
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-white border border-neutral-300 rounded-sm px-3 py-2 text-xs font-medium text-neutral-900 focus:outline-none focus:border-neutral-950 cursor-pointer"
            >
              <option value="featured">Featured & Curated</option>
              <option value="newest">New Arrivals First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="discount">Highest Discount</option>
              <option value="rating">Top Customer Rated</option>
            </select>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="mt-6 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-full transition-all cursor-pointer flex-shrink-0 ${
                  isSelected
                    ? 'bg-neutral-950 text-white shadow-sm'
                    : 'bg-white text-neutral-700 border border-neutral-200 hover:border-neutral-400 hover:text-black'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Active Filters Summary & Count */}
        <div className="mt-6 flex items-center justify-between text-xs text-neutral-500 font-mono">
          <span>
            Showing <strong>{filteredProducts.length}</strong> {filteredProducts.length === 1 ? 'garment' : 'garments'}
            {selectedCategory !== 'All' && ` in "${selectedCategory}"`}
            {searchQuery && ` matching "${searchQuery}"`}
          </span>

          {(selectedCategory !== 'All' || searchQuery || inStockOnly) && (
            <button
              type="button"
              onClick={resetFilters}
              className="text-neutral-900 hover:underline font-semibold uppercase cursor-pointer"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={onQuickView}
                onSelectProduct={onSelectProduct}
                onAddToCart={(p, size, color) => onAddToCart(p, size, color)}
                isWishlisted={wishlistedIds.has(product.id)}
                onToggleWishlist={onToggleWishlist}
              />
            ))}
          </div>
        ) : (
          <div className="mt-16 py-16 bg-white rounded-sm border border-neutral-200 text-center px-4">
            <ShoppingBag size={40} className="mx-auto text-neutral-300 mb-3" />
            <h3 className="text-base font-bold uppercase tracking-tight text-neutral-900">
              No garments found
            </h3>
            <p className="text-xs text-neutral-500 mt-1 max-w-sm mx-auto">
              We couldn't find any clothing matching your search or active filter combination.
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="mt-5 px-6 py-2.5 bg-neutral-950 text-white text-xs font-semibold uppercase tracking-wider rounded-xs hover:bg-neutral-800 transition-colors cursor-pointer"
            >
              View All Products
            </button>
          </div>
        )}

        {/* Boutique Location Footnote Banner */}
        <div className="mt-16 p-6 md:p-8 bg-neutral-950 text-white rounded-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 text-xs font-mono uppercase tracking-widest text-neutral-400">
              <MapPin size={14} className="text-white" />
              <span>Visit our Flagship Store</span>
            </div>
            <h4 className="text-lg md:text-xl font-bold uppercase tracking-tight">
              Wearza Fashion Store — Kanelwan Market, Kashmir
            </h4>
            <p className="text-xs text-neutral-400 max-w-lg">
              Experience the fabrics in person, request custom Phiran and Anarkali sizing, or collect your online orders with zero shipping wait.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <button
              type="button"
              onClick={onNavigateAbout}
              className="px-5 py-2.5 bg-white text-black text-xs font-semibold uppercase tracking-wider rounded-xs hover:bg-neutral-200 transition-colors cursor-pointer text-center"
            >
              Store Details
            </button>
            <a
              href="https://wa.me/919596091671"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 border border-neutral-700 hover:border-white text-white text-xs font-semibold uppercase tracking-wider rounded-xs transition-colors cursor-pointer text-center"
            >
              Contact Staff
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
