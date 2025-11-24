import { Component, inject, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart';
import { AuthService, User } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './header.html',
  styleUrls: ['./header.scss']
})
export class HeaderComponent {
  private cartService = inject(CartService);
  private authService = inject(AuthService);
  private router = inject(Router);

  @Output() search = new EventEmitter<string>();
  @Output() categoryFilter = new EventEmitter<string>();

  currentUser: User | null = null;
  searchTerm: string = '';

  constructor() {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
  }

  get cartItemsCount(): number {
    return this.cartService.getTotalItems();
  }

  openCart(): void {
    this.cartService.setCartOpen(true);
  }

  logout(): void {
    this.authService.logout();
  }
  
    goToProfile(): void {
    this.router.navigate(['/profile']);
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }

  goToRegister(): void {
    this.router.navigate(['/register']);
  }

  goToHome(): void {
    this.router.navigate(['/']);
  }

  onSearch(): void {
    this.search.emit(this.searchTerm);
  }

  filterByCategory(category: string): void {
    this.categoryFilter.emit(category);
  }
}