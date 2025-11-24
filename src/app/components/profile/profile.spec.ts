import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileComponent } from './profile'; // ← Importación correcta
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

describe('ProfileComponent', () => { // ← Nombre correcto de la clase
  let component: ProfileComponent;   // ← ProfileComponent
  let fixture: ComponentFixture<ProfileComponent>; // ← ProfileComponent

  // Mocks para las dependencias
  const mockAuthService = {
    getCurrentUser: jasmine.createSpy('getCurrentUser').and.returnValue({
      name: 'Test User',
      email: 'test@example.com'
    }),
    logout: jasmine.createSpy('logout')
  };

  const mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileComponent], // ← Componente standalone
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileComponent); // ← ProfileComponent
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});