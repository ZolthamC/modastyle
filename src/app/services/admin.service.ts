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

  getProducts(): Observable<Product[]> {
    return this.http.get<any>(`${this.apiUrl}/products?limit=100`).pipe(
      map(response => {
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

  createProduct(product: Omit<Product, '_id' | 'id'>): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/products`, product);
  }

  updateProduct(id: string, product: Partial<Product>): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/products/${id}`, product);
  }

  deleteProduct(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/products/${id}`);
  }

  // Eliminación permanente (opcional)
  deleteProductPermanent(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/products/${id}/permanent`);
  }
}