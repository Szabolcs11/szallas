import { Component } from '@angular/core';
import { AuthService } from './../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    CommonModule,
    RouterModule,
  ],
})
export class LoginComponent {
  username = '';
  password = '';
  error = '';
  successMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    const success = this.authService.login(this.username, this.password);
    if (success) {
      this.error = '';
      this.successMessage = 'Sikeres bejelentkezés!';
      setTimeout(() => this.router.navigate(['/']), 2000);
    } else {
      this.error = 'Hibás felhasználónév vagy jelszó';
    }
  }
}
