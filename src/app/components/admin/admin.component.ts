import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  isSidebarCollapsed = false;
  currentPageTitle = 'Dashboard';

  constructor(private router: Router) {
    // Escuchar cambios de ruta para actualizar el título
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.updatePageTitle(event.url);
      });
  }

  toggleSidebar(): void {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }

  updatePageTitle(url: string): void {
    if (url.includes('/admin/dashboard')) {
      this.currentPageTitle = 'Dashboard';
    } else if (url.includes('/admin/products')) {
      this.currentPageTitle = 'Gestión de Productos';
    } else if (url.includes('/admin/orders')) {
      this.currentPageTitle = 'Gestión de Pedidos';
    } else if (url.includes('/admin/users')) {
      this.currentPageTitle = 'Gestión de Usuarios';
    } else {
      this.currentPageTitle = 'Dashboard';
    }
  }

  logout(): void {
    console.log('Cerrando sesión...');
    // Aquí irá la lógica de logout
    this.router.navigate(['/']);
  }
}