import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart';
import { AuthService, User } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrls: ['./header.scss']
})
export class HeaderComponent {
  currentUser: User | null = null;

  constructor(
    private cartService: CartService,
    private authService: AuthService,
    public router: Router
  ) {
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
    this.router.navigate(['/']);
  }
}