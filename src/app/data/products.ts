import { Product } from '../models/product';

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Camiseta Básica Negra",
    price: 29.99,
    category: "camisetas",
    sizes: ["S", "M", "L", "XL"],
    colors: ["negro"],
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=400&fit=crop",
    stock: 15,
    description: "Camiseta básica de algodón 100% premium"
  },
  {
    id: 2,
    name: "Jeans Slim Fit Azul",
    price: 59.99,
    category: "pantalones",
    sizes: ["28", "30", "32", "34"],
    colors: ["azul"],
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=300&h=400&fit=crop",
    stock: 8,
    description: "Jeans slim fit de mezclilla elastizada"
  },
  {
    id: 3,
    name: "Vestido Verano Rosa",
    price: 45.99,
    category: "vestidos",
    sizes: ["XS", "S", "M"],
    colors: ["rosa"],
    image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=300&h=400&fit=crop",
    stock: 12,
    description: "Vestido ligero perfecto para verano"
  },
  {
    id: 4,
    name: "Sudadera Con Capucha Gris",
    price: 39.99,
    category: "sudaderas",
    sizes: ["S", "M", "L", "XL"],
    colors: ["gris"],
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=300&h=400&fit=crop",
    stock: 10,
    description: "Sudadera cómoda con capucha"
  },
  {
    id: 5,
    name: "Falda Plisada Negra",
    price: 35.99,
    category: "faldas",
    sizes: ["XS", "S", "M"],
    colors: ["negro"],
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=300&h=400&fit=crop",
    stock: 7,
    description: "Falda elegante plisada para ocasiones especiales"
  },
  {
    id: 6,
    name: "Chaqueta Denim Clásica",
    price: 65.99,
    category: "chaquetas",
    sizes: ["S", "M", "L"],
    colors: ["azul"],
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=300&h=400&fit=crop",
    stock: 5,
    description: "Chaqueta de denim clásica y versátil"
  }
];