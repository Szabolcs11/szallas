import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccommodationCardComponent } from './../../components/accommodation-card/accommodation-card.component';
import { Accommodation } from './../../models/accommodation';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { AccommodationListComponent } from '../../components/accommodation-list/accommodation-list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SearchBarComponent, CommonModule, AccommodationListComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  accommodations: Accommodation[] = [
    {
      id: 1,
      name: 'Balatoni nyaraló',
      location: 'Balatonfüred',
      description: 'Kényelmes nyaraló a Balaton partján.',
      imageUrl: 'https://placehold.co/300x200',
      pricePerNight: 25000,
    },
    {
      id: 2,
      name: 'Pesti apartman',
      location: 'Budapest',
      description: 'Modern apartman a belváros szívében.',
      imageUrl: 'https://placehold.co/300x200',
      pricePerNight: 30000,
    },
  ];

  onReserve(id: number) {
    console.log(`Lefoglalva szállás ID: ${id}`);
  }
}
