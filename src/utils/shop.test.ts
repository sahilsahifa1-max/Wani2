import test from 'node:test';
import assert from 'node:assert/strict';
import { PRODUCTS } from '../data/products.ts';
import {
  formatINR,
  calculateSavings,
  filterAndSortProducts,
  validatePromoCode,
  calculateCartTotals,
  createWhatsAppOrderLink,
  type CartItem,
} from './shop.ts';

test('formatINR formats currency strings with Indian Rupees correctly', () => {
  assert.equal(formatINR(0), '₹0');
  assert.equal(formatINR(2499), '₹2,499');
  assert.equal(formatINR(12500), '₹12,500');
});

test('calculateSavings returns difference between MRP and selling price', () => {
  assert.equal(calculateSavings(3799, 2499), 1300);
  assert.equal(calculateSavings(1000, 1000), 0);
  assert.equal(calculateSavings(1000, 1200), 0);
});

test('Product catalog contains all 10 Cloudinary images and proper fields', () => {
  assert.equal(PRODUCTS.length, 10);
  const ids = new Set(PRODUCTS.map((p) => p.id));
  assert.equal(ids.size, 10);

  PRODUCTS.forEach((product) => {
    assert.ok(product.name.length > 5, 'product has name');
    assert.ok(product.price > 0, 'product has selling price');
    assert.ok(product.originalPrice >= product.price, 'original price >= selling price');
    assert.ok(product.discountPercent > 0, 'has discount percent');
    assert.ok(product.images.length >= 1, 'has at least 1 image');
    assert.match(product.images[0], /^https:\/\/res\.cloudinary\.com/);
    assert.ok(product.sizes.length >= 2, 'has multiple sizes');
    assert.ok(product.colors.length >= 1, 'has color swatches');
  });
});

test('filterAndSortProducts filters by category correctly', () => {
  const occasionItems = filterAndSortProducts(PRODUCTS, { category: 'Occasion Wear' });
  assert.ok(occasionItems.length >= 2);
  occasionItems.forEach((p) => {
    assert.equal(p.category, 'Occasion Wear');
  });
});

test('filterAndSortProducts searches across titles, descriptions, and details', () => {
  const searchVelvet = filterAndSortProducts(PRODUCTS, { searchQuery: 'velvet' });
  assert.ok(searchVelvet.length >= 1);
  assert.ok(searchVelvet.some((p) => p.name.includes('Velvet') || p.fullDescription.includes('velvet')));

  const searchKashmir = filterAndSortProducts(PRODUCTS, { searchQuery: 'kashmiri' });
  assert.ok(searchKashmir.length >= 1);
});

test('filterAndSortProducts sorts by price-low and price-high', () => {
  const lowToHigh = filterAndSortProducts(PRODUCTS, { sortBy: 'price-low' });
  for (let i = 0; i < lowToHigh.length - 1; i++) {
    assert.ok(lowToHigh[i].price <= lowToHigh[i + 1].price);
  }

  const highToLow = filterAndSortProducts(PRODUCTS, { sortBy: 'price-high' });
  for (let i = 0; i < highToLow.length - 1; i++) {
    assert.ok(highToLow[i].price >= highToLow[i + 1].price);
  }
});

test('validatePromoCode rejects invalid codes and verifies minimum order values', () => {
  const invalid = validatePromoCode('BOGUS', 2000);
  assert.equal(invalid.valid, false);

  const belowMin = validatePromoCode('WEARZA10', 1000);
  assert.equal(belowMin.valid, false);

  const valid10 = validatePromoCode('WEARZA10', 2500);
  assert.equal(valid10.valid, true);
  assert.equal(valid10.promo?.discountValue, 10);
});

test('calculateCartTotals computes subtotal, discounts, shipping, and grand total', () => {
  const mockItem1: CartItem = {
    id: 'wz-1133-M-Olive Moss',
    product: PRODUCTS[0],
    size: 'M',
    color: PRODUCTS[0].colors[0],
    quantity: 1,
  };

  const totals = calculateCartTotals([mockItem1]);
  assert.equal(totals.itemCount, 1);
  assert.equal(totals.subtotal, 2499);
  assert.equal(totals.originalSubtotal, 3799);
  assert.equal(totals.productDiscountTotal, 1300);
  assert.equal(totals.isFreeShipping, true);
  assert.equal(totals.shipping, 0);
  assert.equal(totals.grandTotal, 2499);

  const totalsWithPromo = calculateCartTotals([mockItem1], 'WEARZA10');
  assert.equal(totalsWithPromo.promoDiscount, 250);
  assert.equal(totalsWithPromo.grandTotal, 2499 - 250);
});

test('createWhatsAppOrderLink generates valid encoded URL with phone number and items', () => {
  const mockItem: CartItem = {
    id: 'wz-1133-M-Olive Moss',
    product: PRODUCTS[0],
    size: 'M',
    color: PRODUCTS[0].colors[0],
    quantity: 1,
  };

  const link = createWhatsAppOrderLink([mockItem], { name: 'Ayesha' });
  assert.ok(link.startsWith('https://wa.me/919596091671?text='));
  assert.ok(link.includes(encodeURIComponent('Zahra Minimalist Crepe Kurta Set')));
  assert.ok(link.includes(encodeURIComponent('Ayesha')));
});
