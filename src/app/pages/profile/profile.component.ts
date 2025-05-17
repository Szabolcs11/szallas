import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';

@Component({
  selector: 'app-profile',
  imports: [NavbarComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  email: string = '';

  constructor() {}

  ngOnInit(): void {
    // Initialization logic here
    const user = localStorage.getItem('currentUser');

    if (user) {
      const parsedUser = JSON.parse(user);
      console.log(parsedUser);
      this.email = parsedUser.email;
    }
  }
}
