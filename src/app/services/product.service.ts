import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { Product } from '../models/product';
import { PRODUCTS } from '../data/products';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/products`;

  getProducts(): Observable<Product[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map(response => {
        // Si el API devuelve productos, usarlos
        if (response.products && response.products.length > 0) {
          console.log('✅ Productos del API:', response.products.length);
          return response.products;
        }
        // Si no hay productos en el API, usar datos locales
        console.log('⚠️  Usando productos locales');
        return PRODUCTS;
      }),
      catchError(error => {
        console.error('❌ Error API, usando locales', error);
        return of(PRODUCTS);
      })
    );
  }
}