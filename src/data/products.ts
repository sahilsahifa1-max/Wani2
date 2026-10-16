/**
 * WEARZA FASHION STORE — OFFICIAL PRODUCT CATALOG
 * 
 * Authentic women's and girls' fashion collection from Wearza Fashion Store,
 * Kanelwan Market, Kashmir.
 * 
 * Features all 10 Cloudinary fashion image assets as core product photography:
 * 1. 1000001133
 * 2. 1000001134
 * 3. 1000001138
 * 4. 1000001139
 * 5. 1000001140
 * 6. 1000001143
 * 7. 1000001145
 * 8. 1000001146
 * 9. 1000001149
 * 10. 1000001150
 */

export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  name: string;
  category: 'Everyday Wear' | 'Casual Wear' | 'Occasion Wear' | 'Modern Fashion' | 'Festive & Traditional' | 'Winter / Outerwear';
  subcategory: string;
  images: string[];
  price: number; // Discounted selling price in INR (₹)
  originalPrice: number; // MRP in INR (₹)
  discountPercent: number;
  sizes: ('XS' | 'S' | 'M' | 'L' | 'XL' | 'Free Size')[];
  colors: ProductColor[];
  shortDescription: string;
  fullDescription: string;
  details: string[];
  careInstructions: string[];
  inStock: boolean;
  stockCount: number;
  rating: number;
  reviewsCount: number;
  badge?: 'Bestseller' | 'New Arrival' | 'Exclusive' | 'Winter Essential' | 'Editorial Pick' | 'Trending';
  isFeatured?: boolean;
}

export const CLOUDINARY_IMAGE_URLS = {
  img1: 'https://res.cloudinary.com/zunfvbel/image/upload/f_auto,q_auto/1000001133',
  img2: 'https://res.cloudinary.com/zunfvbel/image/upload/f_auto,q_auto/1000001134',
  img3: 'https://res.cloudinary.com/zunfvbel/image/upload/f_auto,q_auto/1000001138',
  img4: 'https://res.cloudinary.com/zunfvbel/image/upload/f_auto,q_auto/1000001139',
  img5: 'https://res.cloudinary.com/zunfvbel/image/upload/f_auto,q_auto/1000001140',
  img6: 'https://res.cloudinary.com/zunfvbel/image/upload/f_auto,q_auto/1000001143',
  img7: 'https://res.cloudinary.com/zunfvbel/image/upload/f_auto,q_auto/1000001145',
  img8: 'https://res.cloudinary.com/zunfvbel/image/upload/f_auto,q_auto/1000001146',
  img9: 'https://res.cloudinary.com/zunfvbel/image/upload/f_auto,q_auto/1000001149',
  img10: 'https://res.cloudinary.com/zunfvbel/image/upload/f_auto,q_auto/1000001150',
};

export const PRODUCTS: Product[] = [
  {
    id: 'wz-1133',
    name: 'Zahra Minimalist Crepe Kurta Set',
    category: 'Everyday Wear',
    subcategory: 'Kurtas & Tunics',
    images: [
      CLOUDINARY_IMAGE_URLS.img1,
      CLOUDINARY_IMAGE_URLS.img5,
      CLOUDINARY_IMAGE_URLS.img4,
    ],
    price: 2499,
    originalPrice: 3799,
    discountPercent: 34,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Olive Moss', hex: '#5b6348' },
      { name: 'Warm Alabaster', hex: '#e9e4d9' },
      { name: 'Deep Charcoal', hex: '#2b2b2c' },
    ],
    shortDescription: 'Contemporary women’s tailoring with relaxed silhouette, delicate side slits, and refined lines.',
    fullDescription: 'Cut from ultra-breathable fluid crepe with understated side slits and tailored cuffs. Ideal for polished daily wear, university, or workspace styling with effortless movement and enduring drape.',
    details: [
      'Fabric: Premium lightweight poly-crepe blend',
      'Fit: Relaxed tailored silhouette',
      'Includes: Kurta with matching straight-cut cigarette trousers',
      'Crafted for: All-day ease and warm-weather breathability',
      'Origin: Available at Wearza Boutique, Kanelwan Market',
    ],
    careInstructions: [
      'Gentle machine wash with mild detergent',
      'Wash with similar colors',
      'Cool iron inside-out',
      'Do not bleach or tumble dry',
    ],
    inStock: true,
    stockCount: 8,
    rating: 4.9,
    reviewsCount: 38,
    badge: 'Bestseller',
    isFeatured: true,
  },
  {
    id: 'wz-1134',
    name: 'Aria Relaxed Linen Co-ord Ensemble',
    category: 'Casual Wear',
    subcategory: 'Co-ord Sets',
    images: [
      CLOUDINARY_IMAGE_URLS.img2,
      CLOUDINARY_IMAGE_URLS.img9,
      CLOUDINARY_IMAGE_URLS.img1,
    ],
    price: 3199,
    originalPrice: 4899,
    discountPercent: 35,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Sand Dune', hex: '#c5b79d' },
      { name: 'Pistachio Sage', hex: '#9fa894' },
      { name: 'Warm Ivory', hex: '#f4f1ea' },
    ],
    shortDescription: 'Casual elegance tailored with comfortable drape for versatile daywear and weekend outings.',
    fullDescription: 'A relaxed two-piece lounge and daywear set crafted from soft-washed cotton-linen. Features drop-shoulder styling with cropped tailored trousers that seamlessly transition from morning coffee to evening gatherings.',
    details: [
      'Fabric: 60% Natural Linen, 40% Fine Cotton',
      'Fit: Oversized drape with tapered elasticated waistband trousers',
      'Neckline: Soft notch collar with tonal stitch accents',
      'Features: Functional side pockets on trousers and top',
      'Origin: Curated for Wearza Fashion Store, Kashmir',
    ],
    careInstructions: [
      'Cold gentle hand or machine wash',
      'Line dry in shade to maintain natural linen texture',
      'Medium steam iron for a crisp finish',
    ],
    inStock: true,
    stockCount: 5,
    rating: 4.8,
    reviewsCount: 24,
    badge: 'New Arrival',
    isFeatured: true,
  },
  {
    id: 'wz-1138',
    name: 'Gulnoor Tilla Embroidered Velvet Phiran',
    category: 'Occasion Wear',
    subcategory: 'Festive & Phirans',
    images: [
      CLOUDINARY_IMAGE_URLS.img3,
      CLOUDINARY_IMAGE_URLS.img10,
      CLOUDINARY_IMAGE_URLS.img7,
    ],
    price: 5899,
    originalPrice: 8499,
    discountPercent: 31,
    sizes: ['S', 'M', 'L', 'XL', 'Free Size'],
    colors: [
      { name: 'Royal Midnight', hex: '#141c2c' },
      { name: 'Crimson Wine', hex: '#4f1a26' },
      { name: 'Forest Emerald', hex: '#18382b' },
    ],
    shortDescription: 'Sophisticated festive piece blending traditional Kashmiri craftsmanship with a modern edge.',
    fullDescription: 'Opulent micro-velvet silhouette adorned with delicate Kashmiri metallic tilla threadwork around the neckline and cuffs. A cherished celebratory statement piece celebrating the heritage of Kashmir with regal warmth.',
    details: [
      'Fabric: Micro-plush Kashmiri velvet with satin inner lining',
      'Embroidery: Fine golden & silver tilla needlework',
      'Cut: Classic voluminous Kashmiri Phiran silhouette with side pockets',
      'Occasion: Weddings, Eid festivities, evening receptions, winter galas',
      'Origin: Handcrafted artisan piece from Kanelwan Market',
    ],
    careInstructions: [
      'Strictly dry clean only',
      'Store in a breathable cotton garment bag',
      'Do not spray perfume directly on metallic embroidery',
    ],
    inStock: true,
    stockCount: 4,
    rating: 5.0,
    reviewsCount: 42,
    badge: 'Exclusive',
    isFeatured: true,
  },
  {
    id: 'wz-1139',
    name: 'Noor Contemporary Asymmetric Tunic',
    category: 'Modern Fashion',
    subcategory: 'Tops & Tunics',
    images: [
      CLOUDINARY_IMAGE_URLS.img4,
      CLOUDINARY_IMAGE_URLS.img1,
      CLOUDINARY_IMAGE_URLS.img9,
    ],
    price: 2299,
    originalPrice: 3299,
    discountPercent: 30,
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Charcoal Slate', hex: '#33373b' },
      { name: 'Taupe Grey', hex: '#8c857b' },
      { name: 'Off-White', hex: '#f7f6f2' },
    ],
    shortDescription: 'Clean architectural cut featuring signature WEARZA tonal palette and fluid drapery.',
    fullDescription: 'Architectural lines meet fluid drapery. Features an asymmetric hemline, mandarin collar, and concealed mother-of-pearl button placket for women who appreciate modern sartorial minimalism.',
    details: [
      'Fabric: Premium spun rayon-viscose blend',
      'Cut: Asymmetric high-low hem with side slit',
      'Collar: Refined mandarin band',
      'Sleeve: 3/4th sleeve with delicate cuff piping',
    ],
    careInstructions: [
      'Machine wash gentle cold',
      'Warm iron if desired',
      'Dry flat in shade',
    ],
    inStock: true,
    stockCount: 11,
    rating: 4.7,
    reviewsCount: 19,
    badge: 'Trending',
  },
  {
    id: 'wz-1140',
    name: 'Saffron Textured Cotton Day Dress',
    category: 'Everyday Wear',
    subcategory: 'Dresses',
    images: [
      CLOUDINARY_IMAGE_URLS.img5,
      CLOUDINARY_IMAGE_URLS.img1,
      CLOUDINARY_IMAGE_URLS.img2,
    ],
    price: 2799,
    originalPrice: 3999,
    discountPercent: 30,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Saffron Ochre', hex: '#c58e39' },
      { name: 'Natural Ecru', hex: '#e8e2d4' },
      { name: 'Clay Rose', hex: '#a66e66' },
    ],
    shortDescription: 'Tactile natural textile structured for everyday comfort, sunny strolls, and modern presence.',
    fullDescription: 'Spun from breathable textured slub cotton with subtle pintuck detailing on the bodice and inseam pockets for functional everyday luxury. Pair with flat juttis or boots for effortless versatility.',
    details: [
      'Fabric: 100% Textured Slub Cotton',
      'Silhouette: Flared A-line with tiered ruffle skirt',
      'Length: Modest midi length (46 inches)',
      'Pockets: Two concealed deep side pockets',
    ],
    careInstructions: [
      'Hand wash separately with cold water',
      'Natural dyes may release excess tint in first wash',
      'Iron while slightly damp',
    ],
    inStock: true,
    stockCount: 6,
    rating: 4.8,
    reviewsCount: 31,
    badge: 'Bestseller',
    isFeatured: true,
  },
  {
    id: 'wz-1143',
    name: 'Mehrunisa Chanderi Silk Anarkali',
    category: 'Occasion Wear',
    subcategory: 'Suits & Anarkalis',
    images: [
      CLOUDINARY_IMAGE_URLS.img6,
      CLOUDINARY_IMAGE_URLS.img3,
      CLOUDINARY_IMAGE_URLS.img10,
    ],
    price: 6499,
    originalPrice: 9999,
    discountPercent: 35,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Pastel Blush', hex: '#ddb3b1' },
      { name: 'Powder Mint', hex: '#b7cbbe' },
      { name: 'Champagne Gold', hex: '#d9c89e' },
    ],
    shortDescription: 'Editorial draped silhouette with artisanal details and shimmering Chanderi silk borders.',
    fullDescription: 'Sweeping floor-length Chanderi silk with delicate zari borders and coordinated tissue-organza dupatta. Designed for weddings, festive gatherings, and memorable celebrations with timeless grace.',
    details: [
      'Fabric: Pure Chanderi Silk with Shantoon lining',
      'Dupatta: 2.5 meters Sheer Organza with scalloped zari lace',
      'Bottom: Matching fitted churidar with drawstring',
      'Craft: Traditional kalidar flare with gold foil-accented border',
    ],
    careInstructions: [
      'Dry clean only',
      'Do not iron directly over zari motifs; use press cloth',
    ],
    inStock: true,
    stockCount: 3,
    rating: 4.9,
    reviewsCount: 16,
    badge: 'Editorial Pick',
  },
  {
    id: 'wz-1145',
    name: 'Zoya Kashmiri Aari Work Kurti',
    category: 'Festive & Traditional',
    subcategory: 'Handcrafted Kurtis',
    images: [
      CLOUDINARY_IMAGE_URLS.img7,
      CLOUDINARY_IMAGE_URLS.img3,
      CLOUDINARY_IMAGE_URLS.img8,
    ],
    price: 3499,
    originalPrice: 4999,
    discountPercent: 30,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Kashmiri Rust', hex: '#8a3c26' },
      { name: 'Ivory Cream', hex: '#ede6d8' },
      { name: 'Midnight Blue', hex: '#162238' },
    ],
    shortDescription: 'Classic Kashmiri-inspired lines reinterpreted for contemporary wardrobes with rich Aari needlecraft.',
    fullDescription: 'Traditional fine Aari crewel embroidery rendered with artisanal precision across the front yoke and sleeve hems. Spun on a pure soft wool-blend base for all-season elegance and cozy refinement.',
    details: [
      'Fabric: Cashmilon wool-viscose blend',
      'Embroidery: Authentic Kashmiri floral Aari chain stitch',
      'Cut: Straight silhouette with side vents',
      'Pairing: Looks stunning with cigarette pants, palazzos, or denim',
    ],
    careInstructions: [
      'Dry clean or gentle cold water hand wash',
      'Dry flat on a towel',
      'Warm iron inside-out',
    ],
    inStock: true,
    stockCount: 7,
    rating: 4.9,
    reviewsCount: 29,
    badge: 'Editorial Pick',
    isFeatured: true,
  },
  {
    id: 'wz-1146',
    name: 'Valley Cashmere-Blend Wrap Coat',
    category: 'Winter / Outerwear',
    subcategory: 'Jackets & Coats',
    images: [
      CLOUDINARY_IMAGE_URLS.img8,
      CLOUDINARY_IMAGE_URLS.img10,
      CLOUDINARY_IMAGE_URLS.img7,
    ],
    price: 5499,
    originalPrice: 7999,
    discountPercent: 31,
    sizes: ['S', 'M', 'L'],
    colors: [
      { name: 'Camel Heather', hex: '#a68058' },
      { name: 'Oatmeal Melange', hex: '#cfc6b8' },
      { name: 'Rich Espresso', hex: '#382b24' },
    ],
    shortDescription: 'Layering outerwear piece designed for mountain climate and all-day ease with wrap sash.',
    fullDescription: 'Designed for crisp Himalayan autumns and winter evenings. Features a wide waterfall collar, self-tie sash belt, and generous deep patch pockets tailored in a plush double-faced cashmere-wool blend.',
    details: [
      'Fabric: 30% Cashmere, 70% Merino Wool blend',
      'Style: Open-front wrap with matching detachable tie belt',
      'Length: Knee-length tailored drape (42 inches)',
      'Origin: Winter flagship collection, Wearza Fashion Store, Kashmir',
    ],
    careInstructions: [
      'Specialist dry clean only',
      'Store on wide padded hanger',
      'Use clothes brush to remove lint',
    ],
    inStock: true,
    stockCount: 4,
    rating: 5.0,
    reviewsCount: 22,
    badge: 'Winter Essential',
    isFeatured: true,
  },
  {
    id: 'wz-1149',
    name: 'Dahlia Monochromatic Linen Ensemble',
    category: 'Modern Fashion',
    subcategory: 'Sets & Separates',
    images: [
      CLOUDINARY_IMAGE_URLS.img9,
      CLOUDINARY_IMAGE_URLS.img2,
      CLOUDINARY_IMAGE_URLS.img4,
    ],
    price: 2999,
    originalPrice: 4299,
    discountPercent: 30,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Monochrome Taupe', hex: '#776f65' },
      { name: 'Deep Ink', hex: '#1c212a' },
      { name: 'Bone White', hex: '#ebe7df' },
    ],
    shortDescription: 'Understated monochrome styling crafted for versatile transitions and high-fashion minimalism.',
    fullDescription: 'A clean minimalist silhouette featuring relaxed cigarette trousers paired with a boxy structured longline tunic. Finished with tonal pick-stitch details and French seams for quiet luxury.',
    details: [
      'Fabric: 100% Pure European Flax Linen',
      'Construction: French seams, drop shoulders, vented cuffs',
      'Style: High fashion editorial co-ord set',
      'Versatility: Can be styled together or worn as versatile separates',
    ],
    careInstructions: [
      'Gentle cold wash with mild detergent',
      'Do not wring; reshape while damp and hang dry',
    ],
    inStock: true,
    stockCount: 6,
    rating: 4.8,
    reviewsCount: 17,
    badge: 'New Arrival',
  },
  {
    id: 'wz-1150',
    name: 'Sheen Silk-Velvet Festive Capelet Set',
    category: 'Occasion Wear',
    subcategory: 'Festive & Phirans',
    images: [
      CLOUDINARY_IMAGE_URLS.img10,
      CLOUDINARY_IMAGE_URLS.img3,
      CLOUDINARY_IMAGE_URLS.img6,
    ],
    price: 5999,
    originalPrice: 8799,
    discountPercent: 32,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Antique Emerald', hex: '#1d3e33' },
      { name: 'Garnet Maroon', hex: '#4e1b21' },
      { name: 'Obsidian Black', hex: '#151515' },
    ],
    shortDescription: 'Statement archive garment showcasing tactile textures, bronze gota accents, and timeless proportions.',
    fullDescription: 'A modern homage to traditional Kashmiri festive outerwear. Lined with silk-viscose and detailed with delicate bronze gota patti accents along the border and neckline, creating a regal contour for memorable evenings.',
    details: [
      'Fabric: Heavyweight silk-viscose velvet with satin backing',
      'Embellishment: Bronze gota patti ribbon borders',
      'Set Includes: Tailored velvet capelet tunic and flared trousers',
      'Crafted by: Master artisans at Kanelwan Market boutique',
    ],
    careInstructions: [
      'Professional dry clean only',
      'Steam gently from reverse side',
    ],
    inStock: true,
    stockCount: 3,
    rating: 4.9,
    reviewsCount: 35,
    badge: 'Exclusive',
    isFeatured: true,
  },
];

export const CATEGORIES = [
  'All',
  'Everyday Wear',
  'Casual Wear',
  'Occasion Wear',
  'Modern Fashion',
  'Festive & Traditional',
  'Winter / Outerwear',
] as const;

export type CategoryFilter = (typeof CATEGORIES)[number];
