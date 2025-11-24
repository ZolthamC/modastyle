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
        if (response.products && Array.isArray(response.products)) {
          return response.products;
        }
        return PRODUCTS;
      }),
      catchError(error => {
        return of(PRODUCTS);
      })
    );
  }
}