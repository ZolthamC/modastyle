import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AdminService } from '../../services/admin.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  stats: any = {
    totalProducts: 0,
    totalOrders: 0,
    totalUsers: 0,
    totalRevenue: 0,
    recentOrders: [],
    lowStockProducts: []
  };
  
  loading: boolean = true;
  products: any[] = [];

  constructor(
    private adminService: AdminService,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.loading = true;

    // Cargar productos para las estadísticas
    this.adminService.getProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.calculateStats(products);
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading dashboard data:', error);
        this.loading = false;
      }
    });
  }

  private calculateStats(products: any[]): void {
    const totalProducts = products.length;
    const lowStockProducts = products.filter(p => p.stock < 10);
    
    this.stats = {
      totalProducts,
      totalOrders: 0, // Simulado por ahora
      totalUsers: 0,  // Simulado por ahora
      totalRevenue: 0, // Simulado por ahora
      recentOrders: [], // Simulado por ahora
      lowStockProducts
    };
  }

  getStatusBadgeClass(status: string): string {
    const statusClasses: { [key: string]: string } = {
      'pending': 'bg-yellow-100 text-yellow-800',
      'processing': 'bg-blue-100 text-blue-800',
      'shipped': 'bg-purple-100 text-purple-800',
      'delivered': 'bg-green-100 text-green-800',
      'cancelled': 'bg-red-100 text-red-800'
    };
    return statusClasses[status] || 'bg-gray-100 text-gray-800';
  }

  refreshData(): void {
    this.loadDashboardData();
  }
  
}