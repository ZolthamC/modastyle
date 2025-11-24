import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductGridComponent } from '../product-grid/product-grid';
import { HeaderComponent } from '../header/header';
import { CartComponent } from '../cart/cart';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HeaderComponent, ProductGridComponent, CartComponent],
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  searchTerm: string = '';
  selectedCategory: string = 'todos';
  isLoading: boolean = true;
  error: string = '';

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.isLoading = true;
    this.error = '';
    
    this.productService.getProducts().subscribe({
      next: (response: any) => {
        if (Array.isArray(response)) {
          this.products = response;
        } else if (response.data && Array.isArray(response.data)) {
          this.products = response.data;
        } else if (response.products && Array.isArray(response.products)) {
          this.products = response.products;
        } else {
          this.products = [];
        }
        
        this.isLoading = false;
      },
      error: (error) => {
        this.error = 'Error al cargar los productos';
        this.isLoading = false;
        this.products = [];
      }
    });
  }

  onSearch(searchTerm: string): void {
    this.searchTerm = searchTerm;
  }

  onCategoryFilter(category: string): void {
    this.selectedCategory = category;
  }

  retryLoad(): void {
    this.loadProducts();
  }
}