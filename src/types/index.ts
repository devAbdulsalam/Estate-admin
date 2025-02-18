export interface Product {
  id: string;
  name: string;
  description: string;
  coverImage: string;
  category: string;
  price: string;
  rating: number;
  reviews: number;
  sold: number;
  quantity: number;
  address: string;
  shippingDays: number;
  isOriginal: boolean;
  images: string[];
}

export interface ProductCategory {
  category: string;
  description: string;
  image: string;
}