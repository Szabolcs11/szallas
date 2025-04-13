import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatListItem, MatNavList } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, MatNavList, MatListItem, MatIcon],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

  get isLoggedIn(): boolean {
    return localStorage.getItem('currentUser') !== null;
  }
  logout() {
    this.snackBar.open('Sikeresen kijelentkezett!', 'Bezárás', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });

    this.authService.logout();
  }
}
