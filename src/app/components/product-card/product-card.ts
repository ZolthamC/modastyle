import { Component, Input } from '@angular/core';
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
export class ProductCardComponent {
  @Input() product!: Product;
  selectedSize: string = '';
  selectedColor: string = '';

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    // Seleccionar automáticamente el primer color disponible
    if (this.product.colors.length > 0) {
      this.selectedColor = this.product.colors[0];
    }
  }

  onAddToCart(): void {
    if (this.selectedSize) {
      this.cartService.addToCart(this.product, this.selectedSize, this.selectedColor);
      
      // Opcional: Mostrar feedback visual
      console.log('Producto agregado al carrito:', this.product.name);
    }
  }

  // Método para verificar si el producto puede ser agregado al carrito
  canAddToCart(): boolean {
    return !!this.selectedSize;
  }
}