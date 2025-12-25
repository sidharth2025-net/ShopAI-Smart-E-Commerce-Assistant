
export type Platform = 'Amazon' | 'Flipkart' | 'Myntra' | 'Ajio' | 'Meesho' | 'Other';

export interface PlatformPrice {
  platform: Platform;
  price: number;
  url: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  platform: Platform;
  rating: number;
  reviewsCount: number;
  imageUrl: string;
  features: string[];
  description: string;
  aiScore: number;
  bestValue: boolean;
  link: string;
  pros: string[];
  cons: string[];
  platformPrices?: PlatformPrice[]; // New field for multi-platform visualization
  category?: string;
}

export interface Message {
  role: 'user' | 'assistant';
  content: string;
  products?: Product[];
  timestamp: Date;
  suggestions?: string[];
}

export interface UserPreferences {
  budget: [number, number];
  platforms: Platform[];
  useCase: string;
  brands: string[];
}
