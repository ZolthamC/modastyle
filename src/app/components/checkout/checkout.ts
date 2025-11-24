import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart';
import { OrderService } from '../../services/order.service';
import { CartItem, ShippingAddress, PaymentInfo } from '../../models/product';
import { Order } from '../../models/order.interface';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './checkout.html',
  styleUrls: ['./checkout.scss']
})
export class CheckoutComponent implements OnInit {
  cartItems: CartItem[] = [];
  currentStep: number = 1;
  
  // Datos del formulario de envío
  shippingAddress: ShippingAddress = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'México'
  };

  // Datos del pago
  paymentInfo: PaymentInfo = {
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: ''
  };

  // Totales
  subtotal: number = 0;
  shippingCost: number = 0;
  tax: number = 0;
  total: number = 0;

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCartData();
    this.calculateTotals();
  }

  loadCartData(): void {
    this.cartItems = this.cartService.getCartItems();
    if (this.cartItems.length === 0) {
      this.router.navigate(['/']);
    }
  }

  calculateTotals(): void {
    this.subtotal = this.cartService.getTotalPrice();
    this.shippingCost = this.calculateShippingCost();
    this.tax = this.subtotal * 0.08;
    this.total = this.subtotal + this.shippingCost + this.tax;
  }

  calculateShippingCost(): number {
    const country = this.shippingAddress.country || 'México';
    const shippingCosts: { [key: string]: number } = {
      'México': 50,
      'Estados Unidos': 100,
      'Canadá': 120,
      'default': 150
    };
    return shippingCosts[country] || shippingCosts['default'];
  }

  nextStep(): void {
    if (this.currentStep < 3) {
      this.currentStep++;
    }
  }

  prevStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  onShippingAddressChange(): void {
    this.shippingCost = this.calculateShippingCost();
    this.tax = this.subtotal * 0.08;
    this.total = this.subtotal + this.shippingCost + this.tax;
  }

  processPayment(): void {
    // Validaciones básicas
    if (!this.isShippingFormValid() || !this.isPaymentFormValid()) {
      alert('Por favor completa todos los campos requeridos');
      return;
    }

    try {
      // Crear la orden
      const order = this.orderService.createOrder(
        this.cartItems,
        this.shippingAddress,
        this.paymentInfo
      );

      // Limpiar carrito
      this.cartService.clearCart();

      // Navegar a confirmación
      this.router.navigate(['/order-confirmation', order.id]);
    } catch (error) {
      console.error('Error processing payment:', error);
      alert('Error al procesar el pago. Intenta nuevamente.');
    }
  }

  isShippingFormValid(): boolean {
    return !!(
      this.shippingAddress.firstName &&
      this.shippingAddress.lastName &&
      this.shippingAddress.email &&
      this.shippingAddress.phone &&
      this.shippingAddress.address &&
      this.shippingAddress.city &&
      this.shippingAddress.state &&
      this.shippingAddress.zipCode &&
      this.shippingAddress.country
    );
  }

  isPaymentFormValid(): boolean {
    return !!(
      this.paymentInfo.cardNumber &&
      this.paymentInfo.cardHolder &&
      this.paymentInfo.expiryDate &&
      this.paymentInfo.cvv
    );
  }

  formatCardNumber(event: any): void {
    let value = event.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = value.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    
    for (let i = 0; i < match.length; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    if (parts.length) {
      this.paymentInfo.cardNumber = parts.join(' ');
    } else {
      this.paymentInfo.cardNumber = value;
    }
  }

  formatExpiryDate(event: any): void {
    let value = event.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (value.length >= 2) {
      value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    this.paymentInfo.expiryDate = value;
  }
}