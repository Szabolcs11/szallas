import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { AccommodationService } from '../../services/accommodation.services';
import { Router } from '@angular/router';
import { Accommodation } from '../../models/accommodation';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { routes } from '../../app.routes';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle,
} from '@angular/material/card';
import { MatList, MatListItem } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { EditAccommodationComponent } from '../../components/edit-accommodation/edit-accommodation.component'; // Import the EditAccommodationComponent

@Component({
  selector: 'app-profile',
  imports: [
    CommonModule,
    NavbarComponent,
    MatCard,
    MatCardTitle,
    MatIconModule,
    MatTooltipModule,
    MatTableModule,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  email: string | undefined;
  accommodations: Accommodation[] = [];
  loading = true;
  displayedColumns: string[] = ['title', 'location', 'price', 'actions']; // Columns to display in the table

  constructor(
    private accommodationService: AccommodationService,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getAccommodations();
  }

  getAccommodations() {
    const user = localStorage.getItem('currentUser');

    if (user) {
      const parsedUser = JSON.parse(user);
      this.email = parsedUser.email;

      this.accommodationService.getUserAccommodations(parsedUser.uid).subscribe(
        (data) => {
          this.accommodations = data;
          this.loading = false;
        },
        (error) => {
          console.error('Error fetching accommodations', error);
          this.loading = false;
        }
      );
    }
  }

  openEditDialog(accommodation: Accommodation) {
    const dialogRef = this.dialog.open(EditAccommodationComponent, {
      data: accommodation,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.accommodationService.updateAccommodation(
          accommodation.id!,
          result
        );
        this.getAccommodations();
      }
    });
  }

  deleteAccommodation(accommodationId: string) {
    if (confirm('Are you sure you want to delete this accommodation?')) {
      this.accommodationService
        .deleteAccommodation(accommodationId)
        .then(() => {
          this.accommodations = this.accommodations.filter(
            (acc) => acc.id !== accommodationId
          );
          this.snackBar.open('Accommodation deleted successfully!', 'Close', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
          });
        });
    }
  }
}
