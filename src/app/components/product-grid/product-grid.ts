import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product';
import { ProductCardComponent } from '../product-card/product-card';

@Component({
  selector: 'app-product-grid',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
  templateUrl: './product-grid.html',
  styleUrls: ['./product-grid.scss']
})
export class ProductGridComponent implements OnChanges {
  @Input() searchTerm: string = '';
  @Input() selectedCategory: string = 'todos';
  @Input() products: Product[] = [];

  filteredProducts: Product[] = [];
  categories: string[] = ['todos', 'camisetas', 'pantalones', 'vestidos', 'sudaderas', 'faldas', 'chaquetas', 'blusas', 'shorts'];

  ngOnChanges(changes: SimpleChanges): void {
    this.applyFilters();
  }

  onCategoryFilter(category: string): void {
    this.selectedCategory = category;
    this.applyFilters();
  }

  onSearch(searchTerm: string): void {
    this.searchTerm = searchTerm;
    this.applyFilters();
  }

  applyFilters(): void {
    if (!this.products || this.products.length === 0) {
      this.filteredProducts = [];
      return;
    }

    this.filteredProducts = this.products.filter(product => {
      const matchesSearch = !this.searchTerm || 
        product.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        (product.description && product.description.toLowerCase().includes(this.searchTerm.toLowerCase()));
      
      const matchesCategory = this.selectedCategory === 'todos' || 
        product.category === this.selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }

  clearFilters(): void {
    this.searchTerm = '';
    this.selectedCategory = 'todos';
    this.applyFilters();
  }

  getActiveFiltersCount(): number {
    let count = 0;
    if (this.selectedCategory !== 'todos') count++;
    if (this.searchTerm) count++;
    return count;
  }
}