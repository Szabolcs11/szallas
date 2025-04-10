import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Accommodation } from './../../models/accommodation';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-accommodation-card',
  templateUrl: './accommodation-card.component.html',
  styleUrls: ['./accommodation-card.component.css'],
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
})
export class AccommodationCardComponent {
  @Input() accommodation!: Accommodation;
  @Output() reserve = new EventEmitter<number>();

  onReserve() {
    this.reserve.emit(this.accommodation.id);
  }
  onReserveClick() {
    this.reserve.emit(this.accommodation.id);
  }
}
