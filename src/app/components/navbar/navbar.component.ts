import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  constructor(private authService: AuthService) {}

  get isLoggedIn(): boolean {
    return localStorage.getItem('currentUser') !== null;
  }
  logout() {
    alert('Sikeresen kijelentkezett!');
    this.authService.logout();
  }
}
