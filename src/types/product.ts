
export interface Product {
  id: number;
  name: string;
  brand: string;
  category: string;
  subcategory: string;
  price: number;
  discount: number;
  quantity: number;
  imageUrl: string;
  colors: string[];
  description: string;
}

export interface ProductReview {
  id: number;
  productId: number;
  name: string;
  rating: number;
  comment: string;
  date: string;
}
