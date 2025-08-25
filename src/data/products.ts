import { Product } from '@/contexts/CartContext';

// Import the generated product images
import headphonesImg from '@/assets/product-headphones.jpg';
import smartwatchImg from '@/assets/product-smartwatch.jpg';
import chargerImg from '@/assets/product-charger.jpg';
import laptopImg from '@/assets/product-laptop.jpg';

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface ProductWithCategory extends Product {
  category: string;
  rating?: number;
  reviews?: number;
}

export const categories: Category[] = [
  {
    id: 'electronics',
    name: 'Electronics',
    description: 'Latest tech gadgets and devices',
    icon: '📱'
  },
  {
    id: 'audio',
    name: 'Audio',
    description: 'Premium headphones and speakers',
    icon: '🎧'
  },
  {
    id: 'wearables',
    name: 'Wearables',
    description: 'Smartwatches and fitness trackers',
    icon: '⌚'
  },
  {
    id: 'accessories',
    name: 'Accessories',
    description: 'Essential tech accessories',
    icon: '🔌'
  }
];

export const products: ProductWithCategory[] = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    price: 299.99,
    image: headphonesImg,
    category: 'audio',
    rating: 4.8,
    reviews: 324,
    description: 'High-quality wireless headphones with active noise cancellation and premium sound quality.',
  },
  {
    id: '2',
    name: 'Smart Fitness Watch',
    price: 249.99,
    image: smartwatchImg,
    category: 'wearables',
    rating: 4.6,
    reviews: 189,
    description: 'Advanced fitness tracking with heart rate monitoring, GPS, and long-lasting battery life.',
  },
  {
    id: '3',
    name: 'Wireless Charging Station',
    price: 89.99,
    image: chargerImg,
    category: 'accessories',
    rating: 4.5,
    reviews: 95,
    description: 'Fast wireless charging for multiple devices with sleek, modern design.',
  },
  {
    id: '4',
    name: 'Ultra-Slim Laptop',
    price: 1299.99,
    image: laptopImg,
    category: 'electronics',
    rating: 4.9,
    reviews: 156,
    description: 'Powerful performance in an ultra-thin design. Perfect for professionals and creators.',
  },
  {
    id: '5',
    name: 'Professional Camera Lens',
    price: 599.99,
    image: laptopImg,
    category: 'electronics',
    rating: 4.7,
    reviews: 78,
    description: 'Professional-grade lens with superior optics for stunning photography.',
  },
  {
    id: '6',
    name: 'Gaming Mechanical Keyboard',
    price: 159.99,
    image: chargerImg,
    category: 'accessories',
    rating: 4.4,
    reviews: 203,
    description: 'RGB backlit mechanical keyboard designed for gaming and productivity.',
  },
  {
    id: '7',
    name: 'Wireless Earbuds Pro',
    price: 199.99,
    image: headphonesImg,
    category: 'audio',
    rating: 4.6,
    reviews: 412,
    description: 'True wireless earbuds with spatial audio and long battery life.',
  },
  {
    id: '8',
    name: 'Smart Home Speaker',
    price: 149.99,
    image: smartwatchImg,
    category: 'audio',
    rating: 4.3,
    reviews: 267,
    description: 'Voice-controlled smart speaker with premium sound quality.',
  },
  {
    id: '9',
    name: 'Fitness Tracker Band',
    price: 79.99,
    image: smartwatchImg,
    category: 'wearables',
    rating: 4.2,
    reviews: 158,
    description: 'Lightweight fitness tracker with sleep monitoring and water resistance.',
  },
  {
    id: '10',
    name: 'USB-C Hub Pro',
    price: 69.99,
    image: chargerImg,
    category: 'accessories',
    rating: 4.5,
    reviews: 89,
    description: 'Multi-port USB-C hub with HDMI, USB 3.0, and power delivery.',
  },
  {
    id: '11',
    name: '4K Gaming Monitor',
    price: 449.99,
    image: laptopImg,
    category: 'electronics',
    rating: 4.8,
    reviews: 134,
    description: '27-inch 4K monitor with 144Hz refresh rate for gaming and productivity.',
  },
  {
    id: '12',
    name: 'Wireless Mouse Pro',
    price: 89.99,
    image: chargerImg,
    category: 'accessories',
    rating: 4.4,
    reviews: 276,
    description: 'Precision wireless mouse with customizable buttons and RGB lighting.',
  }
];

export const getProductsByCategory = (categoryId: string) => {
  return products.filter(product => product.category === categoryId);
};

export const getProductById = (productId: string) => {
  return products.find(product => product.id === productId);
};

export const getCategoryById = (categoryId: string) => {
  return categories.find(category => category.id === categoryId);
};