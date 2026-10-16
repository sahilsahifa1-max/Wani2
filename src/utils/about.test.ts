import test from 'node:test';
import assert from 'node:assert/strict';

export const WEARZA_STORE_METADATA = {
  brandName: 'WEARZA FASHION STORE',
  location: 'Kanelwan Market, Kashmir, Jammu and Kashmir, India',
  target: "Women's and girls' fashion",
  currency: 'Indian Rupees (₹)',
  heroIntro:
    "Wearza Fashion Store brings you a thoughtfully selected range of women's fashion, combining style, comfort, and affordability. Visit us at Kanelwan Market, Kashmir, to explore our collection.",
  phoneNumbers: ['9596091671', '9596352933'],
  heroImageUrl:
    'https://res.cloudinary.com/zunfvbel/image/upload/f_auto/q_auto/IMG_15804501-b263-4d50-9943-c33d81b68ad2.webp',
};

test('Wearza About Us configuration contains required authentic details', () => {
  assert.equal(WEARZA_STORE_METADATA.brandName, 'WEARZA FASHION STORE');
  assert.match(WEARZA_STORE_METADATA.location, /Kanelwan Market/);
  assert.match(WEARZA_STORE_METADATA.location, /Kashmir/);
  assert.equal(WEARZA_STORE_METADATA.currency, 'Indian Rupees (₹)');
  assert.equal(
    WEARZA_STORE_METADATA.heroImageUrl,
    'https://res.cloudinary.com/zunfvbel/image/upload/f_auto/q_auto/IMG_15804501-b263-4d50-9943-c33d81b68ad2.webp'
  );
  assert.equal(WEARZA_STORE_METADATA.phoneNumbers.length, 2);
});

test('Wearza route matching correctly differentiates home and about routes', () => {
  const isAboutRoute = (path: string) => path === '/about' || path.startsWith('/about/');
  assert.equal(isAboutRoute('/about'), true);
  assert.equal(isAboutRoute('/about/'), true);
  assert.equal(isAboutRoute('/'), false);
  assert.equal(isAboutRoute('/collections'), false);
});
