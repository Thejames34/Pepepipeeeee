import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd, Event } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  
  isMenuOpen = false;
  isUserLoggedIn = false;
  userName = 'Usuario';
  showNavbar = true;
  private routerSubscription?: Subscription;

  constructor(private router: Router) { }

  ngOnInit(): void {
    // Suscribirse a los cambios de ruta
    this.routerSubscription = this.router.events
      .pipe(filter((event: Event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.checkRouteAndShowNavbar(event.url);
        // Verificar auth cada vez que cambie la ruta
        this.checkUserAuth();
      });

    // Verificar la ruta inicial
    this.checkRouteAndShowNavbar(this.router.url);
    
    // Verificar si el usuario está logueado
    this.checkUserAuth();

    // Escuchar cambios en localStorage
    window.addEventListener('storage', () => {
      this.checkUserAuth();
    });
  }

  ngOnDestroy(): void {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  checkRouteAndShowNavbar(url: string): void {
    // Ocultar navbar en la página de login
    this.showNavbar = !url.includes('/login');
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  checkUserAuth(): void {
    // Verificar si hay datos de usuario en localStorage
    const userData = localStorage.getItem('currentUser');
    if (userData) {
      const user = JSON.parse(userData);
      this.isUserLoggedIn = true;
      this.userName = user.nombre || user.name || user.email || 'Usuario';
    } else {
      this.isUserLoggedIn = false;
      this.userName = 'Usuario';
    }
  }

  // Método público para actualizar el estado del usuario
  updateUserStatus(): void {
    this.checkUserAuth();
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
    this.isMenuOpen = false; // Cerrar menú móvil al navegar
  }

  logout(): void {
    // Limpiar datos del usuario
    localStorage.removeItem('currentUser');
    this.isUserLoggedIn = false;
    this.userName = 'Usuario';
    this.router.navigate(['/login']);
  }

  onProfileClick(): void {
    // Navegar al perfil del usuario
    this.router.navigate(['/profile']);
  }
}