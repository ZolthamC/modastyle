import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../header/header';
import { AuthService, User } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, HeaderComponent],
  templateUrl: './profile.html',
  styleUrls: ['./profile.scss']
})
export class ProfileComponent implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);

  currentUser: User | null = null;
  editMode: boolean = false;
  
  userForm = {
    name: '',
    email: ''
  };

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    
    if (!this.currentUser) {
      this.router.navigate(['/login']);
      return;
    }

    this.userForm = {
      name: this.currentUser.name,
      email: this.currentUser.email
    };
  }

  toggleEditMode(): void {
    this.editMode = !this.editMode;
    
    if (!this.editMode) {
      this.userForm = {
        name: this.currentUser?.name || '',
        email: this.currentUser?.email || ''
      };
    }
  }

  saveProfile(): void {
    if (this.currentUser) {
      console.log('Perfil actualizado:', this.userForm);
      this.currentUser = {
        ...this.currentUser,
        name: this.userForm.name,
        email: this.userForm.email
      };
      
      this.editMode = false;
      alert('Perfil actualizado correctamente');
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}