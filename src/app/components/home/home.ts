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
  selectedCategory: string = '';

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (products) => {
        this.products = products;
        console.log('🏠 Home: Productos cargados', products.length);
      },
      error: (error) => {
        console.error('Error loading products:', error);
      }
    });
  }

  onSearch(searchTerm: string): void {
    this.searchTerm = searchTerm;
    console.log('Búsqueda:', searchTerm);
  }

  onCategoryFilter(category: string): void {
    this.selectedCategory = category;
    console.log('Categoría:', category);
  }
}