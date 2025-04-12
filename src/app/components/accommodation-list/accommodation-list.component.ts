import { Component, Input } from '@angular/core';
import { AccommodationCardComponent } from '../accommodation-card/accommodation-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-accommodation-list',
  templateUrl: './accommodation-list.component.html',
  styleUrls: ['./accommodation-list.component.css'],
  imports: [AccommodationCardComponent, CommonModule],
})
export class AccommodationListComponent {
  @Input() accommodations: any[] = [];

  onReserve(event: any) {
    alert(`Sikeresen lefoglalta a ${event.name} szállást!`);
  }
}
