import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product';
import { ProductCardComponent } from '../product-card/product-card';
import { PRODUCTS } from '../../data/products';

@Component({
  selector: 'app-product-grid',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
  templateUrl: './product-grid.html',
  styleUrls: ['./product-grid.scss']
})
export class ProductGridComponent implements OnInit, OnChanges {
  @Input() searchTerm: string = '';
  @Input() selectedCategory: string = 'todos';
  @Input() products: Product[] = [];

  filteredProducts: Product[] = [];
  categories: string[] = ['todos', 'camisetas', 'pantalones', 'vestidos', 'sudaderas', 'faldas', 'chaquetas', 'blusas', 'shorts'];
  loading: boolean = true;

  ngOnInit(): void {
    // Si no se pasan productos, usar los locales
    if (this.products.length === 0) {
      this.loading = true;
      setTimeout(() => {
        this.products = PRODUCTS;
        this.filteredProducts = PRODUCTS;
        this.loading = false;
      }, 500);
    } else {
      this.filteredProducts = this.products;
      this.loading = false;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['searchTerm'] || changes['selectedCategory'] || changes['products']) {
      this.applyFilters();
    }
  }

  // ✅ Este método debe existir para manejar el filtrado desde el header
  onCategoryFilter(category: string): void {
    this.selectedCategory = category;
    this.applyFilters();
  }

  // ✅ Este método debe existir para manejar la búsqueda desde el header
  onSearch(searchTerm: string): void {
    this.searchTerm = searchTerm;
    this.applyFilters();
  }

  applyFilters(): void {
    this.filteredProducts = this.products.filter(product => {
      const matchesSearch = !this.searchTerm || 
        product.name.toLowerCase().includes(this.searchTerm) ||
        product.description.toLowerCase().includes(this.searchTerm);
      
      const matchesCategory = this.selectedCategory === 'todos' || 
        product.category === this.selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }

  clearFilters(): void {
    this.searchTerm = '';
    this.selectedCategory = 'todos';
    this.filteredProducts = this.products;
  }

  getActiveFiltersCount(): number {
    let count = 0;
    if (this.selectedCategory !== 'todos') count++;
    if (this.searchTerm) count++;
    return count;
  }
}