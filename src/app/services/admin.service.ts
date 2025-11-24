import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { Product } from '../models/product';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}`;

  // ✅ CORREGIDO: Manejar correctamente la respuesta del API
  getProducts(): Observable<Product[]> {
    return this.http.get<any>(`${this.apiUrl}/products?limit=100`).pipe(
      map(response => {
        // Tu API devuelve { products: [], totalPages: X, currentPage: X, total: X }
        console.log('📊 Admin - Respuesta API:', response);
        
        if (response.products && Array.isArray(response.products)) {
          console.log('✅ Admin - Productos del API:', response.products.length);
          return response.products;
        }
        
        console.log('⚠️  Admin - No hay productos en API');
        return [];
      }),
      catchError(error => {
        console.error('❌ Admin - Error API:', error);
        return of([]);
      })
    );
  }

  createProduct(product: Omit<Product, 'id' | '_id'>): Observable<Product> {
    return this.http.post<Product>(`${this.apiUrl}/products`, product);
  }

  updateProduct(id: string, product: Partial<Product>): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/products/${id}`, product);
  }

  deleteProduct(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/products/${id}`);
  }
}