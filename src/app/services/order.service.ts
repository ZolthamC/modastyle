import { Injectable, inject } from '@angular/core';
import { Order, ShippingAddress, PaymentInfo, CartItem } from '../models/product';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private authService = inject(AuthService);
  private orders: Order[] = [];

  createOrder(
    items: CartItem[],
    shippingAddress: ShippingAddress,
    paymentInfo: PaymentInfo
  ): Order {
    const subtotal = items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
    const shippingCost = this.calculateShippingCost(shippingAddress.country);
    const tax = subtotal * 0.08; // 8% de impuesto
    const total = subtotal + shippingCost + tax;

    const order: Order = {
      id: this.generateOrderId(),
      userId: this.authService.getCurrentUser()?.id,
      items: [...items],
      shippingAddress,
      paymentInfo,
      subtotal,
      shippingCost,
      tax,
      total,
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this.orders.push(order);
    this.saveOrdersToStorage();
    return order;
  }

  getOrders(): Order[] {
    this.loadOrdersFromStorage();
    return this.orders;
  }

  getOrderById(orderId: string): Order | undefined {
    this.loadOrdersFromStorage();
    return this.orders.find(order => order.id === orderId);
  }

  private calculateShippingCost(country: string): number {
    const shippingCosts: { [key: string]: number } = {
      'México': 50,
      'Estados Unidos': 100,
      'Canadá': 120,
      'default': 150
    };
    return shippingCosts[country] || shippingCosts['default'];
  }

  private generateOrderId(): string {
    return 'ORD-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
  }

  private saveOrdersToStorage(): void {
    localStorage.setItem('modastyle_orders', JSON.stringify(this.orders));
  }

  private loadOrdersFromStorage(): void {
    const stored = localStorage.getItem('modastyle_orders');
    if (stored) {
      this.orders = JSON.parse(stored);
    }
  }
}