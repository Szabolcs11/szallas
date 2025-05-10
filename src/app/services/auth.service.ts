import { Injectable } from '@angular/core';
import { User } from './../models/user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private usersKey = 'users';
  private currentUserKey = 'currentUser';

  constructor() {}

  register(user: User): boolean {
    const users = this.getUsers();
    const exists = users.find((u) => u.username === user.username);
    if (exists) return false;

    user.id = Date.now();
    users.push(user);
    localStorage.setItem(this.usersKey, JSON.stringify(users));
    return true;
  }

  login(username: string, password: string): boolean {
    const users = this.getUsers();
    const found = users.find(
      (u) => u.username === username && u.password === password
    );
    if (found) {
      localStorage.setItem(this.currentUserKey, JSON.stringify(found));
      return true;
    }
    return false;
  }

  isLoggedIn(): boolean {
    return localStorage.getItem(this.currentUserKey) !== null;
  }

  logout() {
    localStorage.removeItem(this.currentUserKey);
  }

  private getUsers(): User[] {
    return JSON.parse(localStorage.getItem(this.usersKey) || '[]');
  }
}
