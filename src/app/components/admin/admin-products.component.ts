import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminService } from '../../services/admin.service';
import { Product } from '../../models/product';

@Component({
  selector: 'app-admin-products',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  loading: boolean = true;
  searchTerm: string = '';
  selectedCategory: string = '';

  constructor(private adminService: AdminService) {} // ✅ Usar AdminService

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading = true;
    this.adminService.getProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.filteredProducts = products;
        this.loading = false;
        console.log('📦 Productos cargados en admin:', products.length);
        
        // Debug: verificar estructura de los productos
        if (products.length > 0) {
          console.log('🔍 Primer producto:', products[0]);
        }
      },
      error: (error) => {
        console.error('Error loading products:', error);
        this.loading = false;
      }
    });
  }

  onSearch(searchTerm: string): void {
    this.searchTerm = searchTerm;
    this.applyFilters();
  }

  onCategoryFilter(category: string): void {
    this.selectedCategory = category;
    this.applyFilters();
  }

  applyFilters(): void {
    this.filteredProducts = this.products.filter(product => {
      const matchesSearch = !this.searchTerm || 
        product.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        (product.description && product.description.toLowerCase().includes(this.searchTerm.toLowerCase()));
      
      const matchesCategory = !this.selectedCategory || 
        product.category === this.selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }

  getCategories(): string[] {
    return [...new Set(this.products.map(p => p.category))];
  }

  deleteProduct(productId: string | undefined): void {
    if (!productId) {
      console.error('❌ No se puede eliminar: productId es undefined');
      return;
    }
    
    if (confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      console.log('Eliminando producto:', productId);
      this.adminService.deleteProduct(productId).subscribe({
        next: () => {
          console.log('✅ Producto eliminado');
          this.loadProducts(); // Recargar la lista
        },
        error: (error) => {
          console.error('❌ Error eliminando producto:', error);
          alert('Error al eliminar el producto');
        }
      });
    }
  }

  toggleProductStatus(product: Product): void {
    if (!product._id) {
      console.error('❌ No se puede cambiar estado: _id es undefined');
      return;
    }
    
    // ✅ Manejar el caso donde active podría ser undefined
    const currentActive = product.active !== undefined ? product.active : true;
    const newStatus = !currentActive;
    
    console.log('Cambiando estado del producto:', product._id, 'de', currentActive, 'a', newStatus);
    
    this.adminService.updateProduct(product._id, { active: newStatus }).subscribe({
      next: (updatedProduct) => {
        console.log('✅ Estado actualizado:', updatedProduct);
        // Actualizar el producto localmente
        const index = this.products.findIndex(p => p._id === product._id);
        if (index !== -1) {
          this.products[index].active = newStatus;
          this.applyFilters();
        }
      },
      error: (error) => {
        console.error('❌ Error actualizando estado:', error);
        alert('Error al cambiar el estado del producto');
      }
    });
  }

  // ✅ Métodos auxiliares seguros
  getProductStatus(product: Product): string {
    const isActive = product.active !== undefined ? product.active : true;
    return isActive ? 'Activo' : 'Inactivo';
  }

  getStatusClass(product: Product): string {
    const isActive = product.active !== undefined ? product.active : true;
    return isActive ? 'status-active' : 'status-inactive';
  }

  getStockClass(product: Product): string {
    return product.stock < 10 ? 'stock-low' : 'stock-good';
  }

  isProductActive(product: Product): boolean {
    return product.active !== undefined ? product.active : true;
  }
}