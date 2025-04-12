import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class LoginRegisterGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const isLoggedIn = localStorage.getItem('currentUser') !== null;
    if (isLoggedIn) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}
