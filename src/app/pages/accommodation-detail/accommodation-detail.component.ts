import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute } from '@angular/router';
import { CurrencyPipe } from '../../pipes/currency.pipe';
import { Accommodation } from './../../models/accommodation';
import { AccommodationService } from './../../services/accommodation.services';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatRippleModule } from '@angular/material/core';

@Component({
  selector: 'app-accommodation-detail',
  templateUrl: './accommodation-detail.component.html',
  styleUrls: ['./accommodation-detail.component.css'],
  standalone: true,
  imports: [CommonModule, CurrencyPipe, MatButtonModule, MatRippleModule],
})
export class AccommodationDetailComponent implements OnInit {
  // accommodation: Accommodation | undefined;
  accommodation: any | undefined;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private accommodationService: AccommodationService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') as string;

    this.accommodationService.getAccommodationById(id).subscribe((data) => {
      if (data) {
        this.accommodation = data;
      } else {
        this.snackBar.open('Szállás nem található!', 'Bezárás', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
      }
      this.loading = false;
    });
  }

  onReserve(): void {
    if (!this.accommodation) {
      this.snackBar.open('Szállás nem található!', 'Bezárás', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
      });
      return;
    }
    const reservationId = this.accommodationService.addReservation(
      this.accommodation
    );
    if (reservationId) {
      this.snackBar.open(
        `Sikeresen lefoglalta a(z) ${this.accommodation?.name} szállást!`,
        'Bezárás',
        {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        }
      );
    }
  }
}
