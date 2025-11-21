import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header';
import { ProductGridComponent } from './components/product-grid/product-grid';
import { CartComponent } from './components/cart/cart';
import { PRODUCTS } from './data/products';
import { Product } from './models/product';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HeaderComponent, ProductGridComponent, CartComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App {
  title = 'ModaStyle';
  products: Product[] = PRODUCTS;
}