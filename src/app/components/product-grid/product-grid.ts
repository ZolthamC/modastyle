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
  @Input() products: Product[] = [];
  selectedCategory: string = 'todos';
  categories: string[] = [];
  filteredProducts: Product[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['products']) {
      this.updateCategories();
      this.filterProducts();
    }
  }

  private updateCategories(): void {
    const allCategories = this.products.map(p => p.category);
    this.categories = [...new Set(allCategories)];
  }

  filterProducts(): void {
    if (this.selectedCategory === 'todos') {
      this.filteredProducts = this.products;
    } else {
      this.filteredProducts = this.products.filter(
        product => product.category === this.selectedCategory
      );
    }
  }
}