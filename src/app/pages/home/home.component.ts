import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccommodationCardComponent } from './../../components/accommodation-card/accommodation-card.component';
import { Accommodation } from './../../models/accommodation';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { AccommodationListComponent } from '../../components/accommodation-list/accommodation-list.component';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    SearchBarComponent,
    CommonModule,
    AccommodationListComponent,
    FormsModule,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  accommodations: Accommodation[] = [];
  filteredAccommodations: Accommodation[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadAccommodations();
  }

  loadAccommodations() {
    this.http
      .get<Accommodation[]>('placeholderdata/accommodations.json')
      .subscribe((data) => {
        this.accommodations = data;
        this.filteredAccommodations = data;
      });
  }

  onSearch(query: string) {
    if (!query) {
      this.filteredAccommodations = this.accommodations;
      return;
    }

    this.filteredAccommodations = this.accommodations.filter((acc) =>
      acc.location.toLowerCase().includes(query)
    );
  }

  onReserve(id: number) {
    console.log(`Lefoglalva szállás ID: ${id}`);
  }
}
