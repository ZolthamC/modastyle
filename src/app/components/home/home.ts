import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header';
import { ProductGridComponent } from '../product-grid/product-grid';
import { CartComponent } from '../cart/cart';
import { PRODUCTS } from '../../data/products';
import { Product } from '../../models/product';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HeaderComponent, ProductGridComponent, CartComponent],
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})
export class HomeComponent {
  products: Product[] = PRODUCTS;
  searchTerm: string = '';
  selectedCategory: string = 'todos';

  onSearch(searchTerm: string): void {
    this.searchTerm = searchTerm;
  }

  onCategoryFilter(category: string): void {
    this.selectedCategory = category;
  }
}