export interface Product {
  // IDs
  _id?: string;        // ID de MongoDB
  id?: number;         // ID local (opcional)
  
  // Información básica
  name: string;
  price: number;
  category: string;
  sizes: string[];
  colors: string[];
  image: string;
  stock: number;
  description: string;
  
  // Propiedades de estado
  featured?: boolean;
  active?: boolean;
  
  // Timestamps
  createdAt?: string;
  updatedAt?: string;
  
  // Versión de MongoDB
  __v?: number;
}
export interface CartItem {
  id: string;
  product: Product;
  size: string;
  color: string;
  quantity: number;
}

export * from './order.interface';