import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header';
import { ProductGrid } from './components/product-grid/product-grid';
import { Cart } from './components/cart/cart';
import { PRODUCTS } from './data/products';
import { Product } from './models/product';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HeaderComponent, ProductGrid, Cart],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App {
  title = 'ModaStyle';
  products: Product[] = PRODUCTS;
}