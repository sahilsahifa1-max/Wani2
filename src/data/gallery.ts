/**
 * WEARZA — GALLERY IMAGES DATA
 * 
 * 10 Cloudinary fashion gallery images in exact specified order:
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

export interface GalleryItem {
  id: string;
  src: string;
  title: string;
  alt: string;
  category: string;
  description: string;
  price?: string;
  filename?: string;
}

export const galleryImages: GalleryItem[] = [
  {
    id: 'wearza-01',
    src: 'https://res.cloudinary.com/zunfvbel/image/upload/f_auto,q_auto/1000001133',
    title: 'Archive Silhouette 01',
    alt: 'WEARZA women fashion archive item 01',
    category: 'Everyday Wear',
    description: 'Contemporary women’s tailoring with relaxed silhouette and refined lines.',
    price: '$97,33',
  },
  {
    id: 'wearza-02',
    src: 'https://res.cloudinary.com/zunfvbel/image/upload/f_auto,q_auto/1000001134',
    title: 'Archive Silhouette 02',
    alt: 'WEARZA women fashion archive item 02',
    category: 'Casual Wear',
    description: 'Casual elegance tailored with comfortable drape for versatile daywear.',
    price: '$97,33',
  },
  {
    id: 'wearza-03',
    src: 'https://res.cloudinary.com/zunfvbel/image/upload/f_auto,q_auto/1000001138',
    title: 'Archive Silhouette 03',
    alt: 'WEARZA women fashion archive item 03',
    category: 'Occasion Wear',
    description: 'Sophisticated festive piece blending traditional craftsmanship with modern edge.',
    price: '$97,33',
  },
  {
    id: 'wearza-04',
    src: 'https://res.cloudinary.com/zunfvbel/image/upload/f_auto,q_auto/1000001139',
    title: 'Archive Silhouette 04',
    alt: 'WEARZA women fashion archive item 04',
    category: 'Modern Fashion',
    description: 'Clean architectural cut featuring signature WEARZA tonal palette.',
    price: '$97,33',
  },
  {
    id: 'wearza-05',
    src: 'https://res.cloudinary.com/zunfvbel/image/upload/f_auto,q_auto/1000001140',
    title: 'Archive Silhouette 05',
    alt: 'WEARZA women fashion archive item 05',
    category: 'Everyday Wear',
    description: 'Tactile natural textile structured for everyday comfort and modern presence.',
    price: '$97,33',
  },
  {
    id: 'wearza-06',
    src: 'https://res.cloudinary.com/zunfvbel/image/upload/f_auto,q_auto/1000001143',
    title: 'Archive Silhouette 06',
    alt: 'WEARZA women fashion archive item 06',
    category: 'Dresses & Tops',
    description: 'Editorial draped silhouette with artisanal details from Kashmir.',
    price: '$97,33',
  },
  {
    id: 'wearza-07',
    src: 'https://res.cloudinary.com/zunfvbel/image/upload/f_auto,q_auto/1000001145',
    title: 'Archive Silhouette 07',
    alt: 'WEARZA women fashion archive item 07',
    category: 'Traditional-Inspired',
    description: 'Classic Kashmiri-inspired lines reinterpreted for contemporary wardrobes.',
    price: '$97,33',
  },
  {
    id: 'wearza-08',
    src: 'https://res.cloudinary.com/zunfvbel/image/upload/f_auto,q_auto/1000001146',
    title: 'Archive Silhouette 08',
    alt: 'WEARZA women fashion archive item 08',
    category: 'Seasonal Collection',
    description: 'Layering outerwear piece designed for mountain climate and all-day ease.',
    price: '$97,33',
  },
  {
    id: 'wearza-09',
    src: 'https://res.cloudinary.com/zunfvbel/image/upload/f_auto,q_auto/1000001149',
    title: 'Archive Silhouette 09',
    alt: 'WEARZA women fashion archive item 09',
    category: 'Modern Fashion',
    description: 'Understated monochrome styling crafted for versatile transitions.',
    price: '$97,33',
  },
  {
    id: 'wearza-10',
    src: 'https://res.cloudinary.com/zunfvbel/image/upload/f_auto,q_auto/1000001150',
    title: 'Archive Silhouette 10',
    alt: 'WEARZA women fashion archive item 10',
    category: 'Occasion Wear',
    description: 'Statement archive garment showcasing tactile textures and timeless proportions.',
    price: '$97,33',
  },
];
