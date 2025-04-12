import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-accommodation-card',
  templateUrl: './accommodation-card.component.html',
  styleUrls: ['./accommodation-card.component.css'],
  imports: [MatCardModule, MatButtonModule],
})
export class AccommodationCardComponent {
  @Input() accommodation: any;
  @Output() reserve = new EventEmitter<void>();

  onReserveClick() {
    this.reserve.emit(this.accommodation);
  }
}
