import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product';
import { CartService } from '../../services/cart';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-card.html',
  styleUrls: ['./product-card.scss']
})
export class ProductCardComponent implements OnInit {
  private cartService = inject(CartService);

  @Input() product!: Product;
  selectedSize: string = '';
  selectedColor: string = '';
  imageLoaded: boolean = false;

  ngOnInit(): void {
    if (this.product.colors.length > 0) {
      this.selectedColor = this.product.colors[0];
    }
  }

  onAddToCart(): void {
    if (this.selectedSize) {
      this.cartService.addToCart(this.product, this.selectedSize, this.selectedColor);
      
      const button = document.activeElement as HTMLElement;
      if (button) {
        button.textContent = '✓ Agregado';
        button.classList.add('bg-green-600');
        setTimeout(() => {
          button.textContent = 'Agregar al Carrito';
          button.classList.remove('bg-green-600');
        }, 1000);
      }
    }
  }

  canAddToCart(): boolean {
    return !!this.selectedSize && this.product.stock > 0;
  }
}