import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductGridComponent } from '../product-grid/product-grid';
import { CartComponent } from '../cart/cart';
import { PRODUCTS } from '../../data/products';
import { Product } from '../../models/product';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ProductGridComponent, CartComponent],
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})
export class HomeComponent {
  products: Product[] = PRODUCTS;
}