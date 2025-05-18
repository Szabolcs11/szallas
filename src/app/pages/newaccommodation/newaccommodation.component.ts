import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common'; // <-- Import CommonModule
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Accommodation } from '../../models/accommodation';
import { AccommodationService } from '../../services/accommodation.services';
import { Router } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';

@Component({
  selector: 'app-newaccommodation',
  templateUrl: './newaccommodation.component.html',
  styleUrls: ['./newaccommodation.component.css'],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatCardModule,
    MatIconModule,
    ReactiveFormsModule,
    NavbarComponent,
  ],
})
export class NewAccommodationComponent {
  accommodationForm: FormGroup;

  amenitiesOptions: string[] = [
    'Wifi',
    'Parking',
    'Pool',
    'Gym',
    'Breakfast',
    'Air conditioning',
  ];
  constructor(
    private fb: FormBuilder,
    private accommodationService: AccommodationService,
    private router: Router
  ) {
    this.accommodationForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      price: [null, [Validators.required, Validators.min(1)]],
      location: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      amenities: [[], [Validators.required]], // Initialize as an empty array
    });
  }

  async onSubmit(): Promise<void> {
    if (this.accommodationForm.valid) {
      console.log('Form Submitted!', this.accommodationForm.value);
      const myuser = localStorage.getItem('currentUser');
      let userId = 0;
      if (myuser) {
        const user = JSON.parse(myuser);
        userId = user.uid;
        console.log(user);
      } else {
        return;
      }

      const accommodation: Accommodation = {
        title: this.accommodationForm.value.title,
        price: this.accommodationForm.value.price,
        location: this.accommodationForm.value.location,
        description: this.accommodationForm.value.description,
        amenities: this.accommodationForm.value.amenities,
        createdAt: new Date(),
        rating: 5,
        userId: userId,
      };
      await this.accommodationService.createAccommodation(accommodation);
      setTimeout(() => this.router.navigate(['/']), 2000);
    } else {
      console.log('Form is invalid');
    }
  }
}
