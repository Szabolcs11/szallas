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
  accommodation: Accommodation | undefined;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private accommodationService: AccommodationService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.accommodationService.getAccommodations().subscribe((data) => {
      this.accommodation = data.find((a) => a.id === id);
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
