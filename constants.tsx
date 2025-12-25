import React from 'react';
import { Product } from './types';

export const PLATFORMS = ['Amazon', 'Flipkart', 'Myntra', 'Ajio', 'Meesho'];

export const CATEGORIES = [
  { id: 'laptops', name: 'Laptops', icon: '💻' },
  { id: 'mobiles', name: 'Mobiles', icon: '📱' },
  { id: 'fashion', name: 'Fashion', icon: '👕' },
  { id: 'electronics', name: 'Audio', icon: '🎧' },
  { id: 'home', name: 'Home', icon: '🏠' },
  { id: 'beauty', name: 'Beauty', icon: '💄' }
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'MacBook Air M2',
    price: 89900,
    originalPrice: 114900,
    platform: 'Amazon',
    rating: 4.8,
    reviewsCount: 1240,
    imageUrl: 'https://picsum.photos/seed/macm2/400/400',
    features: ['8-core CPU', '10-core GPU', '8GB Unified Memory', '256GB SSD'],
    description: 'Strikingly thin and fast, the MacBook Air M2 brings power and efficiency in a silent, fanless design.',
    aiScore: 94,
    bestValue: true,
    link: '#',
    pros: ['Great battery life', 'Excellent display', 'Lightweight'],
    cons: ['Limited ports', 'Expensive upgrade options'],
    platformPrices: [
      { platform: 'Amazon', price: 89900, url: '#' },
      { platform: 'Flipkart', price: 92499, url: '#' },
      // Fixed: Removed duplicate platform property and provided a valid Platform type value
      { platform: 'Other', price: 94900, url: '#' }
    ]
  },
  {
    id: '2',
    name: 'Samsung Galaxy S23 Ultra',
    price: 94999,
    originalPrice: 124999,
    platform: 'Flipkart',
    rating: 4.7,
    reviewsCount: 850,
    imageUrl: 'https://picsum.photos/seed/s23ultra/400/400',
    features: ['200MP Camera', 'S-Pen included', 'Snapdragon 8 Gen 2', '5000mAh battery'],
    description: 'The ultimate flagship phone with the best camera system on Android.',
    aiScore: 91,
    bestValue: false,
    link: '#',
    pros: ['Insane zoom capabilities', 'Powerful performance', 'Beautiful screen'],
    cons: ['Large footprint', 'Slow charging compared to peers'],
    platformPrices: [
      { platform: 'Flipkart', price: 94999, url: '#' },
      { platform: 'Amazon', price: 98900, url: '#' }
    ]
  },
  {
    id: '3',
    name: 'Sony WH-1000XM5',
    price: 24990,
    originalPrice: 34990,
    platform: 'Amazon',
    rating: 4.9,
    reviewsCount: 2100,
    imageUrl: 'https://picsum.photos/seed/sonyxm5/400/400',
    features: ['Industry-leading ANC', '30-hour battery', 'Multi-point connection'],
    description: 'The best noise cancelling headphones for audiophiles and travelers.',
    aiScore: 96,
    bestValue: true,
    link: '#',
    pros: ['Top-tier ANC', 'Great call quality', 'Comfortable'],
    cons: ['No folding design', 'Touch controls can be finicky'],
    platformPrices: [
      { platform: 'Amazon', price: 24990, url: '#' },
      { platform: 'Flipkart', price: 26990, url: '#' },
      { platform: 'Ajio', price: 28990, url: '#' }
    ]
  }
];