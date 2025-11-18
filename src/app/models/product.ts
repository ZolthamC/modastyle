export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  sizes: string[];
  colors: string[];
  image: string;
  stock: number;
  description: string;
}

export interface CartItem {
  id: string;
  product: Product;
  size: string;
  color: string;
  quantity: number;
}