import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccommodationListComponent } from '../../components/accommodation-list/accommodation-list.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { Accommodation } from './../../models/accommodation';
import { AccommodationService } from '../../services/accommodation.services';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    SearchBarComponent,
    CommonModule,
    AccommodationListComponent,
    FormsModule,
    NavbarComponent,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  accommodations: Accommodation[] = [];
  filteredAccommodations: Accommodation[] = [];

  constructor(
    private http: HttpClient,
    private accommodationService: AccommodationService
  ) {}

  ngOnInit() {
    this.loadAccommodations();
  }

  loadAccommodations() {
    this.accommodationService.getAccommodations().subscribe((data) => {
      this.accommodations = data;
      this.filteredAccommodations = data;
    });
  }

  onSearch({
    query,
    minPrice,
    maxPrice,
  }: {
    query: string;
    minPrice: number | null;
    maxPrice: number | null;
  }) {
    if (query != null && query.trim() !== '') {
      this.accommodationService
        .getAccommodationsByLocation(query)
        .subscribe((data) => {
          this.filteredAccommodations = data;
        });
      return;
    }
    if (minPrice != null && maxPrice != null) {
      this.accommodationService
        .getAccommodationsByPriceRange(minPrice, maxPrice)
        .subscribe((data) => {
          this.filteredAccommodations = data;
        });
      return;
    }
    if (!query) {
      this.filteredAccommodations = this.accommodations;
      return;
    }
  }

  onReserve(id: number) {
    console.log(`Lefoglalva szállás ID: ${id}`);
  }
}
