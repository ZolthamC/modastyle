import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AdminService } from '../../services/admin.service';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  product: Product = {
    name: '',
    price: 0,
    category: 'camisetas',
    sizes: [],
    colors: [],
    image: '',
    stock: 0,
    description: '',
    featured: false,
    active: true
  };

  isEditMode: boolean = false;
  loading: boolean = false;
  categories: string[] = ['camisetas', 'pantalones', 'vestidos', 'sudaderas', 'faldas', 'chaquetas', 'blusas', 'shorts'];
  availableSizes: string[] = ['XS', 'S', 'M', 'L', 'XL', '28', '30', '32', '34', '36'];
  availableColors: string[] = ['negro', 'blanco', 'azul', 'rojo', 'verde', 'amarillo', 'rosa', 'gris', 'morado', 'beige'];

  constructor(
    private adminService: AdminService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Verificar si estamos en modo edición
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.isEditMode = true;
      this.loadProduct(productId);
    }
  }

  loadProduct(id: string): void {
    this.loading = true;
    // Por ahora, cargamos desde la lista general
    // En una implementación real, tendríamos un endpoint para obtener un producto por ID
    this.adminService.getProducts().subscribe({
      next: (products) => {
        const foundProduct = products.find(p => p._id === id);
        if (foundProduct) {
          this.product = { ...foundProduct };
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading product:', error);
        this.loading = false;
      }
    });
  }

  onSizeChange(size: string, event: any): void {
    if (event.target.checked) {
      this.product.sizes.push(size);
    } else {
      this.product.sizes = this.product.sizes.filter(s => s !== size);
    }
  }

  onColorChange(color: string, event: any): void {
    if (event.target.checked) {
      this.product.colors.push(color);
    } else {
      this.product.colors = this.product.colors.filter(c => c !== color);
    }
  }

  isSizeSelected(size: string): boolean {
    return this.product.sizes.includes(size);
  }

  isColorSelected(color: string): boolean {
    return this.product.colors.includes(color);
  }

  onSubmit(): void {
    this.loading = true;

    if (this.isEditMode && this.product._id) {
      // Modo edición
      this.adminService.updateProduct(this.product._id, this.product).subscribe({
        next: (response) => {
          console.log('✅ Producto actualizado:', response);
          alert('Producto actualizado correctamente');
          this.router.navigate(['/admin/products']);
        },
        error: (error) => {
          console.error('❌ Error actualizando producto:', error);
          alert('Error al actualizar el producto');
          this.loading = false;
        }
      });
    } else {
      // Modo creación
      this.adminService.createProduct(this.product).subscribe({
        next: (response) => {
          console.log('✅ Producto creado:', response);
          alert('Producto creado correctamente');
          this.router.navigate(['/admin/products']);
        },
        error: (error) => {
          console.error('❌ Error creando producto:', error);
          alert('Error al crear el producto');
          this.loading = false;
        }
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/admin/products']);
  }
}