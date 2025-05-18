import { Injectable } from '@angular/core';
import { User } from './../models/user';
import { getAuth } from '@angular/fire/auth';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from '@firebase/auth';
import { FirebaseApp } from '@angular/fire/app';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private usersKey = 'users';
  private currentUserKey = 'currentUser';

  constructor(fireBaseApp: FirebaseApp) {}

  async register(user: User): Promise<boolean> {
    const { email, password } = user;
    const auth = getAuth();

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      localStorage.setItem(this.currentUserKey, JSON.stringify(user));
      return true;
    } catch (error) {
      return false;
    }
  }

  async login(email: string, password: string): Promise<boolean> {
    const auth = getAuth();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      localStorage.setItem(this.currentUserKey, JSON.stringify(user)); // Store user info in localStorage
      return true;
    } catch (error) {
      return false;
    }
  }

  isLoggedIn(): boolean {
    return localStorage.getItem(this.currentUserKey) !== null;
  }

  logout() {
    localStorage.removeItem(this.currentUserKey);
    const auth = getAuth();
    auth.signOut().then(() => {
      console.log('User logged out');
    });
  }

  private getUsers(): User[] {
    return JSON.parse(localStorage.getItem(this.usersKey) || '[]');
  }
}
