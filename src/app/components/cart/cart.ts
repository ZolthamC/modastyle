import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart';
import { CartItem } from '../../models/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.html',
  styleUrls: ['./cart.scss']
})
export class CartComponent {
  constructor(
    private cartService: CartService,
    private router: Router
  ) {}


  get isOpen(): boolean {
    return this.cartService.getCartOpen();
  }

  get cartItems(): CartItem[] {
    return this.cartService.getCartItems();
  }

  get total(): number {
    return this.cartService.getTotalPrice();
  }

  closeCart(): void {
    this.cartService.setCartOpen(false);
  }

  removeItem(itemId: string): void {
    this.cartService.removeFromCart(itemId);
  }

  updateQuantity(itemId: string, quantity: number): void {
    this.cartService.updateQuantity(itemId, quantity);
  }

  proceedToCheckout(): void {    if (this.cartItems.length > 0) {
      this.closeCart();
      this.router.navigate(['/checkout']);
    }
     }
  getSelectedColor(item: CartItem): string {
    return item.color || item.product.colors[0];
  }
}