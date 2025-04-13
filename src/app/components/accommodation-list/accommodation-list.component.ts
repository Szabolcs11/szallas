import { Component, Input, OnInit } from '@angular/core';
import { AccommodationCardComponent } from '../accommodation-card/accommodation-card.component';
import { CommonModule } from '@angular/common';
import { Accommodation } from '../../models/accommodation';
import { AccommodationService } from '../../services/accommodation.services';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-accommodation-list',
  templateUrl: './accommodation-list.component.html',
  styleUrls: ['./accommodation-list.component.css'],
  imports: [AccommodationCardComponent, CommonModule],
})
export class AccommodationListComponent implements OnInit {
  constructor(
    private accommodationService: AccommodationService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}
  @Input() accommodations: any[] = [];

  onReserve(event: any) {
    if (!event) {
      this.snackBar.open('Szállás nem található!', 'Bezárás', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
      });
      return;
    }
    const reservationId = this.accommodationService.addReservation(event);
    if (reservationId) {
      this.snackBar.open(
        `Sikeresen lefoglalta a(z) ${event.name} szállást!`,
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
