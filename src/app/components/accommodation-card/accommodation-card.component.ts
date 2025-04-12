import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { CurrencyPipe } from '../../pipes/currency.pipe';

@Component({
  selector: 'app-accommodation-card',
  templateUrl: './accommodation-card.component.html',
  styleUrls: ['./accommodation-card.component.css'],
  imports: [CommonModule, MatCardModule, MatButtonModule, CurrencyPipe],
})
export class AccommodationCardComponent {
  @Input() accommodation: any;
  @Output() reserve = new EventEmitter<void>();

  constructor(private router: Router) {}

  onReserveClick() {
    this.reserve.emit(this.accommodation);
  }

  onCardClick() {
    this.router.navigate(['/accommodation', this.accommodation.id]);
  }
}
