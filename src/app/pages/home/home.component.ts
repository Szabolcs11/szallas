import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccommodationCardComponent } from './../../components/accommodation-card/accommodation-card.component';
import { Accommodation } from './../../models/accommodation';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { AccommodationListComponent } from '../../components/accommodation-list/accommodation-list.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SearchBarComponent, CommonModule, AccommodationListComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  accommodations: Accommodation[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadAccommodations();
  }

  loadAccommodations() {
    this.http
      .get<Accommodation[]>('placeholderdata/accommodations.json')
      .subscribe((data) => {
        this.accommodations = data;
      });
  }

  onReserve(id: number) {
    console.log(`Lefoglalva szállás ID: ${id}`);
  }
}
