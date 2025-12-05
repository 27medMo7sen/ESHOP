import { Product } from '@/contexts/CartContext';

// Import the generated product images
import headphonesImg from '@/assets/product-headphones.jpg';
import smartwatchImg from '@/assets/product-smartwatch.jpg';
import chargerImg from '@/assets/product-charger.jpg';
import laptopImg from '@/assets/product-laptop.jpg';
import tshirtImg from '@/assets/product_tshirt_1764936147137.png';
import sneakersImg from '@/assets/product_sneakers_1764936162971.png';
import backpackImg from '@/assets/product_backpack_1764936179086.png';
import sunglassesImg from '@/assets/product_sunglasses_1764936193170.png';
import coffeeMugImg from '@/assets/product_coffeemug_1764936212641.png';
import yogaMatImg from '@/assets/product_yogamat_1764936226686.png';

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
  },
  {
    id: 'clothing',
    name: 'Clothing',
    description: 'Stylish apparel and fashion',
    icon: '👕'
  },
  {
    id: 'home',
    name: 'Home & Living',
    description: 'Home essentials and decor',
    icon: '🏠'
  },
  {
    id: 'sports',
    name: 'Sports & Outdoors',
    description: 'Fitness and outdoor gear',
    icon: '⚽'
  }
];

export const products: ProductWithCategory[] = [
  // Electronics
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
  },

  // Clothing
  {
    id: '13',
    name: 'Premium Cotton T-Shirt',
    price: 29.99,
    image: tshirtImg,
    category: 'clothing',
    rating: 4.7,
    reviews: 543,
    description: 'Soft, breathable cotton t-shirt in navy blue. Perfect for everyday wear.',
  },
  {
    id: '14',
    name: 'Athletic Running Sneakers',
    price: 119.99,
    image: sneakersImg,
    category: 'clothing',
    rating: 4.8,
    reviews: 892,
    description: 'Lightweight running shoes with superior cushioning and support.',
  },
  {
    id: '15',
    name: 'Leather Backpack',
    price: 149.99,
    image: backpackImg,
    category: 'clothing',
    rating: 4.6,
    reviews: 234,
    description: 'Stylish leather backpack with laptop compartment and multiple pockets.',
  },
  {
    id: '16',
    name: 'Designer Sunglasses',
    price: 179.99,
    image: sunglassesImg,
    category: 'clothing',
    rating: 4.5,
    reviews: 167,
    description: 'Classic aviator sunglasses with UV protection and polarized lenses.',
  },
  {
    id: '17',
    name: 'Casual Denim Jeans',
    price: 79.99,
    image: tshirtImg,
    category: 'clothing',
    rating: 4.4,
    reviews: 421,
    description: 'Comfortable slim-fit jeans in classic blue denim.',
  },
  {
    id: '18',
    name: 'Winter Jacket',
    price: 199.99,
    image: backpackImg,
    category: 'clothing',
    rating: 4.7,
    reviews: 312,
    description: 'Warm, waterproof winter jacket with insulated lining.',
  },

  // Home & Living
  {
    id: '19',
    name: 'Ceramic Coffee Mug Set',
    price: 34.99,
    image: coffeeMugImg,
    category: 'home',
    rating: 4.6,
    reviews: 289,
    description: 'Set of 4 elegant ceramic mugs with wooden handles. Dishwasher safe.',
  },
  {
    id: '20',
    name: 'Decorative Throw Pillows',
    price: 49.99,
    image: coffeeMugImg,
    category: 'home',
    rating: 4.3,
    reviews: 156,
    description: 'Set of 2 soft throw pillows with modern geometric patterns.',
  },
  {
    id: '21',
    name: 'LED Desk Lamp',
    price: 59.99,
    image: chargerImg,
    category: 'home',
    rating: 4.7,
    reviews: 401,
    description: 'Adjustable LED desk lamp with touch controls and USB charging port.',
  },
  {
    id: '22',
    name: 'Bamboo Cutting Board',
    price: 39.99,
    image: coffeeMugImg,
    category: 'home',
    rating: 4.8,
    reviews: 523,
    description: 'Large bamboo cutting board with juice groove and non-slip feet.',
  },
  {
    id: '23',
    name: 'Scented Candle Set',
    price: 44.99,
    image: coffeeMugImg,
    category: 'home',
    rating: 4.5,
    reviews: 278,
    description: 'Set of 3 soy wax candles with lavender, vanilla, and citrus scents.',
  },
  {
    id: '24',
    name: 'Wall Art Canvas',
    price: 89.99,
    image: coffeeMugImg,
    category: 'home',
    rating: 4.4,
    reviews: 192,
    description: 'Modern abstract canvas art print, ready to hang.',
  },

  // Sports & Outdoors
  {
    id: '25',
    name: 'Premium Yoga Mat',
    price: 49.99,
    image: yogaMatImg,
    category: 'sports',
    rating: 4.8,
    reviews: 634,
    description: 'Non-slip yoga mat with extra cushioning and carrying strap.',
  },
  {
    id: '26',
    name: 'Insulated Water Bottle',
    price: 34.99,
    image: yogaMatImg,
    category: 'sports',
    rating: 4.7,
    reviews: 812,
    description: 'Stainless steel water bottle keeps drinks cold for 24 hours.',
  },
  {
    id: '27',
    name: 'Resistance Bands Set',
    price: 29.99,
    image: yogaMatImg,
    category: 'sports',
    rating: 4.6,
    reviews: 445,
    description: 'Set of 5 resistance bands with different strength levels and carrying bag.',
  },
  {
    id: '28',
    name: 'Camping Tent',
    price: 189.99,
    image: backpackImg,
    category: 'sports',
    rating: 4.5,
    reviews: 234,
    description: '4-person waterproof tent with easy setup and ventilation windows.',
  },
  {
    id: '29',
    name: 'Adjustable Dumbbells',
    price: 149.99,
    image: yogaMatImg,
    category: 'sports',
    rating: 4.7,
    reviews: 367,
    description: 'Space-saving adjustable dumbbells from 5 to 25 lbs per hand.',
  },
  {
    id: '30',
    name: 'Hiking Backpack',
    price: 119.99,
    image: backpackImg,
    category: 'sports',
    rating: 4.6,
    reviews: 289,
    description: '40L hiking backpack with hydration system and rain cover.',
  },
  {
    id: '31',
    name: 'Bluetooth Sports Headphones',
    price: 79.99,
    image: headphonesImg,
    category: 'sports',
    rating: 4.4,
    reviews: 521,
    description: 'Sweat-resistant wireless headphones perfect for workouts.',
  },
  {
    id: '32',
    name: 'Foam Roller',
    price: 24.99,
    image: yogaMatImg,
    category: 'sports',
    rating: 4.5,
    reviews: 398,
    description: 'High-density foam roller for muscle recovery and massage.',
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