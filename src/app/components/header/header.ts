import { Component } from '@angular/core';
import { CartService } from '../../services/cart';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  styleUrls: ['./header.scss']
})
export class HeaderComponent {
  constructor(private cartService: CartService) {}

  get cartItemsCount(): number {
    return this.cartService.getTotalItems();
  }

  openCart(): void {
    this.cartService.setCartOpen(true);
  }
}