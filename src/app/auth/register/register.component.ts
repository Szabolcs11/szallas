import { Component } from '@angular/core';
import { AuthService } from './../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { User } from './../../models/user';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    CommonModule,
    RouterModule,
  ],
})
export class RegisterComponent {
  email = '';
  password = '';
  error = '';
  successMessage = '';

  //legalább egy kisbetű, egy nagybetű és egy szám
  passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;

  constructor(private authService: AuthService, private router: Router) {}

  async register() {
    const user: User = {
      id: 0,
      email: this.email,
      password: this.password,
    };

    const success = await this.authService.register(user);
    if (success) {
      this.successMessage = 'Sikeres regisztráció!';
      this.error = '';
      setTimeout(() => this.router.navigate(['/login']), 2000);
    } else {
      this.successMessage = '';
      this.error = 'Ez az email már foglalt.';
    }
  }
}
