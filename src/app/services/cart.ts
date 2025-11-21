import { Injectable } from '@angular/core';
import { Product, CartItem } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: CartItem[] = [];
  private isCartOpen = false;

  addToCart(product: Product, size: string, color: string): void {
    // Si no se selecciona color, usar el primero disponible
    const selectedColor = color || product.colors[0];
    const itemId = `${product.id}-${size}-${selectedColor}`;
    
    const existingItem = this.cartItems.find(item => item.id === itemId);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.cartItems.push({
        id: itemId,
        product,
        size,
        color: selectedColor,
        quantity: 1
      });
    }
  }

  removeFromCart(itemId: string): void {
    this.cartItems = this.cartItems.filter(item => item.id !== itemId);
  }

  updateQuantity(itemId: string, quantity: number): void {
    if (quantity < 1) {
      this.removeFromCart(itemId);
      return;
    }
    
    const item = this.cartItems.find(item => item.id === itemId);
    if (item) {
      item.quantity = quantity;
    }
  }

  getCartItems(): CartItem[] {
    return this.cartItems;
  }

  getTotalItems(): number {
    return this.cartItems.reduce((total, item) => total + item.quantity, 0);
  }

  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  }

  clearCart(): void {
    this.cartItems = [];
  }

  getCartOpen(): boolean {
    return this.isCartOpen;
  }

  setCartOpen(isOpen: boolean): void {
    this.isCartOpen = isOpen;
  }

  // Nuevo método para verificar si un producto ya está en el carrito
  isProductInCart(product: Product, size: string, color: string): boolean {
    const selectedColor = color || product.colors[0];
    const itemId = `${product.id}-${size}-${selectedColor}`;
    return this.cartItems.some(item => item.id === itemId);
  }
}