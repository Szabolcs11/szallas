import { Component, Input, OnInit } from '@angular/core';
import { AccommodationCardComponent } from '../accommodation-card/accommodation-card.component';
import { CommonModule } from '@angular/common';
import { Accommodation } from '../../models/accommodation';
import { AccommodationService } from '../../services/accommodation.services';

@Component({
  selector: 'app-accommodation-list',
  templateUrl: './accommodation-list.component.html',
  styleUrls: ['./accommodation-list.component.css'],
  imports: [AccommodationCardComponent, CommonModule],
})
export class AccommodationListComponent implements OnInit {
  constructor(private accommodationService: AccommodationService) {}

  ngOnInit(): void {}
  @Input() accommodations: any[] = [];

  onReserve(event: any) {
    if (!event) {
      alert('Szállás nem található!');
      return;
    }
    const reservationId = this.accommodationService.addReservation(event);
    if (reservationId) {
      alert(`Sikeresen lefoglalta a ${event.name} szállást!`);
    }
  }
}
