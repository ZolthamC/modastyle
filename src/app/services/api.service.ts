import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Product } from '../models/product';
import { PRODUCTS } from '../data/products';

export interface ApiResponse<T> {
  products: T[];
  totalPages: number;
  currentPage: number;
  total: number;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5000/api';

  // Por ahora usamos datos locales, luego conectaremos al backend real
  getProducts(category?: string, page: number = 1, limit: number = 10): Observable<ApiResponse<Product>> {
    // Simulamos una respuesta de API con datos locales
    let filteredProducts = PRODUCTS;
    
    if (category && category !== 'todos') {
      filteredProducts = PRODUCTS.filter(product => product.category === category);
    }

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

    return of({
      products: paginatedProducts,
      totalPages: Math.ceil(filteredProducts.length / limit),
      currentPage: page,
      total: filteredProducts.length
    });
  }

  getProduct(id: string): Observable<Product> {
    const product = PRODUCTS.find(p => p.id === parseInt(id));
    if (product) {
      return of(product);
    }
    throw new Error('Product not found');
  }

  getHealth(): Observable<any> {
    return this.http.get(`${this.apiUrl}/health`);
  }
}