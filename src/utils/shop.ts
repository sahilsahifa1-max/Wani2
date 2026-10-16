/**
 * WEARZA FASHION STORE — SHOPPING ENGINE & CART UTILITIES
 * Pure functions decoupled for deterministic unit testing.
 */

import type { Product, CategoryFilter } from '../data/products.ts';

export interface CartItem {
  id: string; // Cart line ID: `${productId}-${size}-${colorName}`
  product: Product;
  size: string;
  color: { name: string; hex: string };
  quantity: number;
}

export interface PromoCode {
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number; // percentage (e.g. 10 for 10%) or fixed amount
  minOrderValue?: number;
  description: string;
}

export const VALID_PROMO_CODES: Record<string, PromoCode> = {
  WEARZA10: {
    code: 'WEARZA10',
    discountType: 'percentage',
    discountValue: 10,
    minOrderValue: 1500,
    description: '10% off on all orders above ₹1,500',
  },
  WELCOME20: {
    code: 'WELCOME20',
    discountType: 'percentage',
    discountValue: 20,
    minOrderValue: 3000,
    description: '20% off on your luxury order above ₹3,000',
  },
  KASHMIR500: {
    code: 'KASHMIR500',
    discountType: 'fixed',
    discountValue: 500,
    minOrderValue: 4000,
    description: 'Flat ₹500 off on occasion wear & festive collections',
  },
};

export const FREE_SHIPPING_THRESHOLD = 1999;
export const STANDARD_SHIPPING_FEE = 150;

/**
 * Format Indian Rupees with standard comma grouping
 */
export function formatINR(amount: number): string {
  if (isNaN(amount)) return '₹0';
  return `₹${Math.round(amount).toLocaleString('en-IN')}`;
}

/**
 * Calculate amount saved in currency
 */
export function calculateSavings(originalPrice: number, discountedPrice: number): number {
  return Math.max(0, originalPrice - discountedPrice);
}

/**
 * Filter and sort products
 */
export interface FilterOptions {
  category?: CategoryFilter | string;
  searchQuery?: string;
  sortBy?: 'featured' | 'price-low' | 'price-high' | 'discount' | 'rating' | 'newest';
  maxPrice?: number;
  inStockOnly?: boolean;
}

export function filterAndSortProducts(
  products: Product[],
  options: FilterOptions = {}
): Product[] {
  const {
    category = 'All',
    searchQuery = '',
    sortBy = 'featured',
    maxPrice,
    inStockOnly = false,
  } = options;

  let result = products.slice();

  // Category filter
  if (category && category !== 'All') {
    result = result.filter(
      (p) => p.category.toLowerCase() === category.toLowerCase()
    );
  }

  // Stock filter
  if (inStockOnly) {
    result = result.filter((p) => p.inStock);
  }

  // Price cap filter
  if (typeof maxPrice === 'number' && maxPrice > 0) {
    result = result.filter((p) => p.price <= maxPrice);
  }

  // Keyword search
  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase().trim();
    result = result.filter((p) => {
      const matchName = p.name.toLowerCase().includes(q);
      const matchCat = p.category.toLowerCase().includes(q);
      const matchSub = p.subcategory.toLowerCase().includes(q);
      const matchDesc = p.shortDescription.toLowerCase().includes(q) || p.fullDescription.toLowerCase().includes(q);
      const matchDetails = p.details.some((d) => d.toLowerCase().includes(q));
      return matchName || matchCat || matchSub || matchDesc || matchDetails;
    });
  }

  // Sorting
  switch (sortBy) {
    case 'price-low':
      result.sort((a, b) => a.price - b.price);
      break;
    case 'price-high':
      result.sort((a, b) => b.price - a.price);
      break;
    case 'discount':
      result.sort((a, b) => b.discountPercent - a.discountPercent);
      break;
    case 'rating':
      result.sort((a, b) => b.rating - a.rating);
      break;
    case 'newest':
      result.sort((a, b) => (b.badge === 'New Arrival' ? 1 : 0) - (a.badge === 'New Arrival' ? 1 : 0));
      break;
    case 'featured':
    default:
      result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
      break;
  }

  return result;
}

/**
 * Validate promo code against current cart subtotal
 */
export function validatePromoCode(
  code: string,
  subtotal: number
): { valid: boolean; error?: string; promo?: PromoCode } {
  const normalized = code.trim().toUpperCase();
  const promo = VALID_PROMO_CODES[normalized];

  if (!promo) {
    return { valid: false, error: 'Invalid coupon code. Try WEARZA10 or WELCOME20' };
  }

  if (promo.minOrderValue && subtotal < promo.minOrderValue) {
    return {
      valid: false,
      error: `Coupon applies on orders of ${formatINR(promo.minOrderValue)} and above`,
      promo,
    };
  }

  return { valid: true, promo };
}

/**
 * Calculate all financial totals for cart
 */
export interface CartTotals {
  itemCount: number;
  originalSubtotal: number; // Total MRP
  subtotal: number; // Selling price subtotal
  productDiscountTotal: number; // MRP - Selling price
  promoDiscount: number;
  shipping: number;
  isFreeShipping: boolean;
  freeShippingRemaining: number;
  grandTotal: number;
}

export function calculateCartTotals(
  items: CartItem[],
  promoCodeString?: string
): CartTotals {
  let itemCount = 0;
  let originalSubtotal = 0;
  let subtotal = 0;

  for (const item of items) {
    itemCount += item.quantity;
    originalSubtotal += item.product.originalPrice * item.quantity;
    subtotal += item.product.price * item.quantity;
  }

  const productDiscountTotal = Math.max(0, originalSubtotal - subtotal);

  // Promo code calculation
  let promoDiscount = 0;
  if (promoCodeString && subtotal > 0) {
    const val = validatePromoCode(promoCodeString, subtotal);
    if (val.valid && val.promo) {
      if (val.promo.discountType === 'percentage') {
        promoDiscount = Math.round((subtotal * val.promo.discountValue) / 100);
      } else if (val.promo.discountType === 'fixed') {
        promoDiscount = Math.min(subtotal, val.promo.discountValue);
      }
    }
  }

  const discountedSubtotal = Math.max(0, subtotal - promoDiscount);

  // Shipping calculation
  const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0;
  const shipping = isFreeShipping ? 0 : STANDARD_SHIPPING_FEE;
  const freeShippingRemaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  const grandTotal = subtotal > 0 ? discountedSubtotal + shipping : 0;

  return {
    itemCount,
    originalSubtotal,
    subtotal,
    productDiscountTotal,
    promoDiscount,
    shipping,
    isFreeShipping,
    freeShippingRemaining,
    grandTotal,
  };
}

/**
 * Create WhatsApp order inquiry link for direct boutique service
 */
export function createWhatsAppOrderLink(
  items: CartItem[],
  customerInfo?: { name?: string; address?: string }
): string {
  const storePhone = '919596091671';
  let message = `Hello Wearza Fashion Store, I would like to place an order from your online store:\n\n`;

  if (items.length > 0) {
    items.forEach((item, index) => {
      message += `${index + 1}. ${item.product.name}\n   Size: ${item.size} | Color: ${item.color.name} | Qty: ${item.quantity} | Price: ${formatINR(item.product.price * item.quantity)}\n`;
    });

    const totals = calculateCartTotals(items);
    message += `\nSubtotal: ${formatINR(totals.subtotal)}`;
    message += `\nEstimated Total: ${formatINR(totals.grandTotal)}\n`;
  } else {
    message += `I am inquiring about product availability at your Kanelwan Market boutique.\n`;
  }

  if (customerInfo?.name) {
    message += `\nCustomer: ${customerInfo.name}`;
  }
  if (customerInfo?.address) {
    message += `\nAddress: ${customerInfo.address}`;
  }

  return `https://wa.me/${storePhone}?text=${encodeURIComponent(message)}`;
}
